#!/usr/bin/env python3
"""
watch.py — auto-rebuild PreTeXt whenever a source file is saved.

Watches source/ for .ptx and assets/decks/ for .json. The decks are watched
because a deck is source too: hand-edit one and nothing rebuilt, so the served
copy stayed stale and the player's own slide editor went on showing — and
offering to overwrite — the version from before the edit.

Run once from the project root:
    python3 watch.py                            # builds the "web" target
    python3 watch.py web-edit                   # builds another target
    python3 watch.py --command ./scripts/build-edit.sh

Then just save any .ptx file in your editor — the build triggers automatically.
Press Ctrl+C to stop.

--command exists because a target is not always the whole build: the
C-Programming book needs post-build steps (applets, sibling directories) that
`pretext build` alone doesn't do, so there it watches a script instead. This
file is kept byte-identical between the two books so fixes move across cleanly.
"""

import subprocess
import sys
import time
import threading
from pathlib import Path

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print("Installing watchdog (one-time)...")
    subprocess.run([sys.executable, "-m", "pip", "install", "watchdog"], check=True)
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler


# What counts as source, and where it lives. A directory that doesn't exist in
# this book is skipped rather than being an error, so the file stays identical
# between the two books even when only one of them has decks.
WATCH_SUFFIXES = (".ptx", ".json")
WATCH_DIRS = ("source", "assets/decks")


class PTXHandler(FileSystemEventHandler):
    def __init__(self, command):
        self.command = command
        self._lock = threading.Lock()
        self._pending = False
        self._last_file = ""

    def on_modified(self, event):
        self._trigger(event)

    def on_created(self, event):
        self._trigger(event)

    def _trigger(self, event):
        if event.is_directory:
            return
        if not event.src_path.endswith(WATCH_SUFFIXES):
            return
        with self._lock:
            if self._pending:
                return          # already queued, don't stack builds
            self._pending = True
            self._last_file = Path(event.src_path).name
        # Small debounce — editors often fire multiple events per save
        threading.Timer(0.5, self._build).start()

    def _build(self):
        with self._lock:
            fname = self._last_file
            self._pending = False
        print(f"\n  saved: {fname}")
        print("  building...", flush=True)
        t0 = time.time()
        result = subprocess.run(
            self.command,
            capture_output=True,
            text=True,
        )
        elapsed = time.time() - t0
        if result.returncode == 0:
            print(f"  done ({elapsed:.1f}s) — refresh your browser.")
        else:
            print(f"  build failed ({elapsed:.1f}s):")
            # Print only non-empty lines from stderr for readability
            for line in result.stderr.splitlines():
                if line.strip():
                    print(f"    {line}")
        # Flush explicitly: when this runs from preview-edit.sh its output may
        # not be a terminal, and Python block-buffers in that case - the build
        # would finish while the log still said "building...".
        print(flush=True)


if __name__ == "__main__":
    if "--command" in sys.argv:
        command = sys.argv[sys.argv.index("--command") + 1:]
        if not command:
            sys.exit("--command needs something to run")
    else:
        target = sys.argv[1] if len(sys.argv) > 1 else "web"
        command = ["pretext", "build", target]

    handler = PTXHandler(command)
    observer = Observer()
    watched = []
    for directory in WATCH_DIRS:
        if Path(directory).is_dir():
            observer.schedule(handler, directory, recursive=True)
            watched.append(directory + "/")

    print(f"Watching {', '.join(watched)} — will run '{' '.join(command)}' on every save.")
    print("Press Ctrl+C to stop.\n")
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopped.")
        observer.stop()
    observer.join()
