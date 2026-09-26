// Textes traduits, indexés par les clés data-i18n* de index.html.
// Le français est lu dans index.html au chargement : `fr` ne contient que les
// textes générés en JS. Une clé absente de `en` retombe sur le français
// (noms propres, termes identiques dans les deux langues).

export const LANGS = ['fr', 'en'];

// Nom de chaque langue, écrit dans cette langue (toast de bascule)
export const LANG_NAMES = { fr: 'Français', en: 'English' };

export const translations = {
  fr: {
    // ── Hero
    'hero.typed': [
      'Développeur Web',
      'Spécialiste Odoo',
      'Passionné par Python & Django',
      "Créateur d'apps temps réel",
      'Disponible pour vos projets',
    ],

    // ── Stack technique
    'term.whoami': 'ranaivoson_claudio · dev_web · Madagascar',
    'term.odoo': 'Odoo Server 13.0 — Module dev · QWeb · ORM avancé',
    'term.status': '✓ Disponible pour nouvelles missions',

    // ── Contact
    'contact.sending': 'Envoi en cours…',
    'contact.success': 'Merci ! Votre message est bien parti, je vous réponds rapidement.',
    'contact.error': "L'envoi a échoué. Réessayez, ou écrivez-moi directement à ranaivosonclaudio@gmail.com.",

    // ── Toast de changement de langue
    'lang.toastTitle': 'Langue changée',
    'lang.toastText': 'Le site est maintenant en français.',

    // ── CV (PDF)
    'cv.error': "La librairie PDF n'a pas pu se charger. Vérifie ta connexion internet puis réessaie.",
  },

  en: {
    // ── Métadonnées
    'meta.title': 'Claudio · Freelance Web Developer',
    'meta.description': 'Portfolio of RANAIVOSON Nantenaina Claudio, a passionate web developer specialised in tailor-made digital solutions — Odoo, Python, PHP, React.',
    'meta.ogTitle': 'Claudio · Web & Odoo Developer',
    'meta.ogDescription': 'Portfolio of RANAIVOSON Nantenaina Claudio — tailor-made digital solutions: Odoo, Python, PHP, React. Available for freelance work.',
    'meta.ogLocale': 'en_US',

    // ── Navigation
    'nav.label': 'Main navigation',
    'nav.skip': 'Skip to content',
    'nav.home': 'Claudio — back to top',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.about': 'About',
    'nav.education': 'Education',
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

    // ── Services
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
    'services.c6.desc': 'Debugging, bug fixing, refactoring, technical documentation and training internal teams on the tools delivered.',

    // ── Projets
    'projects.label': 'Projects',
    'projects.title': 'What I have built.',
    'projects.p1.num': '2024 · Web application',
    'projects.p1.desc': 'A leave management application that lets employees submit requests and track their balance. Smart calculation excluding public holidays and weekends. Full admin interface for approving requests.',
    'projects.p2.num': '2024 · Real-time application',
    'projects.p2.desc': 'A real-time chat application with nicknames, optional avatars and image sharing. Built on Node.js + Socket.io for instant, smooth communication between users. Deployed on Vercel.',
    'projects.demo': 'Live demo',
    'projects.moreText': 'More repositories, experiments and work in progress are published on <strong>my GitHub profile</strong>.',
    'projects.moreCta': 'Browse all repositories',

    // ── Compétences
    'skills.label': 'Skills',
    'skills.title': 'What I work with.',
    'skills.cat1': 'Programming languages',
    'skills.cat2': 'Frameworks & Libraries',
    'skills.cat3': 'Mobile & Embedded development',
    'skills.cat4': 'Databases',
    'skills.cat5': 'Tools & Environment',
    'skills.cat6': 'AI & Data Mining',
    'skills.mobileApp': 'Mobile App',

    // ── Stack technique
    'stack.label': 'Tech stack',
    'stack.title': 'My working<br/>environment.',
    'stack.intro': 'The languages, frameworks and tools that shape my day-to-day work as a developer.',
    'term.whoami': 'ranaivoson_claudio · web_dev · Madagascar',
    'term.odoo': 'Odoo Server 13.0 — Module dev · QWeb · advanced ORM',
    'term.status': '✓ Available for new projects',

    // ── Expérience
    'exp.label': 'Professional experience',
    'exp.title': 'My experience<br/>in the field.',
    'exp.intro': 'My journey at Groupe Viseo, from the bachelor internship to an Odoo developer role.',
    'exp.e1.badge': '● Current role',
    'exp.e1.contract': 'Fixed-term · 2 years',
    'exp.e1.date': '1 Jul. 2025 — 30 Jun. 2027',
    'exp.e1.role': 'Odoo Developer',
    'exp.e1.desc': 'Hired into the technical team after my internship, I design, optimise and maintain Odoo modules running in production in a multi-company environment.',
    'exp.e1.t1': 'Building and maintaining a multi-company analytic accounting module in production (Python, XML, QWeb, PostgreSQL)',
    'exp.e1.t2': 'Performance tuning — batch processing, targeted SQL queries, caching — for markedly faster reports',
    'exp.e1.t3': 'Automated synchronisation of accounting entries through scheduled jobs, handling time zones and concurrency',
    'exp.e1.t4': 'Interactive reporting dashboards (JavaScript widgets, collapsible hierarchy) used daily by finance teams',
    'exp.e1.t5': 'Refactoring, bug fixing and code reviews',
    'exp.e2.badge': 'Internship · Bachelor',
    'exp.e2.date': '12 Feb. 2025 — 16 May 2025',
    'exp.e2.role': 'Odoo Developer Intern',
    'exp.e2.desc': 'Final bachelor internship completed within the technical department. A first professional immersion in the Odoo ecosystem in a corporate setting.',
    'exp.e2.t1': 'Learning the Odoo architecture (ORM, models, views)',
    'exp.e2.t2': 'Developing features on existing modules',
    'exp.e2.t3': 'Writing QWeb reports and customising interfaces',
    'exp.e2.t4': 'Taking part in code reviews and team meetings',

    // ── À propos
    'about.label': 'About',
    'about.title': 'Passionate about<br/><em>technology.</em>',
    'about.p1': 'Hi! I am <strong>RANAIVOSON Nantenaina Claudio</strong>, a passionate developer based in <span class="hl">Madagascar</span>. Ever since I discovered programming, I have been fascinated by the power of digital solutions to solve complex problems.',
    'about.p2': 'My skills span <strong>web</strong> development and <span class="hl">Odoo</span> solutions, with technologies such as Python, PHP, JavaScript, React, Django and many more. My goal: to build <strong>modern, intuitive and robust</strong> applications.',
    'about.quote': '"In programming, if someone tells you \'you\'re overcomplicating it,\' they\'re either 10 steps behind you or 10 steps ahead of you." – Andrew Clark',
    'about.p3': 'That quote guides my approach: finding the perfect balance between <strong>simplicity and innovation</strong>, always focused on the user\'s needs.',
    'about.stat1': 'Years of experience',
    'about.stat2': 'Technologies mastered',
    'about.stat3': "Master's in Computing (IS-INFO)",
    'about.stat4': 'Committed to every project',

    // ── Éducation
    'edu.label': 'Education',
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
    'cert.date': '19 Aug. 2025 — 17 Nov. 2025',
    'cert.place': 'Andraharo, Antananarivo — delivered for Groupe Viseo',
    'cert.view': 'View the certificate',
    'cert.aria': 'Open the ClearMind-Analytics certificate full size',
    'cert.lbTitle': 'Certificate — ClearMind-Analytics',
    'cert.download': 'Download',
    'cert.close': 'Close the viewer',
    'cert.alt': 'ClearMind-Analytics certificate of completion awarded to RANAIVOSON Nantenaina Claudio for the Prescriptive Analytics (24 sessions) and Data and Artificial Intelligence Project Framework (7 sessions) programs, from 19 August to 17 November 2025.',

    // ── Contact
    'contact.big': 'Let\'s build something<br/><em>together.</em>',
    'contact.sub': 'Available for freelance work, locally and remotely.',
    'contact.phone': 'Phone',
    'contact.hp': 'Do not fill in',
    'contact.name': 'Name',
    'contact.namePh': 'Your name',
    'contact.emailPh': 'youremail@example.com',
    'contact.messagePh': 'Tell me about your project...',
    'contact.send': 'Send the message',
    'contact.sending': 'Sending…',
    'contact.success': 'Thank you! Your message is on its way — I will get back to you shortly.',
    'contact.error': 'Sending failed. Please try again, or email me directly at ranaivosonclaudio@gmail.com.',

    // ── Pied de page
    'footer.madeWith': 'Crafted with',
    'footer.andPassion': 'and passion',

    // ── Toast de changement de langue
    'lang.toastTitle': 'Language switched',
    'lang.toastText': 'The site is now in English.',

    // ── CV (PDF)
    'cv.error': 'The PDF library could not be loaded. Check your internet connection and try again.',
  },
};
