import type { Command } from "./types";

const projects: Command = {
  name: "projects",
  description: "List all projects",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  [ACTIVE] Revenge/Kettu Plugins  - Discord client plugins",
      "  [ACTIVE] ShiggyCord             - Mobile Discord client fork",
      "  [ACTIVE] Ormi Bot               - Lightweight Discord bot",
      "  [PAUSED] Kaoruko Bot Next       - Advanced Discord bot",
      "",
    ]);
  },
};

export default projects;
