import { generateCV } from './cv.js';
import { t, onLangChange, initI18n } from './i18n.js';
import { initLightbox } from './lightbox.js';

// Traduit le DOM avant toute autre initialisation, pour que les modules qui
// lisent des textes (typed, terminal) partent déjà de la bonne langue.
initI18n();

// ── Cursor (uniquement sur les appareils avec souris — sur tactile, le CSS le masque)
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursor && ring && finePointer) {
  // Le CSS ne masque le curseur natif que si cette classe est posée : si le
  // script échoue, l'utilisateur garde un curseur.
  document.documentElement.classList.add('has-custom-cursor');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function loop(){
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  // Délégation : couvre aussi les éléments ajoutés après coup (toasts, etc.)
  const root = document.documentElement;
  document.addEventListener('mouseover', e => {
    root.classList.toggle('cursor-hover', !!e.target.closest('a,button,.skill-pill'));
  });
}

// ── Barre de progression de lecture (sous la nav)
const navProgressEl = document.querySelector('nav');
const setProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  navProgressEl?.style.setProperty('--progress', max > 0 ? (scrollY / max).toFixed(4) : 0);
};

// ── Lien de nav actif : la section courante est la dernière dont le haut a
// franchi le tiers supérieur du viewport. Un IntersectionObserver donnerait un
// résultat instable ici — les sections n'ont ni la même hauteur ni le même
// rythme, et deux d'entre elles sont souvent visibles en même temps.
const navTargets = [...document.querySelectorAll('.nav-links a[href^="#"]')]
  .map(a => ({ a, el: document.querySelector(a.getAttribute('href')) }))
  .filter(x => x.el);

const setActiveLink = () => {
  const line = scrollY + innerHeight / 3;
  let current = null;
  for (const x of navTargets) {
    if (x.el.getBoundingClientRect().top + scrollY <= line) current = x;
  }
  // En bout de page, la dernière section garde la main même si elle est courte
  if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) {
    current = navTargets.at(-1) ?? null;
  }
  navTargets.forEach(x => x.a.classList.toggle('is-active', x === current));
};

const onScroll = () => { setProgress(); setActiveLink(); };
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll, { passive: true });
onScroll();

// ── Heure locale d'Antananarivo (EAT, UTC+3)
const timeEl = document.getElementById('local-time');
if (timeEl) {
  const fmt = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Indian/Antananarivo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const tick = () => { timeEl.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 1000);
}

// ── Menu burger (mobile)
const burger = document.getElementById('nav-burger');
const navEl  = document.querySelector('nav');
if (burger && navEl) {
  burger.addEventListener('click', () => {
    const open = navEl.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  // Ferme le menu quand on clique sur un lien
  navEl.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navEl.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Année dynamique du footer
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Typed text — les phrases suivent la langue active
let phrases = [];
let pi=0,ci=0,del=false;
onLangChange(() => {
  phrases = t('hero.typed');
  pi = 0; ci = 0; del = false;
  const el = document.getElementById('typed-text');
  if (el) el.textContent = '';
});
function typeLoop(){
  const el=document.getElementById('typed-text');
  if(!el) return;
  const phrase=phrases[pi % phrases.length] || '';
  if(!del){
    el.textContent=phrase.slice(0,++ci);
    if(ci>=phrase.length){del=true;setTimeout(typeLoop,1800);return;}
  } else {
    el.textContent=phrase.slice(0,--ci);
    if(ci<=0){ci=0;del=false;pi=(pi+1)%phrases.length;setTimeout(typeLoop,400);return;}
  }
  setTimeout(typeLoop,del?45:75);
}
typeLoop();

// ── Bento glow
document.querySelectorAll('.bento-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
  });
});

// ── Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*80);
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ── Terminal — reconstruit à chaque changement de langue
const tb=document.getElementById('term-body');
let started=false;

function terminalLines(){
  return [
    [{cls:'t-prompt',t:'➜'},{cls:'t-cmd',t:' ~/claudio whoami'}],
    [{cls:'t-amber',t:t('term.whoami')}],
    [{cls:'t-prompt',t:'➜'},{cls:'t-cmd',t:' ~/claudio cat languages.txt'}],
    [{cls:'t-blue',t:'Python  '},{cls:'t-out',t:'●●●●●●●●●○  90%'}],
    [{cls:'t-blue',t:'PHP     '},{cls:'t-out',t:'●●●●●●●●○○  80%'}],
    [{cls:'t-blue',t:'JS/TS   '},{cls:'t-out',t:'●●●●●●●●○○  80%'}],
    [{cls:'t-prompt',t:'➜'},{cls:'t-cmd',t:' ~/claudio cat frameworks.txt'}],
    [{cls:'t-purple',t:'React    '},{cls:'t-out',t:'Django   Laravel   Node.js   Bootstrap'}],
    [{cls:'t-purple',t:'Express  '},{cls:'t-out',t:'Socket.io   jQuery   Odoo OWL'}],
    [{cls:'t-prompt',t:'➜'},{cls:'t-cmd',t:' ~/claudio odoo-bin --version'}],
    [{cls:'t-green',t:t('term.odoo')}],
    [{cls:'t-prompt',t:'➜'},{cls:'t-cmd',t:' ~/claudio cat tools.txt'}],
    [{cls:'t-out',t:'Git · GitHub · Linux · Figma · SASS · npm · PostgreSQL'}],
    [{cls:'t-prompt',t:'➜'},{cls:'t-cmd',t:' ~/claudio echo $STATUS'}],
    [{cls:'t-amber',t:t('term.status')+' ■'}],
  ];
}

function renderTerminal(animate){
  if(!tb) return;
  tb.textContent='';
  terminalLines().forEach((parts,i)=>{
    const d=document.createElement('div'); d.className='t-line';
    parts.forEach(p=>{const s=document.createElement('span');s.className=p.cls;s.textContent=p.t;d.appendChild(s);});
    tb.appendChild(d);
    if(animate) setTimeout(()=>d.classList.add('visible'),i*110);
    else d.classList.add('visible');
  });
}

if(tb) {
    new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!started){
        started=true;
        renderTerminal(true);
      }
    },{threshold:.3}).observe(document.querySelector('.terminal'));
}

// Le terminal n'est redessiné que s'il a déjà été joué : sinon on laisse
// l'animation se déclencher au scroll, dans la nouvelle langue.
onLangChange(() => { if (started) renderTerminal(false); });

// ── Anti-spam
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const hp = this.querySelector('input[name="_gotcha"]');
      if (hp && hp.value !== '') { e.preventDefault(); return false; }
      const emailVal = this.querySelector('input[name="email"]').value;
      let replyTo = this.querySelector('input[name="_replyto"]');
      if (!replyTo) {
        replyTo = document.createElement('input');
        replyTo.type = 'hidden'; replyTo.name = '_replyto';
        this.appendChild(replyTo);
      }
      replyTo.value = emailVal;
    });
}

setInterval(()=>{
  if(!tb) return;
  const last=[...tb.querySelectorAll('.t-amber')].pop();
  if(last){const txt=last.textContent;last.textContent=txt.endsWith('■')?txt.slice(0,-1)+'▮':txt.slice(0,-1)+'■';}
},600);

const cvBtn = document.getElementById('cv-download');
if (cvBtn) { cvBtn.addEventListener('click', generateCV); }

// ── Visionneuse du certificat
initLightbox();
