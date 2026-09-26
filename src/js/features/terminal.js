import { t, onLangChange } from '../i18n/index.js';
import { onFirstVisible } from '../utils/on-first-visible.js';

// Une ligne = liste de segments colorés
const prompt = (command) => [{ cls: 't-prompt', text: '➜' }, { cls: 't-cmd', text: ` ~/claudio ${command}` }];
const output = (cls, text) => [{ cls, text }];
const row = (cls, label, width, value) => [{ cls, text: label.padEnd(width) }, { cls: 't-out', text: value }];
const level = (percent) => `${'●'.repeat(percent / 10)}${'○'.repeat(10 - percent / 10)}  ${percent}%`;

const lines = () => [
  prompt('whoami'),
  output('t-amber', t('term.whoami')),
  prompt('cat languages.txt'),
  row('t-blue', 'Python', 8, level(90)),
  row('t-blue', 'PHP', 8, level(80)),
  row('t-blue', 'JS/TS', 8, level(80)),
  prompt('cat frameworks.txt'),
  row('t-purple', 'React', 9, 'Django   Laravel   Node.js   Bootstrap'),
  row('t-purple', 'Express', 9, 'Socket.io   jQuery   Odoo OWL'),
  prompt('odoo-bin --version'),
  output('t-green', t('term.odoo')),
  prompt('cat tools.txt'),
  output('t-out', 'Git · GitHub · Linux · Figma · SASS · npm · PostgreSQL'),
  prompt('echo $STATUS'),
  output('t-amber', `${t('term.status')} ■`),
];

export function initTerminal() {
  const terminal = document.querySelector('.terminal');
  const body = document.getElementById('term-body');
  if (!terminal || !body) return;

  let started = false;

  const render = (animate) => {
    body.textContent = '';
    lines().forEach((segments, i) => {
      const line = document.createElement('div');
      line.className = 't-line';
      segments.forEach(({ cls, text }) => {
        const span = document.createElement('span');
        span.className = cls;
        span.textContent = text;
        line.appendChild(span);
      });
      body.appendChild(line);
      if (animate) setTimeout(() => line.classList.add('visible'), i * 110);
      else line.classList.add('visible');
    });
  };

  // Joué une seule fois, à l'arrivée à l'écran
  onFirstVisible([terminal], () => {
    started = true;
    render(true);
  }, { threshold: 0.3 });

  // Déjà joué : redessiné sans animation dans la nouvelle langue
  onLangChange(() => { if (started) render(false); });

  // Curseur clignotant en fin de dernière ligne
  setInterval(() => {
    const last = [...body.querySelectorAll('.t-amber')].pop();
    if (!last) return;
    const text = last.textContent;
    last.textContent = text.slice(0, -1) + (text.endsWith('■') ? '▮' : '■');
  }, 600);
}
