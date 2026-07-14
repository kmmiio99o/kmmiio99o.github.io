import type { Command } from "./types";

const pwd: Command = {
  name: "pwd",
  description: "Print working directory",
  execute: (_args, { addLine }) => {
    addLine("output", "/home/user/kmmiio99o");
  },
};

export default pwd;
