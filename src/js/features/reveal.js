import { onFirstVisible } from '../utils/on-first-visible.js';

// Apparition des blocs .reveal à l'entrée dans l'écran, en léger décalé
export function initReveal() {
  onFirstVisible(document.querySelectorAll('.reveal'), (el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80);
  }, { threshold: 0.08 });
}
