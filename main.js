// Fully calibrated movie lists + Prospector Pete logic integration

    const movieDatabase = {

        "ALIEN ALLEY 👽": [
            "Alien (Series)", 
            "Aliens (1986)", 
            "District 9 (2009)", 
            "Evolution (2001)", 
            "Meet Dave (2008)", 
            "Men in Black (Series)", 
            "The Hitchhiker's Guide to the Galaxy (2005)",
            "They Live (1988)", 
            "Project Hail Mary (2026)",
            "Mars Attacks! (1996)"
        ],
        
        "ANIMATION STATION 👾": [
            "Anastasia (1997)", 
            "Atlantis: The Lost Empire (2001)", 
            "Osmosis Jones (2001)", 
            "Over the Hedge (2006)", 
            "Rango (2009)", 
            "Shrek (2001)", 
            "The Croods (2013)", 
            "The Curse of the Were-Rabbit (2005)", 
            "The Last Unicorn (1982)", 
            "The Rescuers (1977)", 
            "The Secret of NIMH (1982)", 
            "The Spongebob Squarepants Movie (2004)",
            "The Land Before Time (1988)",
            "A Scanner Darkly (2006)",
            "Balto (1995)",
            "The Fox and The Hound (1981)",
            "Chicken Run (2000)",
            "Spirit: Stallion of the Cimarron (2002)",
            "Shaun the Sheep Movie (2015)",
            "Shaun the Sheep: The Farmer's Llamas (2015)",
            "A Shaun the Sheep Movie: Farmageddon (2019)",
            "Marvin the Martian in the Third Dimension (1996)",
            "Sherlock Gnomes (2018)",
            "Chicken Run: Dawn of the Nugget (2023)"
        ],
        
        "CAGE STAGE 🐷": [ 
            "Bad Lieutenant: Port of Call -- New Orleans (2009)", 
            "Color Out of Space (2019)", 
            "Dream Scenario (2023)", 
            "Face/Off (1997)", 
            "Ghost Rider (2007)", 
            "Leaving Las Vegas (1995)", 
            "Lord of War (2005)", 
            "Matchstick Men (2003)", 
            "Moonstruck (1987)", 
            "National Treasure (2004)", 
            "Next (2007)", 
            "Outcast (2014)",  
            "Pig (2021)", 
            "Renfield (2023)", 
            "Rumble Fish (1983)", 
            "The Family Man (2000)", 
            "The Rock (1996)", 
            "The Weather Man (2005)", 
            "Willy's Wonderland (2021)"
        ],
        
        "CARREY'S CHARACTERS 🎭": [
            "Dumb and Dumber To (2014)", 
            "Earth Girls Are Easy (1988)", 
            "Fun with Dick and Jane (2005)", 
            "Liar Liar (1997)", 
            "Mr. Popper's Penguins (2011)", 
            "The Majestic (2001)",
            "The Number 23 (2007)",
            "Dark Crimes (2018)",
            "Jim & Andy: The Great Beyond (2017)"
        ],
        
        "KAUFMAN'S KORNER 🌞": [
            "Confessions of a Dangerous Mind (2002)", 
            "Eternal Sunshine of the Spotless Mind (2004)", 
            "Human Nature (2001)", 
            "Orion And The Dark (2024)", 
    
        ],
        
        "MOVIES TO FALL ASLEEP TO 💤": [
            "28 Years Later (2025)",
            "After Hours (1985)",
            "Brazil (1985)",
            "Evil Dead II (1987)",
            "Heretic (2024)",
            "Jacob's Ladder (1990)",
            "Mandy (2018)",
            "Natural Born Killers (1994)",
            "Possessor (2020)",
            "Predator (1987)",
            "The Sixth Sense (1999)",
            "The Sweet East (2023)",
            "Green Room (2015)",
            "Mad Max ALL MOVIES (1979)"
        ],
        
        "MUSIC MOUNTAIN ⛰️": [
            "20,000 Days on Earth (2014)", 
            "24 Hour Party People (2002)", 
            "A Complete Unknown (2024)", 
            "Amadeus (1984)", 
            "Bohemian Rhapsody (2018)", 
            "CBGB (2013)", 
            "Head (1968)", 
            "I'm Not There (2007)", 
            "Inside Llewyn Davis (2013)", 
            "Last Days (2005)", 
            "Nowhere Boy (2009)", 
            "O Brother Where Art Thou (2000)", 
            "Pink Floyd: The Wall (1982)", 
            "Ray (2004)", 
            "Rocketman (2019)", 
            "The Blues Brothers (1980)", 
            "The Doors (1991)", 
            "Walk the Line EXTENDED (2005)"
        ],
        
        "PEGG'S PLAYGROUND 🎡": [
            "A Fantastic Fear of Everything (2012)", 
            "Big Nothing (2006)", 
            "Burke & Hare (2010)", 
            "Guest House Paradiso (1999)", 
            "Hector and the Search for Happiness (2014)", 
            "Hot Fuzz (2007)", 
            "Shaun of the Dead (2004)", 
            "Slaughterhouse Rulez (2018)", 
            "The Adventures of Tintin (2011)", 
            "The Boxtrolls (2014)"
        ],
        
        "SEQUEL STREET 🚗": [
            "Back to the Future Part 2 (1989)", 
            "Back to the Future Part 3 (1990)", 
            "Bill & Ted Face the Music (2020)",
            "Ip Man: The Final Fight (2013)", 
            "The Grandmaster (2013)", 
            "The Legend is Born: Ip Man (2010)",
            "Kung Fu Panda 2 (2011)",
            "Kung Fu Panda 3 (2016)",
            "Kung Fu Panda 4 (2024)",
            "Heavier Trip (2024)",
            "Crank: High Voltage (2009)",
            "28 Years Later: The Bone Temple (2026)"
        ],
        
        "WACKY WAY 🤪": [
            "Batteries Not Included (1987)", 
            "Big Trouble in Little China (1986)", 
            "Braindead / Dead Alive (1992)", 
            "Death Race 2000 (1975)", 
            "Death to Smoochy (2002)", 
            "Drop Dead Fred (1991)", 
            "Flubber (1997)", 
            "Galaxy Quest (1999)", 
            "George of the Jungle (1997)", 
            "Ghost World (2001)",
            "Good Luck Have Fun Don't Die (2025)", 
            "Greener Grass (2019)",
            "Howard the Duck (1986)", 
            "Idle Hands (1999)", 
            "Innerspace (1987)", 
            "Jumanji (1995)", 
            "Kajillionaire (2020)",
            "Kung Pow: Enter the Fist (2002)", 
            "Labyrinth (1986)", 
            "Little Shop of Horrors (1986)", 
            "Living in Oblivion (1995)", 
            "Looney Tunes: Back in Action (2003)", 
            "Monkeybone (2001)", 
            "Multiplicity (1996)", 
            "Mystery Men (1999)", 
            "Naked Lunch (1991)", 
            "Phantom of the Paradise (1974)", 
            "Popeye (1980)", 
            "Real Life (1979)", 
            "Repo Man (1984)", 
            "Scooby-Doo (2002)", 
            "Screwed (2000)", 
            "Small Soldiers (1998)", 
            "Swiss Army Man (2016)", 
            "The 'Burbs (1989)", 
            "The Adventures of Rocky & Bullwinkle (2000)", 
            "The Cat in the Hat (2003)", 
            "The Dark Crystal (1982)", 
            "The Fall (2006)", 
            "The Flintstones (1994)", 
            "The Frighteners (1996)", 
            "The Game (1997)",
            "The Gods Must Be Crazy (1980)", 
            "The Imaginarium of Doctor Parnassus (2009)", 
            "The Monster Squad (1987)", 
            "The Muppet Movie (1979)", 
            "The Rocketeer (1991)", 
            "Time Bandits (1981)", 
            "Tropic Thunder (2008)",
            "Toys (1992)", 
            "UHF (1989)", 
            "Used Cars (1980)",
            "Warm Bodies (2013)",
            "Speed Racer (2008)",
            "Zombeavers (2014)",
            "Velocipastor (2018)",
            "Mega Time Squad (2019)",
            "Attack of the Killer Tomatoes (1978)",
            "The Man with Two Brains (1983)",
            "The Borrowers (1998)"
        ],
        
        "ZEMECKIS ZONE 🐇": [
            "Beowulf (2007)", 
            "Used Cars (1980)", 
            "Flight (2012)", 
            "Romancing the Stone (1984)",
            "Cast Away (2000)"
        ],
        
        "PHOENIX FREEWAY 🃏": [
            "Clay Pigeons (1998)",
            "Eddington (2025)",
            "I'm Still Here (2010)",
            "Inherent Vice (2014)",
            "The Master (2012)",
            "The Sisters Brothers (2018)",
            "The Village (2004)",
            "To Die For (1995)",
            "U Turn (1997)",
            "We Own the Night (2007)",
            "You Were Never Really Here (2017)",
            "Her (2013)",
            "The Yards (2000)"
        ],

        "FOREIGN EMBASSY 🌐": [
            "Parasite (2019)",
            "Shaolin Soccer (2001)", "A Town Called Panic (2009)", "Heavy Trip (2018)",
            "Peppermint Candy (1999)", "City of God (2002)", "No Other Choice (2025)",
            "Train to Busan (2016)", "Another Round (2020)", "Save the Green Planet! (2003)",
            "Alienoid (2022)", "Crouching Tiger Hidden Dragon (2000)", "La Haine (1995)",
            "Delicatessen (1991)",
            "Kung Fu Yoga (2017)"
        ],
        
        "TUMBLEWEED TURNPIKE 🏜️": [
            "Unforgiven (1992)", "True Grit (2010)",
            "3:10 to Yuma (2007)", "Slow West (2015)", "Man of the West (1958)",
            "The Assassination of Jesse James by the Coward Robert Ford (2007)",
            "Hell or High Water (2016)",
            "The Quick and the Dead (1995)",
            "The Revenant (2015)",
            "The Ballad of Buster Scruggs (2018)"
        ],
        
        "JB JUNCTION 🎸": [
            "Tenacious D in The Pick of Destiny (2006)", "School of Rock (2003)", "High Fidelity (2000)", "Kung Fu Panda (2008)",
            "Anaconda (2025)", "Dear Santa (2024)", "Free LSD (2023)", "Be Kind Rewind (2008)",
            "Bernie (2011)", "Nacho Libre (2006)", "Orange County (2002)", "Saving Silverman (2001)",
            "The Polka King (2017)", "The School of Rock (2003)", "Tropic Thunder (2008)",
            "Walk Hard: The Dewey Cox Story (2007)", "Year One (2009)"
        ],
        
        "NEON & NINETIES 🌃": [
            "Blade Runner (1982)", "Drive (2011)", "Akira (1988)",
            "Blade Runner 2049 (2017)", "Tron: Ares (2025)", "Empire Records (1995)",
            "Bean (1997)", "Office Space (1999)", "Tommy Boy (1995)", "Wayne's World (1992)",
            "Clerks (1994)", "The Big Lebowski (1998)", "Groundhog Day (1993)",
            "Pump Up the Volume (1990)", "The Neon Demon (2016)", "Mute (2018)",
            "Ex Machina (2015)", "Dredd (2012)", "Jackie Brown (1997)",
            "Reservoir Dogs (1992)", "Dark City (1998)", "Kate (2021)",
            "Tron (1982)", "Tron Legacy (2010)", "True Romance (1993)",
            "Strange Days (1995)", "Total Recall (1990)", "The Guest (2014)",
            "Atomic Blonde (2017)", "Streets of Fire (1984)", "Gattaca (1997)",
            "Johnny Mnemonic (1995)", "Upgrade (2018)", "Only God Forgives (2013)",
            "Primer (2004)", "Lost River (2014)", "Gunpowder Milkshake (2021)",
            "The Fifth Element (1997)",
            "Quiz Show (1994)"
        ]



    };

    const RUNTIME_FILTER_OPTIONS = [60, 75, 90, 105, 120, 135, 150, 165, 180];

    let minRuntimeMinutes = null;
    let maxRuntimeMinutes = null;

    function parseOmdbRuntimeMinutes(runtimeString) {
        if (!runtimeString || runtimeString === 'N/A') return null;
        const match = runtimeString.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    }

    function getMovieRuntimeMinutes(listing) {
        const meta = getMovieMetadata(listing);
        return meta ? parseOmdbRuntimeMinutes(meta.Runtime) : null;
    }

    function formatRuntimeFilterLabel(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainder = minutes % 60;
        if (remainder === 0) {
            return hours === 1 ? '1 hr' : `${hours} hr`;
        }
        if (hours === 0) {
            return `${minutes} min`;
        }
        return `${hours} hr ${remainder} min`;
    }

    function isRuntimeFilterActive() {
        return minRuntimeMinutes != null || maxRuntimeMinutes != null;
    }

    function isRuntimeFilterValid() {
        if (minRuntimeMinutes != null && maxRuntimeMinutes != null) {
            return minRuntimeMinutes <= maxRuntimeMinutes;
        }
        return true;
    }

    function moviePassesRuntimeFilter(listing) {
        if (!isRuntimeFilterActive()) return true;

        const minutes = getMovieRuntimeMinutes(listing);
        if (minutes == null) return false;
        if (minRuntimeMinutes != null && minutes < minRuntimeMinutes) return false;
        if (maxRuntimeMinutes != null && minutes > maxRuntimeMinutes) return false;
        return true;
    }

    function getMovieDecade(listing) {
        const { year } = parseMovieListing(listing);
        if (!year) return null;
        return Math.floor(parseInt(year, 10) / 10) * 10;
    }

    const DECADE_FILTER_OPTIONS = [...new Set(
        Object.values(movieDatabase).flat().map(getMovieDecade).filter((decade) => decade != null)
    )].sort((a, b) => a - b);

    let activeDecades = [...DECADE_FILTER_OPTIONS];

    function formatDecadeFilterLabel(decade) {
        return `${decade}s`;
    }

    function isDecadeFilterActive() {
        return activeDecades.length > 0 && activeDecades.length < DECADE_FILTER_OPTIONS.length;
    }

    function moviePassesDecadeFilter(listing) {
        if (!isDecadeFilterActive()) return true;

        const decade = getMovieDecade(listing);
        if (decade == null) return false;
        return activeDecades.includes(decade);
    }

    function getEligibleMovies(category) {
        return movieDatabase[category].filter(
            (listing) => moviePassesRuntimeFilter(listing) && moviePassesDecadeFilter(listing)
        );
    }

    function getEligibleCategories() {
        return activeCategories.filter((category) => getEligibleMovies(category).length > 0);
    }

    function shouldShowNoMatchOverlay() {
        syncRuntimeFilterState();
        if (activeCategories.length === 0) return false;
        if (activeDecades.length === 0) return false;
        if (isRuntimeFilterActive() && !isRuntimeFilterValid()) return false;
        return getEligibleCategories().length === 0;
    }

    function getAvailableFlicksCount() {
        syncRuntimeFilterState();
        if (activeCategories.length === 0 || activeDecades.length === 0) return 0;
        if (isRuntimeFilterActive() && !isRuntimeFilterValid()) return 0;

        return activeCategories.reduce(
            (total, category) => total + getEligibleMovies(category).length,
            0
        );
    }

    function updateAvailableFlicksUI() {
        const countEl = document.getElementById('available-flicks-count');
        if (!countEl) return;

        countEl.textContent = String(getAvailableFlicksCount());
    }

    function updateSpinBlockerUI() {
        updateAvailableFlicksUI();

        const message = document.getElementById('spin-no-match-message');
        const spinButton = document.getElementById('spin-button');
        if (!message || !spinButton) return;

        const blocked = shouldShowNoMatchOverlay();
        message.hidden = !blocked;
        spinButton.disabled = blocked;
        spinButton.setAttribute('aria-disabled', String(blocked));
    }

    function syncRuntimeFilterState() {
        const minSelect = document.getElementById('min-runtime-select');
        const maxSelect = document.getElementById('max-runtime-select');
        if (!minSelect || !maxSelect) return;

        minRuntimeMinutes = minSelect.value ? parseInt(minSelect.value, 10) : null;
        maxRuntimeMinutes = maxSelect.value ? parseInt(maxSelect.value, 10) : null;
    }

    function clearRuntimeFilter() {
        const minSelect = document.getElementById('min-runtime-select');
        const maxSelect = document.getElementById('max-runtime-select');
        if (minSelect) minSelect.value = '';
        if (maxSelect) maxSelect.value = '';
        minRuntimeMinutes = null;
        maxRuntimeMinutes = null;
        resetMovieSelectionPools();
        updateSpinBlockerUI();
    }

    function buildRuntimeFilterUI() {
        const minSelect = document.getElementById('min-runtime-select');
        const maxSelect = document.getElementById('max-runtime-select');
        if (!minSelect || !maxSelect) return;

        [minSelect, maxSelect].forEach((select) => {
            select.innerHTML = '';
            const anyOption = document.createElement('option');
            anyOption.value = '';
            anyOption.textContent = 'Any';
            select.appendChild(anyOption);

            RUNTIME_FILTER_OPTIONS.forEach((minutes) => {
                const option = document.createElement('option');
                option.value = String(minutes);
                option.textContent = formatRuntimeFilterLabel(minutes);
                select.appendChild(option);
            });

            select.addEventListener('change', () => {
                syncRuntimeFilterState();
                resetMovieSelectionPools();
                updateSpinBlockerUI();
            });
        });
    }

    function updateDecadeLabelVisual(decade) {
        const checkbox = document.querySelector(
            `#decade-filter-options input[data-decade="${CSS.escape(String(decade))}"]`
        );
        if (!checkbox) return;

        const isActive = activeDecades.includes(decade);
        checkbox.checked = isActive;
        checkbox.closest('label')?.classList.toggle('decade-inactive', !isActive);
    }

    function toggleDecade(decade) {
        const index = activeDecades.indexOf(decade);
        if (index === -1) {
            activeDecades.push(decade);
        } else {
            activeDecades.splice(index, 1);
        }
        activeDecades.sort((a, b) => a - b);
        updateDecadeLabelVisual(decade);
        resetMovieSelectionPools();
        updateSpinBlockerUI();
    }

    function toggleAllDecades(shouldSelect) {
        if (shouldSelect) {
            activeDecades = [...DECADE_FILTER_OPTIONS];
        } else {
            activeDecades = [];
        }

        DECADE_FILTER_OPTIONS.forEach((decade) => {
            updateDecadeLabelVisual(decade);
        });
        resetMovieSelectionPools();
        updateSpinBlockerUI();
    }

    function resetAllFilters() {
        toggleAllCategories(true);
        clearRuntimeFilter();
        toggleAllDecades(true);
    }

    function buildDecadeFilterUI() {
        const container = document.getElementById('decade-filter-options');
        if (!container) return;

        DECADE_FILTER_OPTIONS.forEach((decade) => {
            const label = document.createElement('label');
            label.className = 'decade-filter-label';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            checkbox.dataset.decade = String(decade);
            checkbox.addEventListener('change', () => toggleDecade(decade));
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' ' + formatDecadeFilterLabel(decade)));
            container.appendChild(label);
        });
    }

    let categories = Object.keys(movieDatabase);

    let activeCategories = [...categories];

    function updateCategoryLabelVisual(categoryName) {
        const checkbox = document.querySelector(
            `#category-filter-options input[data-category="${CSS.escape(categoryName)}"]`
        );
        if (!checkbox) return;

        const isActive = activeCategories.includes(categoryName);
        checkbox.checked = isActive;
        checkbox.closest('label')?.classList.toggle('category-inactive', !isActive);
    }

    function toggleCategory(categoryName) {
        const index = activeCategories.indexOf(categoryName);
        if (index === -1) {
            activeCategories.push(categoryName);
        } else {
            activeCategories.splice(index, 1);
        }
        updateCategoryLabelVisual(categoryName);
        updateSpinBlockerUI();
    }

    function toggleAllCategories(shouldSelect) {
        if (shouldSelect) {
            activeCategories = Object.keys(movieDatabase);
        } else {
            activeCategories = [];
        }

        Object.keys(movieDatabase).forEach((categoryName) => {
            updateCategoryLabelVisual(categoryName);
        });
        updateSpinBlockerUI();
    }

    const totalSlices = 16;

    const degreesPerSlice = 360 / totalSlices; 

    let isSpinning = false;

    let currentRotation = 0; 

    

    let introEnabled = false;

    let victoryEnabled = true;

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let currentIntroAudio = null;

    let currentVictoryAudio = null;

    let currentKeeperAudios = [];

    const spinButtonClipPath = 'sounds/spin-projector-button-push.mp3';
    let spinButtonBuffer = null;
    let spinButtonBufferPromise = null;
    let spinButtonFallbackAudio = null;

    function getSpinButtonVolume() {
        return getNormalizedVolume(spinButtonClipPath, cabinetMixer.introClipVolume);
    }

    function loadSpinButtonBuffer() {
        if (spinButtonBuffer) return Promise.resolve(spinButtonBuffer);
        if (spinButtonBufferPromise) return spinButtonBufferPromise;

        spinButtonBufferPromise = fetch(spinButtonClipPath)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
            .then((buffer) => {
                spinButtonBuffer = buffer;
                return buffer;
            })
            .catch((err) => {
                console.log('Spin button buffer preload failed:', err);
                spinButtonBufferPromise = null;
                return null;
            });

        return spinButtonBufferPromise;
    }

    function ensureSpinButtonFallbackAudio() {
        if (spinButtonFallbackAudio) return spinButtonFallbackAudio;
        spinButtonFallbackAudio = new Audio(spinButtonClipPath);
        spinButtonFallbackAudio.preload = 'auto';
        spinButtonFallbackAudio.load();
        return spinButtonFallbackAudio;
    }

    function playSpinButtonFromBuffer() {
        const source = audioCtx.createBufferSource();
        source.buffer = spinButtonBuffer;
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = getSpinButtonVolume();
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(0);
    }

    function playSpinButtonFallback() {
        const audio = ensureSpinButtonFallbackAudio();
        audio.volume = getSpinButtonVolume();
        if (!audio.paused) audio.pause();
        audio.currentTime = 0;
        void audio.play().catch((err) => {
            console.log('Spin button audio playback blocked or file not found:', err);
        });
    }

    function playSpinButtonSounds() {
        void audioCtx.resume();

        if (spinButtonBuffer) {
            playSpinButtonFromBuffer();
            return;
        }

        playSpinButtonFallback();
        void loadSpinButtonBuffer();
    }

    function stopSpinButtonAudio() {
        if (spinButtonFallbackAudio) {
            spinButtonFallbackAudio.pause();
            spinButtonFallbackAudio.currentTime = 0;
        }
    }

    function resetSpinButtonAudioCache() {
        spinButtonBuffer = null;
        spinButtonBufferPromise = null;
        spinButtonFallbackAudio = null;
    }

    function stopKeeperAudio() {
        currentKeeperAudios.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        currentKeeperAudios = [];
    }

    function playKeeperClip(relativePath) {
        const audio = new Audio(relativePath);
        currentKeeperAudios.push(audio);
        audio.volume = getNormalizedVolume(relativePath, cabinetMixer.victoryClipVolume);
        audio.play().catch((err) => {
            console.log('Keeper audio playback blocked or file not found:', relativePath, err);
            currentKeeperAudios = currentKeeperAudios.filter((entry) => entry !== audio);
        });
        audio.onended = function() {
            currentKeeperAudios = currentKeeperAudios.filter((entry) => entry !== audio);
        };
    }

    function playKeeperSound(keeperNumber) {
        stopKeeperAudio();

        const keeperSoundSets = {
            1: ['sounds/keeper-kaching.mp3'],
            2: ['sounds/keeper-money-counting.mp3'],
            3: [
                'sounds/keeper-money-counting.mp3',
                'sounds/keeper-kaching.mp3',
                'sounds/keeper-jackpot-coins.mp3',
                'sounds/keeper-casino-counter.wav'
            ]
        };

        (keeperSoundSets[keeperNumber] || keeperSoundSets[1]).forEach(playKeeperClip);
    }



    // --- MASTER AUDIO MIXING DECK ---

    const cabinetMixer = {

        tickerVolume: 0.144,      

        introClipVolume: 0.70,   

        victoryClipVolume: 0.85  

    };



    function normalizeAudioPath(relativePath) {
        const parts = relativePath.replace(/\\/g, '/').split('/');
        const resolved = [];

        for (const part of parts) {
            if (part === '..') {
                if (resolved.length) resolved.pop();
            } else if (part !== '.' && part !== '') {
                resolved.push(part);
            }
        }

        return resolved.join('/');
    }

    function getNormalizedVolume(relativePath, baseVolume) {
        const normalizedPath = normalizeAudioPath(relativePath);
        const gain = window.audioGainMap?.[normalizedPath] ?? 1;
        return Math.min(1, baseVolume * gain);
    }



    function updateAudioControlButtons() {
        document.getElementById('intro-audio-btn').classList.toggle('audio-enabled', introEnabled);
        document.getElementById('intro-audio-btn').classList.toggle('audio-disabled', !introEnabled);
        document.getElementById('victory-audio-btn').classList.toggle('audio-enabled', victoryEnabled);
        document.getElementById('victory-audio-btn').classList.toggle('audio-disabled', !victoryEnabled);
    }

    function toggleIntroAudio() {
        introEnabled = !introEnabled;
        updateAudioControlButtons();
    }

    function toggleVictoryAudio() {
        victoryEnabled = !victoryEnabled;
        updateAudioControlButtons();
    }

    function stopCabinetAudio() {
        if (currentIntroAudio) {
            currentIntroAudio.pause();
            currentIntroAudio.currentTime = 0;
            currentIntroAudio = null;
        }

        if (currentVictoryAudio) {
            currentVictoryAudio.pause();
            currentVictoryAudio.currentTime = 0;
            currentVictoryAudio = null;
        }

        if (currentKeeperAudios.length > 0) {
            stopKeeperAudio();
        }
    }

    function killswitch() {
        stopCabinetAudio();
        stopSpinButtonAudio();

        const oldCtx = audioCtx;
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        resetSpinButtonAudioCache();
        ensureSpinButtonFallbackAudio();
        void loadSpinButtonBuffer();

        if (oldCtx && oldCtx.state !== 'closed') {
            oldCtx.close();
        }

        isSpinning = false;
        hasSelectedMovie = false;
        recentSelections = [];
        keeperPicks = [];
        isDiscardingKeeper = false;
        keeperUiGeneration += 1;
        winClipRemainingByCategory = {};
        resetMovieSelectionPools();

        resetResultPanel();
        setMarqueeText('SYSTEM READY // CHOOSE YOUR GENRE...');

        updateRecentSelectionsUI();
        updateKeeperPicksUI();
        updateKeeperButtonState();
    }



    function playTickerClick() {

        const osc = audioCtx.createOscillator();

        const gainNode = audioCtx.createGain();

        osc.type = 'triangle';

        osc.frequency.setValueAtTime(150, audioCtx.currentTime); 

        gainNode.gain.setValueAtTime(cabinetMixer.tickerVolume, audioCtx.currentTime);

        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03);

        osc.connect(gainNode);

        gainNode.connect(audioCtx.destination);

        osc.start();

        osc.stop(audioCtx.currentTime + 0.03);

    }



    // --- ARCADE AUDIO SETTINGS ---

    const spinIntroClips = [

        "sounds/output.wav", "sounds/output 2.wav", "sounds/output 3.wav", "sounds/output 4.wav",

        "sounds/output 5.wav", "sounds/output 7.wav",

        "sounds/output 19.wav", "sounds/output 21.wav", "sounds/output 29.wav"

    ];



    function initiateSpin(event) {

        if (isSpinning) return;

        playSpinButtonSounds();

        if (shouldShowNoMatchOverlay()) {
            updateSpinBlockerUI();
            return;
        }

        stopCabinetAudio();

        isSpinning = true;

        updateKeeperButtonState();

        audioCtx.resume();

        resetResultPanel();

        // DEV OVERRIDE DETECTED: Shift key bypasses entry sounds

        if (event && event.shiftKey) {

            setMarqueeText('DEV BYPASS // FAST SPIN MODE...');

            triggerPhysicalSpin();

            return;

        }



        setMarqueeText('PREPARING CABINET...');



        if (introEnabled && spinIntroClips.length > 0) {

            let randomClip = spinIntroClips[Math.floor(Math.random() * spinIntroClips.length)];

            

            let introAudio = new Audio(randomClip);

            currentIntroAudio = introAudio;

            introAudio.volume = getNormalizedVolume(randomClip, cabinetMixer.introClipVolume);

            

            introAudio.play().catch(err => {

                console.log("Audio play blocked or file not found, skipping directly to spin:", err);

                currentIntroAudio = null;

                triggerPhysicalSpin(); 

            });



            introAudio.onended = function() {

                currentIntroAudio = null;

                triggerPhysicalSpin();

            };

        } else {

            triggerPhysicalSpin();

        }

    }



    function triggerPhysicalSpin() {

        let tuningOffset = 15; 



        const disc = document.getElementById('wheel-disc');

        setMarqueeText('LOCKING CATEGORY...');



        if (activeCategories.length === 0) {
            alert('Please select at least one category');
            isSpinning = false;
            return;
        }

        if (activeDecades.length === 0) {
            alert('Please select at least one decade');
            isSpinning = false;
            return;
        }

        syncRuntimeFilterState();

        if (isRuntimeFilterActive() && !isRuntimeFilterValid()) {
            alert('Minimum runtime cannot exceed maximum runtime.');
            isSpinning = false;
            return;
        }

        const eligibleCategories = getEligibleCategories();
        if (eligibleCategories.length === 0) {
            updateSpinBlockerUI();
            isSpinning = false;
            return;
        }

        let selectedCategory = eligibleCategories[Math.floor(Math.random() * eligibleCategories.length)];
        let randomCategoryIndex = categories.indexOf(selectedCategory);

        

        let targetDegrees = (360 - (randomCategoryIndex * degreesPerSlice) - (degreesPerSlice / 2) + tuningOffset) % 360;

        

        let baseRotation = currentRotation % 360;

        let extraSpins = 5 * 360; 

        

        let distanceToTarget = (targetDegrees - baseRotation + 360) % 360;

        if (distanceToTarget === 0) distanceToTarget = 360; 

        

        let finalDegrees = baseRotation + extraSpins + distanceToTarget;

        

        let start = null;

        let duration = 4000; // Total spin window = 4 seconds

        let lastClickDegree = baseRotation;

        

        // State gate to prevent multiple audio triggers in the tracking window

        let hasFiredVictorySound = false;



        function animate(timestamp) {

            if (!start) start = timestamp;

            let progress = timestamp - start;

            let timePercent = Math.min(progress / duration, 1);

            

            let easePercent = 1 - Math.pow(1 - timePercent, 3);

            let frameRotation = baseRotation + (finalDegrees - baseRotation) * easePercent;

            

            disc.style.transform = `rotate(${frameRotation}deg)`;



            if (Math.abs(frameRotation - lastClickDegree) >= degreesPerSlice) {

                playTickerClick();

                lastClickDegree = frameRotation - (frameRotation % degreesPerSlice);

            }



            // SUSPENSE TIMING MECHANIC: Fire victory sound exactly 1 second (3000ms) before stop

            if (progress >= 3000 && !hasFiredVictorySound) {

                hasFiredVictorySound = true;

                playCategoryVictorySound(selectedCategory);

            }



            if (timePercent < 1) {

                requestAnimationFrame(animate);

            } else {

                currentRotation = finalDegrees;

                disc.style.transform = `rotate(${currentRotation}deg)`;

                

                setTimeout(() => {

                    executeMovieTierSelection(selectedCategory);

                }, 800);

            }

        }

        requestAnimationFrame(animate);

    }



    // --- WINNING AUDIO DIRECTORY ---
    // Roster is auto-generated in win-clips-manifest.js (npm run refresh-audio).

    const categoryWinClips = window.categoryWinClips;
    if (!categoryWinClips) {
        console.warn('win-clips-manifest.js not loaded — run npm run refresh-audio');
    }

    function shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function drawNextWinClip(catKey, files) {
        if (!winClipRemainingByCategory[catKey]?.length) {
            winClipRemainingByCategory[catKey] = shuffleArray(files);
        }
        return winClipRemainingByCategory[catKey].pop();
    }

    function resetMovieSelectionPools() {
        movieRemainingByCategory = {};
    }

    function drawNextMovie(catKey, eligibleMovies) {
        if (!movieRemainingByCategory[catKey]?.length) {
            movieRemainingByCategory[catKey] = shuffleArray(eligibleMovies);
        }
        return movieRemainingByCategory[catKey].pop();
    }

    function playCategoryVictorySound(catKey) {

        if (!victoryEnabled) return;

        

        let winData = categoryWinClips[catKey];

        if (winData && winData.files.length > 0) {

            let randomWinFile = drawNextWinClip(catKey, winData.files);

            let fullPath = winData.folder + randomWinFile;

            

            let winAudio = new Audio(fullPath);

            currentVictoryAudio = winAudio;

            winAudio.volume = getNormalizedVolume(fullPath, cabinetMixer.victoryClipVolume);

            

            winAudio.play().catch(err => console.log("Win audio playback blocked or file not found:", err));

            winAudio.onended = function() {
                if (currentVictoryAudio === winAudio) {
                    currentVictoryAudio = null;
                }
            };

        }

    }



    // Global history state tracking arrays

    let winClipRemainingByCategory = {};

    let movieRemainingByCategory = {};

    let recentSelections = [];

    let keeperPicks = [];

    let isDiscardingKeeper = false;

    let keeperUiGeneration = 0;

    let hasSelectedMovie = false;



