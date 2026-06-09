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

  // Mark active nav link
  document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  });
})();
