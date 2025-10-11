import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  Grid,
  Stack,
  CircularProgress,
  LinearProgress,
  Button,
  IconButton,
  Link as MuiLink,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import DiscordIcon from "../components/icons/DiscordIcon";

interface AboutProps {
  onTabSwitch: () => void;
}

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

const statusColors: Record<DiscordStatus, string> = {
  online: "#43b581",
  idle: "#faa61a",
  dnd: "#f04747",
  offline: "#747f8d",
};

const skillsList = [
  { id: "html", name: "HTML5", percent: 95, color: "#e34c26" },
  { id: "css", name: "CSS3", percent: 93, color: "#1572b6" },
  { id: "js", name: "JavaScript (Discord.js)", percent: 86, color: "#f0db4f" },
  { id: "python", name: "Python (Discord.py)", percent: 74, color: "#306998" },
  { id: "react", name: "React & MUI", percent: 88, color: "#61dafb" },
];

const socialLinks = [
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    url: "https://github.com/kmmiio99o",
  },
  {
    icon: <DiscordIcon />,
    label: "Discord",
    url: "https://discord.com/users/879393496627306587",
  },
];

const hobbies = [
  {
    icon: "🎞️",
    label: "Anime Collection",
    url: "https://myanimelist.net/animelist/kmmiio99o",
  },
  { icon: "💻", label: "Coding projects", internal: "/projects" },
  { icon: "🎮", label: "Gaming" },
];

