import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxy } from 'vite-plugin-proxy'

export default defineConfig({
  plugins: [
    react(),
    createProxy({
      '/api': {
        target: 'http://10.37.99.217:8000/',  // Your Django server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    })
  ],
  server: {
    port: 5173,  // Vite's default port
  }
})