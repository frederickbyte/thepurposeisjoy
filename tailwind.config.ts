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
        defaultText: '#000000',
        golden: '#FFDD55',
        pastelBlue: 'rgba(83,143,247, 0.6)',
        pastelBlueHover: 'rgba(83,143,247, 0.4)',
        pastelGrey: 'rgba(202, 210, 212, 1)',
        pastelGreyHover: 'rgba(202, 210, 212, 0.8)',
        pastelYellow: 'rgba(242, 227, 155, 1)',
        pastelYellowHover: 'rgba(242, 227, 155, 0.8)',
      },
      fontFamily: {
        sansSerif: ['var(--font-inter)', 'sans-serif'],
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
