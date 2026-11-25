import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const apiUrl = process.env.API_URL ?? "http://localhost:8000";

// Use separate database and upload directory for testing
process.env.DB_NAME = "app_test";
process.env.UPLOAD_DIR = "./uploads-test";
process.env.MAX_UPLOAD_MB = "5";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": apiUrl,
    },
  },

  test: {
    globalSetup: "./tests/setup.js",
    fileParallelism: false,
    coverage: {
      exclude: ["tests/**"],
    },
  },
  build: { outDir: "../backend/dist", emptyOutDir: true },
});
