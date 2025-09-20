import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// force it to run on port 3000 (per assignment)
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: { port: 3000 }
})
