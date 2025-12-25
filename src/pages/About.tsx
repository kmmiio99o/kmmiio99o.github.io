import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Chip,
  Divider,
  Stack,
  Button,
  Container,
  useTheme,
  Card,
  CardContent,
  LinearProgress,
  alpha,
  Skeleton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Snowfall from "../components/Snowfall";

import {
  subscribeLanyard,
  getDiscordAvatarUrl as resolveDiscordAvatarUrl,
} from "../api/lanyard";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import DiscordIcon from "../components/icons/DiscordIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MovieIcon from "@mui/icons-material/Movie";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LaunchIcon from "@mui/icons-material/Launch";

interface AboutProps {
  onTabSwitch: () => void;
}

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

const STATUS_CONFIG: Record<DiscordStatus, { color: string; label: string }> = {
  online: { color: "#57f287", label: "Online" },
  idle: { color: "#faa61a", label: "Idle" },
  dnd: { color: "#ed4245", label: "Do Not Disturb" },
  offline: { color: "#8b949e", label: "Offline" },
};

const SKILLS = [
  { name: "HTML5", level: 95, color: "#e34c26" },
  { name: "CSS3", level: 93, color: "#1572b6" },
  { name: "JavaScript", level: 86, color: "#f0db4f" },
  { name: "React", level: 88, color: "#61dafb" },
  { name: "Python", level: 74, color: "#306998" },
  { name: "Discord.js", level: 86, color: "#5865f2" },
];

