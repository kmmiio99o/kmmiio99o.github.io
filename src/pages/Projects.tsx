import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Container,
  Grid,
  Fade,
  Slide,
  Stack,
  alpha,
  useTheme,
  IconButton,
  Divider,
  Skeleton,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExtensionIcon from "@mui/icons-material/Extension";
import BuildIcon from "@mui/icons-material/Build";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";

interface ProjectsProps {
  onTabSwitch: () => void;
}

interface GitHubRepoData {
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "active" | "paused" | "completed";
  statusColor: string;
  icon: React.ReactElement;
  githubUrl: string;
  repoName: string;
  features: string[];
  accentColor: string;
};

const projects: Project[] = [
  {
    id: "kaoruko-bot-next",
    title: "Kaoruko Bot Next",
    description:
      "Advanced Discord bot with comprehensive dashboard and enterprise-level security. Built for scalability with modern TypeScript architecture.",
    technologies: [
      "TypeScript",
      "Discord.js",
      "React",
      "Node.js",
      "MongoDB",
      "Redis",
    ],
    status: "paused",
    statusColor: "#ff6b6b",
    accentColor: "#ff6b6b",
    icon: <SmartToyIcon />,
    githubUrl: "https://github.com/kmmiio99o/Kaoruko-Bot-Next",
    repoName: "kmmiio99o/Kaoruko-Bot-Next",
    features: [
      "Web Dashboard",
      "Security First",
      "Modular Design",
      "Database Integration",
      "Permission System",
      "Analytics",
    ],
  },
  {
    id: "vd-plugins",
    title: "Revenge/Kettu Plugins",
    description:
      "High-performance plugin collection for Discord clients. Enhanced user experience with custom UI components and advanced functionality.",
    technologies: ["TypeScript", "React", "Discord API", "Vite", "CSS3"],
    status: "active",
    statusColor: "#51cf66",
    accentColor: "#51cf66",
    icon: <ExtensionIcon />,
    githubUrl: "https://github.com/kmmiio99o/vd-plugins",
    repoName: "kmmiio99o/vd-plugins",
    features: [
      "UI Enhancements",
      "Performance Optimized",
      "Easy Installation",
      "Theme Support",
      "Custom Commands",
      "Plugin API",
    ],
  },
  {
    id: "shiggycord",
    title: "ShiggyCord",
    description:
      "An unofficial fork of Kettu, made just for fun. Mobile-focused client modifications with themes, fonts and plugins support. Star the repo :3",
    technologies: ["JavaScript", "TypeScript", "Bun", "React", "CSS"],
    status: "active",
    statusColor: "#51cf66",
    accentColor: "#51cf66",
    icon: <ExtensionIcon />,
    githubUrl: "https://github.com/kmmiio99o/ShiggyCord",
    repoName: "kmmiio99o/ShiggyCord",
    features: [
      "Injectable bundle",
      "Supports Xposed & Manager",
      "Local bundle serving",
      "Build scripts with bun",
      "Mobile client modifications",
      "Theming & UI tweaks",
    ],
  },
  {
    id: "ormi-bot",
    title: "Ormi Bot",
    description:
      "Lightweight Discord bot focused on simplicity and reliability. Perfect for communities seeking essential moderation tools with zero complexity.",
    technologies: ["Python", "Discord.py", "SQLite", "Docker"],
    status: "active",
    statusColor: "#51cf66",
    accentColor: "#51cf66",
    icon: <BuildIcon />,
    githubUrl: "https://github.com/kmmiio99o/ormi-bot",
    repoName: "kmmiio99o/ormi-bot",
    features: [
      "One-Click Setup",
      "Essential Moderation",
      "Lightweight",
      "Reliable",
      "Community Focused",
      "Open Source",
    ],
  },
];

