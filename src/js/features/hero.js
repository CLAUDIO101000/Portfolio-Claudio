import { t, onLangChange } from '../i18n/index.js';

export function initHero() {
  initAvatarFallback();
  initLocalClock();
  initTypedText();
  initOffscreenPause();
}

// Courbes, badge et curseur en boucle : suspendus hors écran (batterie)
function initOffscreenPause() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  new IntersectionObserver(([entry]) => {
    hero.classList.toggle('is-offscreen', !entry.isIntersecting);
  }).observe(hero);
}

// Photo en fondu dès qu'elle est prête, initiales si elle est introuvable ;
// `complete` couvre le cas où l'évènement a précédé le module.
function initAvatarFallback() {
  const wrap = document.querySelector('.avatar-wrap');
  const img = wrap?.querySelector('img');
  const initials = wrap?.querySelector('.avatar-initials');
  if (!img || !initials) return;

  const showPhoto = () => wrap.classList.add('is-loaded');
  const showInitials = () => {
    img.closest('picture').hidden = true;
    initials.hidden = false;
    wrap.classList.add('is-loaded');
  };

  if (img.complete) (img.naturalWidth > 0 ? showPhoto : showInitials)();
  else {
    img.addEventListener('load', showPhoto, { once: true });
    img.addEventListener('error', showInitials, { once: true });
  }
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
  initTimeZoneOffset();
}

// Décalage d'Antananarivo (UTC+3, sans heure d'été) avec le fuseau du visiteur
function initTimeZoneOffset() {
  const el = document.getElementById('tz-offset');
  if (!el) return;

  onLangChange((lang) => {
    const diff = 3 + new Date().getTimezoneOffset() / 60;
    if (diff === 0) {
      el.textContent = ` · ${t('hero.tzSame')}`;
      return;
    }
    const n = `${diff > 0 ? '+' : '−'}${Math.abs(diff).toLocaleString(lang)}`;
    el.textContent = ` · ${t('hero.tzDiff').replace('{n}', n)}`;
  });
}

// Texte tapé puis effacé, dans la langue active (mouvement réduit : première phrase fixe).
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
