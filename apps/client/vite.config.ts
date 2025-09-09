// apps/client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Express dev server
        changeOrigin: true,
        // no boolean here; keep it an object
      },
    },
  },
})
