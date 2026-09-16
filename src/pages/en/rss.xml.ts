import type { APIContext } from 'astro';
import { feed } from '../../lib/rss';
export const GET = (ctx: APIContext) => feed('en', ctx);
