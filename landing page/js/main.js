/* ─────────────────────────────────────────
   CODECRAFT — main.js
   ───────────────────────────────────────── */

'use strict';

/* ── CUSTOM CURSOR ── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX  = 0, trailY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trailing cursor
(function animateTrail() {
  trailX += (mouseX - trailX) * 0.14;
  trailY += (mouseY - trailY) * 0.14;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .tech-card, .about-card, .testi-card, .pricing-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'var(--accent2)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER / MOBILE MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('.mob-link, .btn').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children reveals within same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach(sib => {
          if (!sib.classList.contains('visible')) {
            sib.style.transitionDelay = delay + 'ms';
            delay += 80;
          }
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── ANIMATED COUNTER ── */
function animateCounter(el, target, duration = 1800) {
  const start      = performance.now();
  const startValue = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startValue + eased * (target - startValue));
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ── TECH CARD COLOR GLOW ── */
document.querySelectorAll('.tech-card').forEach(card => {
  const color = card.dataset.color || '#7c3aed';
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 20px 60px ${color}22, 0 0 0 1px ${color}44`;
    card.style.borderColor = `${color}55`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
    card.style.borderColor = '';
  });
});

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // nav height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── PARALLAX HERO TITLE ── */
const heroTitle = document.querySelector('.hero-title');
window.addEventListener('scroll', () => {
  if (!heroTitle) return;
  const y = window.scrollY;
  heroTitle.style.transform = `translateY(${y * 0.18}px)`;
  heroTitle.style.opacity   = 1 - y / 500;
}, { passive: true });

/* ── MARQUEE PAUSE ON HOVER ── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ── HERO BADGE TYPEWRITER ── */
(function typewriterBadge() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  const text    = ' Now enrolling · Spring 2026';
  const target  = badge.querySelector('span:last-child') || badge;
  target.textContent = '';
  let i = 0;

  // Wait for reveal animation
  setTimeout(() => {
    const iv = setInterval(() => {
      target.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(iv);
    }, 40);
  }, 600);
})();

/* ── ACTIVE NAV LINK HIGHLIGHT ── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--accent2)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── PAGE LOAD ANIMATION ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
