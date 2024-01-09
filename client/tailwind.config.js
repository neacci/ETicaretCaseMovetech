/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            "light",
            "dark",
            
            "cyberpunk",
            
            "forest",
            "aqua",
            "lofi",
            "pastel",
           
        ],
    },
}