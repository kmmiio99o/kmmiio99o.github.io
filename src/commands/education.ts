import type { Command } from "./types";

const education: Command = {
  name: "education",
  description: "Education background",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  Technical School - Logistics Profile",
      "  ├─ Supply Chain Management",
      "  ├─ Warehouse Operations",
      "  ├─ Logistics Planning",
      "  └─ Self-taught IT & Development",
      "",
    ]);
  },
};

export default education;
