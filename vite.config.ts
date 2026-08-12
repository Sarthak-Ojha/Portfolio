import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteCompression from 'vite-plugin-compression'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    ViteImageOptimizer({
      // WebP images are already hand-optimized — omitting webp key skips them
      png: { quality: 80 },
      jpg: { quality: 80, progressive: true },
      jpeg: { quality: 80, progressive: true },
      includePublic: true,
    }),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression (better compression ratio)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
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
        // Split vendor chunks dynamically for optimum mobile parallel loading
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-core';
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'animations';
            }
            if (id.includes('lucide')) {
              return 'icons';
            }
            return 'vendor';
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
    target: 'esnext',
    minify: 'esbuild',
    // Optimize CSS inlining
    cssMinify: true,
  },
});
