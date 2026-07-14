import type { Command } from "./types";

const NEOFETCH_LOGO = [
  "        /\\       ",
  "       /  \\      ",
  "      /    \\     ",
  "     /      \\    ",
  "    /   ,,   \\   ",
  "   /   |  |   \\  ",
  "  /_-''    ''-_\\ ",
];

function getOSInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown OS";
}

function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox/")) return `Firefox ${ua.split("Firefox/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("Edg/")) return `Edge ${ua.split("Edg/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("OPR/") || ua.includes("Opera/")) return `Opera ${ua.split("OPR/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("Chrome/")) return `Chrome ${ua.split("Chrome/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("Safari/")) return `Safari ${ua.split("Version/")[1]?.split(" ")[0] || ""}`;
  return "Unknown Browser";
}

function getCores(): number {
  return navigator.hardwareConcurrency || 0;
}

function getUptime(): string {
  const secs = Math.floor(performance.now() / 1000);
  const days = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

const neofetch: Command = {
  name: "neofetch",
  description: "System information",
  execute: (_args, { addLines, themeMode }) => {
    const info = [
      { label: "OS", value: `${getOSInfo()} (${navigator.platform})` },
      { label: "Host", value: window.location.hostname || "localhost" },
      { label: "Browser", value: getBrowserInfo() },
      { label: "Kernel", value: "React 19 + TypeScript" },
      { label: "Shell", value: `Terminal v4.0 (${themeMode})` },
      { label: "CPU", value: getCores() ? `${getCores()} cores` : "N/A" },
      { label: "Uptime", value: getUptime() },
    ];
    const maxLabel = Math.max(...info.map((i) => i.label.length));
    const logoWidth = 18;
    const lines: string[] = [];
    for (let i = 0; i < Math.max(NEOFETCH_LOGO.length, info.length); i++) {
      const rawLogo = NEOFETCH_LOGO[i] || "";
      const logo = rawLogo.padEnd(logoWidth);
      const infoItem = info[i];
      if (infoItem) {
        const label = infoItem.label.padEnd(maxLabel + 1);
        lines.push(`${logo} ${label} ${infoItem.value}`);
      } else {
        lines.push(logo);
      }
    }
    addLines("ascii", ["", ...lines, ""]);
  },
};

export default neofetch;
