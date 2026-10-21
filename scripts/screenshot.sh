#!/usr/bin/env bash
# Headless-Chrome smoke test: loads the site, captures console errors and a screenshot.
# Usage: scripts/screenshot.sh "<hash-fragment>" out.png [wait-ms]
set -uo pipefail
cd "$(dirname "$0")/.."
HASH="${1:-}"
OUT="${2:-scratch/shot.png}"
WAIT="${3:-9000}"
URL="http://127.0.0.1:8088/#${HASH}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$(dirname "$OUT")" scratch
LOG="scratch/chrome-console.log"
"$CHROME" --headless=new --disable-extensions --disable-component-extensions-with-background-pages --disable-background-networking --disable-gpu-sandbox --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist \
  --enable-logging=stderr --v=0 --no-first-run --no-default-browser-check \
  --window-size=1440,900 --hide-scrollbars --virtual-time-budget="$WAIT" --run-all-compositor-stages-before-draw \
  --user-data-dir=/tmp/cosmic-chrome-profile --screenshot="$OUT" "$URL" 2> "$LOG" >/dev/null
echo "--- console messages (errors/warnings from the page) ---"
grep -E "CONSOLE" "$LOG" | grep -E "127.0.0.1|Uncaught|THREE"  | sed -E 's/^.*CONSOLE/CONSOLE/' | head -40
echo "--- screenshot: $OUT"
