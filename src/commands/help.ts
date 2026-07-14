import type { Command } from "./types";

const help: Command = {
  name: "help",
  description: "Show available commands",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "",
      "  help          Show this help message",
      "  about         About kmmiio99o",
      "  projects      List all projects",
      "  skills        Show technical skills",
      "  social        Show social links",
      "  education     Education background",
      "  hobbies       Hobbies and interests",
      "  neofetch      System information",
      "  whoami        Who are you?",
      "  uname         System name",
      "  uptime        How long have I been coding?",
      "  date          Current date and time",
      "  clear         Clear the terminal",
      "  history       Command history",
      "  echo [text]   Echo text back",
      "  cowsay [text] ASCII cow says your text",
      "  fortune       Random fortune",
      "  matrix        Enter the matrix (use -h for xmatrix flags)",
      "  hack          HACK THE PLANET",
      "  ping          Ping the developer",
      "  sudo          Try it :)",
      "  exit          Close the terminal",
      "  theme         Toggle light/dark theme",
      "",
    ]);
  },
};

export default help;
