import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 Esto es crucial para servir rutas correctamente en Render
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 👌 para importar con "@/components/..."
    },
  },
  build: {
    outDir: "dist", // 👌 asegura que la carpeta final sea dist
    emptyOutDir: true, // 🧹 limpia dist antes de cada build
  },
});
