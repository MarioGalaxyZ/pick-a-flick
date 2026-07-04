# Agent guide — Pick A Flick

Quick orientation for AI assistants working in this repo.

## App flow

1. **Spin wheel** — category filter + decade/runtime/watched filters → random category → random movie
2. **Result card** — poster, ratings, plot from `app/generated/movie-metadata.js`
3. **Side features** — Keeper deck (3 slots), Coin toss, Ticket shuffle, Ticket stubs, Add movies UI

## Script load order (`app/index.html`)

`app/generated/movie-metadata.js` → `app/watched-movies.js` → `app/generated/audio-paths.js` → `app/generated/win-clips-manifest.js` → `app/generated/audio-gain-map.js` → `app/generated/coin-flip-blip-map.js` → `app/generated/shuffle-golden-ticket-map.js` → `app/main.js`

## main.js navigation

Search for `// --- SECTION NAME ---` banners in `app/main.js`. The table below lists sections in file order; line hints are approximate.

| Section banner | Key symbols |
|----------------|-------------|
| `MOVIE DATABASE` | `movieDatabase` category arrays |
| `FILTERS` | Runtime, decade, eligibility, `getEligibleMovies` |
| `WATCHED MOVIES` | `initWatchedMovies`, `watchedMovieSet`, file handle save |
| `CATEGORY FILTER AND SPIN STATE` | `activeCategories`, `initiateSpin` prerequisites |
| `CORE AUDIO` | `audioCtx`, `spinButtonClipState`, `preloadSpinButtonClipAudio`, keeper clip playback |
| `MASTER AUDIO MIXING DECK` | `cabinetMixer`, `getNormalizedVolume` |
| `ARCADE AUDIO SETTINGS` | `spinIntroClips`, intro/victory toggles |
| `SPIN WHEEL` | `onSpinButtonPointerDown/Up`, `setSpinButtonPressed`, `initiateSpin`, wheel animation |
| `WINNING AUDIO DIRECTORY` | `playCategoryVictorySound`, `drawNextWinClip` |
| `GLOBAL STATE` | `keeperPicks`, `recentSelections`, clip/movie pools |
| `METADATA AND LISTING HELPERS` | `getMovieMetadata`, `parseMovieListing` |
| `RESULT DISPLAY` | Posters, ratings, `revealMovieResult` |
| `SPIN SELECTION` | `executeMovieTierSelection` |
| `KEEPER DECK` | Keeper slots, posters, runtime |
| `ADD MOVIES UI` | `buildAddMovieUI`, `buildAddMoviesPrompt` |
| `MARK WATCHED BULK IMPORT` | `buildWatchedBulkImportUI` |
| `TICKET SHUFFLE CONSTANTS` | `SHUFFLE_*` timing and layout |
| `TICKET SHUFFLE AUDIO` | `playShuffleIntroClip`, golden ticket sound |
| `COIN TOSS AND MINIGAME STATE` | Slot state, shared filter pool |
| `COIN TOSS FLIP AND LAUNCH` | `armCoinToss`, `launchCoinToss`, flip sequence |
| `TICKET SHUFFLE SEQUENCES` | `runShuffleCinematicIntro`, swap/spin steps |
| `TICKET SHUFFLE LAUNCH` | `armTicketShuffle`, `launchTicketShuffle` |
| `DUELING FLICKS UI` | `buildCoinTossUI` |
| `TICKET STUBS` | `openTicketStubsPanel`, print/shred animation |
| `KEEPER UI` | `buildKeeperUI`, ticket-stubs controls |
| `INIT` | Filter UI builders, startup calls |
| `KEYBOARD SHORTCUTS` | Escape cancel, Shift+P dev shortcut |

## Spin button (press / release)

Interactive spin uses a 2-stage button — not a single click:

1. **Press** (pointerdown / keydown on `#spin-button`): `playSpinButtonPress()` + `#spin-button-wrap.is-pressed` in `style.css`
2. **Release** (pointerup / keyup): `playSpinButtonRelease()` + `initiateSpin()`

Clip paths: `window.uiAudioPaths.spinButtonPress` / `spinButtonRelease` (source: `scripts/audio-paths.mjs` → `audio/ui/spin/`). Buffers live in `spinButtonClipState`; preloaded via `preloadSpinButtonClipAudio()` at init.

**Do not confuse with `playSpinButtonSounds()`** — used by `makeItAKeeper` to fire press then release (~40ms apart) without toggling `is-pressed` or starting a spin.

Event listeners are wired on `#spin-button` at init (pointer + keyboard), not via `onclick` on the button.

## Subsystem entry points

| Feature | Start here |
|---------|------------|
| Spin | `// --- SPIN WHEEL ---`: `onSpinButtonPointerDown/Up`, `setSpinButtonPressed`, `initiateSpin`; `executeMovieTierSelection` |
| Win audio | `playCategoryVictorySound`, `scripts/win-clip-categories.mjs` |
| UI audio | `scripts/audio-paths.mjs` → `npm run refresh-audio` |
| Keeper | `buildKeeperUI`, `keeperPicks`, `playKeeperSound` |
| Coin toss | `buildCoinTossUI`, `armCoinToss`, `launchCoinToss` |
| Ticket shuffle | `armTicketShuffle`, `launchTicketShuffle`, `SHUFFLE_*` constants |
| Watched list | `app/watched-movies.js`, `initWatchedMovies` |
| Add/remove movies | `buildAddMoviesPrompt`, `movieDatabase`; category intent → `docs/CATEGORIES.md` |

## Related docs

- `README.md` — run commands, npm scripts
- `docs/USER-GUIDE.md` — end-user feature reference (behavior and UI)
- `docs/CATEGORIES.md` — wheel category blurbs and grouping logic (curator/agent reference)
- `docs/FOCUS.md` — current priorities (update as work evolves)
- `docs/VISION.md` — aesthetic direction placeholder (fill in as vision solidifies)
- `docs/TIX-MIX-THEMES.md` — visual theme brainstorm for title cards
- `.cursor/rules/` — file-specific workflows (audio, movies, etc.)

## Graphics layout

| Path | Purpose |
|------|---------|
| `graphics/ui/` | Live arcade UI artwork (referenced by `app/style.css`, `app/main.js`) |
| `graphics/tix-mix/` | Shuffle intro title-card themes |
| `graphics/_staging/` | Draft graphics (WIP) |
| `graphics/_archive/` | Retired / superseded artwork |
