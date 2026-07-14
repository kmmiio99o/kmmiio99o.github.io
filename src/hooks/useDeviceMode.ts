import { useState, useEffect } from "react";

const BREAKPOINT = 769;

export default function useDeviceMode(): "desktop" | "mobile" {
  const [mode, setMode] = useState<"desktop" | "mobile">(() =>
    typeof window !== "undefined" && window.innerWidth < BREAKPOINT ? "mobile" : "desktop",
  );

  useEffect(() => {
    const check = () => setMode(window.innerWidth < BREAKPOINT ? "mobile" : "desktop");
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return mode;
}
