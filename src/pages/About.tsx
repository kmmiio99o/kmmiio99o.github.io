import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";

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
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

interface AboutProps {
  onTabSwitch: () => void;
}

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

const STATUS_CONFIG: Record<DiscordStatus, { color: string; label: string }> = {
  online: { color: "#22c55e", label: "Online" },
  idle: { color: "#eab308", label: "Idle" },
  dnd: { color: "#ef4445", label: "Do Not Disturb" },
  offline: { color: "#94a3b8", label: "Offline" },
};

const SKILLS = [
  { name: "HTML5", level: 95, color: "#e34c26" },
  { name: "CSS3", level: 93, color: "#1572b6" },
  { name: "JavaScript", level: 86, color: "#f0db4f" },
  { name: "React", level: 88, color: "#61dafb" },
  { name: "Python", level: 74, color: "#306998" },
  { name: "Discord.js", level: 86, color: "#5865f2" },
];

const LANGUAGES = [
  { name: "Polish", level: "Native", color: "#10b981" },
  { name: "English", level: "B2", color: "#3b82f6" },
];

const HOBBIES = [
  {
    name: "Anime Collection",
    description:
      "Tracking and rating anime series on MyAnimeList. Currently watching several seasonal shows.",
    icon: <MovieIcon />,
    color: "#ef4444",
    tags: ["MyAnimeList"],
    link: "https://myanimelist.net/animelist/kmmiio99o",
  },
  {
    name: "Development Projects",
    description:
      "Building web applications, learning new technologies, and contributing to open source projects.",
    icon: <CodeIcon />,
    color: "#6366f1",
    tags: ["React", "TypeScript", "Open Source"],
    link: "/",
  },
  {
    name: "Gaming",
    description:
      "Enjoying various video games in free time. Mostly playing FPS, RPG, and indie games.",
    icon: <SportsEsportsIcon />,
    color: "#10b981",
    tags: ["FPS", "RPG", "Indie"],
  },
];

