export function createMotionBackground() {
  const existing = document.querySelector('[data-testid="motion-background"]');
  if (existing) return existing;

  const layer = document.createElement('div');
  layer.className = 'motion-background';
  layer.setAttribute('data-testid', 'motion-background');
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);
  return layer;
}
