// Le HTML est en français (SEO, visiteurs sans JS) et fait foi : le français est lu dans
// le DOM au chargement, puis chaque langue passe par la même table de liaisons.

import { translations, LANGS, LANG_NAMES } from './translations.js';
import { showToast } from '../ui/toast.js';

const STORAGE_KEY = 'portfolio-lang';
const DEFAULT_LANG = 'fr';

const text = {
  read: (el) => el.textContent.replace(/\s+/g, ' ').trim(),
  write: (el, value) => { el.textContent = value; },
};
const html = {
  read: (el) => el.innerHTML.trim(),
  write: (el, value) => { el.innerHTML = value; },
};
const attr = (name) => ({
  read: (el) => el.getAttribute(name),
  write: (el, value) => el.setAttribute(name, value),
});

// Attribut qui porte la clé → façon de lire / écrire la valeur
const BINDINGS = [
  ['data-i18n', text],
  ['data-i18n-html', html],
  ['data-i18n-placeholder', attr('placeholder')],
  ['data-i18n-aria-label', attr('aria-label')],
  ['data-i18n-title', attr('title')],
  ['data-i18n-alt', attr('alt')],
];

// Métadonnées du <head> : clé fixe → élément
const META = [
  ['meta.title', 'title', text],
  ['meta.description', 'meta[name="description"]', attr('content')],
  ['meta.ogTitle', 'meta[property="og:title"]', attr('content')],
  ['meta.ogDescription', 'meta[property="og:description"]', attr('content')],
  ['meta.ogLocale', 'meta[property="og:locale"]', attr('content')],
];

let current = DEFAULT_LANG;
let dictionaries = translations;
const listeners = new Set();

/** Tous les nœuds traduisibles de la page : [élément, clé, liaison]. */
function translatableNodes() {
  const nodes = META.map(([key, selector, binding]) => [document.querySelector(selector), key, binding]);
  for (const [attribute, binding] of BINDINGS) {
    document.querySelectorAll(`[${attribute}]`).forEach((el) => {
      nodes.push([el, el.getAttribute(attribute), binding]);
    });
  }
  return nodes.filter(([el]) => el);
}

/** Traduit une clé dans la langue active (repli : français, puis la clé elle-même). */
export function t(key) {
  return dictionaries[current]?.[key] ?? dictionaries[DEFAULT_LANG][key] ?? key;
}

/** Abonne un module aux changements de langue ; l'appelle aussi immédiatement. */
export function onLangChange(cb) {
  listeners.add(cb);
  cb(current);
  return () => listeners.delete(cb);
}

function readStoredLang() {
  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* stockage indisponible */ }
  if (LANGS.includes(stored)) return stored;
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  return LANGS.includes(browser) ? browser : DEFAULT_LANG;
}

function persist(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* stockage indisponible */ }
}

// Dictionnaire français = textes du HTML + textes générés en JS
function readFrenchFromPage() {
  const fromPage = {};
  translatableNodes().forEach(([el, key, binding]) => { fromPage[key] ??= binding.read(el); });
  dictionaries = { ...translations, [DEFAULT_LANG]: { ...translations[DEFAULT_LANG], ...fromPage } };
}

function applyAll() {
  document.documentElement.lang = current;
  translatableNodes().forEach(([el, key, binding]) => binding.write(el, t(key)));

  document.querySelectorAll('#lang-switch .lang-tab').forEach((btn) => {
    const active = btn.dataset.lang === current;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function notifySwitch(from, to) {
  showToast({
    id: 'lang',
    title: t('lang.toastTitle'),
    detail: `${LANG_NAMES[from]} → ${LANG_NAMES[to]}`,
    text: t('lang.toastText'),
    closeLabel: t('toast.close'),
  });
}

export function setLang(lang, { notify = true } = {}) {
  if (!LANGS.includes(lang) || lang === current) return;
  const from = current;
  current = lang;

  applyAll();
  persist(lang);
  listeners.forEach((cb) => cb(current));

  if (notify) notifySwitch(from, lang);
}

export function initI18n() {
  readFrenchFromPage();

  document.querySelectorAll('#lang-switch .lang-tab').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  const switcher = document.getElementById('lang-switch');
  switcher?.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length];
    setLang(next);
    switcher.querySelector(`.lang-tab[data-lang="${next}"]`)?.focus();
  });

  // Page déjà en français : seule une autre langue mémorisée est à appliquer
  const stored = readStoredLang();
  if (stored !== current) setLang(stored, { notify: false });
}
