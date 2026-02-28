import { test, expect } from "@playwright/test";
import { gotoApp, unlockDevByBadge } from "./helpers";

test("Staff accidental prompt renders and commit persists", async ({ page }) => {
  await gotoApp(page);
  // Dev unlock isn't required for staff editing, but we ensure footer interactions are ok.
  await unlockDevByBadge(page);

  const staffSvg = page.locator("#staffOverlaySvg");
  await expect(staffSvg).toBeVisible();

  // Click roughly in the STAFF region (upper portion of the overlay).
  await staffSvg.click({ position: { x: 160, y: 90 } });

  const acc = page.locator("#accidentalOverlay");
  await expect(acc).toBeVisible();
  await page.locator("#accidental-sharp").click();
  await expect(acc).toBeHidden();

  // After commit, accepted staff marks should exist.
  const acceptedStaffMarks = page.locator("#staffOverlaySvg #geduStaffMarks");
  await expect(acceptedStaffMarks).toBeVisible();
  const count1 = await acceptedStaffMarks.locator("*").count();
  expect(count1).toBeGreaterThan(0);

  // Click somewhere else; the mark should persist.
  await staffSvg.click({ position: { x: 240, y: 120 } });
  await page.locator("#accidental-natural").click();
  const count2 = await acceptedStaffMarks.locator("*").count();
  expect(count2).toBeGreaterThanOrEqual(count1);
});
