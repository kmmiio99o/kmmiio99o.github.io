import { createTheme, ThemeOptions } from "@mui/material/styles";

const MONO_FONT = '"Google Sans Variable", "Google Sans", system-ui, sans-serif';
const UI_FONT = '"Google Sans Variable", "Google Sans", system-ui, sans-serif';

export const getTheme = (mode: "light" | "dark" = "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: "#00ff41",
              light: "#69ff97",
              dark: "#00c930",
              contrastText: "#0a0a0a",
            },
            secondary: {
              main: "#00bcd4",
              light: "#4dd0e1",
              dark: "#00838f",
              contrastText: "#0a0a0a",
            },
            error: {
              main: "#ff1744",
              light: "#ff616f",
              dark: "#c4001d",
            },
            warning: {
              main: "#ff9100",
              light: "#ffc046",
              dark: "#c56200",
            },
            info: {
              main: "#448aff",
              light: "#83b9ff",
              dark: "#0054cb",
            },
            success: {
              main: "#00e676",
              light: "#66ffa6",
              dark: "#00b248",
            },
            background: {
              default: "#0a0a0a",
              paper: "#121220",
            },
            text: {
              primary: "#e0e0e0",
              secondary: "#808090",
            },
            divider: "#2a2a3e",
            action: {
              hover: "rgba(0, 255, 65, 0.08)",
              selected: "rgba(0, 255, 65, 0.12)",
              disabled: "rgba(255, 255, 255, 0.3)",
              disabledBackground: "rgba(255, 255, 255, 0.12)",
            },
          }
        : {
            primary: {
              main: "#00875a",
              light: "#33a67a",
              dark: "#005c3d",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#00838f",
              light: "#4fb3bf",
              dark: "#005662",
              contrastText: "#ffffff",
            },
            error: {
              main: "#d32f2f",
              light: "#ef5350",
              dark: "#c62828",
            },
            warning: {
              main: "#ef6c00",
              light: "#ff9800",
              dark: "#e65100",
            },
            info: {
              main: "#1565c0",
              light: "#1e88e5",
              dark: "#0d47a1",
            },
            success: {
              main: "#2e7d32",
              light: "#4caf50",
              dark: "#1b5e20",
            },
            background: {
              default: "#f0f0f0",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a2e",
              secondary: "#555566",
            },
            divider: "#d0d0d8",
            action: {
              hover: "rgba(0, 135, 90, 0.08)",
              selected: "rgba(0, 135, 90, 0.12)",
              disabled: "rgba(0, 0, 0, 0.38)",
              disabledBackground: "rgba(0, 0, 0, 0.12)",
            },
          }),
    },
    typography: {
      fontFamily: UI_FONT,
      h1: {
        fontFamily: MONO_FONT,
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.2,
        letterSpacing: "-0.5px",
      },
      h2: {
        fontFamily: MONO_FONT,
        fontWeight: 700,
        fontSize: "1.5rem",
        lineHeight: 1.25,
      },
      h3: {
        fontFamily: MONO_FONT,
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: MONO_FONT,
        fontWeight: 600,
        fontSize: "1.1rem",
        lineHeight: 1.35,
      },
      h5: {
        fontFamily: MONO_FONT,
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: 1.4,
      },
      h6: {
        fontFamily: MONO_FONT,
        fontWeight: 600,
        fontSize: "0.9rem",
        lineHeight: 1.45,
      },
      body1: {
        fontFamily: UI_FONT,
        fontSize: "0.9rem",
        lineHeight: 1.6,
      },
      body2: {
        fontFamily: UI_FONT,
        fontSize: "0.8rem",
        lineHeight: 1.5,
      },
      button: {
        fontFamily: MONO_FONT,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.8rem",
      },
      caption: {
        fontFamily: MONO_FONT,
        fontSize: "0.7rem",
        lineHeight: 1.33,
      },
      overline: {
        fontFamily: MONO_FONT,
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
      },
      code: {
        fontFamily: MONO_FONT,
      },
    },
    shape: {
      borderRadius: 8,
    },
    transitions: {
      duration: {
        shortest: 100,
        shorter: 150,
        short: 200,
        standard: 250,
        complex: 350,
        enteringScreen: 200,
        leavingScreen: 150,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            scrollbarWidth: "thin",
          },
          "*::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "*::-webkit-scrollbar-thumb": {
            background: mode === "dark" ? "rgba(0,255,65,0.2)" : "rgba(0,135,90,0.2)",
            borderRadius: "3px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            background: mode === "dark" ? "rgba(0,255,65,0.35)" : "rgba(0,135,90,0.35)",
          },
          body: {
            margin: 0,
            padding: 0,
            overflow: "hidden",
            fontFamily: UI_FONT,
            backgroundColor: mode === "dark" ? "#0a0a0a" : "#f0f0f0",
            color: mode === "dark" ? "#e0e0e0" : "#1a1a2e",
          },
          "#root": {
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          },
          "::selection": {
            backgroundColor: mode === "dark" ? "rgba(0,255,65,0.3)" : "rgba(0,135,90,0.3)",
            color: mode === "dark" ? "#00ff41" : "#00875a",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: mode === "dark" ? "#121220" : "#ffffff",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${mode === "dark" ? "#2a2a3e" : "#d0d0d8"}`,
            borderRadius: 12,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
            fontFamily: MONO_FONT,
            fontSize: "0.8rem",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: `0 0 20px ${mode === "dark" ? "rgba(0,255,65,0.2)" : "rgba(0,135,90,0.2)"}`,
            },
          },
          outlined: {
            borderWidth: "1px",
            "&:hover": {
              borderWidth: "1px",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: MONO_FONT,
            fontWeight: 600,
            fontSize: "0.7rem",
            borderRadius: 6,
            height: 26,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: MONO_FONT,
            fontSize: "0.7rem",
            backgroundColor: mode === "dark" ? "#1a1a2e" : "#333",
            border: `1px solid ${mode === "dark" ? "#2a2a3e" : "#555"}`,
            borderRadius: 4,
          },
        },
      },
    },
  } as ThemeOptions);

export const DESKTOP_APP_HEIGHT = 32;
export const DOCK_HEIGHT = 68;
export const MOBILE_STATUS_BAR = 44;
export const MOBILE_TAB_BAR = 80;
