import type { Command } from "./types";

const rm: Command = {
  name: "rm",
  description: "Remove files",
  usage: "rm [file]",
  execute: (args, { addLine, addLines }) => {
    if (args === "-rf /" || args === "-rf /*") {
      addLines("error", [
        "",
        "  Nice try. Permission denied. This is a portfolio, not a disaster.",
        "",
      ]);
    } else if (args) {
      addLine("error", `rm: cannot remove '${args}': Permission denied`);
    } else {
      addLine("error", "rm: missing operand");
    }
  },
};

export default rm;
