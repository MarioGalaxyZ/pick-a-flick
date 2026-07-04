# Current focus

Update this when priorities shift so agents know what matters now.

## Active

- [ ] Snappy mode gauge mechanics and display

## Recently completed (July 2026)

- [x] Cursor rules (8), `docs/AGENTS.md`, always-on overview rule
- [x] `app/main.js` section banners (search `// --- SECTION ---` to navigate)
- [x] `.cursorignore` — `audio/_staging/`, `graphics/_staging/`, `graphics/_archive/`
- [x] `docs/VISION.md` skeleton and README workflow links
- [x] Spin button 2-stage press/release (audio + is-pressed visual)

## Backlog (when ready)

- [ ] Reveal Mode spin timing polish (Classic / Snappy / Speed Run) — beyond gauge work
- [ ] Fill in `docs/VISION.md` — purpose, look/feel, audio tone, references, always/never
- [ ] Workflow hygiene — update `.cursor/rules/` or this file when repeated agent friction appears
- [ ] Tix Mix title-card themes for shuffle intro
- [ ] New win clips for cage_stage and other categories

## Stable — avoid unless asked

- Coin toss flip timing and blip sync
- Broad refactors of core wheel disc rotation math (snappy gauge tweaks are in Active focus)

## Notes

- Snappy gauge work:
  - **DOM:** `#spin-power-gauge` in `app/index.html`
  - **CSS:** `#spin-power-gauge`, `.spin-power-segment*`, `#arcade-container.snappy-mode` in `app/style.css` (~lines 319–420)
  - **JS:** snappy gauge helpers in `// --- SPIN WHEEL ---` in `app/main.js`:
    - Constants: `SNAPPY_POWER_GAUGE_SEGMENT_COUNT`, `SNAPPY_GAUGE_CYCLE_MS`, `SNAPPY_GAUGE_RISE_SMOOTHING`, `SNAPPY_GAUGE_DRAIN_*`
    - Core functions: `initSnappyPowerGaugeSegments`, `setSnappyPowerGaugeFill`, `tickSnappyPowerGauge`, `startSnappyPowerGaugeDrain`, `captureSpinButtonHoldMs`
    - Ratio mapping: `getSnappyPowerGaugeRiseRatio`, `getSnappyGaugePingPongRatio`, `getSnappySpinDurationFromGaugeRatio`
    - Release wiring: gauge drain on spin start in `initiateSpin` (~line 1919)
  - **Behavior spec:** Reveal Mode row in `docs/USER-GUIDE.md` (Snappy: hold longer → longer spin, ×1.3–×3.6 ramp)
- See `docs/USER-GUIDE.md` for how wheel features work (spin, keeper, dueling flicks, filters)
- See `docs/AGENTS.md` for architecture map; use section banners in `app/main.js` instead of line numbers
- Fill `docs/VISION.md` before major theme or feel work
- Run `npm run watch-audio` when adding clips in a session
- Use feature branches for experiments (`git checkout -b my-experiment`)
