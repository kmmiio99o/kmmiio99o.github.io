import { createTheme, ThemeOptions } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark" = "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: "#D7B9AE",
              light: "#EAD9D2",
              dark: "#A57865",
              contrastText: "#2D2A26",
            },
            secondary: {
              main: "#B29685",
              light: "#D1C0B4",
              dark: "#8A6A56",
              contrastText: "#FFFFFF",
            },
            background: {
              default: "#1B1917",
              paper: "#24211E",
            },
            text: {
              primary: "#F2EFEA",
              secondary: "#B5AFA8",
            },
            divider: "#3D3834",
          }
        : {
            // light mode
            primary: {
              main: "#A57865",
              light: "#D7B9AE",
              dark: "#8A6A56",
              contrastText: "#FFFFFF",
            },
            secondary: {
              main: "#8A6A56",
              light: "#B29685",
              dark: "#6D5242",
              contrastText: "#FFFFFF",
            },
            background: {
              default: "#F5F3F0",
              paper: "#FFFFFF",
            },
            text: {
              primary: "#2D2A26",
              secondary: "#5A544E",
            },
            divider: "#E0DAD4",
          }),
    },
    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.25rem",
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        fontSize: "1.875rem",
        lineHeight: 1.25,
      },
      h3: {
        fontWeight: 700,
        fontSize: "1.5rem",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.35,
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: 1.45,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.43,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.875rem",
      },
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.33,
      },
    },
    // Reduced border radius for Material 3 style
    shape: {
      borderRadius: 8,
    },
    transitions: {
      duration: {
        shortest: 100,
        shorter: 150,
        short: 200,
        standard: 250,
        complex: 300,
        enteringScreen: 200,
        leavingScreen: 150,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            // Removed blur effects for cleaner Material 3 look
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            backgroundImage: "none", // Ensure no gradients
            transition: "background-color 200ms, box-shadow 200ms",
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 12, // Slightly more rounded than other elements
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: "none",
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            borderRadius: 6, // Sharp corners for Material 3
            fontWeight: 600,
            fontSize: "0.875rem",
            transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            "&.MuiButton-contained": {
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              },
            },
            "&.MuiButton-outlined": {
              borderWidth: "1px",
            },
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            borderRadius: 6,
            fontWeight: 500,
            "&.MuiChip-filled": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.06)",
            },
          }),
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: ({ theme }: any) => ({
            border: `2px solid ${theme.palette.background.paper}`,
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            borderColor: theme.palette.divider,
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            borderRadius: 6,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.03)",
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }: any) => ({
            borderRadius: 6,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: ({ theme }: any) => ({
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
            fontFamily:
              '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            transition: "background-color 200ms, color 200ms",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(0, 0, 0, 0.05)",
            },
            "&::-webkit-scrollbar-thumb": {
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
          }),
        },
      },
    },
  } as ThemeOptions);
