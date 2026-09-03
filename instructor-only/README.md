# instructor-only/

Files that must reach the **instructor** builds and no others.

This directory exists because of one PreTeXt fact: everything under `assets/`
is copied into *every* target's `external/`, including `web`, which is what
`pretext deploy` publishes. So instructor material cannot live there, however
carefully the XSL avoids linking it — the file would sit on the student site
whether or not a page pointed at it.

Nothing here is copied by a build. `scripts/install-instructor-sim.sh` puts
these files into an instructor target's output directory *after* PreTeXt has
run, which is why every script that builds `web-instructor` or
`web-deck-instructor` calls it.

The failure mode is deliberately the safe one. Miss the install step and the
instructor book simply shows the student simulator, with a line in its status
bar saying the instructor examples did not load; nothing leaks, and a rebuild
fixes it. `build.sh` additionally refuses to finish the deployable `web` target
if any of this content is found in its output.

## Contents

- `sim-examples.json` — the board simulator's instructor-only examples
  (solutions and demos). Written by `scripts/sync-board-sim.sh` from the
  simulator's own `dist-instructor/instructor-examples.json`, so the examples
  have a single source: `src/examples-instructor.ts` in the simulator repo.
  The `<sim>` element hands this file to the simulator with `&examples=…` in
  any target where `book.solutions=render` (see `xsl/engs28-html.xsl`).
