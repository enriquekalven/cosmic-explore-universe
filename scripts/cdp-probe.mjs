#!/usr/bin/env node
/**
 * CDP probe: launches headless Chrome, opens the site, waits, then prints console messages,
 * the engine debug state (window.__cosmicDebug) and saves a screenshot.
 *
 * Usage: node scripts/cdp-probe.mjs "<hash>" out.png [waitMs] [evalExpression]
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [, , hash = '', out = 'scratch/probe.png', waitMsArg = '12000', extraEval = ''] = process.argv;
const waitMs = parseInt(waitMsArg, 10);
const url = process.env.NODEBUG ? `http://127.0.0.1:8088/#${hash}` : `http://127.0.0.1:8088/?debug=1#${hash}`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9333 + Math.floor(Math.random() * 200);

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-extensions',
    '--disable-gpu-sandbox',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=/tmp/cosmic-cdp-${port}`,
    'about:blank'
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getBrowserWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      const json = await res.json();
      return json.webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error('Chrome did not start');
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    const listeners = [];
    ws.addEventListener('open', () => resolve({ send, on, close: () => ws.close() }));
    ws.addEventListener('error', reject);
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      } else if (msg.method) {
        for (const l of listeners) l(msg);
      }
    });
    function send(method, params = {}, sessionId) {
      return new Promise((res, rej) => {
        const mid = ++id;
        pending.set(mid, { res, rej });
        ws.send(JSON.stringify({ id: mid, method, params, sessionId }));
      });
    }
    function on(fn) {
      listeners.push(fn);
    }
  });
}

try {
  const wsUrl = await getBrowserWs();
  const cdp = await connect(wsUrl);
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const logs = [];
  const requests = new Map();
  cdp.on((msg) => {
    if (msg.sessionId !== sessionId) return;
    if (msg.method === 'Runtime.consoleAPICalled') {
      logs.push(`[console.${msg.params.type}] ${msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ')}`);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      logs.push(`[EXCEPTION] ${d.text} ${d.exception?.description || ''} @ ${d.url}:${d.lineNumber}`);
    } else if (msg.method === 'Log.entryAdded') {
      const e = msg.params.entry;
      if (e.level === 'error' || e.level === 'warning') logs.push(`[log.${e.level}] ${e.text} ${e.url || ''}`);
    } else if (msg.method === 'Network.requestWillBeSent') {
      requests.set(msg.params.requestId, msg.params.request.url);
    } else if (msg.method === 'Network.loadingFailed') {
      logs.push(`[NETFAIL] ${msg.params.errorText} ${requests.get(msg.params.requestId) || ''}`);
    } else if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
      logs.push(`[HTTP ${msg.params.response.status}] ${msg.params.response.url}`);
    }
  });
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Log.enable', {}, sessionId);
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Network.enable', {}, sessionId);
  await cdp.send('Page.navigate', { url }, sessionId);
  await sleep(waitMs);
  const state = await cdp.send(
    'Runtime.evaluate',
    { expression: 'typeof window.__cosmicDebug === "function" ? JSON.stringify(window.__cosmicDebug(), null, 1) : "no __cosmicDebug"', returnByValue: true },
    sessionId
  );
  console.log('=== engine state ===');
  console.log(state.result.value);
  if (extraEval) {
    const r = await cdp.send('Runtime.evaluate', { expression: extraEval, returnByValue: true, awaitPromise: true }, sessionId);
    console.log('=== eval ===');
    console.log(JSON.stringify(r.result.value, null, 1));
    await sleep(2500);
  }
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log('=== console ===');
  console.log(logs.filter((l) => !/ReadPixels|GL Driver/.test(l)).slice(0, 40).join('\n') || '(no console output)');
  console.log(`=== screenshot: ${out}`);
  cdp.close();
} catch (err) {
  console.error('probe failed:', err.message);
} finally {
  chrome.kill('SIGKILL');
  process.exit(0);
}
