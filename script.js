/* =============================================
   ESC VENDING — script.js
   ============================================= */

// ─── STICKY HEADER ───
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ─── HAMBURGER MENU ───
const hamburger     = document.getElementById('hamburger-btn');
const mobileMenu    = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// ─── SMOOTH SCROLL for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── SCROLL REVEAL ANIMATION ───
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

/* ─── LIGHTBOX (IMAGE MODAL) - EVENT DELEGATION ─── */
document.addEventListener('click', function(e) {
  // Tıklanan eleman bir otomat resmi mi? (.product-image-wrap içindeki img)
  const isZoomable = e.target.tagName === 'IMG' && e.target.closest('.product-image-wrap');
  
  const modal = document.getElementById("imageModal");
  if(!modal) return;
  
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  
  if (isZoomable) {
    e.preventDefault();
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Scroll kapat
    modalImg.src = e.target.src;
    captionText.innerHTML = e.target.alt || "Görsel Önizleme";
  }
  
  // Modalı kapatma işlemleri (X veya dışarı tıklama)
  if (modal.style.display === "block") {
    const isCloseBtn = e.target.classList.contains('close-modal');
    const isOutsideImg = e.target === modal;
    
    if (isCloseBtn || isOutsideImg) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
});

// ESC ile kapatma kısmı
document.addEventListener('keydown', function(event) {
  const modal = document.getElementById("imageModal");
  if (modal && event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
reveals.forEach(el => observer.observe(el));

// ─── HERO COUNTER ANIMATION ───
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.counter');
      const targets = [20, 500, 7];
      const suffixes = ['+', '+', ''];
      nums.forEach((el, i) => animateCounter(el, targets[i], suffixes[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ─── HERO BG PARALLAX (subtle) ───
const heroBgImg = document.getElementById('hero-bg-img');
if (heroBgImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBgImg.style.transform = `translateY(${scrolled * 0.25}px)`;
  }, { passive: true });
}

// ─── ACTIVE NAV LINK highlight on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--blue)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
