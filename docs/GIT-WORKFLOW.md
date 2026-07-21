# Git workflow

How to save features safely without tagging every edit. Tags like `v1.3` are frozen milestones; day-to-day work uses branches and commits on `main`.

## Layers

| Layer | Purpose | When |
|-------|---------|------|
| **Commits** | Save points on a branch | A slice of work runs locally |
| **`main`** | Always-runnable baseline | Merge only after a smoke test |
| **Feature branch** | Isolated experiment | Anything that might break spin, audio, or minigames |
| **Tag + release** (`v1.3`, `v1.4`) | Named rollback point | Milestone you may want weeks later |

Docs and Cursor rules **do not** auto-commit or auto-push. You (or an explicit agent request) run git commands.

## Day-to-day flow

### 1. Start a feature branch

```powershell
git checkout main
git pull
git checkout -b feature/short-description
```

Use one branch per feature or fix (e.g. `feature/snappy-gauge-polish`, `fix/shuffle-audio-gap`).

### 2. Commit when a slice works

Commit at logical boundaries — not every file save:

- "Wire snappy gauge drain on spin release"
- "Add cage_stage win clip and refresh audio"

Avoid mixing unrelated changes in one commit.

### 3. Run tooling only when needed

| You changed… | Run… |
|--------------|------|
| Win/UI audio or `scripts/audio-paths.mjs` | `npm run refresh-audio` |
| `movieDatabase` in `app/main.js` | `npm run generate-metadata:ps` |
| App logic/CSS only | Smoke test via dev server — nothing else |

Do not hand-edit `app/generated/*`. Regenerate from scripts.

Keep drafts out of commits until wired: `audio/_staging/`, `graphics/_staging/`.

### 4. Smoke test before merging

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/serve-static.ps1
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Quick check: spin (press + release), any minigame you touched, audio if relevant.

### 5. Merge to main and push

```powershell
git checkout main
git merge feature/short-description
git push origin main
git branch -d feature/short-description
```

## When to tag and release

**Tag + GitHub release** when a set of changes is movie-night ready or you want a named restore point. Do **not** tag every feature.

| Version bump | Use for |
|--------------|---------|
| Patch (`v1.3.1`) | Bugfix, no behavior change |
| Minor (`v1.4`) | New feature(s), same overall workflow |
| Major restructure | Rare (like v1.3 app layout move) |

```powershell
git tag -a v1.4 -m "Pick A Flick V1.4"
git push origin main
git push origin v1.4
gh release create v1.4 --title "V1.4" --notes-file release-notes.md
```

Between releases, commits on `main` are enough.

## Rollback

**Inspect a old version locally:**

```powershell
git checkout v1.3
```

**Branch from a tag for a hotfix:**

```powershell
git checkout -b hotfix/from-v1.3 v1.3
```

**Undo a bad commit on `main` (already pushed):**

```powershell
git revert <commit-hash>
git push origin main
```

Prefer `revert` over `reset --hard` on shared history.

## Optional local enforcement

A git pre-commit hook can block commits directly on `main` (forces branch habit). Not checked into this repo by default — set up locally if you want it. See Cursor hook `.cursor/hooks/check-uncommitted-main.ps1` for end-of-agent-session reminders only.

## Never commit

- `.env` (API keys)
- `.cursor/debug-*.log`
- Draft staging assets until they are wired into live paths

## Related

- [`docs/FOCUS.md`](FOCUS.md) — current priorities and stable subsystems
- [`docs/AGENTS.md`](AGENTS.md) — architecture map for agents
- [`.cursor/rules/git-workflow.mdc`](../.cursor/rules/git-workflow.mdc) — agent git behavior
