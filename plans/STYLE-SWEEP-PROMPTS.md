# The whole-book style and voice sweep — session prompts

Petra's ask (2026-09-14), after the last day passed: the second half of
the book hits her voice better than the beginning, and styling drifted
over the term.  One uniform style throughout; links display one way;
every reference-manual and datasheet mention in the BOOK links to the
hosted copy; **no links in the slides** (the standing rule — nothing
projected carries a link, because a click in class replaces the deck).

The sweep is three prompts, run in order, each in a fresh session.
Prompt 1 produces the style contract she approves; Prompt 2 applies the
mechanical half; Prompt 3 is repeatable, a few chapters per session,
for the voice half.  Do not run 2 or 3 before she has passed 1's
contract: a corpus-wide edit against an unapproved ruleset churns text
she has signed off.

What a session must never do, in any stage:

- **Reword text that is hers.**  Her review-comment wording, her slide
  text carried into the book, her passed activities: the floor.  Where
  a style rule collides with a sentence she authored, flag it in the
  delivery, do not edit it.  The archive
  (`reviews/slide-comments-archive.jsonl`) and the per-day gate files
  in `reviews/` record what she touched.
- **Put a link into anything projected.**  `<slide>` bodies, and every
  `<activity>`/`<task>`/`<instructor>` block any deck refs (the deck
  JSONs name them).  The established grep is the rule, extended to
  `<url`:  `grep -n '<xref\|<url'` over every block a deck entry
  names, including the figures and tables those blocks ref.
- **Deliver unreviewed.**  checker-voice runs before every delivery
  (learner-in-the-room too when slides are touched); rebuild all
  targets one by one, run `check_rules`, `check_deck`,
  `check_starters`, `check_instructor_only`, `image_ratios --check`
  before every commit; commit per chapter so her review comments can
  target cleanly.

Starting facts (measured 2026-09-14, worth re-verifying at Prompt 1):
the book mentions the reference manual ~180 times but links to
`external/stm32c031_rm.pdf` only 9 times; `ch-uart`, `ch-transistors`,
`ch-timers-interrupts` and `ch-io-datasheets` contain no `<url>` at
all; `ch-timers-interrupts` alone has 22 unlinked RM mentions.  The
hosted targets are `external/stm32c031_rm.pdf`,
`external/stm32c031_datasheet.pdf`, `external/nucleo_user_manual.pdf`,
`external/nucleo_schematic.pdf`, `external/nucleo_pinout.pdf`, and
`external/datasheets/<name>.pdf` for the component datasheets
(CLAUDE.md lists them per day).

---

## Prompt 1 — the inventory, and the style contract

