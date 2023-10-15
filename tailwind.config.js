/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FBC60C'
      },
      dropShadow: {
        'logo-hover': '0 0 2em #646cffaa'
      }
    }
  },
  plugins: []
};
