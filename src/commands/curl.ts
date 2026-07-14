import type { Command } from "./types";

const curl: Command = {
  name: "curl",
  description: "Transfer data",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "  < HTTP/1.1 200 OK",
      "  < Content-Type: application/portfolio",
      "  < X-Powered-By: Caffeine and Determination",
      '  {"status": "impressive", "developer": "kmmiio99o"}',
    ]);
  },
};

export default curl;
