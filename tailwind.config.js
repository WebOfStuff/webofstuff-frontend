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
        mytheme: { // custom theme
          // other colors
        }
      },
      'dark', // and some pre-defined theme
      'forest',
      'synthwave'
    ],
  },
}
