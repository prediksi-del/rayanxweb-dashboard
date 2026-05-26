import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#080810",
          card: "#0d0d1e",
          input: "#05050a",
          cyan: "#00f0ff",
          purple: "#bd00ff",
          green: "#39ff14",
          red: "#ff0055",
          yellow: "#ffcc00",
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 240, 255, 0.45), inset 0 0 10px rgba(0, 240, 255, 0.15)",
        "glow-purple": "0 0 20px rgba(189, 0, 255, 0.45), inset 0 0 10px rgba(189, 0, 255, 0.15)",
        "glow-green": "0 0 20px rgba(57, 255, 20, 0.45)",
        "neumorphism-card": "8px 8px 20px #030307, -8px -8px 20px #131327",
        "inset-cyber": "inset 3px 3px 8px #020205, inset -3px -3px 8px #101022",
      },
      backgroundImage: {
        "glass-panel": "linear-gradient(145deg, rgba(13, 13, 30, 0.75) 0%, rgba(5, 5, 12, 0.9) 100%)",
        "cyber-gradient": "linear-gradient(90deg, #00f0ff 0%, #bd00ff 100%)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
