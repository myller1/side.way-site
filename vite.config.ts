import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    port: 5176,
    strictPort: true,
    host: true,
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      external: (id) => {
        // Evita problemas com dependências opcionais do Rollup
        if (id.includes('@rollup/rollup-')) {
          return false;
        }
        return false;
      },
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion", "motion"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
  },
});
