# Pick A Flick

Neon arcade movie wheel — spin to pick a film from your curated list.

**Full docs:** [docs/README.md](docs/README.md)

## Quick start

```powershell
npm install
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/serve-static.ps1
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/) (serves `app/index.html`).

Audio shortcuts: `scripts/shortcuts/Refresh Audio.bat`, `scripts/shortcuts/Watch Audio.bat`

## Share the wheel

**Live site:** [https://mariogalaxyz.github.io/pick-a-flick/](https://mariogalaxyz.github.io/pick-a-flick/)

Send that link to friends — no install required. They spin your curated movie list in their browser. Keeper deck and recent spins are per-browser only; watched-list edits on the site do not change your repo.

**First-time Pages setup (maintainer):** Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**. Pushes to `main` deploy automatically via [`.github/workflows/pages.yml`](.github/workflows/pages.yml).
