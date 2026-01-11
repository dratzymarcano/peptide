# QA Checklist & Deployment Guide

This document outlines the Quality Assurance (QA) steps, automated testing instructions, and deployment verification for the Mobile Redesign.

## 1. Automated Testing

We use [Playwright](https://playwright.dev/) for end-to-end testing of the mobile experience.

### Setup
If not already installed, install Playwright:
```bash
npm init playwright@latest
# Choose "Typescript" and "tests" folder when prompted, or manually configure.
```

### Running Tests
Run the mobile-focused test suite:
```bash
# Run specifically the mobile UX tests
npx playwright test tests/mobile-ux.spec.ts --project="Mobile Chrome"

# Run in UI mode to see the tests execute
npx playwright test tests/mobile-ux.spec.ts --ui
```

### Test Coverage
- **Header Visibility**: Verifies only Logo + Hamburger exist on mobile (Search/Lang hidden).
- **Drawer Interaction**: Checks open/close, `aria-expanded` state.
- **Content Availability**: Ensures Search and Language controls are inside the drawer.
- **Accessibility**: Verifies ESC key closure and focus management.
- **Touch Targets**: Checks min 48x48px size for interactive elements.

## 2. Manual QA Checklist

### Mobile Header & Drawer
- [ ] **Viewport Check**: Resize browser to 320px, 375px, 412px. Header remains stable.
- [ ] **Spacing**: Verify 16px padding on left/right edges.
- [ ] **Tap Targets**: Verify Hamburger button is easily tappable (hit area > 48px).
- [ ] **Animation**: Menu slides/fades in smoothly; no jank.
- [ ] **Scroll Lock**: Background (body) does not scroll when menu is open.
- [ ] **Focus Management**: 
    - [ ] Tab into menu when opened.
    - [ ] Tab cycle allows reaching all menu items.
    - [ ] Closing menu returns focus to the Hamburger button.

### Content & Layout
- [ ] **Typography**: Text is legible (min 16px base) without zooming.
- [ ] **Images**: Verify images adapt to width (`max-width: 100%`) and don't cause horizontal overflow.
- [ ] **Forms**: Inputs (Search) have legible font size (>16px) to prevent iOS auto-zoom.

### SEO & Performance (Lighthouse)
- [ ] **Run Lighthouse**: Open DevTools > Lighthouse. Select "Mobile".
- [ ] **Performance**: Score > 90 (Green).
- [ ] **Accessibility**: Score > 90.
- [ ] **Best Practices**: Score > 90.
- [ ] **SEO**: Score > 90.
- [ ] **Crawlability**: Check `robots.txt` allows crawling; Check Sitemap XML exists.

## 3. Deployment Instructions

### Cloudflare Pages
1. **Build Settings**:
   - **Framework Preset**: Astro
   - **Build Command**: `message: Build command detected as 'npm run build'`
   - **Output Directory**: `dist`
2. **Environment Variables**:
   - Ensure standard node vars are set if needed.
3. **Adapter Warnings**:
   - If you see `sharp` warnings: The project is configured to ignore basic sharp errors or use a compatible service. 
   - Ensure `astro.config.mjs` has the Cloudflare adapter enabled.

### Rollback Plan
If critical issues are found:
1. Revert the git commit: `git revert HEAD`
2. Push to `main`.
3. Cloudflare Pages will automatically deploy the previous version.

## 4. Visual Regression (Snapshot) Instructions
To update the "After" screenshots:
1. Run local dev: `npm run dev`
2. Open Chrome DevTools (Device Toolbar).
3. Set dimension: `375 x 812` (iPhone X). Capture screenshot.
4. Set dimension: `412 x 915` (Samsung/Pixel). Capture screenshot.
5. Save files to `docs/screenshots/after-mobile-menu.png`.
