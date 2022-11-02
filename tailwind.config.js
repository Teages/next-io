module.exports = {
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    container: {
      center: true,
    }
  },
  daisyui: {
    themes: [
      {
        'ctd-dark': {
          'primary': '#9cafec',
          'secondary': '#ec9cd7',
          'accent': '#37CDBE',
          'neutral': '#374151',
          'base-100': '#1f2937',
          'info': '#38bdf8',
          'success': '#34d399',
          'warning': '#facc15',
          'error': '#f87171',
        },
        'ctd-light': {
          'primary': '#9cafec',
          'secondary': '#ec9cd7',
          'accent': '#37CDBE',
          'neutral': '#d1d5db',
          'base-100': '#e5e7eb',
          'info': '#38bdf8',
          'success': '#34d399',
          'warning': '#facc15',
          'error': '#f87171',
        }
      }
    ]
  }
};
