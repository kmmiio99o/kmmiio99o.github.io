"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  GitHub,
  Code,
  Storage,
  Palette,
  Terminal,
  Smartphone,
} from "@mui/icons-material";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiDiscord,
} from "react-icons/si";
import { SocialCard } from "@/components/SocialCard";
import { DiscordStatus } from "@/components/DiscordStatus";
import { useOneTimeAnimation } from "@/components/AnimationProvider";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] },
  },
};

// Skills data
const skills = [
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    level: 90,
    category: "languages",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    level: 95,
    category: "languages",
  },
  { name: "Python", icon: <SiPython />, level: 85, category: "languages" },
  { name: "React", icon: <SiReact />, level: 92, category: "frontend" },
  { name: "React Native", icon: <SiReact />, level: 78, category: "frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, level: 45, category: "frontend" },
  { name: "Node.js", icon: <SiNodedotjs />, level: 85, category: "backend" },
  { name: "MongoDB", icon: <SiMongodb />, level: 80, category: "backend" },
  { name: "Discord API", icon: <SiDiscord />, level: 88, category: "backend" },
  { name: "Git", icon: <SiGit />, level: 90, category: "tools" },
];

const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    icon: <Code />,
    color: "var(--md-sys-color-primary)",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: <Palette />,
    color: "var(--md-sys-color-secondary)",
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Storage />,
    color: "var(--md-sys-color-tertiary)",
  },
  {
    id: "tools",
    name: "Tools",
    icon: <Terminal />,
    color: "var(--md-sys-color-error)",
  },
];

