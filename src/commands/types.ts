export interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "ascii" | "table" | "success";
  content: string;
}

export interface CommandContext {
  addLine: (type: TerminalLine["type"], content: string) => void;
  addLines: (type: TerminalLine["type"], content: string[]) => void;
  setLines: React.Dispatch<React.SetStateAction<TerminalLine[]>>;
  history: string[];
  themeMode: string;
  onToggleTheme?: () => void;
  onClose?: () => void;
  nextId: () => number;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string, ctx: CommandContext) => void;
}
