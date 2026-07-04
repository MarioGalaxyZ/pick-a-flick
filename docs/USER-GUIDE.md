# Pick A Flick — User Guide

Pick A Flick is a neon arcade movie wheel: spin to pick a film from your curated list, filter by category and runtime, save favorites to a keeper deck, and settle ties with coin flips or ticket shuffles.

## Getting started

### Opening the app

Recommended — local dev server (required for reliable audio):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/serve-static.ps1
```

Then open [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

You can also open `app/index.html` directly in a browser, but some audio may not load without a local server.

### Screen layout

**Arcade area** (main view)

- Spinning category wheel and spin button
- Result panel (poster, title, ratings, plot)
- Recent Spins (last 3 picks)
- Marquee ticker (status messages)
- Audio controls and KILLSWITCH
- KEEP button (appears after a spin)

**Filters panel**

- Category, runtime, decade, and watched filters
- Available Flicks count
- Dueling Flicks (coin flip and shuffle)
- Keeper tools, watched list, and curator panels

---

## Spin the wheel

**Press and release** the spin button to spin — do not just click once.

- **Mouse/touch:** press down on the button, then release to start the spin
- **Keyboard:** focus the spin button, press Space or Enter, then release

Press plays the button-down sound; release plays the release sound and starts the wheel. While held, the button **visually depresses** (the arcade background behind it scales slightly via the pressed state).

### What happens

1. A random **active category** is chosen (from your category filter)
2. A random **movie** is chosen from that category (respecting all filters)
3. The wheel spins with ticker clicks; a category victory clip may play near the end (if Victory Audio is on)
4. The **result panel** shows the poster, title, year, ratings, genre, and plot

### After the spin

- The pick appears in **Recent Spins** (top slot)
- **KEEP** becomes available to save that pick to the keeper deck
- **Mark watched** appears on the result card if the title is not already watched

### When spin is blocked

If no movies match your filters, the spin button is blocked and a message appears: *"No movies match your selected categories and filters."*

Check **Available Flicks** in the filters panel — if the count is 0, loosen your filters or enable more categories/decades.

---

## Filters

Filters affect the main spin **and** the movie pools for Dueling Flicks.

| Control | What it does |
|---------|----------------|
| **Category Filter** | Checkboxes for each genre wheel (e.g. CAGE STAGE, NEON & NINETIES). Select All / Deselect All at the top. For what each category means, see [Wheel categories](CATEGORIES.md). |
| **Runtime Filter** | Min and/or max runtime in minutes (from OMDb metadata). Clear resets both. |
| **Decade Filter** | Which release decades are eligible. Deselecting all decades blocks the spin. |
| **Include watched** | When unchecked, watched movies are excluded from spin and Dueling Flicks pools. |
| **Reset All Filters** | Restores categories, runtime, decades, and watched filter to defaults. |
| **Available Flicks** | Live count of movies that match every active filter. |

---

## Wheel art

**Undead wheel** — toggle alternate wheel disc artwork on or off.

---

## Audio controls

Four buttons below the wheel:

| Button | Default | What it does |
|--------|---------|----------------|
| **Intro Audio** | Off | Plays a category intro stinger when the spin starts |
| **Victory Audio** | On | Plays a category win clip shortly before the wheel stops |
| **Reveal Mode** | Classic | Cycles with each click: **Classic Reveal** (pause after landing), **Snappy** (instant reveal; tap for instant land, hold longer for a longer spin — smooth exponential ramp from ×1.3 to ×3.6, up to 10s), **Speed Run** (instant reveal, 1s spin, skips intro, win clip on button release) |
| **KILLSWITCH** | — | Stops all audio, cancels spin/keeper/shuffle state, and resets the result panel to ready |

---

## Marking movies watched

Watched movies can be hidden from the wheel via the **Include watched** filter. Marking watched does **not** remove a title from the catalog — it only tracks that you have seen it.

### Ways to mark watched

1. **Mark watched** — button on the result card after a spin
2. **Ticket Stubs → Mark as Watched** — marks all keeper picks at once (see Ticket Stubs)
3. **MARK AS WATCHED** — bulk import in the filters panel (one title per line, Ctrl+Enter)

### Watched Flicks panel

Open **WATCHED FLICKS** to see your watched list.

- **Return to rotation** — removes a title from the watched list so it can appear again (when Include watched is on)
- **Choose save file** — link a `watched-movies.js` file for direct save in supported browsers; otherwise changes download as a file to replace manually

Watched listings load from `app/watched-movies.js` when the app starts.

---

## Keeper deck (3 slots)

The keeper deck holds up to **3 movies** you want to hang onto before committing.

### Adding to keeper

- **KEEP** — after a spin, saves the top **Recent Spin** entry to the keeper deck
- **ADD TO KEEPER** — search the catalog by title and add manually (filters panel)

### Managing keeper picks

- Click the keeper **header** to expand or minimize the deck
- **Double-click** a keeper poster to **discard** — the movie returns to Recent Spins and frees a slot

### When the deck is full (3 movies)

- **Total runtime** appears in the keeper header
- **Get Ticket Stubs** becomes available

Keeper movies also appear as candidates for **Dueling Flicks** slots.

---

## Dueling Flicks

Use Dueling Flicks when you want to choose between two (or more) movies with a coin flip or a ticket shuffle minigame.

### Setup

- Fill **slot A** and **slot B** with two movies (required for flip or shuffle)
- Click **candidate chips** below the slots, or type in the search fields and pick from the dropdown
- Click a **filled slot** to clear it
- Optional **slots C and D** — override mystery tickets in shuffle mode (defaults: a Sequel Street pick vs a true random pick from the filtered pool)

Hint shown in the UI: *"Pick two movies to flip or shuffle — optional picks C and D replace the Sequel Street and true random mystery tickets."*

### Coin flip

1. With A and B filled, click **FLIP COIN**
2. Click the **coin** to start the flip animation
3. Click the coin again to **confirm the winner**
4. The winner is kept; the flow may add to keeper if a slot is needed

### Ticket shuffle

1. With A and B filled, click **SHUFFLE**
2. Watch the intro animation
3. When prompted, **pick a ticket**
4. Confirm your selection — the winner is kept

### Cancel

Press **Escape** to cancel an in-progress coin toss or shuffle.

All category, runtime, decade, and watched filters apply to candidate and mystery pools.

---

## Ticket Stubs

When you have at least one movie in the keeper deck:

1. Click **Get Ticket Stubs** (ticket icon near the keeper)
2. A print animation plays
3. Click **Mark as Watched** to mark all keeper picks as watched, clear the keeper deck, and close the panel

Press **Escape** to close the ticket stubs panel without marking watched.

---

## Curator tools

These panels help you maintain the movie list. They do **not** edit the wheel directly — adding movies requires updating `movieDatabase` in `app/main.js` and regenerating metadata (see `docs/README.md`).

### ADD A NEW FLICK

Prepare movies to add to the catalog.

- **Format:** `Title (Year)` optionally followed by Tab and a category name
- One movie per line; batch entry supported
- Example:
  ```
  Chicken Run (2000)	ANIMATION STATION 👾
  Her (2013)	PHOENIX FREEWAY 🃏
  ```
- **Ctrl+Enter** submits — copies a prompt to your clipboard for you or an AI assistant to add entries to `app/main.js` and run `npm run generate-metadata:ps`

### MARK AS WATCHED (bulk)

Paste movie listings one per line. Partial title matches are supported. **Ctrl+Enter** imports them into the watched list.

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| **Escape** | Cancel coin toss or shuffle; otherwise stop cabinet audio, close ticket stubs, minimize expanded keeper |
| **Space / Enter** | Press and release on the focused spin button to spin |
| **Shift+P** | Dev shortcut: fill keeper with random catalog picks (when not typing in a field) |

---

## Tips and limitations

- Listing format is `"Title (Year)"` — series entries use `"Franchise (Series)"`
- Posters, runtime, ratings, and plot come from `app/generated/movie-metadata.js` (generated from OMDb)
- If metadata is missing, the result card shows a category emoji fallback and a cabinet archive message
- Deselecting **all** categories or **all** decades blocks the spin, same as having zero available flicks

---

## Appendix: For AI assistants

| Question type | Where to look |
|---------------|---------------|
| How does a feature behave for the user? | This guide |
| Where is the code? | `docs/AGENTS.md` and `// --- SECTION ---` banners in `app/main.js` |
| How to edit movies, audio, or metadata? | `.cursor/rules/` and `README.md` |

| User feature | `app/main.js` section banner |
|--------------|-------------------------|
| Spin wheel | `SPIN WHEEL`, `SPIN SELECTION` |
| Filters | `FILTERS`, `CATEGORY FILTER AND SPIN STATE` |
| Keeper deck | `KEEPER DECK`, `KEEPER UI` |
| Dueling Flicks | `DUELING FLICKS UI`, `COIN TOSS FLIP AND LAUNCH`, `TICKET SHUFFLE LAUNCH` |
| Watched list | `WATCHED MOVIES`, `MARK WATCHED BULK IMPORT` |
| Add movies UI | `ADD MOVIES UI` |
| Ticket stubs | `TICKET STUBS` |
