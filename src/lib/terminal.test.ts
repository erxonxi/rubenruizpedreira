import { describe, expect, it } from "vitest";
import { completeCommand, parseCommand } from "./terminal";

describe("parseCommand", () => {
  it("parses the allowlisted commands", () => {
    expect(parseCommand(" fastfetch ")).toEqual({ type: "fastfetch" });
    expect(parseCommand("cat ./work.md")).toEqual({ type: "cat", file: "work.md" });
    expect(parseCommand("clear")).toEqual({ type: "clear" });
    expect(parseCommand("reboot")).toEqual({ type: "reboot" });
  });

  it("rejects arbitrary shell input", () => {
    const result = parseCommand("rm -rf /");
    expect(result.type).toBe("error");
    expect(result).toMatchObject({ code: "command-not-found", command: "rm" });
    expect(parseCommand("reboot --force")).toMatchObject({
      type: "error",
      code: "unexpected-argument",
      command: "reboot",
    });
  });

  it("suggests close command and file names", () => {
    expect(parseCommand("hlep")).toMatchObject({
      type: "error",
      code: "command-not-found",
      suggestion: "help",
    });
    expect(parseCommand("cat principls.md")).toMatchObject({
      type: "error",
      code: "file-not-found",
      suggestion: "cat principles.md",
    });
  });
});

describe("completeCommand", () => {
  it("completes commands and Markdown filenames", () => {
    expect(completeCommand("fas").value).toBe("fastfetch");
    expect(completeCommand("reb").value).toBe("reboot");
    expect(completeCommand("cat prin").value).toBe("cat principles.md");
  });

  it("returns all matches for ambiguous input", () => {
    expect(completeCommand("").matches).toEqual(["help", "ls", "clear", "reboot", "fastfetch", "cat"]);
  });
});
