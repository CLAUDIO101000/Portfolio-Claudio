// Bascule de langue FR / EN.
//
// Principe : le HTML est servi en français (référencement + visiteurs sans JS),
// et chaque nœud traduisible porte une clé de dictionnaire :
//   data-i18n              → textContent
//   data-i18n-html         → innerHTML (texte contenant du balisage inline)
//   data-i18n-placeholder  → attribut placeholder
//   data-i18n-aria-label   → attribut aria-label
//   data-i18n-alt          → attribut alt (images)
//
// Le choix est mémorisé dans localStorage ; à la première visite on suit la
// langue du navigateur.

import { translations, LANGS, LANG_NAMES } from './translations.js';

const STORAGE_KEY = 'portfolio-lang';
const DEFAULT_LANG = 'fr';

let current = DEFAULT_LANG;
const listeners = new Set();

/** Traduit une clé dans la langue active (repli sur le français, puis sur la clé). */
export function t(key) {
  const dict = translations[current] || translations[DEFAULT_LANG];
  const value = dict[key];
  if (value !== undefined) return value;
  const fallback = translations[DEFAULT_LANG][key];
  return fallback !== undefined ? fallback : key;
}

export function getLang() {
  return current;
}

/** Abonne un module aux changements de langue ; rappelle aussi immédiatement. */
export function onLangChange(cb) {
  listeners.add(cb);
  cb(current);
  return () => listeners.delete(cb);
}

function readStoredLang() {
  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* mode privé */ }
  if (LANGS.includes(stored)) return stored;
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : DEFAULT_LANG;
}

function persist(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* mode privé */ }
}

// ── Application de la langue au DOM
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(el.dataset.i18nAlt));
  });
}

function applyMetadata() {
  document.documentElement.lang = current;
  document.title = t('meta.title');
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  };
  set('meta[name="description"]', t('meta.description'));
  set('meta[property="og:title"]', t('meta.ogTitle'));
  set('meta[property="og:description"]', t('meta.ogDescription'));
  set('meta[property="og:locale"]', t('meta.ogLocale'));
}

function applyTabsState() {
  document.querySelectorAll('#lang-switch .lang-tab').forEach((btn) => {
    const active = btn.dataset.lang === current;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
    btn.tabIndex = active ? 0 : -1;
  });
}

// SweetAlert2 (~90 ko) n'est utile qu'au premier clic sur les onglets :
// on le charge à la demande plutôt que dans le bundle initial.
let swalPromise = null;
function loadSwal() {
  if (!swalPromise) {
    swalPromise = Promise.all([
      import('sweetalert2'),
      import('sweetalert2/dist/sweetalert2.min.css'),
    ]).then(([mod]) => mod.default);
  }
  return swalPromise;
}

/** Précharge la librairie au survol : le toast s'affiche alors sans latence. */
function prefetchSwal() { loadSwal().catch(() => {}); }

// ── Notification SweetAlert2 : rédigée dans la langue qui vient d'être activée
async function notifySwitch(from, to) {
  // Textes figés maintenant : deux clics rapprochés ne peuvent pas faire
  // afficher au toast une langue autre que celle de sa propre bascule.
  const title = t('lang.toastTitle');
  const note = t('lang.toastText');

  let Swal;
  try {
    Swal = await loadSwal();
  } catch (e) {
    return; // hors ligne : la bascule reste effective, seul le toast manque
  }
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title,
    // Les deux libellés viennent de constantes internes : aucun contenu externe.
    html: `<span class="lang-toast-flow">${LANG_NAMES[from]} <em>&rarr;</em> ${LANG_NAMES[to]}</span>`
        + `<span class="lang-toast-note">${note}</span>`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: { popup: 'lang-toast' },
    didOpen: (el) => {
      el.addEventListener('mouseenter', Swal.stopTimer);
      el.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

/**
 * Change la langue active.
 * @param {string} lang  'fr' ou 'en'
 * @param {{notify?: boolean}} options  notify=false pour la restauration au chargement
 */
export function setLang(lang, { notify = true } = {}) {
  if (!LANGS.includes(lang) || lang === current) return;
  const from = current;
  current = lang;

  applyTranslations();
  applyMetadata();
  applyTabsState();
  persist(lang);
  listeners.forEach((cb) => cb(current));

  if (notify) notifySwitch(from, lang);
}

export function initI18n() {
  const tabs = document.querySelectorAll('#lang-switch .lang-tab');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
    btn.addEventListener('mouseenter', prefetchSwal, { once: true });
    btn.addEventListener('focus', prefetchSwal, { once: true });
  });

  // Navigation clavier entre les deux onglets (pattern ARIA tablist)
  const switcher = document.getElementById('lang-switch');
  if (switcher) {
    switcher.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length];
      setLang(next);
      switcher.querySelector(`.lang-tab[data-lang="${next}"]`)?.focus();
    });
  }

  // Restauration silencieuse : pas de notification pour un choix déjà connu.
  const stored = readStoredLang();
  if (stored !== current) {
    setLang(stored, { notify: false });
  } else {
    applyTranslations();
    applyMetadata();
    applyTabsState();
  }
}
