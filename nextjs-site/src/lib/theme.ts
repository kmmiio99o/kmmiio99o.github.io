import { createTheme, ThemeOptions } from "@mui/material/styles";

// Material You color palette
export const materialYouColors = {
  light: {
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#21005D",
    secondary: "#625B71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1D192B",
    tertiary: "#7D5260",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD8E4",
    onTertiaryContainer: "#31111D",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#F8F7FA",
    onBackground: "#1C1B1F",
    surface: "#F8F7FA",
    onSurface: "#1C1B1F",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    outline: "#79747E",
    outlineVariant: "#CAC4D0",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#313033",
    inverseOnSurface: "#F4EFF4",
    inversePrimary: "#D0BCFF",
    surfaceDim: "#DDD8DD",
    surfaceBright: "#F8F7FA",
    surfaceContainerLowest: "#F5F3F6",
    surfaceContainerLow: "#F2F0F3",
    surfaceContainer: "#EFEDF0",
    surfaceContainerHigh: "#E9E7EA",
    surfaceContainerHighest: "#E3E1E4",
  },
  dark: {
    primary: "#D0BCFF",
    onPrimary: "#381E72",
    primaryContainer: "#4F378B",
    onPrimaryContainer: "#EADDFF",
    secondary: "#CCC2DC",
    onSecondary: "#332D41",
    secondaryContainer: "#4A4458",
    onSecondaryContainer: "#E8DEF8",
    tertiary: "#EFB8C8",
    onTertiary: "#492532",
    tertiaryContainer: "#633B48",
    onTertiaryContainer: "#FFD8E4",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#10110F",
    onBackground: "#E6E1E5",
    surface: "#10110F",
    onSurface: "#E6E1E5",
    surfaceVariant: "#49454F",
    onSurfaceVariant: "#CAC4D0",
    outline: "#938F99",
    outlineVariant: "#49454F",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#E6E1E5",
    inverseOnSurface: "#313033",
    inversePrimary: "#6750A4",
    surfaceDim: "#10110F",
    surfaceBright: "#383535",
    surfaceContainerLowest: "#0B0E0A",
    surfaceContainerLow: "#1C1B1F",
    surfaceContainer: "#201F23",
    surfaceContainerHigh: "#2B2930",
    surfaceContainerHighest: "#36343B",
  },
};

export const createMaterialYouTheme = (mode: "light" | "dark") => {
  const colors = materialYouColors[mode];

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: colors.primary,
        contrastText: colors.onPrimary,
      },
      secondary: {
        main: colors.secondary,
        contrastText: colors.onSecondary,
      },
      error: {
        main: colors.error,
        contrastText: colors.onError,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.onSurface,
        secondary: colors.onSurfaceVariant,
      },
      divider: colors.outline,
    },
    typography: {
      fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "3.5rem",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2.25rem",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 500,
        letterSpacing: "0em",
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.375rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.125rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        lineHeight: 1.5,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        letterSpacing: "0.03em",
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        letterSpacing: "0.02em",
        lineHeight: 1.6,
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        letterSpacing: "0.05em",
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 24px",
            minHeight: "40px",
            transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          },
          contained: {
            backgroundColor: colors.primary,
            color: colors.onPrimary,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: colors.primary,
              filter: "brightness(1.1)",
            },
          },
          outlined: {
            borderColor: colors.outline,
            color: colors.primary,
            "&:hover": {
              backgroundColor: `${colors.primary}08`,
              borderColor: colors.primary,
            },
          },
          text: {
            color: colors.primary,
            "&:hover": {
              backgroundColor: `${colors.primary}08`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surfaceContainer,
            borderRadius: "16px",
            border: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: colors.secondaryContainer,
            color: colors.onSecondaryContainer,
            borderRadius: "8px",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: colors.secondaryContainer,
              filter: "brightness(1.1)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
            color: colors.onSurface,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.surfaceContainer,
            borderRight: `1px solid ${colors.outline}`,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: colors.primaryContainer,
            color: colors.onPrimaryContainer,
            boxShadow: "0 3px 12px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              backgroundColor: colors.primaryContainer,
              filter: "brightness(1.1)",
              transform: "scale(1.05)",
            },
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

// Custom Material You CSS variables
export const materialYouCssVars = (mode: "light" | "dark") => {
  const colors = materialYouColors[mode];

  return {
    "--md-sys-color-primary": colors.primary,
    "--md-sys-color-on-primary": colors.onPrimary,
    "--md-sys-color-primary-container": colors.primaryContainer,
    "--md-sys-color-on-primary-container": colors.onPrimaryContainer,
    "--md-sys-color-secondary": colors.secondary,
    "--md-sys-color-on-secondary": colors.onSecondary,
    "--md-sys-color-secondary-container": colors.secondaryContainer,
    "--md-sys-color-on-secondary-container": colors.onSecondaryContainer,
    "--md-sys-color-tertiary": colors.tertiary,
    "--md-sys-color-on-tertiary": colors.onTertiary,
    "--md-sys-color-tertiary-container": colors.tertiaryContainer,
    "--md-sys-color-on-tertiary-container": colors.onTertiaryContainer,
    "--md-sys-color-error": colors.error,
    "--md-sys-color-on-error": colors.onError,
    "--md-sys-color-error-container": colors.errorContainer,
    "--md-sys-color-on-error-container": colors.onErrorContainer,
    "--md-sys-color-background": colors.background,
    "--md-sys-color-on-background": colors.onBackground,
    "--md-sys-color-surface": colors.surface,
    "--md-sys-color-on-surface": colors.onSurface,
    "--md-sys-color-surface-variant": colors.surfaceVariant,
    "--md-sys-color-on-surface-variant": colors.onSurfaceVariant,
    "--md-sys-color-outline": colors.outline,
    "--md-sys-color-outline-variant": colors.outlineVariant,
    "--md-sys-color-shadow": colors.shadow,
    "--md-sys-color-scrim": colors.scrim,
    "--md-sys-color-inverse-surface": colors.inverseSurface,
    "--md-sys-color-inverse-on-surface": colors.inverseOnSurface,
    "--md-sys-color-inverse-primary": colors.inversePrimary,
    "--md-sys-color-surface-dim": colors.surfaceDim,
    "--md-sys-color-surface-bright": colors.surfaceBright,
    "--md-sys-color-surface-container-lowest": colors.surfaceContainerLowest,
    "--md-sys-color-surface-container-low": colors.surfaceContainerLow,
    "--md-sys-color-surface-container": colors.surfaceContainer,
    "--md-sys-color-surface-container-high": colors.surfaceContainerHigh,
    "--md-sys-color-surface-container-highest": colors.surfaceContainerHighest,
  };
};
