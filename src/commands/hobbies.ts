import type { Command } from "./types";

const hobbies: Command = {
  name: "hobbies",
  description: "Hobbies and interests",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  1. Anime Collection  (Anilist)",
      "  2. Development       (React, TypeScript, OSS)",
      "  3. Gaming            (FPS, RPG, Indie)",
      "",
    ]);
  },
};

export default hobbies;