export default function HomePage() {
  // One-time animations for all sections
  const heroAnimation = useOneTimeAnimation("hero");
  const aboutAnimation = useOneTimeAnimation("about");
  const skillsAnimation = useOneTimeAnimation("skills");
  const socialAnimation = useOneTimeAnimation("social");

  return (
    <Box>
      {/* Hero Section */}
      <MotionBox
        id="home"
        initial={heroAnimation.initial}
        animate={heroAnimation.animate}
        variants={staggerContainer}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingY: { xs: 8, md: 0 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <MotionTypography
                variant="h1"
                variants={fadeInUp}
                sx={{
                  color: "var(--md-sys-color-on-surface)",
                  fontWeight: 400,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  lineHeight: 1.2,
                  marginBottom: 2,
                }}
              >
                Hey, I'm{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 500,
                  }}
                >
                  kmmiio99o
                </Box>
              </MotionTypography>

              <MotionTypography
                variant="h4"
                variants={fadeInUp}
                sx={{
                  color: "var(--md-sys-color-on-surface-variant)",
                  fontWeight: 400,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  marginBottom: 3,
                  lineHeight: 1.4,
                }}
              >
                Discord Plugin Developer & Mobile Modder
              </MotionTypography>

              <MotionTypography
                variant="body1"
                variants={fadeInUp}
                sx={{
                  color: "var(--md-sys-color-on-surface-variant)",
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  marginBottom: 4,
                  maxWidth: 600,
                }}
              >
                I develop custom plugins and modifications for Discord mobile
                clients, plus create beautiful Discord themes. Check out my
                theme collection and specialized React Native development work.
              </MotionTypography>

              <MotionBox
                variants={fadeInUp}
                sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<GitHub />}
                  href="https://github.com/kmmiio99o"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: "20px",
                    paddingX: 3,
                    paddingY: 1.5,
                    fontSize: "1rem",
                  }}
                >
                  GitHub Profile
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Palette />}
                  href="https://themes.kmmiio99o.workers.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: "20px",
                    paddingX: 3,
                    paddingY: 1.5,
                    fontSize: "1rem",
                  }}
                >
                  Discord Themes
                </Button>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={4}>
              <MotionBox
                variants={scaleIn}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DiscordStatus />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </MotionBox>

      {/* About Section */}
      <MotionBox
        id="about"
        initial={aboutAnimation.initial}
        animate={aboutAnimation.animate}
        variants={staggerContainer}
        sx={{ paddingY: 8 }}
      >
        <Container maxWidth="lg">
          <MotionTypography
            variant="h2"
            variants={fadeInUp}
            sx={{
              color: "var(--md-sys-color-on-surface)",
              fontWeight: 400,
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            About Me
          </MotionTypography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionCard
                variants={scaleIn}
                sx={{
                  background: "var(--md-sys-color-surface-container)",
                  borderRadius: "16px",
                  height: "100%",
                }}
              >
                <CardContent sx={{ padding: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--md-sys-color-on-surface)",
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Personal Info
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.875rem" }}
                      >
                        <strong>Location:</strong> Poland
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.875rem" }}
                      >
                        <strong>Age:</strong> 15
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.875rem" }}
                      >
                        <strong>Experience:</strong> 2 Years
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.875rem" }}
                      >
                        <strong>Interests:</strong> Technology, Anime, Gaming,
                        Music
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.875rem" }}
                      >
                        <strong>Languages:</strong> Polish (Native), English
                        (B2)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionCard
                variants={scaleIn}
                sx={{
                  background: "var(--md-sys-color-surface-container)",
                  borderRadius: "16px",
                  height: "100%",
                }}
              >
                <CardContent sx={{ padding: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--md-sys-color-on-surface)",
                      fontWeight: 500,
                      marginBottom: 2,
                    }}
                  >
                    Discord Mobile Plugins
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--md-sys-color-on-surface-variant)",
                      lineHeight: 1.6,
                      marginBottom: 2,
                    }}
                  >
                    I specialize in developing custom plugins and modifications
                    for Discord mobile clients, enhancing functionality and user
                    experience beyond the standard app capabilities.
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--md-sys-color-on-surface-variant)",
                      lineHeight: 1.6,
                      marginBottom: 3,
                      opacity: 0.9,
                    }}
                  >
                    My work includes creating React Native modules, implementing
                    custom UI components, integrating with Discord's API, and
                    developing themes that enhance the mobile Discord
                    experience. I focus on performance optimization and seamless
                    integration with existing Discord functionality.
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {[
                      "React Native Plugins",
                      "Discord API Integration",
                      "Mobile UI/UX",
                      "Custom Themes",
                      "Performance Optimization",
                      "Cross-Platform Support",
                    ].map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          backgroundColor:
                            "var(--md-sys-color-secondary-container)",
                          color: "var(--md-sys-color-on-secondary-container)",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </Container>
      </MotionBox>

      {/* Skills Section */}
      <MotionBox
        id="skills"
        initial={skillsAnimation.initial}
        animate={skillsAnimation.animate}
        variants={staggerContainer}
        sx={{ paddingY: 8 }}
      >
        <Container maxWidth="lg">
          <MotionTypography
            variant="h2"
            variants={fadeInUp}
            sx={{
              color: "var(--md-sys-color-on-surface)",
              fontWeight: 400,
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            Skills & Technologies
          </MotionTypography>

          <Grid container spacing={4}>
            {skillCategories.map((category, categoryIndex) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <MotionCard
                  variants={scaleIn}
                  custom={categoryIndex}
                  sx={{
                    background: "var(--md-sys-color-surface-container)",
                    borderRadius: "16px",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ padding: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Box
                        sx={{
                          color: category.color,
                          marginRight: 1,
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "var(--md-sys-color-on-surface)",
                          fontWeight: 500,
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {skills
                        .filter((skill) => skill.category === category.id)
                        .map((skill) => (
                          <Box
                            key={skill.name}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{ fontSize: "1.2rem", color: category.color }}
                            >
                              {skill.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "var(--md-sys-color-on-surface)",
                                  fontWeight: 500,
                                  fontSize: "0.875rem",
                                }}
                              >
                                {skill.name}
                              </Typography>
                              <Box
                                sx={{
                                  width: "100%",
                                  height: 4,
                                  backgroundColor:
                                    "var(--md-sys-color-surface-variant)",
                                  borderRadius: 2,
                                  overflow: "hidden",
                                  marginTop: 0.5,
                                }}
                              >
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: categoryIndex * 0.1,
                                  }}
                                  style={{
                                    height: "100%",
                                    background: category.color,
                                    borderRadius: 2,
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>

      {/* Social Section */}
      <MotionBox
        id="social"
        initial={socialAnimation.initial}
        animate={socialAnimation.animate}
        variants={staggerContainer}
        sx={{ paddingY: 8 }}
      >
        <Container maxWidth="lg">
          <MotionTypography
            variant="h2"
            variants={fadeInUp}
            sx={{
              color: "var(--md-sys-color-on-surface)",
              fontWeight: 400,
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            Connect With Me
          </MotionTypography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <SocialCard
                href="https://discord.com/users/879393496627306587"
                icon={<SiDiscord />}
                title="Discord"
                description="Chat with me and join my community"
                delay={0.1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SocialCard
                href="https://github.com/kmmiio99o"
                icon={<GitHub />}
                title="GitHub"
                description="Check out my code and projects"
                delay={0.2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SocialCard
                href="https://myanimelist.net/profile/kmmiio99o"
                icon={
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    MAL
                  </span>
                }
                title="MyAnimeList"
                description="My anime collection and ratings"
                delay={0.3}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SocialCard
                href="/game"
                icon={<Smartphone />}
                title="Snake Game"
                description="Play my HTML5 game creation"
                delay={0.4}
                external={false}
              />
            </Grid>
          </Grid>
        </Container>
      </MotionBox>
    </Box>
  );
}
