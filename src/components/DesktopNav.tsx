import React from "react";
import { Box, Button, useTheme, alpha, Slide, Grow } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";

interface DesktopNavProps {
  currentPath: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ currentPath }) => {
  const theme = useTheme();

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "About", path: "/about", icon: PersonIcon },
    { name: "Projects", path: "/projects", icon: WorkIcon },
  ];

  return (
    <Slide appear={true} direction="down" in timeout={300}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2.5,
          px: 0.5,
          py: 0.5,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const active = currentPath === item.path;

          return (
            <Grow
              in
              key={item.name}
              timeout={200 + idx * 100}
              style={{ transformOrigin: "0 0 0" }}
            >
              <Button
                component={Link}
                to={item.path}
                startIcon={<Icon />}
                sx={{
                  minWidth: 100,
                  py: 0.75,
                  px: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: active ? 700 : 600,
                  fontSize: "0.95rem",
                  color: active ? "primary.main" : "text.secondary",
                  backgroundColor: active
                    ? alpha(theme.palette.primary.main, 0.12)
                    : "transparent",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: active
                      ? alpha(theme.palette.primary.main, 0.18)
                      : alpha(theme.palette.action.hover, 0.5),
                  },
                }}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Button>
            </Grow>
          );
        })}
      </Box>
    </Slide>
  );
};

export default DesktopNav;
