import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import TerminalIcon from "@mui/icons-material/Terminal";

const DOCK_HEIGHT = 64;

interface DockApp {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const DOCK_APPS: DockApp[] = [
  { id: "home", label: "Home", icon: <HomeIcon sx={{ fontSize: 22 }} />, color: "#00ff41" },
  { id: "about", label: "About", icon: <PersonIcon sx={{ fontSize: 22 }} />, color: "#00bcd4" },
  { id: "projects", label: "Projects", icon: <FolderIcon sx={{ fontSize: 22 }} />, color: "#ff9100" },
  { id: "terminal", label: "Terminal", icon: <TerminalIcon sx={{ fontSize: 22, color: "#33ff33" }} />, color: "#e0e0e0" },
];

interface DockProps {
  openWindows: string[];
  focusedWindow: string | null;
  onAppClick: (id: string) => void;
  themeMode?: "light" | "dark";
  hidden?: boolean;
}

const Dock: React.FC<DockProps> = ({ openWindows, focusedWindow, onAppClick, themeMode = "dark", hidden }) => {
  const isDark = themeMode === "dark";

  return (
    <div
      style={{
        position: "fixed",
        bottom: hidden ? -(DOCK_HEIGHT + 24) : 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,
        height: DOCK_HEIGHT,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 10,
        backgroundColor: isDark ? "rgba(18,18,36,0.6)" : "rgba(240,240,245,0.65)",
        backdropFilter: "blur(30px) saturate(200%)",
        WebkitBackdropFilter: "blur(30px) saturate(200%)",
        borderRadius: 20,
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
        transition: "bottom 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {DOCK_APPS.map((app) => {
        const isOpen = openWindows.includes(app.id);
        const isFocused = focusedWindow === app.id;

        return (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            title={app.label}
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: isFocused ? `1.5px solid ${app.color}40` : "1.5px solid transparent",
              background: isFocused
                ? isDark
                  ? `${app.color}18`
                  : `${app.color}15`
                : isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
              color: isFocused ? app.color : isDark ? "#ccc" : "#444",
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px) scale(1.18)";
              e.currentTarget.style.color = app.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.color = isFocused ? app.color : isDark ? "#ccc" : "#444";
            }}
          >
            {app.icon}
            {isOpen && (
              <span
                style={{
                  position: "absolute",
                  bottom: -5,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: app.color,
                  boxShadow: `0 0 6px ${app.color}60`,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Dock;
