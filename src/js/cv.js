// Génération du CV en PDF, optimisée pour la lecture par les ATS :
//  - une seule colonne, texte noir sur fond blanc, aucune zone de texte ni tableau
//  - chaque ligne visuelle = un seul appel doc.text() : l'ordre d'extraction du
//    texte correspond exactement à l'ordre de lecture humain
//  - titres de rubriques standards, police standard (Helvetica), ponctuation ASCII
//  - métadonnées et langue du document renseignées

import { t } from './i18n.js';

export const CV = {
  name: 'RANAIVOSON Nantenaina Claudio',
  title: 'Développeur Web & Odoo',
  location: 'Antananarivo, Madagascar',
  email: 'ranaivosonclaudio@gmail.com',
  phone: '+261 32 43 372 46',
  github: 'github.com/CLAUDIO101000',
  linkedin: 'linkedin.com/in/claudio-ranaivoson-8145aa341',
  profil: `Développeur spécialisé Odoo (Python, QWeb, PostgreSQL), avec plus d'un an d'expérience en entreprise sur des modules de gestion utilisés en production multi-sociétés. À l'aise de la base de données à l'interface, je privilégie un code robuste, performant et maintenable. Disponible pour des missions locales ou à distance.`,
  competences: [
    ['Langages', 'Python, PHP, JavaScript, TypeScript, SQL, HTML, CSS, R'],
    ['Odoo', 'Développement de modules, ORM, QWeb (vues et rapports), wizards, crons, sécurité'],
    ['Frameworks', 'React, Django, Laravel, Node.js, Express, Socket.io, Bootstrap 5'],
    ['Bases de données', 'PostgreSQL (optimisation de requêtes), MySQL, SQLite'],
    ['Outils', 'Git, GitHub, Linux, Figma, SASS, npm, Vite'],
    ['Mobile et Data', 'Flutter, Machine Learning, Data Mining'],
  ],
  experiences: [
    {
      role: 'Développeur Odoo Junior',
      company: 'Groupe Viseo',
      place: 'Andraharo, Antananarivo, Madagascar',
      date: 'Juillet 2025 - Juin 2026',
      contract: 'CDD',
      tasks: [
        `Développement et maintenance d'un module de comptabilité analytique multi-sociétés en production (Python, XML, QWeb, PostgreSQL)`,
        `Optimisation des performances : traitements par lots, requêtes SQL ciblées et mise en cache, réduisant nettement les temps de calcul des rapports`,
        `Mise en place d'une synchronisation automatisée des écritures comptables (tâches planifiées, gestion des fuseaux horaires et de la concurrence)`,
        `Conception de tableaux de reporting interactifs (widgets JavaScript, hiérarchie repliable) utilisés quotidiennement par les équipes finance`,
        `Refactoring, correction de bugs et participation aux revues de code`,
      ],
    },
    {
      role: 'Stagiaire Développeur Odoo',
      company: 'Groupe Viseo',
      place: 'Andraharo, Antananarivo, Madagascar',
      date: 'Février 2025 - Mai 2025',
      contract: 'Stage de fin de licence',
      tasks: [
        `Prise en main de l'architecture Odoo (ORM, modèles, vues, héritage de modules)`,
        `Développement de fonctionnalités sur des modules existants et personnalisation d'interfaces`,
        `Rédaction de rapports QWeb pour les besoins métier des clients du groupe`,
        `Participation aux revues de code et aux réunions d'équipe`,
      ],
    },
  ],
  projets: [
    {
      name: 'CongeSystem',
      stack: 'PHP, MySQL, Bootstrap 5',
      desc: `Application de gestion de congés : soumission de demandes, suivi de solde, calcul automatique excluant jours fériés et week-ends, interface administrateur de validation.`,
      url: 'https://github.com/CLAUDIO101000/CongeSystem',
    },
    {
      name: 'Chatroom',
      stack: 'Node.js, Socket.io, Express',
      desc: `Chat temps réel avec pseudonymes, avatars et partage d'images, déployé sur Vercel.`,
      url: 'https://chatroom-silk.vercel.app',
    },
  ],
  formation: [
    ['Master - Génie Logiciel', 'IS-INFO, Antananarivo', '2025 - Présent'],
    ['Licence Professionnelle en Informatique de Gestion', 'IS-INFO, Antananarivo', '2022 - 2025'],
    ['Baccalauréat série C', 'Institution Sainte Famille (La Salle), Antananarivo', '2020 - 2021'],
  ],
  langues: 'Malgache (langue maternelle), Français (courant), Anglais (technique)',
  permis: 'Permis de conduire, catégorie B',
  interets: 'Lecture, cuisine, jeux vidéo',
};

