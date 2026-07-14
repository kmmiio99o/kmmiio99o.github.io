import type { Command } from "./types";

const history: Command = {
  name: "history",
  description: "Command history",
  execute: (_args, { addLines, history }) => {
    addLines("output", [
      `$ history`,
      ...history.map((h, i) => `  ${String(i + 1).padStart(4)} ${h}`),
    ]);
  },
};

export default history;
