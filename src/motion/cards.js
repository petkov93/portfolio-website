import gsap from 'gsap';

export function initCardHovers(reduced) {
  const cards = document.querySelectorAll('.motion-card');

  if (reduced || !cards.length) return { destroy() {} };

  const cleanups = [];

  cards.forEach((card) => {
    const onEnter = () => {
      gsap.to(card, {
        y: -4,
        scale: 1.01,
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 107, 26, 0.18)',
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '',
        duration: 0.32,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'boxShadow',
      });
    };

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  return {
    destroy() {
      cleanups.forEach((cleanup) => cleanup());
    },
  };
}
