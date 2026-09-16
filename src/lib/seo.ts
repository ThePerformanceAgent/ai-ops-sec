import { AUTHOR, SITE, type Locale } from '../consts';
import type { Post } from './posts';

const PERSON_ID = `${AUTHOR.github}#person`;
const person = () => ({
	'@type': 'Person',
	'@id': PERSON_ID,
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
		'@type': 'BlogPosting',
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

/** Página "Sobre": ProfilePage com a mesma Person (@id) que assina os artigos. */
export function profilePageLd(locale: Locale, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url,
		inLanguage: SITE[locale].locale,
		dateModified: new Date().toISOString().slice(0, 10),
		mainEntity: { ...person(), description: SITE[locale].description, knowsAbout: ['AI agent security', 'AI observability', 'MCP', 'n8n', 'OpenTelemetry GenAI'] },
	};
}
