/* ============================================================
   GELATERIA & DELFINO 511 — Script (Revised)
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

/* ---------- Scroll reveal (.reveal) ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Numbers count-up ---------- */
const numEls = document.querySelectorAll('.numbers__num');
let numAnimated = false;

function animateNums() {
  if (numAnimated) return;
  numAnimated = true;
  numEls.forEach(el => {
    const unit = el.querySelector('.numbers__unit');
    const unitText = unit ? unit.textContent : '';
    const target = parseInt(el.textContent.replace(/\D/g, ''));
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      const newUnit = document.createElement('span');
      newUnit.className = 'numbers__unit';
      newUnit.textContent = unitText;
      el.appendChild(newUnit);
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

const numbersSection = document.querySelector('.numbers');
const numObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateNums();
}, { threshold: 0.5 });
if (numbersSection) numObserver.observe(numbersSection);

/* ---------- FAQ アコーディオン ---------- */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---------- スティッキーCTAの表示制御 ---------- */
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.querySelector('.hero');
if (stickyCta && heroSection) {
  stickyCta.style.transform = 'translateY(100%)';
  const stickyObserver = new IntersectionObserver((entries) => {
    stickyCta.style.transform = entries[0].isIntersecting ? 'translateY(100%)' : 'translateY(0)';
    stickyCta.style.transition = 'transform .3s ease';
  }, { threshold: 0.1 });
  stickyObserver.observe(heroSection);
}

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
