import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#fffaed',
          100: '#fff4d4',
          200: '#ffe4a8',
          300: '#ffd071',
          400: '#ffb84c',
          500: '#fe9611',
          600: '#ef7b07',
          700: '#c65c08',
          800: '#9d490f',
          900: '#7e3d10',
          950: '#441c06',
        },
        secondary: {
          50: '#eef5ff',
          100: '#dae8ff',
          200: '#bdd8ff',
          300: '#90bfff',
          400: '#4c93ff',
          500: '#3577fc',
          600: '#1f56f1',
          700: '#1741de',
          800: '#1936b4',
          900: '#1a328e',
          950: '#152156',
        },
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}
export default config
