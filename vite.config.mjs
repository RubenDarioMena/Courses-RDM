import { defineConfig } from "vite";
export default defineConfig({
  root: "arena",
  base: "/arena/",
  build: {
    outDir: "../dist/arena",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1300,
  },
  worker: { format: "es" },
  optimizeDeps: { exclude: ["@electric-sql/pglite"] },
});
