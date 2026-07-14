import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { SxProps, Theme } from "@mui/material";

interface AppViewProps {
  appId: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const AppView: React.FC<AppViewProps> = ({ title, onClose, children }) => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    timerRef.current = setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 10, 20, 0.98)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        transform: visible && !closing ? "translateY(0)" : "translateY(100%)",
        transition: "transform 300ms ease-out",
      } as SxProps<Theme>}
    >
      {/* Status bar spacer */}
      <Box sx={{ height: 44, flexShrink: 0 }} />

      {/* Top bar */}
      <Box
        sx={{
          height: 44,
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          background: "rgba(18, 18, 32, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          px: 1,
        } as SxProps<Theme>}
      >
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "rgba(255,255,255,0.8)",
            ml: 0.5,
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 22 }} />
        </IconButton>
        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#fff",
            mr: 5,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppView;
