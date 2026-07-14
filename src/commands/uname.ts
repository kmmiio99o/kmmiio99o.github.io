import type { Command } from "./types";

const uname: Command = {
  name: "uname",
  description: "System name",
  execute: (_args, { addLine }) => {
    addLine("output", "kmmiio99o OS 4.0.0 Portfolio x86_64 React/TypeScript");
  },
};

export default uname;
