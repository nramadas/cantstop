import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    eslintPlugin({
      cache: false,
      fix: true,
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      exclude: [],
    }),
  ],
});
