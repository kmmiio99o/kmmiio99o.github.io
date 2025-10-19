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
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExtensionIcon from "@mui/icons-material/Extension";
import BuildIcon from "@mui/icons-material/Build";
import LaunchIcon from "@mui/icons-material/Launch";

interface ProjectsProps {
  onTabSwitch: () => void;
}

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "active" | "paused";
  statusColor: string;
  icon: React.ReactElement;
  githubUrl: string;
  features: string[];
};

const projects: Project[] = [
  {
    id: "kaoruko-bot-next",
    title: "Kaoruko Bot Next",
    description:
      "Advanced Discord bot with comprehensive dashboard and enterprise-level security. Built for scalability with modern TypeScript architecture.",
    technologies: ["TypeScript", "Discord.js", "React", "Node.js", "MongoDB"],
    status: "paused",
    statusColor: "#f44336",
    icon: <SmartToyIcon />,
    githubUrl: "https://github.com/kmmiio99o/Kaoruko-Bot-Next",
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
    statusColor: "#4caf50",
    icon: <ExtensionIcon />,
    githubUrl: "https://github.com/kmmiio99o/vd-plugins",
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
    technologies: ["JavaScript", "TypeScript", "Bun", "React"],
    status: "active",
    statusColor: "#1976d2",
    icon: <ExtensionIcon />,
    githubUrl: "https://github.com/kmmiio99o/ShiggyCord",
    features: [
      "Injectable bundle (shiggycord.js)",
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
    statusColor: "#4caf50",
    icon: <BuildIcon />,
    githubUrl: "https://github.com/kmmiio99o/ormi-bot",
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

  useEffect(() => {
    onTabSwitch();
    setMounted(true);
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, [onTabSwitch]);

  return (
    <Fade in={mounted} timeout={300}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "transparent",
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
              My Projects
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Explore my work in Discord bot development and client
              modifications
            </Typography>
          </Box>

          {/* Projects Grid */}
          <Grid
            container
            spacing={4}
            sx={{ mb: 8, justifyContent: "center", alignItems: "stretch" }}
          >
            {projects.map((project) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={project.id}
                sx={{ display: "flex" }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    minHeight: 360,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "primary.main",
                          borderRadius: "50%",
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                          color: "white",
                          boxShadow: 2,
                        }}
                      >
                        {React.cloneElement(project.icon, {
                          fontSize: "medium",
                        })}
                      </Box>

                      <Chip
                        label={
                          project.status === "paused" ? "Paused" : "Active"
                        }
                        size="small"
                        sx={{
                          backgroundColor: `${project.statusColor}20`,
                          color: project.statusColor,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>

                    {/* Title and Description */}
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </Typography>

                    {/* Technologies */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        Technologies:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: "primary.main",
                              color: "primary.contrastText",
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              height: 24,
                              px: 0.6,
                            }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.65rem",
                              height: 24,
                              opacity: 0.85,
                            }}
                          />
                        )}
                      </Box>
                    </Box>

                    {/* Features */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        Features:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {project.features.slice(0, 3).map((feature) => (
                          <Chip
                            key={feature}
                            label={feature}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.65rem", height: 24 }}
                          />
                        ))}
                        {project.features.length > 3 && (
                          <Chip
                            label={`+${project.features.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.65rem",
                              height: 24,
                              opacity: 0.7,
                            }}
                          />
                        )}
                      </Box>
                    </Box>

                    {/* Action Button */}
                    <Button
                      variant="contained"
                      startIcon={<LaunchIcon />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={project.status === "paused"}
                      fullWidth
                      sx={{
                        mt: "auto",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      {project.status === "paused" ? "View Code" : "Explore"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Call to Action */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Want to collaborate?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
            >
              Check out my code repositories and open-source contributions on
              GitHub.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://github.com/kmmiio99o"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              View GitHub
            </Button>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Projects;
