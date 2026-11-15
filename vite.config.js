import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: funciona en GitHub Pages (usuario.github.io/repositorio/) sin configurar el nombre del repo.
export default defineConfig({
  plugins: [react()],
  base: './',
})
