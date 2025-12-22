import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Stack,
  Tooltip,
  alpha,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Custom Discord Icon
const DiscordIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: "block" }}
  >
    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.25c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
  </svg>
);

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <GitHubIcon sx={{ fontSize: 20 }} />,
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
          xs: "calc(100% - 32px)",
          sm: "calc(100% - 64px)",
          md: "800px",
        },
        maxWidth: "1200px",
      }}
    >
      <Box
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(50, 50, 70, 0.3) 0%, rgba(70, 70, 90, 0.2) 100%)"
              : "linear-gradient(135deg, rgba(245, 250, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.1)"
          }`,
          borderRadius: 2,
          backdropFilter: "blur(8px)",
          px: { xs: 2.5, sm: 3 },
          py: 1.5,
          position: "relative",
          overflow: "hidden",
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(99, 102, 241, 0.25)",
            },
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {/* Left - Copyright */}
          <Typography
            variant="caption"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? alpha("#cdd6f4", 0.9)
                  : alpha("#475569", 0.9),
              fontWeight: 500,
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
              letterSpacing: "-0.01em",
            }}
          >
            © {currentYear} kmmiio99o
          </Typography>

          {/* Mobile left - just year */}
          <Typography
            variant="caption"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? alpha("#cdd6f4", 0.9)
                  : alpha("#475569", 0.9),
              fontWeight: 500,
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
              display: { xs: "block", sm: "none" },
              letterSpacing: "-0.01em",
            }}
          >
            © {currentYear}
          </Typography>

          {/* Center - Social Links */}
          <Stack direction="row" spacing={1}>
            {socialLinks.map((social) => (
              <Tooltip key={social.label} title={social.label} arrow>
                <IconButton
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? alpha("#cdd6f4", 0.9)
                        : alpha("#475569", 0.9),
                    width: 36,
                    height: 36,
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.18)"
                        : "rgba(0, 0, 0, 0.15)"
                    }`,
                    borderRadius: 1.5,
                    // Disable hover effect on mobile, keep only for desktop
                    "@media (hover: hover) and (pointer: fine)": {
                      "&:hover": {
                        color: social.color,
                        background:
                          theme.palette.mode === "dark"
                            ? alpha(social.color, 0.15)
                            : alpha(social.color, 0.1),
                        borderColor: alpha(social.color, 0.4),
                        transform: "translateY(-1px)",
                      },
                    },
                    WebkitTapHighlightColor: "transparent",
                    "&:active": {
                      transform: "none",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>

          {/* Right - Tech stack & source */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                display: { xs: "none", sm: "flex" },
                px: 1.5,
                py: 0.75,
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(8px)",
                borderRadius: 1.5,
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.18)"
                    : "rgba(0, 0, 0, 0.15)"
                }`,
              }}
            >
              <CodeIcon
                sx={{
                  fontSize: 14,
                  color:
                    theme.palette.mode === "dark"
                      ? alpha("#89b4fa", 0.9)
                      : alpha("#3b82f6", 0.9),
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? alpha("#cdd6f4", 0.9)
                      : alpha("#475569", 0.9),
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                React • TypeScript
              </Typography>
            </Stack>

            {/* Source link */}
            <Tooltip title="View Source Code" arrow>
              <IconButton
                href="https://github.com/kmmiio99o/kmmiio99o.github.io"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? alpha("#cdd6f4", 0.9)
                      : alpha("#475569", 0.9),
                  width: 36,
                  height: 36,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.18)"
                      : "rgba(0, 0, 0, 0.15)"
                  }`,
                  borderRadius: 1.5,
                  // Disable hover effect on mobile, keep only for desktop
                  "@media (hover: hover) and (pointer: fine)": {
                    "&:hover": {
                      color: "#ef4444",
                      background:
                        theme.palette.mode === "dark"
                          ? alpha("#ef4444", 0.15)
                          : alpha("#ef4444", 0.1),
                      borderColor: alpha("#ef4444", 0.4),
                      transform: "translateY(-1px)",
                    },
                  },
                  // Prevent tap highlight on mobile
                  WebkitTapHighlightColor: "transparent",
                  "&:active": {
                    transform: "none",
                  },
                }}
              >
                <FavoriteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
