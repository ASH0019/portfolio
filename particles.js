// ===== HERO PARTICLE BACKGROUND =====
function initParticles() {
  const header = document.querySelector('header');
  if (!header) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.45;';
  header.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = header.offsetWidth;
    H = canvas.height = header.offsetHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticles() {
    const count = Math.floor((W * H) / 8000);
    particles = Array.from({ length: count }, () => ({
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      r: randomBetween(1, 2.5),
      vx: randomBetween(-0.15, 0.15),
      vy: randomBetween(-0.25, -0.05),
      alpha: randomBetween(0.2, 0.7),
      color: Math.random() > 0.6 ? '#C07F22' : '#2C4A7C'
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -5) { p.y = H + 5; p.x = randomBetween(0, W); }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => { resize(); createParticles(); });
}

initParticles();
