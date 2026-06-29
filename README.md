# Pick A Flick

Neon arcade movie wheel — spin to pick a film from your curated list, with category filters, ticket-style results, and synchronized win audio.

## Run locally

The app is static HTML/JS/CSS. Open `index.html` in a browser, or use the local dev server (recommended for audio and fetch):

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

Some scripts fetch movie details from [OMDb](https://www.omdbapi.com/). Copy the example env file and add your free API key:

```powershell
copy .env.example .env
```

Edit `.env` and set `OMDB_API_KEY`. Then generate metadata:

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

Windows shortcuts: `Refresh Audio.bat`, `Watch Audio.bat`.

## Project layout

| Path | Purpose |
|------|---------|
| `index.html`, `main.js`, `style.css` | App UI and logic |
| `movie-metadata.js` | Generated movie data |
| `audio-gain-map.js`, `win-clips-manifest.js` | Generated audio config |
| `scripts/` | Metadata, audio, and dev utilities |
| `.env.example` | Template for local secrets (copy to `.env`) |

## Git workflow

- **`main`** — working baseline; commit and push when something stable is done
- **Feature branches** — use for experiments: `git checkout -b my-experiment`
- **Tags** — mark milestones: `git tag -a v0.1 -m "Description"`

Never commit `.env` — it is listed in `.gitignore`.
