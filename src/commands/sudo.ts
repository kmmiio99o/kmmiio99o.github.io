import type { Command } from "./types";

const sudo: Command = {
  name: "sudo",
  description: "Try it :)",
  execute: (_args, { addLines }) => {
    addLines("error", [
      "",
      "  [sudo] password for user: ********",
      "  Nice try. This is a portfolio, not a root shell.",
      "  But I admire your ambition.",
      "",
    ]);
  },
};

export default sudo;
