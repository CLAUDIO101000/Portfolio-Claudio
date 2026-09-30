import { createContourRenderer, seedFrom } from '../utils/contours.js';
import { onFirstVisible } from '../utils/on-first-visible.js';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// Coordonnées géographiques et altitude du point survolé, affichées dans l'en-tête du hero
function createAltimeter(canvas, renderer, pointer) {
  const lat = document.getElementById('coord-lat');
  const lon = document.getElementById('coord-lon');
  const alt = document.getElementById('coord-alt');
  const altValue = document.getElementById('coord-alt-value');
  if (!lat || !lon || !alt || !altValue) return { update() {}, reset() {} };

  const home = { lat: lat.textContent, lon: lon.textContent };
  const dms = (deg, positive, negative) => {
    const a = Math.abs(deg);
    const m = (a - Math.floor(a)) * 60;
    const pad = (n) => String(Math.floor(n)).padStart(2, '0');
    return `${Math.floor(a)}°${pad(m)}′${pad((m - Math.floor(m)) * 60)}″${deg >= 0 ? positive : negative}`;
  };

  return {
    // L'écran représente une fenêtre d'environ 5 km autour d'Antananarivo (18°52′S, 47°30′E)
    update() {
      const { width, height } = canvas.getBoundingClientRect();
      const latitude = 18.8667 + (pointer.ty / height - 0.5) * 0.05;
      const longitude = 47.5 + (pointer.tx / width - 0.5) * 0.07;
      const meters = Math.max(900, Math.round((1250 + renderer.elevationAt(pointer.tx, pointer.ty, pointer) * 900) / 10) * 10);

      lat.textContent = dms(-latitude, 'N', 'S');
      lon.textContent = dms(longitude, 'E', 'W');
      altValue.textContent = `${meters.toLocaleString(document.documentElement.lang)} m`;
      alt.hidden = false;
    },
    reset() {
      lat.textContent = home.lat;
      lon.textContent = home.lon;
      alt.hidden = true;
    },
  };
}

// Terrain vivant du hero : courbes qui évoluent et se creusent sous le curseur.
// Le SVG statique du HTML sert de repli.
function initHeroTerrain() {
  const hero = document.getElementById('hero');
  const canvas = hero?.querySelector('.hero-topo-canvas');
  if (!hero || !canvas || !canvas.getContext) return;

  const reduceMotion = window.matchMedia(REDUCED_MOTION);
  const narrow = window.matchMedia('(max-width: 768px)').matches;

  const renderer = createContourRenderer(canvas, {
    seed: 7,
    cell: 12,
    noiseScale: narrow ? 210 : 300,
    noiseAmp: 0.7,
    // Sommet derrière le portrait et petite butte en bas à gauche
    peaks: narrow
      ? [{ x: 0.78, y: 0.16, r: 0.5, a: 0.9 }]
      : [{ x: 0.76, y: 0.46, r: 0.42, a: 1 }, { x: 0.06, y: 0.88, r: 0.22, a: 0.55 }],
  });
  if (!renderer.resize()) return;

  // Pointeur lissé pour un relief sans saccade
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };
  const altimeter = createAltimeter(canvas, renderer, pointer);
  const start = performance.now();
  let frame = null;
  let last = 0;
  let slowFrames = 0;
  let inView = true;

  const draw = (now) => {
    pointer.x += (pointer.tx - pointer.x) * 0.14;
    pointer.y += (pointer.ty - pointer.y) * 0.14;
    pointer.strength += (pointer.target - pointer.strength) * 0.08;
    renderer.draw((now - start) / 1000 * 0.05, pointer);
  };

  const loop = (now) => {
    frame = requestAnimationFrame(loop);
    if (now - last < 33) return; // ~30 i/s suffisent pour une dérive aussi lente
    last = now;
    draw(now);

    // Appareil lent : grille plus grossière plutôt qu'une animation qui saccade
    // (plusieurs images lentes d'affilée, pour ignorer le démarrage à froid du moteur JS)
    slowFrames = renderer.lastDuration > 14 ? slowFrames + 1 : 0;
    if (slowFrames >= 8) {
      renderer.coarser();
      slowFrames = 0;
    }
  };

  const play = () => { if (frame === null && inView && !document.hidden && !reduceMotion.matches) frame = requestAnimationFrame(loop); };
  const pause = () => { if (frame !== null) cancelAnimationFrame(frame); frame = null; };

  draw(performance.now());
  canvas.classList.add('is-ready');
  hero.classList.add('has-terrain');

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) play(); else pause();
  }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
  reduceMotion.addEventListener('change', () => (reduceMotion.matches ? pause() : play()));

  new ResizeObserver(() => {
    if (renderer.resize()) draw(performance.now());
  }).observe(canvas);

  // Souris et stylet seulement : pas de pointeur « posé » au doigt
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || reduceMotion.matches) return;
    const rect = canvas.getBoundingClientRect();
    pointer.tx = e.clientX - rect.left;
    pointer.ty = e.clientY - rect.top;
    if (pointer.target === 0) { pointer.x = pointer.tx; pointer.y = pointer.ty; }
    pointer.target = 1;
    altimeter.update();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    pointer.target = 0;
    altimeter.reset();
  });

  play();
}

// Une carte par projet (graine = son nom), animée au survol ou au focus clavier.
function initProjectArt() {
  const canvases = [...document.querySelectorAll('.project-art')];
  if (!canvases.length) return;
  const reduceMotion = window.matchMedia(REDUCED_MOTION);

  onFirstVisible(canvases, (canvas) => {
    const seed = seedFrom(canvas.dataset.seed || 'projet');
    const r = (n) => ((seed >>> n) & 255) / 255; // quelques nombres stables dérivés de la graine

    const renderer = createContourRenderer(canvas, {
      seed,
      cell: 9,
      step: 0.09,
      noiseScale: 150,
      noiseAmp: 0.65,
      hotLevel: 0.85,
      peaks: [
        { x: 0.55 + r(0) * 0.4, y: 0.25 + r(8) * 0.5, r: 0.5 + r(16) * 0.3, a: 0.9 },
        { x: 0.05 + r(4) * 0.3, y: 0.3 + r(12) * 0.6, r: 0.3 + r(20) * 0.2, a: 0.5 },
      ],
    });
    if (!renderer.resize()) return;

    const offset = r(24) * 40; // chaque projet part d'un point différent du terrain
    renderer.draw(offset);
    canvas.classList.add('is-ready');
    new ResizeObserver(() => { if (renderer.resize()) renderer.draw(offset); }).observe(canvas);

    if (reduceMotion.matches) return;
    const card = canvas.closest('.project-card');
    let frame = null;
    let clock = 0;
    let previous = 0;

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      clock += Math.min(now - previous, 50) / 1000;
      previous = now;
      renderer.draw(offset + clock * 0.35);
    };
    const play = () => { if (frame === null) { previous = performance.now(); frame = requestAnimationFrame(tick); } };
    const pause = () => { if (frame !== null) cancelAnimationFrame(frame); frame = null; };

    // Au doigt, pas de « pointerleave » fiable : souris seulement
    card.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') play(); });
    card.addEventListener('pointerleave', pause);
    card.addEventListener('focusin', play);
    card.addEventListener('focusout', pause);
  }, { threshold: 0.05 });
}

export function initTopo() {
  initHeroTerrain();
  initProjectArt();
}
