import type { Command } from "./types";

const about: Command = {
  name: "about",
  description: "About kmmiio99o",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  Name:       kmmiio99o",
      "  Role:       Student & Freelancer",
      "  Location:   Poland",
      '  Status:     "Crafting exceptional digital experiences"',
      "  Email:      kmmiio99o@gmail.com",
      "  Languages:  Polish (Native), English (B2)",
      "",
    ]);
  },
};

export default about;
