import { extendTheme } from "native-base";

const theme = extendTheme({
  fontConfig: {
    Nunito: {
      100: {
        normal: "Nunito-Light",
        italic: "Nunito-LightItalic",
      },
      200: {
        normal: "Nunito-Light",
        italic: "Nunito-LightItalic",
      },
      300: {
        normal: "Nunito-Light",
        italic: "Nunito-LightItalic",
      },
      400: {
        normal: "Nunito-Regular",
        italic: "Nunito-Italic",
      },
      500: {
        normal: "Nunito-Medium",
      },
      600: {
        normal: "Nunito-Medium",
        italic: "Nunito-MediumItalic",
      },

      700: {
        normal: "Nunito-Bold",
      },
      800: {
        normal: "Nunito-Bold",
        italic: "Nunito-BoldItalic",
      },
      900: {
        normal: "Nunito-Bold",
        italic: "Nunito-BoldItalic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Nunito",
    body: "Nunito",
    mono: "Nunito",
  },
  colors: {
    primary: {
      50: "#fffddb",
      100: "#fff3ad",
      200: "#ffe77e",
      300: "#fdd74c",
      400: "#fdc41c",
      500: "#fdc521",
      600: "#b19c00",
      700: "#7e7700",
      800: "#4c4d00",
      900: "#1c1c00",
    },
    secondary: {
      50: "#e8f5ff",
      100: "#c4dbef",
      200: "#9fbedf",
      300: "#7aa1d2",
      400: "#5482c4",
      500: "#3c64ab",
      600: "#2F3C73",
      700: "#1C2E55",
      800: "#11223c",
      900: "#020d19",
    },
  },
});

export default theme;
