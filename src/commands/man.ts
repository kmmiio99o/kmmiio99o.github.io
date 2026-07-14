import type { Command } from "./types";

const man: Command = {
  name: "man",
  description: "Manual pages",
  usage: "man [command]",
  execute: (args, { addLines }) => {
    addLines("output", [
      "",
      `  ${args || "unknown"} - no manual entry found`,
      "  Have you tried reading the README? Oh wait, this is a terminal.",
      '  Try "help" instead.',
      "",
    ]);
  },
};

export default man;