function getMovieMetadata(listing) {
    return window.movieMetadataByListing?.[listing] ?? null;
}

function parseMovieListing(listing) {
    const yearMatch = listing.match(/\((\d{4})\)/);
    if (yearMatch) {
        return {
            cleanTitle: listing.split('(')[0].trim(),
            year: yearMatch[1],
            listing
        };
    }

    const trailingYearMatch = listing.match(/^(.+?)\s(\d{4})$/);
    if (trailingYearMatch) {
        return {
            cleanTitle: trailingYearMatch[1].trim(),
            year: trailingYearMatch[2],
            listing
        };
    }

    return { cleanTitle: listing.trim(), year: null, listing };
}

function formatKeeperRuntimeDisplay(minutes) {
    if (minutes == null) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hrs ${mins} mins`;
}

function getTotalKeeperRuntimeMinutes(picks) {
    if (picks.length !== 3) return null;
    let total = 0;
    for (const pick of picks) {
        if (pick.runtimeMinutes == null) return null;
        total += pick.runtimeMinutes;
    }
    return total;
}



function sanitizeOmdbPosterUrl(posterUrl) {
    if (!posterUrl || posterUrl === 'N/A') return posterUrl;

    return posterUrl
        .replace(/^http:\/\//i, 'https://')
        .replace(/\/\/ia\.media-imdb\.com\/images\//i, '//m.media-amazon.com/images/')
        .replace(/\/\/images-na\.ssl-images-amazon\.com\/images\//i, '//m.media-amazon.com/images/')
        .replace(/XkEyXkFqcG[^@]+@/, 'XkEyXkFqcGc@')
        .replace(/XkFqcGc[^@]+@/, 'XkFqcGc@');
}

function getPosterLoadCandidates(posterUrl) {
    const candidates = [];
    const sanitized = sanitizeOmdbPosterUrl(posterUrl);

    if (sanitized) candidates.push(sanitized);
    if (posterUrl && posterUrl !== sanitized) candidates.push(posterUrl);

    if (sanitized && sanitized.includes('@._V1')) {
        const dotted = sanitized.replace('@._V1', '._V1');
        if (!candidates.includes(dotted)) candidates.push(dotted);
    }

    return [...new Set(candidates.filter(Boolean))];
}



function setMarqueeText(text) {
    const marquee = document.getElementById('marquee-text');
    const ledger = document.getElementById('marquee-ledger');
    if (!marquee || !ledger) return;

    marquee.textContent = text;
    marquee.classList.remove('marquee-scroll');
    marquee.style.removeProperty('--marquee-distance');
    marquee.style.removeProperty('--marquee-duration');

    requestAnimationFrame(() => {
        const availableWidth = ledger.clientWidth - 40;
        const overflow = marquee.scrollWidth - availableWidth;
        if (overflow > 0) {
            marquee.style.setProperty('--marquee-distance', `-${overflow}px`);
            marquee.style.setProperty('--marquee-duration', `${Math.max(6, overflow / 35)}s`);
            marquee.classList.add('marquee-scroll');
        }
    });
}



function clearRatingsOverlay() {
    const ratingsEl = document.getElementById('result-ratings');
    if (!ratingsEl) return;

    ratingsEl.innerHTML = '';
    ratingsEl.hidden = true;
    ratingsEl.classList.remove('ratings-revealed');
}



function clearResultDetails() {
    const details = document.getElementById('result-details');
    if (!details) return;

    details.classList.add('result-hidden');
    details.classList.remove('result-loading', 'result-revealed');

    ['result-title', 'result-meta', 'result-genre', 'result-plot'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });

    clearRatingsOverlay();
}



const POSTER_MAX_WIDTH = 356;
const POSTER_MAX_HEIGHT = 375;
const POSTER_DETAILS_WIDTH = 285;
const POSTER_FRAME_DEFAULT_WIDTH = 285;
const POSTER_FRAME_DEFAULT_HEIGHT = 120;



function centerPosterFrame(frame, width) {
    frame.style.marginLeft = `${(POSTER_DETAILS_WIDTH - width) / 2}px`;
}



function resetPosterFrameSize() {
    const frame = document.getElementById('poster-frame');
    const posterImg = document.getElementById('poster-image');

    if (frame) {
        frame.style.width = `${POSTER_FRAME_DEFAULT_WIDTH}px`;
        frame.style.height = `${POSTER_FRAME_DEFAULT_HEIGHT}px`;
        centerPosterFrame(frame, POSTER_FRAME_DEFAULT_WIDTH);
    }

    if (posterImg) {
        posterImg.style.width = '';
        posterImg.style.height = '';
    }
}



function fitPosterFrameToImage(img) {
    const frame = document.getElementById('poster-frame');
    if (!frame || !img?.naturalWidth || !img?.naturalHeight) return;

    const scale = Math.min(
        POSTER_MAX_WIDTH / img.naturalWidth,
        POSTER_MAX_HEIGHT / img.naturalHeight
    );
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    frame.style.width = `${width}px`;
    frame.style.height = `${height}px`;
    centerPosterFrame(frame, width);
}



function displayPosterImage(posterImg, posterUrl, options = {}) {
    if (!posterImg) return;

    const { onAllFailed } = options;
    const placeholder = document.getElementById('poster-placeholder');
    const candidates = getPosterLoadCandidates(posterUrl);
    let candidateIndex = 0;

    const applyFit = () => fitPosterFrameToImage(posterImg);

    const tryNext = () => {
        if (candidateIndex >= candidates.length) {
            if (onAllFailed) onAllFailed();
            else {
                posterImg.style.display = 'none';
                resetPosterFrameSize();
            }
            return;
        }

        const url = candidates[candidateIndex++];

        posterImg.onload = () => applyFit();
        posterImg.onerror = () => tryNext();
        posterImg.src = url;
    };

    if (placeholder) placeholder.style.display = 'none';
    posterImg.style.display = 'block';
    tryNext();

    if (posterImg.complete && posterImg.naturalWidth) {
        applyFit();
    }
}



function resetResultPanel() {
    const resultPanel = document.getElementById('result-panel');
    const posterImg = document.getElementById('poster-image');
    const placeholder = document.getElementById('poster-placeholder');

    if (resultPanel) resultPanel.classList.remove('visible');
    if (posterImg) {
        posterImg.onload = null;
        posterImg.onerror = null;
        posterImg.src = '';
        posterImg.style.display = 'none';
    }
    resetPosterFrameSize();
    if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.classList.remove('fallback-art');
        placeholder.textContent = 'AWAITING SPIN...';
    }

    clearResultDetails();
}



function formatResultMeta(data, fallbackYear) {
    const parts = [];

    if (data.Year && data.Year !== 'N/A') {
        parts.push(data.Year);
    } else if (fallbackYear) {
        parts.push(fallbackYear);
    }

    if (data.Runtime && data.Runtime !== 'N/A') {
        parts.push(data.Runtime.toUpperCase());
    }

    if (data.Rated && data.Rated !== 'N/A') {
        parts.push(data.Rated);
    }

    return parts.join(' · ');
}



function getOmdbRating(data, source) {
    if (!data?.Ratings) return null;
    const entry = data.Ratings.find((r) => r.Source === source);
    if (!entry || entry.Value === 'N/A') return null;
    return entry.Value;
}



function normalizeRatingScore(type, raw) {
    if (raw == null || raw === 'N/A') return 0;

    if (type === 'imdb') {
        const score = parseFloat(raw);
        return Number.isFinite(score) ? Math.max(0, Math.min(1, score / 10)) : 0;
    }

    const match = String(raw).match(/(\d+(?:\.\d+)?)/);
    if (!match) return 0;
    return Math.max(0, Math.min(1, parseFloat(match[1]) / 100));
}



function ratingColorFromNormalized(t) {
    const clamped = Math.max(0, Math.min(1, t));
    const red = [250, 50, 10];
    const yellow = [255, 215, 0];
    const green = [57, 255, 20];

    const lerp = (from, to, amount) => [
        Math.round(from[0] + (to[0] - from[0]) * amount),
        Math.round(from[1] + (to[1] - from[1]) * amount),
        Math.round(from[2] + (to[2] - from[2]) * amount),
    ];

    const rgb = clamped <= 0.5
        ? lerp(red, yellow, clamped / 0.5)
        : lerp(yellow, green, (clamped - 0.5) / 0.5);

    return { r: rgb[0], g: rgb[1], b: rgb[2] };
}



function ratingBadgeStyle(normalized) {
    const { r, g, b } = ratingColorFromNormalized(normalized);
    return `color:rgb(${r}, ${g}, ${b});border-color:rgba(${r}, ${g}, ${b}, 0.35)`;
}



function buildResultRatingsHtml(data) {
    if (!data || data.Response !== 'True') return '';

    const badges = [];

    if (data.imdbRating && data.imdbRating !== 'N/A') {
        const style = ratingBadgeStyle(normalizeRatingScore('imdb', data.imdbRating));
        badges.push(
            `<span class="result-rating-badge result-rating-imdb" style="${style}">` +
            `<span class="result-rating-label">IMDb</span>` +
            `<span class="result-rating-value">${data.imdbRating}/10</span>` +
            `</span>`
        );
    }

    const rt = getOmdbRating(data, 'Rotten Tomatoes');
    if (rt) {
        const style = ratingBadgeStyle(normalizeRatingScore('percent', rt));
        badges.push(
            `<span class="result-rating-badge result-rating-rt" style="${style}">` +
            `<span class="result-rating-label">RT Critics</span>` +
            `<span class="result-rating-value">${rt}</span>` +
            `</span>`
        );
    }

    let mc = data.Metascore && data.Metascore !== 'N/A' ? data.Metascore : null;
    if (!mc) {
        const mcRating = getOmdbRating(data, 'Metacritic');
        if (mcRating) {
            const match = mcRating.match(/(\d+)/);
            mc = match ? match[1] : mcRating;
        }
    }
    if (mc) {
        const style = ratingBadgeStyle(normalizeRatingScore('percent', mc));
        badges.push(
            `<span class="result-rating-badge result-rating-mc" style="${style}">` +
            `<span class="result-rating-label">MC</span>` +
            `<span class="result-rating-value">${mc}</span>` +
            `</span>`
        );
    }

    return badges.join('');
}



function showPosterFallback(categoryEmoji) {
    const posterImg = document.getElementById('poster-image');
    const placeholder = document.getElementById('poster-placeholder');

    if (posterImg) {
        posterImg.onload = null;
        posterImg.onerror = null;
        posterImg.style.display = 'none';
    }
    resetPosterFrameSize();
    if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.classList.add('fallback-art');
        placeholder.textContent = categoryEmoji || '🎬';
    }
}



function populateResultCard(data, listing, categoryEmoji, categoryName) {
    const details = document.getElementById('result-details');
    const titleEl = document.getElementById('result-title');
    const ratingsEl = document.getElementById('result-ratings');
    const metaEl = document.getElementById('result-meta');
    const genreEl = document.getElementById('result-genre');
    const plotEl = document.getElementById('result-plot');
    const { cleanTitle, year } = parseMovieListing(listing);

    if (!details || !titleEl || !ratingsEl || !metaEl || !genreEl || !plotEl) return;

    const hasMatch = data && data.Response === 'True';
    const displayTitle = hasMatch && data.Title ? data.Title : cleanTitle;

    titleEl.textContent = displayTitle;

    const ratingsHtml = hasMatch ? buildResultRatingsHtml(data) : '';
    ratingsEl.innerHTML = ratingsHtml;
    ratingsEl.hidden = !ratingsHtml;
    ratingsEl.classList.remove('ratings-revealed');
    if (ratingsHtml) {
        requestAnimationFrame(() => ratingsEl.classList.add('ratings-revealed'));
    }

    const metaText = hasMatch
        ? formatResultMeta(data, year)
        : [year, 'ARCHIVE ONLY'].filter(Boolean).join(' · ');
    metaEl.textContent = metaText;

    if (hasMatch && data.Genre && data.Genre !== 'N/A') {
        genreEl.textContent = data.Genre;
    } else {
        genreEl.textContent = categoryName.replace(/[^\x00-\x7F\w\s&'-]/g, '').trim();
    }

    if (hasMatch && data.Plot && data.Plot !== 'N/A') {
        plotEl.textContent = data.Plot;
    } else {
        plotEl.textContent = 'NO DATABASE MATCH // USING CABINET ARCHIVE ENTRY';
    }

    details.classList.remove('result-hidden', 'result-loading');
    details.classList.remove('result-revealed');

    requestAnimationFrame(() => {
        details.classList.add('result-revealed');
    });
}



function revealMovieResult(category, chosenMovie, categoryEmoji) {
    const resultPanel = document.getElementById('result-panel');
    const posterImg = document.getElementById('poster-image');
    const placeholder = document.getElementById('poster-placeholder');
    const details = document.getElementById('result-details');
    const { cleanTitle, year } = parseMovieListing(chosenMovie);

    const titleWithYear = year ? `${cleanTitle} (${year})` : cleanTitle;
    setMarqueeText(`${categoryEmoji} ${titleWithYear}`);

    if (resultPanel) resultPanel.classList.add('visible');
    clearRatingsOverlay();
    if (details) {
        details.classList.remove('result-hidden');
        details.classList.add('result-loading');
    }

    if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.classList.remove('fallback-art');
        placeholder.textContent = 'LOADING ARTWORK...';
    }
    resetPosterFrameSize();
    if (posterImg) {
        posterImg.onload = null;
        posterImg.onerror = null;
        posterImg.style.display = 'none';
    }

    const metadata = getMovieMetadata(chosenMovie);
    const posterUrl = metadata?.Poster && metadata.Poster !== 'N/A' ? metadata.Poster : null;

    if (posterUrl && posterImg) {
        if (placeholder) placeholder.style.display = 'none';
        posterImg.alt = `${metadata.Title || cleanTitle} poster`;
        displayPosterImage(posterImg, posterUrl, {
            onAllFailed: () => showPosterFallback(categoryEmoji)
        });
    } else {
        showPosterFallback(categoryEmoji);
    }

    populateResultCard(metadata, chosenMovie, categoryEmoji, category);
}



function executeMovieTierSelection(category) {
    const categoryParts = category.split(' ');
    const categoryEmoji = categoryParts[categoryParts.length - 1];
    const categoryName = categoryParts.slice(0, -1).join(' ');

    setMarqueeText(`${categoryEmoji} Selecting movie from ${categoryName}`);

    const resultPanel = document.getElementById('result-panel');
    const placeholder = document.getElementById('poster-placeholder');
    if (resultPanel) resultPanel.classList.add('visible');
    if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.classList.remove('fallback-art');
        placeholder.textContent = 'LOADING ARTWORK...';
    }

    setTimeout(() => {
        const eligibleMovies = getEligibleMovies(category);
        if (eligibleMovies.length === 0) {
            alert('No movies match your filters in this category.');
            isSpinning = false;
            return;
        }

        const chosenMovie = drawNextMovie(category, eligibleMovies);

        const historyEntry = `${categoryEmoji} ${chosenMovie}`;
        recentSelections.unshift(historyEntry);
        if (recentSelections.length > 3) recentSelections.pop();

        hasSelectedMovie = true;

        updateRecentSelectionsUI();
        revealMovieResult(category, chosenMovie, categoryEmoji);

        isSpinning = false;
        updateKeeperButtonState();
    }, 1500);
}

function updateRecentSelectionsUI() {
    const historyDeck = document.getElementById('history-deck');
    if (!historyDeck) return;

    historyDeck.style.opacity = recentSelections.length > 0 ? '1' : '0';

    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach((item, index) => {
        item.classList.remove('exiting', 'entering');

        if (recentSelections[index]) {
            item.textContent = recentSelections[index];
            item.classList.remove('empty');
        } else {
            item.textContent = 'EMPTY SLOT';
            item.classList.add('empty');
        }
    });
}

function getInsertCoinMarkup() {
    return `
        <div class="insert-coin" aria-label="Empty slot">
            <div class="insert-coin-slot" aria-hidden="true"></div>
        </div>
    `;
}

function applyKeeperPosterFromMetadata(keeperEntry) {
    const listing = getKeeperListingLabel(keeperEntry.label);
    const metadata = getMovieMetadata(listing);

    if (metadata?.Poster && metadata.Poster !== 'N/A') {
        keeperEntry.poster = metadata.Poster;
        new Image().src = metadata.Poster;
    }

    if (keeperEntry.runtimeMinutes == null && metadata?.Runtime) {
        keeperEntry.runtimeMinutes = parseOmdbRuntimeMinutes(metadata.Runtime);
    }
}

function prefetchKeeperPosters() {
    keeperPicks.forEach(applyKeeperPosterFromMetadata);
    if (keeperPicks.length) updateKeeperPicksUI();
}

function renderKeeperMovieSlot(item, pick, animate = false, showRuntime = false) {
    item.classList.add('filled');
    item.innerHTML = '';

    const movieEl = document.createElement('div');
    movieEl.className = 'keeper-movie';

    if (pick.poster) {
        const img = document.createElement('img');
        img.className = 'keeper-poster';
        img.src = pick.poster;
        img.alt = pick.label;
        img.title = 'Double-click to discard';
        movieEl.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'keeper-poster keeper-poster-placeholder';
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.title = 'Double-click to discard';
        movieEl.appendChild(placeholder);
    }

    const textEl = document.createElement('div');
    textEl.className = 'keeper-text';

    const title = document.createElement('span');
    title.className = 'keeper-title';
    title.textContent = pick.label;
    textEl.appendChild(title);

    if (showRuntime && pick.runtimeMinutes != null) {
        const runtime = document.createElement('span');
        runtime.className = 'keeper-runtime';
        runtime.textContent = formatKeeperRuntimeDisplay(pick.runtimeMinutes);
        textEl.appendChild(runtime);
    }

    movieEl.appendChild(textEl);

    item.appendChild(movieEl);

    if (animate) {
        requestAnimationFrame(() => {
            item.classList.add('entering');
            requestAnimationFrame(() => {
                item.classList.add('entering-active');
            });
        });
    }
}

function getOpenKeeperSlots() {
    return 3 - keeperPicks.length;
}

function isKeeperDeckFull() {
    return keeperPicks.length === 3 && !isDiscardingKeeper;
}

function getKeeperListingLabel(label) {
    return label.replace(/^[^\w\d]+\s*/, '');
}

function getKeeperCategoryEmoji(label) {
    const match = label.match(/^([^\w\d]+)\s*/);
    return match ? match[1].trim() : '';
}

function buildTicketStubsPrompt() {
    const bullets = keeperPicks
        .map((pick) => `- "${getKeeperListingLabel(pick.label)}"`)
        .join('\n');

    return `Remove these movies from the movieDatabase in main.js — I've already watched them:

${bullets}

For each title:
1. Find it in movieDatabase and remove the exact listing string (including year).
2. Also remove its entry from movie-metadata.js if present (regenerate with npm run generate-metadata).
3. Don't change anything else.

Only edit main.js (the live app). Don't update Pick-A-Flick - Cursor.html unless I ask.`;
}

