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
  Grow,
  Slide,
  Zoom,
  Container,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import DiscordIcon from "../components/icons/DiscordIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [skillsVisible, setSkillsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([]);
  const skillsCardRef = useRef<HTMLDivElement>(null);

  const frostStyle = {
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.background.paper, 0.7)})`,
    backdropFilter: "blur(12px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    boxShadow: `
      0 4px 20px ${alpha(theme.palette.common.black, 0.1)},
      inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}
    `,
  };

  const frostOverlay = {
    position: "relative" as const,
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.05)} 0%, transparent 50%)`,
      pointerEvents: "none",
    },
  };

  useEffect(() => {
    if (onTabSwitch) onTabSwitch();
    setMounted(true);

    // Initialize card visibility array
    setCardsVisible(new Array(6).fill(false));

    // Staggered animation for cards
    const timer = setTimeout(() => {
      setCardsVisible((prev) => prev.map((_) => true));
    }, 300);

    return () => clearTimeout(timer);
  }, [onTabSwitch]);

  // Skills animation observer
  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
          }
        },
        { threshold: 0.2 },
      );
      if (skillsCardRef.current) observer.observe(skillsCardRef.current);
      return () => observer.disconnect();
    } else {
      setSkillsVisible(true);
    }
  }, []);

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

  const getDiscordAvatarUrl = (user?: {
    id?: string;
    avatar?: string;
    discriminator?: string;
  }) => {
    if (!user) return undefined;
    if (user.avatar && user.id) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }
    const disc = user.discriminator ? parseInt(user.discriminator) : 0;
    return `https://cdn.discordapp.com/embed/avatars/${disc % 5}.png`;
  };

  const discordStatus: DiscordStatus =
    (lanyard?.data?.discord_status as DiscordStatus) || "offline";
  const activities = lanyard?.data?.activities || [];
  const customStatus = activities.find((a: any) => a.type === 4)?.state;
  const primaryActivity = activities.find((a: any) => a.type !== 4);

  return (
    <Fade in={mounted} timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 1, md: 3 },
          px: { xs: 1, sm: 2, md: 3 },
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
          {/* Header Section */}
          <Zoom in={mounted} timeout={600}>
            <Box
              sx={{
                textAlign: "center",
                mb: { xs: 3, md: 5 },
                width: "100%",
                px: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                variant={isMobile ? "h4" : "h3"}
                fontWeight={800}
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                About Me
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <CodeIcon fontSize="small" />
                Developer &
                <FavoriteIcon
                  fontSize="small"
                  sx={{ color: theme.palette.secondary.main }}
                />
                Anime Enthusiast
              </Typography>
            </Box>
          </Zoom>

          <Grid container spacing={2} justifyContent="center">
            {/* Left Column - Discord & Personal Info */}
            <Grid item xs={12} md={5}>
              {/* Discord Presence Card */}
              <Grow in={cardsVisible[0]} timeout={500}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    <DiscordIcon />
                    Discord Presence
                  </Typography>
                  <Paper
                    sx={{
                      ...frostStyle,
                      ...frostOverlay,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        mb: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      <Box
                        sx={{ position: "relative", display: "inline-block" }}
                      >
                        <Avatar
                          src={getDiscordAvatarUrl(user)}
                          alt={user?.username || "profile"}
                          sx={{
                            width: { xs: 64, md: 72 },
                            height: { xs: 64, md: 72 },
                            border: `3px solid ${statusColors[discordStatus] || statusColors.offline}`,
                            background: "#23272a",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            right: 2,
                            bottom: 2,
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background:
                              statusColors[discordStatus] ||
                              statusColors.offline,
                            border: "2px solid #23272a",
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          fontSize={{ xs: "1.1rem", md: "1.25rem" }}
                        >
                          {user ? `${user.username}` : "kmmiio99o"}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{
                            mt: 1,
                            justifyContent: { xs: "center", sm: "flex-start" },
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={18} />
                          ) : (
                            <Chip
                              label={discordStatus.toUpperCase()}
                              size={isMobile ? "small" : "medium"}
                              sx={{
                                background:
                                  statusColors[discordStatus] ||
                                  statusColors.offline,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "0.7rem", md: "0.8125rem" },
                              }}
                            />
                          )}

                          {customStatus && (
                            <Typography
                              variant="body2"
                              sx={{
                                ml: 1,
                                fontStyle: "italic",
                                fontSize: { xs: "0.75rem", md: "0.875rem" },
                              }}
                            >
                              {customStatus}
                            </Typography>
                          )}
                        </Stack>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, opacity: 0.3 }} />

                    <Box>
                      {loading ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 2,
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      ) : lanyard?.success ? (
                        <>
                          {primaryActivity ? (
                            <Paper
                              sx={{
                                p: 1.5,
                                background: alpha(
                                  theme.palette.background.default,
                                  0.4,
                                ),
                                borderRadius: 1.5,
                              }}
                            >
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
                                    sx={{
                                      width: { xs: 48, md: 56 },
                                      height: { xs: 48, md: 56 },
                                      borderRadius: 1,
                                    }}
                                  />
                                )}
                                <Box sx={{ flex: 1 }}>
                                  <Typography
                                    fontWeight={700}
                                    fontSize={{ xs: "0.9rem", md: "1rem" }}
                                  >
                                    {primaryActivity.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    fontSize={{ xs: "0.8rem", md: "0.875rem" }}
                                  >
                                    {primaryActivity.details ||
                                      primaryActivity.state ||
                                      ""}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Paper>
                          ) : (
                            <Typography
                              color="text.secondary"
                              textAlign="center"
                              fontSize={{ xs: "0.875rem", md: "1rem" }}
                            >
                              No active activity
                            </Typography>
                          )}

                          <Divider sx={{ my: 2, opacity: 0.3 }} />

                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            {socialLinks.map((s, index) => (
                              <Slide
                                key={s.label}
                                in={cardsVisible[0]}
                                timeout={800 + index * 100}
                                direction="up"
                              >
                                <IconButton
                                  component={MuiLink}
                                  href={s.url}
                                  target="_blank"
                                  aria-label={s.label}
                                  sx={{
                                    color: "inherit",
                                    background: frostStyle.background,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    "&:hover": {
                                      background: alpha(
                                        theme.palette.primary.main,
                                        0.1,
                                      ),
                                    },
                                    transition: "all 0.2s ease",
                                    size: { xs: "small", md: "medium" },
                                  }}
                                >
                                  {s.icon}
                                </IconButton>
                              </Slide>
                            ))}
                          </Box>
                        </>
                      ) : (
                        <Typography color="text.secondary" textAlign="center">
                          Discord status unavailable
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Box>
              </Grow>

              {/* Contact & Links */}
              <Grow in={cardsVisible[1]} timeout={600}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
                  >
                    Contact & Links
                  </Typography>
                  <Paper
                    sx={{
                      ...frostStyle,
                      ...frostOverlay,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Button
                        variant="contained"
                        startIcon={<EmailIcon />}
                        href="mailto:kmmiio99o@gmail.com"
                        component={MuiLink}
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          borderRadius: 1.5,
                          py: 1.2,
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "0.8rem", md: "0.9rem" },
                          "&:hover": {
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        kmmiio99o@gmail.com
                      </Button>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          justifyContent: { xs: "center", sm: "flex-start" },
                        }}
                      >
                        {socialLinks.map((s, index) => (
                          <Slide
                            key={s.label}
                            in={cardsVisible[1]}
                            timeout={700 + index * 100}
                            direction="up"
                          >
                            <Button
                              variant="outlined"
                              startIcon={s.icon}
                              component={MuiLink}
                              href={s.url}
                              target="_blank"
                              sx={{
                                flex: { xs: "1 1 45%", sm: "1" },
                                minWidth: { xs: "120px", sm: "auto" },
                                borderRadius: 1.5,
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "0.8rem", md: "0.9rem" },
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                "&:hover": {
                                  border: `1px solid ${theme.palette.primary.main}`,
                                  background: alpha(
                                    theme.palette.primary.main,
                                    0.05,
                                  ),
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              {s.label}
                            </Button>
                          </Slide>
                        ))}
                      </Box>
                    </Stack>
                  </Paper>
                </Box>
              </Grow>

              {/* Hobbies */}
              <Grow in={cardsVisible[2]} timeout={700}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
                  >
                    Hobbies & Interests
                  </Typography>
                  <Paper
                    sx={{
                      ...frostStyle,
                      ...frostOverlay,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      {hobbies.map((h, index) => (
                        <Slide
                          key={h.label}
                          in={cardsVisible[2]}
                          timeout={800 + index * 100}
                          direction="right"
                        >
                          <Button
                            component={h.internal ? Link : MuiLink}
                            to={h.internal}
                            href={h.url || "#"}
                            target={h.url ? "_blank" : undefined}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              borderRadius: 1.5,
                              py: 1.2,
                              px: 2,
                              background: alpha(
                                theme.palette.background.paper,
                                0.3,
                              ),
                              border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                              "&:hover": {
                                background: alpha(
                                  theme.palette.primary.main,
                                  0.08,
                                ),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <Box
                              component="span"
                              sx={{ mr: 2, fontSize: { xs: 16, md: 18 } }}
                            >
                              {h.icon}
                            </Box>
                            <Typography
                              fontWeight={600}
                              fontSize={{ xs: "0.8rem", md: "0.9rem" }}
                            >
                              {h.label}
                            </Typography>
                          </Button>
                        </Slide>
                      ))}
                    </Stack>
                  </Paper>
                </Box>
              </Grow>
            </Grid>

            {/* Right Column - Personal Info & Skills */}
            <Grid item xs={12} md={7}>
              {/* Basic Info */}
              <Grow in={cardsVisible[3]} timeout={500}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    <LocationOnIcon />
                    Personal Info
                  </Typography>
                  <Paper
                    sx={{
                      ...frostStyle,
                      ...frostOverlay,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            <strong>Name:</strong> kmmiio99o
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            <strong>Age:</strong> 16
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            <strong>Location:</strong> Poland
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            <strong>Languages:</strong> Polish (native), English
                            (B2)
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            <strong>Status:</strong> Student & Freelancer
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            <strong>Interests:</strong> Web Dev, Anime
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grow>

              {/* Education */}
              <Grow in={cardsVisible[4]} timeout={600}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    <SchoolIcon />
                    Education
                  </Typography>
                  <Paper
                    sx={{
                      ...frostStyle,
                      ...frostOverlay,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: { xs: "0.95rem", md: "1.05rem" } }}
                      >
                        Technical School - Logistics Profile
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.85rem", md: "0.9rem" } }}
                      >
                        Key Subjects: Supply Chain, Warehouse Management
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.85rem", md: "0.9rem" } }}
                      >
                        IT Skills: Self-taught programming alongside learning
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </Grow>

              {/* Skills */}
              <Grow in={cardsVisible[5]} timeout={700}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
                  >
                    Technical Skills
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.85rem", md: "0.9rem" },
                    }}
                  >
                    My top technologies and proficiency levels:
                  </Typography>
                  <Paper
                    ref={skillsCardRef}
                    sx={{
                      ...frostStyle,
                      ...frostOverlay,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      {skillsList.map((skill) => (
                        <Box
                          key={skill.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1, md: 2 },
                            width: "100%",
                            py: 0.5,
                          }}
                        >
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            sx={{
                              color: skill.color,
                              minWidth: { xs: 85, md: 100 },
                              flexShrink: 0,
                              fontSize: { xs: "0.8rem", md: "0.9rem" },
                            }}
                          >
                            {skill.name}
                          </Typography>
                          <Box
                            sx={{ flexGrow: 1, position: "relative", mx: 1 }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={skillsVisible ? skill.percent : 0}
                              sx={{
                                height: 8,
                                borderRadius: 1,
                                backgroundColor: alpha(
                                  theme.palette.common.white,
                                  0.1,
                                ),
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 1,
                                  background: `linear-gradient(90deg, ${skill.color}, ${alpha(skill.color, 0.7)})`,
                                  transition: "transform 1.5s ease-in-out",
                                  transform: `scaleX(${skillsVisible ? 1 : 0})`,
                                  transformOrigin: "left",
                                },
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              minWidth: 30,
                              textAlign: "right",
                              color: skill.color,
                              fontWeight: 700,
                              fontSize: { xs: "0.8rem", md: "0.9rem" },
                            }}
                          >
                            {skill.percent}%
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
};

export default About;
