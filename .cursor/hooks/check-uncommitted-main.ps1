# Cursor stop hook: remind if uncommitted changes exist on main.
# Fail open — always exit 0 unless JSON output is needed.

$ErrorActionPreference = 'SilentlyContinue'

# Consume hook stdin (stop event payload)
if ([Console]::In.Peek() -ge 0) {
    [void][Console]::In.ReadToEnd()
}

$branch = git rev-parse --abbrev-ref HEAD 2>$null
if ($LASTEXITCODE -ne 0 -or $branch -ne 'main') {
    exit 0
}

$status = git status --porcelain 2>$null
if (-not $status) {
    exit 0
}

$followup = @{
    followup_message = @(
        'Uncommitted changes on `main`. Consider: `git checkout -b feature/your-feature`, commit when stable, merge after smoke test. See `docs/GIT-WORKFLOW.md`.'
    )
}

$followup | ConvertTo-Json -Compress
exit 0
