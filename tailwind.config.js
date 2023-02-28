/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '8px',
				md: '16px',
			},
		},
		extend: {
			fontFamily: {
				lato: ['Lato', 'sans-serif']
			},
			colors: {
				blue: '#1074EB',
				orange: '#FF9900',
				red: '#E92626',
				graystrong: '#9C9C9C',
				lightgray: '#F7F7F7',
				gray: '#C9C9C9',
				dark: '#383838',
			},
		},
	},
	plugins: [],
}
