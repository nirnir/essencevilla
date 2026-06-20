// ===== Theme + nav shared script =====
(function () {
  // Theme persistence
  const KEY = 'eev_theme';
  const saved = localStorage.getItem(KEY) || 'linen';
  document.documentElement.setAttribute('data-theme', saved);
  window.eevSetTheme = function (name) {
    document.documentElement.setAttribute('data-theme', name);
    try { localStorage.setItem(KEY, name); } catch (e) {}
  };

  // Enable enhanced (burger) nav styles before first paint — avoids a flash of
  // the wrapping nav. Without JS this class is never added, so the plain
  // wrapping nav remains as a working fallback.
  document.documentElement.classList.add('nav-js');

  document.addEventListener('DOMContentLoaded', () => {
    // Mark active nav link
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });

    // ----- Mobile burger menu -----
    const inner = document.querySelector('.topbar-inner');
    const nav = document.querySelector('.topbar .nav');
    if (!inner || !nav) return;
    if (!nav.id) nav.id = 'primary-nav';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', nav.id);
    btn.innerHTML = '<span></span><span></span><span></span>';
    inner.appendChild(btn);

    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) { const first = nav.querySelector('a'); if (first) first.focus(); }
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });

    // Close when a link is chosen
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

    // Close on Escape, returning focus to the button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); }
    });

    // Close when tapping outside the menu
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });

    // Reset state if the viewport grows back to desktop
    const mq = window.matchMedia('(min-width: 861px)');
    const onChange = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  });
})();
