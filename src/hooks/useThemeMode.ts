import { useState, useCallback } from "react";

const STORAGE_KEY = "km_theme";

function getInitialMode(): "light" | "dark" {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "dark";
}

export default function useThemeMode() {
  const [mode, setMode] = useState<"light" | "dark">(getInitialMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return { mode, toggleMode };
}
