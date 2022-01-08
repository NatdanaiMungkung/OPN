const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#5882E3',
      'light-blue': '#254870',
      'lighter-blue': '#86aad4',
      'yellow': '#ffc107',
      'red': '#dc3545',
      'white': '#fff',
      'background': '#012d5e'
    },
    extend: {
      fontFamily: {
        sans: ['Roboto Slab', ...defaultTheme.fontFamily.sans],
        fancy: ['Roboto Slab']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};