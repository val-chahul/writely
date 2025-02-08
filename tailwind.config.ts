import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Include all files in src
  ],
  darkMode: ['class', 'media'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-slate-100': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        'grid-slate-800': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        editor: {
          surface: 'hsl(var(--editor-surface))',
          border: 'hsl(var(--editor-border))',
          input: 'hsl(var(--editor-input))',
          ring: 'hsl(var(--editor-ring))',
          background: 'hsl(var(--editor-background))',
          foreground: 'hsl(var(--editor-foreground))',
          muted: 'hsl(var(--editor-muted))',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-in',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-out': 'slide-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-bottom': 'slide-in-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'inner-xl': 'inset 0 2px 6px 0 rgb(0 0 0 / 0.07)',
        '3xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        premium: '0 4px 20px -1px rgb(0 0 0 / 0.1), 0 2px 8px -2px rgb(0 0 0 / 0.1)',
        'premium-lg': '0 8px 30px -3px rgb(0 0 0 / 0.15), 0 4px 12px -4px rgb(0 0 0 / 0.15)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            lineHeight: '1.8',
            color: 'hsl(var(--editor-foreground))',
            letterSpacing: '-0.01em',
            fontFeatureSettings: "'liga' 1, 'kern' 1",
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            '[class~="lead"]': {
              color: 'inherit',
            },
            strong: {
              color: 'inherit',
            },
            'ul > li::before': {
              backgroundColor: 'currentColor',
            },
            'ol > li::before': {
              color: 'inherit',
            },
            hr: {
              borderColor: 'currentColor',
              opacity: 0.3,
            },
            blockquote: {
              color: 'inherit',
              borderLeftColor: 'currentColor',
              borderRadius: '0 0.375rem 0.375rem 0',
              backgroundColor: 'rgb(243 244 246 / 0.1)',
              margin: '2rem 0',
              padding: '1rem 1.5rem',
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            'figure figcaption': {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
              fontWeight: '500',
              backgroundColor: 'rgb(243 244 246 / 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'a code': {
              color: 'inherit',
            },
            pre: {
              color: 'inherit',
              backgroundColor: 'rgb(17, 24, 39)',
              padding: '1.25rem',
              borderRadius: '0.5rem',
              margin: '2rem 0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              fontSize: '0.875em',
            },
            thead: {
              color: 'inherit',
              borderBottomColor: 'currentColor',
            },
            'tbody tr': {
              borderBottomColor: 'currentColor',
              opacity: 0.3,
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
