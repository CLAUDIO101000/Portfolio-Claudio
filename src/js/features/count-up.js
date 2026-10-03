import { onFirstVisible } from '../utils/on-first-visible.js';

const DURATION = 1400;
const easeOut = (x) => 1 - (1 - x) ** 3;
const YEAR_MS = 365.25 * 24 * 3600 * 1000;

// Ancienneté : un chiffre qui porte `data-since` (AAAA-MM-JJ) se recalcule seul,
// il ne vieillit pas. Le HTML garde la valeur du jour pour les visiteurs sans JS.
function updateSeniority() {
  document.querySelectorAll('.stat-number[data-since]').forEach((el) => {
    const years = Math.floor((Date.now() - new Date(el.dataset.since)) / YEAR_MS);
    if (years >= 1) el.textContent = `${years}+`;
  });
}

// Les chiffres comptent jusqu'à leur valeur à leur première apparition (nombres seulement).
// Le HTML garde la valeur finale : sans JS, rien ne change.
export function initCountUp() {
  updateSeniority();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const counters = [...document.querySelectorAll('.stat-number')].flatMap((el) => {
    const match = el.textContent.trim().match(/^(\d+)(\D*)$/);
    return match ? [{ el, target: Number(match[1]), suffix: match[2] }] : [];
  });
  if (!counters.length) return;

  const byElement = new Map(counters.map((c) => [c.el, c]));
  counters.forEach(({ el, suffix }) => { el.textContent = `0${suffix}`; });

  onFirstVisible(counters.map((c) => c.el), (el) => {
    const { target, suffix } = byElement.get(el);
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      el.textContent = `${Math.round(target * easeOut(progress))}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.6 });
}
