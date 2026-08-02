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
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          'gsap': ['gsap'],
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react'],
          'radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs'
          ]
        },
      },
    },
  },
});
