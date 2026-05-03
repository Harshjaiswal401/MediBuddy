import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://harshg789.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/webhook/d6404487-3e08-4921-b58e-aa4cac78df21/chat'),
      },
    },
  },
});
