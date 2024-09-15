import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.37.99.217:8000',  // Adjust this to your Django server's address
        changeOrigin: true,
        secure: false,
      }
    }
  }
})