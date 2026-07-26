import { ensureGsapPlugins, gsap, ScrollTrigger } from './gsap-setup.js';

export function initScrollReveals(reduced) {
  const sections = document.querySelectorAll('[data-motion-reveal]');

  if (reduced) {
    sections.forEach((section) => section.classList.add('is-revealed'));
    return { destroy() {} };
  }

  ensureGsapPlugins();

  sections.forEach((section, index) => {
    if (index === 0) {
      gsap.fromTo(
        section,
        { y: 24 },
        {
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          onComplete: () => section.classList.add('is-revealed'),
        }
      );
      return;
    }

    gsap.fromTo(
      section,
      { y: 32, opacity: 0.82 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
        onComplete: () => section.classList.add('is-revealed'),
      }
    );
  });

  return {
    destroy() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    },
  };
}
