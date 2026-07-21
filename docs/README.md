# Pick A Flick

Neon arcade movie wheel — spin to pick a film from your curated list, with category filters, ticket-style results, and synchronized win audio.

## Run locally

The app is static HTML/JS/CSS under `app/`. Open `app/index.html` in a browser, or use the local dev server (recommended for audio and fetch):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/serve-static.ps1
```

Then visit [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

## Dev setup

Install Node dependencies (used by metadata and audio tooling):

```powershell
npm install
```

### Movie metadata (OMDb)

Some scripts fetch movie details from [OMDb](https://www.omdbapi.com/). They default to the premium key and stickily fall back to the free key only on auth/quota/canceled-key errors.

Optional overrides (copy `.env.example` → `.env`):

```powershell
copy .env.example .env
```

- `OMDB_API_KEY` — primary (default: premium / Patreon tier)
- `OMDB_API_KEY_FREE` — fallback (default: free tier, 1,000/day)

See [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) and [patreon.com/omdb](https://www.patreon.com/omdb). Then generate metadata:

```powershell
npm run generate-metadata:ps
```

Or bootstrap the full metadata pipeline:

```powershell
npm run bootstrap-metadata
```

### Audio tooling

Sync win-clip manifests and normalize audio gain levels:

```powershell
npm run refresh-audio
```

Watch for audio file changes:

```powershell
npm run watch-audio
```

Windows shortcuts: `scripts/shortcuts/Refresh Audio.bat`, `scripts/shortcuts/Watch Audio.bat`.

## Project layout

| Path | Purpose |
|------|---------|
| `app/index.html`, `app/main.js`, `app/style.css` | App UI and logic |
| `app/generated/movie-metadata.js` | Generated movie data |
| `app/generated/audio-gain-map.js`, `app/generated/win-clips-manifest.js` | Generated audio config |
| `app/watched-movies.js` | Personal watched list |
| `scripts/` | Metadata, audio, and dev utilities |
| `audio/` | Win clips and UI sounds |
| `graphics/ui/` | Live arcade UI artwork |
| `graphics/tix-mix/` | Shuffle intro title-card themes |
| `graphics/_staging/` | Draft graphics (WIP) |
| `graphics/_archive/` | Retired artwork |
| `.env.example` | Template for local secrets (copy to `.env`) |

## Agent / AI workflow

- **`docs/USER-GUIDE.md`** — how to use the wheel (features and workflows)
- **`docs/CATEGORIES.md`** — wheel category blurbs and grouping logic
- **`docs/AGENTS.md`** — architecture map and `app/main.js` section banners
- **`docs/FOCUS.md`** — current priorities
- **`docs/VISION.md`** — aesthetic direction (placeholder)
- **`.cursor/rules/`** — file-specific conventions (audio, movies, minigames)

## Git workflow

- **`main`** — working baseline; commit and push when something stable is done
- **Feature branches** — use for experiments: `git checkout -b my-experiment`
- **Tags** — mark milestones: `git tag -a v0.1 -m "Description"`

Never commit `.env` — it is listed in `.gitignore`.
