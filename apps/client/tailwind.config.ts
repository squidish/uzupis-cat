import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      pixel: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
