const STORAGE_KEY = 'portfolio-theme';
const THEME_COLOR = { dark: '#100e0c', light: '#f6f0e4' };
const REVEAL_DURATION = 700;

// Thème clair optionnel (sombre par défaut), mémorisé ; appliqué avant le premier rendu
// par un script du <head>.
export function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (!button) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const current = () => (root.dataset.theme === 'light' ? 'light' : 'dark');

  const sync = () => {
    const theme = current();
    button.setAttribute('aria-pressed', String(theme === 'light'));
    themeColor?.setAttribute('content', THEME_COLOR[theme]);
  };

  const apply = (theme) => {
    root.dataset.theme = theme;
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* stockage indisponible */ }
    sync();
  };

  // Le nouveau thème s'étend en cercle depuis le bouton (View Transitions) ; sans cette API,
  // ou en mouvement réduit, simple fondu des couleurs.
  const reveal = (theme) => {
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => apply(theme));
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_DURATION, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => { /* transition interrompue (autre clic) : le thème est déjà posé */ });
  };

  const fade = (theme) => {
    root.classList.add('theme-fade');
    setTimeout(() => root.classList.remove('theme-fade'), 450);
    apply(theme);
  };

  // Thème visé, mis à jour tout de suite : la transition applique le changement à l'image suivante,
  // et deux clics rapprochés doivent bien s'annuler plutôt que relire l'ancien état.
  let wanted = current();

  button.addEventListener('click', () => {
    wanted = wanted === 'light' ? 'dark' : 'light';
    if (reduceMotion.matches) apply(wanted);
    else if (typeof document.startViewTransition === 'function') reveal(wanted);
    else fade(wanted);
  });

  sync();
}
