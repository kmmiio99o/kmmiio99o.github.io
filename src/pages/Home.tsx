import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
  Grid,
  Chip,
  Card,
  CardContent,
  IconButton,
  Fade,
  Slide,
} from "@mui/material";

import { keyframes } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

interface HomeProps {
  onTabSwitch: () => void;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const skills = [
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776ab" },
  { name: "Discord.js", color: "#5865f2" },
  { name: "Material-UI", color: "#0081cb" },
];

const stats = [
  { label: "Years Coding", value: "1+", icon: <CodeIcon /> },
  { label: "Projects Built", value: "15+", icon: <WebIcon /> },
  { label: "Discord Bots", value: "2", icon: <SmartToyIcon /> },
];

const Home: React.FC<HomeProps> = ({ onTabSwitch }) => {
  const [mounted, setMounted] = useState(false);
  const [starSpeed, setStarSpeed] = useState<"slow" | "fast">("slow");

  useEffect(() => {
    onTabSwitch();
    setMounted(true);
    setStarSpeed("fast");
    const timeout = setTimeout(() => setStarSpeed("slow"), 900);
    return () => clearTimeout(timeout);
  }, [onTabSwitch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120,119,198,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,119,198,0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120,219,226,0.05) 0%, transparent 50%)
          `,
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 8 },
        }}
      >
        {/* Hero Section */}
        <Fade in={mounted} timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 6, md: 10 },
            }}
          >
            <Box
              sx={{
                animation: `${float} 6s ease-in-out infinite`,
                mb: 3,
              }}
            >
              <Avatar
                src="https://cdn.discordapp.com/avatars/879393496627306587/9e0f197fe0c9145246724c80c3218afa.png?size=256"
                alt="kmmiio99o"
                sx={{
                  width: { xs: 120, md: 160 },
                  height: { xs: 120, md: 160 },
                  mx: "auto",
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.main",
                  boxShadow: (theme) =>
                    `0 0 30px ${theme.palette.primary.main}30`,
                  animation: `${pulse} 4s ease-in-out infinite`,
                }}
              />
            </Box>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 1,
                fontWeight: 500,
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              👋 Hello, I'm
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 2,
                animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
              }}
            >
              kmmiio99o
            </Typography>

            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                fontWeight: 600,
                mb: 3,
                animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
              }}
            >
              Full-Stack Developer & Bot Creator
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: "auto",
                mb: 4,
                lineHeight: 1.6,
                animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
              }}
            >
              16-year-old developer passionate about creating modern web
              applications and Discord bots. Specializing in React, TypeScript,
              and Python.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{
                animation: `${fadeInUp} 0.8s ease-out 1s both`,
              }}
            >
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow: 3,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 6,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                View My Work
              </Button>

              <Button
                component={Link}
                to="/about"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                About Me
              </Button>
            </Stack>
          </Box>
        </Fade>

        {/* Skills Section */}
        <Slide direction="up" in={mounted} timeout={1200}>
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign="center"
              sx={{ mb: 4 }}
            >
              Technologies I Love
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
                mb: 6,
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={skill.name}
                  label={skill.name}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    height: "auto",
                    borderRadius: 2,
                    backgroundColor: `${skill.color}15`,
                    color: skill.color,
                    border: `2px solid ${skill.color}30`,
                    "&:hover": {
                      backgroundColor: `${skill.color}25`,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    animation: `${fadeInUp} 0.6s ease-out ${0.2 * index}s both`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Slide>

        {/* Stats Section */}
        <Fade in={mounted} timeout={1500}>
          <Grid
            container
            spacing={4}
            sx={{ mb: { xs: 6, md: 10 }, justifyContent: "center" }}
          >
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={stat.label}>
                <Card
                  elevation={2}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                    animation: `${fadeInUp} 0.8s ease-out ${0.2 * index}s both`,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: "primary.main",
                        mb: 2,
                        animation: `${pulse} 3s ease-in-out infinite`,
                      }}
                    >
                      {React.cloneElement(stat.icon, { fontSize: "large" })}
                    </Box>
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      color="primary"
                      sx={{ mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fade>

        {/* CTA Section */}
        <Slide direction="up" in={mounted} timeout={1800}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              textAlign: "center",
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
              border: (theme) => `1px solid ${theme.palette.primary.main}20`,
            }}
          >
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              Let's Build Something Amazing Together
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
            >
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                href="https://github.com/kmmiio99o"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                View GitHub
              </Button>
              <IconButton
                href="https://github.com/kmmiio99o"
                target="_blank"
                size="large"
                sx={{
                  backgroundColor: "background.paper",
                  width: { xs: "auto", sm: "auto" },
                  maxWidth: { xs: 56, sm: 56 },
                  height: { xs: 56, sm: 56 },
                  alignSelf: "center",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
};

export default Home;
