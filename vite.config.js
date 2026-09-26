import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // index.html utilise %VITE_SITE_URL% (canonical, Open Graph, JSON-LD) : sans
  // elle, la build passerait mais publierait des URL cassées
  if (!loadEnv(mode, process.cwd()).VITE_SITE_URL) {
    throw new Error('VITE_SITE_URL manquante : définissez-la dans le fichier .env (URL publique du site).');
  }

  return {
    // Chemins relatifs : le site fonctionne sous /Portfolio-Claudio/ (GitHub Pages)
    // comme à la racine d'un domaine personnalisé
    base: './',
  };
});
