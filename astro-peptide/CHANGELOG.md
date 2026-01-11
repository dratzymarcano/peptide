# Changelog

## [Unreleased] - 2026-01-11

### Added
- **Mobile Drawer Navigation**: New `mobile-menu` implementation in `Header.astro`.
  - Captures "Search", "Language", "Account", and "Cart" controls from the header.
  - Implements `dialog` role with `aria-modal="true"`.
  - Added interaction script for Focus Trap and Scroll Locking.
- **Design System Tokens** (`src/styles/tokens.css`):
  - Defined CSS variables for 8px grid (`--space-2`, `--space-4`, etc.).
  - Added Touch Target tokens (`--touch-min: 48px`).
  - Added Motion tokens (`--ease-standard`, durations).
- **Automated Tests**: Added `tests/mobile-ux.spec.ts` for Playwright testing of the mobile header.
- **Documentation**: Added `QA_CHECKLIST.md` for release verification.

### Changed
- **Header Layout**:
  - **Mobile**: Simplified to Logo + Hamburger only.
  - **Desktop**: Preserved existing full layout but optimized spacing.
- **Layout.astro**: Linked `tokens.css` globally.
- **Repo Hygiene**: Updated `.gitignore` to exclude `dist/`, `.astro/`, and `.wrangler/` artifacts.

### Fixed
- **Mobile Spacing**: Applied variable-based padding to ensure no "choked up" content.
- **Accessibility**: Added `aria-expanded` and `aria-controls` to the hamburger trigger.
- **Build Configuration**: Removed tracking of generated build files to keep git history clean.
