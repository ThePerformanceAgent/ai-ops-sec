/**
 * Pós-processamento do build: etiqueta cada célula de tabela com o cabeçalho da sua coluna
 * (data-label) e a tabela com o número de colunas (data-cols). Serve o layout empilhado no
 * telemóvel (global.css, @media max-width 640px).
 *
 * Corre sobre o HTML gerado porque o processador Markdown do Astro 7 (Sätteri) não aceita
 * plugins rehype sem instalar o processador antigo. As tabelas vêm do Markdown/MDX, regulares:
 * <table><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table>.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || 'dist';
const files = [];
(function walk(d) {
	for (const n of readdirSync(d)) {
		const p = join(d, n);
		if (statSync(p).isDirectory()) walk(p);
		else if (n.endsWith('.html')) files.push(p);
	}
})(root);

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().replace(/"/g, '&quot;');
let tables = 0, touched = 0;

for (const f of files) {
	const html = readFileSync(f, 'utf8');
	if (!html.includes('<table')) continue;
	const out = html.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/g, (whole, attrs, inner) => {
		if (/data-cols=/.test(attrs)) return whole;
		const rows = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)];
		if (rows.length === 0) return whole;
		const headRow = rows.find((r) => /<th\b/.test(r[1]) && !/<td\b/.test(r[1])) || rows[0];
		const headers = [...headRow[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => strip(m[1]));
		if (headers.length === 0) return whole;
		tables++;
		let body = inner;
		for (const r of rows) {
			if (r === headRow) continue;
			let i = 0;
			const labelled = r[0].replace(/<td\b([^>]*)>/g, (td, a) => {
				const label = headers[i++];
				return label && !/data-label=/.test(a) ? `<td${a} data-label="${label}">` : td;
			});
			body = body.replace(r[0], labelled);
		}
		return `<table${attrs} data-cols="${headers.length}">${body}</table>`;
	});
	if (out !== html) {
		writeFileSync(f, out);
		touched++;
	}
}
console.log(`label-tables: ${tables} tabela(s) em ${touched} ficheiro(s)`);
