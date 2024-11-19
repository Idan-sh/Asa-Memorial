import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://asa-memorial.onrender.com:10000',  // Proxy API requests to backend
    },
  },
  resolve: {
    alias: {
      process: "process/browser"
    }
  }
})
