import { t, setLang } from '../i18n/index.js';
import { goToSection } from './anchors.js';
import { output, row, languages, frameworks, tools, lineElement } from '../utils/term-lines.js';

const SECTIONS = ['services', 'projects', 'skills', 'stack', 'experience', 'about', 'education', 'contact'];
const CHIPS = ['help', 'neofetch', 'skills', 'projects', 'experience', 'contact', 'cv'];
const MAX_LINES = 200;
// Début du stage chez Groupe Viseo : sert à l'« uptime » de neofetch
const CAREER_START = new Date('2025-02-12');

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const currentTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
const currentLang = () => document.documentElement.lang;

// Mois entiers écoulés depuis une date, exprimés en années + mois
function elapsedSince(from, to = new Date()) {
  let months = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth();
  if (to.getDate() < from.getDate()) months -= 1;
  return { years: Math.floor(months / 12), months: months % 12 };
}

// Projets lus dans la page : le terminal n'a pas de liste à tenir à jour.
// Les cartes sans lien (code privé) ne s'ouvrent pas : elles n'en font pas partie.
function projects() {
  return [...document.querySelectorAll('.project-card:has(.project-link)')].map((card) => {
    const link = card.querySelector('.project-link');
    const name = link.firstChild.textContent.trim();
    return {
      key: name.toLowerCase(),
      name,
      url: link.href,
      stack: [...card.querySelectorAll('.project-tags .tag')].map((tag) => tag.textContent).join(' · '),
    };
  });
}

const cmds = {
  help: { usage: 'help', desc: 'sh.d.help', run: () => Object.values(cmds).map((c) => row('t-amber', c.usage, 20, t(c.desc))) },
  whoami: { usage: 'whoami', desc: 'sh.d.whoami', run: () => [output('t-amber', t('term.whoami'))] },
  neofetch: {
    usage: 'neofetch',
    desc: 'sh.d.neofetch',
    run: () => {
      const unit = (value, name) => new Intl.NumberFormat(currentLang(), { style: 'unit', unit: name, unitDisplay: 'long' }).format(value);
      const { years, months } = elapsedSince(CAREER_START);
      const uptime = [years && unit(years, 'year'), months && unit(months, 'month')].filter(Boolean).join(' ');
      const info = (label, value) => row('t-blue', label, 8, value);
      return [
        output('t-amber', 'claudio@dev-mg'),
        output('t-out', '─'.repeat(14)),
        info('role', `${t('exp.e1.role')} · Groupe Viseo`),
        info('stack', 'Python · Odoo · PostgreSQL · JavaScript'),
        info('base', 'Antananarivo, Madagascar · UTC+3'),
        info('uptime', fill(t('sh.nf.uptime'), { v: uptime || unit(0, 'month') })),
        info('langs', t('sh.nf.langs')),
        info('shell', 'zsh'),
        info('status', t('term.status')),
        // Nuancier façon neofetch : les couleurs du thème
        ['t-err', 't-amber', 't-green', 't-blue', 't-purple'].map((cls) => ({ cls, text: '███ ' })),
      ];
    },
  },
  skills: { usage: 'skills', desc: 'sh.d.skills', run: () => [...languages(), ...frameworks(), ...tools()] },
  projects: {
    usage: 'projects',
    desc: 'sh.d.projects',
    run: () => projects().map((p) => row('t-blue', p.name, 14, p.stack)),
  },
  open: {
    usage: 'open <projet>',
    desc: 'sh.d.open',
    run: ([name = '']) => {
      const list = projects();
      const project = list.find((p) => p.key === name.toLowerCase());
      if (!project) return [output('t-out', fill(t('sh.open.bad'), { list: list.map((p) => p.key).join(', ') }))];
      window.open(project.url, '_blank', 'noopener');
      return [output('t-green', fill(t('sh.open.done'), { v: project.name }))];
    },
  },
  experience: {
    usage: 'experience',
    desc: 'sh.d.experience',
    run: () => [
      row('t-amber', t('exp.e1.role'), 28, 'Groupe Viseo · 2025 →'),
      row('t-amber', t('exp.e2.role'), 28, 'Groupe Viseo · 2025'),
    ],
  },
  contact: {
    usage: 'contact',
    desc: 'sh.d.contact',
    run: () => [...document.querySelectorAll('.contact-item-row')].map((item) => (
      row('t-blue', item.querySelector('.ci-label').textContent.toLowerCase(), 10, item.querySelector('.ci-val').textContent)
    )),
  },
  cv: {
    usage: 'cv',
    desc: 'sh.d.cv',
    run: () => {
      document.querySelector('[data-cv-download]')?.click();
      return [output('t-out', t('cv.generating'))];
    },
  },
  theme: {
    usage: 'theme [light|dark]',
    desc: 'sh.d.theme',
    run: ([arg = '']) => {
      const wanted = { light: 'light', clair: 'light', dark: 'dark', sombre: 'dark' }[arg.toLowerCase()] ?? (arg ? null : (currentTheme() === 'light' ? 'dark' : 'light'));
      if (!wanted) return [output('t-out', t('sh.theme.bad'))];
      if (wanted !== currentTheme()) document.getElementById('theme-toggle')?.click();
      return [output('t-green', fill(t('sh.theme.done'), { v: wanted }))];
    },
  },
  lang: {
    usage: 'lang <fr|en>',
    desc: 'sh.d.lang',
    run: ([arg = '']) => {
      const lang = arg.toLowerCase();
      if (lang !== 'fr' && lang !== 'en') return [output('t-out', t('sh.lang.bad'))];
      setLang(lang);
      return [output('t-green', fill(t('sh.lang.done'), { v: lang }))];
    },
  },
  goto: {
    usage: 'goto <section>',
    desc: 'sh.d.goto',
    run: ([name = '']) => {
      const id = name.toLowerCase();
      if (!SECTIONS.includes(id)) return [output('t-out', fill(t('sh.goto.bad'), { list: SECTIONS.join(', ') }))];
      goToSection(document.getElementById(id));
      return [output('t-green', fill(t('sh.goto.done'), { v: id }))];
    },
  },
  date: {
    usage: 'date',
    desc: 'sh.d.date',
    run: () => [output('t-out', new Intl.DateTimeFormat(currentLang(), {
      timeZone: 'Indian/Antananarivo', dateStyle: 'full', timeStyle: 'medium',
    }).format(new Date()))],
  },
  clear: { usage: 'clear', desc: 'sh.d.clear', run: () => null },
};

