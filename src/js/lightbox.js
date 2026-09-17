// Visionneuse d'image (certificat).
//
// L'URL de l'image n'est jamais écrite en dur ici : elle est reprise de la
// vignette déjà présente dans le DOM, que Vite réécrit selon la base du site
// (racine en dev, ./ sur GitHub Pages). Le lien de téléchargement pointe donc
// toujours vers le bon fichier.

const KEY_ESC = 'Escape';

export function initLightbox() {
  const box = document.getElementById('lightbox');
  const full = document.getElementById('lightbox-img');
  const dl = document.getElementById('lightbox-dl');
  const trigger = document.getElementById('cert-open');
  if (!box || !full || !trigger) return;

  const thumb = trigger.querySelector('img');
  let lastFocus = null;

  const open = () => {
    if (thumb && !full.getAttribute('src')) {
      full.src = thumb.currentSrc || thumb.src;
      if (dl) dl.href = full.src;
    }
    lastFocus = document.activeElement;
    box.hidden = false;
    // Deux frames : le temps que le navigateur prenne en compte l'affichage
    // avant de lancer la transition d'opacité.
    requestAnimationFrame(() => box.classList.add('is-open'));
    document.body.classList.add('no-scroll');
    const firstBtn = box.querySelector('.lightbox-btn');
    if (firstBtn) firstBtn.focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    const hide = () => { box.hidden = true; };
    box.addEventListener('transitionend', hide, { once: true });
    setTimeout(hide, 400); // repli si la transition est désactivée (reduced motion)
    if (lastFocus) lastFocus.focus();
  };

  trigger.addEventListener('click', open);
  box.querySelectorAll('[data-lb-close]').forEach((el) => el.addEventListener('click', close));

  // Échap ferme ; Tab reste piégé dans la fenêtre tant qu'elle est ouverte.
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === KEY_ESC) { close(); return; }
    if (e.key !== 'Tab') return;
    const focusable = [...box.querySelectorAll('a[href], button:not([disabled])')];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
