import type { Command } from "./types";

const cat: Command = {
  name: "cat",
  description: "Concatenate files",
  usage: "cat [file]",
  execute: (args, { addLines, addLine }) => {
    if (args === "README.md" || args === "") {
      addLines("output", [
        "# kmmiio99o",
        "",
        "Welcome to my corner of the internet.",
        "I build things with TypeScript, React, and caffeine.",
      ]);
    } else {
      addLine("error", `cat: ${args}: No such file or directory`);
    }
  },
};

export default cat;
