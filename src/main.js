import './styles/main.scss';

import { initI18n } from './js/i18n/index.js';
import { initCursor } from './js/features/cursor.js';
import { initNav } from './js/features/nav.js';
import { initHero } from './js/features/hero.js';
import { initMarquee } from './js/features/marquee.js';
import { initBentoGlow } from './js/features/bento.js';
import { initReveal } from './js/features/reveal.js';
import { initTerminal } from './js/features/terminal.js';
import { initContactForm } from './js/features/contact-form.js';
import { initLightbox } from './js/features/lightbox.js';
import { initFooterYear } from './js/features/footer.js';
import { generateCV } from './js/cv/pdf.js';

// Traduction d'abord : les modules qui lisent des textes partent de la bonne langue
initI18n();

initCursor();
initNav();
initHero();
initMarquee();
initBentoGlow();
initReveal();
initTerminal();
initContactForm();
initLightbox();
initFooterYear();

document.getElementById('cv-download')?.addEventListener('click', generateCV);
