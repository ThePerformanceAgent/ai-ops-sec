import { AUTHOR, SITE, type Locale } from '../consts';
import type { Post } from './posts';

const person = () => ({
	'@type': 'Person',
	name: AUTHOR.name,
	url: AUTHOR.github,
	sameAs: [AUTHOR.github, AUTHOR.linkedin].filter(Boolean),
});

export function websiteLd(locale: Locale, siteUrl: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE[locale].title,
		description: SITE[locale].description,
		url: siteUrl,
		inLanguage: SITE[locale].locale,
		author: person(),
	};
}

export function articleLd(post: Post, url: string, image: string) {
	const d = post.data;
	return {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline: d.title,
		description: d.description,
		datePublished: d.pubDate.toISOString(),
		dateModified: (d.updatedDate ?? d.pubDate).toISOString(),
		inLanguage: SITE[d.lang].locale,
		keywords: d.tags.join(', '),
		url,
		mainEntityOfPage: url,
		image,
		author: person(),
		publisher: person(),
		citation: d.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })),
	};
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
	};
}
