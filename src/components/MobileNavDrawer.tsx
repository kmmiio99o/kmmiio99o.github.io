import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import GitHubIcon from "@mui/icons-material/GitHub";
import UpdateIcon from "@mui/icons-material/Update";
import { Link } from "react-router-dom";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  open,
  onClose,
  currentPath,
}) => {
  const theme = useTheme();
  const [drawerLoaded, setDrawerLoaded] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "About", path: "/about", icon: PersonIcon },
    { name: "Projects", path: "/projects", icon: WorkIcon },
    { name: "Privacy", path: "/privacy", icon: UpdateIcon },
  ];

  useEffect(() => {
    if (open) {
      setDrawerLoaded(true);
    } else {
      // Reset when closing
      const timer = setTimeout(() => setDrawerLoaded(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      transitionDuration={250}
      ModalProps={{
        keepMounted: true,
        sx: {
          "& .MuiBackdrop-root": {
            backgroundColor: alpha(theme.palette.common.black, 0),
            backdropFilter: "blur(0px)",
            transition: "all 0.25s ease",
            ...(open && {
              backgroundColor: alpha(theme.palette.common.black, 0.3),
              backdropFilter: "blur(4px)",
            }),
          },
        },
      }}
      PaperProps={{
        sx: {
          width: "min(85vw, 300px)",
          background: theme.palette.background.paper,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "-4px 0 24px rgba(0, 0, 0, 0.3)"
              : "-4px 0 24px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Navigation
        </Typography>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
              backgroundColor: alpha(theme.palette.action.hover, 0.5),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ p: 1.5, flex: 1 }}>
        <List disablePadding>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = currentPath === item.path;
            const delay = index * 50;

            return (
              <ListItem
                key={item.name}
                disablePadding
                sx={{
                  mb: 0.5,
                  opacity: drawerLoaded ? 1 : 0,
                  transform: drawerLoaded
                    ? "translateX(0)"
                    : "translateX(20px)",
                  transition: `opacity 0.2s ease ${delay}ms, transform 0.2s ease ${delay}ms`,
                }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleClose}
                  selected={active}
                  sx={{
                    borderRadius: 1.5,
                    py: 1.25,
                    px: 2,
                    "&.Mui-selected": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.15,
                        ),
                      },
                    },
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.action.hover, 0.3),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: active ? "primary.main" : "text.secondary",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: active ? 600 : 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Simple GitHub Link */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Button
          fullWidth
          startIcon={<GitHubIcon />}
          href="https://github.com/kmmiio99o"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 1.5,
            fontWeight: 500,
            borderColor: alpha(theme.palette.divider, 0.3),
            color: "text.secondary",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              color: "primary.main",
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          GitHub
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileNavDrawer;
