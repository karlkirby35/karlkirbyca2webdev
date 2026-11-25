import { defineConfig } from "vitest/config";

// Use separate database and upload directory for testing
process.env.DB_NAME = "app_test";
process.env.UPLOAD_DIR = "./uploads-test";
process.env.MAX_UPLOAD_MB = "5";

export default defineConfig({
  test: {
    globalSetup: "./tests/setup.js",
    fileParallelism: false,
    coverage: {
      exclude: ["tests/**"],
    },
  },
});