function resolveCategorySelect(categoryKey) {
    if (categoryKey && movieDatabase[categoryKey]) {
        return categoryKey;
    }
    return null;
}

function getCategoryTextPortion(categoryKey) {
    const parts = categoryKey.split(' ');
    const last = parts[parts.length - 1];
    if (!/^[\w']/.test(last)) {
        return parts.slice(0, -1).join(' ');
    }
    return categoryKey;
}

function resolveCategoryName(rawName) {
    const normalized = rawName.trim();
    if (!normalized) {
        return { error: 'Category name is required.' };
    }

    const upper = normalized.toUpperCase();

    for (const key of Object.keys(movieDatabase)) {
        if (key.toUpperCase() === upper) {
            return { category: key };
        }
        const textPortion = getCategoryTextPortion(key).toUpperCase();
        if (textPortion === upper || key.toUpperCase().startsWith(upper)) {
            return { category: key };
        }
    }

    return { error: `Unknown category: "${normalized}"` };
}

function splitBatchMovieLine(line) {
    if (line.includes('\t')) {
        const tabIndex = line.indexOf('\t');
        return {
            titlePart: line.slice(0, tabIndex).trim(),
            categoryPart: line.slice(tabIndex + 1).trim(),
        };
    }

    const yearMatch = line.match(/\(\d{4}\)/);
    if (yearMatch) {
        const afterYear = line.indexOf(yearMatch[0]) + yearMatch[0].length;
        const rest = line.slice(afterYear);
        const commaIndex = rest.lastIndexOf(',');
        if (commaIndex !== -1) {
            return {
                titlePart: line.slice(0, afterYear + commaIndex).trim(),
                categoryPart: rest.slice(commaIndex + 1).trim(),
            };
        }
    }

    return { titlePart: line.trim(), categoryPart: '' };
}

function parseBatchMovieInput(raw, fallbackCategory) {
    const lines = raw.split(/\r?\n/);
    const entries = [];
    const errors = [];
    const warnings = [];
    const seenInBatch = new Set();

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        if (!trimmed) return;

        const { titlePart, categoryPart } = splitBatchMovieLine(trimmed);

        const normalized = normalizeListingInput(titlePart);
        if (normalized.error) {
            errors.push({ lineNum, message: normalized.error });
            return;
        }

        let category;
        if (categoryPart) {
            const resolved = resolveCategoryName(categoryPart);
            if (resolved.error) {
                errors.push({ lineNum, message: resolved.error });
                return;
            }
            category = resolved.category;
        } else if (fallbackCategory) {
            category = fallbackCategory;
        } else {
            errors.push({
                lineNum,
                message: 'Missing category — add a tab-separated category or select a default.',
            });
            return;
        }

        const batchKey = `${normalized.listing}\0${category}`;
        if (seenInBatch.has(batchKey)) {
            warnings.push({
                lineNum,
                message: `Duplicate in list: "${normalized.listing}" — skipped.`,
            });
            return;
        }
        seenInBatch.add(batchKey);

        const dup = isDuplicateListing(normalized.listing);
        if (dup.duplicate) {
            warnings.push({
                lineNum,
                message: `"${normalized.listing}" already in ${dup.category} — skipped.`,
            });
            return;
        }

        entries.push({
            listing: normalized.listing,
            cleanTitle: normalized.cleanTitle,
            year: normalized.year,
            category,
            lineNum,
        });
    });

    if (!raw.trim()) {
        errors.push({ lineNum: 0, message: 'Enter at least one movie.' });
    } else if (entries.length === 0 && errors.length === 0) {
        errors.push({ lineNum: 0, message: 'All entries were duplicates or repeats in the list.' });
    }

    return { entries, errors, warnings };
}

