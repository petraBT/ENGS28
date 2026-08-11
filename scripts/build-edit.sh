#!/bin/bash
# Rebuild the two targets preview-edit.sh serves: "web-edit" on :8931 (the
# student book, with the Alt-click editing helper) and "web-instructor" on
# :8932 (the same book with every <instructor> block rendered).
#
# This exists because ./build.sh builds "web", NOT "web-edit".  Hitting a
# Rebuild button wired to build.sh while reading the web-edit preview rebuilds
# a directory you are not looking at, and the page appears not to update.
#
# Both targets, not just web-edit, because the preview serves both: rebuilding
# one would leave the other book showing the previous save, which is the same
# "my edit did not take" trap one directory over.  It is still half the work of
# scripts/build-all.sh (two targets of four), which is why the Launchpad tile
# has its own Rebuild rather than sending you to the build-all one.
#
# Mirrors ENGS 20's scripts/build-edit.sh so the Launchpad tiles can be wired
# the same way for both books — ENGS 20 has no instructor target, so there it
# is still the single web-edit build.
#
# Usage: ./scripts/build-edit.sh [--edit-only] [pretext args...]
#
# --edit-only skips web-instructor, for when you are only reading the student
# book and want the shorter turnaround.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

TARGETS=(web-edit web-instructor)
if [ "$1" = "--edit-only" ]; then
    TARGETS=(web-edit)
    shift
fi

for t in "${TARGETS[@]}"; do
    # Delete the external output folder so PreTeXt recreates it fresh.
    # (shutil.copy2 preserves source permissions, which can make copies
    # read-only; deleting avoids "Permission denied" on subsequent builds.)
    rm -rf "output/$t/external/"
    pretext build "$t" "$@"
done
