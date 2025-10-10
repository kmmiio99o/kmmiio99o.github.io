import React from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import DiscordIcon from "./icons/DiscordIcon";

const socialLinks = [
  {
    icon: <GitHubIcon />,
    url: "https://github.com/kmmiio99o",
    label: "GitHub",
  },
  {
    icon: <DiscordIcon />,
    url: "https://discord.com/users/879393496627306587",
    label: "Discord",
  },
  {
    icon: <TwitterIcon />,
    url: "https://x.com/kmmiio99o",
    label: "Twitter",
  },
];

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: 16,
        left: 0,
        right: 0,
        px: { xs: 2, sm: 3, md: 4 },
        zIndex: 1000,
        animation: "footerFadeIn 0.6s ease-in-out forwards",
        "@keyframes footerFadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "calc(100% - 32px)",
            sm: "90%",
            md: "90%",
            lg: "80%",
            xl: "75%",
          },
          maxWidth: 1200,
          borderRadius: 6,
          background:
            theme.palette.mode === "dark"
              ? "rgba(30, 30, 30, 0.3)"
              : "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.05)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          }`,
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          minHeight: "56px",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
          textAlign: "center",
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
                ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.02) 100%)"
                : "linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 50%, rgba(0, 0, 0, 0.02) 100%)",
            zIndex: -1,
          },
          position: "relative",
          "&:hover": {
            boxShadow:
              "0 8px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            background:
              theme.palette.mode === "dark"
                ? "rgba(30, 30, 30, 0.45)"
                : "rgba(255, 255, 255, 0.45)",
            transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1.0)",
          },
        }}
      >
        {/* Content Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              opacity: 0.9,
              fontSize: { xs: "0.8rem", sm: "0.85rem" },
              letterSpacing: "0.5px",
              textAlign: { xs: "center", sm: "left" },
              ml: 1,
            }}
          >
            © {new Date().getFullYear()} kmmiio99o. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: { xs: 1, sm: 1.5 },
            }}
          >
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                disableRipple
                sx={{
                  color: "text.primary",
                  p: 0.8,
                  width: 34,
                  height: 34,
                  borderRadius: 2.5,
                  my: "auto",
                  mr: { xs: 0, sm: 0.5 },
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.12)",
                  backdropFilter: "blur(12px) saturate(140%)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.15)",
                    transform: "scale(1.1)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 0 8px rgba(255, 255, 255, 0.15)"
                        : "0 0 8px rgba(0, 0, 0, 0.15)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                    transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                }}
              >
                {React.cloneElement(social.icon, { fontSize: "small" })}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
