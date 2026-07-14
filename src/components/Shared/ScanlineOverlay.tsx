import React from "react";
import { Box } from "@mui/material";

const ScanlineOverlay: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.03,
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
        mixBlendMode: "overlay",
      }}
    />
  );
};

export default ScanlineOverlay;
