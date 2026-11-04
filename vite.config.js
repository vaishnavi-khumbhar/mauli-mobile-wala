import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path of the website:
// - GitHub Pages (username.github.io/repo-name/) → set automatically by .github/workflows/deploy.yml
// - Own domain / Hostinger (maulimobilewala.com)  → "/" (default)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
});