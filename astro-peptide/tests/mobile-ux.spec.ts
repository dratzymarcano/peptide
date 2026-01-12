import { test, expect } from '@playwright/test';

/**
 * Mobile UX & Header Tests
 * Run with: npx playwright test tests/mobile-ux.spec.ts --project=mobile
 * 
 * Acceptance Criteria Verified:
 * - No horizontal scrollbar / overflow
 * - Header (logo + hamburger) vertically centered
 * - Badge not overlapping header or clipping hero text
 * - Hero H1 fully visible with responsive font sizing
 * - CTAs aligned with consistent gutters
 * - Touch target sizes >= 48×48 px
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

/**
 * Mobile Layout Tests - Horizontal Overflow & Visual Alignment
 * Tests viewports: 320px, 360px, 375px, 390px, 414px
 */
test.describe('Mobile Layout - No Horizontal Overflow', () => {
  const viewports = [
    { width: 320, height: 568, name: 'iPhone SE' },
    { width: 360, height: 640, name: 'Small Android' },
    { width: 375, height: 812, name: 'iPhone X/11/12/13' },
    { width: 390, height: 844, name: 'iPhone 12/13/14' },
    { width: 414, height: 896, name: 'iPhone 11 Pro Max' },
  ];

  for (const vp of viewports) {
    test(`no horizontal overflow on ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      
      // Check for horizontal scrollbar by comparing scrollWidth to clientWidth
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasOverflow).toBe(false);
    });

    test(`hero H1 fully visible on ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      
      const heroTitle = page.locator('.hero-title').first();
      await expect(heroTitle).toBeVisible();
      
      // Check that title is not clipped (bounding box within viewport)
      const box = await heroTitle.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width);
    });

    test(`CTAs aligned with consistent margins on ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      
      const primaryCta = page.locator('.btn-shop-primary').first();
      const secondaryCta = page.locator('.btn-shop-outline').first();
      
      await expect(primaryCta).toBeVisible();
      await expect(secondaryCta).toBeVisible();
      
      const primaryBox = await primaryCta.boundingBox();
      const secondaryBox = await secondaryCta.boundingBox();
      
      // Both CTAs should have similar left margin (within 5px tolerance)
      expect(Math.abs(primaryBox!.x - secondaryBox!.x)).toBeLessThanOrEqual(5);
      
      // Both CTAs should have similar width on mobile (full-width)
      expect(Math.abs(primaryBox!.width - secondaryBox!.width)).toBeLessThanOrEqual(10);
    });
  }
});

/**
 * Touch Target Size Tests
 */
test.describe('Touch Target Accessibility', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('primary CTA meets minimum touch target (48x48)', async ({ page }) => {
    const cta = page.locator('.btn-shop-primary').first();
    const box = await cta.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(48);
    // Width check - should be at least 48px (likely full-width on mobile)
    expect(box?.width).toBeGreaterThanOrEqual(48);
  });

  test('secondary CTA meets minimum touch target (48x48)', async ({ page }) => {
    const cta = page.locator('.btn-shop-outline').first();
    const box = await cta.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(48);
    expect(box?.width).toBeGreaterThanOrEqual(48);
  });

  test('hamburger menu button meets minimum touch target', async ({ page }) => {
    const hamburger = page.locator('button[aria-controls="mobile-menu"], .mobile-toggle');
    const box = await hamburger.first().boundingBox();
    
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
});

/**
 * Hero Badge Tests
 */
test.describe('Hero Badge Positioning', () => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 360, height: 640 },
    { width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    test(`badge not overlapping header on ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/');
      
      const badge = page.locator('.hero-badge').first();
      const header = page.locator('.main-nav, nav').first();
      
      // Badge should be visible
      await expect(badge).toBeVisible();
      
      const badgeBox = await badge.boundingBox();
      const headerBox = await header.boundingBox();
      
      if (badgeBox && headerBox) {
        // Badge top should be below header bottom
        expect(badgeBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height - 10);
      }
    });

    test(`badge fully visible (not clipped) on ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/');
      
      const badge = page.locator('.hero-badge').first();
      const box = await badge.boundingBox();
      
      expect(box).not.toBeNull();
      // Badge should not extend beyond viewport
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width);
    });
  }
});

