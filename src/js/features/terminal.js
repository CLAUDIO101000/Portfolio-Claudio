import { t, onLangChange } from '../i18n/index.js';
import { onFirstVisible } from '../utils/on-first-visible.js';
import { prompt, output, languages, frameworks, tools, lineElement } from '../utils/term-lines.js';
import { initTerminalShell } from './terminal-shell.js';

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
];

export function initTerminal() {
  const terminal = document.querySelector('.terminal');
  const intro = document.getElementById('term-intro');
  if (!terminal || !intro) return;

  const shell = initTerminalShell();
  let started = false;

  const render = (animate) => {
    intro.textContent = '';
    const all = lines();
    all.forEach((segments, i) => {
      const line = lineElement(segments);
      intro.appendChild(line);
      if (animate) setTimeout(() => line.classList.add('visible'), i * 110);
      else line.classList.add('visible');
    });
    // L'invite n'apparaît qu'une fois la présentation affichée
    setTimeout(shell.reveal, animate ? all.length * 110 + 200 : 0);
  };

  onFirstVisible([terminal], () => {
    started = true;
    render(true);
  }, { threshold: 0.3 });

  // Déjà joué : redessiné sans animation dans la nouvelle langue
  onLangChange(() => { if (started) render(false); });

  // Curseur clignotant en fin de dernière ligne
  setInterval(() => {
    const last = [...intro.querySelectorAll('.t-amber')].pop();
    if (!last) return;
    const text = last.textContent;
    last.textContent = text.slice(0, -1) + (text.endsWith('■') ? '▮' : '■');
  }, 600);
}
