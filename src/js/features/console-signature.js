import { t } from '../i18n/index.js';

const REPO_URL = 'https://github.com/CLAUDIO101000/Portfolio-Claudio';
const EMAIL = 'ranaivosonclaudio@gmail.com';

// Message pour les développeurs qui ouvrent les outils de développement : un recruteur technique
// y regarde souvent, autant lui laisser un mot et le chemin vers le contact.
export function initConsoleSignature() {
  const title = 'font: italic 700 28px Georgia, serif; color: #ff6b3d;';
  const strong = 'font: 600 13px ui-monospace, Menlo, Consolas, monospace; color: #ff6b3d;';
  const plain = 'font: 13px ui-monospace, Menlo, Consolas, monospace;';

  console.log(`%cClaudio.%c\n${t('console.hello')}`, title, plain);
  console.log(`%c→%c ${t('console.source')} ${REPO_URL}`, strong, plain);
  console.log(`%c→%c ${t('console.contact')} ${EMAIL}`, strong, plain);
  console.log(`%c→%c ${t('console.hint')}`, strong, plain);
}
