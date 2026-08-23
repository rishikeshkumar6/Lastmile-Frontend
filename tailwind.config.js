/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "loading-bar": "loading-bar 2s ease-in-out infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        "loading-bar": {
          "0%": { width: "0%" },
          "50%": { width: "75%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
