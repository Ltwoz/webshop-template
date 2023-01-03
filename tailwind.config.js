/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: ["IBM Plex Sans Thai", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#5c6ac4",
                secondary: "#05386b",
            },
        },
    },
    plugins: [],
};
