import { prefersReducedMotion } from './preferences.js';
import { createMotionBackground } from './background.js';
import { initParticles } from './particles.js';
import { initMouseGlow } from './glow.js';
import { initSmoothScroll } from './scroll.js';
import { initScrollReveals } from './reveals.js';
import { initCardHovers } from './cards.js';

export function initMotion() {
  const reduced = prefersReducedMotion();
  const root = document.documentElement;

  root.classList.toggle('motion-reduced', reduced);
  root.classList.toggle('motion-enabled', !reduced);

  createMotionBackground();

  const scroll = initSmoothScroll(reduced);
  const particles = initParticles(!reduced);
  const glow = initMouseGlow(!reduced);
  const reveals = initScrollReveals(reduced);
  const cards = initCardHovers(reduced);

  const scrollToSection = (target, options = {}) => {
    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 72;

    if (scroll?.scrollTo) {
      scroll.scrollTo(target, { offset: -headerHeight, ...options });
      return;
    }

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      event.preventDefault();
      scrollToSection(href);
    });
  });

  return {
    scrollToSection,
    destroy() {
      scroll?.destroy();
      particles.destroy();
      glow.destroy();
      reveals.destroy();
      cards.destroy();
    },
  };
}