const Projects: React.FC<ProjectsProps> = ({ onTabSwitch }) => {
  const [mounted, setMounted] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([]);
  const [githubData, setGithubData] = useState<Record<string, GitHubRepoData>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const frostStyle = {
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
    backdropFilter: "blur(12px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  };

  // Fetch GitHub data for all projects
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const data: Record<string, GitHubRepoData> = {};

        for (const project of projects) {
          try {
            // Extract owner and repo from the repoName
            const [owner, repo] = project.repoName.split("/");
            const response = await fetch(
              `https://api.github.com/repos/${owner}/${repo}`,
            );

            if (response.ok) {
              const repoData = await response.json();
              data[project.id] = {
                stargazers_count: repoData.stargazers_count,
                updated_at: repoData.updated_at,
                html_url: repoData.html_url,
              };
            }
          } catch (error) {
            console.warn(
              `Failed to fetch data for ${project.repoName}:`,
              error,
            );
          }
        }

        setGithubData(data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  useEffect(() => {
    onTabSwitch();
    setMounted(true);

    const timers = projects.map((_, index) =>
      setTimeout(
        () => {
          setVisibleProjects((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        },
        100 + index * 100,
      ),
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [onTabSwitch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "just now";
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365)
      return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? "s" : ""} ago`;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <Fade in={mounted} timeout={500}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "transparent",
          py: { xs: 4, md: 6 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, width: "100%" }}
          >
            <Slide in={mounted} timeout={400} direction="down">
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                My Projects
              </Typography>
            </Slide>

            <Fade in={mounted} timeout={600}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
              >
                Explore my work in Discord bot development, client
                modifications, and open-source contributions
              </Typography>
            </Fade>
          </Box>

          {/* Projects Grid */}
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              width: "100%",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {projects.map((project, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={project.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Slide in={visibleProjects[index]} timeout={500} direction="up">
                  <Card
                    sx={{
                      ...frostStyle,
                      width: "100%",
                      maxWidth: 500,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      minHeight: 520,
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 28px ${alpha(project.accentColor, 0.15)}`,
                        border: `1px solid ${alpha(project.accentColor, 0.3)}`,
                      },
                    }}
                  >
                    {/* Project Header */}
                    <Box
                      sx={{
                        background: `linear-gradient(135deg, ${alpha(project.accentColor, 0.1)}, ${alpha(project.accentColor, 0.05)})`,
                        p: 3,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              background: `linear-gradient(135deg, ${project.accentColor}, ${alpha(project.accentColor, 0.7)})`,
                              borderRadius: "12px",
                              width: 50,
                              height: 50,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            {React.cloneElement(project.icon, {
                              fontSize: "medium",
                            })}
                          </Box>
                          <Box>
                            <Typography
                              variant="h5"
                              fontWeight={700}
                              sx={{ lineHeight: 1.2 }}
                            >
                              {project.title}
                            </Typography>
                            <Chip
                              label={getStatusLabel(project.status)}
                              size="small"
                              sx={{
                                backgroundColor: `${project.statusColor}20`,
                                color: project.statusColor,
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                height: 24,
                                mt: 0.5,
                              }}
                            />
                          </Box>
                        </Box>

                        {/* GitHub Stats */}
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {loading ? (
                            <Skeleton
                              variant="rectangular"
                              width={60}
                              height={28}
                              sx={{ borderRadius: 1 }}
                            />
                          ) : githubData[project.id]?.stargazers_count !==
                            undefined ? (
                            <Chip
                              icon={<StarIcon sx={{ fontSize: 16 }} />}
                              label={githubData[project.id].stargazers_count}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.75rem", height: 28 }}
                            />
                          ) : null}
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {project.description}
                      </Typography>
                    </Box>

                    <CardContent
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Technologies */}
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            mb: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <CodeIcon fontSize="small" />
                          Technologies
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: alpha(
                                  project.accentColor,
                                  0.1,
                                ),
                                color: project.accentColor,
                                fontWeight: 500,
                                fontSize: "0.75rem",
                                height: 28,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2, opacity: 0.3 }} />

                      {/* Features */}
                      <Box sx={{ mb: 3, flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            mb: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                          Key Features
                        </Typography>
                        <Grid container spacing={1}>
                          {project.features.map((feature, idx) => (
                            <Grid item xs={6} key={idx}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor: project.accentColor,
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: "0.8rem",
                                    opacity: 0.9,
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {feature}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      {/* Action Buttons */}
                      <Stack direction="row" spacing={1.5} sx={{ mt: "auto" }}>
                        <Button
                          variant="contained"
                          startIcon={<LaunchIcon />}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          disabled={project.status === "paused"}
                          fullWidth
                          sx={{
                            background: `linear-gradient(135deg, ${project.accentColor}, ${alpha(project.accentColor, 0.8)})`,
                            borderRadius: 2,
                            py: 1,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: `0 8px 20px ${alpha(project.accentColor, 0.3)}`,
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {project.status === "paused"
                            ? "View Code"
                            : "Explore Project"}
                        </Button>

                        <IconButton
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            background: alpha(theme.palette.primary.main, 0.1),
                            borderRadius: 2,
                            width: 48,
                            height: 48,
                            "&:hover": {
                              background: alpha(
                                theme.palette.primary.main,
                                0.2,
                              ),
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          <GitHubIcon fontSize="small" />
                        </IconButton>
                      </Stack>

                      {/* Last Updated */}
                      {loading ? (
                        <Skeleton
                          variant="text"
                          width={120}
                          sx={{ mx: "auto", mt: 2 }}
                        />
                      ) : githubData[project.id]?.updated_at ? (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            mt: 2,
                            opacity: 0.7,
                          }}
                        >
                          <UpdateIcon fontSize="inherit" />
                          Updated{" "}
                          {formatDate(githubData[project.id].updated_at)}
                        </Typography>
                      ) : null}
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>

          {/* CTA Section */}
          <Fade in={mounted} timeout={800}>
            <Box
              sx={{
                ...frostStyle,
                textAlign: "center",
                p: { xs: 4, md: 6 },
                borderRadius: 3,
                mt: 6,
                width: "100%",
                maxWidth: 600,
              }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                Want to Collaborate?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Check out my code repositories and open-source contributions on
                GitHub. I'm always open to new projects and collaborations!
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  View All Repositories
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="mailto:kmmiio99o@gmail.com"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      transform: "translateY(-2px)",
                      background: alpha(theme.palette.primary.main, 0.05),
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Contact Me
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Fade>
  );
};

export default Projects;
