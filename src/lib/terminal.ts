export const COMMANDS = ["help", "ls", "clear", "reboot", "fastfetch", "cat"] as const;

export const PORTFOLIO_FILES = [
  "work.md",
  "about.md",
  "principles.md",
  "make-it-funny.md",
  "contact.md",
] as const;

export type CommandName = (typeof COMMANDS)[number];
export type PortfolioFile = (typeof PORTFOLIO_FILES)[number];
export type TerminalErrorCode =
  | "command-not-found"
  | "cat-missing-file"
  | "cat-too-many-files"
  | "file-not-found"
  | "unexpected-argument";

export type ParsedCommand =
  | { type: "empty" }
  | { type: "clear" }
  | { type: "help" | "ls" | "reboot" | "fastfetch" }
  | { type: "cat"; file: PortfolioFile }
  | {
      type: "error";
      code: TerminalErrorCode;
      command: string;
      argument?: string;
      suggestion?: string;
    };

const stripRelativePrefix = (value: string) => value.replace(/^\.\//, "");

function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);

  for (let column = 0; column <= a.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      matrix[row][column] = b[row - 1] === a[column - 1]
        ? matrix[row - 1][column - 1]
        : Math.min(
            matrix[row - 1][column - 1] + 1,
            matrix[row][column - 1] + 1,
            matrix[row - 1][column] + 1,
          );
    }
  }

  return matrix[b.length][a.length];
}

function closest(value: string, options: readonly string[]): string | undefined {
  if (!value) return undefined;

  const candidate = options
    .map((option) => ({ option, distance: levenshtein(value, option) }))
    .sort((a, b) => a.distance - b.distance)[0];

  return candidate && candidate.distance <= Math.max(2, Math.floor(value.length / 3))
    ? candidate.option
    : undefined;
}

export function parseCommand(raw: string): ParsedCommand {
  const normalized = raw.trim().replace(/\s+/g, " ");
  if (!normalized) return { type: "empty" };

  const [command, ...args] = normalized.split(" ");

  if (!COMMANDS.includes(command as CommandName)) {
    const suggestion = closest(command, COMMANDS);
    return {
      type: "error",
      code: "command-not-found",
      command,
      suggestion,
    };
  }

  if (command === "cat") {
    if (args.length === 0) {
      return {
        type: "error",
        code: "cat-missing-file",
        command,
        suggestion: "cat work.md",
      };
    }

    if (args.length > 1) {
      return {
        type: "error",
        code: "cat-too-many-files",
        command,
        suggestion: "cat work.md",
      };
    }

    const file = stripRelativePrefix(args[0]);
    if (!PORTFOLIO_FILES.includes(file as PortfolioFile)) {
      const suggestion = closest(file, PORTFOLIO_FILES);
      return {
        type: "error",
        code: "file-not-found",
        command,
        argument: args[0],
        suggestion: suggestion ? `cat ${suggestion}` : undefined,
      };
    }

    return { type: "cat", file: file as PortfolioFile };
  }

  if (args.length > 0) {
    return {
      type: "error",
      code: "unexpected-argument",
      command,
      argument: args.join(" "),
      suggestion: command,
    };
  }

  return { type: command as Exclude<CommandName, "cat"> };
}

export type CompletionResult = {
  value: string;
  matches: string[];
};

export function completeCommand(raw: string): CompletionResult {
  const leadingWhitespace = raw.match(/^\s*/)?.[0] ?? "";
  const value = raw.slice(leadingWhitespace.length);

  if (value.startsWith("cat ")) {
    const filePrefix = stripRelativePrefix(value.slice(4));
    const matches = PORTFOLIO_FILES.filter((file) => file.startsWith(filePrefix));
    return {
      value: matches.length === 1 ? `${leadingWhitespace}cat ${matches[0]}` : raw,
      matches: matches.map((file) => `cat ${file}`),
    };
  }

  if (value.includes(" ")) return { value: raw, matches: [] };

  const matches = COMMANDS.filter((command) => command.startsWith(value));
  return {
    value: matches.length === 1 ? `${leadingWhitespace}${matches[0]}` : raw,
    matches: [...matches],
  };
}
