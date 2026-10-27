import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['shareholders-opera-foto-aquatic.trycloudflare.com', 'localhost'],
    // Ejemplo src/cors: las peticiones a /api las reenvía el servidor de
    // Vite a la API de localhost:3001. Para el navegador es mismo origen.
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true }
    }
  }
})
