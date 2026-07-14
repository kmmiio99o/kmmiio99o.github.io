import type { Command } from "./types";

const clear: Command = {
  name: "clear",
  description: "Clear the terminal",
  execute: (_args, { setLines }) => {
    setLines([]);
  },
};

export default clear;
