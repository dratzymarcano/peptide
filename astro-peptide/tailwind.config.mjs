/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#0f2d52', // Deep Medical Blue
				secondary: '#334155', // Slate 700
				accent: '#00bfa5', // Medical Teal
        surface: '#f8fafc', // Clinical White
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'], // For authority
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
}
