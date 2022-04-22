module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#08376b',
        'accent': '#35c0ed'
      }
    },
    container: {
      padding: '1rem',
      center: true,
    },
    fontFamily: {
      'display': [ 'system-ui', 'sans-serif'],
      'body': [ 'system-ui', 'sans-serif'],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '1400px',
          },
          '@screen md': {
            maxWidth: '1400px',
          },
          '@screen lg': {
            maxWidth: '1400px',
          },
          '@screen xl': {
            maxWidth: '1400px',
          },
        }
      })
    }
  ],
}
