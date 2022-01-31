module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'webofstuff': {
          'primary': '#ec731a',
          'primary-focus': '#1602ce',
          'primary-content': '#ffffff',
          'secondary': '#ffffff',
          'secondary-focus': '#1602ce',
          'secondary-content': '#ec731a',
          'accent': '#1602ce',
          'accent-focus': '#ec731a',
          'accent-content': '#ffffff',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
        },
      },
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}
