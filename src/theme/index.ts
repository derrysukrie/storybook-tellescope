import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    successDark: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    successDark?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    tertiary: true;
    successDark: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A5C92",
      dark: "#132D68",
      light: "#798ED0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#585E72",
      dark: "#2C303E",
      light: "#8C90A1",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      main: "#745471",
      contrastText: "#FFFFFF",
      dark: "#3F293E",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--primary-main": "#4A5C92",
          "--primary-dark": "#132D68",
          "--primary-light": "#798ED0",
          "--primary-stroke": "#132D68",
          "--primary-contrastText": "#FFFFFF",
          "--secondary-main": "#585E72",
          "--secondary-dark": "#2C303E",
          "--secondary-light": "#8C90A1",
          "--secondary-stroke": "#2C303E",
          "--secondary-contrastText": "#FFFFFF",
          "--tertiary-main": "#745471",
          "--tertiary-contrastText": "#FFFFFF",
          "--tertiary-dark": "#3F293E",
          "--tertiary-stroke": "#3F293E",
          "--progress-color": "#798ED0",
        },
      },
    },
  },
});

export default theme;
