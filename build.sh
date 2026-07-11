#!/bin/bash
# Build the ENGS 28 PreTeXt book.
# Fixes the macOS permission issue where shutil.copy2 can't overwrite
# files it previously created in output/web/external/.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Delete the external output folder so PreTeXt recreates it fresh.
# (shutil.copy2 preserves source permissions, which can make copies read-only;
# deleting avoids the "Permission denied" error on subsequent builds.)
rm -rf output/web/external/

pretext build web "$@"
