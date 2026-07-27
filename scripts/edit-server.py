#!/usr/bin/env python3
"""
Authoring helper: jump from the rendered book back to its PreTeXt source.

Run this alongside a local preview build, then in the book:

  * alt-click any paragraph  -> opens that spot in your text editor  (option A)
  * alt-shift-click          -> edit the text in place, save, done   (option C)

    python3 scripts/edit-server.py                    # this project
    python3 scripts/edit-server.py --project ../ENGS28

The browser half lives in assets/ptx-edit.js and is injected only by the
"web-edit" target, so nothing here can reach a deployed build.

Deliberately local-only: it binds to 127.0.0.1 and refuses to touch any file
outside the project's source/ directory, because its whole job is rewriting
files on disk in response to an HTTP request.
"""

import argparse
import difflib
import json
import os
import re
import shutil
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ptx_source_index import SourceIndex, TEXT_ELEMENTS, normalize  # noqa: E402


# Below this similarity, we would be guessing at which paragraph the reader
# meant, and guessing wrong means opening an editor on unrelated prose.
MATCH_THRESHOLD = 0.75

REFUSAL = ("That edit would change text inside inline markup (<c>, <em>, ...), "
           "which can't be done safely from here. Alt-click instead to open it "
           "in your editor.")

# Elements whose displayed text is generated when the book is built, and so has
# no counterpart in the source: math is LaTeX in the file and rendered glyphs in
# the browser, and <xref> and the character entities produce text that simply
# isn't written anywhere. A block containing one can never round-trip, so the
# mismatch it causes is not evidence that the file changed underneath the author
# — which is what the generic message unhelpfully implies. Longest alternatives
# first so <mrow> isn't matched as <m>.
GENERATED = re.compile(
    rb"<(mrow|xref|ellipsis|fillin|today|nbsp|ndash|mdash|sim|md|me|m)[\s/>]")


# A <p> holding display math does not render as one block: PreTeXt emits the
# text before the first <md> as its own .para div, the math as a sibling, and
# the text after it as another .para. So the block a reader clicks carries a
# *fragment* of the source paragraph, and comparing whole texts is the wrong
# question — the length prefilter in locate() throws the real element out before
# it is ever scored. Asking instead "is nearly all of what they clicked present,
# in order, in this element?" identifies the block. Only ever used to point an
# editor at the right line; writing still demands the exact match in apply_edit.
FRAGMENT_COVERAGE = 0.90

# Math is LaTeX in the source and rendered glyphs in the browser, so it can
# never match either way — set it aside before comparing. Longest first so
# <mrow> is not matched as <m>.
MATH_SUBTREE = re.compile(
    rb"<(mrow|md|me|m)(\s[^>]*)?>.*?</\1>|<(mrow|md|me|m)(\s[^>]*)?/>", re.S)
ANY_TAG = re.compile(rb"<[^>]+>")


def text_without_math(element):
    """The element's text with math subtrees removed, normalized for matching."""
    try:
        with open(element.path, "rb") as handle:
            handle.seek(element.inner_start)
            raw = handle.read(max(element.inner_end - element.inner_start, 0))
    except OSError:
        return ""
    raw = MATH_SUBTREE.sub(b" ", raw)
    raw = ANY_TAG.sub(b" ", raw)
    return normalize(raw.decode("utf-8", "replace"))


def generated_markup(element):
    """Tag of the first build-time-generated element in this block, or None."""
    try:
        with open(element.path, "rb") as handle:
            handle.seek(element.inner_start)
            raw = handle.read(max(element.inner_end - element.inner_start, 0))
    except OSError:
        return None
    hit = GENERATED.search(raw)
    return hit.group(1).decode() if hit else None


