import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      pixel: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
    },
    extend: {
      // High-contrast theme tokens consumed via utility classes like text-high
      colors: {
        high: 'var(--color-text-high)',
        elevated: 'var(--color-bg-elevated)',
      },
    },
  },
  plugins: [],
} satisfies Config;
