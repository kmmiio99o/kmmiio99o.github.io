import type { Command } from "./types";

const social: Command = {
  name: "social",
  description: "Show social links",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  GitHub:     https://github.com/kmmiio99o",
      "  Discord:    kmmiio99o",
      "  Email:      kmmiio99o@gmail.com",
      "  AL:        https://anilist.co/user/kmmiio99o",
      "",
    ]);
  },
};

export default social;
