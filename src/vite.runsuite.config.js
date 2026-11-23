import { defineConfig } from 'vite';

/**
 * Library demos in public/examples are plain html pages. Their performance
 * tests get a graph from the global `runSuite()` function, which is built here
 * into public/performance/runSuite.js before the website itself.
 */
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'public/performance',
    emptyOutDir: false,
    lib: {
      entry: 'app/runSuite.js',
      name: 'runSuite',
      formats: ['iife'],
      fileName: () => 'runSuite.js'
    }
  }
});
