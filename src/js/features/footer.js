import { onLangChange } from '../i18n/index.js';

export function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// Date de mise à jour (posée au build, en ISO) écrite dans la langue du site
export function initFooterUpdated() {
  const el = document.getElementById('footer-updated');
  const date = new Date(`${el?.getAttribute('datetime')}T00:00:00Z`);
  if (!el || Number.isNaN(date.getTime())) return;

  onLangChange((lang) => {
    el.textContent = date.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  });
}
