/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground:  "#0b0b0e",
        surface: "#111118",
        bg:      "#0b0b0e",      // legacy alias
        card:    "#111118",      // legacy alias
        fg:      "#ffffff",
        muted:   "#5a5a6c",
        accent:  "#2563eb",
        // legacy aliases
        gold:    "#2563eb",
        blue:    "#2563eb",
        purple:  "#2563eb",
      },
      fontFamily: {
        sans:    ["var(--font-ui)",      "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia",   "serif"],
        heading: ["var(--font-display)", "Georgia",   "serif"],  // legacy alias
        ui:      ["var(--font-ui)",      "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter:  "-0.035em",
      },
    },
  },
  plugins: [],
};
