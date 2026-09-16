// Animações das capas e figuras: contadores, barras e chips sequenciais, em ciclo, a partir de
// atributos data-*. Sem este ficheiro fica o estado final (o SVG já traz os valores finais).
(() => {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const roots = document.querySelectorAll('[data-anim]');
	if (!roots.length) return;
	const fmt = (v, dec, prefix) => prefix + (dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'));
	const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
	roots.forEach((root) => {
		const counts = [...root.querySelectorAll('[data-count]')].map((el) => ({ el, target: parseFloat(el.dataset.count), dec: parseInt(el.dataset.decimals ?? (el.dataset.count.includes('.') ? '2' : '0'), 10), prefix: el.dataset.prefix ?? '', dur: parseInt(el.dataset.dur ?? '0', 10), hold: parseInt(el.dataset.hold ?? '0', 10), cycle: parseInt(el.dataset.cycle ?? '0', 10), easeK: parseFloat(el.dataset.ease ?? '1'), steps: el.dataset.steps ? parseFloat(el.dataset.steps) : 0 }));
		const grows = [...root.querySelectorAll('[data-grow]')].map((el) => ({ el, axis: el.dataset.grow, full: parseFloat(el.getAttribute(el.dataset.grow === 'w' ? 'width' : 'height')), bottom: parseFloat(el.dataset.bottom ?? '0'), dur: parseInt(el.dataset.dur ?? '0', 10), hold: parseInt(el.dataset.hold ?? '0', 10), cycle: parseInt(el.dataset.cycle ?? '0', 10), easeK: parseFloat(el.dataset.ease ?? '1') }));
		const chips = [...root.querySelectorAll('[data-seq]')].map((el) => ({ el, seq: parseInt(el.dataset.seq, 10), total: parseInt(el.dataset.total, 10), cycle: parseInt(el.dataset.cycle ?? '5000', 10) }));
		if (!counts.length && !grows.length && !chips.length) return;
		let start = performance.now();
		const tick = (now) => {
			const elapsed = Math.max(0, now - start);
			for (const c of counts) {
				let p;
				if (c.cycle) { const t = (elapsed % c.cycle) / c.cycle; p = c.steps ? Math.min(c.target, Math.floor(t * c.steps)) / c.target : ease(t * c.easeK); }
				else { p = ease(Math.min(elapsed / c.dur, 1)); }
				c.el.textContent = fmt(p * c.target, c.dec, c.prefix);
			}
			for (const g of grows) {
				const p = g.cycle ? ease(((elapsed % g.cycle) / g.cycle) * g.easeK) : ease(Math.min(elapsed / g.dur, 1));
				if (g.axis === 'w') g.el.setAttribute('width', String(p * g.full));
				else { const h = Math.max(2, p * g.full); g.el.setAttribute('height', String(h)); if (g.bottom) g.el.setAttribute('y', String(g.bottom - h)); }
			}
			for (const ch of chips) {
				const t = (elapsed % ch.cycle) / ch.cycle;
				const visible = Math.min(ch.total, Math.floor(t * (ch.total + 1.2)));
				ch.el.style.opacity = ch.seq < visible ? '1' : (ch.el.classList.contains('vis') ? '0.2' : '0');
			}
			const cyc = counts[0]?.dur ? counts[0].dur + counts[0].hold : 0;
			if (cyc && elapsed >= cyc) start = now;
			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	});
})();