class Locator:
    def __init__(self, project_dir: str):
        self.project_dir = os.path.abspath(project_dir)
        self.index = SourceIndex(os.path.join(self.project_dir, "source"))

    def _xml_id_hint(self, html_id: str):
        """Find the source element a PreTeXt-generated HTML id descends from.

        PreTeXt numbers auto-generated ids off the nearest ancestor that has a
        real xml:id: "integers-intro-5-1-2" is a descendant of "integers-intro".
        We don't try to follow the numbering (its rules are an implementation
        detail and change with generated content) - we just strip the numeric
        tail to recover the ancestor, which narrows the text search to one
        subtree and makes a repeated sentence unambiguous.
        """
        if not html_id:
            return None
        parts = html_id.split("-")
        while parts:
            candidate = "-".join(parts)
            element = self.index.by_xml_id(candidate)
            if element is not None:
                return element
            if not parts[-1].isdigit():
                break
            parts.pop()
        return None

    def locate(self, text: str, html_id: str = ""):
        self.index.refresh()
        needle = normalize(text)
        if not needle:
            return None

        hint = self._xml_id_hint(html_id)
        candidates = [e for e in self.index.elements if e.tag in TEXT_ELEMENTS]
        if hint is not None:
            scoped = [
                e for e in candidates
                if e.path == hint.path
                and e.inner_start >= hint.inner_start
                and e.inner_end <= hint.inner_end
            ]
            # Fall back to the whole tree if the hint's subtree has nothing -
            # better a project-wide match than none at all.
            candidates = scoped or candidates

        exact = [e for e in candidates if e.text() == needle]
        if exact:
            # The tightest element containing exactly this text is the one that
            # was clicked; anything longer is an ancestor that merely wraps it.
            return min(exact, key=lambda e: e.inner_end - e.inner_start), 1.0

        best, best_score = None, 0.0
        for element in candidates:
            haystack = element.text()
            if not haystack:
                continue
            # Cheap prefilter: a real match can't differ hugely in length.
            if not (0.5 <= len(haystack) / len(needle) <= 2.0):
                continue
            score = difflib.SequenceMatcher(None, haystack, needle).ratio()
            if score > best_score:
                best, best_score = element, score

        if best is not None and best_score >= MATCH_THRESHOLD:
            return best, best_score

        # Nothing matched as a whole. Before giving up, try the fragment case
        # (see FRAGMENT_COVERAGE): a paragraph broken up by display math.
        if len(needle) >= 20:
            best, best_cov = None, 0.0
            for element in candidates:
                haystack = text_without_math(element)
                if len(haystack) < 20:
                    continue
                matcher = difflib.SequenceMatcher(None, haystack, needle)
                covered = sum(b.size for b in matcher.get_matching_blocks())
                coverage = covered / len(needle)
                # Prefer the tightest element when two cover equally well; a
                # parent wrapping the clicked block covers it just as fully.
                span = element.inner_end - element.inner_start
                if coverage > best_cov or (
                    coverage == best_cov and best is not None
                    and span < best.inner_end - best.inner_start
                ):
                    best, best_cov = element, coverage
            if best is not None and best_cov >= FRAGMENT_COVERAGE:
                return best, best_cov
        return None

    def in_project(self, path: str) -> bool:
        source = os.path.join(self.project_dir, "source")
        return os.path.abspath(path).startswith(source + os.sep)


def open_in_editor(path: str, line: int) -> str:
    """Launch the user's editor at a file and line. Returns what it used."""
    override = os.environ.get("PTX_EDITOR")
    if override:
        subprocess.Popen(
            [part.replace("{file}", path).replace("{line}", str(line))
             for part in override.split()]
        )
        return override

    sublime = shutil.which("subl") or (
        "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl"
    )
    if os.path.exists(sublime):
        subprocess.Popen([sublime, f"{path}:{line}"])
        return "subl"

    code = shutil.which("code")
    if code:
        subprocess.Popen([code, "-g", f"{path}:{line}"])
        return "code"

    # Last resort: hand it to macOS, which at least opens the right file.
    subprocess.Popen(["open", path])
    return "open"


