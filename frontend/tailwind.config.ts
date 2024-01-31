import type { Config } from "tailwindcss";
// const colors = require('tailwindcss/colors')
import colors from "tailwindcss/colors";
const config: Config = {
  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '10px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      'white': {
        100: '#ffffff',
        200: '#C1C3C0',
      },
      'black': colors.black,
      'me-green': {
        100: '#83952B',
        200: '#C6DE41',
        300: '#060E02',
      },
      'red':colors.red,
      'green':colors.green,
      'gray': colors.gray,
      'blue': colors.blue,
      'neutral': colors.neutral,
      'slate': colors.slate,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'dashboard-gradient': 'linear-gradient(157deg, #131315 0%, rgba(26, 31, 55, 0.00) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
