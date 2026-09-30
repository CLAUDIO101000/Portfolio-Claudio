// Curseur personnalisé (point + anneau inertiel), pointeurs fins seulement : le CSS ne masque
// le curseur natif qu'une fois .has-custom-cursor posée. Invisible avant le premier mouvement,
// masqué quand la souris quitte la fenêtre.
export function initCursor() {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!dot || !ring || !finePointer) return;

  const root = document.documentElement;
  root.classList.add('has-custom-cursor');

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  let frame = null;

  // L'anneau rattrape le point ; la boucle s'arrête une fois arrivé
  const follow = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    const settled = Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1;
    frame = settled ? null : requestAnimationFrame(follow);
  };

  document.addEventListener('mousemove', (e) => {
    if (!root.classList.contains('cursor-ready')) {
      // Première position : pas de glissement depuis un coin
      ringX = e.clientX;
      ringY = e.clientY;
      root.classList.add('cursor-ready');
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (frame === null) frame = requestAnimationFrame(follow);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => root.classList.remove('cursor-ready'));

  // Délégation : couvre aussi les éléments ajoutés après coup
  document.addEventListener('mouseover', (e) => {
    root.classList.toggle('cursor-hover', !!e.target.closest('a, button, [role="button"], label, .skill-pill'));
  });

  document.addEventListener('mousedown', () => root.classList.add('cursor-down'));
  document.addEventListener('mouseup', () => root.classList.remove('cursor-down'));
}
