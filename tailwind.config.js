module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'mytheme': { // custom theme
          'primary' : "var(--primary)",
          'primary-focus' : "var(--primary-focus)",
          'primary-content' : "var(--primary-content)",
          // other colors
        },
        'myothertheme': { // custom theme
          'primary' : "var(--primary)",
          'primary-focus' : "var(--primary-focus)",
          'primary-content' : "var(--primary-content)",
          // other colors
        },
      },
      'dark', // and some pre-defined theme
      'forest',
      'synthwave'
    ],
  },
}
