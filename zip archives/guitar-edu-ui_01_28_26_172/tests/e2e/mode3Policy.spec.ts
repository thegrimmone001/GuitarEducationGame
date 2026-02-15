import { test, expect } from "@playwright/test";
import { gotoApp, unlockDevByBadge, openDevPane } from "./helpers";

test.describe("Mode 3 spelling policy", () => {
  test("strict rejects enharmonic equivalents when prompt spelling is required", async ({ page }) => {
    await gotoApp(page);
    await unlockDevByBadge(page);
    await openDevPane(page);

    // Ensure dropdown is set to strict.
    await page.locator("#pref-mode3SpellingPolicy").selectOption("strict");
    await page.locator("#dev-runMode3Strict").click();

    const report = page.locator("#dev-mode3Report");
    await expect(report).toBeVisible();
    const text = await report.inputValue();
    expect(text).toContain("MODE 3 TRUTH TABLE VERIFICATION (STRICT)");
    expect(text).toContain("PASS  Black key: enharmonic spelling  — should reject");
    expect(text).toContain("PASS  White key: E# for F  — strict requires natural");
  });

  test("enharmonic accepts equivalent spellings", async ({ page }) => {
    await gotoApp(page);
    await unlockDevByBadge(page);
    await openDevPane(page);

    await page.locator("#pref-mode3SpellingPolicy").selectOption("enharmonic");
    await page.locator("#dev-runMode3Enh").click();

    const report = page.locator("#dev-mode3Report");
    await expect(report).toBeVisible();
    const text = await report.inputValue();
    expect(text).toContain("MODE 3 TRUTH TABLE VERIFICATION (ENHARMONIC)");
    expect(text).toContain("PASS  Black key: enharmonic spelling  — should accept");
    expect(text).toContain("PASS  White key: E# for F  — should accept");
  });
});
