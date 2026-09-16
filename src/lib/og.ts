/* Imagem Open Graph por artigo, gerada no build com satori + sharp. Sem serviço
   externo: a imagem sai do mesmo repositório que o texto. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { AUTHOR, SITE, UI, type Locale } from '../consts';

// Resolvido a partir da raiz do projecto: no build os chunks vivem em dist/.prerender e
// import.meta.url deixaria de apontar para src/.
const fontsDir = resolve(process.cwd(), 'src/assets/fonts');
let fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' | 'italic' }[] | undefined;

async function loadFonts() {
	if (fonts) return fonts;
	const read = async (f: string) => {
		const b = await readFile(resolve(fontsDir, f));
		return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
	};
	fonts = [
		{ name: 'Geist', data: await read('geist-latin-400-normal.woff'), weight: 400, style: 'normal' },
		{ name: 'Geist', data: await read('geist-latin-600-normal.woff'), weight: 700, style: 'normal' },
		{ name: 'Geist Mono', data: await read('geist-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
	];
	return fonts;
}

export interface OgInput {
	locale: Locale;
	title: string;
	description?: string;
	meta?: string; // linha mono: data · min · fontes
}

export async function ogPng(input: OgInput): Promise<Buffer> {
	const { locale, title, description = '', meta = '' } = input;
	const paper = '#1a1c24', card = '#0d0e13', ink = '#f2f4f8', muted = '#8b8f9c', signal = '#31e89d', line = '#23262f';
	const size = title.length > 70 ? 50 : title.length > 45 ? 58 : 68;
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: { width: '1200px', height: '630px', display: 'flex', background: paper, color: ink, padding: '40px', fontFamily: 'Geist', position: 'relative' },
				children: [
					{ type: 'div', props: { style: { position: 'absolute', top: 0, right: 0, width: '700px', height: '400px', background: 'radial-gradient(circle at 80% 0%, rgba(49,232,157,0.16), rgba(49,232,157,0) 60%)', display: 'flex' } } },
					{ type: 'div', props: { style: { flex: 1, display: 'flex', flexDirection: 'column', background: card, border: `1px solid ${line}`, borderRadius: '24px', padding: '48px 56px', position: 'relative' }, children: [
						{ type: 'div', props: { style: { position: 'absolute', top: '24px', right: '24px', width: '12px', height: '12px', borderRadius: '6px', background: signal, boxShadow: `0 0 16px ${signal}`, display: 'flex' } } },
						{ type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', fontFamily: 'Geist Mono', fontSize: '18px', color: signal, letterSpacing: '2px' }, children: [
							{ type: 'span', props: { children: `//${UI[locale].og_kicker.toUpperCase()}` } },
							{ type: 'span', props: { style: { color: muted }, children: locale.toUpperCase() } },
						] } },
						{ type: 'div', props: { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }, children: [
							{ type: 'div', props: { style: { fontWeight: 700, fontSize: `${size}px`, lineHeight: 1.08, letterSpacing: '-1.5px', display: 'flex' }, children: title } },
							description ? { type: 'div', props: { style: { fontSize: '25px', lineHeight: 1.45, color: muted, maxWidth: '980px', display: 'flex' }, children: description } } : { type: 'div', props: {} },
						] } },
						{ type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${line}`, paddingTop: '20px', fontFamily: 'Geist Mono', fontSize: '18px', color: muted }, children: [
							{ type: 'span', props: { children: meta } },
							{ type: 'span', props: { style: { color: ink }, children: `${AUTHOR.name} · ${SITE[locale].title}` } },
						] } },
					] } },
				],
			},
		},
		{ width: 1200, height: 630, fonts: await loadFonts() },
	);
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
