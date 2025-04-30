import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      preserveEntrySignatures: "strict",
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
