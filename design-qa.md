# Design QA — definitive browser pass

Date: 2026-07-10  
Implementation: `http://localhost:4173/`  
Source visual truth: `/home/ruben/.codex/generated_images/019f4862-87d4-7d32-bacc-ccbc691ceab4/exec-e1761165-4e63-4621-93ef-20fb0525c930.png`

## Captured evidence

- Desktop final, 1440 × 1024: `/tmp/terminal-qa-v6-desktop-final.png`
- Mobile final, 390 × 844 with touch emulation: `/tmp/terminal-qa-v6-mobile-final.png`
- Normal hard-reload timing and mutation log: `/tmp/terminal-qa-v6-desktop-timing.json`
- `reboot` replay timing log: `/tmp/terminal-qa-v6-reboot-timing.json`
- Forced reduced-motion timing log: `/tmp/terminal-qa-v6-reduced-motion.json`
- Reader/Terminal, Tab, history, commands, scroll, and overflow: `/tmp/terminal-qa-v6-interactions.json`
- EN/ES error and Fastfetch invariants: `/tmp/terminal-qa-v6-locales.json`
- ES boot-state topbar capture: `/tmp/terminal-qa-v6-es-boot.json`
- Reference and implementation in one normalized comparison: `/tmp/terminal-qa-v6-comparison.png`
- Lighthouse reports: `/tmp/terminal-qa-v6-lighthouse/report.html` and `/tmp/terminal-qa-v6-lighthouse/report.json`

State: fresh isolated Chrome context; hard reload with cache bypass; boot and reboot; EN and ES; Terminal and Reader modes; reduced motion; desktop and mobile.

## Findings

No actionable P0, P1, or P2 findings remain.

## Blocking checks

1. **Boot choreography — passed.** From first rendered boot line, the six exact EN messages appeared at 0.0, 329.8, 629.7, 929.8, 1229.7, and 1529.8 ms. The completed log held 683.5 ms, faded for about 167 ms under the configured 180 ms opacity transition, was removed, and a clean prompt typed `fastfetch` per character. No Skip UI or overlapping boot/command state appeared.
2. **Sequence and reboot — passed.** Hard reload reached Fastfetch output at 3233.5 ms, completed per-character `cat work.md` at 4231.0 ms, rendered Markdown at 4514.4 ms, and focused the final prompt at 4897.2 ms. `reboot` reproduced the same ordering and focused at 4892.9 ms.
3. **Reduced motion — passed.** With `prefers-reduced-motion: reduce` forced, the discrete boot still ran, the boot log retained a 0.18 s opacity fade, focus returned at 4891.1 ms, and the final moving-element scan was empty. The active reduced-motion rule collapses all other animation/transition durations while preserving the boot fade.
4. **Topbar copy — passed.** Desktop showed exactly `booting` during startup and `boot complete` when ready in both EN and ES. The exact standalone strings `iniciando` and `arranque completo` never appeared; Spanish correctly uses `Reiniciando RubenOS.` only for reboot feedback.
5. **Visibility, scroll, and persistent chrome — passed.** Desktop boundaries were topbar bottom/main top 66 px and main bottom/dock top 962 px. Mobile boundaries were 57 px and 737 px. After long output, the actual `main` container reached its true bottom (`scrollTop = max`: desktop 113/113; mobile 3405/3405). No topbar/dock overlap occurred.
6. **Fastfetch invariants — passed.** EN and ES render the same English system rows, exactly one `Shell: make-it-funny`, zero `Terminal:` rows, and no duplicated duration in the topbar.
7. **Unknown command and localization — passed.** Errors use `make-it-funny:` in both locales: `command not found` in EN and `comando no encontrado` in ES. Spanish controls, boot log, Markdown, feedback, and accessibility labels localize naturally while branded/system vocabulary remains intentional.
8. **Modes and commands — passed.** Reader/Terminal mode toggles, locale switching, Tab completion (`cat pr` → `cat principles.md`), ArrowUp history, `help`, `ls`, `cat about.md`, `cat principles.md`, `cat make-it-funny.md`, and `reboot` all worked.
9. **Mobile usability — passed.** At 390 × 844, document horizontal overflow was 0 px. Primary controls and command suggestions measured 44 px high; the focused command row also measured 44 px and remained fully between the main content and suggestions.
10. **Console, favicon, and accessibility — passed.** Console contained only expected Vite/React development messages, with no errors or warnings. `favicon.svg` loaded successfully. Lighthouse snapshot scored Accessibility 100 and Best Practices 100; keyboard focus and live error semantics were present.
11. **Visual fidelity — passed.** The combined comparison confirms the same professional/playful terminal hierarchy, Geist Mono treatment, orange-on-near-black palette, dividers, ASCII profile, Markdown rhythm, and persistent command dock. Differences from the approved reference—removing Skip Intro, the topbar duration duplicate, and the Fastfetch `Terminal` row while setting `Shell` to `make-it-funny`—are required product corrections, not fidelity defects.

## Required fidelity surfaces

- **Fonts and typography:** Geist Mono weights, hierarchy, line height, wrapping, and command emphasis remain legible on both viewports.
- **Spacing and layout rhythm:** stable topbar/main/dock partitioning, aligned terminal content, readable vertical rhythm, and no overlap or horizontal page overflow.
- **Colors and tokens:** near-black surfaces, warm off-white text, orange accent/status color, and divider contrast remain consistent with the reference.
- **Image and asset fidelity:** no target raster imagery is missing; the terminal uses the intended text-rendered ASCII profile and Phosphor interface icons.
- **Copy and content:** required topbar, Fastfetch, command, English, and Spanish copy all matched the acceptance contract.

## Comparison history

This definitive pass found no P0/P1/P2 mismatch, so no implementation fix or repeat visual iteration was required. Application source was not modified during QA. A separate focused crop was unnecessary because the native 1440 × 1024 capture and combined comparison keep the topbar, Fastfetch rows, Markdown, and dock readable; exact copy, timing, bounds, focus, and scroll behavior were additionally measured from the live DOM.

final result: passed
