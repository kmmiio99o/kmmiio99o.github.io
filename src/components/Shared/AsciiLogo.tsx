import React from "react";
import { Box, Typography } from "@mui/material";

const ASCII_LOGO = `
 _                        _ _       ___   ___
| | ___ __ ___  _ __ ___ (_|_) ___ / _ \ / _ \  ___
| |/ / '_ \` _ \\| '_ \` _ \\| | |/ _ \ (_) | (_) |/ _ \\
|   <| | | | | | | | | | | | | (_) \__, |\__, | (_) |
|_|\\_\\_| |_| |_|_| |_| |_|_|_|\\___/  /_/  /_/ \\___/`;

const AsciiLogo: React.FC<{ compact?: boolean }> = ({ compact }) => {
  if (compact) {
    return (
      <Typography
        component="pre"
        sx={{
          fontFamily: 'monospace',
          fontSize: { xs: "0.35rem", sm: "0.4rem" },
          lineHeight: 1.1,
          color: "primary.main",
          whiteSpace: "pre",
          userSelect: "none",
        }}
      >
        {ASCII_LOGO}
      </Typography>
    );
  }

  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <Typography
        component="pre"
        sx={{
          fontFamily: 'monospace',
          fontSize: { xs: "0.3rem", sm: "0.38rem", md: "0.45rem" },
          lineHeight: 1.15,
          color: "primary.main",
          whiteSpace: "pre",
          userSelect: "none",
          textShadow: "0 0 20px rgba(0,255,65,0.3)",
        }}
      >
        {ASCII_LOGO}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          mt: 1,
          display: "block",
          fontSize: "0.65rem",
          fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
        }}
      >
        v4.0.0 // portfolio
      </Typography>
    </Box>
  );
};

export default AsciiLogo;
