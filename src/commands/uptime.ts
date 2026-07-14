import type { Command } from "./types";

const uptime: Command = {
  name: "uptime",
  description: "How long have I been coding?",
  execute: (_args, { addLine }) => {
    addLine(
      "output",
      `Up since the dawn of time. ${Math.floor(Math.random() * 5000 + 1000)} commits, 1 developer, 0 sleep cycles.`,
    );
  },
};

export default uptime;
