"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDiscordStatus } from "@/lib/useDiscordStatus";
import { Music, Gamepad2, Monitor, Headphones } from "lucide-react";

const MotionCard = motion(Card);

interface ActivityIconProps {
  activity: any;
}

function ActivityIcon({ activity }: ActivityIconProps) {
  if (activity.name === "Spotify") {
    return <Music size={16} />;
  }

  if (activity.type === 0) {
    // Playing
    return <Gamepad2 size={16} />;
  }

  if (activity.type === 3) {
    // Watching
    return <Monitor size={16} />;
  }

  if (activity.type === 2) {
    // Listening
    return <Headphones size={16} />;
  }

  return <Monitor size={16} />;
}

export function DiscordStatus() {
  const { data, isLoading, error } = useDiscordStatus();

  if (isLoading) {
    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        sx={{
          background: "var(--md-sys-color-surface-container)",
          borderRadius: "16px",
          border: "none",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "20px !important",
          }}
        >
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary">
            Loading Discord status...
          </Typography>
        </CardContent>
      </MotionCard>
    );
  }

  if (error || !data) {
    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        sx={{
          background: "var(--md-sys-color-surface-container)",
          borderRadius: "16px",
          border: "none",
        }}
      >
        <CardContent sx={{ padding: "20px !important" }}>
          <Typography
            variant="h6"
            sx={{ color: "var(--md-sys-color-on-surface)", marginBottom: 1 }}
          >
            Discord Status
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Unable to fetch Discord status
          </Typography>
        </CardContent>
      </MotionCard>
    );
  }

  const primaryActivity = data.activity;
  const customStatus = data.customStatus;
  const spotify = data.spotify;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
      }}
      sx={{
        background: "var(--md-sys-color-surface-container)",
        borderRadius: "16px",
        border: "none",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardContent sx={{ padding: "20px !important" }}>
        {/* Header with avatar and status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "3px solid var(--md-sys-color-surface)",
                overflow: "hidden",
              }}
            >
              <img
                src={data.user.avatarUrl}
                alt={data.user.displayName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
                backgroundColor: data.status.color,
                borderRadius: "50%",
                border: "2px solid var(--md-sys-color-surface)",
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "var(--md-sys-color-on-surface)",
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.3,
              }}
            >
              {data.user.displayName}
            </Typography>
            <Chip
              label={data.status.label}
              size="small"
              sx={{
                backgroundColor: `${data.status.color}20`,
                color: data.status.color,
                fontWeight: 500,
                fontSize: "0.75rem",
                height: 20,
                "& .MuiChip-label": {
                  padding: "0 6px",
                },
              }}
            />
          </Box>
        </Box>

        {/* Custom Status */}
        {customStatus && (
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "var(--md-sys-color-on-surface-variant)",
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {customStatus.state && (
                <>
                  {customStatus.emoji && (
                    <span style={{ fontSize: "14px" }}>
                      {customStatus.emoji.name}
                    </span>
                  )}
                  {customStatus.state}
                </>
              )}
            </Typography>
          </Box>
        )}

        {/* Spotify */}
        {spotify && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
                borderRadius: "12px",
                padding: 2,
                marginBottom: 2,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {spotify.album_art_url && (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={spotify.album_art_url}
                      alt="Album Art"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {spotify.song}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.9,
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                    }}
                  >
                    by {spotify.artist}
                  </Typography>
                </Box>
                <Music size={16} />
              </Box>
            </Box>
          </motion.div>
        )}

        {/* Primary Activity */}
        {primaryActivity && !spotify && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                background: "var(--md-sys-color-primary-container)",
                borderRadius: "12px",
                padding: 2,
                marginBottom: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {primaryActivity.imageUrl && (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={primaryActivity.imageUrl}
                      alt="Activity"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--md-sys-color-on-primary-container)",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {primaryActivity.name}
                  </Typography>
                  {primaryActivity.details && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--md-sys-color-on-primary-container)",
                        opacity: 0.8,
                        fontSize: "0.75rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                      }}
                    >
                      {primaryActivity.details}
                    </Typography>
                  )}
                  {primaryActivity.state && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--md-sys-color-on-primary-container)",
                        opacity: 0.7,
                        fontSize: "0.7rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                      }}
                    >
                      {primaryActivity.state}
                    </Typography>
                  )}
                  {primaryActivity.elapsedTime && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--md-sys-color-on-primary-container)",
                        opacity: 0.6,
                        fontSize: "0.7rem",
                      }}
                    >
                      {primaryActivity.elapsedTime} elapsed
                    </Typography>
                  )}
                </Box>
                <Box sx={{ color: "var(--md-sys-color-on-primary-container)" }}>
                  <ActivityIcon activity={primaryActivity} />
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        {/* No activity message */}
        {!primaryActivity && !spotify && !customStatus && (
          <Typography
            variant="body2"
            sx={{
              color: "var(--md-sys-color-on-surface-variant)",
              textAlign: "center",
              fontStyle: "italic",
              padding: 2,
            }}
          >
            Not doing anything interesting right now
          </Typography>
        )}
      </CardContent>
    </MotionCard>
  );
}
