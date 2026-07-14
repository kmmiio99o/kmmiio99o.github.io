import React from "react";
import TerminalIcon from "@mui/icons-material/Terminal";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const MENUBAR_HEIGHT = 32;

function useClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface MenuBarProps {
  focusedTitle: string;
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
  hidden?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ focusedTitle, themeMode, onToggleTheme, hidden }) => {
  const time = useClock();
  const isDark = themeMode === "dark";

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: MENUBAR_HEIGHT,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        backgroundColor: isDark ? "rgba(14,14,28,0.82)" : "rgba(245,245,250,0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
        userSelect: "none",
        transition: "transform 350ms cubic-bezier(0.25,0.1,0.25,1)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <TerminalIcon sx={{ fontSize: 16, color: isDark ? "#00ff41" : "#00875a" }} />
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.8rem",
            color: isDark ? "#e0e0e0" : "#1a1a2e",
            fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
          }}
        >
          kmmiio99o
        </span>
      </div>

      {/* Center — focused window title */}
      <span
        style={{
          fontSize: "0.72rem",
          color: isDark ? "#808090" : "#555566",
          fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {focusedTitle || "Desktop"}
      </span>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: "0.7rem",
            color: isDark ? "#808090" : "#555566",
            fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
          }}
        >
          {formattedDate} {formattedTime}
        </span>
        <button
          onClick={onToggleTheme}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            color: isDark ? "#808090" : "#555566",
            transition: "color 200ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? "#00ff41" : "#00875a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? "#808090" : "#555566")}
        >
          {isDark ? <LightModeIcon sx={{ fontSize: 14 }} /> : <DarkModeIcon sx={{ fontSize: 14 }} />}
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
