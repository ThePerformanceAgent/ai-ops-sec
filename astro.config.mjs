// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// `site` e `base` vêm do ambiente. Produção: https://andresilvalab.com na raiz (Cloudflare Workers).
const SITE = process.env.SITE_URL ?? 'https://andresilvalab.com';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'pt',
		locales: ['pt', 'en'],
		routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: { defaultLocale: 'pt', locales: { pt: 'pt-PT', en: 'en' } },
			filter: (page) => !page.includes('/og/'),
		}),
	],
	markdown: {
		shikiConfig: {
			themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
			defaultColor: false,
			wrap: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Instrument Serif',
			cssVariable: '--font-display',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/instrument-serif-latin-400-normal.woff2'], weight: 400, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/instrument-serif-latin-400-italic.woff2'], weight: 400, style: 'italic', display: 'swap' },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Atkinson Hyperlegible',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/atkinson-hyperlegible-latin-400-normal.woff2'], weight: 400, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/atkinson-hyperlegible-latin-400-italic.woff2'], weight: 400, style: 'italic', display: 'swap' },
					{ src: ['./src/assets/fonts/atkinson-hyperlegible-latin-700-normal.woff2'], weight: 700, style: 'normal', display: 'swap' },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Martian Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/martian-mono-latin-wght-normal.woff2'], weight: '300 700', style: 'normal', display: 'swap' },
				],
			},
		},
	],
});
