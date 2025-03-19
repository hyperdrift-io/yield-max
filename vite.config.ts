import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  // We'll handle static generation separately
  build: {
    outDir: 'dist'
  },
  css: {
    modules: {
      // Enable CSS modules for files matching this pattern
      // This will treat .module.css files as CSS modules
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
})
