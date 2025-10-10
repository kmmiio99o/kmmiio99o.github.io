import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface NavbarProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
];

const Navbar: React.FC<NavbarProps> = ({ themeMode, toggleTheme }) => {
  const location = useLocation();
  const theme = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = navigationItems.findIndex(
        (item) => item.path === location.pathname,
      );

      if (activeIndex !== -1 && buttonRefs.current[activeIndex]) {
        const activeButton = buttonRefs.current[activeIndex];
        const { offsetLeft, offsetWidth } = activeButton;

        setActiveIndicator({ left: offsetLeft, width: offsetWidth });

        if (!isInitialized) {
          setTimeout(() => setIsInitialized(true), 100);
        }
      }
    };

    // Use multiple attempts to ensure DOM is ready
    const timeouts = [
      setTimeout(updateIndicator, 10),
      setTimeout(updateIndicator, 50),
      setTimeout(updateIndicator, 100),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [location.pathname]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: "50%",
        top: 16,
        transform: "translateX(-50%)",
        width: {
          xs: "calc(100% - 32px)",
          sm: "90%",
          md: "80%",
          lg: "60%",
          xl: "50%",
        },
        maxWidth: 700,
        borderRadius: 6,
        background: isScrolled
          ? themeMode === "dark"
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.4)"
          : themeMode === "dark"
            ? "rgba(30, 30, 30, 0.3)"
            : "rgba(255, 255, 255, 0.3)",
        backdropFilter: isScrolled
          ? "blur(25px) saturate(200%) brightness(1.1)"
          : "blur(20px) saturate(180%) brightness(1.05)",
        border: `1px solid ${
          isScrolled
            ? "rgba(255, 255, 255, 0.2)"
            : themeMode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
        }`,
        boxShadow: isScrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1100,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "inherit",
          background: isScrolled
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)"
            : themeMode === "dark"
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.02) 100%)"
              : "linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 50%, rgba(0, 0, 0, 0.02) 100%)",
          zIndex: -1,
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "56px !important",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        {/* Navigation Items */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "relative",
          }}
        >
          {/* Active indicator */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: activeIndicator.left,
              width: activeIndicator.width,
              height: 36,
              borderRadius: 4,
              background:
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.25)"
                  : "rgba(0, 0, 0, 0.2)",
              boxShadow:
                themeMode === "dark"
                  ? "0 2px 12px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                  : "0 2px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              transition: isInitialized
                ? "left 0.6s cubic-bezier(0.4, 0, 0.2, 1), width 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              zIndex: 0,
              pointerEvents: "none",
              backdropFilter: "blur(12px) saturate(150%)",
              opacity: isInitialized ? 1 : 0,
            }}
          />
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                disableRipple
                ref={(el: HTMLAnchorElement | null) => {
                  buttonRefs.current[index] = el;
                }}
                sx={{
                  color: isActive ? "primary.main" : "text.primary",
                  fontWeight: 700,
                  fontSize: { xs: "0.875rem", md: "0.95rem" },
                  textTransform: "none",
                  minWidth: 0,
                  px: { xs: 2, md: 2.5 },
                  py: 1,
                  borderRadius: 3,
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "transparent",
                  transition:
                    "color 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "color",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </Box>

        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          disableRipple
          sx={{
            color: "text.primary",
            p: 1,
            borderRadius: 3,
            backgroundColor:
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(12px) saturate(140%)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.15)",
              transform: "scale(1.05)",
            },
            "&:active": {
              transform: "translateY(0) scale(1)",
            },
          }}
        >
          {themeMode === "dark" ? (
            <Brightness7Icon fontSize="small" />
          ) : (
            <Brightness4Icon fontSize="small" />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
