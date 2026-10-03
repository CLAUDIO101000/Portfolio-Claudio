// Visionneuse du certificat : l'image est chargée à la demande (loading=lazy, boîte cachée).
export function initLightbox() {
  const box = document.getElementById('lightbox');
  const full = document.getElementById('lightbox-img');
  const download = document.getElementById('lightbox-dl');
  const trigger = document.getElementById('cert-open');
  const zoomButton = document.getElementById('lightbox-zoom');
  if (!box || !full || !trigger) return;

  let lastFocus = null;

  const setZoom = (zoomed) => {
    box.classList.toggle('is-zoomed', zoomed);
    if (zoomed) {
      const panel = box.querySelector('.lightbox-panel');
      panel.scrollLeft = (panel.scrollWidth - panel.clientWidth) / 2;
    }
  };
  const toggleZoom = () => setZoom(!box.classList.contains('is-zoomed'));
  zoomButton?.addEventListener('click', toggleZoom);
  full.addEventListener('click', toggleZoom);

  // Même fichier que la vignette (donc déjà en cache) ; le lien de téléchargement pointe dessus
  if (download) download.href = full.src;

  const open = () => {
    lastFocus = document.activeElement;
    box.hidden = false;
    // Classe à la frame suivante, pour déclencher le fondu
    requestAnimationFrame(() => box.classList.add('is-open'));
    document.body.classList.add('no-scroll');
    box.querySelector('.lightbox-btn')?.focus();
  };

  const close = () => {
    setZoom(false);
    box.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    const hide = () => { box.hidden = true; };
    box.addEventListener('transitionend', hide, { once: true });
    setTimeout(hide, 400); // repli si la transition est désactivée
    // Safari ne focalise pas le bouton cliqué : repli sur le déclencheur
    (lastFocus && lastFocus !== document.body ? lastFocus : trigger).focus();
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
