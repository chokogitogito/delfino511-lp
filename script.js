/* ============================================================
   GELATERIA & DELFINO 511 — Script
   ============================================================ */

/* ---------- Header scroll ---------- */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  const spans = menuBtn.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  menuBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ---------- Scroll fade-in ---------- */
const fadeEls = document.querySelectorAll(
  '.concept__card, .flavor-card, .voice__card, .story__item, .numbers__item, .access__detail, .experience__text, .experience__visual'
);
fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  const delay = (i % 3) * 0.1;
  el.style.transitionDelay = `${delay}s`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ---------- Numbers count-up ---------- */
const numEls = document.querySelectorAll('.numbers__num');
let numAnimated = false;

function animateNums() {
  if (numAnimated) return;
  numAnimated = true;
  numEls.forEach(el => {
    const text = el.textContent;
    const unit = el.querySelector('.numbers__unit');
    const unitText = unit ? unit.textContent : '';
    const target = parseInt(text.replace(/\D/g, ''));
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + unitText;
      if (unit) {
        const newUnit = document.createElement('span');
        newUnit.className = 'numbers__unit';
        newUnit.textContent = unitText;
        el.textContent = current;
        el.appendChild(newUnit);
      }
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

const numbersSection = document.querySelector('.numbers');
const numObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateNums();
}, { threshold: 0.5 });
if (numbersSection) numObserver.observe(numbersSection);

/* ---------- Smooth anchor with offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
