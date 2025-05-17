/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all source files
  ],
  theme: {
    extend: {
      colors: {
        core: {
          primary: "#533B4D",
          "primary-light": "#d4c3cc		",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#f1f5f9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3BB",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        supporting: {
          warning: "#FDB22F",
          "warning-light": "#FFF9EF",
          error: "#D12E24",
          "error-light": "#FBEFEF",
          success: "#317D35",
          "success-light": "#EFF5EF",
          info: "#146DFC",
          "info-light": "#EFF1F5",
        },
        shade: {
          light: "#FFFFFF",
          dark: "#000000",
        },
        message: "#808080",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
