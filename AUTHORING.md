# Authoring Guide: ENGS 28

One place to remember what to actually do — editing, building, git, deploying.
For *how to write a chapter* (style, structure, the process that worked), see
`CHAPTER_PROCESS.md`. For conventions and gotchas, see `CLAUDE.md`.

## Working on the book

```sh
./preview-edit.sh          # build, serve, start the helpers. Ctrl-C stops all.
```

Open <http://localhost:8931/>, then hold <kbd>alt</kbd>:

| | |
| --- | --- |
| **alt-click** a paragraph | opens it in your editor at the right file and line |
| **alt-shift-click** a paragraph | edit the text in place; ⌘⏎ saves it to source |

Everything outlines in green while alt is held, so you can see what a click
will land on. It rebuilds whenever you save a `.ptx` (about 4 seconds), so a
refresh shows your change — pass `--no-watch` to hold the preview still.

Full details, including what in-place editing will and won't do:
`scripts/README-editing.md`.

**In-place editing only changes a block's own text.** Anything inside inline
markup — `<term>`, `<c>`, `<em>` — is refused, because rewriting across markup
can silently move it onto words it was never meant to mark. Alt-click and use
your editor for those, and for anything structural.

## Building

```sh
./build.sh                 # the "web" target, what you deploy
pretext build print        # the PDF
```

`build.sh` wraps `pretext build web` and first deletes `output/web/external/`,
which works around a macOS permission error on rebuilds (`shutil.copy2`
preserves read-only permissions on the copies it made last time).

`web-edit` is deliberately **not** part of `build.sh`. It is the only target
carrying a script that talks to a server able to rewrite your source files, so
it must never end up in something you publish.

## The board simulator in the book

Any exercise can carry a live, in-browser Nucleo — the
[board simulator](https://github.com/petraBT/ENGS28-board-sim), which runs the
same register-level C as the real board. Drop a `<sim>` into the source:

```xml
<sim starter="blinkySlowToFast"/>   <!-- assets/sim-starters/<name>.c -->
<sim example="blinky"/>             <!-- a built-in example -->
<sim starter="…" height="720"/>     <!-- taller frame (default 660) -->
<sim starter="…" coolterm="yes"/>   <!-- serial terminal open from the start -->
```

`coolterm="yes"` is for UART exercises: it opens the simulator's serial
terminal (the panel labeled *CoolTerm*, where `printf` output arrives and
keystrokes go back to the board) immediately, instead of leaving it closed
until the program transmits its first byte. Give those a taller frame, 740 or
so, since the terminal takes its height from the editor's.

**The instructor builds get the instructor simulator, automatically.** The
simulator's examples dropdown lists only code the students have been given;
its solutions and demos are separate. Any target with `book.solutions=render`
— the instructor book and the deck you teach from — hands every `<sim>` a
side-car file of those extras, so the dropdown there gains an *Instructor
only* group and a red INSTRUCTOR badge. Student targets pass nothing, and the
file is not in their output to be found. Nothing to write per `<sim>`: it
follows the same switch that renders `<instructor>` blocks.

The file is `instructor-only/sim-examples.json`, written by
`scripts/sync-board-sim.sh` and installed into an instructor target's output
*after* the build by `scripts/install-instructor-sim.sh`, which every script
that builds an instructor target calls. It cannot live under `assets/`, since
PreTeXt copies that into every target's `external/` including the deployed one
— `instructor-only/README.md` explains, and `build.sh` refuses to finish the
deployable `web` target if any of it turns up there. Miss the install step and
the instructor book simply shows the student dropdown, with a line in the
simulator's status bar saying so.

Starter code is a plain `.c` file in `assets/sim-starters/` — no registration
step, no tool: create the file, name it in `starter=`, done. Put a `<sim>`
inside a `<slide>` to project the live simulator in class (a *demo* slide);
a `<sim>` inside an `<activity>` is dropped when that activity is projected,
the same as the figures and code listings an activity embeds.

**The simulator ships inside the book.** Its built output is committed at
`assets/board-sim/`, which PreTeXt copies to `external/board-sim/` on every
target — so it works in the local preview, in the deck build, and on the
deployed site, with no separate hosting or deploy step. The deployed copy is
also the standalone URL to link from Canvas:

```
https://engs20book.thayer.dartmouth.edu/ENGS28/external/board-sim/index.html
```

It takes the same parameters as an embed — `?example=blinky`, or
`?src=../sim-starters/<name>.c` for one of this book's starters. (The
`petrabt.github.io/ENGS28/…` form redirects here, so old links keep working,
but link the Dartmouth host.)

