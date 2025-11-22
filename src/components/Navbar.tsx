import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

interface NavbarProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const navigationItems = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "About", path: "/about", icon: PersonIcon },
  { name: "Projects", path: "/projects", icon: WorkIcon },
];

const Navbar: React.FC<NavbarProps> = ({ themeMode, toggleTheme }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active indicator position
  useEffect(() => {
    const updateActiveIndicator = () => {
      const activeIndex = navigationItems.findIndex(
        (item) => item.path === location.pathname,
      );

      if (activeIndex !== -1 && buttonRefs.current[activeIndex]) {
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
          const { offsetLeft, offsetWidth } = activeButton;
          setActiveIndicator({
            left: offsetLeft,
            width: offsetWidth,
          });
        }
      }

      if (!isInitialized) {
        setTimeout(() => setIsInitialized(true), 100);
      }
    };

    const timer1 = setTimeout(updateActiveIndicator, 10);
    const timer2 = setTimeout(updateActiveIndicator, 100);
    const timer3 = setTimeout(updateActiveIndicator, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname, isInitialized]);

  return (
    <>
      {/* Main Navigation Container */}
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          position: "fixed",
          bottom: { xs: 24, md: 24 },
          left: 0,
          right: 0,
          px: { xs: 2, sm: 3, md: 4 },
          zIndex: 1000,
        }}
      >
        {/* Main Navbar Container */}
        <Box
          sx={{
            width: {
              xs: "calc(100% - 100px)",
              sm: "calc(100% - 90px)",
              md: "auto",
            },
            maxWidth: { xs: 420, md: "none" },
            borderRadius: { xs: 4, md: 8 },
            background:
              theme.palette.mode === "dark"
                ? "rgba(30, 30, 30, 0.4)"
                : "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.15)"
            }`,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            minHeight: { xs: "72px", md: "72px" },
            display: "flex",
            alignItems: "center",
            px: { xs: 2, sm: 3, md: 4 },
            ml: { xs: 2, md: 0 },
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
              zIndex: 0,
            },
          }}
        >
          {/* Navigation Content */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              position: "relative",
              zIndex: 1,
              gap: { xs: 1.5, md: 3 },
            }}
          >
            {/* Navigation Items Container with Active Indicator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 2, sm: 2.5, md: 3 },
                flex: 1,
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Active Indicator */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: activeIndicator.left,
                  width: activeIndicator.width,
                  height: {
                    xs: "56px",
                    sm: "56px",
                    md: "48px",
                  },
                  transform: "translateY(-50%)",
                  borderRadius: { xs: 4, md: 6 },
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.18)"
                      : "rgba(0, 0, 0, 0.12)",
                  backdropFilter: "blur(12px) saturate(180%)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 6px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                      : "0 6px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                  transition: isInitialized
                    ? "left 0.5s cubic-bezier(0.4, 0, 0.2, 1), width 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                  zIndex: 0,
                  opacity: isInitialized ? 1 : 0,
                }}
              />

              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;

                return (
                  <Button
                    key={item.name}
                    component={Link}
                    to={item.path}
                    disableRipple
                    ref={(el: HTMLButtonElement | null) => {
                      buttonRefs.current[index] = el;
                    }}
                    sx={{
                      color: isActive ? "primary.main" : "text.secondary",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.8125rem",
                        md: "0.875rem",
                      },
                      textTransform: "none",
                      minWidth: {
                        xs: "64px",
                        sm: "68px",
                        md: "100px",
                      },
                      width: {
                        xs: "64px",
                        sm: "68px",
                        md: "100px",
                      },
                      height: {
                        xs: "62px",
                        sm: "62px",
                        md: "56px",
                      },
                      px: { xs: 1, sm: 1.5, md: 2 },
                      borderRadius: { xs: 4, md: 4 },
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: 0.5, sm: 0.5, md: 1 },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      zIndex: 1,
                      backgroundColor: "transparent !important",

                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent !important",
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                          sm: "1.4rem",
                          md: "1.4rem",
                        },
                      }}
                    />
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      sx={{
                        fontSize: {
                          xs: "0.65rem",
                          sm: "0.72rem",
                          md: "0.8rem",
                        },
                        lineHeight: 1,
                        fontWeight: { xs: 600, md: 600 },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Button>
                );
              })}
            </Box>

            {/* Theme Toggle - Separator (hidden on mobile, shown on desktop) */}
            <Box
              sx={{
                height: { xs: "24px", sm: "28px", md: "32px" },
                width: "1px",
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                mx: { xs: 1, sm: 2 },
                display: { xs: "none", md: "block" },
              }}
            />

            {/* Theme Toggle - Hidden on mobile (we'll show it separately) */}
            <IconButton
              onClick={toggleTheme}
              disableRipple
              sx={{
                color: "text.secondary",
                width: { xs: "52px", sm: "52px", md: "52px" },
                height: { xs: "52px", sm: "52px", md: "52px" },
                minWidth: { xs: "52px", sm: "52px", md: "52px" },
                borderRadius: { xs: 4, md: 4 },
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: { xs: "none", md: "flex" },

                "&:hover": {
                  color: "primary.main",
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.18)"
                      : "rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {themeMode === "dark" ? (
                <Brightness7Icon
                  sx={{
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.3rem",
                      md: "1.4rem",
                    },
                  }}
                />
              ) : (
                <Brightness4Icon
                  sx={{
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.3rem",
                      md: "1.4rem",
                    },
                  }}
                />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Separate Theme Toggle for Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 20,
            zIndex: 1001,
            display: { xs: "block", md: "none" },
          }}
        >
          <IconButton
            onClick={toggleTheme}
            disableRipple
            sx={{
              color: "text.secondary",
              width: "69px",
              height: "69px",
              borderRadius: 4,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 30, 0.4)"
                  : "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.15)"
              }`,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

              "&:hover": {
                color: "primary.main",
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(30, 30, 30, 0.5)"
                    : "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(28px) saturate(220%)",
                WebkitBackdropFilter: "blur(28px) saturate(220%)",
              },
            }}
          >
            {themeMode === "dark" ? (
              <Brightness7Icon sx={{ fontSize: "1.7rem" }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: "1.7rem" }} />
            )}
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default Navbar;
