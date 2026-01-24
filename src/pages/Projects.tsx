import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Container,
  Stack,
  alpha,
  useTheme,
  Skeleton,
  Avatar,
  Paper,
  Box,
  Divider,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExtensionIcon from "@mui/icons-material/Extension";
import BuildIcon from "@mui/icons-material/Build";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";

interface ProjectsProps {
  onTabSwitch: () => void;
}

interface GitHubRepoData {
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  description: string;
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
    statusColor: "#ef4444",
    accentColor: "#ef4444",
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
    technologies: ["TypeScript", "React", "Discord API"],
    status: "active",
    statusColor: "#22c55e",
    accentColor: "#22c55e",
    icon: <ExtensionIcon />,
    githubUrl: "https://github.com/kmmiio99o/vd-plugins",
    repoName: "kmmiio99o/vd-plugins",
    features: [
      "UI Enhancements",
      "Performance Optimized",
      "Easy Installation",
      "Custom Commands",
      "Plugin API",
    ],
  },
  {
    id: "shiggycord",
    title: "ShiggyCord",
    description:
      "An unofficial fork of Kettu, made just for fun. Mobile-focused client modifications with themes, fonts and plugins support. Star the repo :3",
    technologies: ["JavaScript", "TypeScript", "Bun", "React"],
    status: "active",
    statusColor: "#22c55e",
    accentColor: "#22c55e",
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
    technologies: ["Python", "Discord.py"],
    status: "active",
    statusColor: "#22c55e",
    accentColor: "#22c55e",
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
  const [githubData, setGithubData] = useState<Record<string, GitHubRepoData>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    onTabSwitch();
  }, [onTabSwitch]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const data: Record<string, GitHubRepoData> = {};

        for (const project of projects) {
          try {
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
                description: repoData.description || project.description,
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

  // Memoized time formatting function
  const formatTimeAgo = useCallback((iso?: string) => {
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
  }, []);

  // Memoized status label function
  const getStatusLabel = useCallback((status: string) => {
    switch (status) {
      case "active":
        return "Active Development";
      case "paused":
        return "On Hold";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  }, []);

  // Memoized project cards
  const projectCards = useMemo(
    () =>
      projects.map((project) => {
        const repoData = githubData[project.id];
        const showStars = !loading && repoData;

        return (
          <Card
            key={project.id}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              transition: theme.transitions.create([
                "border-color",
                "box-shadow",
              ]),
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: project.accentColor,
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Stack spacing={2.5}>
                {/* Header Section */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2.5}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: alpha(project.accentColor, 0.1),
                      color: project.accentColor,
                      width: { xs: 56, sm: 64 },
                      height: { xs: 56, sm: 64 },
                      borderRadius: 2,
                      border: `1px solid ${alpha(project.accentColor, 0.2)}`,
                    }}
                  >
                    {React.cloneElement(
                      project.icon as React.ReactElement,
                      {
                        sx: { fontSize: { xs: 28, sm: 32 } },
                      } as any,
                    )}
                  </Avatar>

                  <Stack spacing={1.5} flex={1}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      gap={1}
                    >
                      <Stack spacing={0.5}>
                        <Typography
                          component="h2"
                          variant="h5"
                          fontWeight={800}
                          sx={{
                            fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            color: theme.palette.text.primary,
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Chip
                            label={getStatusLabel(project.status)}
                            size="small"
                            sx={{
                              backgroundColor: alpha(project.statusColor, 0.1),
                              color: project.statusColor,
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              borderRadius: 2,
                              height: 24,
                            }}
                          />
                          {loading ? (
                            <Skeleton variant="text" width={60} />
                          ) : showStars ? (
                            <>
                              <Chip
                                icon={<StarIcon sx={{ fontSize: 14 }} />}
                                label={repoData.stargazers_count}
                                size="small"
                                sx={{
                                  backgroundColor: alpha("#eab308", 0.1),
                                  color: "#eab308",
                                  fontWeight: 600,
                                  borderRadius: 2,
                                  height: 24,
                                  border: `1px solid ${alpha("#eab308", 0.2)}`,
                                }}
                              />
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                sx={{ color: "text.secondary" }}
                              >
                                <UpdateIcon sx={{ fontSize: 14 }} />
                                <Typography variant="caption" fontWeight={600}>
                                  {formatTimeAgo(repoData.updated_at)}
                                </Typography>
                              </Stack>
                            </>
                          ) : null}
                        </Stack>
                      </Stack>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "2.5em",
                      }}
                    >
                      {loading
                        ? project.description
                        : repoData?.description || project.description}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Technologies & Features */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  sx={{ pt: 2 }}
                >
                  {/* Technologies */}
                  <Box flex={1}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CodeIcon sx={{ fontSize: 16 }} />
                      Tech Stack
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.75}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            backgroundColor: theme.palette.action.hover,
                            borderRadius: 2,
                            fontSize: "0.75rem",
                            height: 28,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Features */}
                  <Box flex={1}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <DescriptionIcon sx={{ fontSize: 16 }} />
                      Key Features
                    </Typography>
                    <Stack spacing={0.75}>
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <Stack
                          key={idx}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              backgroundColor: alpha(project.accentColor, 0.1),
                              flexShrink: 0,
                              border: `1px solid ${alpha(project.accentColor, 0.2)}`,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.85rem",
                            }}
                          >
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
                      {project.features.length > 4 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ pl: 2.5, fontStyle: "italic" }}
                        >
                          +{project.features.length - 4} more features
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Stack>

                {/* Actions */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 2,
                      py: { xs: 1, sm: 0.75 },
                      textTransform: "none",
                      fontWeight: 600,
                      flex: { xs: 1, sm: "none" },
                      minWidth: { sm: 160 },
                      borderColor: theme.palette.divider,
                      "&:hover": {
                        borderColor: project.accentColor,
                        backgroundColor: alpha(project.accentColor, 0.05),
                      },
                    }}
                  >
                    View Repository
                  </Button>

                  <Button
                    variant="outlined"
                    endIcon={<ArrowOutwardIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 2,
                      py: { xs: 1, sm: 0.75 },
                      textTransform: "none",
                      fontWeight: 600,
                      flex: { xs: 1, sm: "none" },
                      minWidth: { sm: 140 },
                      borderColor: theme.palette.divider,
                      "&:hover": {
                        borderColor: project.accentColor,
                        backgroundColor: alpha(project.accentColor, 0.05),
                      },
                    }}
                  >
                    Explore
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      }),
    [githubData, loading, theme, getStatusLabel, formatTimeAgo],
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
      {/* Header */}
      <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
        <Stack spacing={2} alignItems="flex-start">
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
              component="h1"
              variant="h2"
              fontWeight={900}
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                color: theme.palette.text.primary,
              }}
            >
              My Projects
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={500}
            sx={{
              maxWidth: 700,
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
            }}
          >
            Discord bots, client modifications, and open-source tools built with
            modern technologies
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Projects Grid */}
      <Stack spacing={3} sx={{ mb: 6 }}>
        {projectCards}
      </Stack>

      {/* CTA Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Stack spacing={1}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
            >
              Want to Collaborate?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Check out my repositories and open-source contributions. I'm
              always open to new projects and collaborations!
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" }, mt: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              href="https://github.com/kmmiio99o"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: theme.palette.primary.main,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              View All Repositories
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              href="mailto:kmmiio99o@gmail.com"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: theme.palette.divider,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Contact Me
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Projects;
