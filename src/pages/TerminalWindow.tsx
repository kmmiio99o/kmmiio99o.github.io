import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { commandMap } from "../commands";
import type { TerminalLine, CommandContext } from "../commands/types";

const TerminalWindow: React.FC<{ onToggleTheme?: () => void; onClose?: () => void }> = ({
  onToggleTheme,
  onClose,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [themeMode, setThemeMode] = useState("dark");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);

  const nextId = useCallback(() => ++lineId.current, []);

  const addLine = useCallback(
    (type: TerminalLine["type"], content: string) => {
      setLines((prev) => [...prev, { id: nextId(), type, content }]);
    },
    [nextId],
  );

  const addLines = useCallback(
    (type: TerminalLine["type"], content: string[]) => {
      setLines((prev) => [
        ...prev,
        ...content.map((c) => ({ id: nextId(), type, content: c })),
      ]);
    },
    [nextId],
  );

  useEffect(() => {
    addLines("output", [
      "Welcome to kmmiio99o's interactive terminal.",
      'Type "help" for a list of commands.',
      "",
    ]);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const executeCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      addLine("input", `$ ${trimmed}`);
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1).join(" ");

      if (cmd === "theme") {
        setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
      }

      const command = commandMap.get(cmd);
      if (command) {
        const ctx: CommandContext = {
          addLine,
          addLines,
          setLines,
          history,
          themeMode,
          onToggleTheme,
          onClose,
          nextId,
        };
        command.execute(args, ctx);
      } else {
        addLine("error", `command not found: ${cmd}. Type "help" for available commands.`);
      }
    },
    [addLine, addLines, history, themeMode, onToggleTheme, onClose, nextId],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "error":
        return "#ff1744";
      case "success":
        return "#00ff41";
      case "ascii":
        return "#00bcd4";
      case "input":
        return "#e0e0e0";
      default:
        return "text.secondary";
    }
  };

  return (
    <Box
      onClick={focusInput}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        fontSize: "0.78rem",
        backgroundColor: "rgba(8, 8, 16, 0.98)",
        cursor: "text",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          overflow: "auto",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {lines.map((line) => (
          <Typography
            key={line.id}
            component="pre"
            sx={{
              fontFamily: "monospace",
              fontSize: "0.78rem",
              lineHeight: 1.5,
              color: getLineColor(line.type),
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              m: 0,
              p: 0,
            }}
          >
            {line.content}
          </Typography>
        ))}

        <Box
          component="form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            executeCommand(input);
            setInput("");
          }}
          sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: "monospace",
              fontSize: "0.78rem",
              color: "#00ff41",
              fontWeight: 700,
              whiteSpace: "pre",
            }}
          >
            {"$ "}
          </Typography>
          <Box
            component="input"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            ref={inputRef}
            autoFocus
            sx={{
              flex: 1,
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "text.primary",
              fontFamily: "monospace",
              fontSize: "0.78rem",
              caretColor: "#00ff41",
              p: 0,
              m: 0,
              lineHeight: 1.5,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TerminalWindow;
