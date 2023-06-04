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
          "primary": "#9cafec",
          "secondary": "#c084fc",
          "accent": "#dd8052",
          "neutral": "#6b7280",
          "base-100": "#1f2937",
          "base-200": "#253141",
          "base-300": "#4a617d",
          "info": "#63b9f2",
          "success": "#2bdaa8",
          "warning": "#f8a649",
          "error": "#e77485",
        },
      },
    ]
  }
};
