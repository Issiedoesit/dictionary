/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color": "var(--color-primary)",
        "theme-text-color": "var(--text-theme)",
        "text-color-light-theme": "var(--text-light-theme)",
        "text-color-dark-theme": "var(--text-dark-theme)",
      },
      fontFamily:{
        "Raleway":'["Raleway", "sans-serif"]'
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '35': 'repeat(35, minmax(0, 1fr))',
        '51': 'repeat(51, minmax(0, 1fr))',
        '70': 'repeat(70, minmax(0, 1fr))',
        'footer': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}