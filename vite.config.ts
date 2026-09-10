import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    {
      name: "copy-htaccess",
      closeBundle() {
        if (mode === "production") {
          try {
            copyFileSync("public/.htaccess", "dist/.htaccess");
            copyFileSync("public/web.config", "dist/web.config");
          } catch (err) {
            console.warn(
              "Could not copy .htaccess or web.config:",
              err
            );
          }
        }
      },
    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    cssCodeSplit: true,
    minify: mode === "production" ? "esbuild" : false,

    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-accordion",
          ],
          "query-vendor": ["@tanstack/react-query"],
        },
      },
    },

    chunkSizeWarningLimit: 1000,
  },
}));

