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
        py: { xs: 3, sm: 5, md: 8 },
        px: { xs: 2, sm: 3 },
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <FolderIcon
              sx={{
                fontSize: { xs: 36, sm: 42 },
                color: "primary.main",
              }}
            />
            <Typography
              component="h1"
              variant="h3"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
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
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
          >
            Discord bots, client modifications, and open-source tools built with
            modern technologies
          </Typography>
        </Stack>
      </header>

      {/* Projects Grid */}
      <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {projects.map((project, index) => (
            <Card
              key={project.id}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                border: `1px solid ${theme.palette.divider}`,
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
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[12],
                  borderColor: project.accentColor,
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
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flex={1}
                  >
                    <Avatar
                      sx={{
                        bgcolor: `${project.accentColor}20`,
                        color: project.accentColor,
                        width: { xs: 52, sm: 60 },
                        height: { xs: 52, sm: 60 },
                        border: `2px solid ${project.accentColor}`,
                      }}
                    >
                      {React.cloneElement(
                        project.icon as React.ReactElement,
                        {
                          sx: { fontSize: { xs: 28, sm: 32 } },
                        } as any,
                      )}
                    </Avatar>

                    <Stack spacing={0.5} flex={1} sx={{ minWidth: 0 }}>
                      <Typography
                        component="h2"
                        variant="h5"
                        fontWeight={800}
                        sx={{
                          fontSize: { xs: "1.35rem", sm: "1.5rem" },
                          lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Chip
                          label={getStatusLabel(project.status)}
                          size="small"
                          sx={{
                            bgcolor: `${project.statusColor}15`,
                            color: project.statusColor,
                            fontWeight: 700,
                            border: `1px solid ${project.statusColor}`,
                            fontSize: "0.7rem",
                            borderRadius: 1.5,
                            height: 24,
                          }}
                        />
                        {loading ? (
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={24}
                            sx={{ borderRadius: 1.5 }}
                          />
                        ) : githubData[project.id]?.stargazers_count !==
                          undefined ? (
                          <Chip
                            icon={<StarIcon sx={{ fontSize: 14 }} />}
                            label={githubData[project.id].stargazers_count}
                            size="small"
                            sx={{
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 193, 7, 0.15)"
                                  : "rgba(255, 193, 7, 0.1)",
                              color: theme.palette.warning.main,
                              fontWeight: 600,
                              borderRadius: 1.5,
                              height: 24,
                            }}
                          />
                        ) : null}
                        {loading ? (
                          <Skeleton variant="text" width={100} height={16} />
                        ) : githubData[project.id]?.updated_at ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                          >
                            <UpdateIcon
                              sx={{ fontSize: 14, color: "text.secondary" }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatTimeAgo(githubData[project.id].updated_at)}
                            </Typography>
                          </Stack>
                        ) : null}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "0.95rem" },
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </Typography>

                {/* Technologies & Features in 2 columns */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  sx={{ pt: 1 }}
                >
                  {/* Technologies */}
                  <Stack spacing={1} flex={1}>
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                      <CodeIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        color="text.secondary"
                      >
                        Tech Stack
                      </Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={0.75}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(0,0,0,0.06)",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            borderRadius: 1.5,
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>

                  {/* Features */}
                  <Stack spacing={1} flex={1}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      Key Features
                    </Typography>
                    <Stack spacing={0.5}>
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <Stack
                          key={idx}
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <span
                            style={{
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
                              fontSize: "0.85rem",
                              color: "text.secondary",
                            }}
                          >
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
                      {project.features.length > 3 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ pl: 2.25, fontStyle: "italic" }}
                        >
                          +{project.features.length - 3} more features
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Stack>

                {/* Actions */}
                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: project.accentColor,
                      borderRadius: 1.5,
                      py: 1,
                      px: 3,
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: alpha(project.accentColor, 0.85),
                      },
                    }}
                  >
                    View Project
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      px: 3,
                    }}
                  >
                    Source Code
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </section>

      {/* CTA Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          textAlign: "center",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.02) 100%)"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(168, 85, 247, 0.01) 100%)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Stack spacing={1.5}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}
            >
              Want to Collaborate?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "1rem", sm: "1.15rem" },
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
            sx={{ width: { xs: "100%", sm: "auto" } }}
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
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              View All Repositories
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href="mailto:kmmiio99o@gmail.com"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
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
