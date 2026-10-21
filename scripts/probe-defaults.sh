#!/usr/bin/env bash
# Second QA batch: default vantages that the UI itself produces (fly-to chips, stage buttons).
cd "$(dirname "$0")/.."
export NODEBUG=1
settle='e.zoom=e.targetZoom;e.rig.yaw=e.rig.targetYaw;e.rig.pitch=e.rig.targetPitch;return e.getState();'
run () { node scripts/cdp-probe.mjs "$1" "$2" 20000 "$3" | grep -E "EXCEPTION|console\.(error|warn)|NETFAIL|\"y\"|\"p\"|\"z\"" ; echo "✓ $2"; }
run "" scratch/qa_voyager1.png "(()=>{const e=window.__cosmicApp.engine;e.focusOn('voyager1',{fromUser:true});$settle})()"
run "" scratch/qa_voyager2.png "(()=>{const e=window.__cosmicApp.engine;e.focusOn('voyager2',{fromUser:true});$settle})()"
run "" scratch/qa_galaxy_faceon.png "(()=>{const e=window.__cosmicApp.engine;e.jumpToStage(3);$settle})()"
run "" scratch/qa_universe.png "(()=>{const e=window.__cosmicApp.engine;e.jumpToStage(4);$settle})()"
run "f=lmc" scratch/qa_lmc.png
run "f=proxima" scratch/qa_proxima.png
echo "probe-defaults done"
