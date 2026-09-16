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
		{ name: 'Instrument Serif', data: await read('instrument-serif-latin-400-normal.woff'), weight: 400, style: 'normal' },
		{ name: 'Atkinson', data: await read('atkinson-hyperlegible-latin-400-normal.woff'), weight: 400, style: 'normal' },
		{ name: 'Atkinson', data: await read('atkinson-hyperlegible-latin-700-normal.woff'), weight: 700, style: 'normal' },
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
	const paper = '#f3eee4', ink = '#17181a', muted = '#77736a', signal = '#b3261e', line = '#d7cfbf';
	const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: { width: '1200px', height: '630px', display: 'flex', flexDirection: 'column', background: paper, color: ink, padding: '64px 72px', fontFamily: 'Atkinson', position: 'relative' },
				children: [
					{ type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, width: '1200px', height: '10px', background: signal, display: 'flex' } } },
					{ type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', fontSize: '22px', color: muted, letterSpacing: '0.5px' }, children: [
						{ type: 'span', props: { children: `// ${UI[locale].og_kicker}` } },
						{ type: 'span', props: { children: locale.toUpperCase() } },
					] } },
					{ type: 'div', props: { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '22px' }, children: [
						{ type: 'div', props: { style: { fontFamily: 'Instrument Serif', fontSize: `${size}px`, lineHeight: 1.06, letterSpacing: '-1px', display: 'flex' }, children: title } },
						description ? { type: 'div', props: { style: { fontSize: '27px', lineHeight: 1.4, color: '#4a4841', maxWidth: '980px', display: 'flex' }, children: description } } : { type: 'div', props: {} },
					] } },
					{ type: 'div', props: { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${line}`, paddingTop: '22px', fontSize: '22px', color: muted }, children: [
						{ type: 'span', props: { children: meta } },
						{ type: 'span', props: { style: { fontWeight: 700, color: ink }, children: `${AUTHOR.name} · ${SITE[locale].title}` } },
					] } },
				],
			},
		},
		{ width: 1200, height: 630, fonts: await loadFonts() },
	);
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
