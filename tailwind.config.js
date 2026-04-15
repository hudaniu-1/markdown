import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0a0a0a",
          raised: "#121212",
          muted: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Roboto", "PingFang SC", "sans-serif"],
        mono: ["ui-monospace", "Cascadia Code", "Consolas", "monospace"],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)",
      },
    },
  },
  plugins: [typography],
};
