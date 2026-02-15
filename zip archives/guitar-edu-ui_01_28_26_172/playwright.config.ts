import { defineConfig, devices } from "@playwright/test";

// Minimal but real E2E config.
// We intentionally run E2E against *built* output (vite preview) to match shipping behavior
// and avoid dev-server/Node optional-dep flakiness on Windows.
//
// Scripts:
// - npm run e2e     => build + vite preview on 4173 + playwright
// - npm run e2e:ui  => same, but interactive UI

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
