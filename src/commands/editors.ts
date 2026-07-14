import type { Command } from "./types";

const editors: Command = {
  name: "vim",
  description: "Text editor (not available)",
  execute: (_args, { addLines }) => {
    addLines("error", [
      "",
      "  Wait, this is a PORTFOLIO site.",
      "  What did you expect, a full terminal emulator?",
      "...okay fine, you got one. But no text editor.",
      "",
    ]);
  },
};

export const vim = { ...editors, name: "vim" };
export const nvim = { ...editors, name: "nvim" };
export const nano = { ...editors, name: "nano" };
