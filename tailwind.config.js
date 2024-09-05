import tailwindColors from '@shawnphoffman/pod-sites-common/tailwind'
import colors, { orange } from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./sanity/**/*.{js,ts,jsx,tsx,mdx}',
		'./utils/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				brand: {
					orange: colors.orange['600'],
					dark: colors.zinc['800'],
					gray: colors.zinc['600'],
					muted: colors.zinc['400'],
					fallback: colors.amber['700'],
					// red: colors.red['600'],
					// blue: colors.sky['400'],
					// yellow: colors.yellow['400'],
				},
			},
			backgroundImage: {
				squiggle: "url('/squiggle.svg')",
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: 0 },
					'100%': { transform: 1 },
				},
			},
			animation: {
				fadeInUp: '0.5s fadeInUp',
			},
		},
	},
	plugins: [tailwindColors.default],
}
