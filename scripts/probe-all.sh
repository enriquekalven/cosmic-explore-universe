#!/usr/bin/env bash
# Captures the key views for visual QA (headless, software GL → slow but deterministic).
cd "$(dirname "$0")/.."
export NODEBUG=1
run () { node scripts/cdp-probe.mjs "$1" "$2" 20000 | grep -E "EXCEPTION|console\.(error|warn)|NETFAIL" ; echo "✓ $2"; }
run "" scratch/view_earth.png
run "f=moon&z=6&y=-0.4&p=0.35" scratch/view_moon.png
run "f=saturn&y=0.7&p=0.45" scratch/view_saturn.png
run "f=sun&z=37&y=-0.6&p=0.62" scratch/view_solar.png
run "f=voyager1&z=43&y=-0.2&p=0.5" scratch/view_voyager.png
run "f=trappist1&y=-0.5&p=0.55" scratch/view_trappist.png
run "f=sun&z=58&y=0.9&p=0.3" scratch/view_stars.png
run "f=sagittariusA&z=84&y=2.8&p=0.6" scratch/view_galaxy.png
run "f=milkyWayDisk&z=93.5&y=0.6&p=0.5" scratch/view_universe.png
echo "probe-all done"
