// Contenu du CV PDF. À tenir à jour avec la section Expérience de index.html.
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
      role: 'Développeur Odoo',
      company: 'Groupe Viseo',
      place: 'Andraharo, Antananarivo, Madagascar',
      date: 'Juillet 2025 - Juin 2027',
      contract: 'CDD de 2 ans',
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
  certifications: [
    {
      name: 'Prescriptive Analytics - Training Program (24 sessions) et Data and Artificial Intelligence Project Framework (7 sessions)',
      org: 'ClearMind-Analytics, Andraharo, Antananarivo',
      date: 'Août 2025 - Novembre 2025',
      detail: `Formation suivie pour le Groupe Viseo : aide à la décision, optimisation, cadrage et conduite de projets data et intelligence artificielle. Certificat délivré le 21 novembre 2025.`,
    },
  ],
  langues: 'Malgache (langue maternelle), Français (courant), Anglais (technique)',
  permis: 'Permis de conduire, catégorie B',
  interets: 'Lecture, cuisine, jeux vidéo',
};
