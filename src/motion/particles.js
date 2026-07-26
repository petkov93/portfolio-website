const PARTICLE_COUNT = 36;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export function initParticles(active) {
  const canvas = document.createElement('canvas');
  canvas.className = 'motion-particles';
  canvas.setAttribute('data-testid', 'motion-particles');
  canvas.setAttribute('data-active', String(active));
  canvas.setAttribute('aria-hidden', 'true');

  const background = document.querySelector('[data-testid="motion-background"]');
  background?.appendChild(canvas);

  if (!active) return { destroy() {} };

  const ctx = canvas.getContext('2d');
  let animationId = 0;
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: randomBetween(0.6, 1.8),
      speedX: randomBetween(-0.08, 0.08),
      speedY: randomBetween(-0.12, -0.02),
      alpha: randomBetween(0.08, 0.35),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.y < -8) {
        particle.y = canvas.height + 8;
        particle.x = Math.random() * canvas.width;
      }
      if (particle.x < -8) particle.x = canvas.width + 8;
      if (particle.x > canvas.width + 8) particle.x = -8;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 107, 26, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    animationId = window.requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);

  return {
    destroy() {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.remove();
    },
  };
}
