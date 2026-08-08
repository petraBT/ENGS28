#!/usr/bin/env python3
"""Mechanical rule checks for an ENGS 28 chapter (Step 5 of CHAPTER_PROCESS.md).

Enforces the lintable rules L-1..L-6 from AUTHORING-book.md, plus image paths,
unresolved cross-references, and the count-drift trap ("four steps" when there are
five).  These are the errors that should never reach a human reviewer.

    python3 scripts/check_rules.py source/ch-adc.ptx
    python3 scripts/check_rules.py source/*.ptx --quiet   # errors only
"""

import argparse
import os
import re
import sys
from xml.etree import ElementTree as ET

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(REPO, "assets")

NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
}

# (id, regex, message, severity)
RULES = [
    ("L-1", r"\bworking in pairs\b|\bwork individually\b|\bbefore you leave\b",
     "grouping/timing language — given verbally, never written", "error"),
    ("L-2", r"%[-+ #0-9.]*f\b",
     "%f in printf — the course printf has no floating point; scale to int and use %d",
     "error"),
    ("L-3", r"\b(open|opening|opens|closed|closing)\s+the\s+gate\b|\bclock\s+gate\b|\bgated?\s+(on|off|open)\b",
     "'gate' language for clocks — say 'enable the clock'", "error"),
    ("L-4", r"forward\s+declaration",
     "say 'prototype', not 'forward declaration'", "error"),
    ("L-5", r"\bthe target MCU\b|\bthe microcontroller chip\b(?! on our)|\bour MCU\b",
     "vague hardware name — say STM32C031C6", "warn"),
    # L-7: American spelling. Deliberately a curated list rather than a general
    # -ise/-our rule, because the general form fires on "programmer", "our", and
    # every URL that happens to contain them.
    ("L-7", r"\b(colour|behaviour|favour|labour|centre|metre|litre|analyse|organise|"
            r"recognise|normalise|stabilise|initialise|minimise|maximise|utilise|"
            r"whilst|programme|defence|offence|travelling|modelling|labelled|"
            r"cancelled|practise|licence|grey|greyed)\b",
     "British spelling — this book uses American spelling", "error"),
    # L-8..L-11 are the lintable corner of the voice rules (S-11..S-19).  Only
    # fixed phrases are here; anything needing taste stays a judgment rule.
    # Each was validated against the corpus as it stood before the voice pass
    # (git 7b7fc33^): together they catch 7 real violations — three of them
    # phrases Petra deleted by hand in plans/day8-voice-reference.diff — with no
    # false positive in any of the 17 chapter files.
    ("L-8", r"in under (a|one) (minute|second|hour)\b|\byou can find it in\b"
            r"|\(\s*[≈~]\s*\d+\s*(minute|min)\b",
     "manufactured time pressure (S-15) — state the task, not how fast it should go",
     "error"),
    ("L-9", r"\.\s+Always\.|\bthe entire point\b",
     "slogan ending (S-16) — state the requirement; keep the claim just as strong",
     "error"),
    # The lookbehind is load-bearing: without it this fires on ordinary English
    # like "waited for the UART to be ready to accept a character".
    ("L-10", r"\bYour turn\b|(?<!to )\bbe ready to\b",
     "challenge phrasing (S-15, S-17) — open the question, don't dare the student",
     "error"),
    ("L-11", r"\bin Day \d",
     "say 'on Day N' — or 'tomorrow', since Day Nx follows Day N", "error"),
]

# Bit/register names that must keep reference-manual casing.
CASE_TRAPS = [
    (r"\bAdc1\b|\badc1->", "ADC1"), (r"\bGpioa\b", "GPIOA"),
    (r"\bChselr\b", "CHSELR"), (r"\bModer\b", "MODER"),
    (r"\bAdrdy\b", "ADRDY"), (r"\bAdstart\b", "ADSTART"),
]

# CMSIS device headers are all lowercase (stm32c0xx.h, stm32c031xx.h) even
# though the PART is written STM32C031C6 (L-5).  An uppercase C in the
# *filename* spread through six chapters and the simulator's starter code
# before Petra caught it.  Requiring the ".h" is what keeps this rule off the
# part name; anything not already lowercase is flagged.
HEADER_CASE = re.compile(r"\bstm32c0\w*\.h\b", re.I)


def strip_c_comments(code):
    """Drop C comments so keywords inside them don't count as code."""
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    return re.sub(r"//[^\n]*", "", code)


