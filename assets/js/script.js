document.querySelectorAll('*').forEach(function (element) {
    element.addEventListener('mouseover', function () {
        this.classList.remove('animate__animated');
    });

    element.addEventListener('mouseleave', function () {
        this.classList.add('animate__animated');
    });
});

const toggler = document.querySelector('.toggler');
const menuIcon = document.getElementById('menu-icon');
toggler.addEventListener('click', function () {
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const offset = 76;
    sections.forEach(function (section) {
        section.style.scrollMarginTop = offset + 'px';
    });
    window.addEventListener('scroll', function () {
        let currentSection = "";
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
});

const translations = {
    en: {
        accueil: "Home",
        aPropos: "About Me",
        competences: "Skills",
        projets: "Projects",
        education: "Education",
        contact: "Contact",
        accueilTitle: "Step into My Creative World!",
        accueilDescription: "Hi, I'm <br><strong>RANAIVOSON Nantenaina <span class='first-name'>Claudio</span></strong><br>A passionate developer ready to bring your ideas to life with tailored digital solutions.",
        accueilContactBtn: "Contact Me",
        accueilDownloadBtn: "Download My Resume",
        typedTexts: [
            "Creative web developer",
            "Self-taught learner",
            "Passionate about new technologies",
            "Building solutions that bring your ideas to life"
        ],
        aProposTitle: "About <span>Me</span>",
        aProposDescription1: "Hello! I'm <strong>RANAIVOSON Nantenaina Claudio</strong>, a developer passionate about technology and innovation. Since discovering the world of programming, I've been fascinated by the power of digital solutions to solve complex problems and simplify users' lives.",
        aProposDescription2: "I have developed strong expertise in web development, mastering technologies like HTML, CSS, JavaScript, PHP, and Python, along with frameworks such as Bootstrap, React, and Django. My goal is to design modern, intuitive, and high-performing websites tailored to meet each client's unique needs.",
        aProposCitation: "<em>\"In programming, if someone tells you 'you're overcomplicating things,' they're either 10 steps behind or 10 steps ahead of you.\" – Andrew Clark</em>",
        aProposDescription3: "This quote deeply resonates with how I approach challenges in development. It reminds me that every problem has multiple layers of understanding, and the apparent complexity of a solution often reflects a more advanced vision or a different perspective. In my work, I always strive to find the balance between simplicity and innovation while keeping the user's needs and technical constraints in mind.",
        skillsTitle: "Skills",
        categorieSkill1: "Programming Languages",
        categorieSkill2: "Frameworks and Libraries",
        categorieSkill3: "Databases",
        categorieSkill4: "Tools and Extras",
        projectTitle: "My <span>Projects</span>",
        desc1: "CongeSystem is an application for leave management allowing employees to request leave and track their leave balance, excluding holidays and weekends.",
        desc2: "The Chatroom project is a real-time chat application built with Node.js, Express, and Socket.io.This application allows users to join a chat room with a username and an optional profile picture, send messages, and share images in real time.",
        demo: "<i class='bi bi-play-circle'></i> Demo",
        educationTitle: "Education",
        educationP1: "<strong>2021 - Present :</strong>",
        diplome1: "<em>Professional Bachelor's degree in Management Informatics - Ongoing</em>",
        diplome2: "<em>Baccalaureate series C - Obtained</em>",
        contactText: "Feel free to contact me through the means below for any questions or collaborations.",
        footerP: "&copy; Copyright <a href='https://github.com/CLAUDIO101000' target='_blank'>Claudio</a> 2025. All rights reserved | Designed with passion by Claudio",
        contactForm: "<div class='card h-100 shadow-sm p-4'> <form action='https://formspree.io/f/mzzzydjj' method='POST' class='contact-form'> <div class='mb-3 animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 0.7s;'> <label for='name' class='form-label'>Name :</label> <input type='text' id='name' name='name' class='form-control' required placeholder='Your name'> </div> <div class='mb-3 animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 0.8s;'> <label for='email' class='form-label'>Email :</label> <input type='email' id='email' name='email' class='form-control' required placeholder='youremail@example.com'> </div> <div class='mb-4 animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 0.9s;'> <label for='message' class='form-label'>Message :</label> <textarea id='message' name='message' class='form-control' rows='5' required placeholder='Your message'></textarea> </div> <div class='text-center animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 1s;'> <button type='submit' class='btn btn-primary px-4'> <i class='bi bi-send me-2'></i> Send </button> </div> </form> </div>",
    },
    fr: {
        accueil: "Accueil",
        aPropos: "À propos",
        competences: "Compétences",
        projets: "Projets",
        education: "Éducation",
        contact: "Contact",
        accueilTitle: "Plongez dans mon univers créatif !",
        accueilDescription: "Bonjour, C'est <br><strong>RANAIVOSON Nantenaina <span class='prenom'>Claudio</span></strong><br>Développeur passionné, prêt à concrétiser vos idées avec des solutions numériques sur mesure.",
        accueilContactBtn: "Me Contacter",
        accueilDownloadBtn: "Télécharger mon CV",
        typedTexts: [
            "Développeur web créatif",
            "Apprenant autodidacte",
            "Passionné par les nouvelles technologies",
            "Crée des solutions qui réalisent vos idées"
        ],
        aProposTitle: "À propos de <span>moi</span>",
        aProposDescription1: "Bonjour ! Je suis <strong>RANAIVOSON Nantenaina Claudio</strong>, un développeur passionné par la technologie et l'innovation. Depuis que j'ai découvert le monde de la programmation, j'ai toujours été fasciné par le pouvoir qu'ont les solutions numériques de résoudre des problèmes complexes et de simplifier la vie des utilisateurs.",
        aProposDescription2: "J'ai acquis des compétences solides en développement web, en travaillant avec des technologies comme HTML, CSS, JavaScript, PHP, et Python, ainsi que des frameworks comme Bootstrap, React, et Django. Mon objectif est de créer des sites web modernes, intuitifs et efficaces qui répondent aux besoins spécifiques de mes clients.",
        aProposCitation: "<em>\"En programmation, si quelqu'un vous dit 'vous compliquez trop les choses', il a soit 10 pas de retard, soit 10 pas d'avance sur vous.\" – Andrew Clark</em>",
        aProposDescription3: "Cette citation résonne particulièrement avec ma manière d'aborder les défis en développement. Elle me rappelle que chaque problème a plusieurs niveaux de compréhension et que la complexité apparente d'une solution peut souvent refléter une vision plus avancée ou une perspective différente. Dans mon travail, je m'efforce toujours de trouver l'équilibre entre simplicité et innovation, tout en gardant en tête les besoins de l'utilisateur et les contraintes techniques.",
        skillsTitle: "Compétences",
        categorieSkill1: "Langages de Programmation",
        categorieSkill2: "Frameworks et Bibliothèques",
        categorieSkill3: "Bases de Données",
        categorieSkill4: "Outils et Extras",
        projectTitle: "Mes <span>Projets</span>",
        desc1: "CongeSystem est une application de gestion de congés permettant aux employés de demander des congés et de suivre leur solde de congé, en excluant les jours fériés et les weekends.",
        desc2: "Le projet Chatroom est une application de chat en temps réel construite avec Node.js, Express, et Socket.io. Cette application permet aux utilisateurs de rejoindre une salle de chat avec un nom d'utilisateur et une image de profil optionnelle, d'envoyer des messages et de partager des images en temps réel.",
        demo: "<i class='bi bi-play-circle'></i> Démo",
        educationTitle: "Éducation",
        educationP1: "<strong>2021 - Présent :</strong>",
        diplome1: "<em>Licence Professionnelle en Informatique de gestion - En cours</em>",
        diplome2: "<em>Baccalauréat série C - Obtenu</em>",
        contactText: "N'hésitez pas à me contacter via les moyens ci-dessous pour toute question ou collaboration.",
        footerP: "&copy; Copyright <a href='https://github.com/CLAUDIO101000' target='_blank'>Claudio</a> 2025. Tous droits réservés | Conçu avec passion par Claudio",
        contactForm: "<div class='card h-100 shadow-sm p-4'> <form action='https://formspree.io/f/mzzzydjj' method='POST' class='contact-form'> <div class='mb-3 animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 0.7s;'> <label for='name' class='form-label'>Nom :</label> <input type='text' id='name' name='name' class='form-control' required placeholder='Votre nom'> </div> <div class='mb-3 animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 0.8s;'> <label for='email' class='form-label'>Email :</label> <input type='email' id='email' name='email' class='form-control' required placeholder='votreemail@exemple.com'> </div> <div class='mb-4 animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 0.9s;'> <label for='message' class='form-label'>Message :</label> <textarea id='message' name='message' class='form-control' rows='5' required placeholder='Votre message'></textarea> </div> <div class='text-center animate__animated animate__fadeInUp' style='--animate-duration: 1.2s; --animate-delay: 1s;'> <button type='submit' class='btn btn-primary px-4'> <i class='bi bi-send me-2'></i> Envoyer </button> </div> </form> </div>",
    }
};

function changeLanguage(language, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'custom-swal-popup',
            confirmButton: 'custom-swal-button'
        }
    });
    document.querySelector(".nav-accueil").textContent = translations[language].accueil;
    document.querySelector(".nav-a-propos").textContent = translations[language].aPropos;
    document.querySelector(".nav-competences").textContent = translations[language].competences;
    document.querySelector(".nav-projets").textContent = translations[language].projets;
    document.querySelector(".nav-education").textContent = translations[language].education;
    document.querySelector(".nav-contact").textContent = translations[language].contact;
    document.querySelector(".accueil h1").innerHTML = translations[language].accueilTitle;
    document.querySelector(".accueil .lead").innerHTML = translations[language].accueilDescription;
    document.querySelectorAll(".accueil .contact-item .btn")[0].innerHTML = `<i class="fa fa-envelope"></i> ${translations[language].accueilContactBtn}`;
    document.querySelectorAll(".accueil .contact-item .btn")[1].innerHTML = `<i class="fa fa-download"></i> ${translations[language].accueilDownloadBtn}`;
    updateTypedText(language);
    document.querySelector(".a-propos h1").innerHTML = translations[language].aProposTitle;
    document.querySelector(".a-propos .p1").innerHTML = translations[language].aProposDescription1;
    document.querySelector(".a-propos .p2").innerHTML = translations[language].aProposDescription2;
    document.querySelector(".a-propos .citation").innerHTML = translations[language].aProposCitation;
    document.querySelector(".a-propos .p3").innerHTML = translations[language].aProposDescription3;
    document.querySelector(".skill h1").innerHTML = translations[language].skillsTitle;
    document.querySelector(".skill .categorie1").innerHTML = translations[language].categorieSkill1;
    document.querySelector(".skill .categorie2").innerHTML = translations[language].categorieSkill2;
    document.querySelector(".skill .categorie3").innerHTML = translations[language].categorieSkill3;
    document.querySelector(".skill .categorie4").innerHTML = translations[language].categorieSkill4;
    document.querySelector(".project h1").innerHTML = translations[language].projectTitle;
    document.querySelector(".project .desc1").innerHTML = translations[language].desc1;
    document.querySelector(".project .desc2").innerHTML = translations[language].desc2;
    document.querySelector(".project .btnDemo1").innerHTML = translations[language].demo;
    document.querySelector(".project .btnDemo2").innerHTML = translations[language].demo;
    document.querySelector(".education h1").innerHTML = translations[language].educationTitle;
    document.querySelector(".education .educationP1").innerHTML = translations[language].educationP1;
    document.querySelector(".education .diplome1").innerHTML = translations[language].diplome1;
    document.querySelector(".education .diplome2").innerHTML = translations[language].diplome2;
    document.querySelector(".contact p").innerHTML = translations[language].contactText;
    document.querySelector(".contact .formContact").innerHTML = translations[language].contactForm;
    document.querySelector("footer p").innerHTML = translations[language].footerP;

}

document.getElementById("lang-en").addEventListener("click", function () {
    changeLanguage('en', 'Language Switched!', 'The language has been successfully changed to English.');
});

document.getElementById("lang-fr").addEventListener("click", function () {
    changeLanguage('fr', 'Langue Changée!', 'La langue a été modifiée avec succès en Français.');
});

function updateTypedText(language) {
    if (window.typedInstance) {
        window.typedInstance.destroy();
    }
    window.typedInstance = new Typed("#typed-text", {
        strings: translations[language].typedTexts,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: false,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateTypedText('fr');
});
