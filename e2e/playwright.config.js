import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:5174",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  webServer: [
    // The test copy of the backend and its database.
    {
      command: "docker compose -f ../compose.e2e.yml up --build",
      url: "http://localhost:8001/health",
      timeout: 180_000,
      stderr: "ignore",
      gracefulShutdown: { signal: "SIGTERM", timeout: 20_000 },
    },

    // The frontend, connected to the test backend.
    {
      command: "npm run dev --prefix ../frontend -- --port 5174 --strictPort",
      url: "http://localhost:5174",
      env: {
        API_URL: "http://localhost:8001",
        VITE_API_URL: "",
      },
    },
  ],
});
