import { test, expect } from "@playwright/test";
import { gotoApp, unlockDevByBadge, openDevPane } from "./helpers";

test("Fill window then shift-left keeps TAB numbers visible and STAFF marks persistent", async ({ page }) => {
  await gotoApp(page);
  await unlockDevByBadge(page);
  await openDevPane(page);

  // Fill + Shift uses deterministic inserts beyond visible window.
  await page.locator("#dev-fillAndShift").click();

  // Verify TAB numbers exist and are clipped to TAB region.
  const tabG = page.locator("#staffOverlaySvg #geduTabNumbers");
  await expect(tabG).toBeVisible();
  const tabTextCount = await tabG.locator("text").count();
  expect(tabTextCount).toBeGreaterThan(0);

  // Verify STAFF marks exist.
  const staffG = page.locator("#staffOverlaySvg #geduStaffMarks");
  await expect(staffG).toBeVisible();
  const staffMarkCount = await staffG.locator("*").count();
  expect(staffMarkCount).toBeGreaterThan(0);

  // Ledger clip invariant: clip-paths should exist and be applied.
  await expect(page.locator("#staffOverlaySvg #geduStaffClip")).toBeAttached();
  await expect(page.locator("#staffOverlaySvg #geduTabClip")).toBeAttached();
  await expect(page.locator("#staffOverlaySvg #geduStaffMarks")).toHaveAttribute("clip-path", /geduStaffClip/);
  await expect(page.locator("#staffOverlaySvg #geduTabNumbers")).toHaveAttribute("clip-path", /geduTabClip/);

  // Now advance 16 times to exercise shift-left repeatedly.
  await page.locator("#dev-advanceStaffTab16").click();
  const tabTextCount2 = await tabG.locator("text").count();
  expect(tabTextCount2).toBeGreaterThan(0);
});