`assets/board-sim/` is **built output — never edit it by hand.** Fix the
simulator in its own repo, then:

```sh
./scripts/sync-board-sim.sh    # builds it there, copies the result here
./build.sh                     # see it
git add assets/board-sim && git commit -m "Update the board simulator"
```

If you skip the sync, the deployed book keeps the old simulator.

## Git

Separate from deploying — history and backup, not your publish step.

```sh
git status                 # always worth a look first
git add -A && git commit -m "..."
git push
```

`output/` is git-ignored, and so are the two PowerPoint folders —
`ClassSlidesOLD/` (123 MB) and `ClassSlidesNEW/` (12 MB), both
listed in `.gitignore`. They are the source Step 1 mines, and they live only on
this machine. Binaries are permanent once committed, so watch `git status` and
decide deliberately rather than sweeping anything in with `git add -A`.

Both sit at the **repo root, not under `assets/`**, and that is not cosmetic.
PreTeXt copies everything under `assets/` into every target's `external/`,
including the one `pretext deploy` publishes — so while they lived at
`assets/ClassSlidesOLD/` all 28 of her original decks were being served
publicly from `gh-pages`, linked from nothing but fetchable by anyone who
guessed the path. `scripts/check_not_published.py` now refuses any `.pptx`,
`.key` or `.docx` under `assets/`; run it with the other checks.

## Deploying

```sh
pretext deploy
```

This builds and publishes to the `gh-pages` branch, which GitHub Pages serves.
Unlike the C-Programming book — whose deploy reads the working tree directly —
here deploying goes through git, so commit and push first. That includes
`assets/board-sim/`: the simulator is published as part of the book, so an
unsynced or uncommitted simulator change simply doesn't ship (see above).

`pretext deploy` builds the **`web`** target only, and it ignores `build.sh`
entirely — it runs its own build. So every guard `build.sh` performs has to
exist as a check on the *source tree* as well, which is what
`check_instructor_only.py` and `check_not_published.py` are for. It also copies
the working tree's `assets/`, not the committed one, so a git-ignored file
sitting there is published all the same.

### Where the site actually lives

Worth knowing before talking to Computing, because it is not what it looks like:

- `engs20book.thayer.dartmouth.edu` is **not a redirect**. It is a DNS `CNAME`
  to `petrabt.github.io`, and GitHub Pages serves it directly under the
  Dartmouth hostname.
- The custom domain is set on the **user-site repo**, `petraBT/petrabt.github.io`
  (its `CNAME` file and its Pages setting). GitHub applies a user-site custom
  domain to *every* project site owned by the account, which is why each book
  hangs beneath it as a path: `/ENGS28/`, `/C-Programming/`.
- The TLS certificate is issued and renewed by GitHub for that hostname.
- If the zone ever moves behind a Cloudflare **proxy** (orange cloud), GitHub
  can no longer answer the renewal challenge and the certificate quietly
  expires. The record must stay **DNS-only**.

The student book is `https://engs20book.thayer.dartmouth.edu/ENGS28/`.

### Moving this book to its own hostname

The plan (2026-09-23) is one hostname per book, each serving at its own root:
`engs28book.thayer.dartmouth.edu` for this one, `engs20book…` repointed at the
Cloudflare Pages project that now hosts ENGS 20. A custom domain on *this* repo
overrides the user-site one, so the book lands at `/` and no other book appears
beneath it.

**When that happens, set `cname` in `project.ptx`:**

