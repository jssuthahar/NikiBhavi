import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Inline small assets to avoid broken asset paths
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Predictable chunk names
        manualChunks: undefined,
      }
    }
  }
})
