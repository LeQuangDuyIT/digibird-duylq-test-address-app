/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7B015'
      },
      dropShadow: {
        'logo-hover': '0 0 2em #646cffaa'
      },
      boxShadow: {
        'address-card': '0 1px 1px #091e4240, 0 0 1px #091e424f'
      }
    }
  },
  plugins: []
};
