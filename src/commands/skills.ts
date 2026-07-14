import type { Command } from "./types";

const skills: Command = {
  name: "skills",
  description: "Show technical skills",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  HTML5       [████████████████████] 95%",
      "  CSS3        [███████████████████░] 93%",
      "  JavaScript  [████████████████░░░░] 86%",
      "  TypeScript  [████████████████░░░░] 82%",
      "  React       [█████████████████░░░] 88%",
      "  Node.js     [████████████████░░░░] 80%",
      "  Python      [███████████████░░░░░] 74%",
      "  Discord.js  [████████████████░░░░] 86%",
      "",
    ]);
  },
};

export default skills;
