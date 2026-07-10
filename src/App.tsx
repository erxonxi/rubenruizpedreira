import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  BookOpenText,
  Circle,
  Smiley,
} from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import aboutEn from "./content/en/about.md?raw";
import contactEn from "./content/en/contact.md?raw";
import funnyEn from "./content/en/make-it-funny.md?raw";
import principlesEn from "./content/en/principles.md?raw";
import workEn from "./content/en/work.md?raw";
import aboutEs from "./content/es/about.md?raw";
import contactEs from "./content/es/contact.md?raw";
import funnyEs from "./content/es/make-it-funny.md?raw";
import principlesEs from "./content/es/principles.md?raw";
import workEs from "./content/es/work.md?raw";
import {
  PORTFOLIO_FILES,
  completeCommand,
  parseCommand,
  type ParsedCommand,
  type PortfolioFile,
} from "./lib/terminal";

type Locale = "en" | "es";

type HistoryEntry = {
  id: number;
  raw: string;
  result: Exclude<ParsedCommand, { type: "empty" | "clear" }>;
};

const ASCII_R = String.raw`
  --############=-
    ==++++////////+===-
    :+=+///::::::::.++:
       :+=/         .+/
        ://          .+:
    -++/             //++-
       :/:::::::::::==-
       -+/:        :+=-
        -+=-        :+##-
         :+#=-       :+##+
         :+##=-       :+###-
         :+###-        :+####-
         :+####-         :+####=-
     .--=#####=-         -=######=.`;

const CONTENT: Record<Locale, Record<PortfolioFile, string>> = {
  en: {
    "work.md": workEn,
    "about.md": aboutEn,
    "principles.md": principlesEn,
    "make-it-funny.md": funnyEn,
    "contact.md": contactEn,
  },
  es: {
    "work.md": workEs,
    "about.md": aboutEs,
    "principles.md": principlesEs,
    "make-it-funny.md": funnyEs,
    "contact.md": contactEs,
  },
};

const FASTFETCH_SYSTEM_INFO = [
  ["OS", "RubenOS 24"],
  ["User", "Rubén Ruiz Pedreira"],
  ["Kernel", "product-minded-software-engineer"],
  ["Host", "haddock (YC W22)"],
  ["Uptime", "6 years shipping"],
  ["CPU", "product thinking"],
  ["GPU", "engineering execution"],
  ["Shell", "make-it-funny"],
  ["Theme", "controlled-chaos"],
] as const;

const SYSTEM_STATUS = {
  booting: "booting",
  complete: "boot complete",
} as const;

