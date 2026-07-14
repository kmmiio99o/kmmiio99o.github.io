import type { Command } from "./types";

const exit: Command = {
  name: "exit",
  description: "Close the terminal",
  execute: (_args, { addLines, onClose }) => {
    if (onClose) {
      addLines("output", ["", "  Closing terminal...", ""]);
      setTimeout(() => onClose(), 400);
    } else {
      addLines("output", [
        "",
        "  Closing terminal...",
        "  Just kidding, you can't escape that easily.",
        "  This is your life now. Welcome to the terminal.",
        "",
      ]);
    }
  },
};

export default exit;
