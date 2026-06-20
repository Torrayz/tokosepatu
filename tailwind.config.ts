import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#0A0A0A',
        primary: '#0A0A0A',
        secondary: '#E8FF3A',
        muted: '#F5F5F5',
        border: '#E5E5E5',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-jakarta)'],
      },
      borderRadius: {
        card: '8px',
        button: '6px',
        badge: '999px',
      },
    },
  },
  plugins: [],
}

export default config
