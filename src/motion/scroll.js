import Lenis from 'lenis';
import { ensureGsapPlugins, gsap, ScrollTrigger } from './gsap-setup.js';

export function initSmoothScroll(reduced) {
  document.documentElement.setAttribute('data-lenis-active', 'false');

  if (reduced) return null;

  ensureGsapPlugins();

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
  });

  document.documentElement.setAttribute('data-lenis-active', 'true');

  lenis.on('scroll', ScrollTrigger.update);

  const ticker = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  return {
    scrollTo(target, options = {}) {
      lenis.scrollTo(target, options);
    },
    destroy() {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      document.documentElement.setAttribute('data-lenis-active', 'false');
    },
  };
}
