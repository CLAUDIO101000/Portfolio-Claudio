// Contenu du CV PDF, dans chaque langue du site (le fichier suit la langue active).
// À tenir à jour avec la section Expérience de index.html.

// Identique dans toutes les langues
const COMMON = {
  name: 'RANAIVOSON Nantenaina Claudio',
  location: 'Antananarivo, Madagascar',
  email: 'ranaivosonclaudio@gmail.com',
  phone: '+261 32 43 372 46',
  github: 'github.com/CLAUDIO101000',
  linkedin: 'linkedin.com/in/claudio-ranaivoson-8145aa341',
  // Par nom de projet (les noms propres ne se traduisent pas)
  projectUrls: {
    CongeSystem: 'https://github.com/CLAUDIO101000/CongeSystem',
    Chatroom: 'https://chatroom-silk.vercel.app',
  },
};

const fr = {
  lang: 'fr',
  fileName: 'CV_RANAIVOSON_Nantenaina_Claudio_Developpeur_Odoo.pdf',
  documentTitle: 'CV',
  subject: 'Curriculum Vitae',
  keywords: 'Odoo, Python, QWeb, PostgreSQL, JavaScript, TypeScript, React, Django, Laravel, Node.js, PHP, SQL, Git, Linux, Prescriptive Analytics, Data, Intelligence Artificielle, Madagascar',
  title: 'Développeur Web & Odoo',
  titles: {
    profile: 'Profil',
    experience: 'Expérience professionnelle',
    skills: 'Compétences',
    projects: 'Projets',
    education: 'Formation',
    certifications: 'Certifications',
    languages: 'Langues',
    extra: 'Informations complémentaires',
    interests: `Centres d'intérêt`,
  },
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
    },
    {
      name: 'Chatroom',
      stack: 'Node.js, Socket.io, Express',
      desc: `Chat temps réel avec pseudonymes, avatars et partage d'images, déployé sur Vercel.`,
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

const en = {
  lang: 'en-US',
  fileName: 'Resume_RANAIVOSON_Nantenaina_Claudio_Odoo_Developer.pdf',
  documentTitle: 'Resume',
  subject: 'Resume',
  keywords: 'Odoo, Python, QWeb, PostgreSQL, JavaScript, TypeScript, React, Django, Laravel, Node.js, PHP, SQL, Git, Linux, Prescriptive Analytics, Data, Artificial Intelligence, Madagascar',
  title: 'Web & Odoo Developer',
  titles: {
    profile: 'Profile',
    experience: 'Professional experience',
    skills: 'Skills',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    extra: 'Additional information',
    interests: 'Interests',
  },
  profil: `Odoo-focused developer (Python, QWeb, PostgreSQL) with over a year of professional experience on business-management modules running in multi-company production. Comfortable from the database to the interface, I favour robust, performant and maintainable code. Available for local or remote assignments.`,
  competences: [
    ['Languages', 'Python, PHP, JavaScript, TypeScript, SQL, HTML, CSS, R'],
    ['Odoo', 'Module development, ORM, QWeb (views and reports), wizards, scheduled jobs, security'],
    ['Frameworks', 'React, Django, Laravel, Node.js, Express, Socket.io, Bootstrap 5'],
    ['Databases', 'PostgreSQL (query optimisation), MySQL, SQLite'],
    ['Tools', 'Git, GitHub, Linux, Figma, SASS, npm, Vite'],
    ['Mobile and Data', 'Flutter, Machine Learning, Data Mining'],
  ],
  experiences: [
    {
      role: 'Odoo Developer',
      company: 'Groupe Viseo',
      place: 'Andraharo, Antananarivo, Madagascar',
      date: 'July 2025 - June 2027',
      contract: '2-year fixed-term contract',
      tasks: [
        `Building and maintaining a multi-company analytic accounting module in production (Python, XML, QWeb, PostgreSQL)`,
        `Performance tuning: batch processing, targeted SQL queries and caching, significantly cutting report computation times`,
        `Automated synchronisation of accounting entries (scheduled jobs, handling of time zones and concurrency)`,
        `Interactive reporting dashboards (JavaScript widgets, collapsible hierarchy) used daily by finance teams`,
        `Refactoring, bug fixing and code reviews`,
      ],
    },
    {
      role: 'Odoo Developer Intern',
      company: 'Groupe Viseo',
      place: 'Andraharo, Antananarivo, Madagascar',
      date: 'February 2025 - May 2025',
      contract: 'Final-year bachelor internship',
      tasks: [
        `Learning the Odoo architecture (ORM, models, views, module inheritance)`,
        `Building features on existing modules and customising interfaces`,
        `Writing QWeb reports for the business needs of the group's clients`,
        `Taking part in code reviews and team meetings`,
      ],
    },
  ],
  projets: [
    {
      name: 'CongeSystem',
      stack: 'PHP, MySQL, Bootstrap 5',
      desc: `Leave management application: request submission, balance tracking, automatic calculation excluding public holidays and weekends, admin interface for approvals.`,
    },
    {
      name: 'Chatroom',
      stack: 'Node.js, Socket.io, Express',
      desc: `Real-time chat with nicknames, avatars and image sharing, deployed on Vercel.`,
    },
  ],
  formation: [
    [`Master's - Software Engineering`, 'IS-INFO, Antananarivo', '2025 - Present'],
    [`Professional Bachelor's in Information Systems Management`, 'IS-INFO, Antananarivo', '2022 - 2025'],
    ['Baccalaureate, science stream (série C)', 'Institution Sainte Famille (La Salle), Antananarivo', '2020 - 2021'],
  ],
  certifications: [
    {
      name: 'Prescriptive Analytics - Training Program (24 sessions) and Data and Artificial Intelligence Project Framework (7 sessions)',
      org: 'ClearMind-Analytics, Andraharo, Antananarivo',
      date: 'August 2025 - November 2025',
      detail: `Training completed for Groupe Viseo: decision support, optimisation, scoping and management of data and artificial intelligence projects. Certificate issued on 21 November 2025.`,
    },
  ],
  langues: 'Malagasy (native), French (fluent), English (technical)',
  permis: 'Driving licence, category B',
  interets: 'Reading, cooking, video games',
};

const BY_LANG = { fr, en };

/** CV dans la langue demandée (repli : français). */
export const getCV = (lang) => ({ ...COMMON, ...(BY_LANG[lang] ?? fr) });
