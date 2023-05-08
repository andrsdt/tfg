import { COLORS } from './src/constants/colors';

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.tsx'],
  theme: {
    // Colors defined in src/constants/colors.ts
    colors: COLORS,
    extend: {
      fontFamily: {
        lato: ['Lato'],
      },
      boxShadow: {
        't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        't-md':
          '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        't-lg':
          '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};