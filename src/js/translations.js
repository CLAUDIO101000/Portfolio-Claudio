// Dictionnaires FR / EN.
// Les clés correspondent aux attributs data-i18n / data-i18n-html /
// data-i18n-placeholder / data-i18n-aria-label posés dans index.html.
// Les valeurs de `fr` doivent rester identiques au HTML servi par défaut :
// c'est ce que voient les moteurs de recherche et les visiteurs sans JS.

export const LANGS = ['fr', 'en'];

// Libellés affichés dans la notification de bascule, chacun dans sa propre langue.
export const LANG_NAMES = { fr: 'Français', en: 'English' };

export const translations = {
  fr: {
    // ── Métadonnées du document
    'meta.title': 'Claudio · Développeur Web Freelance',
    'meta.description': "Portfolio de RANAIVOSON Nantenaina Claudio, développeur web passionné spécialisé en solutions numériques sur mesure — Odoo, Python, PHP, React.",
    'meta.ogTitle': 'Claudio · Développeur Web & Odoo',
    'meta.ogDescription': "Portfolio de RANAIVOSON Nantenaina Claudio — solutions numériques sur mesure : Odoo, Python, PHP, React. Disponible pour missions freelance.",
    'meta.ogLocale': 'fr_FR',

    // ── Navigation
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.education': 'Éducation',
    'nav.contact': 'Contact',
    'nav.status': 'Disponible pour missions',
    'nav.burger': 'Ouvrir le menu',

    // ── Hero
    'hero.tag': 'Développeur Web & Odoo — Freelance · Madagascar',
    'hero.subtitle': 'Donner vie à vos idées grâce à des solutions numériques sur mesure.',
    'hero.ctaProjects': 'Voir mes projets',
    'hero.ctaCv': 'Télécharger mon CV (PDF)',
    'hero.scroll': 'Défiler',
    'hero.localTime': 'Heure locale',
    'hero.badge': 'Disponible ✦ Freelance ✦ Antananarivo ✦',
    'hero.typed': [
      'Développeur Web',
      'Spécialiste Odoo',
      'Passionné par Python & Django',
      "Créateur d'apps temps réel",
      'Disponible pour vos projets',
    ],

    // ── À propos
    'about.label': '01 — À propos',
    'about.title': 'Passionné par la<br/><em class="title-accent">technologie.</em>',
    'about.p1': "Bonjour ! Je suis <strong>RANAIVOSON Nantenaina Claudio</strong>, développeur passionné basé à <span class=\"hl\">Madagascar</span>. Depuis que j'ai découvert la programmation, je suis fasciné par le pouvoir des solutions numériques pour résoudre des problèmes complexes.",
    'about.p2': "Mes compétences couvrent le développement <strong>web</strong> et les solutions <span class=\"hl\">Odoo</span>, avec des technologies comme Python, PHP, JavaScript, React, Django et bien d'autres. Mon objectif : créer des applications <strong>modernes, intuitives et robustes</strong>.",
    'about.quote': "\"En programmation, si quelqu'un vous dit 'vous compliquez trop les choses', il a soit 10 pas de retard, soit 10 pas d'avance sur vous.\" – Andrew Clark",
    'about.p3': "Cette citation guide mon approche : trouver l'équilibre parfait entre <strong>simplicité et innovation</strong>, toujours centré sur les besoins de l'utilisateur.",
    'about.stat1': "Années d'expérience",
    'about.stat2': 'Technologies maîtrisées',
    'about.stat3': 'Master Informatique (IS-INFO)',
    'about.stat4': 'Dédié à chaque projet',

    // ── Compétences
    'skills.label': '02 — Compétences',
    'skills.title': 'Ce que je maîtrise.',
    'skills.cat1': 'Langages de programmation',
    'skills.cat2': 'Frameworks & Bibliothèques',
    'skills.cat3': 'Développement Mobile & Embarqué',
    'skills.cat4': 'Bases de données',
    'skills.cat5': 'Outils & Environnement',
    'skills.cat6': 'IA & Data Mining',
    'skills.mobileApp': 'App Mobile',
    'skills.ml': 'Machine Learning',
    'skills.dm': 'Data Mining',

    // ── Services
    'services.label': '03 — Services',
    'services.title': 'Ce que je fais<br/>pour vous.',
    'services.c1.title': 'Développement Odoo',
    'services.c1.desc': "Création de modules Odoo personnalisés, extension des modules existants, personnalisation des vues et workflows. Spécialisé en Odoo avec maîtrise de l'ORM, QWeb et des patterns de développement avancés.",
    'services.c2.title': 'Développement Web',
    'services.c2.desc': "Applications web complètes de la base de données à l'interface utilisateur, avec React, Django, Laravel ou Node.js selon vos besoins.",
    'services.c3.title': 'Intégrations & API',
    'services.c3.desc': 'Connexion de vos systèmes à des services tiers via REST, JSON-RPC, webhooks. Automatisation des flux de données entre plateformes.',
    'services.c4.title': 'Automatisation Python',
    'services.c4.desc': "Scripts d'automatisation, tâches planifiées (cron), traitement de données en masse et outils CLI pour vos équipes métier.",
    'services.c5.title': 'Apps Temps Réel',
    'services.c5.desc': "Développement d'applications avec communication temps réel : chat, notifications live, tableaux de bord dynamiques via Socket.io.",
    'services.c6.title': 'Support & Maintenance',
    'services.c6.desc': 'Débogage, correction de bugs, refactoring, documentation technique et formation des équipes internes sur les outils développés.',
    'services.tagSupport': 'Support',
    'services.tagDoc': 'Documentation',

    // ── Stack technique
    'stack.label': '04 — Stack technique',
    'stack.title': 'Mon environnement<br/>de travail.',
    'stack.intro': 'Les langages, frameworks et outils qui rythment mon quotidien de développeur.',
    'term.whoami': 'ranaivoson_claudio · dev_web · Madagascar',
    'term.odoo': 'Odoo Server 13.0 — Module dev · QWeb · ORM avancé',
    'term.status': '✓ Disponible pour nouvelles missions',

    // ── Projets
    'projects.label': '05 — Projets',
    'projects.title': 'Mes réalisations.',
    'projects.p1.num': '01 — 2024 · Application Web',
    'projects.p1.desc': 'Application de gestion de congés permettant aux employés de soumettre des demandes et de suivre leur solde. Calcul intelligent excluant les jours fériés et weekends. Interface admin complète pour la validation des requêtes.',
    'projects.p2.num': '02 — 2024 · Application Temps Réel',
    'projects.p2.desc': "Application de chat temps réel avec gestion de pseudonyme, avatar optionnel et partage d'images. Architecture Node.js + Socket.io pour une communication instantanée et fluide entre utilisateurs. Déployée sur Vercel.",
    'projects.demo': 'Démo live',
    'projects.moreText': "D'autres dépôts, expérimentations et projets en cours sont publiés sur <strong>mon profil GitHub</strong>.",
    'projects.moreCta': 'Voir tous les dépôts',

    // ── Expérience
    'exp.label': '06 — Expérience professionnelle',
    'exp.title': 'Mes expériences<br/>en entreprise.',
    'exp.intro': 'Mon parcours au sein du Groupe Viseo, du stage de licence au poste de développeur Odoo.',
    'exp.place': 'Andraharo, Antananarivo · Madagascar',
    'exp.e1.badge': '● En poste',
    'exp.e1.contract': 'CDD · 1 an',
    'exp.e1.date': '1 Juil. 2025 — 30 juin. 2026',
    'exp.e1.role': 'Développeur Odoo Junior',
    'exp.e1.desc': "Intégré à l'équipe technique après mon stage, je participe activement au développement et à la maintenance des solutions Odoo pour les clients du groupe.",
    'exp.e1.t1': 'Développement de modules Odoo personnalisés (Python, XML, QWeb)',
    'exp.e1.t2': 'Extension et surcharge de modules existants selon les besoins métier',
    'exp.e1.t3': 'Conception de vues, wizards et rapports QWeb',
    'exp.e1.t4': "Collaboration avec les équipes fonctionnelles pour l'analyse des besoins",
    'exp.e1.t5': 'Corrections de bugs, refactoring et maintenance corrective',
    'exp.e2.badge': 'Stage · Licence',
    'exp.e2.date': '12 Fév. 2025 — 16 Mai 2025',
    'exp.e2.role': 'Stagiaire Développeur Odoo',
    'exp.e2.desc': "Stage de fin de licence réalisé au sein du département technique. Première immersion professionnelle dans l'écosystème Odoo en environnement d'entreprise.",
    'exp.e2.t1': "Découverte et prise en main de l'architecture Odoo (ORM, modèles, vues)",
    'exp.e2.t2': 'Développement de fonctionnalités sur des modules existants',
    'exp.e2.t3': "Rédaction de rapports QWeb et personnalisation d'interfaces",
    'exp.e2.t4': "Participation aux revues de code et réunions d'équipe",

    // ── Éducation
    'edu.label': '07 — Éducation',
    'edu.title': 'Mon parcours<br/>académique.',
    'edu.intro': 'De la Terminale C au Master en Génie Logiciel, complété par une certification en analytique prescriptive.',
    'edu.current': '⟳ En cours',
    'edu.done': '✓ Obtenu',
    'edu.d1.date': '2025 — Présent',
    'edu.d1.diploma': 'Master — Génie Logiciel',
    'edu.d2.diploma': 'Licence Professionnelle en Informatique de Gestion',
    'edu.d3.diploma': 'Baccalauréat série C',

    // ── Certification
    'cert.heading': 'Certification professionnelle',
    'cert.badge': '✓ Délivré',
    'cert.p1': 'Prescriptive Analytics — Training Program (24 sessions)',
    'cert.p2': 'Data and Artificial Intelligence Project Framework (7 sessions)',
    'cert.date': '19 août 2025 — 17 nov. 2025',
    'cert.place': 'Andraharo, Antananarivo — pour le Groupe Viseo',
    'cert.view': 'Voir le certificat',
    'cert.aria': 'Ouvrir le certificat ClearMind-Analytics en grand',
    'cert.lbTitle': 'Certificat — ClearMind-Analytics',
    'cert.download': 'Télécharger',
    'cert.close': 'Fermer la visionneuse',
    'cert.alt': "Certificat de fin de formation ClearMind-Analytics délivré à RANAIVOSON Nantenaina Claudio pour les programmes Prescriptive Analytics (24 sessions) et Data and Artificial Intelligence Project Framework (7 sessions), du 19 août au 17 novembre 2025.",

    // ── Contact
    'contact.label': '08 — Contact',
    'contact.big': 'Construisons quelque<br/>chose <em>ensemble.</em>',
    'contact.sub': 'Disponible pour des missions freelance locales et à distance.',
    'contact.phone': 'Téléphone',
    'contact.hp': 'Ne pas remplir',
    'contact.name': 'Nom',
    'contact.namePh': 'Votre nom',
    'contact.email': 'Email',
    'contact.emailPh': 'votreemail@exemple.com',
    'contact.message': 'Message',
    'contact.messagePh': 'Décrivez votre projet...',
    'contact.send': 'Envoyer le message',

    // ── Pied de page
    'footer.madeWith': 'Conçu avec',
    'footer.andPassion': 'et passion',

    // ── Notification de bascule de langue (rédigée dans la langue activée)
    'lang.toastTitle': 'Langue changée',
    'lang.toastText': 'Le site est maintenant en français.',

    // ── Divers
    'cv.error': "La librairie PDF n'a pas pu se charger. Vérifie ta connexion internet puis réessaie.",
  },

  en: {
    // ── Document metadata
    'meta.title': 'Claudio · Freelance Web Developer',
    'meta.description': 'Portfolio of RANAIVOSON Nantenaina Claudio, a passionate web developer specialised in tailor-made digital solutions — Odoo, Python, PHP, React.',
    'meta.ogTitle': 'Claudio · Web & Odoo Developer',
    'meta.ogDescription': 'Portfolio of RANAIVOSON Nantenaina Claudio — tailor-made digital solutions: Odoo, Python, PHP, React. Available for freelance work.',
    'meta.ogLocale': 'en_US',

    // ── Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.status': 'Available for work',
    'nav.burger': 'Open the menu',

    // ── Hero
    'hero.tag': 'Web & Odoo Developer — Freelance · Madagascar',
    'hero.subtitle': 'Bringing your ideas to life through tailor-made digital solutions.',
    'hero.ctaProjects': 'See my projects',
    'hero.ctaCv': 'Download my resume (PDF)',
    'hero.scroll': 'Scroll',
    'hero.localTime': 'Local time',
    'hero.badge': 'Available ✦ Freelance ✦ Antananarivo ✦',
    'hero.typed': [
      'Web Developer',
      'Odoo Specialist',
      'Driven by Python & Django',
      'Real-time app builder',
      'Available for your projects',
    ],

    // ── About
    'about.label': '01 — About',
    'about.title': 'Passionate about<br/><em class="title-accent">technology.</em>',
    'about.p1': 'Hi! I am <strong>RANAIVOSON Nantenaina Claudio</strong>, a passionate developer based in <span class="hl">Madagascar</span>. Ever since I discovered programming, I have been fascinated by the power of digital solutions to solve complex problems.',
    'about.p2': 'My skills span <strong>web</strong> development and <span class="hl">Odoo</span> solutions, with technologies such as Python, PHP, JavaScript, React, Django and many more. My goal: to build <strong>modern, intuitive and robust</strong> applications.',
    'about.quote': '"In programming, if someone tells you \'you\'re overcomplicating it,\' they\'re either 10 steps behind you or 10 steps ahead of you." – Andrew Clark',
    'about.p3': 'That quote guides my approach: finding the perfect balance between <strong>simplicity and innovation</strong>, always focused on the user\'s needs.',
    'about.stat1': 'Years of experience',
    'about.stat2': 'Technologies mastered',
    'about.stat3': "Master's in Computing (IS-INFO)",
    'about.stat4': 'Committed to every project',

    // ── Skills
    'skills.label': '02 — Skills',
    'skills.title': 'What I work with.',
    'skills.cat1': 'Programming languages',
    'skills.cat2': 'Frameworks & Libraries',
    'skills.cat3': 'Mobile & Embedded development',
    'skills.cat4': 'Databases',
    'skills.cat5': 'Tools & Environment',
    'skills.cat6': 'AI & Data Mining',
    'skills.mobileApp': 'Mobile App',
    'skills.ml': 'Machine Learning',
    'skills.dm': 'Data Mining',

    // ── Services
    'services.label': '03 — Services',
    'services.title': 'What I build<br/>for you.',
    'services.c1.title': 'Odoo development',
    'services.c1.desc': 'Building custom Odoo modules, extending existing ones, tailoring views and workflows. Specialised in Odoo with a solid command of the ORM, QWeb and advanced development patterns.',
    'services.c2.title': 'Web development',
    'services.c2.desc': 'End-to-end web applications, from the database to the user interface, with React, Django, Laravel or Node.js depending on your needs.',
    'services.c3.title': 'Integrations & APIs',
    'services.c3.desc': 'Connecting your systems to third-party services through REST, JSON-RPC and webhooks. Automating data flows across platforms.',
    'services.c4.title': 'Python automation',
    'services.c4.desc': 'Automation scripts, scheduled jobs (cron), bulk data processing and CLI tools for your business teams.',
    'services.c5.title': 'Real-time apps',
    'services.c5.desc': 'Applications built around real-time communication: chat, live notifications and dynamic dashboards powered by Socket.io.',
    'services.c6.title': 'Support & Maintenance',
    'services.c6.desc': 'Debugging, bug fixing, refactoring, technical documentation and training internal teams on the tools delivered.',
    'services.tagSupport': 'Support',
    'services.tagDoc': 'Documentation',

    // ── Tech stack
    'stack.label': '04 — Tech stack',
    'stack.title': 'My working<br/>environment.',
    'stack.intro': 'The languages, frameworks and tools that shape my day-to-day work as a developer.',
    'term.whoami': 'ranaivoson_claudio · web_dev · Madagascar',
    'term.odoo': 'Odoo Server 13.0 — Module dev · QWeb · advanced ORM',
    'term.status': '✓ Available for new projects',

    // ── Projects
    'projects.label': '05 — Projects',
    'projects.title': 'What I have built.',
    'projects.p1.num': '01 — 2024 · Web application',
    'projects.p1.desc': 'A leave management application that lets employees submit requests and track their balance. Smart calculation excluding public holidays and weekends. Full admin interface for approving requests.',
    'projects.p2.num': '02 — 2024 · Real-time application',
    'projects.p2.desc': 'A real-time chat application with nicknames, optional avatars and image sharing. Built on Node.js + Socket.io for instant, smooth communication between users. Deployed on Vercel.',
    'projects.demo': 'Live demo',
    'projects.moreText': 'More repositories, experiments and work in progress are published on <strong>my GitHub profile</strong>.',
    'projects.moreCta': 'Browse all repositories',

    // ── Experience
    'exp.label': '06 — Professional experience',
    'exp.title': 'My experience<br/>in the field.',
    'exp.intro': 'My journey at Groupe Viseo, from the bachelor internship to an Odoo developer role.',
    'exp.place': 'Andraharo, Antananarivo · Madagascar',
    'exp.e1.badge': '● Current role',
    'exp.e1.contract': 'Fixed-term · 1 year',
    'exp.e1.date': '1 Jul. 2025 — 30 Jun. 2026',
    'exp.e1.role': 'Junior Odoo Developer',
    'exp.e1.desc': 'Hired into the technical team after my internship, I actively contribute to building and maintaining Odoo solutions for the group\'s clients.',
    'exp.e1.t1': 'Building custom Odoo modules (Python, XML, QWeb)',
    'exp.e1.t2': 'Extending and overriding existing modules to fit business requirements',
    'exp.e1.t3': 'Designing views, wizards and QWeb reports',
    'exp.e1.t4': 'Working with functional teams to analyse requirements',
    'exp.e1.t5': 'Bug fixing, refactoring and corrective maintenance',
    'exp.e2.badge': 'Internship · Bachelor',
    'exp.e2.date': '12 Feb. 2025 — 16 May 2025',
    'exp.e2.role': 'Odoo Developer Intern',
    'exp.e2.desc': 'Final bachelor internship completed within the technical department. A first professional immersion in the Odoo ecosystem in a corporate setting.',
    'exp.e2.t1': 'Learning the Odoo architecture (ORM, models, views)',
    'exp.e2.t2': 'Developing features on existing modules',
    'exp.e2.t3': 'Writing QWeb reports and customising interfaces',
    'exp.e2.t4': 'Taking part in code reviews and team meetings',

    // ── Education
    'edu.label': '07 — Education',
    'edu.title': 'My academic<br/>background.',
    'edu.intro': "From the science baccalaureate to a Master's in Software Engineering, plus a certification in prescriptive analytics.",
    'edu.current': '⟳ In progress',
    'edu.done': '✓ Completed',
    'edu.d1.date': '2025 — Present',
    'edu.d1.diploma': "Master's — Software Engineering",
    'edu.d2.diploma': "Professional Bachelor's in Information Systems Management",
    'edu.d3.diploma': 'Baccalaureate, science stream (série C)',

    // ── Certification
    'cert.heading': 'Professional certification',
    'cert.badge': '✓ Awarded',
    'cert.p1': 'Prescriptive Analytics — Training Program (24 sessions)',
    'cert.p2': 'Data and Artificial Intelligence Project Framework (7 sessions)',
    'cert.date': '19 Aug 2025 — 17 Nov 2025',
    'cert.place': 'Andraharo, Antananarivo — delivered for Groupe Viseo',
    'cert.view': 'View the certificate',
    'cert.aria': 'Open the ClearMind-Analytics certificate full size',
    'cert.lbTitle': 'Certificate — ClearMind-Analytics',
    'cert.download': 'Download',
    'cert.close': 'Close the viewer',
    'cert.alt': 'ClearMind-Analytics certificate of completion awarded to RANAIVOSON Nantenaina Claudio for the Prescriptive Analytics (24 sessions) and Data and Artificial Intelligence Project Framework (7 sessions) programs, from 19 August to 17 November 2025.',

    // ── Contact
    'contact.label': '08 — Contact',
    'contact.big': 'Let\'s build something<br/><em>together.</em>',
    'contact.sub': 'Available for freelance work, locally and remotely.',
    'contact.phone': 'Phone',
    'contact.hp': 'Do not fill in',
    'contact.name': 'Name',
    'contact.namePh': 'Your name',
    'contact.email': 'Email',
    'contact.emailPh': 'youremail@example.com',
    'contact.message': 'Message',
    'contact.messagePh': 'Tell me about your project...',
    'contact.send': 'Send the message',

    // ── Footer
    'footer.madeWith': 'Crafted with',
    'footer.andPassion': 'and passion',

    // ── Language switch notification (written in the language being activated)
    'lang.toastTitle': 'Language switched',
    'lang.toastText': 'The site is now in English.',

    // ── Misc
    'cv.error': 'The PDF library could not be loaded. Check your internet connection and try again.',
  },
};
