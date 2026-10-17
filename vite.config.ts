import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, mkdirSync, existsSync } from "fs";

const routes = [
  "canopies",
  "car-canopies",
  "garden-canopies",
];

export default defineConfig(({ mode }) => ({
  base: "/rubou-albilad/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    {
      name: "prepare-github-pages-routes",
      closeBundle() {
        if (mode !== "production") return;

        const indexFile = path.resolve("dist/index.html");

        if (!existsSync(indexFile)) {
          console.warn("dist/index.html was not found.");
          return;
        }

        for (const route of routes) {
          const routeDir = path.resolve("dist", route);

          mkdirSync(routeDir, { recursive: true });
          copyFileSync(indexFile, path.join(routeDir, "index.html"));
        }

        for (const file of [".htaccess", "web.config"]) {
          const source = path.resolve("public", file);
          const destination = path.resolve("dist", file);

          if (existsSync(source)) {
            copyFileSync(source, destination);
          }
        }

        console.log("GitHub Pages route pages generated.");
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
