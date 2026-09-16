import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { AUTHOR, type Locale } from '../consts';
import { href, site } from './i18n';
import { getPosts, slugOf } from './posts';

export async function feed(locale: Locale, ctx: APIContext) {
	const posts = await getPosts(locale);
	const s = site(locale);
	return rss({
		title: `${s.title} (${locale.toUpperCase()})`,
		description: s.description,
		site: ctx.site!,
		trailingSlash: true,
		items: posts.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			pubDate: p.data.pubDate,
			link: href(locale, `blog/${slugOf(p)}`),
			categories: p.data.tags,
			author: AUTHOR.name,
		})),
		customData: `<language>${s.locale}</language>`,
	});
}
