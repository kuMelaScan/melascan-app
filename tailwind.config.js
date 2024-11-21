/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: {
          DEFAULT: "#369EFF",
          100: "#ACD1E5",
        },
        black: {
          DEFAULT: "#000",
          100: "#141414",
        },
        gray: {
          100: "#E8EDF2",
        },
      },
      fontFamily: {
        mregular: ["Manrope-Regular", "sans-serif"],
        mbold: ["Manrope-Bold", "sans-serif"],
        msemibold: ["Manrope-SemiBold", "sans-serif"],
        mmedium: ["Manrope-Medium", "sans-serif"],
        mextrabold: ["Manrope-ExtraBold", "sans-serif"],
        mextralight: ["Manrope-ExtraLight", "sans-serif"],
        mlight: ["Manrope-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};