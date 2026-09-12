// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Chemins relatifs : le site fonctionne sous /Portfolio-Claudio/ (GitHub Pages)
  // comme à la racine d'un domaine personnalisé.
  base: './',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
})
