import type { Command } from "./types";

const wget: Command = {
  name: "wget",
  description: "Download files",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "  Connecting to kmmiio99o.github.io...",
      "  ERROR 418: I'm a teapot, not a file server.",
    ]);
  },
};

export default wget;
