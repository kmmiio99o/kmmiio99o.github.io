import type { Command } from "./types";

const cowsay: Command = {
  name: "cowsay",
  description: "ASCII cow says your text",
  usage: "cowsay [text]",
  execute: (args, { addLines }) => {
    const text = args || "moo";
    addLines("ascii", [
      "",
      " " + "_".repeat(text.length + 2),
      `< ${text} >`,
      " " + "-".repeat(text.length + 2),
      "        \\   ^__^",
      "         \\  (oo)\\_______",
      "            (__)\\       )\\/\\",
      "                ||----w |",
      "                ||     ||",
      "",
    ]);
  },
};

export default cowsay;
