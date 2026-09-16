#!/usr/bin/env node
/* RFC 9116: o Expires tem de estar no futuro, e não a menos de 30 dias. As duas cópias
   (raiz e .well-known) têm de ser iguais. */
import { readFileSync } from 'node:fs';
const root = readFileSync('public/security.txt', 'utf8');
const wk = readFileSync('public/.well-known/security.txt', 'utf8');
if (root !== wk) { console.error('public/security.txt e public/.well-known/security.txt diferem'); process.exit(1); }
const exp = root.match(/^Expires:\s*(\S+)/m)?.[1];
if (!exp) { console.error('security.txt sem Expires'); process.exit(1); }
const days = (new Date(exp).getTime() - Date.now()) / 86400000;
if (!(days > 30)) { console.error(`security.txt expira em ${Math.round(days)} dias (${exp}): renovar`); process.exit(1); }
if (!/^Contact:\s*\S+/m.test(root)) { console.error('security.txt sem Contact'); process.exit(1); }
console.log(`check-security-txt: ok (expira em ${Math.round(days)} dias)`);
