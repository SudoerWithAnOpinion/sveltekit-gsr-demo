/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'atento-primary-blue': '#01426a',
        'atento-primary-orange': '#ff7900',
        'atento-secondary-blue-1': '#9bcbeb',
        'atento-secondary-blue-2': '#00a4e0',
        'atento-secondary-blue-3': '#007cba',
        'atento-secondary-blue-4': '#00548c',
        'atento-secondary-grey-1': '#000000',
        'atento-secondary-grey-2': '#d0d0d0',
        'atento-secondary-grey-3': '#9d9d9d',
        'atento-secondary-grey-4': '#636363',
        'atento-tertiary-1': '#228847',
        'atento-tertiary-2': '#00b2a9',
        'atento-tertiary-3': '#b6bf10',
      }
    },
    fontFamily: {
      'display': ['Omnes'],
      'body': ['Calibri'],
      'sans': ['Calibri']
    }
  },
  plugins: []
};
