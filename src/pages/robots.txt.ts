import type { APIContext } from 'astro';
export function GET({ site }: APIContext) {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const body = ['User-agent: *', 'Allow: /', `Disallow: ${base}/search/`, `Disallow: ${base}/en/search/`, '', `Sitemap: ${new URL(`${base}/sitemap-index.xml`, site)}`, ''].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
