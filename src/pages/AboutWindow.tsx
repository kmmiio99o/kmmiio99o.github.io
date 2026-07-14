import React, { useEffect, useState, useMemo } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Chip,
  Box,
  Paper,
  LinearProgress,
  alpha,
  Skeleton,
} from "@mui/material";
import {
  subscribeLanyard,
  getDiscordAvatarUrl,
  type LanyardPresence,
} from "../api/lanyard";
import {
  DISCORD_USER_ID,
  SKILLS,
  LANGUAGES,
} from "../data/projects";
import { useDataTheme } from "../hooks/useDataTheme";

const STATUS_MAP: Record<string, { color: string; label: string }> = {
  online: { color: "#22c55e", label: "Online" },
  idle: { color: "#eab308", label: "Away" },
  dnd: { color: "#ef4444", label: "Busy" },
  offline: { color: "#666", label: "Offline" },
};

const HOBBIES = [
  {
    name: "Anime",
    desc: "Tracking and rating anime on MyAnimeList",
    color: "#ef4444",
    tags: ["MyAnimeList"],
  },
  {
    name: "Development",
    desc: "Building web apps, learning new tech, and open source",
    color: "#00bcd4",
    tags: ["React", "TypeScript", "OSS"],
  },
  {
    name: "Gaming",
    desc: "FPS, RPG, and indie games in free time",
    color: "#22c55e",
    tags: ["FPS", "RPG", "Indie"],
  },
];

const AboutWindow: React.FC = () => {
  const themeMode = useDataTheme();
  const isDark = themeMode === "dark";
  const cardBg = isDark ? "rgba(18,18,32,0.5)" : "rgba(0,0,0,0.04)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const progressTrack = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  const [lanyard, setLanyard] = useState<LanyardPresence | null>(null);
  const [loading, setLoading] = useState(true);
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeLanyard(DISCORD_USER_ID, (d) => {
      setLanyard(d);
      setLoading(false);
    }, 10000);
    const timer = setTimeout(() => setAnimateSkills(true), 400);
    return () => {
      try { unsub(); } catch { /* ignore */ }
      clearTimeout(timer);
    };
  }, []);

  const user = lanyard?.data?.discord_user;
  const status = lanyard?.data?.discord_status || "offline";
  const statusInfo = STATUS_MAP[status] || STATUS_MAP.offline;
  const avatarUrl = useMemo(() => getDiscordAvatarUrl(user), [user]);

  return (
    <Box sx={{ p: 2.5, minHeight: "100%" }}>
      {/* Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: "center" }}>
        {loading ? (
          <Skeleton variant="circular" width={56} height={56} />
        ) : (
          <Avatar
            src={avatarUrl || undefined}
            sx={{
              width: 56,
              height: 56,
              border: `2px solid ${statusInfo.color}`,
            }}
          >
            {user?.username?.[0]?.toUpperCase() || "K"}
          </Avatar>
        )}
        <Stack spacing={0.25}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "primary.main",
            }}
          >
            kmmiio99o
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Developer & Student
          </Typography>
          <Chip
            label={`${statusInfo.label} on Discord`}
            size="small"
            sx={{
              width: "fit-content",
              height: 22,
              fontSize: "0.65rem",
              backgroundColor: alpha(statusInfo.color, 0.12),
              color: statusInfo.color,
              fontWeight: 700,
            }}
          />
        </Stack>
      </Stack>

      {/* Quick Facts */}
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
        <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.65rem" }}>
          Quick Facts
        </Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {[
            { label: "Status", value: "Student & Freelancer" },
            { label: "Education", value: "Technical School - Logistics Profile" },
            { label: "Location", value: "Poland" },
          ].map((fact) => (
            <Stack key={fact.label} direction="row" spacing={1}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  minWidth: 80,
                  fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
                  fontSize: "0.7rem",
                }}
              >
                {fact.label}:
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
                {fact.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      {/* Languages */}
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
        <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.65rem" }}>
          Languages
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", gap: 0.75 }}>
          {LANGUAGES.map((lang) => (
            <Chip
              key={lang.name}
              label={`${lang.name} (${lang.level})`}
              size="small"
              sx={{
                height: 24,
                fontSize: "0.7rem",
                backgroundColor: alpha("#00bcd4", 0.1),
                color: "#00bcd4",
                border: `1px solid ${alpha("#00bcd4", 0.2)}`,
              }}
            />
          ))}
        </Stack>
      </Paper>

      {/* Skills */}
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
        <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.65rem" }}>
          Technical Skills
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 1.5 }}>
          {SKILLS.map((skill, i) => (
            <Stack
              key={skill.name}
              spacing={0.5}
              sx={{
                opacity: animateSkills ? 1 : 0,
                transform: animateSkills ? "translateY(0)" : "translateY(8px)",
                transition: `all 400ms ease ${i * 60}ms`,
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
                    fontSize: "0.7rem",
                  }}
                >
                  {skill.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: skill.color,
                    fontSize: "0.7rem",
                    fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
                  }}
                >
                  {skill.level}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={animateSkills ? skill.level : 0}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: progressTrack,
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 2,
                    backgroundColor: skill.color,
                    transition: `transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms`,
                  },
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Paper>

      {/* Hobbies */}
      <Stack spacing={1.5}>
        <Typography variant="overline" sx={{ color: "primary.main", fontSize: "0.65rem" }}>
          Hobbies & Interests
        </Typography>
        {HOBBIES.map((hobby) => (
          <Paper
            key={hobby.name}
            elevation={0}
            sx={{
              p: 1.5,
              backgroundColor: "rgba(18,18,32,0.5)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 2,
              "&:hover": { borderColor: hobby.color },
              transition: "border-color 200ms",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
                fontSize: "0.8rem",
                color: hobby.color,
              }}
            >
              {hobby.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
              {hobby.desc}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.75, flexWrap: "wrap", gap: 0.5 }}>
              {hobby.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.55rem",
                    backgroundColor: alpha(hobby.color, 0.1),
                    color: hobby.color,
                  }}
                />
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default AboutWindow;
