import { test, expect } from '@playwright/test';

/**
 * Mobile UX & Header Tests
 * Run with: npx playwright test tests/mobile-ux.spec.ts --project=mobile
 */

test.describe('Mobile Header & Drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X/11/12/13 Mini size

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header should only show logo and hamburger on mobile', async ({ page }) => {
    const logo = page.locator('header a[href="/"]'); // Adjust selector as needed
    const hamburger = page.locator('button[aria-controls="mobile-menu"]');
    const desktopSearch = page.locator('.header-search:not(.mobile-menu *)'); // Adjust
    const desktopLang = page.locator('.language-switch:not(.mobile-menu *)');

    await expect(logo).toBeVisible();
    await expect(hamburger).toBeVisible();
    await expect(desktopSearch).not.toBeVisible();
    await expect(desktopLang).not.toBeVisible();
  });

  test('hamburger menu should open and show interactions', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-menu"]');
    const menu = page.locator('#mobile-menu');

    // Initial state: closed
    await expect(menu).not.toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await hamburger.click();
    await expect(menu).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    
    // Check for focus trap / accessibility
    // (This requires a more complex check, typically checking document.activeElement)
  });

  test('drawer should contain translation and search', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-menu"]');
    await hamburger.click();

    const mobileSearch = page.locator('#mobile-menu input[type="search"]'); // Adjust selector
    const mobileLang = page.locator('#mobile-menu .language-options'); // Adjust selector

    await expect(mobileSearch).toBeVisible();
    await expect(mobileLang).toBeVisible();
  });

  test('menu should close on ESC key', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-menu"]');
    const menu = page.locator('#mobile-menu');

    await hamburger.click();
    await expect(menu).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  test('touch targets should be large enough', async ({ page }) => {
    // Check hamburger size
    const hamburger = page.locator('button[aria-controls="mobile-menu"]');
    const box = await hamburger.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(48);
    expect(box?.height).toBeGreaterThanOrEqual(48);
  });
});
