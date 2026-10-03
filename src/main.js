import './styles/main.scss';

import { initI18n } from './js/i18n/index.js';
import { initCursor } from './js/features/cursor.js';
import { initNav } from './js/features/nav.js';
import { initHero } from './js/features/hero.js';
import { initMarquee } from './js/features/marquee.js';
import { initBentoGlow } from './js/features/bento.js';
import { initReveal } from './js/features/reveal.js';
import { initTerminal } from './js/features/terminal.js';
import { initContactForm, initMailLink } from './js/features/contact-form.js';
import { initLightbox } from './js/features/lightbox.js';
import { initFooterYear, initFooterUpdated } from './js/features/footer.js';
import { initCvButtons } from './js/features/cv-button.js';
import { initCountUp } from './js/features/count-up.js';
import { initCopyButtons } from './js/features/copy.js';
import { initTheme } from './js/features/theme.js';
import { initTopo } from './js/features/topo.js';
import { markExternalLinks } from './js/features/external-links.js';
import { initConsoleSignature } from './js/features/console-signature.js';

// Avant la traduction, pour que ces textes rejoignent la table de traduction
markExternalLinks();

// Traduction d'abord : les modules qui lisent des textes partent de la bonne langue
initI18n();

initTheme();
initCursor();
initNav();
initHero();
// Le relief se dessine après le premier affichage (il apparaît en fondu de toute façon)
(window.requestIdleCallback ?? ((run) => setTimeout(run, 200)))(initTopo, { timeout: 1500 });
initMarquee();
initBentoGlow();
initReveal();
initTerminal();
initContactForm();
initMailLink();
initLightbox();
initFooterYear();
initFooterUpdated();
initCvButtons();
initCopyButtons();
initCountUp();
initConsoleSignature();
