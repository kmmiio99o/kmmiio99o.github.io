import React, { useState, useCallback, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box, GlobalStyles } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getTheme } from "./theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Inject Google Sans from Google Fonts for the whole app if not present
    const id = "google-sans-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const handleThemeToggle = useCallback(() => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Simple stub for tab switch - kept for pages that call it.
  const handleTabSwitch = useCallback(() => {
    // Could trigger micro-animations or state for route-change effects.
    // No starfield logic here anymore.
    document.documentElement.style.setProperty(
      "--route-change-ts",
      `${Date.now()}`,
    );
  }, []);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      {/* Ensure Google Sans is applied across the app */}
      <GlobalStyles
        styles={{
          body: {
            fontFamily:
              '"Google Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          ".MuiPaper-root": {
            transition:
              "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      />
      <CssBaseline />
      <Router>
        <Navbar themeMode={themeMode} toggleTheme={handleThemeToggle} />
        <Box
          sx={{
            pt: 8,
            pb: { xs: 9, md: 10 },
            minHeight: "100vh",
            px: { xs: 2, md: 4 },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Routes>
            <Route path="/" element={<Home onTabSwitch={handleTabSwitch} />} />
            <Route
              path="/about"
              element={<About onTabSwitch={handleTabSwitch} />}
            />
            <Route
              path="/projects"
              element={<Projects onTabSwitch={handleTabSwitch} />}
            />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