const About: React.FC<AboutProps> = ({ onTabSwitch }) => {
  const [lanyard, setLanyard] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // --- Skills Card Animation ---
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setSkillsVisible(true);
        },
        { threshold: 0.3 },
      );
      if (skillsCardRef.current) observer.observe(skillsCardRef.current);
      return () => observer.disconnect();
    } else {
      // Fallback: show skills immediately if IntersectionObserver is not available
      setSkillsVisible(true);
    }
  }, []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (onTabSwitch) onTabSwitch();
    setMounted(true);
  }, [onTabSwitch]);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.lanyard.rest/v1/users/879393496627306587")
      .then((res) => res.json())
      .then((data) => {
        setLanyard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lanyard API error:", error);
        setLoading(false);
      });
  }, []);

  const user = lanyard?.data?.discord_user;

  // Helper to construct Discord avatar URL
  const getDiscordAvatarUrl = (user?: {
    id?: string;
    avatar?: string;
    discriminator?: string;
  }) => {
    if (!user) return undefined;
    if (user.avatar && user.id) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }
    // Default avatar if no custom avatar
    const disc = user.discriminator ? parseInt(user.discriminator) : 0;
    return `https://cdn.discordapp.com/embed/avatars/${disc % 5}.png`;
  };

  const discordStatus: DiscordStatus =
    (lanyard?.data?.discord_status as DiscordStatus) || "offline";
  const activities = lanyard?.data?.activities || [];
  const customStatus = activities.find((a: any) => a.type === 4)?.state;
  const primaryActivity = activities.find((a: any) => a.type !== 4);

  return (
    <Fade in={mounted} timeout={900}>
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 2, md: 4 },
          px: { xs: 1, sm: 2, md: 4 },
          backgroundColor: "transparent", // fully transparent for starfield
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4, width: "100%" }}>
          <Typography variant="h4" fontWeight={900} gutterBottom>
            About Me
          </Typography>
          <Typography color="text.secondary">
            Developer & Anime Enthusiast
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          sx={{
            maxWidth: 1400,
            mx: "auto",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Discord Presence - Show first on mobile */}
          <Grid item xs={12} md={6} lg={6} sx={{ order: { xs: -1, md: 0 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Discord Presence
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      src={getDiscordAvatarUrl(user)}
                      alt={user?.username || "profile"}
                      sx={{
                        width: 72,
                        height: 72,
                        boxShadow: 3,
                        border: "3px solid",
                        borderColor:
                          statusColors[discordStatus] || statusColors.offline,
                        background: "#23272a",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        right: 4,
                        bottom: 4,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background:
                          statusColors[discordStatus] || statusColors.offline,
                        border: "2px solid #23272a",
                        boxShadow: 2,
                        zIndex: 2,
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={800}>
                      {user ? `${user.username}` : "kmmiio99o"}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      {loading ? (
                        <CircularProgress size={18} />
                      ) : (
                        <Chip
                          label={discordStatus.toUpperCase()}
                          sx={{
                            background:
                              statusColors[discordStatus] ||
                              statusColors.offline,
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        />
                      )}

                      {customStatus && (
                        <Typography
                          variant="body2"
                          sx={{
                            ml: 1,
                            fontStyle: "italic",
                            color: "text.secondary",
                          }}
                        >
                          {customStatus}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box>
                  {loading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", p: 2 }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : lanyard?.success ? (
                    <>
                      {primaryActivity ? (
                        <Paper sx={{ p: 1, background: "rgba(0,0,0,0.06)" }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            {primaryActivity.assets?.large_image && (
                              <Avatar
                                variant="rounded"
                                src={
                                  primaryActivity.assets.large_image.startsWith(
                                    "mp:external/",
                                  )
                                    ? primaryActivity.assets.large_image.replace(
                                        "mp:external/",
                                        "https://media.discordapp.net/external/",
                                      )
                                    : `https://cdn.discordapp.com/app-assets/${primaryActivity.application_id}/${primaryActivity.assets.large_image}.png`
                                }
                                sx={{ width: 56, height: 56 }}
                              />
                            )}
                            <Box>
                              <Typography fontWeight={700}>
                                {primaryActivity.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {primaryActivity.details ||
                                  primaryActivity.state ||
                                  ""}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      ) : (
                        <Typography color="text.secondary">
                          No active activity.
                        </Typography>
                      )}

                      <Divider sx={{ my: 1 }} />

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        {socialLinks.map((s) => (
                          <IconButton
                            key={s.label}
                            component={MuiLink}
                            href={s.url}
                            target="_blank"
                            aria-label={s.label}
                            sx={{ color: "inherit" }}
                          >
                            {s.icon}
                          </IconButton>
                        ))}
                      </Box>
                    </>
                  ) : (
                    <Typography color="text.secondary">
                      Discord status unavailable.
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Contact & Links
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <MuiLink href="mailto:kmmiio99o@gmail.com" underline="none">
                    <Button variant="contained">
                      Email: kmmiio99o@gmail.com
                    </Button>
                  </MuiLink>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 0.5, md: 1 },
                      mt: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {socialLinks.map((s) => (
                      <Button
                        key={s.label}
                        variant="outlined"
                        startIcon={s.icon}
                        component={MuiLink}
                        href={s.url}
                        target="_blank"
                      >
                        {s.label}
                      </Button>
                    ))}
                  </Box>
                </Stack>
              </Paper>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Hobbies
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  {hobbies.map((h, i) => (
                    <Button
                      key={i}
                      component={h.internal ? Link : MuiLink}
                      to={h.internal}
                      href={h.url || "#"}
                      target={h.url ? "_blank" : undefined}
                      variant="contained"
                      size="small"
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        background: "rgba(255,255,255,0.03)",
                        color: "text.primary",
                      }}
                    >
                      <Box component="span" sx={{ mr: 2 }}>
                        <Box component="span" sx={{ fontSize: 16 }}>
                          {h.icon}
                        </Box>
                      </Box>
                      <Box component="span">{h.label}</Box>
                    </Button>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Grid>

          {/* Left column - Main content */}
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Basic Info
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <Typography>
                    <strong>Name:</strong> kmmiio99o
                  </Typography>
                  <Typography>
                    <strong>Age:</strong> 16
                  </Typography>
                  <Typography>
                    <strong>Location:</strong> Poland
                  </Typography>
                  <Typography>
                    <strong>Languages:</strong> Polish (native), English (B2)
                  </Typography>
                  <Typography>
                    <strong>Interests:</strong> Web Dev, Anime
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> Student & Freelancer
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Education
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <Typography>
                    <strong>School:</strong> Technical School - Logistics
                    Profile
                  </Typography>
                  <Typography>
                    <strong>Key Subjects:</strong> Supply Chain, Warehouse
                    Management
                  </Typography>
                  <Typography>
                    <strong>IT Skills:</strong> Self-taught programming
                    alongside learning
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Skills
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                My top technologies and proficiency levels:
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  mt: 2,
                  mb: 2,
                  maxWidth: 600,
                  mx: "auto",
                  background: (theme) => theme.palette.background.paper,
                }}
              >
                <Stack spacing={2}>
                  {skillsList.map((s) => (
                    <Box
                      key={s.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        sx={{
                          color: s.color,
                          minWidth: 90,
                          flexShrink: 0,
                          fontSize: { xs: "1rem", sm: "1.08rem" },
                        }}
                      >
                        {s.name}
                      </Typography>
                      <Box sx={{ flexGrow: 1, position: "relative", mx: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={s.percent}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.12)"
                                : "rgba(0,0,0,0.08)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 4,
                              backgroundColor: s.color,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          minWidth: 36,
                          textAlign: "right",
                          color: s.color,
                          fontWeight: 600,
                        }}
                      >
                        {s.percent}%
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default About;
