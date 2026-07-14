import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Box, Typography, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import TerminalIcon from "@mui/icons-material/Terminal";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import type { SxProps, Theme } from "@mui/material";

interface AppDef {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  placeholder?: boolean;
}

const PAGE1_APPS: AppDef[] = [
  { id: "home", label: "Home", icon: <HomeIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #00ff41, #00c930)" },
  { id: "about", label: "About", icon: <PersonIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #00bcd4, #00838f)" },
  { id: "projects", label: "Projects", icon: <FolderIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #ff9100, #e65100)" },
  { id: "terminal", label: "Terminal", icon: <TerminalIcon sx={{ color: "#33ff33", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #333, #111)" },
];

const PAGE2_APPS: AppDef[] = [
  { id: "music", label: "Music", icon: <MusicNoteIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #e91e63, #9c27b0)", placeholder: true },
  { id: "camera", label: "Camera", icon: <CameraAltIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #607d8b, #455a64)", placeholder: true },
  { id: "settings", label: "Settings", icon: <SettingsIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #78909c, #546e7a)", placeholder: true },
  { id: "files", label: "Files", icon: <DescriptionIcon sx={{ color: "#fff", fontSize: 28 }} />, gradient: "linear-gradient(135deg, #42a5f5, #1e88e5)", placeholder: true },
];

const ALL_PAGES = [PAGE1_APPS, PAGE2_APPS];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function useLiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface HomeScreenProps {
  onAppOpen: (appId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAppOpen }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const time = useLiveClock();

  const greeting = useMemo(() => getGreeting(), []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleTap = (app: AppDef) => {
    if (app.placeholder) {
      alert("Coming soon");
      return;
    }
    onAppOpen(app.id);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is dominant and significant
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0 && currentPage < ALL_PAGES.length - 1) {
        setCurrentPage((p) => p + 1);
      } else if (deltaX > 0 && currentPage > 0) {
        setCurrentPage((p) => p - 1);
      }
    }
  }, [currentPage]);

  // Handle mouse drag for desktop testing
  const mouseStartX = useRef(0);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    const deltaX = e.clientX - mouseStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0 && currentPage < ALL_PAGES.length - 1) {
        setCurrentPage((p) => p + 1);
      } else if (deltaX > 0 && currentPage > 0) {
        setCurrentPage((p) => p - 1);
      }
    }
  }, [currentPage]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "fixed",
        top: 44,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0a1a2e 60%, #0a0a1a 100%)",
        overflow: "hidden",
        zIndex: 1,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Animated star particles */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animation: `floatStar ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.7) % 3}s`,
              "@keyframes floatStar": {
                "0%, 100%": { opacity: 0.2, transform: "translateY(0px)" },
                "50%": { opacity: 1, transform: "translateY(-8px)" },
              },
            } as SxProps<Theme>}
          />
        ))}
      </Box>

      {/* Time & greeting */}
      <Box sx={{ textAlign: "center", pt: 5, pb: 3, position: "relative", zIndex: 2 }}>
        <Typography
          sx={{
            fontSize: "3rem",
            fontWeight: 200,
            color: "#fff",
            letterSpacing: 2,
            lineHeight: 1,
            fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
          }}
        >
          {formattedTime}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.6)",
            mt: 1,
            fontWeight: 300,
          }}
        >
          {greeting}
        </Typography>
      </Box>

      {/* App grid with sliding animation */}
      <Box
        sx={{
          position: "relative",
          height: 260,
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 300ms ease",
            transform: `translateX(-${currentPage * 100}%)`,
            height: "100%",
          }}
        >
          {ALL_PAGES.map((pageApps, pageIndex) => (
            <Box
              key={pageIndex}
              sx={{
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
                px: 3,
                py: 2,
                alignContent: "start",
              }}
            >
              {pageApps.map((app) => (
                <Stack
                  key={app.id}
                  component="button"
                  onClick={() => handleTap(app)}
                  onMouseDown={() => setPressedId(app.id)}
                  onMouseUp={() => setPressedId(null)}
                  onMouseLeave={() => setPressedId(null)}
                  onTouchStart={() => setPressedId(app.id)}
                  onTouchEnd={() => setPressedId(null)}
                  sx={{
                    background: "none",
                    border: "none",
                    p: 0,
                    cursor: "pointer",
                    alignItems: "center",
                    gap: 0.5,
                    transform: pressedId === app.id ? "scale(0.85)" : "scale(1)",
                    transition: "transform 100ms ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "14px",
                      background: app.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {app.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      color: "rgba(255,255,255,0.85)",
                      textAlign: "center",
                      lineHeight: 1.1,
                      mt: 0.25,
                    }}
                  >
                    {app.label}
                  </Typography>
                </Stack>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Page indicator dots - positioned above the dock area */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        {ALL_PAGES.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: i === currentPage ? "#fff" : "rgba(255,255,255,0.3)",
              transition: "background 0.2s",
              cursor: "pointer",
              "&:hover": {
                background: i === currentPage ? "#fff" : "rgba(255,255,255,0.5)",
              },
            }}
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default HomeScreen;
