import { defineConfig } from "vite";

export default defineConfig({
  root: "cad",
  base: "/cad/",
  assetsInclude: ["**/*.wasm"],
  build: {
    outDir: "../dist/cad",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
  },
  worker: { format: "es" },
  optimizeDeps: { exclude: ["opencascade.js"] },
});
