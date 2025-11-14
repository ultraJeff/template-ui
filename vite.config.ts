// vite.config.ts
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/frontend/main.tsx"),
        name: "template-ui",
        fileName: (format) => `main.${format}.js`,
      },
      rollupOptions: {
        external: [],
        output: {
          globals: {},
          format: "umd",
          dir: path.resolve(__dirname, "dist/frontend"),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/frontend"),
      },
    },
    server: {
      proxy: {
        // Proxy ALL /api requests to the backend server (which will proxy to OpenShift agent)
        "/api": {
          target: "http://localhost:5003", // Points to the Node.js backend
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      "process.env": {
        ENVIRONMENT: process.env.ENVIRONMENT,
      },
    },
});