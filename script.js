/* ──────────────────────────────────
   1. Navbar scroll effect
────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ──────────────────────────────────
   2. Hamburger menu
────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on mobile link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ──────────────────────────────────
   3. Active nav link on scroll
────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav-links a');

const activateLink = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', activateLink, { passive: true });
activateLink();

/* ──────────────────────────────────
   4. Intersection Observer — fade in
────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ──────────────────────────────────
   5. Hero floating particles
────────────────────────────────── */
const particlesContainer = document.getElementById('particles');
const COLORS = ['#3b82f6', '#60a5fa', '#38bdf8', '#1d4ed8', '#93c5fd'];

function createParticle() {
  const el       = document.createElement('div');
  el.classList.add('particle');
  const size     = Math.random() * 6 + 2;
  const duration = Math.random() * 18 + 12;
  const delay    = Math.random() * 12;
  const x        = Math.random() * 100;
  const color    = COLORS[Math.floor(Math.random() * COLORS.length)];
  el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    left: ${x}%;
    bottom: -10px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;
  particlesContainer.appendChild(el);
  setTimeout(() => el.remove(), (duration + delay) * 1000);
}

// Spawn awal & interval
for (let i = 0; i < 14; i++) createParticle();
setInterval(createParticle, 1500);

/* ──────────────────────────────────
   6. Smooth scroll untuk anchor links
────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ──────────────────────────────────
   7. Stagger animation — skill & project cards
────────────────────────────────── */
const staggerGroups = [
  { selector: '#skills .skill-card',    delay: 80  },
  { selector: '#projects .project-card', delay: 120 },
];

staggerGroups.forEach(({ selector, delay }) => {
  document.querySelectorAll(selector).forEach((card, i) => {
    card.style.transitionDelay = `${i * delay}ms`;
  });
});
