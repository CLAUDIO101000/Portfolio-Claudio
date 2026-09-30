// Courbes de niveau générées : terrain (bruit de valeur + reliefs gaussiens) échantillonné
// sur une grille, lignes d'altitude tracées par « marching squares » sur un <canvas>.
// Sert au hero et aux cartes projets. Aucune dépendance.

function hash(ix, iy, seed) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const smooth = (t) => t * t * (3 - 2 * t);

function noise2(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const u = smooth(x - ix), v = smooth(y - iy);
  const a = hash(ix, iy, seed), b = hash(ix + 1, iy, seed);
  const c = hash(ix, iy + 1, seed), d = hash(ix + 1, iy + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// Le terrain évolue dans le temps en fondant deux tranches de bruit voisines
function noise3(x, y, z, seed) {
  const zi = Math.floor(z);
  const t = smooth(z - zi);
  const lo = noise2(x, y, seed + zi * 131);
  return lo + (noise2(x, y, seed + (zi + 1) * 131) - lo) * t;
}

function fbm(x, y, z, seed) {
  return noise3(x, y, z, seed) * 0.55
    + noise3(x * 2.03 + 5.2, y * 2.03 + 1.3, z * 1.3, seed + 17) * 0.3
    + noise3(x * 4.1 + 9.7, y * 4.1 + 3.1, z * 1.7, seed + 31) * 0.15;
}

// Graine entière stable à partir d'un texte
export function seedFrom(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rgba(hex, alpha) {
  const n = parseInt(hex.trim().slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function readColors() {
  const css = getComputedStyle(document.documentElement);
  const get = (name) => css.getPropertyValue(name) || '#888888';
  return {
    minor: rgba(get('--border'), 0.6),
    major: rgba(get('--border-strong'), 0.55),
    hot: rgba(get('--accent-dim'), 0.95),
  };
}

// Un changement de thème repeint tous les canvas déjà dessinés
const renderers = new Set();
let watching = false;
function watchTheme() {
  if (watching) return;
  watching = true;
  new MutationObserver(() => renderers.forEach((r) => r.refreshColors()))
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

// Côtés reliés selon les coins au-dessus du niveau (tl=8, tr=4, br=2, bl=1) :
// a = haut, b = droite, c = bas, d = gauche
const SEGMENTS = [
  [], ['d', 'c'], ['c', 'b'], ['d', 'b'], ['a', 'b'], ['a', 'd', 'c', 'b'], ['a', 'c'], ['a', 'd'],
  ['a', 'd'], ['a', 'c'], ['a', 'b', 'd', 'c'], ['a', 'b'], ['d', 'b'], ['c', 'b'], ['d', 'c'], [],
];

// options : seed, cell (px de grille), step (écart d'altitude), noiseScale (px), noiseAmp,
// peaks [{x, y, r, a}] (position 0–1, rayon en part du petit côté, hauteur), hotLevel
// (altitude où les courbes passent à l'accent), pointerAmp, pointerRadius, maxDpr.
export function createContourRenderer(canvas, options) {
  const cfg = {
    cell: 12, step: 0.085, noiseScale: 280, noiseAmp: 0.8, peaks: [], hotLevel: 0.8,
    pointerAmp: 0.4, pointerRadius: 140, maxDpr: 1.5, ...options,
  };
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = 1, cols = 0, rows = 0, values = new Float32Array(0);
  let colors = readColors();
  let lastTime = 0, lastPointer = null, drawn = false;

  // Altitude du terrain en (x, y) px : bruit + sommets + colline sous le pointeur
  function heightAt(x, y, z, pointer) {
    let v = (fbm(x / cfg.noiseScale, y / cfg.noiseScale, z, cfg.seed) - 0.5) * 2 * cfg.noiseAmp;
    const minSide = Math.min(width, height);
    for (let p = 0; p < cfg.peaks.length; p++) {
      const pk = cfg.peaks[p];
      const dx = x - pk.x * width, dy = y - pk.y * height;
      const sigma = pk.r * minSide;
      v += pk.a * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
    }
    if (pointer && pointer.strength > 0.01) {
      const dx = x - pointer.x, dy = y - pointer.y;
      v += cfg.pointerAmp * pointer.strength * Math.exp(-(dx * dx + dy * dy) / (2 * cfg.pointerRadius * cfg.pointerRadius));
    }
    return v;
  }

  const api = {
    // Durée du dernier tracé (ms), pour adapter la finesse de la grille
    lastDuration: 0,

    // Altitude (unité du terrain) au point (x, y) px, au dernier instant dessiné
    elevationAt(x, y, pointer = null) {
      return heightAt(x, y, lastTime, pointer);
    },

    resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, cfg.maxDpr);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      cols = Math.ceil(width / cfg.cell) + 2;
      rows = Math.ceil(height / cfg.cell) + 2;
      values = new Float32Array(cols * rows);
      return true;
    },

    // Grille plus grossière : tracé moins coûteux sur un appareil lent
    coarser() {
      if (cfg.cell >= 26) return;
      cfg.cell += 3;
      api.resize();
      if (drawn) api.draw(lastTime, lastPointer);
    },

    refreshColors() {
      colors = readColors();
      if (drawn) api.draw(lastTime, lastPointer);
    },

    // time : secondes, fait évoluer le terrain ; pointer : { x, y, strength } en px du canvas
    draw(time, pointer = null) {
      if (!width) return;
      const start = performance.now();
      lastTime = time;
      lastPointer = pointer;
      drawn = true;

      const { cell, step, hotLevel } = cfg;

      // Altitude en chaque sommet de la grille
      for (let j = 0; j < rows; j++) {
        const y = (j - 1) * cell;
        for (let i = 0; i < cols; i++) values[j * cols + i] = heightAt((i - 1) * cell, y, time, pointer);
      }

      // Lignes de niveau : un seul tracé par catégorie
      const minor = new Path2D(), major = new Path2D(), hot = new Path2D();
      for (let j = 0; j < rows - 1; j++) {
        const y0 = (j - 1) * cell;
        for (let i = 0; i < cols - 1; i++) {
          const x0 = (i - 1) * cell;
          const tl = values[j * cols + i], tr = values[j * cols + i + 1];
          const bl = values[(j + 1) * cols + i], br = values[(j + 1) * cols + i + 1];
          const lo = Math.ceil(Math.min(tl, tr, bl, br) / step);
          const hi = Math.floor(Math.max(tl, tr, bl, br) / step);

          for (let k = lo; k <= hi; k++) {
            const level = k * step;
            const code = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
            const sides = SEGMENTS[code];
            if (!sides.length) continue;

            const path = level >= hotLevel ? hot : (((k % 5) + 5) % 5 === 0 ? major : minor);
            for (let s = 0; s < sides.length; s += 2) {
              const p1 = edge(sides[s], level, x0, y0, cell, tl, tr, bl, br);
              const p2 = edge(sides[s + 1], level, x0, y0, cell, tl, tr, bl, br);
              path.moveTo(p1[0], p1[1]);
              path.lineTo(p2[0], p2[1]);
            }
          }
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.minor; ctx.stroke(minor);
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = colors.major; ctx.stroke(major);
      ctx.strokeStyle = colors.hot; ctx.stroke(hot);

      api.lastDuration = performance.now() - start;
    },

    destroy() { renderers.delete(api); },
  };

  watchTheme();
  renderers.add(api);
  return api;
}

// Point d'un côté du carré où la courbe de niveau le traverse (interpolation linéaire)
function edge(side, level, x0, y0, cell, tl, tr, bl, br) {
  switch (side) {
    case 'a': return [x0 + cell * ((level - tl) / (tr - tl)), y0];
    case 'b': return [x0 + cell, y0 + cell * ((level - tr) / (br - tr))];
    case 'c': return [x0 + cell * ((level - bl) / (br - bl)), y0 + cell];
    default:  return [x0, y0 + cell * ((level - tl) / (bl - tl))];
  }
}
