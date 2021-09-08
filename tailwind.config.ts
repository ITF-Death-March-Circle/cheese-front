module.exports = {
  mode: 'jit',
  purge: {
    content: [
      `components/**/*.{vue,js,ts}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: { max: '481px' },
      md: { min: '897px' },
      lg: { min: '1025px' },
      xl: { min: '1441px' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
