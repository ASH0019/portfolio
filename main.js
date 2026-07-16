import './style.css';

// ===== Scroll-reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach((el) => revealObserver.observe(el));

setTimeout(() => {
  revealEls.forEach((el) => el.classList.add('in-view'));
}, 2000);

// ===== Nav active-section highlight =====
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = '#' + entry.target.id;
    const link = document.querySelector(`nav a[href="${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach((sec) => navObserver.observe(sec));

// ===== Experience accordion =====
document.querySelectorAll('#experience .exp-row').forEach((row) => {
  row.addEventListener('click', () => {
    const isOpen = row.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('#experience .exp-row[aria-expanded="true"]').forEach((other) => {
      if (other !== row) other.setAttribute('aria-expanded', 'false');
    });
    row.setAttribute('aria-expanded', String(!isOpen));
  });
});

// ===== Skill filter =====
const filterTags = document.querySelectorAll('.tag[data-filter]');
const projectCards = document.querySelectorAll('.proj-card');

filterTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    const isActive = tag.classList.contains('active');
    filterTags.forEach((t) => t.classList.remove('active'));

    if (isActive) {
      projectCards.forEach((card) => card.classList.remove('filtered-out'));
      return;
    }

    tag.classList.add('active');
    const filter = tag.getAttribute('data-filter');
    const filterWords = filter.split(' ');

    projectCards.forEach((card) => {
      const tools = (card.getAttribute('data-tools') || '').split(' ');
      const matches = filterWords.some((w) => tools.includes(w));
      card.classList.toggle('filtered-out', !matches);
    });

    document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Project card click =====
projectCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('proj-link')) return;
    const link = card.querySelector('.proj-link');
    if (link) window.open(link.href, '_blank', 'noopener');
  });
});

// ===== Scroll progress bar =====
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });
