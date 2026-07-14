import type { Command } from "./types";

import help from "./help";
import about from "./about";
import projects from "./projects";
import skills from "./skills";
import social from "./social";
import education from "./education";
import hobbies from "./hobbies";
import neofetch from "./neofetch";
import whoami from "./whoami";
import uname from "./uname";
import uptime from "./uptime";
import date from "./date";
import clear from "./clear";
import history from "./history";
import echo from "./echo";
import cowsay from "./cowsay";
import fortune from "./fortune";
import hack from "./hack";
import ping from "./ping";
import sudo from "./sudo";
import exit from "./exit";
import theme from "./theme";
import ls from "./ls";
import pwd from "./pwd";
import cat from "./cat";
import { vim, nvim, nano } from "./editors";
import make from "./make";
import man from "./man";
import rm from "./rm";
import wget from "./wget";
import curl from "./curl";
import git from "./git";

const commands: Command[] = [
  help,
  about,
  projects,
  skills,
  social,
  education,
  hobbies,
  neofetch,
  whoami,
  uname,
  uptime,
  date,
  clear,
  history,
  echo,
  cowsay,
  fortune,
  hack,
  ping,
  sudo,
  exit,
  theme,
  ls,
  pwd,
  cat,
  vim,
  nvim,
  nano,
  make,
  man,
  rm,
  wget,
  curl,
  git,
];

export const commandMap = new Map<string, Command>(
  commands.map((c) => [c.name, c]),
);

export default commands;
