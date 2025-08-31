import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      insertTypesEntry: true,
      rollupTypes: false,
      outDir: 'dist'
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TellescopeUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `tellescope-ui.${format}.js`
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom', 
        '@mui/material', 
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
        '@fontsource/roboto',
        '@emoji-mart/react',
        '@emoji-mart/data',
        'emoji-mart',
        '@tanstack/react-virtual'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MUI',
          '@mui/icons-material': 'MUIIcons',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled',
          '@fontsource/roboto': 'FontSourceRoboto',
          '@emoji-mart/react': 'EmojiMartReact',
          '@emoji-mart/data': 'EmojiMartData',
          'emoji-mart': 'EmojiMart',
          '@tanstack/react-virtual': 'TanStackVirtual'
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
