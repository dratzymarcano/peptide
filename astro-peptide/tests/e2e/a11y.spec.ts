import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'shop', path: '/shop/' },
  { name: 'product-bpc157', path: '/peptides/bpc-157/' },
  { name: 'catalog', path: '/catalog/' },
  { name: 'use-case-weight-loss', path: '/use-case/weight-loss/' },
  { name: 'blog', path: '/blog/' },
  { name: 'cart', path: '/cart/' },
  { name: 'checkout', path: '/checkout/' },
  { name: 'home-de', path: '/de/' },
  { name: 'product-bpc157-de', path: '/de/peptides/bpc-157/' },
];

test.describe('a11y (axe-core, WCAG 2.1 AA)', () => {
  for (const { name, path } of PAGES) {
    test(`no critical/serious axe violations: ${name}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const blocking = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }
});
