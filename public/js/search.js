// Carrega a UI do Pagefind (gerada no build, servida pelo próprio site).
(() => {
	const el = document.getElementById('search');
	if (!el) return;
	const base = el.dataset.base ?? '';
	const s = document.createElement('script');
	s.src = `${base}/pagefind/pagefind-ui.js`;
	s.onload = () => new window.PagefindUI({ element: '#search', bundlePath: `${base}/pagefind/`, showSubResults: true, showImages: false, autofocus: true });
	document.head.appendChild(s);
})();