const About: React.FC<AboutProps> = ({ onTabSwitch }) => {
  const theme = useTheme();
  const [lanyard, setLanyard] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [animateSkills, setAnimateSkills] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (onTabSwitch) onTabSwitch();

    setLoading(true);
    const unsubscribe = subscribeLanyard(
      "879393496627306587",
      (data) => {
        setLanyard(data);
        setLoading(false);
      },
      5000,
    );

    const timer = setTimeout(() => setAnimateSkills(true), 500);
    return () => {
      try {
        unsubscribe();
      } catch {
        // ignore
      }
      clearTimeout(timer);
    };
  }, [onTabSwitch]);

  // Memoized derived values
  const user = useMemo(() => lanyard?.data?.discord_user, [lanyard]);
  const discordStatus: DiscordStatus = useMemo(
    () => (lanyard?.data?.discord_status as DiscordStatus) || "offline",
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

  // Memoized functions
  const getDiscordAvatarUrl = useCallback(
    (user?: { id?: string; avatar?: string }) => {
      return resolveDiscordAvatarUrl(user);
    },
    [],
  );

  // Memoized activity image URL
  const activityImageUrl = useMemo(() => {
    if (!primaryActivity?.assets?.large_image) return null;

    let imageUrl = "";
    if (primaryActivity.assets.large_image.startsWith("mp:")) {
      imageUrl = `https://media.discordapp.net/${primaryActivity.assets.large_image.replace("mp:", "")}`;
    } else if (primaryActivity.assets.large_image.startsWith("spotify:")) {
      const spotifyId = primaryActivity.assets.large_image.replace(
        "spotify:",
        "",
      );
      imageUrl = `https://i.scdn.co/image/${spotifyId}`;
    } else if (primaryActivity.application_id) {
      imageUrl = `https://cdn.discordapp.com/app-assets/${primaryActivity.application_id}/${primaryActivity.assets.large_image}.png`;
    } else {
      imageUrl = primaryActivity.assets.large_image;
    }

    return imageUrl;
  }, [primaryActivity]);

  // Memoized skill rows
  const skillRows = useMemo(
    () =>
      SKILLS.map((skill, index) => (
        <Stack
          key={skill.name}
          spacing={1.5}
          sx={{
            opacity: animateSkills ? 1 : 0,
            transform: animateSkills ? "translateY(0)" : "translateY(10px)",
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
                  backgroundColor: alpha(skill.color, 0.1),
                  color: skill.color,
                  fontWeight: 700,
                  fontSize: 14,
                  border: `1px solid ${alpha(skill.color, 0.2)}`,
                  borderRadius: 2,
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
                height: 10,
                borderRadius: 2,
                backgroundColor: theme.palette.action.hover,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 2,
                  backgroundColor: skill.color,
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
      )),
    [animateSkills, theme.palette.action.hover],
  );

  // Memoized language chips
  const languageChips = useMemo(
    () =>
      LANGUAGES.map((lang) => (
        <Chip
          key={lang.name}
          label={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2" fontWeight={700}>
                {lang.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ({lang.level})
              </Typography>
            </Stack>
          }
          sx={{
            fontWeight: 600,
            height: 38,
            backgroundColor: alpha(lang.color, 0.1),
            color: lang.color,
            border: `1px solid ${alpha(lang.color, 0.2)}`,
            borderRadius: 2,
          }}
        />
      )),
    [],
  );

  // Memoized hobby cards
  const hobbyCards = useMemo(
    () =>
      HOBBIES.map((hobby) => (
        <Paper
          key={hobby.name}
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create([
              "border-color",
              "box-shadow",
            ]),
            "&:hover": {
              borderColor: hobby.color,
              boxShadow: theme.shadows[2],
            },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              sx={{
                backgroundColor: hobby.color,
                color: "#ffffff",
                width: 60,
                height: 60,
              }}
            >
              {hobby.icon}
            </Avatar>

            <Stack flex={1} spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                {hobby.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hobby.description}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {hobby.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: alpha(hobby.color, 0.1),
                      color: hobby.color,
                      borderRadius: 2,
                      border: `1px solid ${alpha(hobby.color, 0.2)}`,
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {hobby.link && (
              <Button
                variant="outlined"
                endIcon={<ArrowOutwardIcon />}
                href={hobby.link}
                target={hobby.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  hobby.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                component={hobby.link.startsWith("http") ? "a" : Link}
                to={!hobby.link.startsWith("http") ? hobby.link : undefined}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  minWidth: 120,
                  borderColor: theme.palette.divider,
                  "&:hover": {
                    borderColor: hobby.color,
                    backgroundColor: theme.palette.action.hover,
                  },
                  width: { xs: "100%", md: "auto" },
                  mt: { xs: 2, md: 0 },
                }}
              >
                View {hobby.name.includes("Anime") ? "Profile" : "Projects"}
              </Button>
            )}
          </Stack>
        </Paper>
      )),
    [theme],
  );

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
      }}
    >
      {/* Hero Card */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          position: "relative",
          overflow: "hidden",
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
        >
          {/* Avatar with Status */}
          <Box sx={{ position: "relative" }}>
            {loading ? (
              <Skeleton
                variant="circular"
                sx={{
                  width: { xs: 100, md: 120 },
                  height: { xs: 100, md: 120 },
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
                    },
                  }}
                >
                  <Avatar
                    src={getDiscordAvatarUrl(user)}
                    alt="Profile"
                    sx={{
                      width: { xs: 100, md: 120 },
                      height: { xs: 100, md: 120 },
                      border: `3px solid ${theme.palette.background.paper}`,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    {!user?.avatar && "K"}
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
                Developer & Student
              </Typography>
            </Box>

            {/* Status & Location */}
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ gap: 2 }}
            >
              {loading ? (
                <>
                  <Skeleton
                    variant="rounded"
                    width={180}
                    height={38}
                    sx={{ borderRadius: 3 }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={120}
                    height={38}
                    sx={{ borderRadius: 3 }}
                  />
                </>
              ) : (
                <>
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
                  <Chip
                    icon={<LocationOnIcon />}
                    label="Poland"
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: theme.palette.divider,
                      height: 38,
                      px: 2,
                    }}
                  />
                </>
              )}
            </Stack>

            {/* Contact Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%", mt: 1 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<EmailIcon />}
                href="mailto:kmmiio99o@gmail.com"
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
                    "background-color",
                  ]),
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                Email Me
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                href="https://github.com/kmmiio99o"
                target="_blank"
                rel="noopener noreferrer"
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
                GitHub
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {/* Current Activity */}
        {!loading && primaryActivity && (
          <>
            <Divider sx={{ my: 3 }} />
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: theme.palette.action.hover,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  variant="rounded"
                  src={activityImageUrl || undefined}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <CodeIcon />
                </Avatar>
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
      </Paper>

      {/* Quick Facts Section */}
      <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Stack spacing={3}>
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
              Quick Facts
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 4 }}
          >
            {/* Status Card */}
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
                    <WorkIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      Current Status
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Student & Freelancer
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  Balancing studies with freelance development projects
                </Typography>
              </Stack>
            </Paper>

            {/* Education Card */}
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
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      Education
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Technical School
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  Logistics profile with self-taught IT development skills
                </Typography>
              </Stack>
            </Paper>
          </Stack>

          {/* Languages Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                  }}
                >
                  <LanguageIcon />
                </Avatar>
                <Typography variant="h5" fontWeight={700}>
                  Languages
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                sx={{ gap: 1.5 }}
              >
                {languageChips}
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Fluent in Polish, conversational in English with technical
                vocabulary
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </section>

      {/* Technical Skills Section */}
      <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Stack spacing={4}>
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
              Technical Skills
            </Typography>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight={700}>
                Proficiency levels across technologies
              </Typography>
              <Stack spacing={2.5}>{skillRows}</Stack>
            </Stack>
          </Paper>
        </Stack>
      </section>

      {/* Hobbies & Interests Section */}
      <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Stack spacing={4}>
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
              Hobbies & Interests
            </Typography>
          </Stack>

          <Stack spacing={2}>{hobbyCards}</Stack>
        </Stack>
      </section>

      {/* Education Details */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
              }}
            >
              <SchoolIcon />
            </Avatar>
            <Typography variant="h4" fontWeight={900}>
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
