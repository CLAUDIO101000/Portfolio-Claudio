// Une ligne de terminal = liste de segments colorés { cls, text }
export const prompt = (command) => [{ cls: 't-prompt', text: '➜' }, { cls: 't-cmd', text: ` ~/claudio ${command}` }];
export const output = (cls, text) => [{ cls, text }];
export const row = (cls, label, width, value) => [{ cls, text: label.padEnd(width) }, { cls: 't-out', text: value }];
const level = (percent) => `${'●'.repeat(percent / 10)}${'○'.repeat(10 - percent / 10)}  ${percent}%`;

export const languages = () => [
  row('t-blue', 'Python', 8, level(90)),
  row('t-blue', 'PHP', 8, level(80)),
  row('t-blue', 'JS/TS', 8, level(80)),
];
export const frameworks = () => [
  row('t-purple', 'React', 9, 'Django   Laravel   Node.js   Bootstrap'),
  row('t-purple', 'Express', 9, 'Socket.io   jQuery   Odoo OWL'),
];
export const tools = () => [output('t-out', 'Git · GitHub · Linux · Figma · SASS · npm · PostgreSQL')];

export function lineElement(segments) {
  const line = document.createElement('div');
  line.className = 't-line';
  segments.forEach(({ cls, text }) => {
    const span = document.createElement('span');
    span.className = cls;
    span.textContent = text;
    line.appendChild(span);
  });
  return line;
}