> You are preparing a whole-book style and voice sweep of the ENGS 28
> textbook.  Read CLAUDE.md, AUTHORING-book.md, AUTHORING-slides.md,
> and plans/STYLE-SWEEP-PROMPTS.md (the charter for this sweep — its
> constraints are non-negotiable).  This session EDITS NOTHING in
> source/; it measures, and it drafts the contract I will approve.
>
> Produce plans/style-sweep.md with three parts.
>
> Part A, the divergence catalog: for every style mechanic that varies
> across source/*.ptx, show the variants with counts and one example
> each.  At minimum: how the reference manual is cited (bare "the
> reference manual", "RM0490", "RM0490 §N", linked vs unlinked); how
> datasheets are cited; `<url>` display-text conventions; what other
> mechanics actually vary — measure rather than guess (candidates:
> `<c>` vs `<term>` on first-use terms, figure-caption sentence shape,
> activity `<introduction>` conventions, register-name styling, unit
> spacing, list punctuation, xref text forms).  Also map which
> chapters were passed by Petra and which never got her pass
> (CHAPTER_PROCESS.md's table), because that decides how carefully
> Prompt 3 must tread per chapter.
>
> Part B, the proposed contract: one rule per mechanic, written so a
> linter can check it.  For links, propose: the display form for the
> RM ("RM0490 §20.3" linked on the "RM0490 §20.3"?  On the section
> number?), the form for datasheets, whether a section-deep mention
> links every time or once per subsection, and whether PDF page
> anchors (#page=N) are worth it (test that our hosted PDFs honor
> them in the browsers she uses before proposing).  For voice, do not
> write rules — that is Prompt 3's job against the frozen specimens —
> but DO rank the chapters by voice distance: run checker-voice in
> survey mode over the two or three oldest chapters and the two or
> three newest and characterize the gap, so Part C's ordering is
> evidence, not chronology.
>
> Part C, the worklist: the chapter order for Prompts 2 and 3, with
> the passed/unpassed flag and the estimated comment surface per
> chapter.
>
> Deliver plans/style-sweep.md plus a short message to me: the
> contract as numbered questions where a call is genuinely mine, and
> flat statements where the corpus already answers it.  Commit only
> the plan file.  Do not begin the sweep.

## Prompt 2 — links and mechanical style (after the contract is passed)

> Apply the approved style contract in plans/style-sweep.md to the
> whole book — the mechanical half only: links, citation forms, and
> the Part B mechanics I passed.  Read CLAUDE.md,
> plans/STYLE-SWEEP-PROMPTS.md (the charter; its three "never" rules
> bind), and plans/style-sweep.md first.
>
> The core job: every reference-manual and datasheet mention in book
> prose links to the hosted copy in the approved display form —
> external/stm32c031_rm.pdf, external/stm32c031_datasheet.pdf, the
> Nucleo documents, external/datasheets/<name>.pdf — and every
> existing link is normalized to the same form.  NO link lands in
> anything projected: not in `<slide>` blocks, not in any activity,
> task, table, figure or instructor block a deck refs (build the
> ref'd-id list from assets/decks/*.json and grep those blocks for
> `<url` and `<xref` before and after).  A mention inside a projected
> activity stays plain text; if the reading needs the link, it goes in
> the surrounding prose, per AUTHORING-slides.md.
>
> Add the contract's lintable rules to scripts/check_rules.py as new
> L-rules (unlinked RM/datasheet mention in prose; malformed link
> display; `<url` inside a projected block) and document them in
> AUTHORING-book.md, so the uniformity survives future edits.
>
> Work chapter by chapter in the plan's Part C order, one commit per
> chapter.  Before each commit: all five targets rebuilt, all checks
> green.  After the last chapter: checker-voice spot-checks three
> chapters' changed paragraphs (a link insertion must not have bent a
> sentence), and the deck player is opened on two decks whose book
> pages changed, to confirm nothing projected gained a link.  Deliver
> with the per-chapter change counts and anything flagged rather than
> changed.

## Prompt 3 — the voice sweep, a few chapters per session (repeatable)

> Voice-sweep the next chapters on plans/style-sweep.md's Part C
> worklist: [CHAPTERS].  The goal: the early chapters read like the
> late ones, which is to say like me.  Read CLAUDE.md,
> AUTHORING-book.md (S-11…S-30 and the calibrations),
> plans/STYLE-SWEEP-PROMPTS.md (the charter; its three "never" rules
> bind), and the three frozen specimens —
> plans/day10-voice-reference.diff first, then
> plans/day9x-voice-reference.md and plans/day8-voice-reference.diff.
>
> Per chapter: checker-voice reviews the full chapter (book prose AND
> its `<slide>` blocks — a slide and the paragraph it condenses must
> not sound like different people, and both surfaces are rechecked
> whole when either changes).  Apply the rewrites with two guards.
> First, my wording is the floor: anything I wrote, passed by comment,
> or that came verbatim from my old decks is flagged in the delivery
> if a finding lands on it, never edited.  For a chapter
> CHAPTER_PROCESS.md marks as never passed by me, the sweep has a
> freer hand, but my slide-derived wording is still mine.  Second,
> restoring register lengthens text: every touched `<slide>` block
> means a full fit sweep of that day's deck at 1600×900 with the
> crossfade killed and MathJax settled, and LOOKING at every changed
> slide, not just measuring.  The no-links-in-slides rule holds for
> anything the sweep moves.
>
> Committee before delivery: checker-voice confirms its own findings
> landed, and learner-in-the-room walks any deck whose slides
> changed.  One commit per chapter, all targets rebuilt and all
> checks green before each.  Deliver per chapter: what changed, what
> was flagged as mine and left, and the fit-sweep result.  Then I
> review in the web-edit preview and my comments come back through
> the normal batch workflow.
