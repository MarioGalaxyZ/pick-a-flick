# Shared OMDb API key defaults + sticky free-key fallback for PowerShell scripts.

$script:OmdbPremiumKeyDefault = '68a905c'
$script:OmdbFreeKeyDefault = '14e2f0ac'

function Test-OmdbKeyFailure([string]$Message) {
    if (-not $Message) { return $false }
    return $Message -match '(?i)401|Unauthorized|Request limit|limit reached|rate.?limit|Invalid API key|API key|quota/?auth|quota exhausted|canceled|cancelled'
}

function Resolve-OmdbKeys {
    $primary = if ($env:OMDB_API_KEY) { $env:OMDB_API_KEY.Trim() } else { $script:OmdbPremiumKeyDefault }
    $free = if ($env:OMDB_API_KEY_FREE) { $env:OMDB_API_KEY_FREE.Trim() } else { $script:OmdbFreeKeyDefault }
    if (-not $primary) { $primary = $script:OmdbPremiumKeyDefault }
    if (-not $free) { $free = $script:OmdbFreeKeyDefault }
    return @{ Primary = $primary; Free = $free }
}

function Get-OmdbKeySession {
    $keys = Resolve-OmdbKeys
    $session = [ordered]@{
        Primary   = $keys.Primary
        Free      = $keys.Free
        Key       = $keys.Primary
        UsingFree = ($keys.Primary -eq $keys.Free)
        Switched  = $false
    }
    return $session
}

function Get-OmdbKeySessionDescribe($Session) {
    if ($Session.UsingFree) { return 'free fallback' }
    if ($Session.Primary -eq $script:OmdbPremiumKeyDefault) { return 'premium default' }
    return 'OMDB_API_KEY'
}

function Switch-OmdbKeyToFree {
    param(
        $Session,
        [string]$Reason = 'auth/quota'
    )
    if ($Session.UsingFree) { return $false }
    if (-not $Session.Free -or $Session.Free -eq $Session.Key) { return $false }
    $Session.Key = $Session.Free
    $Session.UsingFree = $true
    $Session.Switched = $true
    Write-Host "OMDb: primary key failed ($Reason). Switching to free fallback for the rest of this run."
    return $true
}

function Switch-OmdbKeyMaybeFallback {
    param(
        $Session,
        $ErrorOrData
    )
    $message = $null
    if ($ErrorOrData -is [string]) {
        $message = $ErrorOrData
    } elseif ($null -ne $ErrorOrData) {
        if ($ErrorOrData.PSObject.Properties.Name -contains 'Error') {
            $message = [string]$ErrorOrData.Error
        } elseif ($ErrorOrData.PSObject.Properties.Name -contains 'Message') {
            $message = [string]$ErrorOrData.Message
        } else {
            $message = [string]$ErrorOrData
        }
    }
    if (-not (Test-OmdbKeyFailure $message)) { return $false }
    return (Switch-OmdbKeyToFree -Session $Session -Reason $message)
}
