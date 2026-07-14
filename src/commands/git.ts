import type { Command } from "./types";

const git: Command = {
  name: "git",
  description: "Version control",
  usage: "git [status|log|...]",
  execute: (args, { addLines, addLine }) => {
    if (args === "status") {
      addLines("output", [
        "On branch main",
        "Your portfolio is up to date.",
        "",
        "nothing to commit, working tree clean",
        "...just kidding, there's always something to commit.",
      ]);
    } else if (args === "log") {
      addLines("output", [
        "  a1b2c3d feat: created portfolio site",
        "  e4f5g6h fix: removed all the bugs (lol)",
        "  i7j8k9l refactor: moved everything around for no reason",
        "  m0n1o2p chore: updated dependencies (again)",
        "  q3r4s5t feat: added terminal because why not",
      ]);
    } else {
      addLine("output", `git: '${args}' is not a git command.`);
    }
  },
};

export default git;