def main_body(code):
    """The body of an `int main(...)` in a listing, or None (B-14).

    Brace-matched, and blind to comments, so a `return` mentioned in prose or
    belonging to a later function is not mistaken for main's own.
    """
    blank = re.sub(r"/\*.*?\*/", lambda m: " " * len(m.group(0)), code, flags=re.S)
    blank = re.sub(r"//[^\n]*", lambda m: " " * len(m.group(0)), blank)
    m = re.search(r"\bint\s+main\s*\([^)]*\)\s*\{", blank)
    if not m:
        return None
    i, depth = m.end(), 1
    while i < len(blank):
        if blank[i] == "{":
            depth += 1
        elif blank[i] == "}":
            depth -= 1
            if depth == 0:
                return code[m.end():i]
        i += 1
    return None


def strip_comments(text):
    """Blank out XML comments so authoring notes don't trip the linter."""
    return re.sub(r"<!--.*?-->", lambda m: re.sub(r"[^\n]", " ", m.group(0)),
                  text, flags=re.S)


# A deliberate violation is marked in the source by putting, immediately before
# the element it applies to:
#     <!-- check-rules: allow L-2  (teaching that %f is unsupported) -->
# It suppresses the listed rules for the whole of that following element.
TAG = re.compile(r"<(/?)([A-Za-z][\w:-]*)([^>]*?)(/?)>", re.S)


def element_span(raw, pos):
    """(start, end) of the first element beginning at or after `pos`."""
    m = TAG.search(raw, pos)
    while m and (m.group(1) or m.group(2).startswith("!")):
        m = TAG.search(raw, m.end())
    if not m:
        return pos, len(raw)
    if m.group(4):  # self-closing
        return m.start(), m.end()
    name, depth, cur = m.group(2), 1, m.end()
    for t in TAG.finditer(raw, m.end()):
        if t.group(2) != name or t.group(4):
            continue
        depth += -1 if t.group(1) else 1
        cur = t.end()
        if depth == 0:
            return m.start(), cur
    return m.start(), len(raw)


def allowances(raw):
    """{rule_id: [(first_line, last_line), ...]} from check-rules directives."""
    out = {}
    for m in re.finditer(r"<!--\s*check-rules:\s*allow\s+([A-Z]+-\d+(?:\s*,\s*[A-Z]+-\d+)*)",
                         raw, re.I):
        close = raw.find("-->", m.end())
        start, end = element_span(raw, close + 3 if close != -1 else m.end())
        span = (line_of(raw, m.start()), line_of(raw, end))
        for rid in re.split(r"\s*,\s*", m.group(1).strip()):
            out.setdefault(rid.upper(), []).append(span)
    return out


def line_of(text, pos):
    return text.count("\n", 0, pos) + 1


