import { createTheme, ThemeOptions } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark" = "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: { main: "#90caf9" },
            secondary: { main: "#f48fb1" },
            background: {
              default: "#101624",
              paper: "rgba(30,34,44,0.85)",
            },
            text: {
              primary: "#e3eafc",
              secondary: "#b0b8c1",
            },
          }
        : {
            primary: { main: "#1976d2" },
            secondary: { main: "#d81b60" },
            background: {
              default: "#f0f2f5",
              paper: "rgba(235,238,240,0.9)",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "#666",
            },
          }),
    },
    // Use Google Sans as the primary font for the entire app (with sensible fallbacks)
    typography: {
      fontFamily:
        '"Google Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
    },
    shape: { borderRadius: 18 },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    components: {
      // Ensure Paper uses the palette's paper color and correct text color,
      // avoid forced white overlays that cause black text issues.
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            backdropFilter: "blur(12px) saturate(160%)",
            // Use the theme background.paper (so dark/light modes behave correctly)
            background: theme.palette.background.paper,
            // Ensure text inside Papers inherits the theme text color
            color: theme.palette.text.primary,
            transition: "background 0.3s, box-shadow 0.3s",
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            transition: "background 0.3s, box-shadow 0.3s",
            background:
              theme.palette.mode === "dark"
                ? "rgba(20,20,20,0.6)"
                : "rgba(255,255,255,0.8)",
            color: theme.palette.text.primary,
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            borderRadius: 18,
            transition: "background 0.3s, color 0.3s",
            // Use contained buttons with the primary palette by default
            "&.MuiButton-contained": {
              boxShadow: theme.shadows[2],
            },
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // Provide a robust default so any leftover plain text remains readable
            color: mode === "dark" ? "#e6eefc" : "#1a1a1a",
            backgroundColor: mode === "dark" ? "#0f1724" : "#f0f2f5",
            // Ensure Google Sans is respected everywhere
            fontFamily:
              '"Google Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
        },
      },
    },
  } as ThemeOptions);
