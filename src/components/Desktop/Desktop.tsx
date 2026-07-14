import React from "react";

const MENUBAR_HEIGHT = 32;

interface DesktopProps {
  children: React.ReactNode;
  themeMode?: "light" | "dark";
}

const Desktop: React.FC<DesktopProps> = ({ children, themeMode = "dark" }) => {
  const isDark = themeMode === "dark";

  return (
    <div
      style={{
        position: "fixed",
        top: MENUBAR_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      {/* Dark wallpaper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/PC_wallpaper_dark.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDark ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      />

      {/* Light wallpaper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/PC_wallpaper_light.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDark ? 0 : 1,
          transition: "opacity 600ms ease",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.15)",
          transition: "background-color 600ms ease",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Windows layer */}
      <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default Desktop;
