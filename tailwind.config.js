/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0909",
        fg: "#f0ede5",
        muted: "#706c69",
        gold: "#d4a84b",
        "gold-light": "#e8c070",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.035em",
      },
    },
  },
  plugins: [],
};
