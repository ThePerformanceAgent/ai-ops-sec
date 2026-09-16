import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../consts';

export type Post = CollectionEntry<'posts'>;

/** id "pt/lethal-trifecta" => slug "lethal-trifecta". */
export function slugOf(post: Post): string {
	return post.id.replace(/^(pt|en)\//, '');
}

/** Em produção só sai o que está `published`. Em dev vê-se tudo, para rever. */
export function isVisible(post: Post): boolean {
	return import.meta.env.DEV || process.env.SHOW_DRAFTS === '1' || post.data.status === 'published';
}

export async function getPosts(locale?: Locale): Promise<Post[]> {
	const all = await getCollection('posts', (p) => isVisible(p) && (!locale || p.data.lang === locale));
	return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTranslation(post: Post): Promise<Post | undefined> {
	if (!post.data.translationKey) return undefined;
	const others = await getCollection(
		'posts',
		(p) => isVisible(p) && p.data.lang !== post.data.lang && p.data.translationKey === post.data.translationKey,
	);
	return others[0];
}

export async function getTags(locale: Locale): Promise<Map<string, number>> {
	const posts = await getPosts(locale);
	const m = new Map<string, number>();
	for (const p of posts) for (const tag of p.data.tags) m.set(tag, (m.get(tag) ?? 0) + 1);
	return new Map([...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

/** Minutos de leitura a 200 palavras/min, sem contar código nem frontmatter. */
export function readingMinutes(body: string | undefined): number {
	if (!body) return 1;
	const text = body.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ');
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

/** Versão do artigo: 1 + número de entradas do changelog depois da publicação. */
export function versionOf(post: Post): string {
	const after = post.data.changelog.filter((c) => c.date.valueOf() > post.data.pubDate.valueOf()).length;
	return `v1.${after}`;
}
