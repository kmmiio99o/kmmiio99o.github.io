import type { Command } from "./types";

const ls: Command = {
  name: "ls",
  description: "List directory contents",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "  about/      projects/    skills/",
      "  social/     education/   hobbies/",
      "  README.md   resume.pdf   .vimrc",
    ]);
  },
};

export default ls;
