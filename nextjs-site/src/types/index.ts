// Discord API Types
export interface DiscordActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  emoji?: {
    id?: string;
    name?: string;
    animated?: boolean;
  };
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  party?: {
    id?: string;
    size?: [number, number];
  };
  application_id?: string;
  url?: string;
}

// Processed Discord Activity (with additional computed fields)
export interface ProcessedDiscordActivity extends DiscordActivity {
  imageUrl?: string;
  elapsedTime?: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  display_name?: string;
  global_name?: string;
}

export interface DiscordData {
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: DiscordActivity[];
  listening_to_spotify?: boolean;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
  kv?: Record<string, any>;
}

export interface LanyardResponse {
  success: boolean;
  data: DiscordData;
}

// Component Props Types
export interface SocialCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  external?: boolean;
}

export interface SkillItemProps {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  category: "frontend" | "backend" | "tools" | "languages";
}

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export interface ThemeContextType {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

// Animation Types
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string | number[];
    };
  };
}

export interface StaggerAnimationProps {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
}

// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  location: string;
  age: number;
  email: string;
  resumeUrl?: string;
}

export interface ContactInfo {
  email: string;
  discord: string;
  github: string;
  mal: string;
}

// Status Types
export type StatusType = "online" | "idle" | "dnd" | "offline";

export interface StatusConfig {
  color: string;
  label: string;
  icon?: string;
}

// Utility Types
export type ThemeMode = "light" | "dark";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
