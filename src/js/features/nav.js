// Point de bascule vers le menu déroulant : identique à below(nav) en SCSS
const MENU_QUERY = '(max-width: 1100px)';

export function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  initScrollState(nav);

  const burger = document.getElementById('nav-burger');
  if (burger) initBurger(nav, burger);

  initBackToTop();
}

// Barre de progression de lecture + lien de la section en cours
function initScrollState(nav) {
  const root = document.documentElement;
  const links = [...nav.querySelectorAll('.nav-links a[href^="#"]:not([data-nav-cta])')]
    .map((a) => ({ a, section: document.querySelector(a.getAttribute('href')) }))
    .filter((link) => link.section);

  const setProgress = () => {
    const max = root.scrollHeight - innerHeight;
    nav.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : 0);
  };

  // Section courante : dernière dont le haut a passé le tiers supérieur de l'écran
  // (plus stable qu'un IntersectionObserver avec des sections inégales).
  const setActiveLink = () => {
    const line = scrollY + innerHeight / 3;
    let current = null;
    for (const link of links) {
      if (link.section.getBoundingClientRect().top + scrollY <= line) current = link;
    }
    // En bas de page, la dernière section l'emporte même si elle est courte
    if (scrollY + innerHeight >= root.scrollHeight - 2) current = links.at(-1) ?? null;

    links.forEach((link) => {
      const active = link === current;
      link.a.classList.toggle('is-active', active);
      if (active) link.a.setAttribute('aria-current', 'true');
      else link.a.removeAttribute('aria-current');
    });
  };

  // Un calcul par image au plus
  let queued = false;
  const update = () => {
    setProgress();
    setActiveLink();
    nav.classList.toggle('is-scrolled', scrollY > 8);
    queued = false;
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  // Première lecture à la frame suivante : la faire ici forcerait un layout en plein chargement
  schedule();
}

// Menu déroulant : se ferme au clic sur un lien, à côté, sur Échap ou si la fenêtre s'élargit.
function initBurger(nav, burger) {
  const menuQuery = window.matchMedia(MENU_QUERY);

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    // Pas de défilement de la page derrière le menu ouvert
    document.body.classList.toggle('no-scroll', open);
  };
  const isOpen = () => nav.classList.contains('open');

  // Les liens précèdent le burger dans le DOM : le focus va au premier lien à l'ouverture
  burger.addEventListener('click', () => {
    const open = !isOpen();
    setOpen(open);
    if (open) nav.querySelector('.nav-links a')?.focus();
  });
  nav.querySelectorAll('.nav-links a, .nav-links button').forEach((el) => el.addEventListener('click', () => setOpen(false)));

  document.addEventListener('pointerdown', (e) => {
    if (isOpen() && !e.target.closest('.nav-links, .nav-burger, .lang-switch, .theme-toggle')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    burger.focus();
  });

  menuQuery.addEventListener('change', (e) => { if (!e.matches && isOpen()) setOpen(false); });
}

function initBackToTop() {
  const button = document.getElementById('to-top');
  if (!button) return;

  let queued = false;
  const update = () => {
    button.classList.toggle('is-visible', scrollY > innerHeight * 0.9);
    queued = false;
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  addEventListener('scroll', schedule, { passive: true });
  schedule();

  button.addEventListener('click', () => {
    scrollTo({ top: 0 });
    document.getElementById('main')?.focus({ preventScroll: true });
  });
}
