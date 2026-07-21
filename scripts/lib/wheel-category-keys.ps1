# Wheel category keys with emoji (PowerShell 5.1-safe via ConvertFromUtf32)
function Get-WheelCategoryKeys {
    return [ordered]@{
        ALIEN_ALLEY              = 'ALIEN ALLEY ' + [char]::ConvertFromUtf32(0x1F47D)
        ANIMATION_STATION        = 'ANIMATION STATION ' + [char]::ConvertFromUtf32(0x1F47E)
        CAGE_STAGE               = 'CAGE STAGE ' + [char]::ConvertFromUtf32(0x1F437)
        CARREYS_CHARACTERS       = "CARREY'S CHARACTERS " + [char]::ConvertFromUtf32(0x1F3AD)
        KAUFMANS_KORNER          = "KAUFMAN'S KORNER " + [char]::ConvertFromUtf32(0x1F31E)
        MOVIES_TO_FALL_ASLEEP_TO = 'MOVIES TO FALL ASLEEP TO ' + [char]::ConvertFromUtf32(0x1F4A4)
        MUSIC_MOUNTAIN           = 'MUSIC MOUNTAIN ' + [char]::ConvertFromUtf32(0x26F0) + [char]::ConvertFromUtf32(0xFE0F)
        PEGGS_PLAYGROUND         = "PEGG'S PLAYGROUND " + [char]::ConvertFromUtf32(0x1F3A1)
        SEQUEL_STREET            = 'SEQUEL STREET ' + [char]::ConvertFromUtf32(0x1F697)
        WACKY_WAY                = 'WACKY WAY ' + [char]::ConvertFromUtf32(0x1F92A)
        ZEMECKIS_ZONE            = 'ZEMECKIS ZONE ' + [char]::ConvertFromUtf32(0x1F407)
        PHOENIX_FREEWAY          = 'PHOENIX FREEWAY ' + [char]::ConvertFromUtf32(0x1F0CF)
        FOREIGN_EMBASSY          = 'FOREIGN EMBASSY ' + [char]::ConvertFromUtf32(0x1F310)
        TUMBLEWEED_TURNPIKE      = 'TUMBLEWEED TURNPIKE ' + [char]::ConvertFromUtf32(0x1F3DC) + [char]::ConvertFromUtf32(0xFE0F)
        JB_JUNCTION              = 'JB JUNCTION ' + [char]::ConvertFromUtf32(0x1F3B8)
        NEON_AND_NINETIES        = 'NEON & NINETIES ' + [char]::ConvertFromUtf32(0x1F303)
    }
}
