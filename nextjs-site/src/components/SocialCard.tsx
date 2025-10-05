"use client";

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { SocialCardProps } from "@/types";
import { useOneTimeAnimation } from "./AnimationProvider";

const MotionCard = motion(Card);

export function SocialCard({
  href,
  icon,
  title,
  description,
  delay = 0,
  external = true,
}: SocialCardProps) {
  const cardAnimation = useOneTimeAnimation(`social-card-${title}`);
  const handleClick = () => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <MotionCard
      initial={
        cardAnimation.initial === "hidden"
          ? { opacity: 0, y: 20, scale: 0.95 }
          : false
      }
      animate={
        cardAnimation.animate === "visible"
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.2, 0, 0, 1],
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      onClick={handleClick}
      sx={{
        background:
          "linear-gradient(135deg, var(--md-sys-color-primary) 0%, var(--md-sys-color-tertiary) 100%)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minHeight: 100,
        border: "none",
        borderRadius: "16px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.1)",
          opacity: 0,
          transition: "opacity 0.3s cubic-bezier(0.2, 0, 0, 1)",
        },
        "&:hover::before": {
          opacity: 1,
        },
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "20px !important",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "24px",
            flexShrink: 0,
            fontSize: "24px",
            color: "var(--md-sys-color-on-primary)",
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: "var(--md-sys-color-on-primary)",
              fontWeight: 500,
              fontSize: "1rem",
              lineHeight: 1.3,
              marginBottom: 0.5,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--md-sys-color-on-primary)",
              opacity: 0.85,
              fontSize: "0.875rem",
              lineHeight: 1.4,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </MotionCard>
  );
}