function normalizeListingInput(raw) {
    const trimmed = raw.trim();
    if (!trimmed) {
        return { error: 'Enter a movie title with year, e.g. Shrek 2 (2004).' };
    }

    if (!/\(\d{4}\)/.test(trimmed)) {
        return { error: 'Title must include a year in parentheses, e.g. Shrek 2 (2004).' };
    }

    const { cleanTitle, year, listing } = parseMovieListing(trimmed);
    if (!year) {
        return { error: 'Could not parse a 4-digit year from the title.' };
    }

    return { listing, cleanTitle, year };
}

function isDuplicateListing(listing) {
    for (const [category, movies] of Object.entries(movieDatabase)) {
        if (movies.includes(listing)) {
            return { duplicate: true, category };
        }
    }
    return { duplicate: false };
}

function buildAddMoviesPrompt(entries) {
    const bullets = entries
        .map(({ listing, category }) => `- "${listing}" â†’ ${category}`)
        .join('\n');

    return `Add these movies to movieDatabase in main.js:

${bullets}

For each title:
1. Append the exact listing string to the named category array in movieDatabase (do not duplicate).
2. Run npm run generate-metadata (or scripts/bootstrap-movie-metadata.ps1) to refresh movie-metadata.js.
3. Don't change anything else.

Only edit main.js (the live app). Don't update Pick-A-Flick - Cursor.html unless I ask.`;
}