// Commandes hors liste : œufs de Pâques
function secret(name, args) {
  if (name === 'sudo') {
    if (args[0] === 'hire' && args[1] === 'claudio') {
      setTimeout(() => {
        goToSection(document.getElementById('contact'));
        document.getElementById('cf-name')?.focus({ preventScroll: true });
      }, 900);
      return [output('t-green', t('sh.sudo'))];
    }
    return [output('t-out', t('sh.sudo.denied'))];
  }
  if (name === 'rm') return [output('t-out', t('sh.rm'))];
  if (name === 'exit') return [output('t-out', t('sh.exit'))];
  if (name === 'ls') return [output('t-purple', SECTIONS.join('  '))];
  return undefined;
}

// Invite interactive : saisie libre (historique, Tab pour compléter) et suggestions à toucher
export function initTerminalShell() {
  const body = document.getElementById('term-body');
  const log = document.getElementById('term-log');
  const form = document.getElementById('term-form');
  const input = document.getElementById('term-input');
  const chips = document.getElementById('term-chips');
  const terminal = document.querySelector('.terminal');
  if (!body || !log || !form || !input || !chips) return { reveal() {} };

  const history = [];
  let cursor = 0;

  const print = (segments) => {
    const line = lineElement(segments);
    line.classList.add('visible');
    log.appendChild(line);
    while (log.children.length > MAX_LINES) log.firstChild.remove();
  };
  const scrollDown = () => { body.scrollTop = body.scrollHeight; };

  const run = (raw) => {
    const text = raw.trim();
    print([{ cls: 't-prompt', text: '➜' }, { cls: 't-cmd', text: ` ~/claudio ${text}` }]);
    if (text) {
      const [word, ...args] = text.split(/\s+/);
      const name = word.toLowerCase();
      const result = cmds[name] ? cmds[name].run(args) : (secret(name, args) ?? [output('t-err', fill(t('sh.unknown'), { cmd: word }))]);
      if (result === null) log.textContent = '';
      else result.forEach(print);
    }
    scrollDown();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (text.trim()) { history.push(text); cursor = history.length; }
    input.value = '';
    run(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      cursor = Math.min(Math.max(cursor + (e.key === 'ArrowUp' ? -1 : 1), 0), history.length);
      input.value = history[cursor] ?? '';
    } else if (e.key === 'Tab' && input.value && !input.value.includes(' ')) {
      const matches = Object.keys(cmds).filter((name) => name.startsWith(input.value.toLowerCase()));
      if (matches.length === 1) { e.preventDefault(); input.value = `${matches[0]} `; }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      log.textContent = '';
    }
  });

  // Un clic dans le terminal donne le focus à l'invite (souris seulement : au doigt, le clavier s'ouvrirait)
  if (window.matchMedia('(pointer: fine)').matches) {
    body.addEventListener('click', () => {
      if (!window.getSelection().toString()) input.focus({ preventScroll: true });
    });
  }

  CHIPS.forEach((name) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'term-chip';
    chip.textContent = name;
    chip.addEventListener('click', () => run(name));
    chips.appendChild(chip);
  });

  return {
    // Invite et suggestions occupent leur place depuis le début (visibility) : rien ne bouge à leur apparition
    reveal() { terminal?.classList.add('is-ready'); },
  };
}
