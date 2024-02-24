import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-crimsonPro)', 'serif'],
        sans: ['var(--font-raleway)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-dark': 'hsl(var(--accent-dark) / <alpha-value>)',
        'accent-light': 'hsl(var(--accent-light) / <alpha-value>)',
      },

      typography: {
        lg: {
          css: {
            fontFamily: 'Crimson Pro variable',
            fontWeight: '300',
            p: {
              marginBottom: '1rem',
              color: 'hsl(var(--foreground))',
            },
            h1: {
              margin: 0,
            },
          },
        },
        red: {
          css: {
            '--tw-prose-counters': 'hsl(var(--accent))',
            '--tw-prose-bullets': 'hsl(var(--accent))',
            '--tw-prose-quote-borders': 'hsl(var(--accent))',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
