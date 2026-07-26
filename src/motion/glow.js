export function initMouseGlow(active) {
  const glow = document.createElement('div');
  glow.className = 'motion-glow';
  glow.setAttribute('data-testid', 'motion-glow');
  glow.setAttribute('data-active', String(active));
  glow.setAttribute('aria-hidden', 'true');

  const background = document.querySelector('[data-testid="motion-background"]');
  background?.appendChild(glow);

  if (!active) return { destroy() {} };

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (!finePointer) return { destroy() {} };

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 3;
  let currentX = targetX;
  let currentY = targetY;
  let animationId = 0;
  let visible = false;

  function onMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      visible = true;
      glow.style.opacity = '1';
    }
  }

  function onLeave() {
    visible = false;
    glow.style.opacity = '0';
  }

  function tick() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    animationId = window.requestAnimationFrame(tick);
  }

  window.addEventListener('pointermove', onMove);
  document.documentElement.addEventListener('mouseleave', onLeave);
  tick();

  return {
    destroy() {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      glow.remove();
    },
  };
}
