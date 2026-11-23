import { defineConfig } from 'vite';

export default defineConfig({
  // The website is served from https://anvaka.github.io/graph-drawing-libraries/
  // Relative paths keep it working from any folder.
  base: './',
  build: {
    rollupOptions: {
      input: ['index.html', 'performance/index.html']
    }
  }
});
