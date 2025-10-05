"use client";

import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  Fab,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode,
  DarkMode,
  Home,
  Person,
  Code,
  Message,
  MusicNote,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useOneTimeAnimation } from "./AnimationProvider";
import { NavigationItem } from "@/types";

const MotionBox = motion(Box);
const MotionFab = motion(Fab);

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: <Home />, href: "#home" },
  { id: "about", label: "About", icon: <Person />, href: "#about" },
  { id: "skills", label: "Skills", icon: <Code />, href: "#skills" },
  { id: "social", label: "Connect", icon: <Message />, href: "#social" },
];

export function Layout({ children }: LayoutProps) {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // One-time animations
  const sidebarAnimation = useOneTimeAnimation("sidebar");
  const logoAnimation = useOneTimeAnimation("logo");
  const themeToggleAnimation = useOneTimeAnimation("theme-toggle");

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileNavOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  // Desktop Navigation Rail
  const DesktopNavigation = () => (
    <MotionBox
      initial={
        sidebarAnimation.initial === "hidden" ? { x: -80, opacity: 0 } : false
      }
      animate={
        sidebarAnimation.animate === "visible" ? { x: 0, opacity: 1 } : {}
      }
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 80,
        backgroundColor: "var(--md-sys-color-surface-container)",
        borderRight: "1px solid var(--md-sys-color-outline-variant)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 3,
        zIndex: 1100,
      }}
    >
      {/* Logo/Brand */}
      <MotionBox
        initial={
          logoAnimation.initial === "hidden"
            ? { scale: 0.8, opacity: 0 }
            : false
        }
        animate={
          logoAnimation.animate === "visible" ? { scale: 1, opacity: 1 } : {}
        }
        transition={{ delay: 0.2, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          width: 48,
          height: 48,
          backgroundColor: "var(--md-sys-color-primary)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
          cursor: "pointer",
        }}
        onClick={() => handleNavClick("home")}
      >
        <Typography
          variant="h6"
          sx={{
            color: "var(--md-sys-color-on-primary)",
            fontWeight: 600,
            fontSize: "1.2rem",
          }}
        >
          K
        </Typography>
      </MotionBox>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {navigationItems.map((item, index) => {
          const navItemAnimation = useOneTimeAnimation(`nav-item-${item.id}`);

          return (
            <motion.div
              key={item.id}
              initial={
                navItemAnimation.initial === "hidden"
                  ? { x: -20, opacity: 0 }
                  : false
              }
              animate={
                navItemAnimation.animate === "visible"
                  ? { x: 0, opacity: 1 }
                  : {}
              }
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <IconButton
                onClick={() => handleNavClick(item.id)}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  color:
                    activeSection === item.id
                      ? "var(--md-sys-color-on-secondary-container)"
                      : "var(--md-sys-color-on-surface-variant)",
                  backgroundColor:
                    activeSection === item.id
                      ? "var(--md-sys-color-secondary-container)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      activeSection === item.id
                        ? "var(--md-sys-color-secondary-container)"
                        : "var(--md-sys-color-surface-variant)",
                  },
                  transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                }}
              >
                {item.icon}
              </IconButton>
            </motion.div>
          );
        })}
      </Box>

      {/* Theme Toggle */}
      <MotionBox
        initial={
          themeToggleAnimation.initial === "hidden"
            ? { y: 20, opacity: 0 }
            : false
        }
        animate={
          themeToggleAnimation.animate === "visible" ? { y: 0, opacity: 1 } : {}
        }
        transition={{ delay: 0.8, duration: 0.4 }}
        sx={{ marginBottom: 3 }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            color: "var(--md-sys-color-on-surface-variant)",
            "&:hover": {
              backgroundColor: "var(--md-sys-color-surface-variant)",
            },
          }}
        >
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </MotionBox>
    </MotionBox>
  );

  // Mobile Navigation
  const MobileNavigation = () => (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "var(--md-sys-color-surface)",
          color: "var(--md-sys-color-on-surface)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleMobileNav}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            kmmiio99o
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "var(--md-sys-color-surface-container)",
          },
        }}
        SlideProps={{
          direction: "right",
        }}
        transitionDuration={400}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "var(--md-sys-color-on-surface)" }}
            >
              Navigation
            </Typography>
            <IconButton
              onClick={() => setMobileNavOpen(false)}
              sx={{ color: "var(--md-sys-color-on-surface)" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </motion.div>
        <List>
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: index * 0.1 + 0.2,
                duration: 0.4,
                ease: [0.2, 0, 0, 1],
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(item.id)}
                  selected={activeSection === item.id}
                  sx={{
                    borderRadius: "12px",
                    margin: "4px 12px",
                    "&.Mui-selected": {
                      backgroundColor:
                        "var(--md-sys-color-secondary-container)",
                      color: "var(--md-sys-color-on-secondary-container)",
                      "&:hover": {
                        backgroundColor:
                          "var(--md-sys-color-secondary-container)",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        activeSection === item.id
                          ? "var(--md-sys-color-on-secondary-container)"
                          : "var(--md-sys-color-on-surface-variant)",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Drawer>
    </>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--md-sys-color-background)",
      }}
    >
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <Box
        component="main"
        sx={{
          marginLeft: isMobile ? 0 : "80px",
          marginTop: isMobile ? "64px" : 0,
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            paddingY: 4,
            paddingX: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Music FAB */}
      <AnimatePresence>
        <MotionFab
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            backgroundColor: "var(--md-sys-color-primary-container)",
            color: "var(--md-sys-color-on-primary-container)",
            "&:hover": {
              backgroundColor: "var(--md-sys-color-primary-container)",
              filter: "brightness(1.1)",
            },
          }}
          onClick={() =>
            window.open("https://open.spotify.com/user/kmmiio99o", "_blank")
          }
        >
          <MusicNote />
        </MotionFab>
      </AnimatePresence>
    </Box>
  );
}
