import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Stack,
  Tooltip,
  SvgIcon,
  alpha,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import CodeIcon from "@mui/icons-material/Code";

// Compact Discord Icon
const DiscordIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.25c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
  </SvgIcon>
);

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      url: "https://github.com/kmmiio99o",
      label: "GitHub",
      color: "#6e5494",
    },
    {
      icon: <DiscordIcon />,
      url: "https://discord.com/users/879393496627306587",
      label: "Discord",
      color: "#5865F2",
    },
    {
      icon: <TwitterIcon />,
      url: "https://x.com/kmmiio99o",
      label: "Twitter",
      color: "#1DA1F2",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: {
          xs: "calc(100% - 32px)", // Shorter on mobile
          sm: "calc(100% - 64px)",
          md: "calc(100% - 128px)",
          lg: "800px", // Pretty long on PC
        },
        maxWidth: "1200px",
      }}
    >
      <Box
        sx={{
          background: alpha(
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#ffffff",
            0.95,
          ),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)"
              : "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Desktop version - longer bar with more content */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 3, py: 2 }}
          >
            {/* Left side - Copyright */}
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              © {currentYear} kmmiio99o
            </Typography>

            {/* Middle - Social Links */}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <Tooltip key={social.label} title={social.label} arrow>
                  <IconButton
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      color: "text.secondary",
                      width: 40,
                      height: 40,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: social.color,
                        transform: "translateY(-2px)",
                        backgroundColor: alpha(social.color, 0.1),
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>

            {/* Right side - Tech + GitHub link */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CodeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  React • MUI • TS
                </Typography>
              </Stack>

              <Typography
                component="a"
                href="https://github.com/kmmiio99o/kmmiio99o.github.io"
                target="_blank"
                rel="noopener noreferrer"
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                View Source
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Mobile version - shorter bar with just essentials */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1.5 }}
          >
            {/* Mobile Left - Just year */}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              © {currentYear}
            </Typography>

            {/* Mobile Middle - Social Links (smaller) */}
            <Stack direction="row" spacing={0.5}>
              {socialLinks.map((social) => (
                <Tooltip key={social.label} title={social.label} arrow>
                  <IconButton
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      color: "text.secondary",
                      width: 36,
                      height: 36,
                      "&:hover": {
                        color: social.color,
                        backgroundColor: alpha(social.color, 0.1),
                      },
                    }}
                  >
                    {React.cloneElement(social.icon, { sx: { fontSize: 20 } })}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>

            {/* Mobile Right - Just GitHub icon for source */}
            <Tooltip title="View Source" arrow>
              <IconButton
                href="https://github.com/kmmiio99o/kmmiio99o.github.io"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "text.secondary",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    color: "#6e5494",
                    backgroundColor: alpha("#6e5494", 0.1),
                  },
                }}
              >
                <CodeIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Subtle bottom gradient */}
        <Box
          sx={{
            height: "2px",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)"
                : "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
            width: "80%",
            margin: "0 auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
