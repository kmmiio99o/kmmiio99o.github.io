import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Chip,
  Link as MuiLink,
  Button,
  Stack,
  Skeleton,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Badge,
  Box,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Snowfall from "../components/Snowfall";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { GithubFetch, GitHubRepoData } from "../api/github";
import { subscribeLanyard, getDiscordAvatarUrl } from "../api/lanyard";

interface HomeProps {
  onTabSwitch?: () => void;
}

type LanyardResponse = any;

const STATUS_CONFIG: Record<
  string,
  { color: string; label: string; pulse: boolean }
> = {
  online: { color: "#57f287", label: "Online", pulse: true },
  idle: { color: "#faa61a", label: "Away", pulse: false },
  dnd: { color: "#ed4245", label: "Busy", pulse: false },
  offline: { color: "#8b949e", label: "Offline", pulse: false },
};

const formatTimeAgo = (iso?: string) => {
  if (!iso) return "Unknown";
  const now = new Date();
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

const ProjectCard: React.FC<{ repo: GitHubRepoData; index: number }> = ({
  repo,
  index,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
        "@keyframes fadeInUp": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        backdropFilter: "blur(8px)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.main,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(50, 50, 70, 0.15) 0%, rgba(70, 70, 90, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(240, 245, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: { xs: 2, sm: 2.5 },
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Avatar
            variant="rounded"
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(99, 102, 241, 0.15)",
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              borderRadius: 1.5,
              backdropFilter: "blur(8px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(99, 102, 241, 0.25)"
              }`,
            }}
          >
            <CodeIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
          </Avatar>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <StarIcon sx={{ fontSize: 16, color: "warning.main" }} />
            <Typography variant="body2" fontWeight={600}>
              {repo.stargazers_count}
            </Typography>
          </Stack>
        </Stack>

        <section>
          <Typography
            component="h3"
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            {repo.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.5em",
              fontSize: { xs: "0.875rem", sm: "0.875rem" },
            }}
          >
            {repo.description || "No description available"}
          </Typography>
        </section>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: "auto" }}>
          {repo.language && (
            <Chip
              label={repo.language}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.08)",
                borderRadius: 1.5,
                backdropFilter: "blur(8px)",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.12)"
                }`,
              }}
            />
          )}
          <Chip
            icon={<UpdateIcon sx={{ fontSize: 14 }} />}
            label={formatTimeAgo(repo.updated_at)}
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 1.5,
              backdropFilter: "blur(8px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.12)"
              }`,
            }}
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          endIcon={<RocketLaunchIcon />}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: 1.5,
            py: { xs: 1, sm: 0.75 },
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
                  ? "rgba(99, 102, 241, 0.15)"
                  : "rgba(99, 102, 241, 0.08)",
            },
          }}
        >
          View Project
        </Button>
      </CardActions>
    </Card>
  );
};

const ActivityImage = ({ activity }: { activity: any }) => {
  const theme = useTheme();

  if (!activity?.assets?.large_image) return null;

  let imageUrl = "";

  if (activity.assets.large_image.startsWith("mp:")) {
    // Discord media proxy image
    imageUrl = `https://media.discordapp.net/${activity.assets.large_image.replace("mp:", "")}`;
  } else if (activity.assets.large_image.startsWith("spotify:")) {
    // Spotify cover art
    const spotifyId = activity.assets.large_image.replace("spotify:", "");
    imageUrl = `https://i.scdn.co/image/${spotifyId}`;
  } else {
    // External image URL
    imageUrl = activity.assets.large_image;
  }

  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 1.5,
        overflow: "hidden",
        flexShrink: 0,
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.08)"
        }`,
        backdropFilter: "blur(8px)",
        background:
          theme.palette.mode === "dark"
            ? "rgba(40, 40, 60, 0.1)"
            : "rgba(255, 255, 255, 0.4)",
        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      }}
    >
      <img src={imageUrl} alt={activity.name} />
    </Box>
  );
};

const Home: React.FC<HomeProps> = () => {
  const theme = useTheme();
  const [lanyard, setLanyard] = useState<LanyardResponse | null>(null);
  const [lanyardLoading, setLanyardLoading] = useState(true);
  const [repos, setRepos] = useState<GitHubRepoData[] | null>(null);
  const [reposLoading, setReposLoading] = useState(true);

  // Use centralized lanyard subscriber (shared polling) to update presence.
  // This replaces the manual fetch + setInterval approach with the shared helper.
  useEffect(() => {
    setLanyardLoading(true);
    const unsubscribe = subscribeLanyard(
      "879393496627306587",
      (data) => {
        setLanyard(data);
        setLanyardLoading(false);
      },
      5000, // poll interval in ms
    );

    return () => {
      try {
        unsubscribe();
      } catch {
        // ignore
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setReposLoading(true);

    (async () => {
      try {
        const data = await GithubFetch.getUserRepos("kmmiio99o");
        if (!mounted) return;
        setRepos(data.slice(0, 6));
      } catch (e) {
        console.error("GitHub fetch error:", e);
        if (mounted) setRepos([]);
      } finally {
        if (mounted) setReposLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const discordUser = lanyard?.data?.discord_user;
  const discordStatus = lanyard?.data?.discord_status || "offline";
  const statusConfig = STATUS_CONFIG[discordStatus];
  const activities = lanyard?.data?.activities || [];
  const primaryActivity = activities.find((a: any) => a.type !== 4);

  // Skills with better mobile spacing
  const skills = ["TypeScript", "React", "Node.js", "UI/UX", "Accessibility"];

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        py: { xs: 3, sm: 5, md: 8 },
        px: { xs: 2, sm: 3 },
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
      {/* Hero Section */}
      <section
        style={{
          marginBottom: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 5 },
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
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(8px)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: "200px", sm: "300px" },
              height: { xs: "200px", sm: "300px" },
              background:
                theme.palette.mode === "dark"
                  ? `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`
                  : `radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`,
              borderRadius: "50%",
              transform: "translate(30%, -30%)",
            },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2.5, sm: 3 }}
            alignItems="center"
          >
            {lanyardLoading ? (
              <Skeleton
                variant="circular"
                sx={{ width: { xs: 80, sm: 100 }, height: { xs: 80, sm: 100 } }}
              />
            ) : (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: statusConfig.color,
                      border: `3px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(30, 30, 50, 0.8)"
                          : "#ffffff"
                      }`,
                      display: "block",
                      boxShadow: statusConfig.pulse
                        ? `0 0 0 0 ${statusConfig.color}`
                        : "none",
                      animation: statusConfig.pulse
                        ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                        : "none",
                    }}
                  />
                }
                sx={{
                  "@keyframes pulse": {
                    "0%, 100%": {
                      boxShadow: `0 0 0 0 ${statusConfig.color}`,
                    },
                    "50%": {
                      boxShadow: `0 0 0 8px transparent`,
                    },
                  },
                }}
              >
                <Avatar
                  alt={discordUser?.username || "User avatar"}
                  src={
                    discordUser ? getDiscordAvatarUrl(discordUser) : undefined
                  }
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    border: `3px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(30, 30, 50, 0.8)"
                        : "#ffffff"
                    }`,
                    boxShadow: `0 8px 32px ${
                      theme.palette.mode === "dark"
                        ? "rgba(0, 0, 0, 0.3)"
                        : "rgba(0, 0, 0, 0.1)"
                    }`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {!discordUser?.avatar &&
                    discordUser?.username?.[0]?.toUpperCase()}
                </Avatar>
              </Badge>
            )}

            <Stack
              spacing={{ xs: 1.5, sm: 2 }}
              flex={1}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <header>
                <Typography
                  component="h1"
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 0.5,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  kmmiio99o
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontWeight={500}
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  Developer & UI Enthusiast
                </Typography>
              </header>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                justifyContent={{ xs: "center", sm: "flex-start" }}
                sx={{
                  gap: 1,
                  "& .MuiChip-root": {
                    m: 0,
                    flexShrink: 0,
                  },
                }}
              >
                {lanyardLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={32}
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <>
                    <Chip
                      label={`${statusConfig.label} on Discord`}
                      sx={{
                        bgcolor: `${statusConfig.color}15`,
                        color: statusConfig.color,
                        fontWeight: 700,
                        borderRadius: 1.5,
                        fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${statusConfig.color}20`,
                      }}
                    />
                    <Chip
                      label="Open to opportunities"
                      variant="outlined"
                      sx={{
                        borderRadius: 1.5,
                        fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(99, 102, 241, 0.25)"
                        }`,
                      }}
                    />
                  </>
                )}
              </Stack>

              <Button
                variant="contained"
                size="large"
                startIcon={<GitHubIcon />}
                href="https://github.com/kmmiio99o"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  width: { xs: "100%", sm: "auto" },
                  py: { xs: 1.2, sm: 1 },
                  backdropFilter: "blur(8px)",
                  boxShadow: `0 4px 16px ${
                    theme.palette.mode === "dark"
                      ? "rgba(99, 102, 241, 0.3)"
                      : "rgba(99, 102, 241, 0.2)"
                  }`,
                  "&:hover": {
                    boxShadow: `0 8px 25px ${
                      theme.palette.mode === "dark"
                        ? "rgba(99, 102, 241, 0.4)"
                        : "rgba(99, 102, 241, 0.3)"
                    }`,
                  },
                }}
              >
                View GitHub Profile
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </section>

      {/* About & Activity */}
      <section style={{ marginBottom: "clamp(1.5rem, 4vw, 3rem)" }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              flex: 1,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.08)"
              }`,
              backdropFilter: "blur(8px)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            >
              About Me
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{
                fontSize: { xs: "0.9375rem", sm: "1rem" },
                mb: 2,
              }}
            >
              I craft beautiful, performant web experiences with a focus on
              accessibility and user delight. Every pixel matters, and every
              interaction should feel natural.
            </Typography>

            {/* Skill chips */}
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{
                gap: 1,
                "& .MuiChip-root": {
                  m: 0,
                  flexShrink: 0,
                },
              }}
            >
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.08)",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    px: 0.5,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(0, 0, 0, 0.12)"
                    }`,
                  }}
                />
              ))}
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              flex: 1,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.08)"
              }`,
              backdropFilter: "blur(8px)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
                borderColor: theme.palette.secondary.main,
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            >
              Current Activity
            </Typography>
            {lanyardLoading ? (
              <Stack spacing={1}>
                <Skeleton width="80%" height={24} />
                <Skeleton width="60%" height={20} />
              </Stack>
            ) : primaryActivity ? (
              <Stack direction="row" spacing={2} alignItems="flex-start">
                {/* Activity Image */}
                <ActivityImage activity={primaryActivity} />

                <Stack spacing={0.5} flex={1}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
                  >
                    {primaryActivity.name}
                  </Typography>
                  {primaryActivity.details && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
                    >
                      {primaryActivity.details}
                    </Typography>
                  )}
                  {primaryActivity.state && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
                    >
                      {primaryActivity.state}
                    </Typography>
                  )}
                  {primaryActivity.timestamps?.start && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        mt: 0.5,
                      }}
                    >
                      Started{" "}
                      {new Date(
                        primaryActivity.timestamps.start,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
              >
                Not currently active on Discord. Probably coding something
                awesome!
              </Typography>
            )}
          </Paper>
        </Stack>
      </section>

      {/* Projects Section */}
      <section>
        <header style={{ marginBottom: "1.5rem" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={{ xs: 1.5, sm: 2 }}
          >
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUpIcon
                  color="primary"
                  sx={{ fontSize: { xs: 28, sm: 32 } }}
                />
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
                  }}
                >
                  Featured Projects
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "0.875rem" },
                  mt: 0.5,
                }}
              >
                {reposLoading
                  ? "Loading projects..."
                  : `${repos?.length || 0} recent repositories`}
              </Typography>
            </Stack>

            <Button
              variant="text"
              endIcon={<RocketLaunchIcon />}
              href="https://github.com/kmmiio99o?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                display: { xs: "none", sm: "flex" },
                backdropFilter: "blur(8px)",
                "&:hover": {
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              View All
            </Button>
          </Stack>
        </header>

        <article
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1rem",
          }}
        >
          {reposLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Card
                key={idx}
                elevation={0}
                sx={{
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
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Skeleton variant="circular" width={56} height={56} />
                      <Skeleton width={40} height={24} />
                    </Stack>
                    <Skeleton width="80%" height={28} />
                    <Skeleton width="100%" height={20} />
                    <Skeleton width="90%" height={20} />
                    <Stack direction="row" spacing={1}>
                      <Skeleton
                        width={80}
                        height={24}
                        sx={{ borderRadius: 2 }}
                      />
                      <Skeleton
                        width={70}
                        height={24}
                        sx={{ borderRadius: 2 }}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          ) : repos && repos.length > 0 ? (
            repos.map((repo, idx) => (
              <ProjectCard key={repo.name} repo={repo} index={idx} />
            ))
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                gridColumn: "1 / -1",
                textAlign: "center",
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
              <Typography variant="body1" color="text.secondary">
                Unable to load repositories. Visit my{" "}
                <MuiLink
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  GitHub profile
                </MuiLink>{" "}
                directly.
              </Typography>
            </Paper>
          )}
        </article>

        {/* Mobile View All Button */}
        <Stack
          alignItems="center"
          sx={{
            mt: 3,
            display: { xs: "flex", sm: "none" },
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            endIcon={<RocketLaunchIcon />}
            href="https://github.com/kmmiio99o?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              borderRadius: 1.5,
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
                    ? "rgba(99, 102, 241, 0.15)"
                    : "rgba(99, 102, 241, 0.08)",
              },
            }}
          >
            View All Projects
          </Button>
        </Stack>
      </section>
    </Container>
  );
};

export default Home;
