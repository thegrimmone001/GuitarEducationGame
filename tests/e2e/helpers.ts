import { expect, Page } from "@playwright/test";

export async function gotoApp(page: Page): Promise<void> {
  await page.goto("/");
  // Splash is shown by default; select a session so the footer + controls are interactable.
  const splash = page.locator("#splash");
  await expect(splash).toBeVisible();
  await page.locator("#splash-edu").click();
  // Splash hides by removing the 'show' class.
  await expect(splash).not.toHaveClass(/\bshow\b/);
}

export async function unlockDevByBadge(page: Page): Promise<void> {
  const badge = page.locator("#buildVersion");
  await expect(badge).toBeVisible();
  // 5 clicks within 800ms window.
  await badge.click();
  await badge.click();
  await badge.click();
  await badge.click();
  await badge.click();
  // Dev quick button should appear.
  await expect(page.locator("#devQuick")).toBeVisible();
}

export async function unlockDevByHotkey(page: Page): Promise<void> {
  await page.keyboard.down("Control");
  await page.keyboard.down("Shift");
  await page.keyboard.press("D");
  await page.keyboard.up("Shift");
  await page.keyboard.up("Control");
  await expect(page.locator("#devQuick")).toBeVisible();
}

export async function openDevPane(page: Page): Promise<void> {
  await page.locator("#devQuick").click();
  // Ensure Dev/Test tab is active and pane is visible.
  await expect(page.locator("#misc-dev-pane")).toBeVisible();
}
