/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jet: ['"JetBrains Mono"', 'monospace'],
        title: ['"Barlow Condensed"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
