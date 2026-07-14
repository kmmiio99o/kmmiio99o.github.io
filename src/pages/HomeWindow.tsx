import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Chip,
  Button,
  Box,
  Skeleton,
  alpha,
  Divider,
  Paper,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TerminalIcon from "@mui/icons-material/Terminal";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import {
  subscribeLanyard,
  getDiscordAvatarUrl,
  type LanyardPresence,
} from "../api/lanyard";
import { GithubFetch, type GitHubRepoData } from "../api/github";
import {
  DISCORD_USER_ID,
  GITHUB_USERNAME,
} from "../data/projects";
import AsciiLogo from "../components/Shared/AsciiLogo";
import { useDataTheme } from "../hooks/useDataTheme";

const STATUS_MAP: Record<string, { color: string; label: string }> = {
  online: { color: "#22c55e", label: "Online" },
  idle: { color: "#eab308", label: "Away" },
  dnd: { color: "#ef4444", label: "Busy" },
  offline: { color: "#666", label: "Offline" },
};

interface HomeWindowProps {
  onNavigate?: (tab: string) => void;
}

const HomeWindow: React.FC<HomeWindowProps> = ({ onNavigate }) => {
  const themeMode = useDataTheme();
  const isDark = themeMode === "dark";
  const cardBg = isDark ? "rgba(18,18,32,0.6)" : "rgba(0,0,0,0.04)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const avatarRing = isDark ? "#0a0a0a" : "#ffffff";

  const [lanyard, setLanyard] = useState<LanyardPresence | null>(null);
  const [lanyardLoading, setLanyardLoading] = useState(true);
  const [repos, setRepos] = useState<GitHubRepoData[]>([]);
  const [reposLoading, setReposLoading] = useState(true);

  useEffect(() => {
    setLanyardLoading(true);
    const unsub = subscribeLanyard(DISCORD_USER_ID, (d) => {
      setLanyard(d);
      setLanyardLoading(false);
    }, 10000);
    return () => { try { unsub(); } catch { /* ignore */ } };
  }, []);

  useEffect(() => {
    let active = true;
    setReposLoading(true);
    (async () => {
      try {
        const data = await GithubFetch.getUserRepos(GITHUB_USERNAME);
        if (!active) return;
        const sorted = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted.slice(0, 6));
      } catch {
        if (active) setRepos([]);
      } finally {
        if (active) setReposLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const user = lanyard?.data?.discord_user;
  const status = lanyard?.data?.discord_status || "offline";
  const statusInfo = STATUS_MAP[status] || STATUS_MAP.offline;
  const avatarUrl = useMemo(() => getDiscordAvatarUrl(user), [user]);
  const primaryActivity = useMemo(
    () => lanyard?.data?.activities?.find((a) => a.type !== 4),
    [lanyard],
  );

  const formatTimeAgo = useCallback((iso?: string) => {
    if (!iso) return "Recently";
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  }, []);

  return (
    <Box sx={{ p: 2.5, minHeight: "100%" }}>
      {/* ASCII Logo */}
      <AsciiLogo compact />

      {/* Hero */}
      <Stack spacing={2} sx={{ mt: 2, mb: 3, alignItems: "center" }}>
        {lanyardLoading ? (
          <Skeleton variant="circular" width={80} height={80} />
        ) : (
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={avatarUrl || undefined}
              sx={{
                width: 80,
                height: 80,
                border: `2px solid ${statusInfo.color}`,
                boxShadow: `0 0 20px ${statusInfo.color}33`,
              }}
            >
              {user?.username?.[0]?.toUpperCase() || "K"}
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: statusInfo.color,
                border: `2px solid ${avatarRing}`,
              }}
            />
          </Box>
        )}

        <Stack spacing={0.5} sx={{ alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
              fontWeight: 700,
              color: "primary.main",
              fontSize: "1.3rem",
            }}
          >
            kmmiio99o
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Crafting exceptional digital experiences
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", gap: 0.75 }}>
          {!lanyardLoading && (
            <Chip
              label={`${statusInfo.label} on Discord`}
              size="small"
              sx={{
                backgroundColor: alpha(statusInfo.color, 0.12),
                color: statusInfo.color,
                fontWeight: 700,
                border: `1px solid ${alpha(statusInfo.color, 0.2)}`,
              }}
            />
          )}
          <Chip
            icon={<TerminalIcon sx={{ fontSize: 12 }} />}
            label="Full-Stack Dev"
            size="small"
            variant="outlined"
            sx={{ borderColor: "divider" }}
          />
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            startIcon={<GitHubIcon />}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ py: 1 }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => onNavigate?.("projects")}
            sx={{ py: 1 }}
          >
            Projects
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: "divider", mb: 2 }} />

      {/* Activity */}
      {primaryActivity && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", fontSize: "0.6rem" }}
          >
            Currently Active
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
            {primaryActivity.name}
          </Typography>
          {primaryActivity.details && (
            <Typography variant="caption" color="text.secondary">
              {primaryActivity.details}
            </Typography>
          )}
        </Paper>
      )}

      {/* Repos */}
      <Stack spacing={1.5}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", fontSize: "0.65rem" }}
        >
          Featured Repos
        </Typography>
        {reposLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={80}
                sx={{ borderRadius: 2, bgcolor: "action.hover" }}
              />
            ))
          : repos.map((repo) => (
              <Paper
                key={repo.name}
                elevation={0}
                sx={{
                  p: 1.5,
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 2,
                  "&:hover": { borderColor: "primary.main" },
                  transition: "border-color 200ms",
                }}
              >
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                >
                  <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
              fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
                        fontSize: "0.8rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {repo.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontSize: "0.7rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {repo.description || "No description"}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ ml: 1, flexShrink: 0, alignItems: "center" }}
                  >
                    <StarIcon sx={{ fontSize: 12, color: "warning.main" }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.7rem" }}>
                      {repo.stargazers_count}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}>
                  {repo.language && (
                    <Chip
                      label={repo.language}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.6rem",
                        backgroundColor: alpha("#00ff41", 0.08),
                        color: "primary.main",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <Chip
                    icon={<UpdateIcon sx={{ fontSize: 10 }} />}
                    label={formatTimeAgo(repo.updated_at)}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 20,
                      fontSize: "0.6rem",
                      borderColor: "divider",
                    }}
                  />
                </Stack>
              </Paper>
            ))}
      </Stack>
    </Box>
  );
};

export default HomeWindow;