function setAddMovieStatus(message, isError = false) {
    const status = document.getElementById('add-a-flick-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('add-a-flick-status-error', isError);
    status.classList.toggle('add-a-flick-status-success', !isError && message.startsWith('Copied'));
}

function hideAddMoviePreview() {
    const preview = document.getElementById('add-a-flick-preview');
    const list = document.getElementById('add-a-flick-preview-list');
    if (preview) preview.hidden = true;
    if (list) list.hidden = true;
}

function showAddMoviePreview(data, listing) {
    const preview = document.getElementById('add-a-flick-preview');
    const img = document.getElementById('add-a-flick-preview-poster');
    const label = document.getElementById('add-a-flick-preview-label');
    const list = document.getElementById('add-a-flick-preview-list');
    if (!preview || !img || !label) return;

    if (list) list.hidden = true;
    label.hidden = false;
    img.hidden = false;

    label.textContent = data.Title && data.Year
        ? `${data.Title} (${data.Year})`
        : listing;

    if (data.Poster && data.Poster !== 'N/A') {
        img.src = data.Poster;
        img.alt = label.textContent;
        img.hidden = false;
    } else {
        img.removeAttribute('src');
        img.alt = '';
        img.hidden = true;
    }

    preview.hidden = false;
}

function showAddMovieBatchSummary(entries, omdbResults) {
    if (entries.length === 1 && omdbResults[0]?.verified) {
        showAddMoviePreview(omdbResults[0].data, entries[0].listing);
        return;
    }

    const preview = document.getElementById('add-a-flick-preview');
    const img = document.getElementById('add-a-flick-preview-poster');
    const label = document.getElementById('add-a-flick-preview-label');
    let list = document.getElementById('add-a-flick-preview-list');
    if (!preview) return;

    if (img) img.hidden = true;
    if (label) label.hidden = true;

    if (!list) {
        list = document.createElement('ul');
        list.id = 'add-a-flick-preview-list';
        preview.appendChild(list);
    }

    list.innerHTML = '';
    entries.forEach((entry, index) => {
        const item = document.createElement('li');
        const verified = omdbResults[index]?.verified;
        item.textContent = `${verified ? '\u2713 ' : ''}${entry.listing} \u2192 ${entry.category}`;
        list.appendChild(item);
    });

    list.hidden = false;
    preview.hidden = false;
}

function copyAddMoviesPrompt(text, statusSuffix = '', movieCount = 1) {
    const copyStatus = document.getElementById('add-a-flick-status');
    const noun = movieCount === 1 ? 'this movie' : `these ${movieCount} movies`;
    const showCopied = () => {
        if (copyStatus) {
            let message = `Copied! Paste into Cursor to add ${noun} to main.js.`;
            if (statusSuffix) {
                message += ` ${statusSuffix}`;
            }
            copyStatus.textContent = message;
            copyStatus.classList.remove('add-a-flick-status-error');
            copyStatus.classList.add('add-a-flick-status-success');
        }
    };

    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(() => {
            copyTextFallback(text);
            showCopied();
        });
        return;
    }

    copyTextFallback(text);
    showCopied();
}

