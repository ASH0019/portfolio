import { defineConfig } from 'vite';

export default defineConfig({
  // All your assets (images, pdfs, certificates) live in /public
  // Vite serves them from the root automatically
  build: {
    outDir: 'dist',
  },
});
