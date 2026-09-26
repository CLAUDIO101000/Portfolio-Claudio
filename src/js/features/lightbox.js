// Visionneuse du certificat. L'URL de l'image est reprise de la vignette, que
// Vite réécrit selon la base du site : aucun chemin écrit en dur ici.
export function initLightbox() {
  const box = document.getElementById('lightbox');
  const full = document.getElementById('lightbox-img');
  const download = document.getElementById('lightbox-dl');
  const trigger = document.getElementById('cert-open');
  if (!box || !full || !trigger) return;

  const thumb = trigger.querySelector('img');
  let lastFocus = null;

  const open = () => {
    if (thumb && !full.getAttribute('src')) {
      full.src = thumb.currentSrc || thumb.src;
      if (download) download.href = full.src;
    }
    lastFocus = document.activeElement;
    box.hidden = false;
    // Classe posée à la frame suivante pour que le fondu se déclenche
    requestAnimationFrame(() => box.classList.add('is-open'));
    document.body.classList.add('no-scroll');
    box.querySelector('.lightbox-btn')?.focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    const hide = () => { box.hidden = true; };
    box.addEventListener('transitionend', hide, { once: true });
    setTimeout(hide, 400); // repli si la transition est désactivée
    lastFocus?.focus();
  };

  trigger.addEventListener('click', open);
  box.querySelectorAll('[data-lb-close]').forEach((el) => el.addEventListener('click', close));

  // Échap ferme ; Tab reste piégé dans la visionneuse
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab') return;

    const focusable = [...box.querySelectorAll('a[href], button:not([disabled])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}
