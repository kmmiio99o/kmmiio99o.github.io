import type { Command } from "./types";

const echo: Command = {
  name: "echo",
  description: "Echo text back",
  execute: (args, { addLine }) => {
    addLine("output", args || "");
  },
};

export default echo;
