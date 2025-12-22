import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Slide,
  alpha,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useLocation } from "react-router-dom";
import MobileNavDrawer from "./MobileNavDrawer";
import DesktopNav from "./DesktopNav";

interface NavbarProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ themeMode, toggleTheme }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(
    "https://github.com/kmmiio99o.png",
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 80; // Distance to reach full opacity
      const opacity = Math.min(scrollY / maxScroll, 1);

      // Add some resistance for smoother animation
      const smoothedOpacity = opacity < 0.5 ? opacity * 0.7 : opacity;
      setNavbarOpacity(smoothedOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Calculate values based on opacity
  const backgroundColor = alpha(
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff",
    navbarOpacity * 0.95,
  );

  const blurAmount = Math.min(navbarOpacity * 15, 12);
  const borderOpacity = navbarOpacity * 0.15;

  return (
    <>
      <Slide appear={true} direction="down" in timeout={400}>
        <AppBar
          position="fixed"
          elevation={0}
          color="transparent"
          sx={{
            backgroundColor,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            borderBottom: `1px solid ${alpha(theme.palette.divider, borderOpacity)}`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Toolbar
            sx={{
              px: { xs: 2, sm: 2.5, md: 3 },
              py: 1,
              minHeight: { xs: 60, md: 68 },
              justifyContent: "space-between",
            }}
          >
            {/* Left side - Brand */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                "&:hover": {
                  "& .brand-text": {
                    transform: "translateX(2px)",
                  },
                },
              }}
            >
              <Avatar
                src={avatarSrc ?? undefined}
                imgProps={{
                  onError: () => setAvatarSrc(null),
                }}
                sx={{
                  width: { xs: 36, md: 40 },
                  height: { xs: 36, md: 40 },
                  bgcolor: "primary.main",
                  fontWeight: 700,
                  fontSize: "1rem",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                K
              </Avatar>
              <Typography
                variant="h6"
                className="brand-text"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  transition: "transform 0.2s ease",
                }}
              >
                kmmiio99o
              </Typography>
            </Box>

            {/* Center - Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <DesktopNav currentPath={location.pathname} />
              </Box>
            )}

            {/* Right side - Theme toggle & Mobile menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Theme Toggle (always visible) */}
              <IconButton
                onClick={toggleTheme}
                aria-label={
                  themeMode === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                size="small"
                sx={{
                  width: { xs: 40, md: 44 },
                  height: { xs: 40, md: 44 },
                  borderRadius: 1.5,
                  color: "text.secondary",
                  backgroundColor: alpha(theme.palette.action.hover, 0.3),
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                  },
                }}
              >
                {themeMode === "dark" ? (
                  <Brightness7Icon sx={{ fontSize: { xs: 20, md: 22 } }} />
                ) : (
                  <Brightness4Icon sx={{ fontSize: { xs: 20, md: 22 } }} />
                )}
              </IconButton>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  onClick={toggleDrawer(true)}
                  aria-label="Open navigation menu"
                  size="small"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    color: "text.secondary",
                    backgroundColor: alpha(theme.palette.action.hover, 0.3),
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Spacer to prevent content from hiding under AppBar */}
      <Box sx={{ height: { xs: 60, md: 68 } }} />

      {/* Mobile Drawer */}
      <MobileNavDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        currentPath={location.pathname}
      />
    </>
  );
};

export default Navbar;
