import { t, onLangChange } from '../i18n/index.js';

export function initHero() {
  initAvatarFallback();
  initLocalClock();
  initTypedText();
}

// Photo introuvable : les initiales prennent sa place
function initAvatarFallback() {
  const img = document.querySelector('.avatar-wrap img');
  const initials = document.querySelector('.avatar-initials');
  if (!img || !initials) return;

  const showInitials = () => {
    img.closest('picture').hidden = true;
    initials.hidden = false;
  };
  // Le module s'exécute après le parsing : l'erreur a pu survenir avant
  if (img.complete && img.naturalWidth === 0) showInitials();
  else img.addEventListener('error', showInitials, { once: true });
}

function initLocalClock() {
  const el = document.getElementById('local-time');
  if (!el) return;

  const format = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Indian/Antananarivo',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const tick = () => { el.textContent = format.format(new Date()); };
  tick();
  setInterval(tick, 1000);
}

// Texte tapé puis effacé, phrase après phrase, dans la langue active.
// Mouvement réduit : première phrase affichée d'un bloc.
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let phrases = [];
  let index = 0, length = 0, deleting = false;

  onLangChange(() => {
    phrases = t('hero.typed');
    index = 0; length = 0; deleting = false;
    el.textContent = reduceMotion ? phrases[0] : '';
  });
  if (reduceMotion) return;

  const step = () => {
    const phrase = phrases[index % phrases.length] || '';
    if (!deleting) {
      el.textContent = phrase.slice(0, ++length);
      if (length >= phrase.length) {
        deleting = true;
        setTimeout(step, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --length);
      if (length <= 0) {
        length = 0;
        deleting = false;
        index = (index + 1) % phrases.length;
        setTimeout(step, 400);
        return;
      }
    }
    setTimeout(step, deleting ? 45 : 75);
  };
  step();
}
