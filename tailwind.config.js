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
        "map-minimize": "2px 2px 4px rgba(0, 0, 0, 0.15)",
      },
      boxShadow: {
        tooltip: "2px 2px 4px 0px rgba(0, 0, 0, 0.15)",
        "pole-view": "2px 2px 4px 0px rgba(0, 0, 0, 0.1)",
        "zoomed-box": "0.2px 0.2px 0.5px 0px rgba(0, 0, 0, 0.10)",
        "filter-area": "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
        "device-data": "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
        dropdown: "2px 2px 3px 0px rgba(0, 0, 0, 0.15)",
        "pole-filter": "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
      },
      textColor: {
        primary: "rgba(22, 22, 22, 0.6)",
        "primary-hard": "rgba(22, 22, 22, 1.0)",
      },
      borderColor: {
        default: "#5B5B5B80",
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
        lora: "#D175BD",
        cellular: "#676DFF",
        unknown: "#686868",

        // ALERT COLORS
        "alert-high": "#EE4722",
        "alert-meduim": "#FFBB00",
        "alert-low": "#003033",

        "radio-button": "#5B5B5B",
        // map zoomed tooltip bg

        // SIDEBAR COLORS
        customSideColor: "#3B3C4F",

        popUpHoverColor: "#D9D9D9",

        // POLEVIEW COLORS
        poleViewRed: "#C93B54",
        poleViewGreed: "#2CB369",
        poleViewBlue: "#3569E7",
        poleViewTextLight: "#16161680",
      },
      backgroundColor: {
        "map-zoomed-box": "rgba(22, 22, 22, 0.70)",
      },
    },
  },
  plugins: [],
};
