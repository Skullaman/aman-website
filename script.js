// ===================== Aurora background canvas =====================
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const blobs = [
    { x: 0.2, y: 0.25, r: 0.5, hue: [110, 231, 255], speed: 0.00012, phase: 0 },
    { x: 0.8, y: 0.15, r: 0.45, hue: [167, 139, 250], speed: 0.00009, phase: 2 },
    { x: 0.55, y: 0.6, r: 0.55, hue: [244, 114, 182], speed: 0.00015, phase: 4 },
  ];

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach((b) => {
      const cx = (b.x + Math.sin(t * b.speed + b.phase) * 0.08) * w;
      const cy = (b.y + Math.cos(t * b.speed * 0.8 + b.phase) * 0.08) * h;
      const r = b.r * Math.max(w, h) * 0.6;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, `rgba(${b.hue[0]},${b.hue[1]},${b.hue[2]},0.14)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ===================== Scroll progress + nav =====================
const scrollProgress = document.getElementById('scrollProgress');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  nav.classList.toggle('scrolled', scrollTop > 40);
}, { passive: true });

// ===================== Reveal on scroll =====================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), (i % 6) * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// ===================== Tabs =====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ===================== Blog =====================
const blogGrid = document.getElementById('blogGrid');
const reader = document.getElementById('reader');
const readerContent = document.getElementById('readerContent');

function renderBlog() {
  const posts = window.POSTS || [];
  if (!posts.length) {
    blogGrid.innerHTML = '<p class="blog-empty">First article coming soon.</p>';
    return;
  }
  blogGrid.innerHTML = posts
    .map(
      (p, i) => `
      <div class="blog-card" data-post="${i}" role="button" tabindex="0">
        ${p.cover ? `<img class="blog-cover" src="${p.cover}" alt="" loading="lazy" />` : ''}
        <span class="blog-date">${p.date}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="blog-tags">${(p.tags || []).map((t) => `<span>${t}</span>`).join('')}</div>
        <span class="blog-read">Read →</span>
      </div>`
    )
    .join('');

  blogGrid.querySelectorAll('.blog-card').forEach((card) => {
    const open = () => openPost(parseInt(card.dataset.post, 10));
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

function openPost(i) {
  const p = window.POSTS[i];
  if (!p) return;
  readerContent.innerHTML = `
    ${p.cover ? `<img class="reader-cover" src="${p.cover}" alt="" />` : ''}
    <span class="blog-date">${p.date}</span>
    <h2>${p.title}</h2>
    ${p.html}
    <div class="blog-tags">${(p.tags || []).map((t) => `<span>${t}</span>`).join('')}</div>
  `;
  reader.classList.add('open');
  reader.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.reader-panel').scrollTop = 0;
}

function closeReader() {
  reader.classList.remove('open');
  reader.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('readerClose').addEventListener('click', closeReader);
document.getElementById('readerBackdrop').addEventListener('click', closeReader);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeReader(); });

renderBlog();

// ===================== Cursor glow =====================
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, glowX = mouseX, glowY = mouseY;

window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

(function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateGlow);
})();

if (window.matchMedia('(pointer: coarse)').matches) cursorGlow.style.display = 'none';

// ===================== Magnetic buttons =====================
document.querySelectorAll('.magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.25}px, ${(e.clientY - rect.top - rect.height / 2) * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});
