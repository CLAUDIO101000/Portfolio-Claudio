// Annonce aux lecteurs d'écran les liens qui s'ouvrent dans un nouvel onglet.
// Avant initI18n, pour que le texte rejoigne la table de traduction.
export function markExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const hint = document.createElement('span');
    hint.className = 'sr-only';
    hint.dataset.i18n = 'a11y.newTab';
    hint.textContent = '(ouvre un nouvel onglet)';
    link.append(' ', hint);
  });
}
