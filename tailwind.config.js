/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0b0e14",
        panelDark: "#111622",
        neonCyan: "#00f0ff",
        neonBlue: "#0072ff",
      },
      boxShadow: {
        neumorphicInset: "inset 4px 4px 8px #06080c, inset -4px -4px 8px #1c2438",
        neumorphicOut: "6px 6px 14px #05070a, -6px -6px 14px #1d253a",
        neonGlow: "0 0 20px rgba(0, 240, 255, 0.35)",
      },
    },
  },
  plugins: [],
};
