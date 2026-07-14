import type { Command } from "./types";

const make: Command = {
  name: "make",
  description: "Build targets",
  usage: "make [target]",
  execute: (args, { addLine }) => {
    if (args === "me a sandwich") {
      addLine("success", "Okay.");
    } else if (args) {
      addLine("output", `make: *** No rule to make target '${args}'. Stop.`);
    } else {
      addLine("error", "make: Nothing to be done.");
    }
  },
};

export default make;
