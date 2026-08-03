import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    inspectAttr(),
    react(),
    ViteImageOptimizer({
      // WebP images are already hand-optimized — omitting webp key skips them
      png: { quality: 80 },
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      includePublic: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable CSS code splitting to reduce initial CSS payload
    cssCodeSplit: true,
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: (id) => {
          // GSAP and animation libraries
          if (id.includes('gsap')) {
            return 'gsap';
          }
          // React core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // UI icons
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'radix';
          }
          // Lenis smooth scroll
          if (id.includes('lenis')) {
            return 'lenis';
          }
          // Form handling
          if (id.includes('@formspree')) {
            return 'forms';
          }
        },
        // Optimize chunk loading
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Reduce memory usage during build
      onwarn(warning) {
        // Ignore certain warnings
        if (warning.code === 'MODULE_BESIDE_DEPENDENCY') return;
      },
    },
    // Optimize build performance
    target: 'es2015',
    minify: 'esbuild',
    // Optimize CSS inlining
    cssMinify: true,
  },
});