export function buildCVDocument(jsPDF, photo = null) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setLanguage('fr');
  doc.setProperties({
    title: `CV - ${CV.name} - ${CV.title}`,
    subject: 'Curriculum Vitae',
    author: CV.name,
    keywords: 'Odoo, Python, QWeb, PostgreSQL, JavaScript, TypeScript, React, Django, Laravel, Node.js, PHP, SQL, Git, Linux, Madagascar',
    creator: 'Portfolio de Claudio Ranaivoson',
  });

  const AMBER = [180, 111, 0], DARK = [17, 17, 19], TEXT = [40, 40, 45], MUTED = [90, 90, 98];
  const M = 15, W = 210, right = W - M, contentW = W - 2 * M, bottom = 297 - 18;
  let y = 0;

  const checkPage = (h) => { if (y + h > bottom) { doc.addPage(); y = 20; } };

  // Une ligne = un seul objet texte, pour que l'extraction ATS reste linéaire.
  const line = (txt, size, style, color, lh = 4.4) => {
    doc.setFont('helvetica', style); doc.setFontSize(size); doc.setTextColor(...color);
    doc.splitTextToSize(txt, contentW).forEach((l) => { checkPage(lh + 1); doc.text(l, M, y); y += lh; });
  };

  // Réserve le titre + ses deux premières lignes, pour ne jamais l'orpheliner en bas de page.
  const sectionTitle = (t) => {
    checkPage(26);
    y += 3;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...DARK);
    doc.text(t.toUpperCase(), M, y);
    doc.setDrawColor(...AMBER); doc.setLineWidth(0.5);
    doc.line(M, y + 1.8, right, y + 1.8);
    y += 7;
  };

  const bullet = (txt) => {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...TEXT);
    const prefix = '•  ';
    const indent = doc.getTextWidth(prefix);
    doc.splitTextToSize(txt, contentW - indent).forEach((l, i) => {
      checkPage(5);
      doc.text(i === 0 ? prefix + l : l, i === 0 ? M : M + indent, y);
      y += 4.3;
    });
  };

  // ── En-tête : pas de bandeau coloré, le nom est le premier texte du document.
  // La photo est posée à droite, en dehors de la colonne de texte.
  doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.setTextColor(...DARK);
  doc.text(CV.name, M, 20);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11.5); doc.setTextColor(...MUTED);
  doc.text(CV.title, M, 27);

  // Ligne de contact dessinée d'un bloc, les liens sont ajoutés par-dessus en annotations.
  const SEP = '  |  ';
  const contactLine = (parts, ly) => {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...TEXT);
    doc.text(parts.map((p) => p.t).join(SEP), M, ly);
    let x = M;
    parts.forEach((p) => {
      const w = doc.getTextWidth(p.t);
      if (p.url) doc.link(x, ly - 3, w, 4, { url: p.url });
      x += w + doc.getTextWidth(SEP);
    });
  };
  contactLine([
    { t: CV.location },
    { t: CV.email, url: `mailto:${CV.email}` },
    { t: CV.phone, url: `tel:${CV.phone.replace(/\s/g, '')}` },
  ], 34);
  contactLine([
    { t: CV.github, url: `https://${CV.github}` },
    { t: CV.linkedin, url: `https://${CV.linkedin}` },
  ], 39.5);

  if (photo) {
    const S = 28, px = right - S, py = 11;
    doc.addImage(photo, 'JPEG', px, py, S, S);
    doc.setDrawColor(...AMBER); doc.setLineWidth(0.5);
    doc.rect(px, py, S, S);
  }

  doc.setDrawColor(...AMBER); doc.setLineWidth(0.8);
  doc.line(M, 44, right, 44);
  y = 54;

  sectionTitle('Profil');
  line(CV.profil, 9, 'normal', TEXT);

  sectionTitle('Expérience professionnelle');
  CV.experiences.forEach((exp) => {
    checkPage(18);
    line(exp.role, 10.5, 'bold', DARK, 4.8);
    line(`${exp.company}, ${exp.place}  |  ${exp.date}  |  ${exp.contract}`, 9, 'normal', MUTED, 5);
    exp.tasks.forEach(bullet);
    y += 3;
  });

  sectionTitle('Compétences');
  CV.competences.forEach(([cat, val]) => {
    checkPage(6);
    line(`${cat} : ${val}`, 9, 'normal', TEXT);
    y += 0.8;
  });

  sectionTitle('Projets');
  CV.projets.forEach((p) => {
    checkPage(20);
    line(p.name, 9.5, 'bold', DARK);
    line(p.stack, 8.5, 'normal', MUTED);
    line(p.desc, 9, 'normal', TEXT);
    checkPage(5);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(...AMBER);
    doc.textWithLink(p.url, M, y, { url: p.url });
    y += 6;
  });

  sectionTitle('Formation');
  CV.formation.forEach(([diploma, school, date]) => {
    checkPage(12);
    line(diploma, 9.5, 'bold', DARK);
    line(`${school}  |  ${date}`, 9, 'normal', MUTED, 5.5);
  });

  sectionTitle('Langues');
  line(CV.langues, 9, 'normal', TEXT);

  sectionTitle('Informations complémentaires');
  line(CV.permis, 9, 'normal', TEXT);

  sectionTitle(`Centres d'intérêt`);
  line(CV.interets, 9, 'normal', TEXT);

  const pages = doc.getNumberOfPages();
  if (pages > 1) {
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...MUTED);
      doc.text(`Page ${i} / ${pages}`, right, 289, { align: 'right' });
    }
  }

  return doc;
}

// Reprend la photo affichée dans le portfolio et la recadre en carré.
// Renvoie null si elle est indisponible : le CV se génère alors sans photo.
function getPhotoDataURL() {
  return new Promise((resolve) => {
    const el = document.querySelector('.avatar-wrap img');
    if (!el || !el.getAttribute('src')) { resolve(null); return; }
    const img = new Image();
    img.onload = () => {
      try {
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const c = document.createElement('canvas');
        c.width = 360; c.height = 360;
        c.getContext('2d').drawImage(
          img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, 360, 360,
        );
        resolve(c.toDataURL('image/jpeg', 0.9));
      } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = el.src;
  });
}

// Charge jsPDF à la demande : la librairie n'est téléchargée qu'au clic.
async function loadJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  const mod = await import('jspdf');
  return mod.jsPDF;
}

export async function generateCV() {
  let jsPDF;
  try {
    jsPDF = await loadJsPDF();
  } catch (e) {
    alert(t('cv.error'));
    return;
  }
  const photo = await getPhotoDataURL();
  buildCVDocument(jsPDF, photo).save('CV_RANAIVOSON_Nantenaina_Claudio_Developpeur_Odoo.pdf');
}
