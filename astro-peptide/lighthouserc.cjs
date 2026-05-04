module.exports = {
  ci: {
    collect: {
      url: [
        'http://127.0.0.1:4321/',
        'http://127.0.0.1:4321/shop/',
        'http://127.0.0.1:4321/peptides/bpc-157/',
        'http://127.0.0.1:4321/catalog/',
        'http://127.0.0.1:4321/use-case/weight-loss/',
        'http://127.0.0.1:4321/blog/',
        'http://127.0.0.1:4321/de/',
        'http://127.0.0.1:4321/de/peptides/bpc-157/',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        // Targets per UPDATE_PLAN acceptance gate (Phase 2 checkpoint).
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Soft warnings for noisy CWV in CI environments.
        'first-contentful-paint': 'off',
        'largest-contentful-paint': 'off',
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
