import { test, expect } from '@playwright/test';

const SNAPSHOTS = [
  { name: 'home', path: '/' },
  { name: 'shop', path: '/shop/' },
  { name: 'product', path: '/peptides/bpc-157/' },
  { name: 'catalog', path: '/catalog/' },
  { name: 'use-case', path: '/use-case/weight-loss/' },
  { name: 'blog', path: '/blog/' },
  { name: 'cart', path: '/cart/' },
  { name: 'home-de', path: '/de/' },
];

test.describe('visual regression', () => {
  for (const { name, path } of SNAPSHOTS) {
    test(`above-the-fold snapshot: ${name}`, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      // Mask volatile regions (cart count, dynamic timestamps) so visual diffs
      // are deterministic.
      const mask = [
        page.locator('[data-cart-count]'),
        page.locator('time'),
      ];
      await expect(page).toHaveScreenshot(`${name}-${testInfo.project.name}.png`, {
        fullPage: false,
        mask,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled',
      });
    });
  }
});
