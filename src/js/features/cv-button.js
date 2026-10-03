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

  // La librairie PDF se charge dès que le visiteur approche d'un bouton : le téléchargement part sans attente
  const warmUp = () => import('../cv/pdf.js').then((pdf) => pdf.preloadPdfLibrary()).catch(() => { /* hors ligne : l'erreur sera signalée au clic */ });

  buttons.forEach((button) => {
    ['pointerenter', 'focus', 'touchstart'].forEach((type) => button.addEventListener(type, warmUp, { once: true, passive: true }));

    const originalKey = labelOf(button)?.dataset.i18n;
    if (!originalKey) return;

    button.addEventListener('click', async () => {
      if (busy) return;
      busy = true;
      buttons.forEach((b) => b.setAttribute('aria-disabled', 'true'));
      button.setAttribute('aria-busy', 'true');
      setLabel(button, 'cv.generating');

      try {
        const { generateCV } = await import('../cv/pdf.js');
        // Le CV suit la langue du site
        await generateCV(document.documentElement.lang);
        showToast({
          id: 'cv', title: t('cv.doneTitle'), text: t('cv.doneText'), closeLabel: t('toast.close'),
        });
      } catch {
        // Connexion présente : la cause la plus probable est un onglet resté ouvert pendant un déploiement
        // (les fichiers à empreinte de l'ancienne version n'existent plus), pas le réseau
        const text = navigator.onLine === false ? t('cv.error') : t('cv.errorStale');
        showToast({
          id: 'cv', kind: 'error', title: t('cv.errorTitle'), text, duration: 8000, closeLabel: t('toast.close'),
        });
      } finally {
        busy = false;
        buttons.forEach((b) => b.removeAttribute('aria-disabled'));
        button.removeAttribute('aria-busy');
        setLabel(button, originalKey);
      }
    });
  });
}
