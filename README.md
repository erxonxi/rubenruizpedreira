# Rubén Ruiz Pedreira — Terminal Portfolio

An interactive, bilingual terminal portfolio built around RubenOS and the `make-it-funny` shell. It presents Rubén's product-engineering profile through Fastfetch, Markdown files, Reader mode, and a keyboard-friendly command interface.

## Stack

- React 19 and TypeScript
- Vite 6
- Vitest and Testing Library
- React Markdown with GitHub Flavored Markdown
- Geist Mono and Phosphor Icons

## Development

Requires Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

## Verification

```bash
npm test
npm run typecheck
npm run build
```

The production build is written to `dist/`.

## Content and commands

Portfolio copy lives in `src/content/en/` and `src/content/es/`. Terminal parsing is isolated in `src/lib/terminal.ts`, while the application flow and boot choreography live in `src/App.tsx`.

Available commands: `fastfetch`, `ls`, `cat <file>`, `help`, `clear`, and `reboot`.
