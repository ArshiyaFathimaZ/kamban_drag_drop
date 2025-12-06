import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Clean Vite config for Storybook compatibility
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
