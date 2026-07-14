import { useState, useEffect } from "react";

export function useDataTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "dark";
  });

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      const val = el.getAttribute("data-theme");
      if (val === "light" || val === "dark") setTheme(val);
    });
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
