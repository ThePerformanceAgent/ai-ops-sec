import type { APIContext } from 'astro';
export function GET({ site }: APIContext) {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	// Bots de PESQUISA de IA (citam a fonte) ficam explicitamente permitidos: é a única via com
	// evidência para aparecer em respostas geradas. Bots de TREINO (GPTBot, ClaudeBot, CCBot,
	// Google-Extended) seguem a regra geral; decidir à parte e por escrito se um dia se bloquear.
	const search = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'];
	const body = [
		...search.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
		'User-agent: *',
		'Allow: /',
		`Disallow: ${base}/search/`,
		`Disallow: ${base}/en/search/`,
		'',
		`Sitemap: ${new URL(`${base}/sitemap-index.xml`, site)}`,
		'',
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
