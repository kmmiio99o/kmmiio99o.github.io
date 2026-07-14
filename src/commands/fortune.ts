import type { Command } from "./types";

const FORTUNES = [
  "You will Ship It today. No tests needed.",
  "A bug in production is just a feature that hasn't been documented yet.",
  "The code works? Don't touch it. Seriously.",
  "Today is a good day to refactor... just kidding, deploy on Friday.",
  "Your next commit message will be: 'fixed stuff' and it will be the truest thing you've ever written.",
  "The best error message is the one that never shows up. But they always do.",
  "In the land of the blind, the one-eyed man is the one with a linter.",
  "It works on my machine. Ship the machine.",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, sees two tables, and asks... 'Can I JOIN you?'",
  "To understand recursion, you must first understand recursion.",
  "There's no place like 127.0.0.1",
  "// TODO: write a better fortune",
];

const fortune: Command = {
  name: "fortune",
  description: "Random fortune",
  execute: (_args, { addLine }) => {
    addLine(
      "success",
      FORTUNES[Math.floor(Math.random() * FORTUNES.length)],
    );
  },
};

export default fortune;
