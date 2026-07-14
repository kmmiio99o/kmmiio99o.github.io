import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { WindowSystemProvider, WindowManager, useWindowActions, useWindows } from "@maomaolabs/core";
import "@maomaolabs/core/style.css";
import "./styles/terminal-theme.css";

import { getTheme } from "./theme";
import useThemeMode from "./hooks/useThemeMode";
import useDeviceMode from "./hooks/useDeviceMode";

// Desktop
import MenuBar from "./components/Desktop/MenuBar";
import Dock from "./components/Desktop/Dock";
import Desktop from "./components/Desktop/Desktop";

// Mobile
import StatusBar from "./components/Mobile/StatusBar";
import HomeScreen from "./components/Mobile/HomeScreen";
import FloatingDock from "./components/Mobile/FloatingDock";
import AppView from "./components/Mobile/AppView";

// Shared
import ScanlineOverlay from "./components/Shared/ScanlineOverlay";

// Pages
import HomeWindow from "./pages/HomeWindow";
import AboutWindow from "./pages/AboutWindow";
import ProjectsWindow from "./pages/ProjectsWindow";
import TerminalWindow from "./pages/TerminalWindow";

import type { WindowDefinition } from "@maomaolabs/core";

const APP_REGISTRY: Record<string, { title: string; color: string }> = {
  home: { title: "Home", color: "#00ff41" },
  about: { title: "About", color: "#00bcd4" },
  projects: { title: "Projects", color: "#ff9100" },
  terminal: { title: "Terminal", color: "#e0e0e0" },
};

function DesktopContent({ mode, toggleMode }: { mode: "light" | "dark"; toggleMode: () => void }) {
  const { openWindow, focusWindow, updateWindow, closeWindow } = useWindowActions();
  const windows = useWindows();
  const [dockForceVisible, setDockForceVisible] = useState(false);
  const dockTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const anyMaximized = windows.some((w) => w.isMaximized);
  const focusedId = windows.find((w) => !w.isMinimized && w.zIndex === Math.max(...windows.filter((ww) => !ww.isMinimized).map((ww) => ww.zIndex)))?.id;

  const handleAppClick = useCallback(
    (id: string) => {
      const existing = windows.find((w) => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
          updateWindow(id, { isMinimized: false });
        }
        focusWindow(id);
        return;
      }

      const comp = (() => {
        switch (id) {
          case "home":
            return <HomeWindow onNavigate={() => {}} />;
          case "about":
            return <AboutWindow />;
          case "projects":
            return <ProjectsWindow />;
          case "terminal":
            return <TerminalWindow onToggleTheme={toggleMode} onClose={() => closeWindow(id)} />;
          default:
            return <div>Unknown app</div>;
        }
      })();

      const def: WindowDefinition = {
        id,
        title: APP_REGISTRY[id].title,
        component: comp,
        initialSize: { width: id === "terminal" ? 680 : 750, height: id === "terminal" ? 480 : 540 },
        canClose: true,
        canMinimize: true,
        canMaximize: true,
      };

      openWindow(def);
    },
    [openWindow, closeWindow, focusWindow, updateWindow, windows, toggleMode],
  );

  // Detect drag near bottom to force-show dock
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 80) {
        setDockForceVisible(true);
        if (dockTimer.current) clearTimeout(dockTimer.current);
      }
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    if (dockTimer.current) clearTimeout(dockTimer.current);
    dockTimer.current = setTimeout(() => setDockForceVisible(false), 800);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Genie animation interceptor
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest?.('[data-action="minimize"]') || target.closest?.('[data-action="maximize"]') as HTMLElement | null;
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      const container = btn.closest?.(".window-container");
      if (!container) return;

      if (action === "minimize") {
        container.classList.remove("genie-restoring");
        container.classList.add("genie-minimizing");
        setTimeout(() => container.classList.remove("genie-minimizing"), 400);
      } else if (action === "maximize") {
        const isMaximized = container.classList.contains("maximized") ||
          (container as HTMLElement).style.width === "100vw";
        if (isMaximized) {
          container.classList.remove("genie-minimizing");
          container.classList.add("genie-restoring");
          setTimeout(() => container.classList.remove("genie-restoring"), 400);
        }
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  // Wobbly windows — drag detection
  useEffect(() => {
    const onDown = (e: MouseEvent | PointerEvent) => {
      const target = e.target as HTMLElement;
      const header = target.closest?.(".window-header");
      if (!header) return;
      const container = header.closest?.(".window-container");
      if (!container) return;
      container.classList.remove("settling");
      container.classList.add("wobbling");
      const cleanup = () => {
        container.classList.remove("wobbling");
        container.classList.add("settling");
      };
      const onUp = () => {
        cleanup();
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      window.addEventListener("mouseup", onUp, { once: true });
      window.addEventListener("pointercancel", onUp, { once: true });
    };
    document.addEventListener("mousedown", onDown, true);
    const onAnimEnd = (e: AnimationEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("settling") && e.animationName === "settle-bounce") {
        target.classList.remove("settling");
      }
    };
    document.addEventListener("animationend", onAnimEnd, true);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      document.removeEventListener("animationend", onAnimEnd, true);
    };
  }, []);

  const showDock = !anyMaximized || dockForceVisible;

  return (
    <>
      <MenuBar
        focusedTitle={focusedId ? APP_REGISTRY[focusedId]?.title || "" : ""}
        themeMode={mode}
        onToggleTheme={toggleMode}
        hidden={anyMaximized}
      />
      <Desktop themeMode={mode}>
        <WindowManager />
      </Desktop>
      <Dock
        openWindows={windows.map((w) => w.id)}
        focusedWindow={focusedId || null}
        onAppClick={handleAppClick}
        themeMode={mode}
        hidden={!showDock}
      />
    </>
  );
}

function MobileContent({ toggleMode }: { toggleMode: () => void }) {
  const [mobileApp, setMobileApp] = useState<string | null>(null);

  return (
    <>
      <ScanlineOverlay />
      <StatusBar />
      {mobileApp ? (
        <AppView
          appId={mobileApp}
          title={APP_REGISTRY[mobileApp]?.title || mobileApp}
          onClose={() => setMobileApp(null)}
        >
          {mobileApp === "home" && <HomeWindow onNavigate={setMobileApp} />}
          {mobileApp === "about" && <AboutWindow />}
          {mobileApp === "projects" && <ProjectsWindow />}
          {mobileApp === "terminal" && (
            <TerminalWindow onToggleTheme={toggleMode} onClose={() => setMobileApp(null)} />
          )}
        </AppView>
      ) : (
        <>
          <HomeScreen onAppOpen={setMobileApp} />
          <FloatingDock
            apps={Object.entries(APP_REGISTRY).map(([id, app]) => ({
              id,
              label: app.title,
              color: app.color,
            }))}
            onAppClick={setMobileApp}
          />
        </>
      )}
    </>
  );
}

const App: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();
  const deviceMode = useDeviceMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {deviceMode === "mobile" ? (
        <MobileContent toggleMode={toggleMode} />
      ) : (
        <WindowSystemProvider systemStyle="terminal">
          <ScanlineOverlay />
          <DesktopContent mode={mode} toggleMode={toggleMode} />
        </WindowSystemProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
