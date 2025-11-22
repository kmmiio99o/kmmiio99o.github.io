import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
  Grid,
  Card,
  CardContent,
  IconButton,
  Fade,
  Slide,
  Zoom,
  Container,
  alpha,
  useTheme,
  Chip,
  LinearProgress,
} from "@mui/material";

import { keyframes } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

interface HomeProps {
  onTabSwitch: () => void;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(100, 100, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(100, 100, 255, 0.4);
  }
`;

const typewriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCaret = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: ${alpha("#fff", 0.8)};
  }
`;

const buttonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 4px 15px rgba(100, 100, 255, 0.3);
  }
  50% {
    box-shadow: 0 4px 25px rgba(100, 100, 255, 0.6);
  }
`;

const progressAnimation = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const skills = [
  {
    name: "React",
    color: "#61dafb",
    level: 88,
    description: "Modern UI development",
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    level: 85,
    description: "Type-safe JavaScript",
  },
  {
    name: "Node.js",
    color: "#339933",
    level: 82,
    description: "Server-side runtime",
  },
  {
    name: "Python",
    color: "#3776ab",
    level: 74,
    description: "Backend & automation",
  },
  {
    name: "Discord.js",
    color: "#5865f2",
    level: 86,
    description: "Bot development",
  },
  {
    name: "Material-UI",
    color: "#0081cb",
    level: 90,
    description: "React component library",
  },
];

const stats = [
  {
    label: "Years Coding",
    value: "1+",
    icon: <CodeIcon />,
    description: "Passionate learning",
  },
  {
    label: "Projects Built",
    value: "5+",
    icon: <WebIcon />,
    description: "Various applications",
  },
  {
    label: "Discord Bots",
    value: "2",
    icon: <SmartToyIcon />,
    description: "Active deployments",
  },
];

// Discord status types and colors
type DiscordStatus = "online" | "idle" | "dnd" | "offline";
const statusColors: Record<DiscordStatus, string> = {
  online: "#43b581",
  idle: "#faa61a",
  dnd: "#f04747",
  offline: "#747f8d",
};

const Home: React.FC<HomeProps> = ({ onTabSwitch }) => {
  const [mounted, setMounted] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => false));
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [lanyard, setLanyard] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [skillsInView, setSkillsInView] = useState(false);
  const theme = useTheme();

  // Frosted glass style
  const frostStyle = {
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
    backdropFilter: "blur(10px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  };

  useEffect(() => {
    onTabSwitch();
    setMounted(true);

    // Show subtitle after a delay for typewriter effect
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1200);

    // Animate stats with delays
    const timers = stats.map((_, index) =>
      setTimeout(
        () => {
          setAnimatedStats((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        },
        1500 + index * 300,
      ),
    );

    // Trigger skills animation
    const skillsTimer = setTimeout(() => setSkillsInView(true), 1800);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(skillsTimer);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [onTabSwitch]);

  // Fetch Lanyard data
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
  const discordStatus: DiscordStatus =
    (lanyard?.data?.discord_status as DiscordStatus) || "offline";

  // Helper to construct Discord avatar URL
  const getDiscordAvatarUrl = (user?: {
    id?: string;
    avatar?: string;
    discriminator?: string;
  }) => {
    if (!user) return "https://cdn.discordapp.com/embed/avatars/0.png";
    if (user.avatar && user.id) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    }
    const disc = user.discriminator ? parseInt(user.discriminator) : 0;
    return `https://cdn.discordapp.com/embed/avatars/${disc % 5}.png`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Hero Section */}
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Fade in={mounted} timeout={800}>
            <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
              {/* Avatar with Lanyard integration */}
              <Box
                sx={{
                  animation: `${float} 6s ease-in-out infinite`,
                  mb: 4,
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    src={getDiscordAvatarUrl(user)}
                    alt={user?.username || "kmmiio99o"}
                    sx={{
                      width: { xs: 120, md: 160 },
                      height: { xs: 120, md: 160 },
                      border: "3px solid",
                      borderColor:
                        statusColors[discordStatus] || statusColors.offline,
                      animation: `${glow} 4s ease-in-out infinite`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        borderColor: alpha(
                          statusColors[discordStatus] || statusColors.offline,
                          0.8,
                        ),
                      },
                    }}
                  />
                  {/* Status indicator */}
                  <Box
                    sx={{
                      position: "absolute",
                      right: 8,
                      bottom: 8,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background:
                        statusColors[discordStatus] || statusColors.offline,
                      border: "3px solid",
                      borderColor: theme.palette.background.paper,
                      boxShadow: 2,
                    }}
                  />
                </Box>
              </Box>

              <Slide in={mounted} timeout={600} direction="down">
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontWeight: 500,
                    animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
                  }}
                >
                  👋 Hello, I'm
                </Typography>
              </Slide>

              <Zoom in={mounted} timeout={800}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    mb: 3,
                  }}
                >
                  {user?.username || "kmmiio99o"}
                </Typography>
              </Zoom>

              {/* Fixed Typewriter Effect with Proper Cursor Alignment */}
              <Box
                sx={{
                  mb: 3,
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showSubtitle && (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="h5"
                      color="text.primary"
                      sx={{
                        fontWeight: 600,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        animation: `${typewriter} 1.5s steps(30, end)`,
                        lineHeight: 1.2,
                      }}
                    >
                      Full-Stack Developer & Bot Creator
                    </Typography>
                    <Box
                      sx={{
                        width: "3px",
                        height: "1.4em",
                        backgroundColor: theme.palette.primary.main,
                        marginLeft: "4px",
                        animation: `${blinkCaret} 0.75s step-end infinite`,
                        alignSelf: "center",
                      }}
                    />
                  </Box>
                )}
              </Box>

              <Fade in={mounted} timeout={1200}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    maxWidth: 600,
                    mx: "auto",
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  16-year-old developer from Poland passionate about creating
                  modern web applications and Discord bots. Specializing in
                  React, TypeScript, and Python.
                </Typography>
              </Fade>

              {/* Discord Status Chip */}
              {!loading && lanyard?.success && (
                <Fade in={mounted} timeout={1300}>
                  <Chip
                    label={`${discordStatus.toUpperCase()} ON DISCORD`}
                    size="small"
                    sx={{
                      mb: 3,
                      background:
                        statusColors[discordStatus] || statusColors.offline,
                      color: "white",
                      fontWeight: 600,
                      animation: `${fadeInUp} 0.8s ease-out 1.1s both`,
                    }}
                  />
                </Fade>
              )}

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                <Slide in={mounted} timeout={1400} direction="right">
                  <Button
                    component={Link}
                    to="/projects"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      animation: `${buttonGlow} 3s ease-in-out infinite`,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.05)",
                        boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                        animation: "none",
                        "&::before": {
                          transform: "translateX(100%)",
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${alpha("#fff", 0.2)}, transparent)`,
                        transform: "translateX(-100%)",
                        transition: "transform 0.6s ease",
                      },
                      transition: "all 0.4s ease",
                    }}
                  >
                    View My Work
                  </Button>
                </Slide>

                <Slide in={mounted} timeout={1600} direction="left">
                  <Button
                    component={Link}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      borderWidth: 2,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        borderWidth: 2,
                        transform: "translateY(-3px) scale(1.05)",
                        background: alpha(theme.palette.primary.main, 0.1),
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                        "&::before": {
                          transform: "translateX(100%)",
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                        transform: "translateX(-100%)",
                        transition: "transform 0.6s ease",
                      },
                      transition: "all 0.4s ease",
                    }}
                  >
                    About Me
                  </Button>
                </Slide>
              </Stack>

              {/* Quick contact buttons */}
              <Fade in={mounted} timeout={1800}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    href="https://github.com/kmmiio99o"
                    target="_blank"
                    sx={{
                      background: frostStyle.background,
                      backdropFilter: frostStyle.backdropFilter,
                      border: frostStyle.border,
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.1),
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    href="mailto:kmmiio99o@gmail.com"
                    sx={{
                      background: frostStyle.background,
                      backdropFilter: frostStyle.backdropFilter,
                      border: frostStyle.border,
                      "&:hover": {
                        background: alpha(theme.palette.secondary.main, 0.1),
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Stack>
              </Fade>
            </Box>
          </Fade>

          {/* Redesigned Skills Section */}
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <Fade in={mounted} timeout={1000}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                sx={{ mb: 1 }}
              >
                Technical Skills
              </Typography>
            </Fade>

            <Fade in={mounted} timeout={1200}>
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
              >
                Technologies I work with and my proficiency levels
              </Typography>
            </Fade>

            <Grid container spacing={2} justifyContent="center">
              {skills.map((skill, index) => (
                <Grid item xs={12} sm={6} key={skill.name}>
                  <Slide
                    in={mounted}
                    timeout={1000 + index * 100}
                    direction="up"
                  >
                    <Card
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        background: frostStyle.background,
                        backdropFilter: frostStyle.backdropFilter,
                        border: `1px solid ${alpha(skill.color, 0.1)}`,
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 12px 28px ${alpha(skill.color, 0.15)}`,
                          border: `1px solid ${alpha(skill.color, 0.3)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: "0 !important" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1.5,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              sx={{
                                color: skill.color,
                                mb: 0.5,
                              }}
                            >
                              {skill.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              {skill.description}
                            </Typography>
                          </Box>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{
                              color: skill.color,
                              minWidth: 45,
                              textAlign: "right",
                            }}
                          >
                            {skill.level}%
                          </Typography>
                        </Box>

                        {/* Enhanced Progress Bar */}
                        <Box sx={{ position: "relative", mb: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={skillsInView ? skill.level : 0}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: alpha(
                                theme.palette.common.white,
                                0.1,
                              ),
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 4,
                                background: `linear-gradient(90deg, ${skill.color}, ${alpha(skill.color, 0.8)})`,
                                transformOrigin: "left",
                                animation: skillsInView
                                  ? `${progressAnimation} 1.5s ease-out`
                                  : "none",
                              },
                            }}
                          />
                        </Box>

                        {/* Skill Level Labels */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Basic
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <Box
                                key={dot}
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    dot <= Math.ceil(skill.level / 20)
                                      ? skill.color
                                      : alpha(
                                          theme.palette.text.secondary,
                                          0.2,
                                        ),
                                  transition: "all 0.3s ease",
                                  transform:
                                    dot <= Math.ceil(skill.level / 20)
                                      ? "scale(1.2)"
                                      : "scale(1)",
                                }}
                              />
                            ))}
                          </Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Advanced
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Stats Section */}
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <Fade in={mounted} timeout={1000}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                sx={{ mb: 4 }}
              >
                My Journey in Numbers
              </Typography>
            </Fade>

            <Grid container spacing={3} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={stat.label}>
                  <Zoom in={animatedStats[index]} timeout={800}>
                    <Card
                      sx={{
                        textAlign: "center",
                        p: 3,
                        borderRadius: 2,
                        height: "100%",
                        background: frostStyle.background,
                        backdropFilter: frostStyle.backdropFilter,
                        border: frostStyle.border,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            color: theme.palette.primary.main,
                            mb: 2,
                            animation: `${float} 4s ease-in-out infinite`,
                          }}
                        >
                          {React.cloneElement(stat.icon, {
                            sx: { fontSize: "2.5rem" },
                          })}
                        </Box>
                        <Typography
                          variant="h2"
                          fontWeight={900}
                          color="primary"
                          sx={{
                            mb: 1,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{ mb: 1 }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <Fade in={mounted} timeout={1200}>
            <Paper
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 2,
                textAlign: "center",
                background: frostStyle.background,
                backdropFilter: frostStyle.backdropFilter,
                border: frostStyle.border,
              }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                Let's Build Something Amazing
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
              >
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  startIcon={<GitHubIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Explore My GitHub
                </Button>
                <Button
                  href="mailto:kmmiio99o@gmail.com"
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      transform: "translateY(-2px)",
                      background: alpha(theme.palette.primary.main, 0.05),
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get In Touch
                </Button>
              </Stack>
            </Paper>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
