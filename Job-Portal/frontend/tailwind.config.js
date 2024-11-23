module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add paths to all your template files
  ],
  theme: {
    extend: {
      // Custom Colors (Primary, Secondary, etc.)
      colors: {
        primary: "#9b59b6", // Light purple (Primary Color)
        secondary: "#6a1b9a", // Dark purple (Secondary Color)
        accent: "#f1c40f", // Yellow (Accent Color)
        black: "#000000", // Black (Text and Dark Background)
        white: "#ffffff", // White (Background or Text)
        gray: {
          100: "#f7f7f7",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#888888",
        },
      },
      // Custom Shadows for elements
      boxShadow: {
        default: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        light: "0px 4px 6px rgba(155, 89, 182, 0.3)", // Light purple shadow
        dark: "0px 4px 8px rgba(0, 0, 0, 0.4)", // Dark shadow
      },
      // Custom Borders
      borderColor: {
        primary: "#9b59b6", // Primary color for borders
        secondary: "#6a1b9a", // Secondary color for borders
      },
      // Transition Settings
      transitionDuration: {
        400: "400ms",
      },
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
        all: "all", // Transition everything
      },
      // Text transformations
      textTransform: ["uppercase", "lowercase", "capitalize"],
    },
  },
  plugins: [],
};
