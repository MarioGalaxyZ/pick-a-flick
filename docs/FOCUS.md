# Current focus

Update this when priorities shift so agents know what matters now.

## Active

- [ ] Implementation of an easily shareable static site

## Recently completed (July 2026)

- [x] Sensitive Mode spin dynamics — plunger gauge, physics spin, creep on ineligible slices, settle snap, unified pointer↔slice helpers + post-spin verification (parked; good enough for now)
- [x] Snappy mode gauge mechanics and display (foundation for Sensitive plunger gauge)
- [x] Cursor rules (8), `docs/AGENTS.md`, always-on overview rule
- [x] `app/main.js` section banners (search `// --- SECTION ---` to navigate)
- [x] `.cursorignore` — `audio/_staging/`, `graphics/_staging/`, `graphics/_archive/`
- [x] `docs/VISION.md` skeleton and README workflow links
- [x] Spin button 2-stage press/release (audio + is-pressed visual)

## Backlog (when ready)

- [ ] Sensitive Mode — ticker/category alignment (pointer landing = source of truth; math + visual + selected category must match)
- [ ] Fill in `docs/VISION.md` — purpose, look/feel, audio tone, references, always/never
- [ ] Workflow hygiene — update `.cursor/rules/` or this file when repeated agent friction appears
- [ ] Tix Mix title-card themes for shuffle intro
- [ ] New win clips for cage_stage and other categories

## Stable — avoid unless asked

- Coin toss flip timing and blip sync
- Broad refactors of core wheel disc rotation math (Sensitive settle + pointer↔slice unification are OK while Active)

## Notes

- Sensitive Mode (spin dynamics complete for now; alignment deferred — see Backlog):
  - **DOM:** `#spin-power-gauge` in `app/index.html` (shared with Snappy)
  - **CSS:** `#arcade-container.sensitive-mode`, `.sensitive-reveal` in `app/style.css` (~lines 319–420, ~2147+)
  - **JS:** Sensitive helpers in `// --- SPIN WHEEL ---` in `app/main.js`:
    - Constants: `SENSITIVE_HOLD_*`, `SENSITIVE_MAX_OMEGA_DEG_S`, `SENSITIVE_DECEL_DEG_S2`, `SENSITIVE_CREEP_*`, `WHEEL_TUNING_OFFSET`
    - Slice math: `getSliceCenterDegrees`, `getCategoryIndexAtPointer`, `getAbsoluteRotationForSliceCenter`, `findNextEligibleCategoryClockwise`, `isCategorySpinEligible`
    - Invariant at rest: `getCategoryIndexAtPointer(finalRotation) === plan.targetIndex`
    - Power / plan: `getSensitivePlungerRatio`, `computeSensitiveSpinPlan`
    - Gauge: `tickSensitivePlungerGauge`, `startPowerGaugeLoop`, `startSensitivePowerGaugeDrain`
    - Spin: sensitive branch in `triggerPhysicalSpin` (three-phase physics + creep + settle animation)
    - Toggle: fourth mode in `toggleRevealMode` — classic → snappy → speedRun → sensitive → classic
  - **Behavior spec:** Reveal Mode row in `docs/USER-GUIDE.md`
- Snappy gauge (completed, reused DOM):
  - **JS:** `tickSnappyPowerGauge`, `getSnappyPowerGaugeRiseRatio`, gauge drain on spin start
- See `docs/USER-GUIDE.md` for how wheel features work (spin, keeper, dueling flicks, filters)
- See `docs/AGENTS.md` for architecture map; use section banners in `app/main.js` instead of line numbers
- Fill `docs/VISION.md` before major theme or feel work
- Run `npm run watch-audio` when adding clips in a session
- Use feature branches for experiments (`git checkout -b my-experiment`)
