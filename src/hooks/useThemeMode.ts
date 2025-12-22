import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "km_theme_mode";

type ThemeMode = "light" | "dark";

/**
 * Hook to manage persistent theme mode (light | dark).
 *
 * Behavior:
 * - Reads stored preference from localStorage (if present).
 * - Falls back to system preference (prefers-color-scheme).
 * - Defaults to "dark" if neither is available.
 * - Persists changes to localStorage.
 * - Optionally listens to system preference changes when user hasn't explicitly set a preference.
 */
export const useThemeMode = () => {
  // Lazy initializer so SSR / build won't try to access window during module evaluation.
  const getInitialMode = (): ThemeMode => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      // localStorage might be unavailable — ignore and fallback
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: light)").matches)
        return "light";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        return "dark";
    }

    return "dark";
  };

  const [mode, setModeState] = useState<ThemeMode>(() => {
    // Protect access to window/localStorage during SSR by running this lazily
    try {
      // If localStorage is available, prefer it; otherwise query system preference.
      const stored =
        typeof localStorage !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      if (stored === "light" || stored === "dark") return stored as ThemeMode;
    } catch {
      // ignore
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: light)").matches)
        return "light";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        return "dark";
    }

    return "dark";
  });

  // Persist user preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore write errors (e.g., privacy mode)
    }
  }, [mode]);

  // If the user hasn't set an explicit preference, we listen to system changes and update.
  // To decide whether the user has set an explicit preference we check for a stored value.
  useEffect(() => {
    let mql: MediaQueryList | null = null;
    let listener:
      | ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
      | null = null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const hasStored = stored === "light" || stored === "dark";

      if (!hasStored && typeof window !== "undefined" && window.matchMedia) {
        // Listen to system preference changes
        mql = window.matchMedia("(prefers-color-scheme: dark)");
        listener = (e: MediaQueryListEvent) => {
          setModeState(e.matches ? "dark" : "light");
        };

        // Older browsers use addListener/removeListener
        if ("addEventListener" in mql) {
          mql.addEventListener("change", listener);
        } else {
          // @ts-ignore - fallback
          mql.addListener(listener);
        }
      }
    } catch {
      // ignore failures
    }

    return () => {
      try {
        if (mql && listener) {
          if ("removeEventListener" in mql) {
            mql.removeEventListener("change", listener);
          } else {
            // @ts-ignore - fallback
            mql.removeListener(listener);
          }
        }
      } catch {
        // ignore
      }
    };
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return {
    mode,
    setMode,
    toggleMode,
  } as const;
};

export default useThemeMode;
