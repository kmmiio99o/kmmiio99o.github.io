import type { Command } from "./types";

const hack: Command = {
  name: "hack",
  description: "HACK THE PLANET",
  execute: (_args, { addLines }) => {
    addLines("ascii", [
      "",
      "  HACK THE PLANET!",
      "",
      "  > Initializing hack sequence...",
      "  > Bypassing firewall... DONE",
      "  > Decrypting mainframe... DONE",
      "  > Uploading memes... DONE",
      "  > Hacking complete. You now own 1 (one) cat picture.",
      "",
    ]);
  },
};

export default hack;
