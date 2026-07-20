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

## Git

Separate from deploying — history and backup, not your publish step.

```sh
git status                 # always worth a look first
git add -A && git commit -m "..."
git push
```

`output/` is git-ignored. Watch for large binaries in `git status` — the slide
`.pptx` files under `assets/slides/inclass/` are untracked and currently
uncommitted. Binaries are permanent once committed, so decide deliberately
rather than sweeping them in with `git add -A`; if they don't belong in the
repo, add them to `.gitignore` instead.

## Deploying

```sh
pretext deploy
```

This builds and publishes to the `gh-pages` branch, which GitHub Pages serves.
Unlike the C-Programming book — whose deploy reads the working tree directly —
here deploying goes through git, so commit and push first.

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