```xml
<project ptx-version="2" cname="engs28book.thayer.dartmouth.edu">
```

Not optional, and not the same as setting it in GitHub's web UI. `pretext
deploy` publishes through `ghp_import`, which issues `deleteall` and rebuilds
`gh-pages` from scratch on every deploy — it writes a `CNAME` file only when the
project carries a `cname`. Set it in the UI alone and the next deploy silently
deletes it, and the custom domain stops resolving with nothing in the git
history to explain why.

### The decks are published with the book

There is no second deploy. The `web` target renders `<slide>` blocks, so the
book pages `pretext deploy` ships carry the slides the player extracts, and
the player and the deck lists were always up there under `external/`. Before
2026-09-25 they were not: `web` stripped the slides, and 498 of the 945 — 53% —
failed with *Slide … not found* for anyone opening the deployed decks.

```
<host>/slides.html                  the deck list  (short URL, written by build.sh)
<host>/slides.html?deck=day1        one deck
<host>/slides.html?deck=day9#12     straight to a slide
<host>/external/class.html          what those redirect to
```

`slides.html` exists because PreTeXt gives no way to put a file at the site
root from source — everything in `assets/` lands under `external/`. `build.sh`
writes it after the build, which works because `pretext build` never empties
the output directory (only `pretext clean` does) and `pretext deploy` ships
that directory verbatim.

**The published deck is a student artifact**, and that is enforced at build
time, not by the URL. `scripts/filter_student_decks.py` drops instructor-only
slides and `presenterNote` fields from the deck JSON and stamps `studentBuild`;
the player reads that stamp and hides the audience switch, the "Instructor
view" lede and the `(student)` title suffix, and makes `?notes` inert. Run it
only through `./build.sh` or `./scripts/build-deck.sh` — a bare
`pretext build web` re-copies `assets/decks/` over the filtered output and puts
349 presenter notes back. `filter_student_decks.py --check output/web` says
whether that has happened.

## Slide PDFs for students to take notes on

```sh
./make-slide-pdfs.sh                 # every deck
./make-slide-pdfs.sh day1 day3 day6  # just these
./make-slide-pdfs.sh --no-build      # reuse the last web-deck build
```

One PDF per deck in `output/slide-pdfs/`, one landscape page per slide, at
13.333 × 7.5 in — PowerPoint's own 16:9 page, so printing to letter landscape
just works. The text is vector, so it stays sharp and stays selectable.

**Run it whenever.** It rebuilds the student deck from source first, so a slide
edited a minute ago is in the PDF. That is the point: the decks change up to
the last minute, and there is no staleness to remember. It uses its own port
(8362) and does not disturb `./preview-slides.sh` or the review server, so it
is safe to run mid-review.

**Student view only, three times over.** The `web-deck` build strips
instructor-only slides from the HTML, `filter_student_decks.py` drops them from
the deck JSON, and the player is driven with `&student`. A handout is the one
artifact where a leaked solution cannot be taken back.

It drives headless Chrome over raw CDP (`scripts/deck_pdf.mjs`), for the same
reason `deck_fit.mjs` does — a hidden browser pane suspends layout and the
slides come out wrong. Concatenation is `scripts/pdf_concat.py`, which
deliberately does **not** use ghostscript: `gs -sDEVICE=pdfwrite` rebuilds
embedded font subsets and silently lost the `|` from a bitwise-OR listing.
Both scripts' headers carry the evidence; read them before changing either.

## Watching without the preview

`watch.py` can be run on its own if you want rebuilds while using some other
preview:

```sh
python3 watch.py           # builds "web"
python3 watch.py web-edit  # builds a specific target
```

## Relationship to the C-Programming book

The editing tooling (`preview-edit.sh`, `scripts/`, `assets/ptx-edit.js`,
`watch.py`) is shared with `~/repos/C-Programming`, where it started. The
shared files are kept byte-identical so fixes move across cleanly — if you fix
something in one, port it to the other. That book's version does more, because
it has in-browser coding windows and this one doesn't; the corresponding code
here is simply inert.
