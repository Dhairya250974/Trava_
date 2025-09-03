/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				BaseColor: "#B71C1C",
				BHoverColor: "#8B0000",
				GrayColor: "#6B7280",
			},
			fontFamily: {
				cursiveFont: ["Satisfy", "cursive"],
				paraFont: ["Montserrat", "ui-sans-serif", "system-ui"],
			},
		},
	},
	plugins: [],
};
