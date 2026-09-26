// Curseur personnalisé : point + anneau qui suit avec inertie.
// Réservé aux pointeurs fins ; le CSS ne masque le curseur natif qu'une fois
// .has-custom-cursor posée, pour qu'un échec du script le laisse visible.
export function initCursor() {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!dot || !ring || !finePointer) return;

  const root = document.documentElement;
  root.classList.add('has-custom-cursor');

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function follow() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(follow);
  })();

  // Délégation : couvre aussi les éléments ajoutés après coup (toasts…)
  document.addEventListener('mouseover', (e) => {
    root.classList.toggle('cursor-hover', !!e.target.closest('a, button, .skill-pill'));
  });
}
