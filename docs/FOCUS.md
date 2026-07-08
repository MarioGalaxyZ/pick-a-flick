# Current focus

Update this when priorities shift so agents know what matters now.

## Active

- [ ] Bulk import of new movies — improve/add batch flow for adding titles to `movieDatabase` (filters panel **ADD A NEW FLICK**)

## Recently completed (July 2026)

- [x] Category movie rotation — per-category shuffled decks; no repeat until full eligible set shown; wheel, mystery picks, shuffle defaults, and manual placements all consume the pool; pools reset on filter/category changes

- [x] Easily shareable static site — complete / on hold for now
- [x] Mode Selector — display and function (parked; polish deferred; dial L-panel shipped)
- [x] Pinball Mode — display and function improvement (parked; ticker/category alignment deferred)
- [x] Pinball Mode spin dynamics — plunger gauge, physics spin, creep on ineligible slices, settle snap, unified pointer↔slice helpers + post-spin verification (parked; good enough for now)
- [x] Snappy mode gauge mechanics and display (foundation for Pinball plunger gauge)
- [x] Cursor rules (8), `docs/AGENTS.md`, always-on overview rule
- [x] `app/main.js` section banners (search `// --- SECTION ---` to navigate)
- [x] `.cursorignore` — `audio/_staging/`, `graphics/_staging/`, `graphics/_archive/`
- [x] `docs/VISION.md` skeleton and README workflow links
- [x] Spin button 2-stage press/release (audio + is-pressed visual)

## Backlog (when ready)

- [ ] Fill in `docs/VISION.md` — purpose, look/feel, audio tone, references, always/never
- [ ] Workflow hygiene — update `.cursor/rules/` or this file when repeated agent friction appears
- [ ] Tix Mix title-card themes for shuffle intro
- [ ] New win clips for cage_stage and other categories

## Stable — avoid unless asked

- Coin toss flip timing and blip sync
- Broad refactors of core wheel disc rotation math

## Notes

- Bulk import of new movies (active):
  - **JS:** `// --- ADD MOVIES UI ---` in `app/main.js` — `parseBatchMovieInput`, `buildAddMoviesPrompt`, `submitAddMovieClaim`, `buildAddMovieUI` (~3745–4540)
  - **Parallel pattern:** `// --- MARK WATCHED BULK IMPORT ---` (~4242+) — same textarea/highlight UX for watched list
  - **CSS:** `#add-a-flick*` in `app/style.css` (~4173+)
  - **Workflow:** UI copies a Cursor prompt → agent edits `movieDatabase` in `main.js` → `npm run generate-metadata:ps`
  - **Category intent:** `docs/CATEGORIES.md`
- Category movie rotation (completed):
  - **API:** `drawNextMovie`, `drawNextMovieLabel`, `drawNextMysteryFromCategories`, `markMovieServed`, `consumeListingAppearance`, `resetMovieSelectionPools` in `app/main.js` (~2484–2590)
  - **Spin:** all reveal modes call `drawNextMovie`; **Dueling Flicks:** mystery chip + shuffle C/D defaults use pool API; manual slot/keeper calls `consumeListingAppearance`
  - **Filters:** `buildFilteredCoinTossPool` uses `getEligibleMovies`; pool resets on category toggle + existing filter/watched resets
- Mode Selector (parked — display and function):
  - **DOM:** `#mode-selector`, `#mode-selector-dial`, `#mode-selector-display`, `.mode-led-*` in `app/index.html`
  - **CSS:** `#mode-selector`, `.mode-selector-panel`, `.mode-selector-knob`, `.mode-selector-display`, `.mode-led` in `app/style.css` (~lines 303–560)
  - **Assets:** Live: `graphics/ui/mode-selector-panel.png`, `mode-selector-dial.png`; drafts: `graphics/_staging/`; processors: `scripts/process-mode-selector-assets.ps1` (panel), `scripts/process-mode-selector-dial.ps1` (dial crop)
  - **JS:** `MODE_SELECTOR_LABELS`, `MODE_DIAL_ANGLES`, `MODE_SELECTOR_LCD`, `updateRevealModeUI`, `toggleRevealMode` in `// --- SPIN WHEEL ---` in `app/main.js` (~1490–1556); dial listeners at init (~9009)
  - **Behavior spec:** Mode Selector row in `docs/USER-GUIDE.md`
- Pinball Mode (parked — display/function deferred; spin dynamics good enough for now):
  - **DOM:** `#spin-power-gauge` in `app/index.html` (shared with Snappy)
  - **CSS:** `#arcade-container.pinball-mode`, `.pinball-reveal` in `app/style.css` (~lines 319–420, ~2147+)
  - **JS:** Pinball helpers in `// --- SPIN WHEEL ---` in `app/main.js`:
    - Constants: `PINBALL_HOLD_*`, `PINBALL_MAX_OMEGA_DEG_S`, `PINBALL_DECEL_DEG_S2`, `PINBALL_CREEP_*`, `WHEEL_TUNING_OFFSET`
    - Slice math: `getSliceCenterDegrees`, `getCategoryIndexAtPointer`, `getAbsoluteRotationForSliceCenter`, `findNextEligibleCategoryClockwise`, `isCategorySpinEligible`
    - Invariant at rest: `getCategoryIndexAtPointer(finalRotation) === plan.targetIndex`
    - Power / plan: `getPinballPlungerRatio`, `computePinballSpinPlan`
    - Gauge: `tickPinballPlungerGauge`, `startPowerGaugeLoop`, gauge drain on spin start
    - Spin: pinball branch in `triggerPhysicalSpin` (three-phase physics + creep + settle animation)
    - Toggle: fourth mode in `toggleRevealMode` — classic → snappy → speedRun → pinball → classic
- Snappy gauge (completed, reused DOM):
  - **JS:** `tickSnappyPowerGauge`, `getSnappyPowerGaugeRiseRatio`, gauge drain on spin start
- See `docs/USER-GUIDE.md` for how wheel features work (spin, keeper, dueling flicks, filters)
- See `docs/AGENTS.md` for architecture map; use section banners in `app/main.js` instead of line numbers
- Fill `docs/VISION.md` before major theme or feel work
- Run `npm run watch-audio` when adding clips in a session
- Use feature branches for experiments (`git checkout -b my-experiment`)
