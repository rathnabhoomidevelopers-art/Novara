import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    vike({ prerender: true }),  // ← tell Vike all pages are pre-rendered (static)
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    // cssCodeSplit: false  ← REMOVE THIS — Vike explicitly forbids it
    cssMinify: true,
  },
  define: {
    // 'development' fallback was causing the NODE_ENV warning
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
})
