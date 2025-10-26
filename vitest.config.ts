import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // permette di usare test/expect senza import
    environment: 'jsdom', // simula il browser
    setupFiles: './src/setupTests.ts', // file di setup globale per test
    coverage: {
      provider: 'v8', // generatore di coverage veloce
      reporter: ['text', 'json', 'html'],
    },
  },
});
