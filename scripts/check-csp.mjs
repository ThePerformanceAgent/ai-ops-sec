#!/usr/bin/env node
/* A CSP do <head> (GitHub Pages) e a de public/_headers (Cloudflare/Netlify) têm de
   autorizar exactamente o mesmo hash do script inline do tema. */
import { readFileSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');
const headers = readFileSync('public/_headers', 'utf8');
const meta = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1] ?? '';
const hashes = [...meta.matchAll(/'sha256-[A-Za-z0-9+/=]+'/g)].map((m) => m[0]);
if (hashes.length !== 1) { console.error(`esperado 1 hash na meta CSP, encontrados ${hashes.length}`); process.exit(1); }
if (!headers.includes(hashes[0])) { console.error(`public/_headers não contém ${hashes[0]}; actualiza a linha Content-Security-Policy`); process.exit(1); }
const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/g)];
if (inline.length !== 1) { console.error(`esperado 1 script inline, encontrados ${inline.length}`); process.exit(1); }
console.log(`check-csp: ok (${hashes[0]})`);
