import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Birthday/",   // MUST match your GitHub repo name
  build: {
    outDir: "docs",      // <-- build into /docs for GitHub Pages
  },
});
