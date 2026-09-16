import { getRelativeLocaleUrl } from 'astro:i18n';
import { DEFAULT_LOCALE, LOCALES, SITE, UI, type Locale } from '../consts';

export function isLocale(x: string | undefined): x is Locale {
	return !!x && (LOCALES as string[]).includes(x);
}

/** Locale a partir do URL: /en/... => en, tudo o resto => pt. */
export function localeFromUrl(url: URL): Locale {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const path = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
	const first = path.split('/').filter(Boolean)[0];
	return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Caminho local (com base e prefixo de locale) para uma rota relativa. */
export function href(locale: Locale, path = ''): string {
	return getRelativeLocaleUrl(locale, path);
}

export function t(locale: Locale) {
	return UI[locale];
}

export function site(locale: Locale) {
	return SITE[locale];
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'pt' ? 'en' : 'pt';
}

export function formatDate(date: Date, locale: Locale, opts: Intl.DateTimeFormatOptions = {}): string {
	return new Intl.DateTimeFormat(SITE[locale].locale, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		...opts,
	}).format(date);
}

export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
