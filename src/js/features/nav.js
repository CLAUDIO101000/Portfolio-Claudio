export function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  initScrollState(nav);

  const burger = document.getElementById('nav-burger');
  if (burger) initBurger(nav, burger);
}

// Barre de progression de lecture + lien de la section en cours
function initScrollState(nav) {
  const root = document.documentElement;
  const links = [...nav.querySelectorAll('.nav-links a[href^="#"]')]
    .map((a) => ({ a, section: document.querySelector(a.getAttribute('href')) }))
    .filter((link) => link.section);

  const setProgress = () => {
    const max = root.scrollHeight - innerHeight;
    nav.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : 0);
  };

  // Section courante : la dernière dont le haut a franchi le tiers supérieur de
  // l'écran. Plus stable qu'un IntersectionObserver avec des sections de
  // hauteurs très inégales.
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

  const update = () => {
    setProgress();
    setActiveLink();
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
}

// Menu déroulant mobile
function initBurger(nav, burger) {
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };

  burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !nav.classList.contains('open')) return;
    setOpen(false);
    burger.focus();
  });
}
