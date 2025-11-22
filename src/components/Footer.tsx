import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Container,
  Stack,
  Tooltip,
  SvgIcon,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

// Proper Discord Icon as MUI SvgIcon
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
        position: "relative",
        mt: "auto",
        background: "transparent",
        pb: { xs: 20, sm: 15, md: 12, lg: 10 },
        pt: 4,
      }}
    >
      {/* Main Footer Container */}
      <Container maxWidth="lg">
        <Box
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "rgba(30, 30, 30, 0.4)"
                : "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
            borderRadius: 4,
            px: { xs: 3, sm: 4 },
            py: 4,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          }}
        >
          <Stack spacing={3} alignItems="center" justifyContent="center">
            {/* Social Links */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {socialLinks.map((social) => (
                <Tooltip key={social.label} title={social.label} arrow>
                  <IconButton
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.secondary",
                      width: 52,
                      height: 52,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.06)",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)"
                      }`,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        color: social.color,
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.12)"
                            : "rgba(0, 0, 0, 0.08)",
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 25px ${social.color}30`,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            {/* Copyright Text */}
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                textAlign: "center",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.7) 100%)"
                    : "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.6) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                px: 3,
                py: 1,
                borderRadius: 2,
              }}
            >
              © {currentYear} kmmiio99o • Crafted with passion
            </Typography>

            {/* Additional Info */}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                opacity: 0.8,
                textAlign: "center",
                maxWidth: 400,
                lineHeight: 1.4,
              }}
            >
              Built with React • Material-UI • TypeScript
            </Typography>
          </Stack>
        </Box>
      </Container>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />
    </Box>
  );
};

export default Footer;
