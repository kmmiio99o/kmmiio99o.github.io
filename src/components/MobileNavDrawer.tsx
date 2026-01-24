import React, { useEffect, useMemo } from "react";
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
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import GitHubIcon from "@mui/icons-material/GitHub";
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

  // Memoized navigation items
  const navItems = useMemo(
    () => [
      { name: "Home", path: "/", icon: HomeIcon },
      { name: "About", path: "/about", icon: PersonIcon },
      { name: "Projects", path: "/projects", icon: WorkIcon },
    ],
    [],
  );

  // Memoized styles
  const drawerStyles = useMemo(
    () => ({
      paper: {
        width: "min(85vw, 300px)",
        backgroundColor: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[3],
        display: "flex",
        flexDirection: "column" as const,
      },
      backdrop: {
        backgroundColor: alpha(theme.palette.common.black, 0.3),
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      },
    }),
    [theme],
  );

  // Memoized colors
  const colors = useMemo(
    () => ({
      textSecondary: theme.palette.text.secondary,
      textPrimary: theme.palette.text.primary,
      primaryMain: theme.palette.primary.main,
      divider: theme.palette.divider,
      actionHover: theme.palette.action.hover,
    }),
    [theme],
  );

  // Memoized alpha values
  const alphaValues = useMemo(
    () => ({
      primary10: alpha(colors.primaryMain, 0.1),
      primary15: alpha(colors.primaryMain, 0.15),
      actionHover30: alpha(colors.actionHover, 0.3),
      divider10: alpha(colors.divider, 0.1),
      divider30: alpha(colors.divider, 0.3),
    }),
    [colors, alpha],
  );

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
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            transition: "all 0.25s ease",
            ...(open && drawerStyles.backdrop),
          },
        },
      }}
      PaperProps={{ sx: drawerStyles.paper }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${alphaValues.divider10}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: colors.primaryMain,
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            K
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: colors.textPrimary,
            }}
          >
            kmmiio99o
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: colors.textSecondary,
            backgroundColor: alphaValues.actionHover30,
            borderRadius: 1.5,
            "&:hover": {
              color: colors.textPrimary,
              backgroundColor: alphaValues.primary10,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ p: 1.5, flex: 1 }}>
        <List disablePadding>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.path;

            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleClose}
                  selected={active}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 2,
                    border: `1px solid ${active ? colors.primaryMain : alphaValues.divider30}`,
                    backgroundColor: active
                      ? alphaValues.primary10
                      : "transparent",
                    "&.Mui-selected": {
                      backgroundColor: alphaValues.primary10,
                      color: colors.primaryMain,
                      "&:hover": {
                        backgroundColor: alphaValues.primary15,
                      },
                    },
                    "&:hover": {
                      backgroundColor: active
                        ? alphaValues.primary15
                        : alphaValues.actionHover30,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: active ? colors.primaryMain : colors.textSecondary,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* GitHub Link */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alphaValues.divider10}`,
        }}
      >
        <Button
          fullWidth
          startIcon={<GitHubIcon />}
          href="https://github.com/kmmiio99o"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="medium"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            border: `1px solid ${alphaValues.divider30}`,
            color: colors.textPrimary,
            "&:hover": {
              borderColor: colors.primaryMain,
              backgroundColor: alphaValues.primary10,
            },
          }}
        >
          Visit GitHub
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileNavDrawer;