function formatBatchWarnings(warnings) {
    if (!warnings.length) return '';
    const skipped = warnings.length;
    return `(Skipped ${skipped} duplicate${skipped === 1 ? '' : 's'}.)`;
}

let addMovieLineHighlightsTimer = null;

function syncAddMovieHighlightScroll() {
    const titleInput = document.getElementById('add-a-flick-title');
    const highlightsInner = document.getElementById('add-a-flick-highlights-inner');
    if (!titleInput || !highlightsInner) return;
    highlightsInner.style.transform = `translateY(-${titleInput.scrollTop}px)`;
}

function resizeAddMovieTextarea() {
    const titleInput = document.getElementById('add-a-flick-title');
    if (!titleInput) return;
    titleInput.style.height = 'auto';
    const minHeight = 90;
    titleInput.style.height = `${Math.max(minHeight, titleInput.scrollHeight)}px`;
}

function updateAddMovieLineHighlights() {
    const titleInput = document.getElementById('add-a-flick-title');
    const highlightsInner = document.getElementById('add-a-flick-highlights-inner');
    const categorySelect = document.getElementById('add-a-flick-category');
    if (!titleInput || !highlightsInner) return;

    const fallbackCategory = categorySelect
        ? resolveCategorySelect(categorySelect.value)
        : null;
    const raw = titleInput.value;
    const lines = raw.split(/\r?\n/);
    const { errors } = parseBatchMovieInput(raw, fallbackCategory);
    const errorLines = new Set(
        errors.filter((entry) => entry.lineNum > 0).map((entry) => entry.lineNum)
    );

    highlightsInner.replaceChildren();
    lines.forEach((line, index) => {
        const lineEl = document.createElement('div');
        lineEl.className = 'add-a-flick-line';
        if (errorLines.has(index + 1)) {
            lineEl.classList.add('add-a-flick-line-error');
        }
        lineEl.textContent = line.length ? line : '\u00a0';
        highlightsInner.appendChild(lineEl);
    });

    syncAddMovieHighlightScroll();

    const lineErrors = errors.filter((entry) => entry.lineNum > 0);
    if (lineErrors.length) {
        const message = lineErrors
            .map(({ lineNum, message: errorMessage }) => `Line ${lineNum}: ${errorMessage}`)
            .join(' ');
        setAddMovieStatus(message, true);
    } else if (errors.length) {
        setAddMovieStatus(errors[0].message, true);
    } else {
        const status = document.getElementById('add-a-flick-status');
        if (status?.classList.contains('add-a-flick-status-error')) {
            setAddMovieStatus('', false);
        }
    }
}

function scheduleAddMovieLineHighlights() {
    if (addMovieLineHighlightsTimer) {
        clearTimeout(addMovieLineHighlightsTimer);
    }
    addMovieLineHighlightsTimer = setTimeout(() => {
        addMovieLineHighlightsTimer = null;
        updateAddMovieLineHighlights();
    }, 150);
}

function submitAddMovieClaim() {
    const titleInput = document.getElementById('add-a-flick-title');
    const categorySelect = document.getElementById('add-a-flick-category');
    const submitBtn = document.getElementById('add-a-flick-submit');
    if (!titleInput || !categorySelect || !submitBtn) return;

    const fallbackCategory = resolveCategorySelect(categorySelect.value);
    const { entries, errors, warnings } = parseBatchMovieInput(titleInput.value, fallbackCategory);

    if (errors.length) {
        const message = errors
            .map(({ lineNum, message: errorMessage }) => (
                lineNum > 0 ? `Line ${lineNum}: ${errorMessage}` : errorMessage
            ))
            .join(' ');
        setAddMovieStatus(message, true);
        hideAddMoviePreview();
        return;
    }

    submitBtn.disabled = true;
    setAddMovieStatus(`Preparing ${entries.length} title${entries.length === 1 ? '' : 's'}...`);

    const prompt = buildAddMoviesPrompt(entries);
    const warningSuffix = formatBatchWarnings(warnings);
    const omdbResults = entries.map(() => ({ verified: false, data: null }));

    showAddMovieBatchSummary(entries, omdbResults);
    copyAddMoviesPrompt(
        prompt,
        [warningSuffix, '(Run generate-metadata after adding to main.js.)'].filter(Boolean).join(' '),
        entries.length
    );
    titleInput.value = '';
    resizeAddMovieTextarea();
    updateAddMovieLineHighlights();
    submitBtn.disabled = false;
}

function buildAddMovieUI() {
    const filtersPanel = document.getElementById('filters-panel');
    if (!filtersPanel || document.getElementById('add-a-flick')) return;

    const section = document.createElement('div');
    section.id = 'add-a-flick';

    const label = document.createElement('div');
    label.id = 'add-a-flick-label';
    label.textContent = 'ADD A FLICK';
    section.appendChild(label);

    const hint = document.createElement('div');
    hint.id = 'add-a-flick-hint';
    hint.textContent = 'One per line: Title (Year) [tab] Category — Ctrl+Enter to submit';
    section.appendChild(hint);

    const form = document.createElement('div');
    form.id = 'add-a-flick-form';

    const editorWrap = document.createElement('div');
    editorWrap.id = 'add-a-flick-editor-wrap';

    const highlights = document.createElement('div');
    highlights.id = 'add-a-flick-highlights';
    highlights.setAttribute('aria-hidden', 'true');

    const highlightsInner = document.createElement('div');
    highlightsInner.id = 'add-a-flick-highlights-inner';
    highlights.appendChild(highlightsInner);
    editorWrap.appendChild(highlights);

    const titleInput = document.createElement('textarea');
    titleInput.id = 'add-a-flick-title';
    titleInput.rows = 5;
    titleInput.placeholder = 'Chicken Run (2000)\tANIMATION STATION\nHer (2013)\tPHOENIX FREEWAY';
    titleInput.autocomplete = 'off';
    titleInput.addEventListener('input', () => {
        resizeAddMovieTextarea();
        scheduleAddMovieLineHighlights();
    });
    titleInput.addEventListener('scroll', syncAddMovieHighlightScroll);
    titleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            submitAddMovieClaim();
        }
    });
    editorWrap.appendChild(titleInput);
    form.appendChild(editorWrap);

    const controlsRow = document.createElement('div');
    controlsRow.id = 'add-a-flick-controls';

    const categoryField = document.createElement('label');
    categoryField.id = 'add-a-flick-category-field';
    categoryField.className = 'add-a-flick-category-field';

    const categoryLabel = document.createElement('span');
    categoryLabel.id = 'add-a-flick-category-label';
    categoryLabel.textContent = 'Default category (optional)';
    categoryField.appendChild(categoryLabel);

    const categorySelect = document.createElement('select');
    categorySelect.id = 'add-a-flick-category';
    Object.keys(movieDatabase).forEach((categoryName) => {
        const option = document.createElement('option');
        option.value = categoryName;
        option.textContent = categoryName;
        categorySelect.appendChild(option);
    });
    categorySelect.addEventListener('change', updateAddMovieLineHighlights);
    categoryField.appendChild(categorySelect);
    controlsRow.appendChild(categoryField);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.id = 'add-a-flick-submit';
    submitBtn.textContent = 'Submit Claim';
    submitBtn.addEventListener('click', submitAddMovieClaim);
    controlsRow.appendChild(submitBtn);

    form.appendChild(controlsRow);
    section.appendChild(form);

    const preview = document.createElement('div');
    preview.id = 'add-a-flick-preview';
    preview.hidden = true;

    const previewPoster = document.createElement('img');
    previewPoster.id = 'add-a-flick-preview-poster';
    previewPoster.alt = '';
    preview.appendChild(previewPoster);

    const previewLabel = document.createElement('span');
    previewLabel.id = 'add-a-flick-preview-label';
    preview.appendChild(previewLabel);

    section.appendChild(preview);

    const status = document.createElement('div');
    status.id = 'add-a-flick-status';
    status.setAttribute('aria-live', 'polite');
    section.appendChild(status);

    filtersPanel.appendChild(section);
}

const ticketStubsPrintClipPath = 'sounds/ticket-stubs-receipt-print.mp3';
const ticketStubsShredClipPath = 'sounds/ticket-stubs-shred.mp3';
const ticketStubsPrintDurationFallbackMs = 1590;
const ticketStubsShredDurationFallbackMs = 1230;
const ticketStubsAnimationDelayMs = 200;
let ticketStubsPrintDurationMs = ticketStubsPrintDurationFallbackMs;
let ticketStubsShredDurationMs = ticketStubsShredDurationFallbackMs;
let ticketStubsPrintMetadataPromise = null;
let ticketStubsShredMetadataPromise = null;
let currentTicketStubsPrintAudio = null;
let currentTicketStubsShredAudio = null;
let ticketStubsPanelGeneration = 0;

function loadTicketStubsPrintMetadata() {
    if (ticketStubsPrintMetadataPromise) return ticketStubsPrintMetadataPromise;

    ticketStubsPrintMetadataPromise = new Promise((resolve) => {
        const audio = new Audio(ticketStubsPrintClipPath);
        audio.preload = 'metadata';

        const finish = (durationMs) => {
            if (durationMs > 0) {
                ticketStubsPrintDurationMs = durationMs;
            }
            resolve(ticketStubsPrintDurationMs);
        };

        audio.addEventListener('loadedmetadata', () => {
            const durationMs = Math.round((audio.duration || ticketStubsPrintDurationFallbackMs / 1000) * 1000);
            finish(durationMs);
        }, { once: true });

        audio.addEventListener('error', () => {
            finish(ticketStubsPrintDurationFallbackMs);
        }, { once: true });

        audio.load();
    });

    return ticketStubsPrintMetadataPromise;
}

function loadTicketStubsShredMetadata() {
    if (ticketStubsShredMetadataPromise) return ticketStubsShredMetadataPromise;

    ticketStubsShredMetadataPromise = new Promise((resolve) => {
        const audio = new Audio(ticketStubsShredClipPath);
        audio.preload = 'metadata';

        const finish = (durationMs) => {
            if (durationMs > 0) {
                ticketStubsShredDurationMs = durationMs;
            }
            resolve(ticketStubsShredDurationMs);
        };

        audio.addEventListener('loadedmetadata', () => {
            const durationMs = Math.round((audio.duration || ticketStubsShredDurationFallbackMs / 1000) * 1000);
            finish(durationMs);
        }, { once: true });

        audio.addEventListener('error', () => {
            finish(ticketStubsShredDurationFallbackMs);
        }, { once: true });

        audio.load();
    });

    return ticketStubsShredMetadataPromise;
}

function applyTicketStubsPanelDurations(panel, button, animationDurationMs) {
    const animationDurationSec = `${animationDurationMs / 1000}s`;

    if (panel) {
        panel.style.setProperty('--ticket-stubs-print-duration', animationDurationSec);
    }

    if (button) {
        button.style.setProperty('--ticket-stubs-print-duration', animationDurationSec);
    }
}

