import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        scada: {
          bg: "#0A0E1A",
          surface: "#1A1D23",
          border: "#2A2D35",
          text: "#E0E0E0",
          muted: "#8A8D95",
        },
        accent: {
          blue: "#00B4D8",
          green: "#00E676",
          orange: "#FF6D00",
          cyan: "#00E5FF",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "IBM Plex Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 180, 216, 0.3)",
        "glow-green": "0 0 20px rgba(0, 230, 118, 0.3)",
        "glow-orange": "0 0 20px rgba(255, 109, 0, 0.3)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 2s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 180, 216, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(0, 180, 216, 0.5)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
