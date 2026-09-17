#!/usr/bin/env python3
"""Mechanical rule checks for an ENGS 28 chapter (Step 5 of CHAPTER_PROCESS.md).

Enforces the lintable rules L-1..L-6 from AUTHORING-book.md, plus image paths,
unresolved cross-references, and the count-drift trap ("four steps" when there are
five).  These are the errors that should never reach a human reviewer.

    python3 scripts/check_rules.py source/ch-adc.ptx
    python3 scripts/check_rules.py source/*.ptx --quiet   # errors only
"""

import argparse
import glob
import json
import os
import re
import sys
from xml.etree import ElementTree as ET

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(REPO, "assets")
DECKS = os.path.join(ASSETS, "decks")


def deck_refed_ids():
    """xml:ids that some deck JSON projects (the style sweep's L-21/C-5 scope).

    A deck entry of type "ref" names the projected element's own xml:id in its
    "slide" field -- either a <slide> it points AT via ref=, or (when an
    activity/instructor block is shown wholesale, with no separate <slide>)
    that block's own xml:id directly.  Cached on first call.
    """
    if deck_refed_ids._cache is None:
        ids = set()
        for f in glob.glob(os.path.join(DECKS, "*.json")):
            if os.path.basename(f) == "index.json":
                continue
            deck = json.load(open(f, encoding="utf-8"))
            for s in deck.get("slides", []):
                if isinstance(s, dict) and s.get("type") == "ref" and "slide" in s:
                    ids.add(s["slide"])
        deck_refed_ids._cache = ids
    return deck_refed_ids._cache


deck_refed_ids._cache = None

NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
}

