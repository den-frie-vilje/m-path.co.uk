/**
 * Scroll-reveal action (fade + rise). Progressive enhancement + performance-safe:
 *  - Runs client-side only; content is fully visible with no JS (the hidden `.reveal` state is added
 *    BY this action, never in the prerendered HTML) and with `prefers-reduced-motion: reduce`.
 *  - Elements already in the viewport at load are NOT animated (no above-the-fold flash / LCP cost);
 *    only below-the-fold elements fade up as they scroll in.
 *  - transform/opacity only (GPU-friendly), observed once then disconnected.
 */
export function reveal(node: HTMLElement, params: { delay?: number } = {}) {
  if (typeof IntersectionObserver === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  let io: IntersectionObserver | undefined;

  const start = () => {
    const r = node.getBoundingClientRect();
    const inView = r.top < window.innerHeight && r.bottom > 0;
    if (inView) return; // already visible — leave it, don't animate on load

    node.classList.add('reveal');
    if (params.delay) node.style.transitionDelay = `${params.delay}ms`;

    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            node.classList.add('is-visible');
            io?.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    io.observe(node);
  };

  const raf = requestAnimationFrame(start);
  return {
    destroy() {
      cancelAnimationFrame(raf);
      io?.disconnect();
    }
  };
}
