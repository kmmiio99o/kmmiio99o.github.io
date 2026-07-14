import type { Command } from "./types";

const ping: Command = {
  name: "ping",
  description: "Ping the developer",
  execute: (_args, { addLines }) => {
    addLines("output", [
      "PING kmmiio99o (127.0.0.1): 56 data bytes",
      "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042ms",
      "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038ms",
      "64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041ms",
      "",
      "--- kmmiio99o ping statistics ---",
      "3 packets transmitted, 3 packets received, 0.0% packet loss",
      "",
    ]);
  },
};

export default ping;