function getTicketStubsPrintVolume() {
    const gain = window.audioGainMap?.[ticketStubsPrintClipPath] ?? 1;
    return Math.min(1, 0.85 * gain);
}

function playTicketStubsPrintSound() {
    stopTicketStubsPrintSound();
    const audio = new Audio(ticketStubsPrintClipPath);
    currentTicketStubsPrintAudio = audio;
    audio.volume = getTicketStubsPrintVolume();
    audio.play().catch((err) => {
        console.log('Ticket stubs print audio blocked or file not found:', err);
        currentTicketStubsPrintAudio = null;
    });
    audio.onended = () => {
        if (currentTicketStubsPrintAudio === audio) {
            currentTicketStubsPrintAudio = null;
        }
    };
}

function stopTicketStubsPrintSound() {
    if (!currentTicketStubsPrintAudio) return;
    currentTicketStubsPrintAudio.pause();
    currentTicketStubsPrintAudio.currentTime = 0;
    currentTicketStubsPrintAudio = null;
}

function getTicketStubsShredVolume() {
    const gain = window.audioGainMap?.[ticketStubsShredClipPath] ?? 1;
    return Math.min(1, 0.85 * gain);
}

function playTicketStubsShredSound() {
    stopTicketStubsShredSound();
    const audio = new Audio(ticketStubsShredClipPath);
    currentTicketStubsShredAudio = audio;
    audio.volume = getTicketStubsShredVolume();
    audio.play().catch((err) => {
        console.log('Ticket stubs shred audio blocked or file not found:', err);
        currentTicketStubsShredAudio = null;
    });
    audio.onended = () => {
        if (currentTicketStubsShredAudio === audio) {
            currentTicketStubsShredAudio = null;
        }
    };
}

function stopTicketStubsShredSound() {
    if (!currentTicketStubsShredAudio) return;
    currentTicketStubsShredAudio.pause();
    currentTicketStubsShredAudio.currentTime = 0;
    currentTicketStubsShredAudio = null;
}

function removeTicketStubsShredStage() {
    document.getElementById('ticket-stubs-shred-stage')?.remove();
}

function isTicketStubsPanelVisible() {
    const panel = document.getElementById('ticket-stubs-panel');
    return panel && !panel.hidden;
}

function isTicketStubsPanelOpen() {
    const panel = document.getElementById('ticket-stubs-panel');
    return panel && (
        panel.classList.contains('ticket-stubs-open')
        || panel.classList.contains('ticket-stubs-printing')
        || panel.classList.contains('ticket-stubs-arming')
    );
}

function resetTicketStubsPanelState(panel) {
    if (!panel) return;
    panel.classList.remove('ticket-stubs-arming', 'ticket-stubs-printing', 'ticket-stubs-open');
    panel.style.removeProperty('clip-path');
    panel.style.removeProperty('opacity');
}

function prepareTicketStubsShredClone(paperClone, topOffset, paperWidth) {
    paperClone.removeAttribute('id');
    paperClone.hidden = false;
    paperClone.classList.add('ticket-stubs-shred-clone');
    paperClone.style.position = 'absolute';
    paperClone.style.top = `${-topOffset}px`;
    paperClone.style.left = '0';
    paperClone.style.width = `${paperWidth}px`;
    paperClone.style.transform = 'none';
    paperClone.style.opacity = '1';
    paperClone.style.pointerEvents = 'none';
}

function shredTicketStubsPanel(panel, generation, shredDurationMs) {
    removeTicketStubsShredStage();

    const paper = panel.querySelector('.ticket-stubs-panel-paper');
    if (!paper) return;

    const paperRect = paper.getBoundingClientRect();
    const stubs = [...paper.querySelectorAll('.ticket-stub')];
    if (paperRect.width <= 0 || paperRect.height <= 0 || stubs.length !== 3) return;

    const stage = document.createElement('div');
    stage.id = 'ticket-stubs-shred-stage';
    stage.style.setProperty('--ticket-stubs-shred-duration', `${shredDurationMs / 1000}s`);
    stage.style.top = `${paperRect.top}px`;
    stage.style.left = `${paperRect.left}px`;
    stage.style.width = `${paperRect.width}px`;
    stage.style.height = `${paperRect.height}px`;

    stubs.forEach((stub, stripIndex) => {
        const piece = document.createElement('div');
        piece.className = `ticket-stubs-shred-piece ticket-stubs-shred-piece-${stripIndex}`;
        piece.style.flex = 'none';
        piece.style.height = `${stub.offsetHeight}px`;

        const paperClone = paper.cloneNode(true);
        prepareTicketStubsShredClone(paperClone, stub.offsetTop, paperRect.width);
        piece.appendChild(paperClone);
        stage.appendChild(piece);
    });

    document.body.appendChild(stage);
    panel.hidden = true;
    resetTicketStubsPanelState(panel);
    playTicketStubsShredSound();

    requestAnimationFrame(() => {
        if (generation !== ticketStubsPanelGeneration) return;
        stage.classList.add('ticket-stubs-shredding');
    });
}

function positionTicketStubsPanel() {
    const button = document.getElementById('ticket-stubs-button');
    const panel = document.getElementById('ticket-stubs-panel');
    const controls = document.getElementById('ticket-stubs-controls');
    if (!button || !panel || panel.hidden) return;

    const img = button.querySelector('img') ?? button;
    const rect = img.getBoundingClientRect();
    const styles = controls ? getComputedStyle(controls) : getComputedStyle(document.documentElement);
    const slotBottomRatio = parseFloat(styles.getPropertyValue('--ticket-dispenser-slot-bottom-ratio')) || 1;
    const slotCenterXRatio = parseFloat(styles.getPropertyValue('--ticket-dispenser-slot-center-x-ratio')) || 0.5;
    const slotOverlap = parseFloat(styles.getPropertyValue('--ticket-dispenser-slot-overlap')) || 0;
    const panelOffsetY = parseFloat(styles.getPropertyValue('--ticket-dispenser-panel-offset-y')) || 0;

    panel.style.top = `${rect.top + rect.height * slotBottomRatio - slotOverlap + panelOffsetY}px`;
    panel.style.left = `${rect.left + rect.width * slotCenterXRatio}px`;
}

function ensureTicketStubsPanelPositionListeners() {
    if (window._ticketStubsPositionBound) return;
    window._ticketStubsPositionBound = true;

    const reposition = () => {
        if (isTicketStubsPanelVisible()) {
            positionTicketStubsPanel();
        }
    };

    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
}

async function closeTicketStubsPanel() {
    const panel = document.getElementById('ticket-stubs-panel');
    const button = document.getElementById('ticket-stubs-button');
    const copyStatus = document.getElementById('ticket-stubs-copy-status');
    if (!panel || panel.hidden) return;

    ticketStubsPanelGeneration += 1;
    const generation = ticketStubsPanelGeneration;
    stopTicketStubsPrintSound();
    if (button) button.classList.remove('ticket-stubs-dispensing');

    const finishClose = () => {
        if (generation !== ticketStubsPanelGeneration) return;
        removeTicketStubsShredStage();
        panel.hidden = true;
        resetTicketStubsPanelState(panel);
        if (copyStatus) copyStatus.textContent = '';
    };

    if (!panel.classList.contains('ticket-stubs-open') && !panel.classList.contains('ticket-stubs-printing')) {
        stopTicketStubsShredSound();
        finishClose();
        return;
    }

    panel.classList.remove('ticket-stubs-arming', 'ticket-stubs-printing', 'ticket-stubs-open');
    const shredDurationMs = await loadTicketStubsShredMetadata();
    shredTicketStubsPanel(panel, generation, shredDurationMs);
    window.setTimeout(finishClose, shredDurationMs + 50);
}

function populateTicketStubTitles() {
    const stubs = document.querySelectorAll('.ticket-stub');
    keeperPicks.forEach((pick, index) => {
        const stub = stubs[index];
        if (!stub) return;

        const titleText = stub.querySelector('.ticket-stub-title-text');
        const icons = stub.querySelectorAll('.ticket-stub-icon');
        const categoryEmoji = getKeeperCategoryEmoji(pick.label);

        if (titleText) {
            titleText.textContent = getKeeperListingLabel(pick.label);
        }

        icons.forEach((icon) => {
            if (categoryEmoji) {
                icon.hidden = false;
                icon.textContent = categoryEmoji;
            } else {
                icon.hidden = true;
                icon.textContent = '';
            }
        });
    });
}

async function openTicketStubsPanel() {
    const panel = document.getElementById('ticket-stubs-panel');
    const button = document.getElementById('ticket-stubs-button');
    const copyStatus = document.getElementById('ticket-stubs-copy-status');
    if (!panel || keeperPicks.length !== 3) return;

    const printDurationMs = await loadTicketStubsPrintMetadata();
    const animationDurationMs = Math.max(300, printDurationMs - ticketStubsAnimationDelayMs);

    ticketStubsPanelGeneration += 1;
    const generation = ticketStubsPanelGeneration;

    populateTicketStubTitles();
    resetTicketStubsPanelState(panel);
    applyTicketStubsPanelDurations(panel, button, animationDurationMs);
    panel.hidden = false;
    panel.classList.add('ticket-stubs-arming');
    positionTicketStubsPanel();
    if (copyStatus) copyStatus.textContent = '';

    playTicketStubsPrintSound();

    window.setTimeout(() => {
        if (generation !== ticketStubsPanelGeneration) return;
        panel.classList.remove('ticket-stubs-arming');
        void panel.offsetWidth;
        if (button) button.classList.add('ticket-stubs-dispensing');
        panel.classList.add('ticket-stubs-printing');
    }, ticketStubsAnimationDelayMs);

    window.setTimeout(() => {
        if (generation !== ticketStubsPanelGeneration) return;
        if (button) button.classList.remove('ticket-stubs-dispensing');
        panel.classList.remove('ticket-stubs-arming', 'ticket-stubs-printing');
        panel.classList.add('ticket-stubs-open');
        panel.style.clipPath = 'inset(0 0 0 0)';
        panel.style.opacity = '1';
    }, printDurationMs);
}

function syncTicketStubsUI(showFull) {
    const controls = document.getElementById('ticket-stubs-controls');
    const panel = document.getElementById('ticket-stubs-panel');
    const button = document.getElementById('ticket-stubs-button');

    if (controls) {
        controls.hidden = !showFull;
    }

    if (!showFull) {
        ticketStubsPanelGeneration += 1;
        stopTicketStubsPrintSound();
        stopTicketStubsShredSound();
        removeTicketStubsShredStage();
        if (button) button.classList.remove('ticket-stubs-dispensing');
        if (panel) {
            panel.hidden = true;
            resetTicketStubsPanelState(panel);
        }
    }
}

function showTicketStubsMessage() {
    if (keeperPicks.length !== 3) return;

    if (isTicketStubsPanelOpen()) {
        closeTicketStubsPanel();
        return;
    }

    openTicketStubsPanel();
}

function copyTicketStubsPrompt() {
    const copyStatus = document.getElementById('ticket-stubs-copy-status');
    const text = buildTicketStubsPrompt();
    const showCopied = () => {
        if (copyStatus) {
            copyStatus.textContent = 'Copied!';
            setTimeout(() => {
                if (copyStatus.textContent === 'Copied!') {
                    copyStatus.textContent = '';
                }
            }, 2000);
        }
    };

    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(() => {
            copyTextFallback(text);
            showCopied();
        });
        return;
    }

    copyTextFallback(text);
    showCopied();
}

function copyTextFallback(text) {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
}

function syncKeeperDeckTier(activeCount) {
    const keeperStage = document.getElementById('keeper-stage');
    if (!keeperStage) return { showRuntime: false };

    const showFull = activeCount === 3 && isKeeperDeckFull();
    keeperStage.classList.toggle('visible', activeCount > 0);
    keeperStage.classList.toggle('full', showFull);
    syncTicketStubsUI(showFull);

    const showRuntime = showFull;
    const totalEl = document.getElementById('keeper-total-runtime');
    if (totalEl) {
        const totalMinutes = showRuntime ? getTotalKeeperRuntimeMinutes(keeperPicks) : null;
        if (showRuntime && totalMinutes != null) {
            totalEl.textContent = formatKeeperRuntimeDisplay(totalMinutes);
            totalEl.hidden = false;
        } else {
            totalEl.textContent = '';
            totalEl.hidden = true;
        }
    }

    return { showRuntime };
}

