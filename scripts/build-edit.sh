#!/bin/bash
# Rebuild the "web-edit" target — the one preview-edit.sh serves on :8931.
#
# This exists because ./build.sh builds "web", NOT "web-edit".  Hitting a
# Rebuild button wired to build.sh while reading the web-edit preview rebuilds
# a directory you are not looking at, and the page appears not to update.
#
# Mirrors ENGS 20's scripts/build-edit.sh so the Launchpad tiles can be wired
# the same way for both books.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

# Delete the external output folder so PreTeXt recreates it fresh.
# (shutil.copy2 preserves source permissions, which can make copies read-only;
# deleting avoids the "Permission denied" error on subsequent builds.)
rm -rf output/web-edit/external/

pretext build web-edit "$@"
