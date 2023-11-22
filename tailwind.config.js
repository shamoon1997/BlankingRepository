/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Mont", "serif"],
      },
      dropShadow: {
        "map-dot": "0.8px 0.8px 2px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        tooltip: "2px 2px 4px 0px rgba(0, 0, 0, 0.15)",
        "pole-view": "2px 2px 4px 0px rgba(0, 0, 0, 0.1)",
        "zoomed-box": "0.2px 0.2px 0.5px 0px rgba(0, 0, 0, 0.10)",
      },
      colors: {
        // MAIN STYLEGUIDE
        sidebar: "#3B3C4F",
        "btn-primary": "#FF176B",
        "btn-secondary": "#89E3B4",

        // POLE STATUS COLORS
        offline: "#DF4C2B",
        spotty: "#F4B849",
        online: "#5BC760",

        // ALERT COLORS
        "alert-high": "#EE4722",
        "alert-meduim": "#FFBB00",
        "alert-low": "#003033",

        // map zoomed tooltip bg

        // SIDEBAR COLORS
        customSideColor: "#3B3C4F",

        popUpHoverColor: "#D9D9D9",
      },
      backgroundColor: {
        "map-zoomed-box": "rgba(22, 22, 22, 0.70)",
      },
    },
  },
  plugins: [],
};