const MESSAGES = {
  en: {
    pageTitle: "Rubén Ruiz Pedreira — Product-minded Software Engineer",
    reader: "Reader mode",
    terminal: "Terminal mode",
    commandLabel: "Terminal command",
    helpTitle: "Available commands",
    helpMouse: "Prefer a mouse? Every file below is clickable. No Bash interview required.",
    helpCommands: [
      ["fastfetch", "profile snapshot"],
      ["ls", "list portfolio files"],
      ["cat <file>", "read a Markdown file"],
      ["clear", "clear command history"],
      ["reboot", "replay the boot sequence"],
      ["help", "show this guide"],
    ],
    keyboardGuide: "Tab — autocomplete · ↑/↓ — history · Ctrl+L — clear",
    emptyHistory: "History cleared. The interesting files are still here.",
    completion: "Possible completions",
    footerMotto: "Serious output. Zero unnecessary seriousness.",
    bootLines: [
      "[ ok ] calibrating product instincts",
      "[ ok ] linking code to real problems",
      "[ ok ] mounting selected work",
      "[ ok ] enabling controlled chaos",
      "[ ok ] dropping unnecessary seriousness",
      "[ ok ] starting make-it-funny shell",
    ],
    aria: {
      displayControls: "Display controls",
      language: "Language",
      terminalOutput: "Terminal output",
      commandDock: "Terminal command dock",
      suggestedCommands: "Suggested commands",
      portfolioFiles: "Portfolio files",
      systemProfile: "Rubén Ruiz Pedreira system profile",
      asciiMark: "ASCII art letter R",
    },
    systemInfo: FASTFETCH_SYSTEM_INFO,
    errors: {
      commandNotFound: (command: string) => `make-it-funny: command not found: ${command}`,
      didYouMean: (command: string) => `Did you mean \`${command}\`?`,
      typeHelp: "Type `help` to see the available commands.",
      catMissing: "cat: missing file operand",
      tryListThenWork: "Try `ls`, then `cat work.md`.",
      catTooMany: "cat: this portfolio reads one file at a time",
      tryWork: "Try `cat work.md`.",
      fileNotFound: (file: string) => `cat: ${file}: No such file`,
      runList: "Run `ls` to list the available files.",
      unexpectedArgument: (command: string, argument: string) => `${command}: unexpected argument: ${argument}`,
      runWithoutArguments: (command: string) => `Run \`${command}\` without arguments.`,
    },
    commandExecuted: (command: string) => `${command} executed`,
    rebooting: "Rebooting RubenOS.",
  },
  es: {
    pageTitle: "Rubén Ruiz Pedreira — Ingeniero de software con mentalidad de producto",
    reader: "Modo lectura",
    terminal: "Modo terminal",
    commandLabel: "Comando de terminal",
    helpTitle: "Comandos disponibles",
    helpMouse: "¿Prefieres el ratón? Todos los archivos son clicables. No hace falta una entrevista de Bash.",
    helpCommands: [
      ["fastfetch", "mostrar el perfil"],
      ["ls", "listar los archivos del portfolio"],
      ["cat <archivo>", "leer un archivo Markdown"],
      ["clear", "limpiar el historial de comandos"],
      ["reboot", "repetir la secuencia de arranque"],
      ["help", "mostrar esta guía"],
    ],
    keyboardGuide: "Tab — autocompletar · ↑/↓ — historial · Ctrl+L — limpiar",
    emptyHistory: "Historial limpio. Los archivos interesantes siguen aquí.",
    completion: "Posibles autocompletados",
    footerMotto: "Resultados serios. Cero seriedad innecesaria.",
    bootLines: [
      "[ ok ] calibrando el instinto de producto",
      "[ ok ] conectando código con problemas reales",
      "[ ok ] montando el trabajo seleccionado",
      "[ ok ] activando el caos controlado",
      "[ ok ] descartando la seriedad innecesaria",
      "[ ok ] iniciando la shell make-it-funny",
    ],
    aria: {
      displayControls: "Controles de visualización",
      language: "Idioma",
      terminalOutput: "Salida de la terminal",
      commandDock: "Panel de comandos de la terminal",
      suggestedCommands: "Comandos sugeridos",
      portfolioFiles: "Archivos del portfolio",
      systemProfile: "Perfil de sistema de Rubén Ruiz Pedreira",
      asciiMark: "Letra R en arte ASCII",
    },
    systemInfo: FASTFETCH_SYSTEM_INFO,
    errors: {
      commandNotFound: (command: string) => `make-it-funny: comando no encontrado: ${command}`,
      didYouMean: (command: string) => `¿Querías decir \`${command}\`?`,
      typeHelp: "Escribe `help` para ver los comandos disponibles.",
      catMissing: "cat: falta el nombre del archivo",
      tryListThenWork: "Ejecuta `ls` y después `cat work.md`.",
      catTooMany: "cat: este portfolio lee un archivo cada vez",
      tryWork: "Ejecuta `cat work.md`.",
      fileNotFound: (file: string) => `cat: ${file}: el archivo no existe`,
      runList: "Ejecuta `ls` para listar los archivos disponibles.",
      unexpectedArgument: (command: string, argument: string) => `${command}: argumento inesperado: ${argument}`,
      runWithoutArguments: (command: string) => `Ejecuta \`${command}\` sin argumentos.`,
    },
    commandExecuted: (command: string) => `${command} ejecutado`,
    rebooting: "Reiniciando RubenOS.",
  },
} as const;

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 1, raw: "fastfetch", result: { type: "fastfetch" } },
  { id: 2, raw: "cat work.md", result: { type: "cat", file: "work.md" } },
];

const FASTFETCH_COMMAND = "fastfetch";
const WORK_COMMAND = "cat work.md";

type BootFrame =
  | { at: number; kind: "boot-log" | "boot-log-fade"; lineCount: number }
  | { at: number; kind: "typing-fastfetch" | "typing-work"; command: string }
  | { at: number; kind: "fastfetch-output" | "work-output" | "ready" };

function commandFrames(
  kind: "typing-fastfetch" | "typing-work",
  command: string,
  startsAt: number,
  characterCadence: number,
): BootFrame[] {
  return Array.from(command, (_, index) => ({
    at: startsAt + index * characterCadence,
    kind,
    command: command.slice(0, index + 1),
  }));
}

