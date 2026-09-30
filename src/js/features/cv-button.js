import { t } from '../i18n/index.js';
import { showToast } from '../ui/toast.js';

// Boutons [data-cv-download] : état de chargement pendant jsPDF, puis toast de confirmation ou d'erreur.
export function initCvButtons() {
  const buttons = [...document.querySelectorAll('[data-cv-download]')];
  let busy = false;

  const labelOf = (button) => button.querySelector('[data-i18n]');
  const setLabel = (button, key) => {
    const label = labelOf(button);
    label.dataset.i18n = key; // la clé suit la langue si elle change pendant l'attente
    label.textContent = t(key);
  };

  buttons.forEach((button) => {
    const originalKey = labelOf(button)?.dataset.i18n;
    if (!originalKey) return;

    button.addEventListener('click', async () => {
      if (busy) return;
      busy = true;
      buttons.forEach((b) => b.setAttribute('aria-disabled', 'true'));
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
      setLabel(button, 'cv.generating');

      try {
        const { generateCV } = await import('../cv/pdf.js');
        await generateCV();
        showToast({
          id: 'cv', title: t('cv.doneTitle'), text: t('cv.doneText'), closeLabel: t('toast.close'),
        });
      } catch {
        showToast({
          id: 'cv', kind: 'error', title: t('cv.errorTitle'), text: t('cv.error'), duration: 7000, closeLabel: t('toast.close'),
        });
      } finally {
        busy = false;
        buttons.forEach((b) => b.removeAttribute('aria-disabled'));
        button.disabled = false;
        button.removeAttribute('aria-busy');
        setLabel(button, originalKey);
      }
    });
  });
}
