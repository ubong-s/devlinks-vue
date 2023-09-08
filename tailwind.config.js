/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'instrument-sans': `'Instrument Sans', sans-serif`
      },
      colors: {
        'primary-blue': '#633BFE'
      }
    }
  },
  plugins: []
}
