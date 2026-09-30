import { t } from '../i18n/index.js';
import { showToast } from '../ui/toast.js';

// Copie dans le presse-papiers, avec repli pour les contextes non sécurisés
async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch { /* refus de permission : on tente le repli */ }
  }
  const area = Object.assign(document.createElement('textarea'), { value });
  area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { /* indisponible */ }
  area.remove();
  return ok;
}

// [data-copy] porte la valeur à copier
export function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    let resetTimer = null;

    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      const ok = await copyText(value);

      if (ok) {
        button.classList.add('is-copied');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => button.classList.remove('is-copied'), 1800);
        showToast({
          id: 'copy', title: t('contact.copiedTitle'), detail: value, closeLabel: t('toast.close'), duration: 2400,
        });
      } else {
        showToast({
          id: 'copy', kind: 'error', title: t('contact.copyFailTitle'), text: t('contact.copyFailText'), closeLabel: t('toast.close'),
        });
      }
    });
  });
}
