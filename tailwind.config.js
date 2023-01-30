/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

// tailwind.config.js
function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

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
                primary: withOpacity("--color-primary"),
                ally: withOpacity("--color-ally")
            },
        },
    },
    plugins: [],
};
