/* ============================================
   Naja Safety — Theme Enhancements (Vanilla JS)
   Transplants from Kimi React app:
   - Scroll progress bar
   - Reveal on scroll (IntersectionObserver)
   - Animated counters
   - Statutory ticker duplicate
   - Char reveal scrub
   - WhatsApp FAB injection
   ============================================ */

(function () {
  'use strict';

  const ROOT = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Scroll Progress Bar ---------- */
  function initScrollProgress() {
    if (prefersReduced) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    let ticking = false;
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = 'scaleX(' + progress + ')';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- 2. Reveal on Scroll ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (prefersReduced) {
      items.forEach(el => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => observer.observe(el));
  }

  /* ---------- 3. Animated Counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.counterSuffix || '';
        const prefix = el.dataset.counterPrefix || '';
        const duration = parseFloat(el.dataset.counterDuration || '1.6');
        const raw = el.dataset.counterRaw === 'true';
        const startTime = performance.now();

        function tick(now) {
          const progress = Math.min((now - startTime) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * to);
          if (raw && to >= 1000) {
            el.textContent = prefix + current + suffix;
          } else {
            el.textContent = prefix + current.toLocaleString() + suffix;
          }
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach(el => observer.observe(el));
  }

  /* ---------- 4. Statutory Ticker Auto-Duplicate ---------- */
  function initTicker() {
    const tickers = document.querySelectorAll('.ticker-bar .ticker-inner');
    tickers.forEach(inner => {
      const clone = inner.cloneNode(true);
      inner.parentNode.appendChild(clone);
    });
  }

  /* ---------- 5. Char Reveal on Scroll ---------- */
  function initCharReveal() {
    const els = document.querySelectorAll('.char-reveal');
    if (!els.length) return;
    els.forEach(el => {
      const text = el.textContent || '';
      el.innerHTML = '';
      text.split('').forEach((c) => {
        const span = document.createElement('span');
        span.textContent = c;
        if (c === ' ') span.style.whiteSpace = 'pre';
        el.appendChild(span);
      });
    });

    if (prefersReduced) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const spans = el.querySelectorAll('span');
        spans.forEach((span, i) => {
          setTimeout(() => { span.style.opacity = '1'; }, i * 30);
        });
        el.classList.add('revealed');
        observer.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => observer.observe(el));
  }

  /* ---------- 6. WhatsApp FAB Injection ---------- */
  function initWhatsAppFab() {
    if (document.querySelector('.whatsapp-fab')) return;
    const waMsg = encodeURIComponent('Hello Naja Safety, I would like to make an enquiry.');
    const waHref = 'https://wa.me/60167301802?text=' + waMsg;
    const fab = document.createElement('a');
    fab.href = waHref;
    fab.target = '_blank';
    fab.rel = 'noopener noreferrer';
    fab.className = 'whatsapp-fab';
    fab.setAttribute('aria-label', 'Chat on WhatsApp');
    fab.innerHTML =
      '<span class="fab-label">Chat on WhatsApp</span>' +
      '<span class="fab-icon"><span class="fab-icon-inner">' +
      '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>' +
      '</span></span>';
    document.body.appendChild(fab);
  }

  /* ---------- 7. FAQ Accordion (Kimi style) ---------- */
  function initFaqAccordion() {
    const faqs = document.querySelectorAll('.faq-kimi');
    faqs.forEach(wrapper => {
      wrapper.querySelectorAll('.faq-kimi-q').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-kimi-item');
          const isOpen = item.classList.contains('open');
          item.classList.toggle('open', !isOpen);
          const toggle = btn.querySelector('.faq-toggle');
          if (toggle) toggle.textContent = isOpen ? '+' : '−';
        });
      });
    });
  }

  /* ---------- 8. Header scroll state ---------- */
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    let ticking = false;
    function update() {
      header.classList.toggle('header-scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ---------- Init ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  function run() {
    initScrollProgress();
    initReveal();
    initCounters();
    initTicker();
    initCharReveal();
    initWhatsAppFab();
    initFaqAccordion();
    initHeaderScroll();
  }
})();
