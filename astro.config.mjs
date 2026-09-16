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
			themes: { light: 'vitesse-light', dark: 'vitesse-black' },
			defaultColor: false,
			wrap: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Geist',
			cssVariable: '--font-sans',
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
			options: {
				variants: [{ src: ['./src/assets/fonts/geist-latin-wght-normal.woff2'], weight: '100 900', style: 'normal', display: 'swap' }],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
			options: {
				variants: [{ src: ['./src/assets/fonts/geist-mono-latin-wght-normal.woff2'], weight: '100 900', style: 'normal', display: 'swap' }],
			},
		},
	],
});
