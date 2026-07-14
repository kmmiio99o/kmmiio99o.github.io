export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "active" | "paused" | "completed";
  accentColor: string;
  githubUrl: string;
  repoOwner: string;
  repoName: string;
  features: string[];
}

export const projects: Project[] = [
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
    accentColor: "#ef4444",
    githubUrl: "https://github.com/kmmiio99o/Kaoruko-Bot-Next",
    repoOwner: "kmmiio99o",
    repoName: "Kaoruko-Bot-Next",
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
    accentColor: "#22c55e",
    githubUrl: "https://github.com/kmmiio99o/vd-plugins",
    repoOwner: "kmmiio99o",
    repoName: "vd-plugins",
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
      "An unofficial fork of Kettu, made just for fun. Mobile-focused client modifications with themes, fonts and plugins support.",
    technologies: ["JavaScript", "TypeScript", "Bun", "React"],
    status: "active",
    accentColor: "#00bcd4",
    githubUrl: "https://github.com/kmmiio99o/ShiggyCord",
    repoOwner: "kmmiio99o",
    repoName: "ShiggyCord",
    features: [
      "Injectable Bundle",
      "Supports Xposed & Manager",
      "Local Bundle Serving",
      "Build Scripts With Bun",
      "Mobile Client Modifications",
      "Theming & UI Tweaks",
    ],
  },
  {
    id: "ormi-bot",
    title: "Ormi Bot",
    description:
      "Lightweight Discord bot focused on simplicity and reliability. Perfect for communities seeking essential moderation tools with zero complexity.",
    technologies: ["Python", "Discord.py"],
    status: "active",
    accentColor: "#ff9100",
    githubUrl: "https://github.com/kmmiio99o/ormi-bot",
    repoOwner: "kmmiio99o",
    repoName: "ormi-bot",
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

export const SKILLS = [
  { name: "HTML5", level: 95, color: "#e34c26" },
  { name: "CSS3", level: 93, color: "#1572b6" },
  { name: "JavaScript", level: 86, color: "#f0db4f" },
  { name: "TypeScript", level: 82, color: "#3178c6" },
  { name: "React", level: 88, color: "#61dafb" },
  { name: "Node.js", level: 80, color: "#339933" },
  { name: "Python", level: 74, color: "#306998" },
  { name: "Discord.js", level: 86, color: "#5865f2" },
];

export const LANGUAGES = [
  { name: "Polish", level: "Native" as const, flag: "PL" },
  { name: "English", level: "B2" as const, flag: "EN" },
];

export const DISCORD_USER_ID = "879393496627306587";
export const GITHUB_USERNAME = "kmmiio99o";
export const EMAIL = "kmmiio99o@gmail.com";
