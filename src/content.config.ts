import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Um post é uma afirmação pública assinada. O frontmatter obriga a dizer de onde
// vem cada coisa (sources), o que foi verificado à mão (verified) e o que mudou
// desde a publicação (changelog). Isto aparece no cabeçalho de cada artigo.
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().min(8).max(120),
			description: z.string().min(40).max(200),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			lang: z.enum(['pt', 'en']),
			translationKey: z.string().optional(),
			tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(8),
			series: z.string().optional(),
			heroImage: image().optional(),
			heroAlt: z.string().optional(),
			status: z.enum(['draft', 'review', 'published']).default('draft'),
			sources: z
				.array(z.object({ title: z.string(), url: z.string().url(), accessed: z.coerce.date().optional() }))
				.default([]),
			verified: z.array(z.string()).default([]),
			verifiedOn: z.coerce.date().optional(),
			changelog: z.array(z.object({ date: z.coerce.date(), note: z.string() })).default([]),
			canonical: z.string().url().optional(),
		}),
});

export const collections = { posts };
