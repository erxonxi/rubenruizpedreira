# Project Instructions

This repository contains the production terminal portfolio for Rubén Ruiz Pedreira. `design-qa.md` records the accepted visual and behavioral baseline.

## Validated experience

- Preserve the continuous graphite terminal surface, restrained orange palette, Geist Mono typography, ASCII R, discreet suggestions, and colored Markdown hierarchy.
- Preserve the deterministic 4.86-second boot, six localized boot messages, opacity-only handoff, automatic `fastfetch` and `cat work.md`, persistent command dock, Reader mode, EN/ES content, and mobile behavior.
- Keep Fastfetch and RubenOS system status in English. The shell identity is always `make-it-funny`.
- Treat changes to the approved interaction or copy as product decisions, not incidental cleanup.

## Development

- Use npm and the committed `package-lock.json`.
- Run `npm test`, `npm run typecheck`, and `npm run build` after application changes.
- For visual changes, compare against `design-qa.md` and repeat browser QA at desktop and 390 × 844 mobile sizes.

## Swarm

- Verify (workflow `CI`, job `verify`): `npm ci`, `npm test`, `npm run typecheck`, `npm run build`.
- Deploy: Vercel publishes automatically when a PR is merged to `main`. The canonical domain is `www.rubenruizpedreira.es`; the apex redirects to it.
- Smoke after deploy: `www` loads with 200, finishes the boot, and answers `help` in EN and ES.
- Public repo: no secrets or internal data in PRs.
