/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#091A23",
        customcolorred: "#FF4438",
        customColorYellow: "#DCF81E",
        customColorbeige: "#E3F2FD",
        customcolorwarmgray: "#F5F5F5",
        customcolorredHover: "#f01304",
      },
      screens: {
        xs: "370px",
      },
    },
  },
  plugins: [],
};
