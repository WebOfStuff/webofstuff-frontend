module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}",],
  plugins: [
    require('daisyui'),
  ],
  safelist: [
    'bg-accent',
    'text-accent-content',
    'bg-neutral',
    'text-neutral-content',
    'bg-info',
    'text-info-content',
    'bg-success',
    'text-success-content',
    'bg-warning',
    'text-warning-content',
    'bg-error',
    'text-error-content',
    'bg-base-100',
    'text-base-100-content',
  ]
}
