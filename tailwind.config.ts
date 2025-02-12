import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,vue,ts,css}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
} satisfies Config;
