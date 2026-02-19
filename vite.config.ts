import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
      tailwindcss()
  ],
  base: '',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    '__BUILD_DATE__': JSON.stringify(new Date().toISOString()),
  }
})
