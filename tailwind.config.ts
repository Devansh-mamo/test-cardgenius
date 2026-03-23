/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        'custom': '0 0 100%'
      }
    },
    
  },
  corePlugins: {preflight: false},
  plugins: [],
}