def apply_edit(element, old_text: str, new_text: str):
    """Rewrite an element's own visible text in place, preserving everything else.

    Only the bytes that actually changed are touched, and only where they belong
    to the block's own character data. Anything owned by nested inline markup
    (<c>, <em>, ...) is off limits, and an edit reaching into it is refused
    rather than guessed at.

    That restriction is doing more work than it looks. Requiring merely that the
    result stay well-formed is not enough: difflib is happy to align an
    unrelated word onto the text inside a <c>, so rewriting "Recall that
    <c>5/2=2</c> in C." wholesale yields the perfectly well-formed but absurd
    "Integer division truncates toward <c>zero</c> always." Markup must not
    migrate onto words it was never meant to mark, so edits that would move it
    get handed to the editor instead.
    """
    flat, starts, ends, owned = element.flatten()
    if flat != normalize(old_text):
        tag = generated_markup(element)
        if tag:
            return None, (f"This block contains <{tag}>, whose displayed text is "
                          "generated when the book is built and has no counterpart "
                          "in the source, so it can't be edited in place. "
                          "Alt-click to open it in your editor instead.")
        return None, ("The source no longer matches what the preview showed - "
                      "it may have changed since this page was built.")

    new_flat = normalize(new_text)
    if new_flat == flat:
        return None, None  # nothing to do

    with open(element.path, "rb") as handle:
        data = handle.read()

    edits = []
    matcher = difflib.SequenceMatcher(None, flat, new_flat)
    for op, i1, i2, j1, j2 in matcher.get_opcodes():
        if op == "equal":
            continue
        if op == "insert":
            # Anchor the insertion just after the preceding owned character, so
            # that new text always lands in this block's own character data and
            # never inside a nested element's tags.
            if i1 > 0 and owned[i1 - 1]:
                start = end = ends[i1 - 1]
            elif i1 < len(starts) and owned[i1]:
                start = end = starts[i1]
            elif not flat:
                start = end = element.inner_start
            else:
                return None, REFUSAL
        else:
            if not all(owned[i1:i2]):
                return None, REFUSAL
            start, end = starts[i1], ends[i2 - 1]

        # Belt and braces: character data can never contain "<", so a span that
        # does would be reaching across a tag boundary. The ownership test above
        # should already have caught it.
        if b"<" in data[start:end]:
            return None, REFUSAL
        edits.append((start, end, new_flat[j1:j2].encode("utf-8")))

    # Apply back to front so earlier offsets stay valid.
    for start, end, replacement in sorted(edits, reverse=True):
        data = data[:start] + replacement + data[end:]

    with open(element.path, "wb") as handle:
        handle.write(data)
    return len(edits), None


def make_handler(locator: Locator):
    class Handler(BaseHTTPRequestHandler):
        def _send(self, payload, status=200):
            body = json.dumps(payload).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            # The preview is served from a different local port than this
            # helper, so the browser treats these as cross-origin.
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *args):
            pass  # the server's own reporting is friendlier than access logs

        def do_OPTIONS(self):
            self._send({})

        def do_GET(self):
            url = urlparse(self.path)
            if url.path != "/locate":
                return self._send({"error": "not found"}, 404)

            query = parse_qs(url.query)
            found = locator.locate(
                query.get("text", [""])[0], query.get("id", [""])[0]
            )
            if not found:
                return self._send({"error": "No matching source found."}, 404)

            element, score = found
            relative = os.path.relpath(element.path, locator.project_dir)
            if query.get("open", ["0"])[0] == "1":
                editor = open_in_editor(element.path, element.start_line)
                print(f"  -> {relative}:{element.start_line} ({editor})")
            return self._send({
                "file": relative,
                "path": element.path,
                "line": element.start_line,
                "tag": element.tag,
                "score": round(score, 3),
                "text": element.text(),
            })

        def do_POST(self):
            url = urlparse(self.path)
            if url.path != "/patch":
                return self._send({"error": "not found"}, 404)

            length = int(self.headers.get("Content-Length", 0))
            try:
                payload = json.loads(self.rfile.read(length) or b"{}")
            except json.JSONDecodeError:
                return self._send({"error": "bad request"}, 400)

            found = locator.locate(payload.get("text", ""), payload.get("id", ""))
            if not found:
                return self._send({"error": "No matching source found."}, 404)

            element, _score = found
            if not locator.in_project(element.path):
                return self._send({"error": "refusing to write outside source/"}, 403)

            count, problem = apply_edit(
                element, payload.get("text", ""), payload.get("newText", "")
            )
            if problem:
                return self._send({"error": problem}, 409)

            relative = os.path.relpath(element.path, locator.project_dir)
            if count:
                print(f"  edited {relative}:{element.start_line} "
                      f"({count} change{'s' if count != 1 else ''})")
            return self._send({
                "file": relative,
                "line": element.start_line,
                "changes": count or 0,
            })

    return Handler


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", default=os.path.join(
        os.path.dirname(os.path.abspath(__file__)), ".."
    ), help="PreTeXt project root (the directory holding project.ptx)")
    parser.add_argument("--port", type=int, default=8927)
    args = parser.parse_args()

    project = os.path.abspath(args.project)
    if not os.path.isdir(os.path.join(project, "source")):
        sys.exit(f"No source/ directory in {project}")

    locator = Locator(project)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), make_handler(locator))

    print(f"PreTeXt edit server: {os.path.basename(project)} on port {args.port}")
    print(f"  indexed {len(locator.index.elements)} elements")
    print("  alt-click a paragraph in the book to open it here; "
          "alt-shift-click to edit in place")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")


if __name__ == "__main__":
    main()
