/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#091A23",
        customcolorred: "#FF4438",
      },
    },
  },
  plugins: [],
};