def check_file(path, quiet=False):
    raw = open(path, encoding="utf-8").read()
    text = strip_comments(raw)
    problems = []

    for rid, pattern, msg, sev in RULES:
        for m in re.finditer(pattern, text, re.I):
            problems.append((sev, line_of(text, m.start()), rid,
                             f"{msg}  ->  {m.group(0)!r}"))

    for pattern, correct in CASE_TRAPS:
        for m in re.finditer(pattern, text):
            if m.group(0) != correct and m.group(0).lower() != correct.lower() + "->":
                problems.append(("warn", line_of(text, m.start()), "L-6",
                                 f"register/bit casing: {m.group(0)!r} should be {correct!r}"))

    for m in re.finditer(HEADER_CASE, text):
        got = m.group(0)
        if got != got.lower():
            problems.append(("error", line_of(text, m.start()), "L-6",
                             f"device header casing: {got!r} should be "
                             f"{got.lower()!r} (the filename is all lowercase; "
                             f"the part is STM32C031C6)"))

    # B-14: an int main() ends with a return, in every listing students copy.
    for m in re.finditer(
            r"<program language=\"c\"><code><!\[CDATA\[(.*?)\]\]></code></program>",
            raw, flags=re.S):
        span = main_body(m.group(1))
        if span is None:
            continue
        body = strip_c_comments(span)
        if not re.search(r"\breturn\b", body):
            problems.append(("error", line_of(raw, m.start()), "B-14",
                             "int main() with no return statement — say "
                             "'return 1;' (or declare main void)"))

    # Images resolve on disk.
    for m in re.finditer(r'<image\s+source="([^"]+)"', text):
        src = m.group(1)
        if src.startswith(("http://", "https://")):
            continue
        full = os.path.join(ASSETS, src)
        if not os.path.exists(full):
            problems.append(("error", line_of(text, m.start()), "B-11",
                             f"missing image: {src}"))
            continue
        # B-11a: an SVG with a viewBox but no width/height has no intrinsic
        # size, so a browser gives it the 300x150 replaced-element default and
        # it projects unreadably small however much room the slide has. Seven
        # hand-authored figures shipped this way across four chapters.
        if src.lower().endswith(".svg"):
            try:
                head = open(full, encoding="utf-8", errors="replace").read(4000)
            except OSError:
                head = ""
            root = re.search(r"<svg\b[^>]*>", head, re.S)
            if root and not (re.search(r'\bwidth="', root.group(0))
                             and re.search(r'\bheight="', root.group(0))):
                problems.append(("error", line_of(text, m.start()), "B-11a",
                                 f"{src}: <svg> has no width/height — browsers "
                                 f"fall back to 300x150 and it projects tiny; "
                                 f"add both, matching the viewBox"))

    # xref targets exist somewhere in the book.
    ids = set(re.findall(r'xml:id="([^"]+)"', raw))
    for other in os.listdir(os.path.join(REPO, "source")):
        if other.endswith(".ptx") and os.path.basename(path) != other:
            ids |= set(re.findall(r'xml:id="([^"]+)"',
                                  open(os.path.join(REPO, "source", other),
                                       encoding="utf-8").read()))
    for m in re.finditer(r'<xref\s+ref="([^"]+)"', text):
        if m.group(1) not in ids:
            problems.append(("error", line_of(text, m.start()), "B-9",
                             f"xref to unknown id: {m.group(1)}"))

    # Slide refs point at targetable elements that exist.
    for m in re.finditer(r'<slide[^>]*\bref="([^"]+)"', text):
        if m.group(1) not in ids:
            problems.append(("error", line_of(text, m.start()), "S-4",
                             f"slide ref to unknown id: {m.group(1)}"))

    # Count drift: "four steps" vs. how many actually follow.  Both list kinds:
    # "Three things follow from sharing the wires" sat over a four-item <ul> on a
    # projected slide, and Petra deleted the lead sentence rather than fix the
    # number -- a sentence whose only content is a count is not carrying anything.
    for m in re.finditer(r"\b(" + "|".join(NUMBER_WORDS) + r")\s+(steps|things|parts|stages)\b",
                         text, re.I):
        claimed = NUMBER_WORDS[m.group(1).lower()]
        window = text[m.end():m.end() + 4000]
        actual = None
        at = window.find("</ol>")
        if 0 <= at and "</ol>" in window[:2000]:
            actual = len(re.findall(r"<li\b", window[:at + 1]))
        else:
            # A <ul> only counts when it is *this sentence's* list: the lead
            # paragraph ends and the list opens straight after it.  Anything
            # looser matches the next unrelated bullet list and warns about
            # nothing -- that costs more than the drift it would find.
            start = window.find("<ul")
            lead = window[:start] if start >= 0 else ""
            if 0 <= start <= 400 and "</p>" in lead \
                    and not re.search(r"<p[\s>]", lead) and "<li" not in lead:
                at = window.find("</ul>")
                if at > start:
                    actual = len(re.findall(r"<li\b", window[:at + 1]))
        if actual and actual != claimed:
            problems.append(("warn", line_of(text, m.start()), "B-9",
                             f"says {m.group(1)} {m.group(2)} but the next list has {actual} items"))

    # Well-formedness.
    try:
        ET.parse(path)
    except ET.ParseError as e:
        problems.append(("error", getattr(e, "position", (0, 0))[0], "XML",
                         f"not well-formed: {e}"))

    allowed = allowances(raw)
    problems = [p for p in problems
                if not any(lo <= p[1] <= hi for lo, hi in allowed.get(p[2], []))]

    problems.sort(key=lambda p: (p[1], p[2]))
    errors = sum(1 for p in problems if p[0] == "error")

    if problems and not (quiet and errors == 0):
        print(f"\n{os.path.relpath(path, REPO)}")
        for sev, line, rid, msg in problems:
            if quiet and sev != "error":
                continue
            mark = "ERROR" if sev == "error" else "warn "
            print(f"  {mark} {line:5d}  [{rid}]  {msg}")
    return errors, len(problems) - errors


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+")
    ap.add_argument("--quiet", action="store_true", help="errors only")
    args = ap.parse_args()

    e = w = 0
    for f in args.files:
        fe, fw = check_file(f, args.quiet)
        e += fe
        w += fw
    print(f"\n{e} error(s), {w} warning(s)")
    sys.exit(1 if e else 0)


if __name__ == "__main__":
    main()
