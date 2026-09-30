const STORAGE_KEY = 'portfolio-theme';
const THEME_COLOR = { dark: '#100e0c', light: '#f6f0e4' };

// Thème clair optionnel (sombre par défaut), mémorisé ; appliqué avant le premier rendu
// par un script du <head>.
export function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (!button) return;

  const current = () => (root.dataset.theme === 'light' ? 'light' : 'dark');

  const sync = () => {
    const theme = current();
    button.setAttribute('aria-pressed', String(theme === 'light'));
    themeColor?.setAttribute('content', THEME_COLOR[theme]);
  };

  button.addEventListener('click', () => {
    const next = current() === 'light' ? 'dark' : 'light';

    // Fondu des couleurs, sauf mouvement réduit
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-fade');
      setTimeout(() => root.classList.remove('theme-fade'), 450);
    }

    root.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* stockage indisponible */ }
    sync();
  });

  sync();
}