function renderKeeperSlots({ animateLatest = false, showRuntime = false } = {}) {
    const activeCount = keeperPicks.length;
    const keeperItems = document.querySelectorAll('#keeper-slots .keeper-item');
    keeperItems.forEach((item, index) => {
        item.classList.remove('entering', 'entering-active', 'empty', 'filled', 'exiting');
        item.innerHTML = '';

        const pick = keeperPicks[index];
        if (pick) {
            renderKeeperMovieSlot(
                item,
                pick,
                animateLatest && index === keeperPicks.length - 1,
                showRuntime
            );
        } else if (activeCount > 0 && index >= activeCount) {
            item.classList.add('empty');
            item.innerHTML = getInsertCoinMarkup();
        }
    });
}

function updateKeeperPicksUI(animateLatest = false) {
    const keeperStage = document.getElementById('keeper-stage');
    if (!keeperStage) return;

    const activeCount = keeperPicks.length;
    const deferFullReveal = animateLatest && activeCount === 3;
    const tierCount = deferFullReveal ? 2 : activeCount;
    const { showRuntime } = syncKeeperDeckTier(tierCount);

    renderKeeperSlots({ animateLatest, showRuntime });

    if (deferFullReveal) {
        const generation = keeperUiGeneration;
        setTimeout(() => {
            if (keeperUiGeneration !== generation) return;
            if (keeperPicks.length === 3 && !isDiscardingKeeper) {
                updateKeeperPicksUI(false);
            }
        }, 400);
    }
}

function updateKeeperButtonState() {
    const keeperButton = document.getElementById('keeper-button');
    if (!keeperButton) return;

    const canKeep = !isSpinning && recentSelections.length > 0 && getOpenKeeperSlots() > 0;
    keeperButton.disabled = !canKeep;
    keeperButton.classList.toggle('keeper-btn-disabled', !canKeep);
    keeperButton.classList.toggle('keeper-btn-hidden', !hasSelectedMovie);
}

function discardKeeperPick(slotIndex) {
    if (isSpinning || isDiscardingKeeper) return;
    if (slotIndex < 0 || slotIndex >= keeperPicks.length) return;

    const keeperItems = document.querySelectorAll('#keeper-slots .keeper-item');
    const item = keeperItems[slotIndex];
    if (!item || !item.classList.contains('filled')) return;

    const entry = keeperPicks[slotIndex];
    keeperUiGeneration += 1;
    const discardGeneration = keeperUiGeneration;

    isDiscardingKeeper = true;

    keeperPicks.splice(slotIndex, 1);
    recentSelections.unshift(entry.label);
    if (recentSelections.length > 3) recentSelections.pop();

    updateRecentSelectionsUI();
    updateKeeperButtonState();
    updateKeeperPicksUI(false);

    setTimeout(() => {
        if (keeperUiGeneration !== discardGeneration) return;
        isDiscardingKeeper = false;
        updateKeeperPicksUI(false);
    }, 380);
}

function pickRandomKeeperEntries(count = 3) {
    const candidates = [];
    for (const category of Object.keys(movieDatabase)) {
        const categoryParts = category.split(' ');
        const categoryEmoji = categoryParts[categoryParts.length - 1];
        for (const movie of movieDatabase[category]) {
            candidates.push({
                label: `${categoryEmoji} ${movie}`,
                runtimeMinutes: getMovieRuntimeMinutes(movie)
            });
        }
    }

    const picked = [];
    const pool = [...candidates];
    while (picked.length < count && pool.length > 0) {
        const index = Math.floor(Math.random() * pool.length);
        picked.push(pool.splice(index, 1)[0]);
    }

    return picked.map(({ label, runtimeMinutes }) => ({
        label,
        poster: null,
        runtimeMinutes
    }));
}

function populateKeeperPicksDevShortcut() {
    keeperUiGeneration += 1;
    isDiscardingKeeper = false;
    keeperPicks = pickRandomKeeperEntries(3);
    keeperPicks.forEach(applyKeeperPosterFromMetadata);
    updateKeeperPicksUI(false);
}

function makeItAKeeper() {
    if (isSpinning || isDiscardingKeeper) return;

    if (keeperPicks.length >= 3) {
        alert('Keeper collection is full! All 3 slots are taken.');
        return;
    }

    if (recentSelections.length === 0) return;

    keeperUiGeneration += 1;
    const keepGeneration = keeperUiGeneration;

    playKeeperSound(keeperPicks.length + 1);

    const keeperButton = document.getElementById('keeper-button');
    if (keeperButton) {
        keeperButton.disabled = true;
        keeperButton.classList.add('keeper-btn-disabled');
    }

    const firstHistoryItem = document.querySelector('.history-item:not(.empty)');
    if (firstHistoryItem) {
        firstHistoryItem.classList.add('exiting');
    }

    setTimeout(() => {
        if (keeperUiGeneration !== keepGeneration) return;

        const movie = recentSelections.shift();
        const keeperEntry = {
            label: movie,
            poster: null,
            runtimeMinutes: getMovieRuntimeMinutes(movie)
        };
        keeperPicks.push(keeperEntry);

        applyKeeperPosterFromMetadata(keeperEntry);

        updateRecentSelectionsUI();
        updateKeeperPicksUI(true);
        updateKeeperButtonState();
    }, 380);
}

function buildKeeperUI() {
    const arcadeContainer = document.getElementById('arcade-container');
    if (!arcadeContainer || document.getElementById('keeper-button')) return;

    const keeperButton = document.createElement('button');
    keeperButton.id = 'keeper-button';
    keeperButton.className = 'arcade-btn keeper-btn keeper-btn-disabled keeper-btn-hidden';
    keeperButton.type = 'button';
    keeperButton.disabled = true;
    keeperButton.setAttribute('aria-label', 'Make it a Keeper');
    keeperButton.innerHTML = '<span class="keeper-btn-label">KEEP</span>';
    keeperButton.addEventListener('click', makeItAKeeper);
    arcadeContainer.appendChild(keeperButton);

    const keeperStage = document.createElement('div');
    keeperStage.id = 'keeper-stage';

    const scaleWrap = document.createElement('div');
    scaleWrap.id = 'keeper-deck-scale-wrap';

    const keeperDeck = document.createElement('div');
    keeperDeck.id = 'keeper-deck';
    keeperDeck.innerHTML = `
        <div id="keeper-header">
            <span id="keeper-total-runtime" hidden></span>
        </div>
        <ul id="keeper-slots">
            <li class="keeper-item empty"></li>
            <li class="keeper-item empty"></li>
            <li class="keeper-item empty"></li>
        </ul>
    `;
    const keeperSlots = keeperDeck.querySelector('#keeper-slots');
    keeperSlots.addEventListener('dblclick', (event) => {
        const poster = event.target.closest('.keeper-poster');
        if (!poster) return;
        const item = poster.closest('.keeper-item');
        if (!item || !item.classList.contains('filled')) return;
        const items = [...keeperSlots.querySelectorAll('.keeper-item')];
        discardKeeperPick(items.indexOf(item));
    });

    scaleWrap.appendChild(keeperDeck);
    keeperStage.appendChild(scaleWrap);

    const ticketStubsControls = document.createElement('div');
    ticketStubsControls.id = 'ticket-stubs-controls';
    ticketStubsControls.hidden = true;

    const ticketStubsButton = document.createElement('button');
    ticketStubsButton.id = 'ticket-stubs-button';
    ticketStubsButton.type = 'button';
    ticketStubsButton.setAttribute('aria-label', 'Get Ticket Stubs');
    ticketStubsButton.title = 'Get Ticket Stubs';

    const ticketStubsImage = document.createElement('img');
    ticketStubsImage.src = 'ticket_dispenser.png';
    ticketStubsImage.alt = '';
    ticketStubsImage.setAttribute('aria-hidden', 'true');
    ticketStubsImage.draggable = false;
    ticketStubsButton.appendChild(ticketStubsImage);

    ticketStubsButton.addEventListener('click', showTicketStubsMessage);

    const ticketStubsPanel = document.createElement('div');
    ticketStubsPanel.id = 'ticket-stubs-panel';
    ticketStubsPanel.hidden = true;

    const ticketStubsPanelPaper = document.createElement('div');
    ticketStubsPanelPaper.className = 'ticket-stubs-panel-paper';

    for (let stubIndex = 0; stubIndex < 3; stubIndex += 1) {
        const ticketStub = document.createElement('div');
        ticketStub.className = 'ticket-stub';

        const ticketStubShape = document.createElement('div');
        ticketStubShape.className = 'ticket-stub-shape';
        ticketStub.appendChild(ticketStubShape);

        const ticketStubTitle = document.createElement('div');
        ticketStubTitle.className = 'ticket-stub-title';

        const ticketStubIconLeft = document.createElement('span');
        ticketStubIconLeft.className = 'ticket-stub-icon';
        ticketStubIconLeft.setAttribute('aria-hidden', 'true');
        ticketStubTitle.appendChild(ticketStubIconLeft);

        const ticketStubTitleText = document.createElement('span');
        ticketStubTitleText.className = 'ticket-stub-title-text';
        ticketStubTitle.appendChild(ticketStubTitleText);

        const ticketStubIconRight = document.createElement('span');
        ticketStubIconRight.className = 'ticket-stub-icon';
        ticketStubIconRight.setAttribute('aria-hidden', 'true');
        ticketStubTitle.appendChild(ticketStubIconRight);

        ticketStub.appendChild(ticketStubTitle);
        ticketStubsPanelPaper.appendChild(ticketStub);
    }

    const ticketStubsCopy = document.createElement('button');
    ticketStubsCopy.id = 'ticket-stubs-copy';
    ticketStubsCopy.type = 'button';
    ticketStubsCopy.textContent = 'Copy to Clipboard';
    ticketStubsCopy.addEventListener('click', copyTicketStubsPrompt);

    const ticketStubsCopyStatus = document.createElement('span');
    ticketStubsCopyStatus.id = 'ticket-stubs-copy-status';
    ticketStubsCopyStatus.setAttribute('aria-live', 'polite');

    ticketStubsPanel.appendChild(ticketStubsPanelPaper);
    ticketStubsPanel.appendChild(ticketStubsCopy);
    ticketStubsPanel.appendChild(ticketStubsCopyStatus);

    ticketStubsControls.appendChild(ticketStubsButton);
    keeperStage.appendChild(ticketStubsControls);
    document.body.appendChild(ticketStubsPanel);

    ensureTicketStubsPanelPositionListeners();
    void loadTicketStubsPrintMetadata();
    void loadTicketStubsShredMetadata();

    arcadeContainer.appendChild(keeperStage);
}

function buildCategoryFilterUI() {
    const container = document.getElementById('category-filter-options');
    Object.keys(movieDatabase).forEach((categoryName) => {
        const label = document.createElement('label');
        label.className = 'category-filter-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.dataset.category = categoryName;
        checkbox.addEventListener('change', () => toggleCategory(categoryName));
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + categoryName));
        container.appendChild(label);
    });
}

buildCategoryFilterUI();

buildRuntimeFilterUI();

buildDecadeFilterUI();

updateSpinBlockerUI();

buildKeeperUI();

buildAddMovieUI();

updateKeeperPicksUI();

updateAudioControlButtons();

updateKeeperButtonState();

ensureSpinButtonFallbackAudio();
void loadSpinButtonBuffer();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        stopCabinetAudio();
        return;
    }

    if (event.repeat || !event.shiftKey || (event.key !== 'p' && event.key !== 'P')) return;

    const target = event.target;
    if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'SELECT') return;
        if (tag === 'TEXTAREA' && !target.readOnly) return;
        if (target.isContentEditable) return;
    }

    event.preventDefault();
    populateKeeperPicksDevShortcut();
});