const BOOT_FRAMES: BootFrame[] = [
  { at: 0, kind: "boot-log", lineCount: 1 },
  ...Array.from({ length: 5 }, (_, index) => ({
    at: (index + 1) * 300,
    kind: "boot-log" as const,
    lineCount: index + 2,
  })),
  { at: 2180, kind: "boot-log-fade", lineCount: 6 },
  ...commandFrames("typing-fastfetch", FASTFETCH_COMMAND, 2360, 75),
  { at: 3210, kind: "fastfetch-output" },
  ...commandFrames("typing-work", WORK_COMMAND, 3510, 70),
  { at: 4480, kind: "work-output" },
  { at: 4860, kind: "ready" },
];

const BOOT_TIMELINE = BOOT_FRAMES.slice(1).map((frame) => frame.at);
const BOOT_WORK_RENDERED_STAGE = BOOT_FRAMES.findIndex((frame) => frame.kind === "work-output");
const BOOT_READY_STAGE = BOOT_FRAMES.length - 1;

const markdownComponents: Components = {
  a: ({ children, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
};

function Prompt({ command }: { command?: string }) {
  return (
    <span className="prompt" aria-hidden="true">
      <span className="prompt-user">ruben</span>
      <span>@portfolio:~$</span>
      {command ? <span className="prompt-command"> {command}</span> : null}
    </span>
  );
}

function MarkdownDocument({ source }: { source: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {source}
      </ReactMarkdown>
    </div>
  );
}

function FastfetchOutput({ locale }: { locale: Locale }) {
  const messages = MESSAGES[locale];
  return (
    <div className="fastfetch" aria-label={messages.aria.systemProfile}>
      <div className="ascii-wrap">
        <span className="sr-only">{messages.aria.asciiMark}</span>
        <pre aria-hidden="true">{ASCII_R}</pre>
      </div>
      <dl className="system-info">
        {messages.systemInfo.map(([label, value]) => (
          <div className="system-row" key={label}>
            <dt>{label}:</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function HelpOutput({ locale }: { locale: Locale }) {
  const messages = MESSAGES[locale];
  return (
    <div className="utility-output">
      <strong>{messages.helpTitle}</strong>
      <dl className="help-list">
        {messages.helpCommands.map(([command, description]) => (
          <div key={command}><dt>{command}</dt><dd>— {description}</dd></div>
        ))}
      </dl>
      <p>{messages.keyboardGuide}</p>
      <p className="muted">{messages.helpMouse}</p>
    </div>
  );
}

function getErrorCopy(result: Extract<HistoryEntry["result"], { type: "error" }>, locale: Locale) {
  const errors = MESSAGES[locale].errors;

  switch (result.code) {
    case "command-not-found":
      return {
        message: errors.commandNotFound(result.command),
        suggestion: result.suggestion ? errors.didYouMean(result.suggestion) : errors.typeHelp,
      };
    case "cat-missing-file":
      return { message: errors.catMissing, suggestion: errors.tryListThenWork };
    case "cat-too-many-files":
      return { message: errors.catTooMany, suggestion: errors.tryWork };
    case "file-not-found":
      return {
        message: errors.fileNotFound(result.argument ?? ""),
        suggestion: result.suggestion ? errors.didYouMean(result.suggestion) : errors.runList,
      };
    case "unexpected-argument":
      return {
        message: errors.unexpectedArgument(result.command, result.argument ?? ""),
        suggestion: errors.runWithoutArguments(result.command),
      };
  }
}

function Output({ result, locale, onRun }: {
  result: HistoryEntry["result"];
  locale: Locale;
  onRun: (command: string) => void;
}) {
  if (result.type === "fastfetch") return <FastfetchOutput locale={locale} />;
  if (result.type === "cat") return <MarkdownDocument source={CONTENT[locale][result.file]} />;
  if (result.type === "help") return <HelpOutput locale={locale} />;

  if (result.type === "ls") {
    return (
      <div className="file-list" aria-label={MESSAGES[locale].aria.portfolioFiles}>
        {PORTFOLIO_FILES.map((file) => (
          <button type="button" key={file} onClick={() => onRun(`cat ${file}`)}>
            {file}
          </button>
        ))}
      </div>
    );
  }

  if (result.type === "error") {
    const error = getErrorCopy(result, locale);
    return (
      <div className="error-output" role="alert">
        <p>{error.message}</p>
        <p className="error-suggestion">{error.suggestion}</p>
      </div>
    );
  }

  return null;
}

function BootSequence({ locale, stage }: { locale: Locale; stage: number }) {
  const lines = MESSAGES[locale].bootLines;
  const frame = BOOT_FRAMES[stage] ?? BOOT_FRAMES[BOOT_FRAMES.length - 1];

  if (frame.kind === "boot-log" || frame.kind === "boot-log-fade") {
    return (
      <div
        className={frame.kind === "boot-log-fade" ? "boot-sequence is-fading" : "boot-sequence"}
        aria-live="polite"
      >
        {lines.slice(0, frame.lineCount).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }

  if (frame.kind === "typing-fastfetch") {
    return (
      <div className="boot-command" aria-live="polite">
        <Prompt command={frame.command} />
      </div>
    );
  }

  const showWorkCommand = frame.kind === "typing-work" || frame.kind === "work-output" || frame.kind === "ready";
  const showWorkOutput = frame.kind === "work-output" || frame.kind === "ready";
  const workCommand = frame.kind === "typing-work" ? frame.command : WORK_COMMAND;

  return (
    <div className="boot-history" aria-live="polite">
      <section className="history-entry boot-fastfetch">
        <div className="command-line"><Prompt command={FASTFETCH_COMMAND} /></div>
        <FastfetchOutput locale={locale} />
      </section>
      {showWorkCommand ? (
        <section className="history-entry with-divider boot-work">
          <div className="command-line"><Prompt command={workCommand} /></div>
          {showWorkOutput ? (
            <MarkdownDocument source={CONTENT[locale]["work.md"]} />
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

function ReaderView({ locale }: { locale: Locale }) {
  return (
    <div className="reader-view">
      {PORTFOLIO_FILES.map((file) => (
        <article key={file} id={`reader-${file.replace(".md", "")}`}>
          <span className="reader-file">{file}</span>
          <MarkdownDocument source={CONTENT[locale][file]} />
        </article>
      ))}
    </div>
  );
}

export function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [readerMode, setReaderMode] = useState(false);
  const [bootStage, setBootStage] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState("");
  const [completionHint, setCompletionHint] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const nextId = useRef(3);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainScrollRef = useRef<HTMLElement>(null);
  const scrollIntentRef = useRef<{ target: "top" | "bottom"; focus: boolean } | null>(null);
  const previousBootStageRef = useRef<number | null>(null);
  const messages = MESSAGES[locale];
  const bootComplete = bootStage === BOOT_READY_STAGE;

  const requestMainScroll = useCallback((target: "top" | "bottom", focus = true) => {
    scrollIntentRef.current = { target, focus };
  }, []);

  useLayoutEffect(() => {
    let intent = scrollIntentRef.current;
    if (bootStage === BOOT_WORK_RENDERED_STAGE) intent = { target: "bottom", focus: false };
    if (bootComplete && previousBootStageRef.current !== BOOT_READY_STAGE) {
      intent = { target: "bottom", focus: true };
    }
    previousBootStageRef.current = bootStage;
    if (!intent) return;
    scrollIntentRef.current = null;

    const frame = window.requestAnimationFrame(() => {
      const scrollContainer = mainScrollRef.current;
      if (!scrollContainer) return;

      scrollContainer.scrollTo({
        top: intent.target === "bottom" ? scrollContainer.scrollHeight : 0,
        behavior: "auto",
      });
      if (intent.focus) inputRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [bootComplete, bootStage, history, readerMode]);

  useEffect(() => {
    if (bootComplete) return;

    const timers = BOOT_TIMELINE.map((delay, index) => (
      window.setTimeout(() => setBootStage(index + 1), delay)
    ));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [bootComplete]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages.pageTitle;
  }, [locale, messages.pageTitle]);

  const dateStamp = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const runCommand = (raw: string) => {
    const normalized = raw.trim();
    if (!normalized) return;

    const result = parseCommand(normalized);
    setReaderMode(false);
    setCommandHistory((current) => [...current, normalized]);
    setHistoryIndex(-1);
    setInput("");
    setCompletionHint([]);

    if (result.type === "clear") {
      setHistory([]);
      setAnnouncement(messages.emptyHistory);
      requestMainScroll("top", true);
      return;
    }

    if (result.type === "reboot") {
      setHistory(INITIAL_HISTORY);
      nextId.current = 3;
      setBootStage(0);
      setAnnouncement(messages.rebooting);
      requestMainScroll("top", false);
      return;
    }

    if (result.type === "empty") return;

    setHistory((current) => [
      ...current,
      { id: nextId.current++, raw: normalized, result },
    ]);
    setAnnouncement(messages.commandExecuted(normalized));
    requestMainScroll("bottom", true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(input);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const completion = completeCommand(input);
      setInput(completion.value);
      setCompletionHint(completion.matches.length > 1 ? completion.matches : []);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex < 0
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setReaderMode(false);
      setHistory([]);
      setAnnouncement(messages.emptyHistory);
      requestMainScroll("top", true);
    }
  };

  const suggestions = [
    "ls",
    "cat about.md",
    "cat principles.md",
    "cat make-it-funny.md",
    "help",
  ];

  return (
    <div className="terminal-shell">
      <header className="topbar">
        <div className="system-status">
          <Circle size={14} weight="fill" aria-hidden="true" />
          <span className="system-name">RubenOS<span className="desktop-system-version"> 24</span></span>
          <div className="desktop-status">
            <span className="bar-separator" aria-hidden="true">|</span>
            <span>{bootComplete ? SYSTEM_STATUS.complete : SYSTEM_STATUS.booting}</span>
          </div>
        </div>

        <nav className="top-controls" aria-label={messages.aria.displayControls}>
          {bootComplete ? (
            <>
              <button
                className="primary-display-control"
                type="button"
                aria-pressed={readerMode}
                onClick={() => setReaderMode((current) => !current)}
              >
                <BookOpenText size={20} weight="regular" aria-hidden="true" />
                {readerMode ? messages.terminal : messages.reader}
              </button>
              <span className="bar-separator" aria-hidden="true">|</span>
            </>
          ) : null}
          <div className="language-switch" aria-label={messages.aria.language}>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              aria-pressed={locale === "en"}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={locale === "es" ? "active" : ""}
              aria-pressed={locale === "es"}
              onClick={() => setLocale("es")}
            >
              ES
            </button>
          </div>
        </nav>
      </header>

      <main
        ref={mainScrollRef}
        className={readerMode ? "main-content reader-active" : "main-content"}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (!readerMode && !target.closest("button, a, input")) inputRef.current?.focus();
        }}
      >
        <h1 className="sr-only">{messages.pageTitle}</h1>
        {!bootComplete ? (
          <BootSequence locale={locale} stage={bootStage} />
        ) : readerMode ? (
          <ReaderView locale={locale} />
        ) : (
          <>
            <div className="history" aria-label={messages.aria.terminalOutput}>
              {history.map((entry, index) => (
                <section
                  className={`history-entry ${index > 0 ? "with-divider" : ""}`}
                  key={entry.id}
                >
                  <div className="command-line"><Prompt command={entry.raw} /></div>
                  <Output result={entry.result} locale={locale} onRun={runCommand} />
                </section>
              ))}
            </div>
            {history.length === 0 ? <p className="empty-history">{messages.emptyHistory}</p> : null}
          </>
        )}

        {bootComplete ? (
          <div className="footer-signature">
            <span className="motto">
              <Smiley size={21} weight="regular" aria-hidden="true" />
              {messages.footerMotto}
            </span>
            <time dateTime={dateStamp}>{dateStamp}</time>
          </div>
        ) : null}
      </main>

      <section
        className={bootComplete ? "command-dock ready" : "command-dock pending"}
        aria-label={messages.aria.commandDock}
      >
        {bootComplete ? (
          <div className="command-dock-inner">
            <div className="dock-input-cluster">
              <div className="input-row">
                <Prompt />
                <input
                  id="terminal-command"
                  name="terminal-command"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    setCompletionHint([]);
                  }}
                  onKeyDown={handleKeyDown}
                  aria-label={messages.commandLabel}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
              {completionHint.length > 0 ? (
                <div className="completion-hint" role="status">
                  <span>{messages.completion}:</span> {completionHint.join(" · ")}
                </div>
              ) : null}
            </div>
          <nav className="suggestions" aria-label={messages.aria.suggestedCommands}>
            {suggestions.map((suggestion) => (
              <button type="button" key={suggestion} onClick={() => runCommand(suggestion)}>
                {suggestion}
              </button>
            ))}
          </nav>
          </div>
        ) : <span className="sr-only">{SYSTEM_STATUS.booting}</span>}
      </section>

      <div className="sr-only" aria-live="polite">{announcement}</div>
    </div>
  );
}
