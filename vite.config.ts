import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group React and MUI dependencies into a vendor chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@mui')) {
              return 'vendor';
            }
          }
          // Group form components into a separate chunk
          if (id.includes('components/organisms/SentForm/Steps')) {
            return 'form-steps';
          }
          return undefined;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
