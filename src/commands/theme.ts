import type { Command } from "./types";

const theme: Command = {
  name: "theme",
  description: "Toggle light/dark theme",
  execute: (_args, { addLine, onToggleTheme }) => {
    if (onToggleTheme) {
      onToggleTheme();
      addLine("success", "Theme toggled.");
    } else {
      addLine("error", "Theme toggle not available in this context.");
    }
  },
};

export default theme;
