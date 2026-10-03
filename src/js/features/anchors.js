// Ancres : la page atterrit toujours au même endroit, juste sous la barre, même quand la mise en page
// bouge pendant le trajet (polices, images, traduction). Le CSS fixe la cible (scroll-padding et
// scroll-margin), le navigateur fait le défilement ; ce module ne fait que le vérifier à l'arrivée.

const root = document.documentElement;

// Silence de défilement qui marque la fin d'un trajet ; le premier délai laisse le défilement démarrer
const IDLE_MS = 140;
const START_MS = 320;
// Un geste de l'utilisateur reprend la main : on ne corrige plus rien
const USER_INPUT = ['wheel', 'touchstart', 'keydown', 'pointerdown'];

const targetOf = (hash) => {
  try { return hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null; } catch { return null; }
};

let stop = null;

// Attend la fin du défilement vers target, puis le recale si la mise en page l'a déplacé
function settle(target) {
  stop?.();

  let timer = setTimeout(finish, START_MS);
  function finish() {
    stop();
    target.scrollIntoView({ behavior: 'instant' });
  }
  const onScroll = () => { clearTimeout(timer); timer = setTimeout(finish, IDLE_MS); };

  stop = () => {
    clearTimeout(timer);
    removeEventListener('scroll', onScroll);
    USER_INPUT.forEach((type) => removeEventListener(type, stop));
    stop = null;
  };
  addEventListener('scroll', onScroll, { passive: true });
  USER_INPUT.forEach((type) => addEventListener(type, stop, { passive: true }));
}

// Aller à une section depuis le code (terminal) : même trajet et même arrivée qu'un lien
export function goToSection(target) {
  if (!target) return;
  target.scrollIntoView();
  settle(target);
}

// La barre est fixe : on publie sa hauteur réelle pour que tout ce qui s'y cale tombe juste
function trackNavHeight() {
  const nav = document.querySelector('nav');
  if (!nav || !window.ResizeObserver) return;
  // Le premier rappel part au premier rendu, sans forcer de mise en page ici
  new ResizeObserver(() => {
    root.style.setProperty('--nav-h', `${nav.getBoundingClientRect().height}px`);
  }).observe(nav);
}

// Page ouverte sur une ancre (/#contact) : le <head> a coupé le défilement doux pour que l'arrivée
// soit directe ; on recale une fois polices et images en place, puis on le rétablit.
function alignOnLoad() {
  if (!root.classList.contains('is-landing')) return;

  let touched = false;
  const touch = () => { touched = true; };
  USER_INPUT.forEach((type) => addEventListener(type, touch, { passive: true, once: true }));

  const loaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => addEventListener('load', resolve, { once: true }));

  Promise.all([loaded, document.fonts?.ready]).then(() => requestAnimationFrame(() => {
    const target = targetOf(location.hash);
    if (target && !touched) target.scrollIntoView({ behavior: 'instant' });
    USER_INPUT.forEach((type) => removeEventListener(type, touch));
    root.classList.remove('is-landing');
  }));
}

export function initAnchors() {
  trackNavHeight();
  alignOnLoad();

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const target = targetOf(e.target.closest('a[href^="#"]')?.hash ?? '');
    if (target) settle(target);
  });
}
