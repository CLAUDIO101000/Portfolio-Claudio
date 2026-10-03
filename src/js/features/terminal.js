import { t, onLangChange } from '../i18n/index.js';
import { onFirstVisible } from '../utils/on-first-visible.js';
import { prompt, output, languages, frameworks, tools, lineElement } from '../utils/term-lines.js';
import { initTerminalShell } from './terminal-shell.js';

const LINE_DELAY = 110;

const lines = () => [
  prompt('whoami'),
  output('t-amber', t('term.whoami')),
  prompt('cat languages.txt'),
  ...languages(),
  prompt('cat frameworks.txt'),
  ...frameworks(),
  prompt('odoo-bin --version'),
  output('t-green', t('term.odoo')),
  prompt('cat tools.txt'),
  ...tools(),
  prompt('echo $STATUS'),
  output('t-amber', `${t('term.status')} ■`),
  output('t-out', t('sh.hint')),
];

export function initTerminal() {
  const terminal = document.querySelector('.terminal');
  const intro = document.getElementById('term-intro');
  if (!terminal || !intro) return;

  const shell = initTerminalShell();
  let started = false;
  let rendered = [];

  // Toutes les lignes sont posées dès le chargement, invisibles : le terminal a sa taille définitive
  // avant de se jouer. Sinon il grandirait de plusieurs centaines de pixels à l'écran et décalerait
  // tout ce qui le suit (un lien d'ancre qui le traverse atterrirait à côté de sa cible).
  const build = () => {
    intro.textContent = '';
    rendered = lines().map((segments) => {
      const line = lineElement(segments);
      intro.appendChild(line);
      return line;
    });
  };

  const play = () => {
    rendered.forEach((line, i) => setTimeout(() => line.classList.add('visible'), i * LINE_DELAY));
    // L'invite n'apparaît qu'une fois la présentation affichée
    setTimeout(shell.reveal, rendered.length * LINE_DELAY + 200);
  };

  onFirstVisible([terminal], () => {
    started = true;
    play();
  }, { threshold: 0.3 });

  // Au clavier, l'invite doit être atteignable sans attendre la fin de l'animation d'intro :
  // la première pression sur Tab la révèle (la place est déjà réservée, rien ne bouge)
  document.addEventListener('keydown', (e) => { if (e.key === 'Tab') shell.reveal(); }, { once: true });

  // Langue changée : lignes redessinées ; si le terminal a déjà joué, elles apparaissent d'un coup
  onLangChange(() => {
    build();
    if (started) rendered.forEach((line) => line.classList.add('visible'));
  });

  // Curseur clignotant en fin de dernière ligne
  setInterval(() => {
    const last = [...intro.querySelectorAll('.t-amber')].pop();
    if (!last) return;
    const text = last.textContent;
    last.textContent = text.slice(0, -1) + (text.endsWith('■') ? '▮' : '■');
  }, 600);
}