const About: React.FC<AboutProps> = ({ onTabSwitch }) => {
  const theme = useTheme();
  const [lanyard, setLanyard] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    if (onTabSwitch) onTabSwitch();

    // Subscribe to lanyard updates via the shared polling helper.
    // The helper will call our callback whenever data changes (it handles deduping).
    setLoading(true);
    const unsubscribe = subscribeLanyard(
      "879393496627306587",
      (data) => {
        setLanyard(data);
        setLoading(false);
      },
      5000, // poll interval 5s
    );

    const timer = setTimeout(() => setAnimateSkills(true), 500);
    return () => {
      // unsubscribe from shared polling and clear timers
      try {
        unsubscribe();
      } catch {
        // ignore
      }
      clearTimeout(timer);
    };
  }, [onTabSwitch]);

  const user = lanyard?.data?.discord_user;
  const discordStatus: DiscordStatus =
    (lanyard?.data?.discord_status as DiscordStatus) || "offline";
  const statusConfig = STATUS_CONFIG[discordStatus];
  const activities = lanyard?.data?.activities || [];
  const primaryActivity = activities.find((a: any) => a.type !== 4);

  // Use centralized avatar resolver from the lanyard helper (handles animated avatars)
  const getDiscordAvatarUrl = (user?: { id?: string; avatar?: string }) => {
    return resolveDiscordAvatarUrl(user);
  };

  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{
        py: { xs: 4, md: 8 },
        minHeight: "100vh",
      }}
    >
      <Snowfall
        count={140}
        speed={1.15}
        wind={0.18}
        color={theme.palette.mode === "dark" ? "#ffffff" : "#f0f4ff"}
        opacity={0.32}
        zIndex={-1}
      />
      {/* Hero Card with Profile */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(30, 30, 50, 0.1) 0%, rgba(50, 50, 70, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.08)"
          }`,
          overflow: "visible",
          position: "relative",
          backdropFilter: "blur(8px)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "center", sm: "flex-start" }}
          >
            {loading ? (
              <Skeleton variant="circular" width={140} height={140} />
            ) : (
              <Avatar
                src={getDiscordAvatarUrl(user)}
                alt="Profile"
                sx={{
                  width: { xs: 120, md: 140 },
                  height: { xs: 120, md: 140 },
                  border: `4px solid ${statusConfig.color}`,
                  boxShadow: `0 0 0 4px ${alpha(statusConfig.color, 0.2)}, 0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
                  animation:
                    discordStatus === "online"
                      ? "pulse 3s ease-in-out infinite"
                      : "none",
                  "@keyframes pulse": {
                    "0%, 100%": {
                      boxShadow: `0 0 0 4px ${alpha(statusConfig.color, 0.2)}, 0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
                    },
                    "50%": {
                      boxShadow: `0 0 0 8px ${alpha(statusConfig.color, 0.4)}, 0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
                    },
                  },
                }}
              >
                {!user?.avatar && "K"}
              </Avatar>
            )}

            <Stack
              spacing={2}
              flex={1}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <header>
                <Typography
                  component="h1"
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  kmmiio99o
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontWeight={500}
                  sx={{ textAlign: { xs: "center", sm: "left" } }}
                >
                  Developer & Student
                </Typography>
              </header>

              {loading ? (
                <Stack direction="row" spacing={1}>
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={32}
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={32}
                    sx={{ borderRadius: 2 }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Box
                    sx={{
                      display: { xs: "grid", sm: "flex" },
                      gridTemplateColumns: { xs: "repeat(2, 1fr)" },
                      gap: 1,
                      justifyContent: { xs: "center", sm: "flex-start" },
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Chip
                      label={statusConfig.label}
                      sx={{
                        bgcolor: `${statusConfig.color}15`,
                        color: statusConfig.color,
                        fontWeight: 700,
                        border: `1px solid ${statusConfig.color}20`,
                        borderRadius: 1.5,
                        backdropFilter: "blur(4px)",
                        width: { xs: "100%", sm: "auto" },
                        justifyContent: "center",
                        px: 1.25,
                        py: 0.5,
                      }}
                    />
                    <Chip
                      icon={<LocationOnIcon />}
                      label="Poland"
                      variant="outlined"
                      sx={{
                        borderRadius: 1.5,
                        backdropFilter: "blur(4px)",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(99, 102, 241, 0.25)"
                        }`,
                        width: { xs: "100%", sm: "auto" },
                        justifyContent: "center",
                        px: 1.25,
                        py: 0.5,
                      }}
                    />
                    <Chip
                      icon={<LanguageIcon />}
                      label="15 years old"
                      variant="outlined"
                      sx={{
                        borderRadius: 1.5,
                        backdropFilter: "blur(4px)",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(99, 102, 241, 0.25)"
                        }`,

                        gridColumn: { xs: "1 / -1", sm: "auto" },
                        justifySelf: { xs: "center", sm: "start" },
                        width: { xs: "60%", sm: "auto" },
                        py: { xs: 1, sm: 0.5 },
                      }}
                    />
                  </Box>
                </Stack>
              )}

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  href="mailto:kmmiio99o@gmail.com"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    width: { xs: "100%", sm: "auto" },
                    backdropFilter: "blur(8px)",
                    "&:hover": {
                      boxShadow: `0 8px 25px ${
                        theme.palette.mode === "dark"
                          ? "rgba(99, 102, 241, 0.3)"
                          : "rgba(99, 102, 241, 0.2)"
                      }`,
                    },
                  }}
                >
                  Email Me
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    width: { xs: "100%", sm: "auto" },
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(99, 102, 241, 0.25)"
                    }`,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(99, 102, 241, 0.06)",
                    },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DiscordIcon />}
                  href="https://discord.com/users/879393496627306587"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    width: { xs: "100%", sm: "auto" },
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(99, 102, 241, 0.25)"
                    }`,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(99, 102, 241, 0.06)",
                    },
                  }}
                >
                  Discord
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {!loading && primaryActivity && (
            <>
              <Divider sx={{ my: 3 }} />
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                      : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.08)"
                  }`,
                  borderRadius: 2,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {primaryActivity.assets?.large_image ? (
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
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(0, 0, 0, 0.08)"
                        }`,
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(99, 102, 241, 0.15)",
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(0, 0, 0, 0.08)"
                        }`,
                      }}
                    >
                      <CodeIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                  )}
                  <Stack flex={1} sx={{ minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      CURRENTLY ACTIVE
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {primaryActivity.name}
                    </Typography>
                    {primaryActivity.details && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {primaryActivity.details}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Facts - Redesigned */}
      <section style={{ marginBottom: "2rem" }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Avatar
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(168, 85, 247, 0.2)"
                  : "rgba(168, 85, 247, 0.15)",
              width: 48,
              height: 48,
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(168, 85, 247, 0.25)"
              }`,
              backdropFilter: "blur(8px)",
            }}
          >
            <LanguageIcon sx={{ fontSize: 24 }} />
          </Avatar>
          <div>
            <Typography variant="h5" fontWeight={800}>
              Quick Facts
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              About me at a glance
            </Typography>
          </div>
        </Stack>

        <Stack spacing={2}>
          {/* Status & Education Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Status Card */}
            <Card
              elevation={0}
              sx={{
                flex: 1,
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.08)"
                }`,
                borderRadius: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(99, 102, 241, 0.15)",
                      color: "primary.main",
                      width: 56,
                      height: 56,
                      borderRadius: 1.5,
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(99, 102, 241, 0.25)"
                      }`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <WorkIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Stack>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={700}
                      sx={{ letterSpacing: 0.5 }}
                    >
                      CURRENT STATUS
                    </Typography>
                    <Typography variant="h6" fontWeight={800}>
                      Student & Freelancer
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Balancing studies with freelance projects
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Education Card */}
            <Card
              elevation={0}
              sx={{
                flex: 1,
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.08)"
                }`,
                borderRadius: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                  borderColor: theme.palette.secondary.main,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(168, 85, 247, 0.2)"
                          : "rgba(168, 85, 247, 0.15)",
                      color: "secondary.main",
                      width: 56,
                      height: 56,
                      borderRadius: 1.5,
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(168, 85, 247, 0.25)"
                      }`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Stack>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={700}
                      sx={{ letterSpacing: 0.5 }}
                    >
                      EDUCATION
                    </Typography>
                    <Typography variant="h6" fontWeight={800}>
                      Technical School
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Logistics profile with IT focus
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          {/* Languages Card */}
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.08)"
              }`,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[6],
                borderColor: theme.palette.success.main,
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(16, 185, 129, 0.15)",
                      color: "success.main",
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(16, 185, 129, 0.25)"
                      }`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <LanguageIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight={800}>
                    Languages
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                  <Chip
                    label={
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" fontWeight={700}>
                          Polish
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          (Native)
                        </Typography>
                      </Stack>
                    }
                    sx={{
                      fontWeight: 600,
                      height: 40,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(16, 185, 129, 0.15)",
                      color: "success.main",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(16, 185, 129, 0.25)"
                      }`,
                      borderRadius: 1.5,
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <Chip
                    label={
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" fontWeight={700}>
                          English
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          (B2)
                        </Typography>
                      </Stack>
                    }
                    sx={{
                      fontWeight: 600,
                      height: 40,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(59, 130, 246, 0.15)",
                      color: "info.main",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(59, 130, 246, 0.25)"
                      }`,
                      borderRadius: 1.5,
                      backdropFilter: "blur(4px)",
                    }}
                  />
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Fluent in Polish, conversational in English with technical
                  vocabulary
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Technical Skills */}
      <section style={{ marginBottom: "2rem" }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Avatar
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.15)",
              width: 48,
              height: 48,
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(99, 102, 241, 0.25)"
              }`,
              backdropFilter: "blur(8px)",
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 24 }} />
          </Avatar>
          <div>
            <Typography variant="h5" fontWeight={800}>
              Technical Skills
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              Proficiency levels across technologies
            </Typography>
          </div>
        </Stack>

        <Card
          elevation={0}
          sx={{
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(30, 30, 50, 0.1) 0%, rgba(50, 50, 70, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            backdropFilter: "blur(8px)",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={2.5}>
              {SKILLS.map((skill, index) => (
                <Stack
                  key={skill.name}
                  spacing={1.5}
                  sx={{
                    opacity: animateSkills ? 1 : 0,
                    transform: animateSkills
                      ? "translateY(0)"
                      : "translateY(10px)",
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: alpha(skill.color, 0.1),
                          color: skill.color,
                          fontWeight: 700,
                          fontSize: 14,
                          border: `1px solid ${alpha(skill.color, 0.2)}`,
                          borderRadius: 1.5,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {skill.name.charAt(0)}
                      </Avatar>
                      <Stack>
                        <Typography variant="body1" fontWeight={700}>
                          {skill.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          {skill.level >= 90
                            ? "Expert"
                            : skill.level >= 75
                              ? "Advanced"
                              : skill.level >= 60
                                ? "Intermediate"
                                : "Beginner"}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{
                        color: skill.color,
                      }}
                    >
                      {skill.level}%
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <LinearProgress
                      variant="determinate"
                      value={animateSkills ? skill.level : 0}
                      sx={{
                        height: 12,
                        borderRadius: 1.5,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? alpha(theme.palette.common.white, 0.08)
                            : alpha(theme.palette.common.black, 0.06),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 1.5,
                          background: `linear-gradient(90deg,
                            ${alpha(skill.color, 0.8)} 0%,
                            ${skill.color} 50%,
                            ${alpha(skill.color, 0.8)} 100%)`,
                          transition: `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`,
                        },
                      }}
                    />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ px: 0.5 }}
                    >
                      {[0, 25, 50, 75, 100].map((point) => (
                        <Typography
                          key={point}
                          variant="caption"
                          color="text.secondary"
                          fontWeight={600}
                          sx={{
                            fontSize: 10,
                            opacity: 0.7,
                          }}
                        >
                          {point}%
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </section>

      {/* Hobbies & Interests - Redesigned */}
      <section>
        <Typography variant="h5" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
          Hobbies & Interests
        </Typography>

        <Stack spacing={2}>
          {/* Anime Collection Card */}
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.08)"
              }`,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
                borderColor: theme.palette.error.main,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(239, 68, 68, 0.2)"
                        : "rgba(239, 68, 68, 0.15)",
                    color: "error.main",
                    width: 60,
                    height: 60,
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(239, 68, 68, 0.25)"
                    }`,
                    borderRadius: 1.5,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <MovieIcon sx={{ fontSize: 28 }} />
                </Avatar>

                <Stack flex={1} spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    Anime Collection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tracking and rating anime series on MyAnimeList. Currently
                    watching several seasonal shows.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="MyAnimeList"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(239, 68, 68, 0.15)",
                        color: "error.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(239, 68, 68, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                  </Stack>
                </Stack>

                <Button
                  variant="outlined"
                  endIcon={<LaunchIcon />}
                  href="https://myanimelist.net/animelist/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    minWidth: 120,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(239, 68, 68, 0.25)"
                    }`,
                    color: "error.main",
                    "&:hover": {
                      borderColor: "error.dark",
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(239, 68, 68, 0.1)"
                          : "rgba(239, 68, 68, 0.06)",
                    },
                    width: { xs: "100%", sm: "auto" },
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  View Profile
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Coding Projects Card */}
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.08)"
              }`,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(99, 102, 241, 0.2)"
                        : "rgba(99, 102, 241, 0.15)",
                    color: "primary.main",
                    width: 60,
                    height: 60,
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(99, 102, 241, 0.25)"
                    }`,
                    borderRadius: 1.5,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <CodeIcon sx={{ fontSize: 28 }} />
                </Avatar>

                <Stack flex={1} spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    Development Projects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Building web applications, learning new technologies, and
                    contributing to open source projects.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="React"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(99, 102, 241, 0.15)",
                        color: "primary.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(99, 102, 241, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                    <Chip
                      label="TypeScript"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(99, 102, 241, 0.15)",
                        color: "primary.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(99, 102, 241, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                    <Chip
                      label="Open Source"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(99, 102, 241, 0.15)",
                        color: "primary.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(99, 102, 241, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                  </Stack>
                </Stack>

                <Button
                  variant="outlined"
                  endIcon={<LaunchIcon />}
                  component={Link}
                  to="/projects"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    minWidth: 120,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(99, 102, 241, 0.25)"
                    }`,
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark",
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(99, 102, 241, 0.06)",
                    },
                    width: { xs: "100%", sm: "auto" },
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  View Projects
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Gaming Card */}
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.08)"
              }`,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
                borderColor: theme.palette.success.main,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(16, 185, 129, 0.15)",
                    color: "success.main",
                    width: 60,
                    height: 60,
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(16, 185, 129, 0.25)"
                    }`,
                    borderRadius: 1.5,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <SportsEsportsIcon sx={{ fontSize: 28 }} />
                </Avatar>

                <Stack flex={1} spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    Gaming
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enjoying various video games in free time. Mostly playing
                    FPS, RPG, and indie games.
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1 }}
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Chip
                      label="FPS"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(16, 185, 129, 0.15)",
                        color: "success.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(16, 185, 129, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                    <Chip
                      label="RPG"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(16, 185, 129, 0.15)",
                        color: "success.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(16, 185, 129, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                    <Chip
                      label="Indie"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(16, 185, 129, 0.15)",
                        color: "success.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(16, 185, 129, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                    <Chip
                      label="Multiplayer"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(16, 185, 129, 0.15)",
                        color: "success.main",
                        borderRadius: 1.5,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(16, 185, 129, 0.25)"
                        }`,
                        backdropFilter: "blur(4px)",
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Education Details */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.08)"
          }`,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={800}>
              Education Background
            </Typography>
          </Stack>
          <Divider />
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={700}>
              Technical School - Logistics Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Key Subjects:</strong> Supply Chain Management, Warehouse
              Operations, Logistics Planning
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>IT Development:</strong> Self-taught programming and web
              development alongside formal education
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Focus:</strong> Combining technical logistics knowledge
              with software development skills
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default About;
