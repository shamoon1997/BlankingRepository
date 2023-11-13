/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        tooltip: "2px 2px 4px 0px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        // MAIN STYLEGUIDE
        sidebar: "#3B3C4F",
        "btn-primary": "#FF176B",
        "btn-secondary": "#89E3B4",

        // POLE STATUS COLORS
        offline: "#DF4C2B",
        spotty: "#F4B849",
        active: "#5BC760",

        // ALERT COLORS
        "alert-high": "#EE4722",
        "alert-meduim": "#FFBB00",
        "alert-low": "#003033",
      },
    },
  },
  plugins: [],
};
