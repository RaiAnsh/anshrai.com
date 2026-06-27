/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#090909",
        card:      "#111111",
        secondary: "#171717",
        fg:        "#ffffff",
        muted:     "#888888",
        accent:    "#2563eb",
        // legacy aliases (used in remaining components)
        gold:      "#2563eb",
        blue:      "#2563eb",
        purple:    "#2563eb",
      },
      fontFamily: {
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        // legacy alias
        serif:   ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter:  "-0.035em",
      },
    },
  },
  plugins: [],
};
