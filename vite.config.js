import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: false,
      },
    }
  },
  plugins: [
    viteSingleFile()
  ],
});
