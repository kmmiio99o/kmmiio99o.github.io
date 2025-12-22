import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExtensionIcon from "@mui/icons-material/Extension";
import BuildIcon from "@mui/icons-material/Build";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import EmailIcon from "@mui/icons-material/Email";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import Snowfall from "../components/Snowfall";

interface ProjectsProps {
  onTabSwitch: () => void;
}

interface GitHubRepoData {
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  description: string;
  forks_count?: number;
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
    technologies: ["TypeScript", "React", "Discord API"],
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
    technologies: ["Python", "Discord.py"],
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
  const [githubData, setGithubData] = useState<Record<string, GitHubRepoData>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

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
                forks_count: repoData.forks_count,
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

  const getStatusLabel = (status: string) => {
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
  };

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },
        minHeight: "100vh",
      }}
    >
      <Snowfall
        count={140}
        speed={1.15}
        wind={0.18}
        color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
        opacity={0.32}
        zIndex={-1}
      />
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <FolderIcon
              sx={{
                fontSize: { xs: 32, sm: 36 },
                color: "primary.main",
              }}
            />
            <Typography
              component="h1"
              variant="h3"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              }}
            >
              My Projects
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
              lineHeight: 1.6,
            }}
          >
            Discord bots, client modifications, and open-source tools built with
            modern technologies
          </Typography>
        </Stack>
      </Box>

      {/* Projects Grid */}
      <Stack spacing={3} sx={{ mb: 5 }}>
        {projects.map((project, index) => (
          <Card
            key={project.id}
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
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: theme.shadows[12],
                borderColor: project.accentColor,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(40, 40, 60, 0.15) 0%, rgba(60, 60, 80, 0.08) 100%)"
                    : "linear-gradient(135deg, rgba(245, 250, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)",
              },
              position: "relative",
              overflow: "visible",
              backdropFilter: "blur(8px)",
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
                      bgcolor: alpha(project.accentColor, 0.1),
                      color: project.accentColor,
                      width: { xs: 56, sm: 64 },
                      height: { xs: 56, sm: 64 },
                      borderRadius: 1.5,
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : alpha(project.accentColor, 0.2)
                      }`,
                      backdropFilter: "blur(8px)",
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
                            color: project.accentColor,
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
                              bgcolor: `${project.statusColor}15`,
                              color: project.statusColor,
                              fontWeight: 700,
                              border: `1px solid ${project.statusColor}20`,
                              fontSize: "0.7rem",
                              borderRadius: 1.5,
                              height: 24,
                              backdropFilter: "blur(4px)",
                            }}
                          />
                          {loading ? (
                            <Skeleton variant="text" width={60} />
                          ) : githubData[project.id] ? (
                            <>
                              <Tooltip title="Stars">
                                <Chip
                                  icon={<StarIcon sx={{ fontSize: 14 }} />}
                                  label={
                                    githubData[project.id].stargazers_count
                                  }
                                  size="small"
                                  sx={{
                                    bgcolor:
                                      theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.12)"
                                        : "rgba(0,0,0,0.08)",
                                    color: "warning.main",
                                    fontWeight: 600,
                                    borderRadius: 1.5,
                                    height: 24,
                                    backdropFilter: "blur(4px)",
                                    border: `1px solid ${
                                      theme.palette.mode === "dark"
                                        ? "rgba(255, 255, 255, 0.1)"
                                        : "rgba(0, 0, 0, 0.08)"
                                    }`,
                                  }}
                                />
                              </Tooltip>
                              {githubData[project.id].forks_count && (
                                <Tooltip title="Forks">
                                  <Chip
                                    icon={
                                      <DescriptionIcon sx={{ fontSize: 14 }} />
                                    }
                                    label={githubData[project.id].forks_count}
                                    size="small"
                                    sx={{
                                      bgcolor:
                                        theme.palette.mode === "dark"
                                          ? "rgba(255,255,255,0.12)"
                                          : "rgba(0,0,0,0.08)",
                                      color: "info.main",
                                      fontWeight: 600,
                                      borderRadius: 1.5,
                                      height: 24,
                                      backdropFilter: "blur(4px)",
                                      border: `1px solid ${
                                        theme.palette.mode === "dark"
                                          ? "rgba(255, 255, 255, 0.1)"
                                          : "rgba(0, 0, 0, 0.08)"
                                      }`,
                                    }}
                                  />
                                </Tooltip>
                              )}
                              <Tooltip title="Last updated">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.5}
                                  sx={{ color: "text.secondary" }}
                                >
                                  <UpdateIcon sx={{ fontSize: 14 }} />
                                  <Typography
                                    variant="caption"
                                    fontWeight={600}
                                  >
                                    {formatTimeAgo(
                                      githubData[project.id].updated_at,
                                    )}
                                  </Typography>
                                </Stack>
                              </Tooltip>
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
                        : githubData[project.id]?.description ||
                          project.description}
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
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.12)"
                                : "rgba(0,0,0,0.08)",
                            borderRadius: 1.5,
                            fontSize: "0.75rem",
                            height: 28,
                            backdropFilter: "blur(4px)",
                            border: `1px solid ${
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.08)"
                            }`,
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
                              bgcolor: alpha(project.accentColor, 0.1),
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
                    borderTop: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.08)"
                    }`,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 1.5,
                      py: { xs: 1, sm: 0.75 },
                      textTransform: "none",
                      fontWeight: 600,
                      flex: { xs: 1, sm: "none" },
                      minWidth: { sm: 160 },
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : alpha(project.accentColor, 0.25)
                      }`,
                      color:
                        theme.palette.mode === "dark"
                          ? "#fff"
                          : project.accentColor,
                      "&:hover": {
                        borderColor: project.accentColor,
                        background:
                          theme.palette.mode === "dark"
                            ? alpha(project.accentColor, 0.1)
                            : alpha(project.accentColor, 0.06),
                      },
                    }}
                  >
                    View Repository
                  </Button>

                  <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 1.5,
                      py: { xs: 1, sm: 0.75 },
                      textTransform: "none",
                      fontWeight: 600,
                      flex: { xs: 1, sm: "none" },
                      minWidth: { sm: 140 },
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(99, 102, 241, 0.25)"
                      }`,
                      color:
                        theme.palette.mode === "dark"
                          ? "#fff"
                          : project.accentColor,
                      "&:hover": {
                        borderColor: project.accentColor,
                        background:
                          theme.palette.mode === "dark"
                            ? alpha(project.accentColor, 0.1)
                            : alpha(project.accentColor, 0.06),
                      },
                    }}
                  >
                    Explore
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* CTA Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3, md: 3.5 },
          borderRadius: 2,
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.08)"
          }`,
          textAlign: "center",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(30, 30, 50, 0.1) 0%, rgba(50, 50, 70, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Stack spacing={1}>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.65rem" } }}
            >
              Want to Collaborate?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "0.9rem", sm: "0.95rem" },
                lineHeight: 1.6,
              }}
            >
              Check out my repositories and open-source contributions. I'm
              always open to new projects and collaborations!
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/kmmiio99o"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 3,
                py: { xs: 1, sm: 0.75 },
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
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
              View All Repositories
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              href="mailto:kmmiio99o@gmail.com"
              sx={{
                px: 3,
                py: { xs: 1, sm: 0.75 },
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
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
              Contact Me
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Projects;
