import type { APIRoute } from 'astro';
import { LOCALES, SITE } from '../../consts';
import { ogPng } from '../../lib/og';

export function getStaticPaths() {
	return LOCALES.map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = async ({ params }) => {
	const locale = params.locale as 'pt' | 'en';
	const png = await ogPng({ locale, title: SITE[locale].tagline, description: SITE[locale].description });
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
