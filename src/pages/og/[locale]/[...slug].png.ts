import type { APIRoute } from 'astro';
import { isoDate, t } from '../../../lib/i18n';
import { ogPng } from '../../../lib/og';
import { getPosts, readingMinutes, slugOf, type Post } from '../../../lib/posts';

export async function getStaticPaths() {
	const posts = await getPosts();
	return posts.map((post) => ({ params: { locale: post.data.lang, slug: slugOf(post) }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
	const { post } = props as { post: Post };
	const ui = t(post.data.lang);
	const meta = `${isoDate(post.data.pubDate)} · ${readingMinutes(post.body)} ${ui.min_read} · ${post.data.sources.length} ${ui.sources}`;
	const png = await ogPng({ locale: post.data.lang, title: post.data.title, description: post.data.description, meta });
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
