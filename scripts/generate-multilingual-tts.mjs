#!/usr/bin/env node
/**
 * Pre-renders studio narration MP3s for Spanish (es-US-Chirp3-HD-Aoede)
 * and Mandarin Chinese (cmn-CN-Chirp3-HD-Aoede) via Google Cloud Text-to-Speech API.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { STUDIO_AUDIO_MANIFEST } from '../src/catalog/audioManifest.js';
import { getCosmicObject, getGuidedTourStops } from '../src/i18n.js';
import { describeAny } from '../src/catalog/describe.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function cleanProsody(text, lang) {
  let s = String(text).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '');
  if (lang === 'es') {
    s = s
      .replace(/R⊕/g, 'radios terrestres')
      .replace(/M⊕/g, 'masas terrestres')
      .replace(/R☉/g, 'radios solares')
      .replace(/M☉/g, 'masas solares')
      .replace(/°C/g, ' grados Celsius')
      .replace(/°F/g, ' grados Fahrenheit')
      .replace(/\bUA\b|\bAU\b/g, 'unidades astronómicas')
      .replace(/\bkm\/s\b/g, 'kilómetros por segundo')
      .replace(/\bkm\/h\b/g, 'kilómetros por hora')
      .replace(/\bmph\b/g, 'millas por hora')
      .replace(/\bly\b/g, 'años luz')
      .replace(/Sagitario A\*/g, 'Sagitario A Estrella')
      .replace(/A\*/g, 'A Estrella')
      .replace(/[•·]/g, ', ')
      .replace(/−/g, 'menos ');
  } else if (lang === 'zh') {
    s = s
      .replace(/R⊕/g, '地球半径')
      .replace(/M⊕/g, '地球质量')
      .replace(/R☉/g, '太阳半径')
      .replace(/M☉/g, '太阳质量')
      .replace(/°C/g, '摄氏度')
      .replace(/°F/g, '华氏度')
      .replace(/\bAU\b/g, '天文单位')
      .replace(/\bkm\/s\b/g, '公里每秒')
      .replace(/\bkm\/h\b/g, '公里每小时')
      .replace(/\bmph\b/g, '英里每小时')
      .replace(/\bly\b/g, '光年')
      .replace(/人马座 A\*/g, '人马座 A 星')
      .replace(/A\*/g, 'A 星')
      .replace(/(\d),(\d)/g, '$1$2')
      .replace(/[•·]/g, '，')
      .replace(/——/g, '，')
      .replace(/；/g, '。')
      .replace(/：/g, '：')
      .replace(/\.\s+/g, '。')
      .replace(/[“”"']/g, '')
      .replace(/−/g, '零下');
  }
  return s.replace(/\s+/g, ' ').trim();
}

function buildTextForKey(key, lang) {
  if (key.startsWith('obj_')) {
    const id = key.slice(4);
    const obj = getCosmicObject(id, lang) || describeAny(id, lang);
    if (!obj) throw new Error(`Missing object ${id} for lang ${lang}`);
    const sep = lang === 'zh' ? '。' : '. ';
    const factPrefix = lang === 'es' ? ' Dato curioso: ' : ' 趣味事实。';
    const fact = obj.funFacts && obj.funFacts.length ? `${factPrefix}${obj.funFacts[0]}` : '';
    return cleanProsody(`${obj.name}${sep}${obj.kidSummary}${fact}`, lang);
  }
  if (key.startsWith('tour_')) {
    const idx = parseInt(key.slice(5), 10);
    const stops = getGuidedTourStops(lang);
    const stop = stops[idx];
    if (!stop) throw new Error(`Missing tour stop ${idx} for lang ${lang}`);
    const sep = lang === 'zh' ? '。' : '. ';
    return cleanProsody(`${stop.title}${sep}${stop.narration}`, lang);
  }
  throw new Error(`Unknown manifest key ${key}`);
}

async function callTtsApi(text, voice, token, outPath) {
  const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-goog-user-project': 'project-maui',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: { text },
      voice,
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.0
      }
    })
  });

  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`TTS API failed (${res.status}) for ${outPath}: ${errTxt}`);
  }
  const data = await res.json();
  if (!data.audioContent) {
    throw new Error(`No audioContent returned for ${outPath}`);
  }
  return Buffer.from(data.audioContent, 'base64');
}

function splitZhChunks(text, maxLen = 38) {
  const clauses = text
    .split(/(?<=[。！？.!?,，；;：:、])\s*/)
    .map((c) => c.trim())
    .filter(Boolean);
  const chunks = [];
  let cur = '';
  for (const c of clauses) {
    if ((cur + c).length > maxLen && cur) {
      chunks.push(cur.replace(/[，,；;：:、]$/, '。'));
      cur = c;
    } else {
      cur += c;
    }
  }
  if (cur) chunks.push(cur.replace(/[，,；;：:、]$/, '。'));
  return chunks.map((ch) => (/[。！？.!?]$/.test(ch) ? ch : `${ch}。`));
}

async function synthesizeToMp3(text, lang, outPath, token) {
  const voice =
    lang === 'es'
      ? { languageCode: 'es-US', name: 'es-US-Chirp3-HD-Aoede' }
      : { languageCode: 'cmn-CN', name: 'cmn-CN-Chirp3-HD-Aoede' };

  if (lang === 'zh') {
    const chunks = splitZhChunks(text, 38);
    const buffers = [];
    for (const chunk of chunks) {
      buffers.push(await callTtsApi(chunk, voice, token, outPath));
    }
    const combined = Buffer.concat(buffers);
    await fs.writeFile(outPath, combined);
    return combined.length;
  }

  const buf = await callTtsApi(text, voice, token, outPath);
  await fs.writeFile(outPath, buf);
  return buf.length;
}

async function main() {
  const token = execSync(
    'CLOUDSDK_METRICS_ENVIRONMENT="${CLOUDSDK_METRICS_ENVIRONMENT:+$CLOUDSDK_METRICS_ENVIRONMENT }datacloud.antigravity" gcloud auth print-access-token',
    { encoding: 'utf8' }
  ).trim();

  const keys = Object.keys(STUDIO_AUDIO_MANIFEST);
  const langs = ['es', 'zh'];

  for (const lang of langs) {
    await fs.mkdir(path.join(ROOT, 'assets', 'audio', lang), { recursive: true });
  }

  const tasks = [];
  for (const lang of langs) {
    for (const key of keys) {
      const outPath = path.join(ROOT, 'assets', 'audio', lang, `${key}.mp3`);
      tasks.push({ key, lang, outPath });
    }
  }

  console.log(`Generating ${tasks.length} Chirp3-HD MP3 files across es & zh...`);
  let completed = 0;
  const concurrency = 6;
  let cursor = 0;

  async function worker() {
    while (cursor < tasks.length) {
      const idx = cursor++;
      const t = tasks[idx];
      try {
        const stat = await fs.stat(t.outPath);
        if (stat.size > 1024) {
          completed++;
          continue;
        }
      } catch (_) {}
      const text = buildTextForKey(t.key, t.lang);
      const bytes = await synthesizeToMp3(text, t.lang, t.outPath, token);
      completed++;
      if (completed % 10 === 0 || completed === tasks.length) {
        console.log(`[${completed}/${tasks.length}] ${t.lang}/${t.key}.mp3 (${(bytes / 1024).toFixed(1)} KB)`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log(`Done! Generated all ${tasks.length} studio audio MP3 files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
