/* O único script inline do site: lê o tema guardado antes da primeira pintura, para
   não haver flash. A CSP autoriza-o pelo hash, não por 'unsafe-inline'. O mesmo hash
   tem de estar em public/_headers; o scripts/check-csp.mjs confirma isso no CI. */
import { createHash } from 'node:crypto';

export const THEME_SCRIPT =
	"(()=>{try{const t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch{}})();";

export const THEME_SCRIPT_HASH = `sha256-${createHash('sha256').update(THEME_SCRIPT, 'utf8').digest('base64')}`;

export const CSP = [
	"default-src 'self'",
	`script-src 'self' 'wasm-unsafe-eval' '${THEME_SCRIPT_HASH}'`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data:",
	"font-src 'self'",
	"connect-src 'self'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	'upgrade-insecure-requests',
].join('; ');