# (id, regex, message, severity)
RULES = [
    # L-1 narrowed 2026-08-10: Petra keeps "Work individually first, then
    # compare", which sequences the student's OWN work.  What stays banned is
    # assigning a grouping, and end-of-class timing.
    ("L-1", r"\bworking in pairs\b|\bwith your (partner|pair)\b|\bbefore you leave\b",
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
            r"whilst|programme|defence|offence|travelling|modelling|labelled|labelling|"
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


from html import unescape as html_unescape


def is_fragment(text):
    """True if a list item does not end in terminal punctuation.

    A trailing bracket or quote is not terminal -- "(anode to cathode)" is still
    a fragment -- so strip those before looking at the last character.
    """
    t = text.rstrip().rstrip(')]}"\u201d\u2019\'')
    return not t or t[-1] not in ".?!:;"


def strip_block_comments(block):
    """Blank out /* ... */ spans, keeping length so offsets stay valid.

    A highlighter closes a block comment at */, so an apostrophe inside one is
    harmless -- only apostrophes in code (or in the plain-text annotations we
    put in teaching listings) start a runaway character literal.
    """
    return re.sub(r"/\*.*?\*/",
                  lambda m: re.sub(r"[^\n]", " ", m.group(0)),
                  block, flags=re.S)


def line_offsets(block):
    """Yield (offset within block, line text) for each line."""
    off = 0
    for line in block.split("\n"):
        yield off, line
        off += len(line) + 1


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

    # L-11, second half: a course-internal day reference in STUDENT-FACING text.
    # Petra's Day 9 hand pass (0b0bba9) struck these -- "On Day 8" -> "Last week",
    # "the Day 3 idiom" -> "the same one we used before" -- and she confirmed the
    # ruling corpus-wide on 2026-09-17: "I'd much prefer referencing topics rather
    # than days."  A day names WHEN, never WHAT: the reader should not have to
    # reconstruct the course calendar to know which topic is meant, and a
    # subsection reached from search has no calendar at all (B-11b).
    #
    # This one cannot live in RULES, which matches the whole file.  Three things
    # keep their day and would otherwise be a hundred false positives:
    #   <title>        "Day 9 In-Class: GPIO Interrupts" is structural (B-1), and
    #                  S-20 explicitly allows a day in a heading.
    #   <instructor>   presenter-facing, the same carve-out L-18 makes for Parts.
    #   <note>         likewise -- it is the presenter note.
    # A day as a plain adverbial of time is also correct and is hers: "we'll see on
    # Thursday why", "tomorrow".  Neither matches this pattern, which is only ever
    # "Day <number>".
    #
    # ERROR since the sweep landed (2026-09-17, all 66 occurrences cleared in
    # source/ and assets/decks/day13.json).  It was a warning only while the
    # corpus still had to be swept; now that it is clean, a new one is a
    # regression and should fail the check rather than scroll past.
    skip = []
    for tag in ("instructor", "note"):
        for m in re.finditer(rf"<{tag}\b[^>]*>.*?</{tag}>", text, re.S):
            skip.append((m.start(), m.end()))
    # A <title> is exempt only when the day IS the heading -- "Day 9 In-Class:
    # GPIO Interrupts" -- which is the section-naming convention B-1 sets.  A
    # title that merely mentions a day is using it as a topic name and is exactly
    # what this rule is for: ch-motors' table title "The five writes, on Day 9's
    # line and on Day 12's" reads better as "on PB4's line and on PA15's", and an
    # exemption for every <title> would have hidden it.
    for m in re.finditer(r"<title\b[^>]*>(.*?)</title>", text, re.S):
        if re.match(r"\s*Day \d+[xX]?\b", m.group(1)):
            skip.append((m.start(), m.end()))
    for m in re.finditer(r"\b[Oo]n Day \d+[xX]?\b", text):
        if any(a <= m.start() < b for a, b in skip):
            continue
        problems.append(("error", line_of(text, m.start()), "L-11",
                         "a day used as the name of a topic in student-facing "
                         "text — say what it was, not when it was  ->  "
                         f"{m.group(0)!r}"))

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

    # B-15: a lone apostrophe in a listing opens a C character literal that the
    # syntax highlighter never closes, so every line after it projects red.
    # Invisible in the source, obvious on the wall -- two Day 10 listings shipped
    # this way. A real character literal ('a') is fine; so is one inside a
    # comment, which the highlighter has already closed at the newline.
    for m in re.finditer(
            r"<program language=\"c\"><code><!\[CDATA\[(.*?)\]\]></code></program>",
            raw, flags=re.S):
        block = strip_block_comments(m.group(1))
        for off, line in line_offsets(block):
            code = line.split("//", 1)[0]
            if "'" not in code:
                continue
            if re.search(r"'(?:\\.|[^'\\])'", code):   # a real char literal
                continue
            problems.append(("error", line_of(raw, m.start(1) + off), "B-15",
                             "stray apostrophe in a listing opens a character "
                             "literal and reddens the rest of the block -- "
                             f"reword: {line.strip()[:60]!r}"))

    # L-12 (the lintable corner): a list item that ends without terminal
    # punctuation is a fragment.  Enumerated checklists are exempt by Petra's
    # ruling (2026-08-12), and the mechanical form of "this list is a checklist"
    # is that most of its items are fragments -- the list's register is
    # enumeration, not prose.  A lone fragment among sentences is the real
    # defect, and that is what warns.  Captions, titles and the S-29 bold label
    # are out of scope entirely.
    for lst in re.finditer(r"<(ul|ol)\b[^>]*>(.*?)</\1>", raw, flags=re.S):
        items = []
        for m in re.finditer(r"<li>(.*?)</li>", lst.group(2), flags=re.S):
            body = re.sub(r"<!\[CDATA\[.*?\]\]>", "", m.group(1), flags=re.S)
            item = html_unescape(re.sub(r"<[^>]+>", "", body)).strip()
            if item:
                items.append((lst.start(2) + m.start(), item))
        frags = [(off, t) for off, t in items if is_fragment(t)]
        if not frags or len(frags) * 2 >= len(items):
            continue                      # no fragments, or an enumerated checklist
        for off, t in frags:
            problems.append(("warning", line_of(raw, off), "L-12",
                             "fragment in a list of sentences -- give it a "
                             f"verb and a full stop: {' '.join(t.split())[:60]!r}"))

    # L-19, L-20, L-21: the style sweep's link contract (plans/style-sweep.md
    # Part B, C-1..C-7).  Every reference-manual/datasheet mention in book
    # prose links to its hosted PDF, once per subsection, in the canonical
    # display form, and never inside anything a deck projects.
    # These scan `text` (comments blanked to spaces, same positions/length as
    # `raw`) rather than `raw` itself: a literal "<slide>" or a unit mention
    # typed inside an authoring comment (e.g. explaining the standing rule)
    # is not a real element and must not seed a bogus multi-thousand-line span.
    projected_ids = deck_refed_ids()
    slide_spans = [element_span(text, m.start())
                   for m in re.finditer(r"<slide\b[^>]*>", text)]
    proj_spans = list(slide_spans)
    for m in re.finditer(r'xml:id="([^"]+)"', text):
        if m.group(1) in projected_ids:
            tag_start = text.rfind("<", 0, m.start())
            proj_spans.append(element_span(text, tag_start))

    # L-21: a <url> anywhere projected -- always forbidden (style-sweep.md
    # C-5).  A bare <xref> is neutralized at render time by the player's
    # dexref() inside an activity/task/instructor/table/figure a deck refs
    # (style-sweep.md A.4), so it is only flagged inside an actual <slide>
    # block, where nothing neutralizes it.
    for s, e in proj_spans:
        block = text[s:e]
        for m in re.finditer(r"<url\b", block):
            problems.append(("error", line_of(raw, s + m.start()), "L-21",
                             "link inside a projected block -- nothing "
                             "projected may carry a link (the standing "
                             "no-links-in-slides rule, style-sweep.md C-5)"))
    for s, e in slide_spans:
        block = text[s:e]
        for m in re.finditer(r"<xref\b", block):
            problems.append(("warn", line_of(raw, s + m.start()), "L-21",
                             "xref inside a <slide> block -- nothing "
                             "neutralizes it there the way the player "
                             "neutralizes one inside an activity "
                             "(style-sweep.md A.4/C-5)"))

    # L-20a: the &#167; entity, instead of a literal section mark.
    for m in re.finditer(r"&#167;", text):
        problems.append(("warn", line_of(raw, m.start()), "L-20",
                         "&#167; entity -- use a literal § (style-sweep.md C-7)"))

    # L-20b: a number and its unit with no space between them.
    for m in re.finditer(
            r"(?<![\w.])\d+(\.\d+)?(V|mA|A|kHz|MHz|Hz|ms|ns|kΩ|Ω|µF|F)\b", text):
        problems.append(("warn", line_of(raw, m.start()), "L-20",
                         f"no space between number and unit: {m.group(0)!r} "
                         f"(style-sweep.md C-7)"))

    # L-20c: an RM/datasheet <url> whose display text isn't the canonical
    # designator-only anchor (style-sweep.md C-1/C-2), or that carries a
    # #page= anchor (C-4).
    for m in re.finditer(r'<url\s+href="(external/(?:stm32c031_rm\.pdf|'
                         r'stm32c031_datasheet\.pdf|datasheets/[^"]+\.pdf))"'
                         r'([^>]*)>(.*?)</url>', text, re.S):
        if 'visual="' in m.group(2):
            continue   # a resource-card CTA (e.g. frontmatter's "Open"), not
                       # an inline prose mention -- C-1/C-2 don't apply to it
        href, anchor = m.group(1), re.sub(r"<[^>]+>", "", m.group(3)).strip()
        if "#page=" in m.group(0):
            problems.append(("error", line_of(raw, m.start()), "L-20",
                             "#page=N anchor on a hosted PDF link -- not "
                             "supported, per style-sweep.md C-4"))
        if href == "external/stm32c031_rm.pdf":
            if not re.fullmatch(r"RM0490|[Rr]eference [Mm]anual", anchor):
                problems.append(("warn", line_of(raw, m.start()), "L-20",
                                 f"RM link anchor {anchor!r} is not the "
                                 f"designator alone (style-sweep.md C-1)"))
        elif not re.search(r"\bdatasheet\b", anchor, re.I) \
                and not re.fullmatch(r"AN-1057.*", anchor):
            problems.append(("warn", line_of(raw, m.start()), "L-20",
                             f"datasheet link anchor {anchor!r} does not read "
                             f"as '<Part> datasheet' (style-sweep.md C-2)"))

    # L-20d: a typed "section N" that means the reference manual or a
    # datasheet, with no designator in the same sentence (the L-14 trap).
    for m in re.finditer(r"\b[Ss]ection\s+\d+(\.\d+)*\b", text):
        window = text[max(0, m.start() - 150):m.start()]
        sentence = re.split(r"[.!?]\s", window)[-1]
        if not re.search(r"[Rr]eference\s+[Mm]anual|RM0490|datasheet",
                         sentence, re.I):
            problems.append(("warn", line_of(raw, m.start()), "L-20",
                             "bare 'section N' with no reference-manual/"
                             "datasheet designator in the same sentence -- "
                             "reads as this book's own section (L-14)"))

    # L-19: an RM/datasheet mention in book prose (i.e. outside a projected
    # block) with no link anywhere in its enclosing subsection/section.
    def in_projected(pos):
        return any(s <= pos < e for s, e in proj_spans)

    scopes = [(m.start(), m.group(1))
              for m in re.finditer(r"<(?:sub)?section\s+xml:id=\"([^\"]+)\"", text)]
    scopes.append((len(text), None))

    def scope_of(pos):
        best = None
        for start, sid in scopes:
            if start <= pos:
                best = (start, sid)
            else:
                break
        return best

    scope_bounds = [s[0] for s in scopes]

    def scope_end(start):
        i = scope_bounds.index(start)
        return scope_bounds[i + 1] if i + 1 < len(scope_bounds) else len(text)

    def scope_has_link(start, href_pat):
        end = scope_end(start)
        return re.search(r'<url\s+href="' + href_pat + r'"', text[start:end])

    warned_scopes = set()
    for m in re.finditer(r"[Rr]eference\s+[Mm]anual|RM0490", text):
        if in_projected(m.start()):
            continue
        sc = scope_of(m.start())
        if sc is None or (sc[1], "rm") in warned_scopes:
            continue
        if not scope_has_link(sc[0], r"external/stm32c031_rm\.pdf"):
            problems.append(("warn", line_of(raw, m.start()), "L-19",
                             "reference-manual mention in book prose with no "
                             "link anywhere in its subsection (style-sweep.md "
                             "C-1/C-3)"))
            warned_scopes.add((sc[1], "rm"))
    for m in re.finditer(r"\bdatasheet\b", text, re.I):
        if in_projected(m.start()):
            continue
        sc = scope_of(m.start())
        if sc is None or (sc[1], "ds") in warned_scopes:
            continue
        if not scope_has_link(sc[0], r"external/(?:stm32c031_datasheet\.pdf|"
                                       r"datasheets/[^\"]+\.pdf)"):
            problems.append(("warn", line_of(raw, m.start()), "L-19",
                             "datasheet mention in book prose with no link "
                             "anywhere in its subsection (style-sweep.md "
                             "C-2/C-3) -- may be a generic back-reference, "
                             "check by hand"))
            warned_scopes.add((sc[1], "ds"))

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
