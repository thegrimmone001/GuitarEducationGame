import { test, expect } from "@playwright/test";
import { gotoApp } from "./helpers";

// Minimal boot + mount verification.
// Goal: catch blank-page / missing-surface regressions without manual testing.

test.describe("Smoke: boot + critical surfaces mount", () => {
  test("app loads, enters UI, starts match, mounts canvases and note rail", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("pageerror", (err) => {
      consoleErrors.push(`pageerror: ${err?.message || String(err)}`);
    });

    page.on("console", (msg) => {
      // Treat console.error as a smoke failure signal.
      if (msg.type() === "error") {
        consoleErrors.push(`console.error: ${msg.text()}`);
      }
    });

    await gotoApp(page);

    // Start a match/session.
    await page.locator("#btn-new").click();

    // Critical mounts.
    await expect(page.locator("#staffCanvas")).toBeVisible();
    await expect(page.locator("#fretCanvas")).toBeVisible();
    await expect(page.locator("#noteStrip-rail")).toBeVisible();

    // Note rail should populate with tiles.
    await expect(page.locator("#noteStrip-rail .noteTile")).toHaveCount(25);

    // Fail if the boot produced console errors.
    expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  });
});
