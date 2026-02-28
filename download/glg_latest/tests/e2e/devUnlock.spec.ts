import { test, expect } from "@playwright/test";
import { gotoApp, unlockDevByBadge, unlockDevByHotkey, openDevPane } from "./helpers";

test.describe("Dev/Test unlock", () => {
  test("5-click build badge unlocks and footer DEV opens panel", async ({ page }) => {
    await gotoApp(page);
    await unlockDevByBadge(page);
    await openDevPane(page);
    await expect(page.locator("#misc-dev-pane")).toBeVisible();
    await expect(page.locator("#dev-fillStaffTab")).toBeVisible();
  });

  test("Ctrl+Shift+D unlocks and footer DEV opens panel", async ({ page }) => {
    await gotoApp(page);
    await unlockDevByHotkey(page);
    await openDevPane(page);
    await expect(page.locator("#misc-dev-pane")).toBeVisible();
  });
});
