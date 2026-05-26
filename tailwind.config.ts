import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // Navy Dark
        panel: "#1e293b",     // Slate Panel
        accent: "#06b6d4",    // Cyan Accent
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
};
export default config;
