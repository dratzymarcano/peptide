/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Aligned with DESIGN_SPEC §3 + design-system.css tokens
				ink:        '#0F172A',
				'ink-2':    '#334155',
				'ink-3':    '#64748B',
				surface:    '#FFFFFF',
				'surface-2':'#F8FAFC',
				border:     '#E2E8F0',
				'border-strong': '#CBD5E1',
				primary: {
					DEFAULT: '#005B8C',
					50:  '#E6F1F8',
					600: '#00496F',
				},
				success: '#0F7B3F',
				warning: '#B45309',
				danger:  '#B42318',
				info:    '#0B5FB7',
			},
			fontFamily: {
				sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
			},
			fontSize: {
				xs:   ['0.75rem',   { lineHeight: '1.4' }],
				sm:   ['0.875rem',  { lineHeight: '1.5' }],
				base: ['1rem',      { lineHeight: '1.6' }],
				lg:   ['1.125rem',  { lineHeight: '1.6' }],
				xl:   ['1.25rem',   { lineHeight: '1.4' }],
				'2xl':['1.5rem',    { lineHeight: '1.3' }],
				'3xl':['1.875rem',  { lineHeight: '1.2' }],
				'4xl':['2.25rem',   { lineHeight: '1.15' }],
				'5xl':['3rem',      { lineHeight: '1.1' }],
			},
			borderRadius: {
				sm:   '4px',
				md:   '6px',
				lg:   '12px',
				pill: '999px',
			},
			boxShadow: {
				1: '0 1px 2px rgb(15 23 42 / 0.06)',
				2: '0 8px 24px rgb(15 23 42 / 0.08)',
				3: '0 24px 48px rgb(15 23 42 / 0.16)',
			},
			maxWidth: {
				container: '1280px',
				prose: '72ch',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
}
