import type { Command } from "./types";

const whoami: Command = {
  name: "whoami",
  description: "Who are you?",
  execute: (_args, { addLine }) => {
    addLine("output", "kmmiio99o - a human who writes code and watches anime.");
  },
};

export default whoami;
