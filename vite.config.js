import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" keeps asset paths relative so the build works on GitHub Pages
// subpaths, Netlify, or any static host without extra config.
export default defineConfig({
  plugins: [react()],
  base: "./",
  // react-pageflip can pull in a second React copy; dedupe to avoid the
  // "Invalid hook call" error.
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
