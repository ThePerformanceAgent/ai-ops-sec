// Alterna o tema e guarda a escolha. Ficheiro estático de propósito: a CSP só
// autoriza scripts do próprio domínio mais o hash do script inline de arranque.
(() => {
	const root = document.documentElement;
	const current = () => root.getAttribute('data-theme') ?? 'dark';
	document.querySelectorAll('.theme-toggle').forEach((b) =>
		b.addEventListener('click', () => {
			const next = current() === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try {
				localStorage.setItem('theme', next);
			} catch {}
		}),
	);
})();
