import type { Command } from "./types";

const date: Command = {
  name: "date",
  description: "Current date and time",
  execute: (_args, { addLine }) => {
    addLine("output", new Date().toString());
  },
};

export default date;
