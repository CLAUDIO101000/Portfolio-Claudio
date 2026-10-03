// CV en PDF adapté aux ATS : une colonne, texte noir sur blanc, aucune image, une ligne
// visuelle = un appel doc.text() pour un ordre de lecture fidèle.

import { getCV } from './data.js';

export function buildCVDocument(jsPDF, lang) {
  const CV = getCV(lang);
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setLanguage(CV.lang);
  doc.setProperties({
    title: `${CV.documentTitle} - ${CV.name} - ${CV.title}`,
    subject: CV.subject,
    author: CV.name,
    keywords: CV.keywords,
    creator: 'Portfolio de Claudio Ranaivoson',
  });

  const AMBER = [180, 111, 0], DARK = [17, 17, 19], TEXT = [40, 40, 45], MUTED = [90, 90, 98];
  const M = 15, W = 210, right = W - M, contentW = W - 2 * M, bottom = 297 - 18;
  const SEP = '  |  ';
  let y = 0;

  const font = (size, style = 'normal', color = TEXT) => {
    doc.setFont('helvetica', style); doc.setFontSize(size); doc.setTextColor(...color);
  };
  const rule = (ry, width) => {
    doc.setDrawColor(...AMBER); doc.setLineWidth(width);
    doc.line(M, ry, right, ry);
  };
  const checkPage = (h) => { if (y + h > bottom) { doc.addPage(); y = 20; } };

  const line = (txt, { size = 9, style = 'normal', color = TEXT, lh = 4.4 } = {}) => {
    font(size, style, color);
    doc.splitTextToSize(txt, contentW).forEach((l) => { checkPage(lh + 1); doc.text(l, M, y); y += lh; });
  };
  const heading = (txt) => line(txt, { size: 9.5, style: 'bold', color: DARK });
  const meta = (parts, lh) => line(parts.join(SEP), { color: MUTED, lh });

  // Réserve la place du titre et de deux lignes : jamais de titre orphelin en bas de page
  const sectionTitle = (title) => {
    checkPage(26);
    y += 3;
    font(11, 'bold', DARK);
    doc.text(title.toUpperCase(), M, y);
    rule(y + 1.8, 0.5);
    y += 7;
  };

  const bullet = (txt) => {
    font(9);
    const prefix = '•  ';
    const indent = doc.getTextWidth(prefix);
    doc.splitTextToSize(txt, contentW - indent).forEach((l, i) => {
      checkPage(5);
      doc.text(i === 0 ? prefix + l : l, i === 0 ? M : M + indent, y);
      y += 4.3;
    });
  };

  font(20, 'bold', DARK);
  doc.text(CV.name, M, 20);
  font(11.5, 'normal', MUTED);
  doc.text(CV.title, M, 27);

  // Ligne de contact tracée d'un bloc, liens posés par-dessus en annotations
  const contactLine = (parts, ly) => {
    font(9);
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

  rule(44, 0.8);
  y = 54;

  sectionTitle(CV.titles.profile);
  line(CV.profil);

  sectionTitle(CV.titles.experience);
  CV.experiences.forEach((exp) => {
    checkPage(18);
    line(exp.role, { size: 10.5, style: 'bold', color: DARK, lh: 4.8 });
    meta([`${exp.company}, ${exp.place}`, exp.date, exp.contract], 5);
    exp.tasks.forEach(bullet);
    y += 3;
  });

  sectionTitle(CV.titles.skills);
  CV.competences.forEach(([cat, val]) => {
    checkPage(6);
    line(`${cat} : ${val}`);
    y += 0.8;
  });

  sectionTitle(CV.titles.projects);
  CV.projets.forEach((p) => {
    checkPage(20);
    heading(p.name);
    line(p.stack, { size: 8.5, color: MUTED });
    line(p.desc);
    checkPage(5);
    font(8.5, 'normal', AMBER);
    const url = CV.projectUrls[p.name];
    doc.textWithLink(url, M, y, { url });
    y += 6;
  });

  sectionTitle(CV.titles.education);
  CV.formation.forEach(([diploma, school, date]) => {
    checkPage(12);
    heading(diploma);
    meta([school, date], 5.5);
  });

  sectionTitle(CV.titles.certifications);
  CV.certifications.forEach((c) => {
    checkPage(18);
    heading(c.name);
    meta([c.org, c.date], 5);
    line(c.detail);
    y += 2;
  });

  [
    [CV.titles.languages, CV.langues],
    [CV.titles.extra, CV.permis],
    [CV.titles.interests, CV.interets],
  ].forEach(([title, value]) => {
    sectionTitle(title);
    line(value);
  });

  const pages = doc.getNumberOfPages();
  if (pages > 1) {
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      font(8, 'normal', MUTED);
      doc.text(`Page ${i} / ${pages}`, right, 289, { align: 'right' });
    }
  }

  return doc;
}

// Chargement anticipé de la librairie (survol, toucher ou focus d'un bouton CV) : le clic n'attend plus le réseau.
export const preloadPdfLibrary = () => import('jspdf');

// jsPDF (~400 ko) n'est chargé qu'au clic (ou juste avant, voir plus haut) ; rejette si la librairie est injoignable (hors ligne).
// Le CV est produit dans la langue du site (« fr » ou « en »).
export async function generateCV(lang = 'fr') {
  const { jsPDF } = await import('jspdf');
  buildCVDocument(jsPDF, lang).save(getCV(lang).fileName);
}
