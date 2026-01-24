import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Chip,
  Button,
  Stack,
  Skeleton,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Badge,
  Box,
  alpha,
  Fade,
  Divider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import TerminalIcon from "@mui/icons-material/Terminal";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CircleIcon from "@mui/icons-material/Circle";
import { GithubFetch, GitHubRepoData } from "../api/github";
import { subscribeLanyard, getDiscordAvatarUrl } from "../api/lanyard";

interface HomeProps {
  onTabSwitch?: () => void;
}

type LanyardResponse = any;

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  online: { color: "#22c55e", label: "Online" },
  idle: { color: "#eab308", label: "Away" },
  dnd: { color: "#ef4444", label: "Busy" },
  offline: { color: "#94a3b8", label: "Offline" },
};

const Home: React.FC<HomeProps> = () => {
  const theme = useTheme();
  const [lanyard, setLanyard] = useState<LanyardResponse | null>(null);
  const [lanyardLoading, setLanyardLoading] = useState(true);
  const [repos, setRepos] = useState<GitHubRepoData[] | null>(null);
  const [reposLoading, setReposLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Memoized values
  const discordUser = useMemo(() => lanyard?.data?.discord_user, [lanyard]);
  const discordStatus = useMemo(
    () => lanyard?.data?.discord_status || "offline",
    [lanyard],
  );
  const statusConfig = useMemo(
    () => STATUS_CONFIG[discordStatus],
    [discordStatus],
  );
  const activities = useMemo(() => lanyard?.data?.activities || [], [lanyard]);
  const primaryActivity = useMemo(
    () => activities.find((a: any) => a.type !== 4),
    [activities],
  );

  const skills = useMemo(
    () => [
      {
        name: "TypeScript",
        icon: <CodeIcon sx={{ fontSize: 16 }} />,
        color: "#3178C6",
      },
      {
        name: "React",
        icon: <TerminalIcon sx={{ fontSize: 16 }} />,
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        icon: <TrendingUpIcon sx={{ fontSize: 16 }} />,
        color: "#000000",
      },
      {
        name: "Node.js",
        icon: <CircleIcon sx={{ fontSize: 16 }} />,
        color: "#339933",
      },
      {
        name: "UI/UX",
        icon: <DesignServicesIcon sx={{ fontSize: 16 }} />,
        color: "#FF6B6B",
      },
      {
        name: "Material-UI",
        icon: <WorkspacePremiumIcon sx={{ fontSize: 16 }} />,
        color: "#007FFF",
      },
    ],
    [],
  );

  // Format time ago with useCallback for memoization
  const formatTimeAgo = useCallback((iso?: string) => {
    if (!iso) return "Recently";
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
  }, []);

  // Lanyard subscription
  useEffect(() => {
    setLanyardLoading(true);
    const unsubscribe = subscribeLanyard(
      "879393496627306587",
      (data) => {
        setLanyard(data);
        setLanyardLoading(false);
      },
      5000,
    );

    return () => {
      try {
        unsubscribe();
      } catch {
        // ignore
      }
    };
  }, []);

  // Fetch repos
  useEffect(() => {
    let mounted = true;
    setReposLoading(true);

    (async () => {
      try {
        const data = await GithubFetch.getUserRepos("kmmiio99o");
        if (!mounted) return;
        // Sort by stars and date
        const sorted = data.sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        });
        setRepos(sorted.slice(0, 6));
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

  // Activity Image Component
  const ActivityImage = useMemo(
    () =>
      ({ activity }: { activity: any }) => {
        if (!activity?.assets?.large_image) return null;

        let imageUrl = "";

        if (activity.assets.large_image.startsWith("mp:")) {
          imageUrl = `https://media.discordapp.net/${activity.assets.large_image.replace("mp:", "")}`;
        } else if (activity.assets.large_image.startsWith("spotify:")) {
          const spotifyId = activity.assets.large_image.replace("spotify:", "");
          imageUrl = `https://i.scdn.co/image/${spotifyId}`;
        } else {
          imageUrl = activity.assets.large_image;
        }

        return (
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              overflow: "hidden",
              flexShrink: 0,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.action.hover,
            }}
          >
            <img
              src={imageUrl}
              alt={activity.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        );
      },
    [theme.palette.divider, theme.palette.action.hover],
  );

  // Project Card Component
  const ProjectCard = useMemo(
    () =>
      ({ repo, index }: { repo: GitHubRepoData; index: number }) => (
        <Fade in={mounted} timeout={300 + index * 100}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              transition: "all 0.2s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: { xs: 2.5, sm: 3 },
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
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    width: { xs: 52, sm: 60 },
                    height: { xs: 52, sm: 60 },
                    borderRadius: 2,
                  }}
                >
                  <CodeIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                </Avatar>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <StarIcon sx={{ fontSize: 18, color: "warning.main" }} />
                  <Typography variant="body2" fontWeight={700}>
                    {repo.stargazers_count}
                  </Typography>
                </Stack>
              </Stack>

              <Box sx={{ flex: 1 }}>
                <Typography
                  component="h3"
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    mb: 1.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: { xs: "1.15rem", sm: "1.3rem" },
                    color: theme.palette.text.primary,
                  }}
                >
                  {repo.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.5em",
                    fontSize: { xs: "0.9rem", sm: "0.9rem" },
                    lineHeight: 1.6,
                  }}
                >
                  {repo.description || "No description available"}
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{ mt: "auto", gap: 1 }}
              >
                {repo.language && (
                  <Chip
                    label={repo.language}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      borderRadius: 2,
                      fontSize: "0.75rem",
                      height: 26,
                    }}
                  />
                )}
                <Chip
                  icon={<UpdateIcon sx={{ fontSize: 14 }} />}
                  label={formatTimeAgo(repo.updated_at)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.divider, 0.3),
                    fontSize: "0.75rem",
                    height: 26,
                  }}
                />
              </Stack>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<ArrowOutwardIcon />}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: 2,
                  py: { xs: 1.1, sm: 0.9 },
                  borderColor: theme.palette.divider,
                  fontWeight: 600,
                  transition: theme.transitions.create([
                    "border-color",
                    "box-shadow",
                  ]),
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Explore Project
              </Button>
            </CardActions>
          </Card>
        </Fade>
      ),
    [theme, formatTimeAgo, mounted],
  );

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        py: { xs: 3, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 4 }}
            alignItems="center"
          >
            {/* Avatar with Status Badge */}
            <Box sx={{ position: "relative" }}>
              {lanyardLoading ? (
                <Skeleton
                  variant="circular"
                  sx={{
                    width: { xs: 100, sm: 120, md: 140 },
                    height: { xs: 100, sm: 120, md: 140 },
                  }}
                />
              ) : (
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: statusConfig.color,
                        color: statusConfig.color,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: `3px solid ${theme.palette.background.paper}`,
                        boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
                        "&::after": {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          border: `1px solid ${theme.palette.background.paper}`,
                          content: '""',
                        },
                      },
                    }}
                  >
                    <Avatar
                      alt={discordUser?.username || "User avatar"}
                      src={
                        discordUser
                          ? getDiscordAvatarUrl(discordUser)
                          : undefined
                      }
                      sx={{
                        width: { xs: 100, sm: 120, md: 140 },
                        height: { xs: 100, sm: 120, md: 140 },
                        border: `3px solid ${theme.palette.background.paper}`,
                        boxShadow: theme.shadows[2],
                      }}
                    >
                      {!discordUser?.avatar &&
                        discordUser?.username?.[0]?.toUpperCase()}
                    </Avatar>
                  </Badge>
                </Box>
              )}
            </Box>

            {/* Hero Content */}
            <Stack
              spacing={{ xs: 2, sm: 2.5 }}
              flex={1}
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Box>
                <Typography
                  component="h1"
                  variant="h1"
                  fontWeight={900}
                  sx={{
                    mb: 1,
                    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                    color: theme.palette.primary.main,
                    letterSpacing: "-0.5px",
                  }}
                >
                  kmmiio99o
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight={500}
                  sx={{
                    fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
                    mb: 2,
                  }}
                >
                  Crafting exceptional digital experiences
                </Typography>
              </Box>

              {/* Status & Skills Preview */}
              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ gap: 2 }}
              >
                {lanyardLoading ? (
                  <Skeleton
                    variant="rounded"
                    width={180}
                    height={38}
                    sx={{ borderRadius: 3 }}
                  />
                ) : (
                  <Chip
                    label={`${statusConfig.label} on Discord`}
                    sx={{
                      backgroundColor: alpha(statusConfig.color, 0.1),
                      color: statusConfig.color,
                      fontWeight: 700,
                      borderRadius: 3,
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      height: 38,
                      px: 2,
                    }}
                  />
                )}

                <Stack direction="row" spacing={1} alignItems="center">
                  <TerminalIcon sx={{ fontSize: 20, color: "primary.main" }} />
                  <Typography variant="body2" fontWeight={600}>
                    Full-Stack Developer
                  </Typography>
                </Stack>
              </Stack>

              {/* CTA Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: "100%", mt: 1 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[2],
                    transition: theme.transitions.create([
                      "box-shadow",
                      "transform",
                    ]),
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  GitHub Profile
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<DesignServicesIcon />}
                  href="#projects"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderWidth: 1,
                    transition: theme.transitions.create([
                      "border-color",
                      "background-color",
                    ]),
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  View Projects
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </section>

      {/* Skills & About Section */}
      <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                mb: 1,
              }}
            >
              <Box component="span" sx={{ color: "primary.main" }}>
                Expertise
              </Box>{" "}
              & Technologies
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600 }}
            >
              Building modern web applications with cutting-edge technologies
              and best practices
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 3, lg: 4 }}
          >
            {/* Skills Card */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                flex: 1,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    <WorkspacePremiumIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      Core Stack
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Technologies I work with daily
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.5 }}>
                  {skills.map((skill) => (
                    <Chip
                      key={skill.name}
                      label={
                        <Stack direction="row" spacing={1} alignItems="center">
                          {skill.icon}
                          <Typography variant="body2" fontWeight={600}>
                            {skill.name}
                          </Typography>
                        </Stack>
                      }
                      sx={{
                        backgroundColor: alpha(skill.color, 0.1),
                        color: skill.color,
                        fontWeight: 600,
                        borderRadius: 2,
                        height: 38,
                        px: 2,
                        border: `1px solid ${alpha(skill.color, 0.2)}`,
                        transition: theme.transitions.create([
                          "background-color",
                        ]),
                        "&:hover": {
                          backgroundColor: alpha(skill.color, 0.15),
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Paper>

            {/* Activity Card */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                flex: 1,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    <TrendingUpIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      Current Activity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      What I'm doing right now
                    </Typography>
                  </Box>
                </Stack>

                {lanyardLoading ? (
                  <Stack spacing={2}>
                    <Skeleton
                      variant="rounded"
                      height={80}
                      sx={{ borderRadius: 2 }}
                    />
                  </Stack>
                ) : primaryActivity ? (
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <ActivityImage activity={primaryActivity} />

                    <Stack spacing={1} flex={1}>
                      <Typography variant="h6" fontWeight={700}>
                        {primaryActivity.name}
                      </Typography>
                      {primaryActivity.details && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          {primaryActivity.details}
                        </Typography>
                      )}
                      {primaryActivity.state && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: "0.875rem" }}
                        >
                          {primaryActivity.state}
                        </Typography>
                      )}
                      {primaryActivity.timestamps?.start && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Started at{" "}
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
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <TerminalIcon
                      sx={{
                        fontSize: 48,
                        color: "text.secondary",
                        mb: 2,
                        opacity: 0.5,
                      }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      Focused on creating amazing things
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Probably coding something incredible
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 12,
                    height: 32,
                    borderRadius: 2,
                    backgroundColor: theme.palette.primary.main,
                  }}
                />
                <Typography
                  variant="h2"
                  fontWeight={900}
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  }}
                >
                  Featured Projects
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 600 }}
              >
                A curated selection of my latest work and contributions
              </Typography>
            </Stack>

            <Button
              variant="outlined"
              endIcon={<ArrowOutwardIcon />}
              href="https://github.com/kmmiio99o?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                px: 4,
                py: 1.5,
                borderWidth: 1,
                display: { xs: "none", sm: "flex" },
                transition: theme.transitions.create([
                  "border-color",
                  "background-color",
                ]),
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              View All Projects
            </Button>
          </Stack>

          <Divider />

          {/* Projects using Flexbox layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
              "& > *": {
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 12px)",
                  lg: "1 1 calc(33.333% - 16px)",
                },
                minWidth: { xs: "100%", sm: 300 },
                maxWidth: { lg: "calc(33.333% - 16px)" },
              },
            }}
          >
            {reposLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rounded"
                  height={320}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: theme.palette.action.hover,
                  }}
                />
              ))
            ) : repos && repos.length > 0 ? (
              repos.map((repo, idx) => (
                <ProjectCard key={repo.name} repo={repo} index={idx} />
              ))
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, sm: 6 },
                  textAlign: "center",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  flex: "1 1 100%",
                }}
              >
                <CodeIcon
                  sx={{
                    fontSize: 48,
                    color: "text.secondary",
                    mb: 3,
                    opacity: 0.5,
                  }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No projects loaded
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Check out my GitHub for all my work
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ borderRadius: 2 }}
                >
                  Visit GitHub
                </Button>
              </Paper>
            )}
          </Box>

          {/* Mobile View All Button */}
          <Box sx={{ display: { xs: "block", sm: "none" }, mt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              endIcon={<ArrowOutwardIcon />}
              href="https://github.com/kmmiio99o?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 1,
                transition: theme.transitions.create([
                  "border-color",
                  "background-color",
                ]),
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Stack>
      </section>
    </Container>
  );
};

export default Home;
