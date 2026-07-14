import React from "react";
import { Box, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import TerminalIcon from "@mui/icons-material/Terminal";
import type { SxProps, Theme } from "@mui/material";

const ICON_MAP: Record<string, React.ReactNode> = {
  home: <HomeIcon sx={{ color: "#fff", fontSize: 24 }} />,
  about: <PersonIcon sx={{ color: "#fff", fontSize: 24 }} />,
  projects: <FolderIcon sx={{ color: "#fff", fontSize: 24 }} />,
  terminal: <TerminalIcon sx={{ color: "#33ff33", fontSize: 24 }} />,
};

interface DockApp {
  id: string;
  label: string;
  color: string;
}

interface FloatingDockProps {
  apps: DockApp[];
  onAppClick: (id: string) => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ apps, onAppClick }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "max(12px, env(safe-area-inset-bottom))",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 24px)",
        maxWidth: 400,
        height: 64,
        background: "rgba(30, 30, 50, 0.65)",
        backdropFilter: "blur(30px) saturate(200%)",
        WebkitBackdropFilter: "blur(30px) saturate(200%)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "22px",
        zIndex: 10,
        px: 2,
      } as SxProps<Theme>}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
        }}
      >
        {apps.map((app) => (
          <Box
            key={app.id}
            component="button"
            onClick={() => onAppClick(app.id)}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: app.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "transform 150ms ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            } as SxProps<Theme>}
          >
            {ICON_MAP[app.id] ?? null}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FloatingDock;
