import React, { useEffect, useState, useCallback } from "react";
import {
  Stack,
  Typography,
  Chip,
  Button,
  Box,
  Paper,
  alpha,
  Avatar,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExtensionIcon from "@mui/icons-material/Extension";
import BuildIcon from "@mui/icons-material/Build";
import { projects, type Project } from "../data/projects";
import { GithubFetch } from "../api/github";
import { useDataTheme } from "../hooks/useDataTheme";

interface RepoData {
  stargazers_count: number;
  updated_at: string;
  description: string | null;
}

const ProjectIcon: React.FC<{ projectId: string; color: string }> = ({
  projectId,
  color,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    "kaoruko-bot-next": <SmartToyIcon sx={{ fontSize: 20 }} />,
    "vd-plugins": <ExtensionIcon sx={{ fontSize: 20 }} />,
    shiggycord: <ExtensionIcon sx={{ fontSize: 20 }} />,
    "ormi-bot": <BuildIcon sx={{ fontSize: 20 }} />,
  };

  return (
    <Avatar
      variant="rounded"
      sx={{
        width: 36,
        height: 36,
        backgroundColor: alpha(color, 0.12),
        color: color,
        border: `1px solid ${alpha(color, 0.2)}`,
      }}
    >
      {iconMap[projectId] || <CodeIcon sx={{ fontSize: 20 }} />}
    </Avatar>
  );
};

const ProjectsWindow: React.FC = () => {
  const themeMode = useDataTheme();
  const isDark = themeMode === "dark";
  const cardBg = isDark ? "rgba(18,18,32,0.5)" : "rgba(0,0,0,0.04)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const chipBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const [repoData, setRepoData] = useState<Record<string, RepoData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const data: Record<string, RepoData> = {};
      for (const project of projects) {
        try {
          const repo = await GithubFetch.getRepoData(
            project.repoOwner,
            project.repoName,
          );
          if (!active) return;
          data[project.id] = {
            stargazers_count: repo.stargazers_count,
            updated_at: repo.updated_at,
            description: repo.description || project.description,
          };
        } catch {
          // skip
        }
      }
      if (active) {
        setRepoData(data);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const formatTimeAgo = useCallback((iso?: string) => {
    if (!iso) return "Unknown";
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  }, []);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active": return "#22c55e";
      case "paused": return "#ef4444";
      case "completed": return "#00bcd4";
    }
  };

  return (
    <Box sx={{ p: 2.5, minHeight: "100%" }}>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "primary.main",
          }}
        >
          ./projects
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
          Discord bots, client mods, and open-source tools
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {projects.map((project) => {
          const data = repoData[project.id];
          const statusColor = getStatusColor(project.status);

          return (
            <Paper
              key={project.id}
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 2,
                "&:hover": { borderColor: project.accentColor },
                transition: "border-color 200ms",
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                  <ProjectIcon projectId={project.id} color={project.accentColor} />
                  <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
                          fontSize: "0.85rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", flexShrink: 0 }}>
                        {!loading && data && (
                          <Stack direction="row" spacing={0.25} sx={{ alignItems: "center" }}>
                            <StarIcon sx={{ fontSize: 11, color: "warning.main" }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.65rem" }}>
                              {data.stargazers_count}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        width: "fit-content",
                        height: 18,
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        backgroundColor: alpha(statusColor, 0.12),
                        color: statusColor,
                      }}
                    />
                  </Stack>
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {loading ? project.description : data?.description || project.description}
                </Typography>

                <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: "0.55rem",
                        borderColor: "divider",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>

                <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<GitHubIcon sx={{ fontSize: 14 }} />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      flex: 1,
                      py: 0.5,
                      fontSize: "0.7rem",
                      borderColor: "divider",
                    }}
                  >
                    Repository
                  </Button>
                  {!loading && data && (
                    <Chip
                      icon={<UpdateIcon sx={{ fontSize: 10 }} />}
                      label={formatTimeAgo(data.updated_at)}
                      size="small"
                      sx={{
                        height: 28,
                        fontSize: "0.6rem",
                        backgroundColor: "transparent",
                        border: `1px solid ${chipBorder}`,
                      }}
                    />
                  )}
                </Stack>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProjectsWindow;
