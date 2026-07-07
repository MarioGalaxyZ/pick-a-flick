// Fully calibrated movie lists + Prospector Pete logic integration

    // --- MOVIE DATABASE ---

    const movieDatabase = {

        "ALIEN ALLEY 👽": [
            "Alien (1979)",
            "Alien (Series)", 
            "Aliens (1986)", 
            "Annihilation (2018)",
            "Close Encounters of the Third Kind (1977)",
            "District 9 (2009)", 
            "E.T. the Extra Terrestrial (1982)",
            "Evolution (2001)", 
            "Meet Dave (2008)", 
            "Men in Black (Series)", 
            "The Hitchhiker's Guide to the Galaxy (2005)",
            "They Live (1988)", 
            "Project Hail Mary (2026)",
            "Mars Attacks! (1996)",
            "Signs (2002)",
            "War of the Worlds (2005)"
        ],
        
        "ANIMATION STATION 👾": [
            "Anastasia (1997)", 
            "Atlantis: The Lost Empire (2001)", 
            "Osmosis Jones (2001)", 
            "Over the Hedge (2006)", 
            "The Croods (2013)", 
            "The Curse of the Were-Rabbit (2005)", 
            "The Last Unicorn (1982)", 
            "The Rescuers (1977)", 
            "The Secret of NIMH (1982)", 
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
            "Chicken Run: Dawn of the Nugget (2023)",
            "Rango (2011)",
            "Robots (2005)",
            "Shrek (2001)",
            "Sonic the Hedgehog (2020)",
            "The Iron Giant (1999)",
            "The SpongeBob SquarePants Movie (2004)",
            "The Super Mario Bros. Movie (2023)",
            "The Tune (1992)",
            "We're Back! A Dinosaur's Story (1993)",
            "Wreck-It Ralph (2012)"
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
            "Willy's Wonderland (2021)",
            "Arcadian (2024)",
            "Bringing Out the Dead (1999)",
            "Peggy Sue Got Married (1986)",
            "Raising Arizona (1987)",
            "Red Rock West (1993)",
            "Snake Eye (1998)"
        ],
        
        "CARREY'S CHARACTERS 🎭": [
            "Batman Forever (1995)",
            "Dumb and Dumber To (2014)", 
            "Earth Girls Are Easy (1988)", 
            "Fun with Dick and Jane (2005)", 
            "Horton Hears a Who! (2008)",
            "Liar Liar (1997)", 
            "Me, Myself & Irene (2000)",
            "Mr. Popper's Penguins (2011)", 
            "The Bad Batch (2016)",
            "The Incredible Burt Wonderstone (2013)",
            "The Majestic (2001)",
            "The Number 23 (2007)",
            "Yes Man (2008)",
            "Dark Crimes (2018)",
            "Dumb and Dumber (1994)",
            "I Love You Phillip Morris (2009)",
            "Man On The Moon (1999)",
            "Once Bitten (1985)",
            "Sonic the Hedgehog 3 (2024)",
            "The Cable Guy (1996)",
            "The Mask (1994)",
            "The Truman Show (1998)"
        ],
        
        "KAUFMAN'S KORNER 🌞": [
            "Confessions of a Dangerous Mind (2002)", 
            "Eternal Sunshine of the Spotless Mind (2004)", 
            "Human Nature (2001)", 
            "Orion And The Dark (2024)", 
            "Adaptation. (2002)",
            "Anomalisa (2015)",
            "Being John Malkovich (1999)",
            "I'm Thinking of Ending Things (2020)",
            "Synecdoche, New York (2008)"
        ],
        
        "MOVIES TO FALL ASLEEP TO 💤": [
            "28 Years Later (2025)",
            "28 Years Later: The Bone Temple (2026)",
            "After Hours (1985)",
            "Beau is Afraid (2023)",
            "Brazil (1985)",
            "Crank (2006)",
            "Evil Dead II (1987)",
            "Good Boy (2025)",
            "Heretic (2024)",
            "Jacob's Ladder (1990)",
            "Mandy (2018)",
            "Midsommar (2019)",
            "Natural Born Killers (1994)",
            "Obsession (2025)",
            "Possessor (2020)",
            "Predator (1987)",
            "Sicario (2015)",
            "The King of Comedy (1982)",
            "The Northman (2022)",
            "The Sixth Sense (1999)",
            "The Sweet East (2023)",
            "Green Room (2015)",
            "Mad Max ALL MOVIES (1979)"
        ],
        
        "MUSIC MOUNTAIN ⛰️": [
            "20,000 Days on Earth (2014)", 
            "24 Hour Party People (2002)", 
            "A Complete Unknown (2024)", 
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
            "Walk the Line (2005)",
            "Amadeus (1984)",
            "Someday (2003)",
            "Tenacious D in The Pick of Destiny (2006)"
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
            "The Boxtrolls (2014)",
            "Absolutely Anything (2015)",
            "Nandor Fodor and the Talking Mongoose (2023)",
            "Ready Player One (2018)",
            "Run Fatboy Run (2007)",
            "The World's End (2013)"
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
            "Bill & Ted's Bogus Journey (1991)",
            "Ip Man 2 (2010)",
            "Ip Man 3 (2015)",
            "Ip Man 4: The Finale (2019)",
            "Master Z: Ip Man Legacy (2018)",
            "Master Z: Ip Man Legacy (2020)",
            "Ralph Breaks the Internet (2018)",
            "Son of the Mask (2005)",
            "Sonic the Hedgehog 2 (2022)",
            "Shrek 2 (2004)",
            "The Super Mario Galaxy Movie (2026)"
        ],
        
        "WACKY WAY 🤪": [
            "Batteries Not Included (1987)", 
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
            "Hundreds of Beavers (2022)",
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
            "Mega Time Squad (2019)",
            "Attack of the Killer Tomatoes (1978)",
            "The Man with Two Brains (1983)",
            "The Borrowers (1998)",
            "Big Trouble in Little China (1986)",
            "Bill & Ted's Excellent Adventure (1989)",
            "Colour Me Kubrick (2005)",
            "Freaked (1993)",
            "Game Night (2018)",
            "Rollerball (1975)",
            "Strawberry Mansion (2021)",
            "The Adventures of Buckaroo Banzai Across the 8th Dimension (1984)",
            "The Country Bears (2002)",
            "The Velocipastor (2018)",
            "Zombeavers (2014)"
        ],
        
        "ZEMECKIS ZONE 🐇": [
            "Back to the Future (1985)",
            "Beowulf (2007)", 
            "Cast Away (2000)",
            "Contact (1997)",
            "Death Becomes Her (1992)",
            "Flight (2012)", 
            "I Wanna Hold Your Hand (1978)",
            "Romancing the Stone (1984)",
            "Used Cars (1980)",
            "Who Framed Roger Rabbit (1988)"
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
            "The Yards (2000)",
            "8MM (1999)"
        ],

        "FOREIGN EMBASSY 🌐": [
            "Parasite (2019)",
            "Shaolin Soccer (2001)", "A Town Called Panic (2009)", "Heavy Trip (2018)",
            "Peppermint Candy (1999)", "City of God (2002)", "No Other Choice (2025)",
            "Another Round (2020)", "Save the Green Planet! (2003)",
            "Alienoid (2022)", "Crouching Tiger Hidden Dragon (2000)", "La Haine (1995)",
            "Delicatessen (1991)",
            "Kung Fu Yoga (2017)",
            "Ip Man (2008)",
            "The Way of the Dragon (1972)",
            "Train to Busan (2016)"
        ],
        
        "TUMBLEWEED TURNPIKE 🏜️": [
            "Unforgiven (1992)", "True Grit (2010)",
            "3:10 to Yuma (2007)", "Slow West (2015)", "Man of the West (1958)",
            "The Assassination of Jesse James by the Coward Robert Ford (2007)",
            "Hell or High Water (2016)",
            "The Last Stop in Yuma County (2024)",
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

    // --- FILTERS ---

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

    // --- WATCHED MOVIES ---

    let includeWatchedMovies = false;
    let useUndeadWheelDisc = false;
    let watchedMovieSet = new Set();
    let watchedMoviesFileHandle = null;

    const WATCHED_FILE_HANDLE_DB_NAME = 'pick-a-flick-watched';
    const WATCHED_FILE_HANDLE_STORE = 'handles';
    const WATCHED_FILE_HANDLE_KEY = 'watched-movies';

    function isFileSystemAccessSupported() {
        return typeof window.showOpenFilePicker === 'function';
    }

    function openWatchedFileHandleDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(WATCHED_FILE_HANDLE_DB_NAME, 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = () => {
                request.result.createObjectStore(WATCHED_FILE_HANDLE_STORE);
            };
        });
    }

    async function loadWatchedMoviesFileHandle() {
        if (!isFileSystemAccessSupported()) return;

        try {
            const db = await openWatchedFileHandleDb();
            const handle = await new Promise((resolve, reject) => {
                const tx = db.transaction(WATCHED_FILE_HANDLE_STORE, 'readonly');
                const req = tx.objectStore(WATCHED_FILE_HANDLE_STORE).get(WATCHED_FILE_HANDLE_KEY);
                req.onsuccess = () => resolve(req.result ?? null);
                req.onerror = () => reject(req.error);
            });
            db.close();
            if (handle) {
                watchedMoviesFileHandle = handle;
            }
        } catch (err) {
            console.log('Could not restore watched file handle:', err);
        }
    }

    async function storeWatchedMoviesFileHandle(handle) {
        const db = await openWatchedFileHandleDb();
        await new Promise((resolve, reject) => {
            const tx = db.transaction(WATCHED_FILE_HANDLE_STORE, 'readwrite');
            tx.objectStore(WATCHED_FILE_HANDLE_STORE).put(handle, WATCHED_FILE_HANDLE_KEY);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
        db.close();
    }

    async function writeWatchedMoviesToHandle(handle, content) {
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    async function ensureWatchedMoviesFileHandle(allowPrompt = true) {
        if (!isFileSystemAccessSupported()) return null;

        if (watchedMoviesFileHandle) {
            const permission = await watchedMoviesFileHandle.queryPermission({ mode: 'readwrite' });
            if (permission === 'granted') {
                return watchedMoviesFileHandle;
            }
            if (permission === 'prompt' && allowPrompt) {
                const requested = await watchedMoviesFileHandle.requestPermission({ mode: 'readwrite' });
                if (requested === 'granted') {
                    return watchedMoviesFileHandle;
                }
            }
            if (!allowPrompt) {
                return null;
            }
        }

        if (!allowPrompt) return null;

        const [handle] = await window.showOpenFilePicker({
            types: [{
                description: 'JavaScript',
                accept: { 'application/javascript': ['.js'] },
            }],
            multiple: false,
        });
        watchedMoviesFileHandle = handle;
        await storeWatchedMoviesFileHandle(handle);
        return handle;
    }

    async function saveWatchedMoviesFile(allowPrompt = true) {
        window.watchedMovieListings = [...watchedMovieSet];
        const content = buildWatchedMoviesFileContent();

        if (!isFileSystemAccessSupported()) {
            downloadWatchedMoviesFile(content);
            return;
        }

        try {
            const handle = await ensureWatchedMoviesFileHandle(allowPrompt);
            if (!handle) {
                downloadWatchedMoviesFile(content);
                return;
            }
            await writeWatchedMoviesToHandle(handle, content);
            showWatchedSaveStatus('Saved watched-movies.js.');
        } catch (err) {
            if (err?.name === 'AbortError') {
                downloadWatchedMoviesFile(content);
                return;
            }
            console.log('Watched file save failed:', err);
            downloadWatchedMoviesFile(content);
        }
    }

    async function linkWatchedMoviesSaveFile() {
        if (!isFileSystemAccessSupported()) {
            showWatchedSaveStatus('Direct save not supported in this browser. Use downloaded file.');
            return;
        }

        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{
                    description: 'JavaScript',
                    accept: { 'application/javascript': ['.js'] },
                }],
                multiple: false,
            });
            watchedMoviesFileHandle = handle;
            await storeWatchedMoviesFileHandle(handle);
            await saveWatchedMoviesFile(false);
            showWatchedSaveStatus('Linked and saved watched-movies.js.');
        } catch (err) {
            if (err?.name === 'AbortError') return;
            console.log('Could not link watched file:', err);
            showWatchedSaveStatus('Could not link save file.');
        }
    }

    function initWatchedMovies() {
        const listings = Array.isArray(window.watchedMovieListings)
            ? window.watchedMovieListings
            : [];
        watchedMovieSet = new Set(
            listings.filter((item) => typeof item === 'string' && item.trim())
        );
    }

    function isMovieWatched(listing) {
        return watchedMovieSet.has(listing);
    }

    function moviePassesWatchedFilter(listing) {
        if (includeWatchedMovies) return true;
        return !isMovieWatched(listing);
    }

    function getWatchedMoviesInCatalog() {
        const inCatalog = [];
        for (const listing of watchedMovieSet) {
            for (const movies of Object.values(movieDatabase)) {
                if (movies.includes(listing)) {
                    inCatalog.push(listing);
                    break;
                }
            }
        }
        return inCatalog.sort((a, b) => a.localeCompare(b));
    }

    function findListingCategory(listing) {
        for (const [category, movies] of Object.entries(movieDatabase)) {
            if (movies.includes(listing)) return category;
        }
        return null;
    }

    function buildWatchedMoviesFileContent() {
        const sorted = [...watchedMovieSet].sort((a, b) => a.localeCompare(b));
        const lines = sorted.map(
            (listing) => `    "${listing.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}",`
        );
        return `// Personal watched list for Pick A Flick — edit via the app or by hand.
window.watchedMovieListings = [
${lines.join('\n')}
];
`;
    }

    function showWatchedSaveStatus(message) {
        const status = document.getElementById('watched-save-status');
        if (!status) return;
        status.textContent = message;
        if (message) {
            window.setTimeout(() => {
                if (status.textContent === message) {
                    status.textContent = '';
                }
            }, 5000);
        }
    }

    function downloadWatchedMoviesFile(content = buildWatchedMoviesFileContent()) {
        const blob = new Blob([content], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'watched-movies.js';
        link.click();
        URL.revokeObjectURL(url);
        showWatchedSaveStatus('Save downloaded file to your Pick A Flick folder to keep changes.');
    }

    function persistWatchedMovies() {
        void saveWatchedMoviesFile(true);
    }

    function markMoviesAsWatched(listings) {
        let changed = false;
        listings.forEach((listing) => {
            if (!listing || watchedMovieSet.has(listing)) return;
            watchedMovieSet.add(listing);
            changed = true;
        });
        if (!changed) return;
        updateWatchedFilterUI();
        resetMovieSelectionPools();
        updateSpinBlockerUI();
        persistWatchedMovies();
    }

    function unmarkMovieAsWatched(listing) {
        if (!watchedMovieSet.has(listing)) return;
        watchedMovieSet.delete(listing);
        updateWatchedFilterUI();
        resetMovieSelectionPools();
        updateSpinBlockerUI();
        persistWatchedMovies();
    }

    function setIncludeWatchedMovies(include) {
        includeWatchedMovies = include;
        const checkbox = document.getElementById('include-watched-checkbox');
        if (checkbox) checkbox.checked = include;
        resetMovieSelectionPools();
        updateSpinBlockerUI();
    }

    function resetWatchedFilter() {
        setIncludeWatchedMovies(false);
    }

    function buildWatchedFilterUI() {
        const checkbox = document.getElementById('include-watched-checkbox');
        if (!checkbox) return;
        checkbox.checked = includeWatchedMovies;
        checkbox.addEventListener('change', () => {
            setIncludeWatchedMovies(checkbox.checked);
        });
        updateWatchedFilterUI();
    }

    function applyWheelDiscArt() {
        const disc = document.getElementById('wheel-disc');
        if (!disc) return;
        disc.classList.toggle('wheel-disc-undead', useUndeadWheelDisc);
    }

    function setUseUndeadWheelDisc(enabled) {
        useUndeadWheelDisc = enabled;
        const checkbox = document.getElementById('undead-wheel-checkbox');
        if (checkbox) checkbox.checked = enabled;
        applyWheelDiscArt();
    }

    function buildWheelArtToggleUI() {
        const checkbox = document.getElementById('undead-wheel-checkbox');
        if (!checkbox) return;
        checkbox.checked = useUndeadWheelDisc;
        checkbox.addEventListener('change', () => {
            setUseUndeadWheelDisc(checkbox.checked);
        });
        applyWheelDiscArt();
    }

    function buildFilterPanelToggles() {
        const panels = [
            { panel: 'runtime-filter', label: 'runtime filter' },
            { panel: 'decade-filter', label: 'decade filter' },
            { panel: 'watched-filter', label: 'watched filter' },
            { panel: 'wheel-art-toggle', label: 'wheel art' },
        ];
        panels.forEach(({ panel, label }) => {
            const root = document.getElementById(panel);
            const btn = root?.querySelector('.filter-panel-emblem');
            const body = root?.querySelector('.filter-panel-body');
            if (!root || !btn || !body) return;
            btn.addEventListener('click', () => {
                const collapsed = root.classList.toggle('is-collapsed');
                body.hidden = collapsed;
                btn.setAttribute('aria-expanded', String(!collapsed));
            });
        });
    }

    function getEligibleMovies(category) {
        return movieDatabase[category].filter(
            (listing) =>
                moviePassesRuntimeFilter(listing) &&
                moviePassesDecadeFilter(listing) &&
                moviePassesWatchedFilter(listing)
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
        resetWatchedFilter();
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

    // --- CATEGORY FILTER AND SPIN STATE ---

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
        resetMovieSelectionPools();
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
        resetMovieSelectionPools();
        updateSpinBlockerUI();
    }

    const totalSlices = 16;

    const degreesPerSlice = 360 / totalSlices; 

    let isSpinning = false;

    let currentRotation = 0; 

    

    let introEnabled = false;

    let victoryEnabled = true;

    let revealMode = 'classic';
    let modeDialRotationDeg = 0;

    let pendingSpinReveal = null;

    const REVEAL_TIMING = {
        classic: { postWheelMs: 800, selectionMs: 1500, spinDurationMs: 4000, victoryLeadMs: 1000 },
        snappy: { postWheelMs: 0, selectionMs: 0, spinDurationMs: 4000, victoryLeadMs: 1000 },
        speedRun: { postWheelMs: 0, selectionMs: 0, spinDurationMs: 1000, victoryAtSpinStart: true },
        pinball: { postWheelMs: 0, selectionMs: 0, spinDurationMs: 4500, victoryLeadMs: 1000 }
    };

    const SNAPPY_HOLD_INSTANT_MS = 100;
    const SNAPPY_SPIN_MAX_MS = 10000;
    const SNAPPY_SPIN_MULT_MIN = 1.3;
    const SNAPPY_SPIN_MULT_MAX = 3.6;
    const SNAPPY_SPIN_MULT_TAU_MS = 217;
    const SNAPPY_SPIN_CURVE_POWER = 0.48;

    function getSnappySpinHoldMultiplier(holdMs) {
        if (holdMs < SNAPPY_HOLD_INSTANT_MS) return SNAPPY_SPIN_MULT_MIN;
        const elapsed = holdMs - SNAPPY_HOLD_INSTANT_MS;
        const progress = 1 - Math.exp(-elapsed / SNAPPY_SPIN_MULT_TAU_MS);
        const aggressive = Math.pow(progress, SNAPPY_SPIN_CURVE_POWER);
        return SNAPPY_SPIN_MULT_MIN + (SNAPPY_SPIN_MULT_MAX - SNAPPY_SPIN_MULT_MIN) * aggressive;
    }

    function getSnappySpinDurationFromHoldMs(holdMs) {
        if (holdMs < SNAPPY_HOLD_INSTANT_MS) return 0;
        return Math.min(
            Math.round(holdMs * getSnappySpinHoldMultiplier(holdMs)),
            SNAPPY_SPIN_MAX_MS
        );
    }

    function getSnappySpinDurationFromGaugeRatio(releaseRatio, holdMs) {
        if (holdMs < SNAPPY_HOLD_INSTANT_MS) return 0;
        return Math.round(Math.max(0, Math.min(1, releaseRatio)) * SNAPPY_SPIN_MAX_MS);
    }

    function getSnappySpinDurationEstimateMs(holdMs) {
        if (holdMs < SNAPPY_HOLD_INSTANT_MS) return 0;
        return Math.min(holdMs * getSnappySpinHoldMultiplier(holdMs), SNAPPY_SPIN_MAX_MS);
    }

    function getSnappyPowerGaugeRiseRatio(holdMs) {
        if (holdMs <= 0) return 0;
        if (holdMs < SNAPPY_HOLD_INSTANT_MS) {
            const thresholdRatio = (SNAPPY_HOLD_INSTANT_MS * SNAPPY_SPIN_MULT_MIN) / SNAPPY_SPIN_MAX_MS;
            return (holdMs / SNAPPY_HOLD_INSTANT_MS) * thresholdRatio;
        }
        return getSnappySpinDurationEstimateMs(holdMs) / SNAPPY_SPIN_MAX_MS;
    }

    function getSnappyGaugePingPongRatio(cycleMs) {
        const phase = (cycleMs % SNAPPY_GAUGE_CYCLE_MS) / SNAPPY_GAUGE_CYCLE_MS;
        return Math.abs(phase * 2 - 1);
    }

    const WHEEL_TUNING_OFFSET = 15;
    const PINBALL_HOLD_MIN_MS = 100;
    const PINBALL_HOLD_MAX_MS = 2500;
    const PINBALL_MIN_POWER_RATIO = 0.08;
    const PINBALL_MAX_OMEGA_DEG_S = 900;
    const PINBALL_DECEL_DEG_S2 = 200;
    const PINBALL_CREEP_OMEGA_DEG_S = 25;
    const PINBALL_CREEP_MIN_MS = 400;
    const PINBALL_CREEP_MAX_MS = 1800;
    const PINBALL_CREEP_DURATION_MULT = 1.6;
    const PINBALL_SETTLE_MIN_MS = 150;
    const PINBALL_SETTLE_MAX_MS = 350;

    function normalizeRotationDeg(rotationDeg) {
        return ((rotationDeg % 360) + 360) % 360;
    }

    function shortestDeltaDeg(fromMod, toMod) {
        const from = normalizeRotationDeg(fromMod);
        const to = normalizeRotationDeg(toMod);
        let delta = (to - from + 360) % 360;
        if (delta > 180) delta -= 360;
        return delta;
    }

    function getSliceCenterDegrees(categoryIndex) {
        return (360 - (categoryIndex * degreesPerSlice) - (degreesPerSlice / 2) + WHEEL_TUNING_OFFSET + 360) % 360;
    }

    function getCategoryIndexAtPointer(rotationMod360) {
        const r = normalizeRotationDeg(rotationMod360);
        let bestIndex = 0;
        let bestDist = Infinity;
        for (let i = 0; i < totalSlices; i++) {
            const center = getSliceCenterDegrees(i);
            const dist = Math.abs(shortestDeltaDeg(center, r));
            if (dist < bestDist) {
                bestDist = dist;
                bestIndex = i;
            }
        }
        return bestIndex;
    }

    function getAbsoluteRotationForSliceCenter(categoryIndex, absoluteRotation) {
        const targetMod = getSliceCenterDegrees(categoryIndex);
        const baseMod = normalizeRotationDeg(absoluteRotation);
        const delta = shortestDeltaDeg(baseMod, targetMod);
        return absoluteRotation + delta;
    }

    function isCategorySpinEligible(categoryName) {
        return activeCategories.includes(categoryName) && getEligibleMovies(categoryName).length > 0;
    }

    function findNextEligibleCategoryClockwise(fromIndex) {
        for (let step = 1; step <= totalSlices; step++) {
            const idx = (fromIndex + step) % totalSlices;
            if (isCategorySpinEligible(categories[idx])) {
                return idx;
            }
        }
        return fromIndex;
    }

    function clockwiseDeltaDegrees(fromMod, toMod) {
        const from = ((fromMod % 360) + 360) % 360;
        const to = ((toMod % 360) + 360) % 360;
        const delta = (to - from + 360) % 360;
        return delta === 0 ? 0 : delta;
    }

    function verifyPinballLanding(plan) {
        const landedIndex = getCategoryIndexAtPointer(currentRotation);
        if (landedIndex !== plan.targetIndex) {
            console.warn('[Pinball] pointer/category mismatch', {
                landedIndex,
                targetIndex: plan.targetIndex,
                currentRotation
            });
        }
    }

    function computePinballSpinPlan(holdMs, releaseRatio) {
        const powerRatio = Math.max(0, Math.min(1, releaseRatio));
        const baseRotation = currentRotation;
        const omega0 = powerRatio * PINBALL_MAX_OMEGA_DEG_S;
        const decel = PINBALL_DECEL_DEG_S2;
        const naturalDelta = (omega0 * omega0) / (2 * decel);
        const mainDurationMs = omega0 > 0 ? (omega0 / decel) * 1000 : 0;
        const naturalEnd = baseRotation + naturalDelta;

        const naturalIndex = getCategoryIndexAtPointer(naturalEnd);
        const naturalCategory = categories[naturalIndex];
        let targetIndex = naturalIndex;
        let creepDelta = 0;
        let creepDurationMs = 0;
        let needsCreep = false;

        if (!isCategorySpinEligible(naturalCategory)) {
            targetIndex = findNextEligibleCategoryClockwise(naturalIndex);
            const targetCenterMod = getSliceCenterDegrees(targetIndex);
            const naturalMod = normalizeRotationDeg(naturalEnd);
            creepDelta = clockwiseDeltaDegrees(naturalMod, targetCenterMod);
            if (creepDelta === 0) {
                creepDelta = degreesPerSlice;
            }
            needsCreep = true;
            creepDurationMs = Math.min(
                PINBALL_CREEP_MAX_MS,
                Math.max(
                    PINBALL_CREEP_MIN_MS,
                    (creepDelta / PINBALL_CREEP_OMEGA_DEG_S) * 1000 * PINBALL_CREEP_DURATION_MULT
                )
            );
        }

        const settleFrom = needsCreep ? naturalEnd + creepDelta : naturalEnd;
        const settledDegrees = getAbsoluteRotationForSliceCenter(targetIndex, settleFrom);
        const settleDelta = settledDegrees - settleFrom;
        const settleDurationMs = settleDelta === 0 ? 0 : Math.min(
            PINBALL_SETTLE_MAX_MS,
            Math.max(PINBALL_SETTLE_MIN_MS, Math.abs(settleDelta) * 18)
        );
        const selectedCategory = categories[targetIndex];

        return {
            baseRotation,
            omega0,
            decel,
            naturalDelta,
            naturalEnd,
            mainDurationMs,
            creepDelta,
            creepDurationMs,
            needsCreep,
            settleFrom,
            settleDelta,
            settleDurationMs,
            finalDegrees: settledDegrees,
            selectedCategory,
            targetIndex,
            totalDurationMs: mainDurationMs + creepDurationMs + settleDurationMs
        };
    }

    function isInstantRevealMode() {
        return revealMode === 'snappy' || revealMode === 'speedRun' || revealMode === 'pinball';
    }

    function isSpeedRunMode() {
        return revealMode === 'speedRun';
    }

    // --- CORE AUDIO ---

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let currentIntroAudio = null;

    let currentVictoryAudio = null;

    let currentKeeperAudios = [];

    const spinButtonPressClipPath = window.uiAudioPaths.spinButtonPress;
    const spinButtonReleaseClipPath = window.uiAudioPaths.spinButtonRelease;

    const spinButtonClipState = {
        press: { clipPath: spinButtonPressClipPath, buffer: null, bufferPromise: null, fallbackAudio: null },
        release: { clipPath: spinButtonReleaseClipPath, buffer: null, bufferPromise: null, fallbackAudio: null }
    };

    const SPIN_BUTTON_RELEASE_AUDIO_DELAY_MS = 150;
    const CLASSIC_SPIN_BUTTON_RELEASE_EXTRA_DURATION_SEC = 0.3;
    const CLASSIC_RELEASE_SKIP_PHASE_RATIO = 0.2;
    const CLASSIC_RELEASE_SKIP_SPEED_MULT = 4;
    let spinButtonReleaseAudioTimeout = null;
    let spinButtonReleaseReturnCleanup = null;

    function getSpinButtonReleaseDelayMs() {
        return SPIN_BUTTON_RELEASE_AUDIO_DELAY_MS;
    }

    function getSpinButtonReleaseClipDurationSec() {
        const releaseState = spinButtonClipState.release;
        return releaseState.buffer?.duration
            ?? (Number.isFinite(releaseState.fallbackAudio?.duration) ? releaseState.fallbackAudio.duration : 0);
    }

    function getSpinButtonReleasePlaybackRate(durationSec) {
        if (revealMode !== 'classic') return 1;
        if (!durationSec || durationSec <= 0) return 1;
        return durationSec / (durationSec + CLASSIC_SPIN_BUTTON_RELEASE_EXTRA_DURATION_SEC);
    }

    function getSpinButtonReleaseAnimationDurationMs(durationSec) {
        if (revealMode !== 'classic') return null;
        if (!durationSec || durationSec <= 0) return 1000;
        return Math.round((durationSec + CLASSIC_SPIN_BUTTON_RELEASE_EXTRA_DURATION_SEC) * 1000);
    }

    function clearClassicSpinButtonReleaseAnimation(wrap = document.getElementById('spin-button-wrap')) {
        if (!wrap) return;
        if (spinButtonReleaseReturnCleanup) {
            wrap.removeEventListener('animationend', spinButtonReleaseReturnCleanup);
            spinButtonReleaseReturnCleanup = null;
        }
        wrap.classList.remove('is-release-return');
    }

    function cancelClassicSpinButtonReleaseReturn() {
        const wrap = document.getElementById('spin-button-wrap');
        clearClassicSpinButtonReleaseAnimation(wrap);
        wrap?.classList.remove('is-pressed');
    }

    function beginClassicSpinButtonReleaseReturn(wrap, animationMs) {
        if (!wrap) return;
        clearClassicSpinButtonReleaseAnimation(wrap);
        if (animationMs) {
            wrap.style.setProperty('--spin-button-release-duration', `${animationMs}ms`);
        }
        wrap.classList.remove('is-pressed');
        wrap.classList.add('is-release-return');
        spinButtonReleaseReturnCleanup = (event) => {
            if (event.target !== wrap) return;
            if (event.pseudoElement !== '::before') return;
            if (event.animationName !== 'spinButtonClassicReturn') return;
            clearClassicSpinButtonReleaseAnimation(wrap);
        };
        wrap.addEventListener('animationend', spinButtonReleaseReturnCleanup);
    }

    function getSpinButtonClipVolume(clipPath) {
        return getNormalizedVolume(clipPath, cabinetMixer.introClipVolume);
    }

    function loadSpinButtonClipBuffer(state) {
        if (state.buffer) return Promise.resolve(state.buffer);
        if (state.bufferPromise) return state.bufferPromise;

        state.bufferPromise = fetch(state.clipPath)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
            .then((buffer) => {
                state.buffer = buffer;
                return buffer;
            })
            .catch((err) => {
                console.log('Spin button buffer preload failed:', state.clipPath, err);
                state.bufferPromise = null;
                return null;
            });

        return state.bufferPromise;
    }

    function ensureSpinButtonClipFallbackAudio(state) {
        if (state.fallbackAudio) return state.fallbackAudio;
        state.fallbackAudio = new Audio(state.clipPath);
        state.fallbackAudio.preload = 'auto';
        state.fallbackAudio.load();
        return state.fallbackAudio;
    }

    function playSpinButtonClipFromBuffer(state, options = {}) {
        const source = audioCtx.createBufferSource();
        source.buffer = state.buffer;
        source.playbackRate.value = options.playbackRate ?? 1;
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = getSpinButtonClipVolume(state.clipPath);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(0);
    }

    function playSpinButtonClipFallback(state, options = {}) {
        const audio = ensureSpinButtonClipFallbackAudio(state);
        audio.playbackRate = options.playbackRate ?? 1;
        audio.volume = getSpinButtonClipVolume(state.clipPath);
        if (!audio.paused) audio.pause();
        audio.currentTime = 0;
        void audio.play().catch((err) => {
            console.log('Spin button audio playback blocked or file not found:', state.clipPath, err);
        });
    }

    function playSpinButtonClip(state, options = {}) {
        void audioCtx.resume();

        if (state.buffer) {
            playSpinButtonClipFromBuffer(state, options);
            return;
        }

        playSpinButtonClipFallback(state, options);
        void loadSpinButtonClipBuffer(state);
    }

    function playSpinButtonPress() {
        playSpinButtonClip(spinButtonClipState.press);
    }

    function playSpinButtonRelease() {
        if (spinButtonReleaseAudioTimeout != null) {
            clearTimeout(spinButtonReleaseAudioTimeout);
        }

        const releaseState = spinButtonClipState.release;
        const durationSec = getSpinButtonReleaseClipDurationSec();
        const playbackRate = getSpinButtonReleasePlaybackRate(durationSec);

        if (revealMode === 'classic') {
            const wrap = document.getElementById('spin-button-wrap');
            const animationMs = getSpinButtonReleaseAnimationDurationMs(durationSec);
            if (wrap && animationMs) {
                wrap.style.setProperty('--spin-button-release-duration', `${animationMs}ms`);
            }
        }

        spinButtonReleaseAudioTimeout = setTimeout(() => {
            spinButtonReleaseAudioTimeout = null;
            playSpinButtonClip(releaseState, { playbackRate });
            if (revealMode === 'classic') {
                const wrap = document.getElementById('spin-button-wrap');
                const animationMs = getSpinButtonReleaseAnimationDurationMs(durationSec);
                beginClassicSpinButtonReleaseReturn(wrap, animationMs);
            }
        }, getSpinButtonReleaseDelayMs());
    }

    function playSpinButtonSounds() {
        playSpinButtonPress();
        setTimeout(() => playSpinButtonRelease(), 40);
    }

    function stopSpinButtonAudio() {
        if (spinButtonReleaseAudioTimeout != null) {
            clearTimeout(spinButtonReleaseAudioTimeout);
            spinButtonReleaseAudioTimeout = null;
        }
        cancelClassicSpinButtonReleaseReturn();
        Object.values(spinButtonClipState).forEach((state) => {
            if (state.fallbackAudio) {
                state.fallbackAudio.pause();
                state.fallbackAudio.currentTime = 0;
            }
        });
    }

    function resetSpinButtonAudioCache() {
        Object.values(spinButtonClipState).forEach((state) => {
            state.buffer = null;
            state.bufferPromise = null;
            state.fallbackAudio = null;
        });
    }

    function preloadSpinButtonClipAudio() {
        ensureSpinButtonClipFallbackAudio(spinButtonClipState.press);
        ensureSpinButtonClipFallbackAudio(spinButtonClipState.release);
        void loadSpinButtonClipBuffer(spinButtonClipState.press);
        void loadSpinButtonClipBuffer(spinButtonClipState.release);
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

        const keeperSoundSets = window.uiAudioPaths.keeperClipsBySlotCount;

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

    const MODE_SELECTOR_LABELS = {
        classic: 'Classic Mode',
        snappy: 'Snappy Mode',
        speedRun: 'Speed Run',
        pinball: 'Pinball Mode'
    };

    const MODE_DIAL_ANGLES = {
        classic: 315,
        snappy: 45,
        pinball: 135,
        speedRun: 225
    };

    function getNextRevealMode(currentMode) {
        if (currentMode === 'classic') return 'snappy';
        if (currentMode === 'snappy') return 'pinball';
        if (currentMode === 'pinball') return 'speedRun';
        return 'classic';
    }

    function getModeDialClockwiseStepDeg(fromMode, toMode) {
        const fromDeg = MODE_DIAL_ANGLES[fromMode] ?? 0;
        const toDeg = MODE_DIAL_ANGLES[toMode] ?? 0;
        const delta = ((toDeg - fromDeg) % 360 + 360) % 360;
        return delta || 360;
    }

    const MODE_SELECTOR_LCD = {
        classic: 'CLASSIC',
        snappy: 'SNAPPY',
        speedRun: 'SPEED',
        pinball: 'PINBALL'
    };

    function updateRevealModeUI() {
        const container = document.getElementById('arcade-container');
        const modeSelector = document.getElementById('mode-selector');
        const dial = document.getElementById('mode-selector-dial');
        const display = document.getElementById('mode-selector-display');

        if (container) {
            container.classList.toggle('snappy-reveal', revealMode === 'snappy' || revealMode === 'speedRun');
            container.classList.toggle('pinball-reveal', revealMode === 'pinball');
            container.classList.toggle('snappy-mode', revealMode === 'snappy');
            container.classList.toggle('pinball-mode', revealMode === 'pinball');
        }

        if (modeSelector) {
            modeSelector.style.setProperty('--mode-dial-angle', `${modeDialRotationDeg}deg`);
            modeSelector.dataset.mode = revealMode;
        }

        if (dial) {
            const label = MODE_SELECTOR_LABELS[revealMode] || MODE_SELECTOR_LABELS.classic;
            dial.setAttribute('aria-label', `Reveal mode: ${label}. Click to change.`);
        }

        if (display) {
            display.textContent = MODE_SELECTOR_LCD[revealMode] || MODE_SELECTOR_LCD.classic;
        }

        document.querySelectorAll('.mode-led').forEach((led) => led.classList.remove('is-active'));
        const activeLed = document.querySelector(`.mode-led-${revealMode}`);
        if (activeLed) activeLed.classList.add('is-active');

        resetSnappyPowerGauge();
    }

    function toggleRevealMode() {
        const nextMode = getNextRevealMode(revealMode);
        modeDialRotationDeg += getModeDialClockwiseStepDeg(revealMode, nextMode);
        revealMode = nextMode;
        updateRevealModeUI();
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
        preloadSpinButtonClipAudio();

        if (oldCtx && oldCtx.state !== 'closed') {
            oldCtx.close();
        }

        isSpinning = false;
        pendingSpinReveal = null;
        spinButtonPressStartMs = null;
        pendingSpinHoldMs = 0;
        hasSelectedMovie = false;
        recentSelections = [];
        keeperPicks = [];
        isDiscardingKeeper = false;
        isKeeperDeckMinimized = false;
        keeperUiGeneration += 1;
        lastRevealedListing = null;
        lastRevealedLabel = null;
        winClipRemainingByCategory = {};
        resetMovieSelectionPools();

        resetResultPanel();
        setMarqueeText('SYSTEM READY // CHOOSE YOUR GENRE...');

        updateRecentSelectionsUI();
        updateKeeperPicksUI();
        updateKeeperButtonState();
        resetTicketShuffleState();
        resetSnappyPowerGauge();
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

    const spinIntroClips = window.uiAudioPaths.spinIntroClips;



    // --- SPIN WHEEL ---

    let spinButtonArmed = false;
    let spinButtonKeyArmed = false;
    let spinButtonPressStartMs = null;
    let pendingSpinHoldMs = 0;
    const SNAPPY_POWER_GAUGE_SEGMENT_COUNT = 30;
    const SNAPPY_GAUGE_CYCLE_MS = 1200;
    const SNAPPY_GAUGE_RISE_EXP_K = 7;
    function getSnappyGaugeRiseFillShape(progress) {
        const t = Math.max(0, Math.min(1, progress));
        const denom = 1 - Math.exp(-SNAPPY_GAUGE_RISE_EXP_K);
        if (denom <= 0) return t;
        return (1 - Math.exp(-SNAPPY_GAUGE_RISE_EXP_K * t)) / denom;
    }
    function getSnappyGaugePingPongRate() {
        return 2 / SNAPPY_GAUGE_CYCLE_MS;
    }
    function getSnappyGaugeRiseVelocityAtProgress(progress, pingPongRate) {
        const t = Math.max(0, Math.min(1, progress));
        if (t <= 0) return 0;
        const denom = 1 - Math.exp(-SNAPPY_GAUGE_RISE_EXP_K);
        if (denom <= 0) return pingPongRate * t;
        return pingPongRate * (1 - Math.exp(-SNAPPY_GAUGE_RISE_EXP_K * t)) / denom;
    }

    function getPinballPlungerRatio(holdMs) {
        if (holdMs <= 0) return 0;
        if (holdMs < PINBALL_HOLD_MIN_MS) {
            return (holdMs / PINBALL_HOLD_MIN_MS) * PINBALL_MIN_POWER_RATIO;
        }
        const elapsed = holdMs - PINBALL_HOLD_MIN_MS;
        const range = Math.max(1, PINBALL_HOLD_MAX_MS - PINBALL_HOLD_MIN_MS);
        const t = Math.min(elapsed / range, 1);
        return PINBALL_MIN_POWER_RATIO + (1 - PINBALL_MIN_POWER_RATIO) * getSnappyGaugeRiseFillShape(t);
    }

    const SNAPPY_GAUGE_DRAIN_MIN_MS = 300;
    const SNAPPY_GAUGE_DRAIN_EASE_POWER = 2;
    let snappyPowerGaugeSegments = null;
    let snappyPowerGaugeRaf = null;
    let snappyGaugeDrainRaf = null;
    let snappyGaugeMaxReachedAtMs = null;
    let snappyGaugeDisplayRatio = 0;
    let snappyGaugeReleaseRatio = 0;
    let snappyGaugeLastTickMs = null;
    let snappyGaugeDrainStartMs = null;
    let snappyGaugeDrainDurationMs = 0;
    let snappyGaugeDrainStartRatio = 0;
    let pinballGaugeReleaseRatio = 0;

    function initSnappyPowerGaugeSegments() {
        const container = document.getElementById('spin-power-gauge-segments');
        if (!container) return;
        if (container.children.length !== SNAPPY_POWER_GAUGE_SEGMENT_COUNT) {
            container.replaceChildren();
            for (let i = 0; i < SNAPPY_POWER_GAUGE_SEGMENT_COUNT; i++) {
                const segment = document.createElement('div');
                segment.className = 'spin-power-segment';
                segment.dataset.segment = String(i);
                const fillEl = document.createElement('div');
                fillEl.className = 'spin-power-segment-fill';
                segment.appendChild(fillEl);
                container.appendChild(segment);
            }
            snappyPowerGaugeSegments = null;
        }
        if (!snappyPowerGaugeSegments) {
            snappyPowerGaugeSegments = Array.from(container.querySelectorAll('.spin-power-segment'))
                .sort((a, b) => Number(a.dataset.segment) - Number(b.dataset.segment));
            snappyPowerGaugeSegments.forEach((segment) => {
                if (!segment.querySelector('.spin-power-segment-fill')) {
                    const fillEl = document.createElement('div');
                    fillEl.className = 'spin-power-segment-fill';
                    segment.appendChild(fillEl);
                }
            });
        }
    }

    function applyPinballGaugeSegmentColor(fillEl, index) {
        const t = index / (SNAPPY_POWER_GAUGE_SEGMENT_COUNT - 1);
        const r = Math.round(255 + (255 - 255) * t);
        const g = Math.round(180 + (68 - 180) * t);
        const b = Math.round(60 + (255 - 60) * t);
        fillEl.style.background = `rgb(${r}, ${g}, ${b})`;
        fillEl.style.boxShadow =
            `inset 0 0 2px rgba(255, 255, 255, 0.45), 0 0 5px rgba(${r}, ${g}, ${b}, 0.9), 0 0 10px rgba(${r}, ${g}, ${b}, 0.45)`;
    }

    function applyGaugeSegmentColor(fillEl, index) {
        if (revealMode === 'pinball') {
            applyPinballGaugeSegmentColor(fillEl, index);
        } else {
            applySnappyGaugeSegmentColor(fillEl, index);
        }
    }

    function applySnappyGaugeSegmentColor(fillEl, index) {
        const t = index / (SNAPPY_POWER_GAUGE_SEGMENT_COUNT - 1);
        const r = Math.round(255 + (68 - 255) * t);
        const g = Math.round(244 + (255 - 244) * t);
        const b = Math.round(77 + (136 - 77) * t);
        fillEl.style.background = `rgb(${r}, ${g}, ${b})`;
        fillEl.style.boxShadow =
            `inset 0 0 2px rgba(255, 255, 255, 0.45), 0 0 5px rgba(${r}, ${g}, ${b}, 0.9), 0 0 10px rgba(${r}, ${g}, ${b}, 0.45)`;
    }

    function clearSnappyGaugeSegmentStyle(segment, fillEl) {
        segment.classList.remove('is-lit');
        if (!fillEl) return;
        fillEl.style.height = '0%';
        fillEl.style.background = '';
        fillEl.style.boxShadow = '';
    }

    function setSnappyPowerGaugeFill(ratio) {
        initSnappyPowerGaugeSegments();
        if (!snappyPowerGaugeSegments || snappyPowerGaugeSegments.length === 0) return;
        const clamped = Math.max(0, Math.min(1, ratio));
        const exactLit = clamped * SNAPPY_POWER_GAUGE_SEGMENT_COUNT;
        snappyPowerGaugeSegments.forEach((segment, index) => {
            const fillEl = segment.querySelector('.spin-power-segment-fill');
            const segmentFill = Math.max(0, Math.min(1, exactLit - index));
            if (!fillEl || segmentFill <= 0) {
                clearSnappyGaugeSegmentStyle(segment, fillEl);
                return;
            }
            segment.classList.add('is-lit');
            fillEl.style.height = `${segmentFill * 100}%`;
            applyGaugeSegmentColor(fillEl, index);
        });
    }

    function stopSnappyPowerGaugeLoop() {
        if (snappyPowerGaugeRaf != null) {
            cancelAnimationFrame(snappyPowerGaugeRaf);
            snappyPowerGaugeRaf = null;
        }
    }

    function stopSnappyPowerGaugeDrain() {
        if (snappyGaugeDrainRaf != null) {
            cancelAnimationFrame(snappyGaugeDrainRaf);
            snappyGaugeDrainRaf = null;
        }
        snappyGaugeDrainStartMs = null;
        snappyGaugeDrainDurationMs = 0;
        snappyGaugeDrainStartRatio = 0;
    }

    function startSnappyPowerGaugeDrain(startRatio, durationMs) {
        stopSnappyPowerGaugeDrain();
        const clampedStart = Math.max(0, Math.min(1, startRatio));
        if (clampedStart <= 0) {
            resetSnappyPowerGauge();
            return;
        }
        snappyGaugeDrainStartRatio = clampedStart;
        snappyGaugeDrainDurationMs = durationMs;
        snappyGaugeDrainStartMs = performance.now();
        snappyGaugeDisplayRatio = clampedStart;
        tickSnappyPowerGaugeDrain();
    }

    function tickSnappyPowerGaugeDrain() {
        if (snappyGaugeDrainStartMs == null) {
            snappyGaugeDrainRaf = null;
            return;
        }
        const elapsed = performance.now() - snappyGaugeDrainStartMs;
        const progress = Math.min(elapsed / snappyGaugeDrainDurationMs, 1);
        const ease = 1 - Math.pow(1 - progress, SNAPPY_GAUGE_DRAIN_EASE_POWER);
        snappyGaugeDisplayRatio = snappyGaugeDrainStartRatio * (1 - ease);
        setSnappyPowerGaugeFill(snappyGaugeDisplayRatio);
        if (progress < 1) {
            snappyGaugeDrainRaf = requestAnimationFrame(tickSnappyPowerGaugeDrain);
            return;
        }
        stopSnappyPowerGaugeDrain();
        snappyGaugeMaxReachedAtMs = null;
        snappyGaugeDisplayRatio = 0;
        snappyGaugeReleaseRatio = 0;
        setSnappyPowerGaugeFill(0);
    }

    function resetSnappyPowerGauge() {
        stopSnappyPowerGaugeLoop();
        stopSnappyPowerGaugeDrain();
        snappyGaugeMaxReachedAtMs = null;
        snappyGaugeDisplayRatio = 0;
        snappyGaugeReleaseRatio = 0;
        pinballGaugeReleaseRatio = 0;
        snappyGaugeLastTickMs = null;
        setSnappyPowerGaugeFill(0);
    }

    function tickPinballPlungerGauge() {
        if (revealMode !== 'pinball' || spinButtonPressStartMs == null) {
            snappyPowerGaugeRaf = null;
            return;
        }
        const holdMs = performance.now() - spinButtonPressStartMs;
        snappyGaugeDisplayRatio = getPinballPlungerRatio(holdMs);
        setSnappyPowerGaugeFill(snappyGaugeDisplayRatio);
        snappyPowerGaugeRaf = requestAnimationFrame(tickPinballPlungerGauge);
    }

    function tickSnappyPowerGauge() {
        if (revealMode !== 'snappy' || spinButtonPressStartMs == null) {
            snappyPowerGaugeRaf = null;
            return;
        }
        const holdMs = performance.now() - spinButtonPressStartMs;
        const now = performance.now();
        const deltaMs = snappyGaugeLastTickMs != null
            ? Math.min(now - snappyGaugeLastTickMs, 50)
            : 16;
        snappyGaugeLastTickMs = now;

        const targetRatio = getSnappyPowerGaugeRiseRatio(holdMs);
        const pingPongRate = getSnappyGaugePingPongRate();
        const atMaxTarget = targetRatio >= 1;

        if (snappyGaugeMaxReachedAtMs != null) {
            snappyGaugeDisplayRatio = getSnappyGaugePingPongRatio(holdMs - snappyGaugeMaxReachedAtMs);
        } else {
            const riseCap = atMaxTarget ? 1 : targetRatio;
            let progressForVelocity = 0;
            if (riseCap > 0) {
                const fillProgress = Math.min(snappyGaugeDisplayRatio / riseCap, 1);
                if (fillProgress > 0) {
                    progressForVelocity = fillProgress;
                } else {
                    progressForVelocity = Math.min(holdMs / (SNAPPY_GAUGE_CYCLE_MS / 2), 1);
                }
            }
            const velocity = getSnappyGaugeRiseVelocityAtProgress(progressForVelocity, pingPongRate);
            const nextDisplay = snappyGaugeDisplayRatio + velocity * deltaMs;
            snappyGaugeDisplayRatio = riseCap > 0
                ? Math.min(riseCap, nextDisplay)
                : nextDisplay;

            if (atMaxTarget && snappyGaugeDisplayRatio >= 1) {
                snappyGaugeDisplayRatio = 1;
                snappyGaugeMaxReachedAtMs = holdMs;
            }
        }
        setSnappyPowerGaugeFill(snappyGaugeDisplayRatio);
        snappyPowerGaugeRaf = requestAnimationFrame(tickSnappyPowerGauge);
    }

    function startSnappyPowerGaugeLoop() {
        if (revealMode !== 'snappy') return;
        stopSnappyPowerGaugeLoop();
        stopSnappyPowerGaugeDrain();
        snappyGaugeMaxReachedAtMs = null;
        snappyGaugeDisplayRatio = 0;
        snappyGaugeReleaseRatio = 0;
        snappyGaugeLastTickMs = null;
        tickSnappyPowerGauge();
    }

    function startPinballPlungerGaugeLoop() {
        if (revealMode !== 'pinball') return;
        stopSnappyPowerGaugeLoop();
        stopSnappyPowerGaugeDrain();
        snappyGaugeDisplayRatio = 0;
        pinballGaugeReleaseRatio = 0;
        tickPinballPlungerGauge();
    }

    function startPowerGaugeLoop() {
        if (revealMode === 'snappy') {
            startSnappyPowerGaugeLoop();
        } else if (revealMode === 'pinball') {
            startPinballPlungerGaugeLoop();
        }
    }

    function captureSpinButtonHoldMs() {
        stopSnappyPowerGaugeLoop();
        pendingSpinHoldMs = spinButtonPressStartMs != null
            ? performance.now() - spinButtonPressStartMs
            : 0;
        if (revealMode === 'snappy') {
            snappyGaugeReleaseRatio = snappyGaugeDisplayRatio;
            setSnappyPowerGaugeFill(snappyGaugeReleaseRatio);
        } else if (revealMode === 'pinball') {
            pinballGaugeReleaseRatio = snappyGaugeDisplayRatio;
            setSnappyPowerGaugeFill(pinballGaugeReleaseRatio);
        }
        spinButtonPressStartMs = null;
    }

    function clearSpinButtonHoldState() {
        spinButtonPressStartMs = null;
        pendingSpinHoldMs = 0;
        resetSnappyPowerGauge();
    }

    function canInteractWithSpinButton() {
        const spinButton = document.getElementById('spin-button');
        if (spinButton?.disabled) return false;
        return !isSpinning;
    }

    function setSpinButtonPressed(pressed) {
        const wrap = document.getElementById('spin-button-wrap');
        if (!wrap) return;
        wrap.classList.toggle('is-pressed', pressed);
    }

    function isSpinButtonActivationKey(key) {
        return key === 'Enter';
    }

    function onSpinButtonPointerDown(event) {
        if (event.button !== 0) return;
        if (!canInteractWithSpinButton()) return;
        event.preventDefault();
        spinButtonArmed = true;
        spinButtonPressStartMs = performance.now();
        event.currentTarget.setPointerCapture(event.pointerId);
        clearClassicSpinButtonReleaseAnimation();
        setSpinButtonPressed(true);
        startPowerGaugeLoop();
        playSpinButtonPress();
    }

    function onSpinButtonPointerUp(event) {
        if (!spinButtonArmed) return;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        spinButtonArmed = false;
        if (revealMode !== 'classic') {
            setSpinButtonPressed(false);
        }
        playSpinButtonRelease();
        captureSpinButtonHoldMs();
        initiateSpin(event);
    }

    function onSpinButtonPointerCancel(event) {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        spinButtonArmed = false;
        if (spinButtonReleaseAudioTimeout != null) {
            clearTimeout(spinButtonReleaseAudioTimeout);
            spinButtonReleaseAudioTimeout = null;
        }
        cancelClassicSpinButtonReleaseReturn();
        clearSpinButtonHoldState();
    }

    function handleSpinButtonKeyDown(event) {
        if (event.repeat) return;
        if (!canInteractWithSpinButton()) return;
        event.preventDefault();
        spinButtonKeyArmed = true;
        spinButtonPressStartMs = performance.now();
        clearClassicSpinButtonReleaseAnimation();
        setSpinButtonPressed(true);
        startPowerGaugeLoop();
        playSpinButtonPress();
    }

    function handleSpinButtonKeyUp(event) {
        if (!spinButtonKeyArmed) return;
        spinButtonKeyArmed = false;
        if (revealMode !== 'classic') {
            setSpinButtonPressed(false);
        }
        playSpinButtonRelease();
        captureSpinButtonHoldMs();
        initiateSpin(event);
    }

    function onSpinButtonKeyDown(event) {
        if (!isSpinButtonActivationKey(event.key)) return;
        handleSpinButtonKeyDown(event);
    }

    function onSpinButtonKeyUp(event) {
        if (!isSpinButtonActivationKey(event.key)) return;
        handleSpinButtonKeyUp(event);
    }

    function initiateSpin(event) {

        if (isSpinning) return;

        if (shouldShowNoMatchOverlay()) {
            updateSpinBlockerUI();
            resetSnappyPowerGauge();
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

        if (revealMode === 'speedRun') {
            triggerPhysicalSpin();
            return;
        }

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

        const disc = document.getElementById('wheel-disc');

        setMarqueeText('LOCKING CATEGORY...');



        if (activeCategories.length === 0) {
            alert('Please select at least one category');
            isSpinning = false;
            resetSnappyPowerGauge();
            return;
        }

        if (activeDecades.length === 0) {
            alert('Please select at least one decade');
            isSpinning = false;
            resetSnappyPowerGauge();
            return;
        }

        syncRuntimeFilterState();

        if (isRuntimeFilterActive() && !isRuntimeFilterValid()) {
            alert('Minimum runtime cannot exceed maximum runtime.');
            isSpinning = false;
            resetSnappyPowerGauge();
            return;
        }

        const eligibleCategories = getEligibleCategories();
        if (eligibleCategories.length === 0) {
            updateSpinBlockerUI();
            isSpinning = false;
            resetSnappyPowerGauge();
            return;
        }

        if (revealMode === 'pinball') {
            const holdMs = pendingSpinHoldMs;
            const releaseRatio = pinballGaugeReleaseRatio > 0
                ? pinballGaugeReleaseRatio
                : getPinballPlungerRatio(holdMs);
            const plan = computePinballSpinPlan(holdMs, releaseRatio);
            const selectedCategory = plan.selectedCategory;
            const timing = REVEAL_TIMING.pinball;

            pendingSpinReveal = null;
            const eligibleMovies = getEligibleMovies(selectedCategory);
            if (eligibleMovies.length === 0) {
                updateSpinBlockerUI();
                isSpinning = false;
                resetSnappyPowerGauge();
                return;
            }
            const chosenMovie = drawNextMovie(selectedCategory, eligibleMovies);
            const parts = selectedCategory.split(' ');
            pendingSpinReveal = {
                category: selectedCategory,
                chosenMovie,
                categoryEmoji: parts[parts.length - 1]
            };
            preloadSpinPoster(chosenMovie);

            setMarqueeText('LAUNCHING WHEEL...');

            const drainMs = plan.totalDurationMs > 0 ? plan.totalDurationMs : SNAPPY_GAUGE_DRAIN_MIN_MS;
            startSnappyPowerGaugeDrain(pinballGaugeReleaseRatio, drainMs);
            pinballGaugeReleaseRatio = 0;
            pendingSpinHoldMs = 0;

            if (plan.totalDurationMs <= 0) {
                currentRotation = plan.finalDegrees;
                disc.style.transform = `rotate(${currentRotation}deg)`;
                verifyPinballLanding(plan);
                playCategoryVictorySound(selectedCategory);
                if (pendingSpinReveal) {
                    const reveal = pendingSpinReveal;
                    pendingSpinReveal = null;
                    setTimeout(() => {
                        completeSpinReveal(reveal.category, reveal.chosenMovie, reveal.categoryEmoji);
                    }, timing.postWheelMs);
                } else {
                    isSpinning = false;
                }
                return;
            }

            let lastClickDegree = plan.baseRotation;
            let hasFiredVictorySound = false;
            let creepMarqueeSet = false;
            const totalDuration = plan.totalDurationMs;
            const victoryLeadMs = Math.min(timing.victoryLeadMs ?? 1000, totalDuration * 0.35);
            let start = null;

            function animatePinball(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const creepEndMs = plan.mainDurationMs + plan.creepDurationMs;

                let frameRotation;
                if (progress <= plan.mainDurationMs) {
                    const tSec = progress / 1000;
                    frameRotation = plan.baseRotation + plan.omega0 * tSec - 0.5 * plan.decel * tSec * tSec;
                } else if (progress <= creepEndMs) {
                    const creepProgress = plan.creepDurationMs > 0
                        ? Math.min((progress - plan.mainDurationMs) / plan.creepDurationMs, 1)
                        : 1;
                    const creepEase = 1 - Math.pow(1 - creepProgress, 3);
                    frameRotation = plan.naturalEnd + plan.creepDelta * creepEase;
                    if (plan.needsCreep && !creepMarqueeSet && creepProgress > 0) {
                        creepMarqueeSet = true;
                        setMarqueeText('SEEKING SLOT...');
                    }
                } else {
                    const settleProgress = plan.settleDurationMs > 0
                        ? Math.min((progress - creepEndMs) / plan.settleDurationMs, 1)
                        : 1;
                    const settleEase = 1 - Math.pow(1 - settleProgress, 3);
                    frameRotation = plan.settleFrom + plan.settleDelta * settleEase;
                }

                disc.style.transform = `rotate(${frameRotation}deg)`;

                const sliceStep = progress > plan.mainDurationMs ? degreesPerSlice * 0.65 : degreesPerSlice;
                if (Math.abs(frameRotation - lastClickDegree) >= sliceStep) {
                    playTickerClick();
                    lastClickDegree = frameRotation;
                }

                const victoryFireMs = totalDuration - victoryLeadMs;
                if (progress >= victoryFireMs && !hasFiredVictorySound) {
                    hasFiredVictorySound = true;
                    playCategoryVictorySound(selectedCategory);
                }

                if (progress < totalDuration) {
                    requestAnimationFrame(animatePinball);
                } else {
                    currentRotation = plan.finalDegrees;
                    disc.style.transform = `rotate(${currentRotation}deg)`;
                    verifyPinballLanding(plan);
                    setTimeout(() => {
                        if (pendingSpinReveal) {
                            completeSpinReveal(
                                pendingSpinReveal.category,
                                pendingSpinReveal.chosenMovie,
                                pendingSpinReveal.categoryEmoji
                            );
                            pendingSpinReveal = null;
                        } else {
                            isSpinning = false;
                        }
                    }, timing.postWheelMs);
                }
            }

            requestAnimationFrame(animatePinball);
            return;
        }

        let selectedCategory = eligibleCategories[Math.floor(Math.random() * eligibleCategories.length)];
        let randomCategoryIndex = categories.indexOf(selectedCategory);

        pendingSpinReveal = null;
        if (isInstantRevealMode()) {
            const eligibleMovies = getEligibleMovies(selectedCategory);
            if (eligibleMovies.length === 0) {
                updateSpinBlockerUI();
                isSpinning = false;
                resetSnappyPowerGauge();
                return;
            }
            const chosenMovie = drawNextMovie(selectedCategory, eligibleMovies);
            const parts = selectedCategory.split(' ');
            pendingSpinReveal = {
                category: selectedCategory,
                chosenMovie,
                categoryEmoji: parts[parts.length - 1]
            };
            preloadSpinPoster(chosenMovie);
        }

        const timing = REVEAL_TIMING[revealMode];

        

        let targetDegrees = getSliceCenterDegrees(randomCategoryIndex);

        

        let baseRotation = currentRotation % 360;

        let extraSpins = 5 * 360; 

        

        let distanceToTarget = (targetDegrees - baseRotation + 360) % 360;

        if (distanceToTarget === 0) distanceToTarget = 360; 

        

        let finalDegrees = baseRotation + extraSpins + distanceToTarget;

        

        let start = null;

        let duration = timing.spinDurationMs;
        if (revealMode === 'snappy') {
            duration = getSnappySpinDurationFromGaugeRatio(snappyGaugeReleaseRatio, pendingSpinHoldMs);
            const drainMs = duration === 0 ? SNAPPY_GAUGE_DRAIN_MIN_MS : duration;
            startSnappyPowerGaugeDrain(snappyGaugeReleaseRatio, drainMs);
            pendingSpinHoldMs = 0;
        }

        let lastClickDegree = baseRotation;

        

        // State gate to prevent multiple audio triggers in the tracking window

        let hasFiredVictorySound = false;

        if (timing.victoryAtSpinStart) {
            playCategoryVictorySound(selectedCategory);
            hasFiredVictorySound = true;
        }

        if (revealMode === 'snappy' && duration === 0) {
            currentRotation = finalDegrees;
            disc.style.transform = `rotate(${currentRotation}deg)`;
            playCategoryVictorySound(selectedCategory);
            if (pendingSpinReveal) {
                const reveal = pendingSpinReveal;
                pendingSpinReveal = null;
                setTimeout(() => {
                    completeSpinReveal(reveal.category, reveal.chosenMovie, reveal.categoryEmoji);
                }, timing.postWheelMs);
            } else {
                isSpinning = false;
            }
            return;
        }

        const victoryLeadMs = Math.min(timing.victoryLeadMs ?? 1000, duration * 0.5);

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



            // CLASSIC TIMING MECHANIC: Fire victory sound before stop (1s lead by default)

            const victoryFireMs = duration - victoryLeadMs;

            if (progress >= victoryFireMs && !hasFiredVictorySound) {

                hasFiredVictorySound = true;

                playCategoryVictorySound(selectedCategory);

            }



            if (timePercent < 1) {

                requestAnimationFrame(animate);

            } else {

                currentRotation = finalDegrees;

                disc.style.transform = `rotate(${currentRotation}deg)`;

                

                setTimeout(() => {
                    if (isInstantRevealMode() && pendingSpinReveal) {
                        completeSpinReveal(
                            pendingSpinReveal.category,
                            pendingSpinReveal.chosenMovie,
                            pendingSpinReveal.categoryEmoji
                        );
                        pendingSpinReveal = null;
                    } else {
                        executeMovieTierSelection(selectedCategory);
                    }
                }, REVEAL_TIMING[revealMode].postWheelMs);

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

    function getEligibleMoviesForDraw(catKey, excludeListings = []) {
        const exclude = new Set(excludeListings);
        return getEligibleMovies(catKey).filter((listing) => !exclude.has(listing));
    }

    function reconcileMoviePool(catKey, eligibleMovies) {
        const eligible = new Set(eligibleMovies);
        const pool = movieRemainingByCategory[catKey];
        if (!pool) return;
        movieRemainingByCategory[catKey] = pool.filter((listing) => eligible.has(listing));
    }

    function ensureMoviePool(catKey, eligibleMovies) {
        if (movieRemainingByCategory[catKey]?.length) return;
        movieRemainingByCategory[catKey] = shuffleArray(eligibleMovies);
    }

    function markMovieServed(catKey, listing) {
        const eligible = getEligibleMovies(catKey);
        if (!eligible.includes(listing)) return;

        reconcileMoviePool(catKey, eligible);
        if (!movieRemainingByCategory[catKey]?.length) {
            movieRemainingByCategory[catKey] = shuffleArray(eligible);
        }
        const pool = movieRemainingByCategory[catKey];
        const idx = pool.indexOf(listing);
        if (idx >= 0) pool.splice(idx, 1);
    }

    function normalizeDrawNextMovieOptions(second) {
        if (Array.isArray(second)) return { eligibleMovies: second };
        return second ?? {};
    }

    function drawNextMovie(catKey, second) {
        const options = normalizeDrawNextMovieOptions(second);
        const excludeListings = options.excludeListings ?? [];
        let eligibleMovies = options.eligibleMovies
            ?? getEligibleMoviesForDraw(catKey, excludeListings);
        if (excludeListings.length) {
            const exclude = new Set(excludeListings);
            eligibleMovies = eligibleMovies.filter((listing) => !exclude.has(listing));
        }
        if (!eligibleMovies.length) return null;

        reconcileMoviePool(catKey, eligibleMovies);
        ensureMoviePool(catKey, eligibleMovies);
        return movieRemainingByCategory[catKey].pop() ?? null;
    }

    function drawNextMovieLabel(catKey, options = {}) {
        const listing = drawNextMovie(catKey, options);
        if (!listing) return null;
        const parts = catKey.split(' ');
        const emoji = parts[parts.length - 1];
        return buildCoinTossEntry(`${emoji} ${listing}`, 'mystery');
    }

    function listingsFromExcludeLabels(excludeLabels) {
        return excludeLabels.map((label) => getKeeperListingLabel(label));
    }

    function getMoviePoolRemainingCount(catKey, excludeListings = []) {
        const eligibleMovies = getEligibleMoviesForDraw(catKey, excludeListings);
        if (!eligibleMovies.length) return 0;
        reconcileMoviePool(catKey, eligibleMovies);
        const pool = movieRemainingByCategory[catKey];
        if (pool?.length) {
            const exclude = new Set(excludeListings);
            return pool.filter((listing) => !exclude.has(listing)).length;
        }
        return eligibleMovies.length;
    }

    function drawNextMysteryFromCategories(categories, excludeLabels = []) {
        const excludeListings = listingsFromExcludeLabels(excludeLabels);
        const categoryList = (categories ?? activeCategories).filter(
            (cat) => getMoviePoolRemainingCount(cat, excludeListings) > 0
        );
        if (!categoryList.length) return null;

        const weights = categoryList.map((cat) => getMoviePoolRemainingCount(cat, excludeListings));
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        if (totalWeight <= 0) return null;

        let roll = Math.floor(Math.random() * totalWeight);
        let chosenCat = categoryList[categoryList.length - 1];
        for (let i = 0; i < categoryList.length; i += 1) {
            roll -= weights[i];
            if (roll < 0) {
                chosenCat = categoryList[i];
                break;
            }
        }

        return drawNextMovieLabel(chosenCat, { excludeListings });
    }

    function consumeListingAppearance(listing) {
        const category = findListingCategory(listing);
        if (!category) return;
        markMovieServed(category, listing);
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



    // --- GLOBAL STATE ---

    let winClipRemainingByCategory = {};

    let movieRemainingByCategory = {};

    let recentSelections = [];

    let keeperPicks = [];

    let isDiscardingKeeper = false;

    let keeperUiGeneration = 0;

    let isKeeperDeckMinimized = false;

    let hasSelectedMovie = false;

    let lastRevealedListing = null;

    let lastRevealedLabel = null;



// --- METADATA AND LISTING HELPERS ---

function getMovieMetadata(listing) {
    const listingAliases = {
        "Walk the Line EXTENDED (2005)": "Walk the Line (2005)"
    };
    const key = listingAliases[listing] ?? listing;
    return window.movieMetadataByListing?.[key] ?? null;
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



// --- RESULT DISPLAY ---

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



function preloadSpinPoster(listing) {
    const metadata = getMovieMetadata(listing);
    const posterUrl = metadata?.Poster && metadata.Poster !== 'N/A' ? metadata.Poster : null;
    if (!posterUrl) return;
    const url = getPosterLoadCandidates(posterUrl)[0];
    if (!url) return;
    const img = new Image();
    img.src = url;
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

    lastRevealedListing = chosenMovie;
    lastRevealedLabel = `${categoryEmoji} ${chosenMovie}`;
    refreshCoinTossCandidatesUI();
    updateResultMarkWatchedButton();
}



// --- SPIN SELECTION ---

function completeSpinReveal(category, chosenMovie, categoryEmoji) {
    const historyEntry = `${categoryEmoji} ${chosenMovie}`;
    recentSelections.unshift(historyEntry);
    if (recentSelections.length > 3) recentSelections.pop();

    hasSelectedMovie = true;

    updateRecentSelectionsUI();
    revealMovieResult(category, chosenMovie, categoryEmoji);

    isSpinning = false;
    updateKeeperButtonState();
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
        completeSpinReveal(category, chosenMovie, categoryEmoji);
    }, REVEAL_TIMING.classic.selectionMs);
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

    refreshCoinTossCandidatesUI();
}

function getInsertCoinMarkup() {
    return `
        <div class="insert-coin" aria-label="Empty slot">
            <div class="insert-coin-slot" aria-hidden="true"></div>
        </div>
    `;
}

// --- KEEPER DECK ---

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

function updateWatchedFilterUI() {
    const countEl = document.getElementById('watched-filter-count');
    if (countEl) {
        const count = getWatchedMoviesInCatalog().length;
        countEl.textContent = `${count} watched`;
    }
    updateWatchedFlicksListUI();
    updateResultMarkWatchedButton();
}

function updateWatchedFlicksListUI() {
    const list = document.getElementById('watched-flicks-list');
    const empty = document.getElementById('watched-flicks-empty');
    if (!list || !empty) return;

    list.innerHTML = '';
    const watched = getWatchedMoviesInCatalog();

    empty.hidden = watched.length > 0;
    list.hidden = watched.length === 0;

    watched.forEach((listing) => {
        const li = document.createElement('li');
        li.className = 'watched-flicks-item';

        const category = findListingCategory(listing);
        const emoji = category ? category.split(' ').pop() : '';
        const title = document.createElement('span');
        title.className = 'watched-flicks-title';
        title.textContent = emoji ? `${emoji} ${listing}` : listing;

        const returnBtn = document.createElement('button');
        returnBtn.type = 'button';
        returnBtn.className = 'watched-flicks-return-btn';
        returnBtn.textContent = 'Return to rotation';
        returnBtn.addEventListener('click', () => unmarkMovieAsWatched(listing));

        li.appendChild(title);
        li.appendChild(returnBtn);
        list.appendChild(li);
    });
}

function buildWatchedFlicksPanelUI() {
    const toggle = document.getElementById('watched-flicks-toggle');
    const content = document.getElementById('watched-flicks-content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        content.hidden = expanded;
    });

    if (!document.getElementById('watched-choose-save-file')) {
        const chooseSaveBtn = document.createElement('button');
        chooseSaveBtn.type = 'button';
        chooseSaveBtn.id = 'watched-choose-save-file';
        chooseSaveBtn.textContent = 'Choose save file';
        chooseSaveBtn.addEventListener('click', () => {
            void linkWatchedMoviesSaveFile();
        });
        content.insertBefore(chooseSaveBtn, content.firstChild);
    }

    updateWatchedFlicksListUI();
}

function buildKeeperLabelFromListing(listing) {
    const category = findListingCategory(listing);
    const emoji = category ? category.split(' ').pop() : '';
    return emoji ? `${emoji} ${listing}` : listing;
}

function setManualKeeperStatus(message, isError = false) {
    const status = document.getElementById('manual-keeper-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('manual-keeper-status-error', isError);
    status.classList.toggle('manual-keeper-status-success', !isError && message.length > 0);
}

function resolveManualKeeperQuery(raw) {
    const trimmed = raw.trim();
    if (!trimmed) {
        return { error: 'Enter a movie title.' };
    }

    const result = resolveWatchedImportLine(trimmed);
    if (result.skip) {
        return { error: 'Enter a movie title.' };
    }
    if (result.error) {
        return { error: result.error };
    }

    const listing = result.listing;
    const label = buildKeeperLabelFromListing(listing);

    if (keeperPicks.some((pick) => getKeeperListingLabel(pick.label) === listing)) {
        return { error: 'Already in keeper.' };
    }

    return { label, listing, warning: result.warning };
}

function handleManualKeeperSearch() {
    if (isSpinning || isDiscardingKeeper || getOpenKeeperSlots() === 0) return;

    const input = document.getElementById('manual-keeper-input');
    const dropdown = document.getElementById('manual-keeper-dropdown');
    if (!input || !dropdown) return;

    const query = input.value.trim();
    if (!query) {
        dropdown.hidden = true;
        dropdown.innerHTML = '';
        return;
    }

    const { matches } = findMovieListingInDatabase(query);
    dropdown.innerHTML = '';

    if (!matches.length) {
        const empty = document.createElement('div');
        empty.className = 'coin-toss-dropdown-empty';
        empty.textContent = 'No matches in database.';
        dropdown.appendChild(empty);
        dropdown.hidden = false;
        return;
    }

    matches.forEach((entry) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'coin-toss-dropdown-option';
        option.textContent = getKeeperListingLabel(entry.label);
        option.addEventListener('click', () => {
            input.value = getKeeperListingLabel(entry.label);
            dropdown.hidden = true;
            dropdown.innerHTML = '';
            setManualKeeperStatus('');
        });
        dropdown.appendChild(option);
    });

    dropdown.hidden = false;
}

function addManualKeeperMovie(raw) {
    if (isSpinning || isDiscardingKeeper) return;
    if (getOpenKeeperSlots() === 0) {
        setManualKeeperStatus('Keeper full — discard a movie first.', true);
        return;
    }

    const resolved = resolveManualKeeperQuery(raw);
    if (resolved.error) {
        setManualKeeperStatus(resolved.error, true);
        return;
    }

    const { label, listing, warning } = resolved;
    const recentIndex = recentSelections.indexOf(label);
    if (recentIndex >= 0) {
        recentSelections.splice(recentIndex, 1);
    }

    keeperUiGeneration += 1;
    playKeeperSound(keeperPicks.length + 1);

    const keeperEntry = {
        label,
        poster: null,
        runtimeMinutes: getMovieRuntimeMinutes(listing)
    };
    keeperPicks.push(keeperEntry);
    applyKeeperPosterFromMetadata(keeperEntry);
    consumeListingAppearance(listing);

    const input = document.getElementById('manual-keeper-input');
    const dropdown = document.getElementById('manual-keeper-dropdown');
    if (input) input.value = '';
    if (dropdown) {
        dropdown.hidden = true;
        dropdown.innerHTML = '';
    }

    updateRecentSelectionsUI();
    updateKeeperPicksUI(true);
    updateKeeperButtonState();

    let statusMsg = `Added "${listing}".`;
    if (warning) {
        statusMsg = `${warning} Added "${listing}".`;
    }
    setManualKeeperStatus(statusMsg, false);
}

function updateManualKeeperPanelState() {
    const input = document.getElementById('manual-keeper-input');
    const addBtn = document.getElementById('manual-keeper-add-btn');
    const hint = document.getElementById('manual-keeper-hint');
    if (!input || !addBtn || !hint) return;

    const openSlots = getOpenKeeperSlots();
    const blocked = isSpinning || isDiscardingKeeper || openSlots === 0;
    input.disabled = blocked;
    addBtn.disabled = blocked;

    if (openSlots === 0) {
        hint.textContent = 'Keeper full — discard a movie first.';
    } else if (isSpinning) {
        hint.textContent = `${openSlots} of 3 slots open — wait for spin to finish.`;
    } else if (isDiscardingKeeper) {
        hint.textContent = `${openSlots} of 3 slots open — wait for discard to finish.`;
    } else {
        const slotWord = openSlots === 1 ? 'slot' : 'slots';
        hint.textContent = `${openSlots} of 3 ${slotWord} open`;
    }
}

function buildManualKeeperPanelUI() {
    const filtersPanel = document.getElementById('filters-panel');
    const watchedPanel = document.getElementById('watched-flicks-panel');
    if (!filtersPanel || !watchedPanel || document.getElementById('manual-keeper-panel')) return;

    const section = document.createElement('div');
    section.id = 'manual-keeper-panel';

    const emblem = document.createElement('div');
    emblem.className = 'manual-keeper-emblem';
    emblem.setAttribute('aria-hidden', 'true');
    emblem.textContent = '🔎';
    section.appendChild(emblem);

    const label = document.createElement('div');
    label.id = 'manual-keeper-label';
    label.textContent = 'ADD TO KEEPER';
    section.appendChild(label);

    const hint = document.createElement('div');
    hint.id = 'manual-keeper-hint';
    hint.textContent = '3 of 3 slots open';
    section.appendChild(hint);

    const formRow = document.createElement('div');
    formRow.id = 'manual-keeper-form';

    const searchWrap = document.createElement('div');
    searchWrap.className = 'manual-keeper-search-wrap';

    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'manual-keeper-input';
    input.className = 'coin-toss-search-input manual-keeper-input';
    input.placeholder = 'Title (Year)';
    input.autocomplete = 'off';
    input.addEventListener('input', handleManualKeeperSearch);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addManualKeeperMovie(input.value);
        }
    });
    searchWrap.appendChild(input);

    const dropdown = document.createElement('div');
    dropdown.id = 'manual-keeper-dropdown';
    dropdown.className = 'coin-toss-dropdown';
    dropdown.hidden = true;
    searchWrap.appendChild(dropdown);

    formRow.appendChild(searchWrap);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.id = 'manual-keeper-add-btn';
    addBtn.textContent = 'Add';
    addBtn.addEventListener('click', () => addManualKeeperMovie(input.value));
    formRow.appendChild(addBtn);

    section.appendChild(formRow);

    const status = document.createElement('div');
    status.id = 'manual-keeper-status';
    status.setAttribute('aria-live', 'polite');
    section.appendChild(status);

    filtersPanel.insertBefore(section, watchedPanel);
    updateManualKeeperPanelState();
}

const MARK_WATCHED_SCRIBBLE_PATH = window.uiAudioPaths.markWatchedScribble;
let markWatchedScribbleAudio = null;

function preloadMarkWatchedScribbleAudio() {
    if (!MARK_WATCHED_SCRIBBLE_PATH || markWatchedScribbleAudio) return;
    markWatchedScribbleAudio = new Audio(MARK_WATCHED_SCRIBBLE_PATH);
    markWatchedScribbleAudio.preload = 'auto';
    markWatchedScribbleAudio.load();
}

function playMarkWatchedScribbleSound() {
    if (!MARK_WATCHED_SCRIBBLE_PATH) return;

    preloadMarkWatchedScribbleAudio();
    const audio = markWatchedScribbleAudio;
    audio.volume = getNormalizedVolume(MARK_WATCHED_SCRIBBLE_PATH, cabinetMixer.victoryClipVolume);
    if (!audio.paused) audio.pause();
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.log('Mark watched scribble audio blocked or file not found:', MARK_WATCHED_SCRIBBLE_PATH, err);
    });
}

function updateResultMarkWatchedButton() {
    const btn = document.getElementById('mark-watched-btn');
    if (!btn) return;

    if (!hasSelectedMovie || !lastRevealedListing) {
        btn.hidden = true;
        return;
    }

    btn.hidden = false;
    const watched = isMovieWatched(lastRevealedListing);
    btn.classList.toggle('is-watched', watched);
    btn.setAttribute('aria-label', watched ? 'Return to rotation' : 'Mark as watched');
    btn.disabled = false;
}

function toggleCurrentResultWatched() {
    if (!lastRevealedListing) return;
    playMarkWatchedScribbleSound();
    if (isMovieWatched(lastRevealedListing)) {
        unmarkMovieAsWatched(lastRevealedListing);
    } else {
        markMoviesAsWatched([lastRevealedListing]);
    }
}

async function markTicketStubsAsWatched() {
    if (keeperPicks.length === 0) return;

    const listings = keeperPicks.map((pick) => getKeeperListingLabel(pick.label));
    markMoviesAsWatched(listings);

    const copyStatus = document.getElementById('ticket-stubs-copy-status');
    if (copyStatus) copyStatus.textContent = 'Marked as watched!';

    keeperUiGeneration += 1;
    keeperPicks = [];
    updateKeeperPicksUI(false);
    updateKeeperButtonState();

    await closeTicketStubsPanel();
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

// --- ADD MOVIES UI ---

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

Only edit app/main.js (the live app). Don't update docs/archive/Pick-A-Flick-Cursor.html unless I ask.`;
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

function findExactListingInCatalog(query) {
    const lower = query.trim().toLowerCase();
    for (const movies of Object.values(movieDatabase)) {
        for (const listing of movies) {
            if (listing.toLowerCase() === lower) {
                return listing;
            }
        }
    }
    return null;
}

function resolveWatchedImportLine(rawLine) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
        return { skip: true };
    }

    const query = getKeeperListingLabel(trimmed);
    if (!query) {
        return { skip: true };
    }

    let listing = findExactListingInCatalog(query);
    let warning = null;

    if (!listing) {
        const { matches } = findMovieListingInDatabase(query);
        const listings = [...new Set(
            matches
                .map((match) => match.listing || getKeeperListingLabel(match.label))
                .filter(Boolean)
        )];

        if (listings.length === 0) {
            return { error: 'Not found in catalog.' };
        }
        if (listings.length > 1) {
            const preview = listings.slice(0, 3).map((title) => `"${title}"`).join(', ');
            const suffix = listings.length > 3 ? ', ...' : '';
            return { error: `Ambiguous — ${listings.length} matches: ${preview}${suffix}` };
        }

        listing = listings[0];
        if (query.toLowerCase() !== listing.toLowerCase()) {
            warning = `Fuzzy match: "${listing}"`;
        }
    }

    if (isMovieWatched(listing)) {
        return { listing, warning: 'Already watched.', skipResolved: true };
    }

    return { listing, warning };
}

function parseBulkWatchedInput(raw) {
    const lines = raw.split(/\r?\n/);
    const resolved = [];
    const errors = [];
    const warnings = [];
    const seenInBatch = new Set();

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        if (!trimmed) return;

        const result = resolveWatchedImportLine(line);
        if (result.skip) return;

        if (result.error) {
            errors.push({ lineNum, message: result.error });
            return;
        }

        if (result.skipResolved) {
            warnings.push({ lineNum, message: result.warning || 'Already watched.' });
            return;
        }

        if (result.warning) {
            warnings.push({ lineNum, message: result.warning });
        }

        if (seenInBatch.has(result.listing)) {
            warnings.push({
                lineNum,
                message: `Duplicate in list: "${result.listing}" — skipped.`,
            });
            return;
        }
        seenInBatch.add(result.listing);

        resolved.push({
            listing: result.listing,
            lineNum,
            warning: result.warning,
        });
    });

    if (!raw.trim()) {
        errors.push({ lineNum: 0, message: 'Enter at least one movie.' });
    }

    return { resolved, errors, warnings };
}

function setMarkWatchedImportStatus(message, isError = false) {
    const status = document.getElementById('mark-watched-bulk-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('mark-watched-bulk-status-error', isError);
    status.classList.toggle(
        'mark-watched-bulk-status-success',
        !isError && message.startsWith('Imported')
    );
}

function hideMarkWatchedBatchSummary() {
    const preview = document.getElementById('mark-watched-bulk-preview');
    if (preview) preview.hidden = true;
}

function showMarkWatchedBatchSummary(resolved) {
    const preview = document.getElementById('mark-watched-bulk-preview');
    let list = document.getElementById('mark-watched-bulk-preview-list');
    if (!preview) return;

    if (!list) {
        list = document.createElement('ul');
        list.id = 'mark-watched-bulk-preview-list';
        preview.appendChild(list);
    }

    list.innerHTML = '';
    resolved.forEach(({ listing }) => {
        const item = document.createElement('li');
        item.textContent = `\u2713 ${listing}`;
        list.appendChild(item);
    });

    preview.hidden = false;
}

let markWatchedLineHighlightsTimer = null;

function syncMarkWatchedHighlightScroll() {
    const input = document.getElementById('mark-watched-bulk-input');
    const highlightsInner = document.getElementById('mark-watched-bulk-highlights-inner');
    if (!input || !highlightsInner) return;
    highlightsInner.style.transform = `translateY(-${input.scrollTop}px)`;
}

function resizeMarkWatchedTextarea() {
    const input = document.getElementById('mark-watched-bulk-input');
    if (!input) return;
    input.style.height = 'auto';
    const minHeight = 90;
    input.style.height = `${Math.max(minHeight, input.scrollHeight)}px`;
}

function updateMarkWatchedLineHighlights() {
    const input = document.getElementById('mark-watched-bulk-input');
    const highlightsInner = document.getElementById('mark-watched-bulk-highlights-inner');
    if (!input || !highlightsInner) return;

    const raw = input.value;
    const lines = raw.split(/\r?\n/);
    const { errors, warnings } = parseBulkWatchedInput(raw);
    const errorLines = new Set(
        errors.filter((entry) => entry.lineNum > 0).map((entry) => entry.lineNum)
    );
    const warningLines = new Set(
        warnings.filter((entry) => entry.lineNum > 0).map((entry) => entry.lineNum)
    );

    highlightsInner.replaceChildren();
    lines.forEach((line, index) => {
        const lineEl = document.createElement('div');
        lineEl.className = 'mark-watched-bulk-line';
        const lineNum = index + 1;
        if (errorLines.has(lineNum)) {
            lineEl.classList.add('mark-watched-bulk-line-error');
        } else if (warningLines.has(lineNum)) {
            lineEl.classList.add('mark-watched-bulk-line-warning');
        }
        lineEl.textContent = line.length ? line : '\u00a0';
        highlightsInner.appendChild(lineEl);
    });

    syncMarkWatchedHighlightScroll();

    const lineErrors = errors.filter((entry) => entry.lineNum > 0);
    if (lineErrors.length) {
        const message = lineErrors
            .map(({ lineNum, message: errorMessage }) => `Line ${lineNum}: ${errorMessage}`)
            .join(' ');
        setMarkWatchedImportStatus(message, true);
    } else if (errors.length) {
        setMarkWatchedImportStatus(errors[0].message, true);
    } else {
        const status = document.getElementById('mark-watched-bulk-status');
        if (status?.classList.contains('mark-watched-bulk-status-error')) {
            setMarkWatchedImportStatus('', false);
        }
    }
}

function scheduleMarkWatchedLineHighlights() {
    if (markWatchedLineHighlightsTimer) {
        clearTimeout(markWatchedLineHighlightsTimer);
    }
    markWatchedLineHighlightsTimer = setTimeout(() => {
        markWatchedLineHighlightsTimer = null;
        updateMarkWatchedLineHighlights();
    }, 150);
}

function submitMarkWatchedBulkImport() {
    const input = document.getElementById('mark-watched-bulk-input');
    const submitBtn = document.getElementById('mark-watched-bulk-submit');
    if (!input || !submitBtn) return;

    const { resolved, errors, warnings } = parseBulkWatchedInput(input.value);

    if (resolved.length === 0) {
        if (errors.length) {
            const message = errors
                .map(({ lineNum, message: errorMessage }) => (
                    lineNum > 0 ? `Line ${lineNum}: ${errorMessage}` : errorMessage
                ))
                .join(' ');
            setMarkWatchedImportStatus(message, true);
        } else if (warnings.length) {
            setMarkWatchedImportStatus('All entries were already watched or duplicates.', true);
        } else {
            setMarkWatchedImportStatus('Enter at least one movie.', true);
        }
        hideMarkWatchedBatchSummary();
        return;
    }

    submitBtn.disabled = true;
    const listings = resolved.map((entry) => entry.listing);
    markMoviesAsWatched(listings);

    let statusMsg = `Imported ${listings.length} title${listings.length === 1 ? '' : 's'}.`;
    const lineErrors = errors.filter((entry) => entry.lineNum > 0);
    if (lineErrors.length) {
        statusMsg += ` ${lineErrors
            .map(({ lineNum, message: errorMessage }) => `Line ${lineNum}: ${errorMessage}`)
            .join(' ')}`;
    }
    const warningSuffix = formatBatchWarnings(warnings);
    if (warningSuffix) {
        statusMsg += ` ${warningSuffix}`;
    }

    setMarkWatchedImportStatus(statusMsg, lineErrors.length > 0);
    showMarkWatchedBatchSummary(resolved);
    input.value = '';
    resizeMarkWatchedTextarea();
    updateMarkWatchedLineHighlights();
    submitBtn.disabled = false;
}

// --- MARK WATCHED BULK IMPORT ---

function buildWatchedBulkImportUI() {
    const filtersPanel = document.getElementById('filters-panel');
    if (!filtersPanel || document.getElementById('mark-watched-bulk')) return;

    const section = document.createElement('div');
    section.id = 'mark-watched-bulk';

    const label = document.createElement('div');
    label.id = 'mark-watched-bulk-label';
    label.textContent = 'MARK AS WATCHED';
    section.appendChild(label);

    const hint = document.createElement('div');
    hint.id = 'mark-watched-bulk-hint';
    hint.textContent = 'One per line: Title (Year) or partial title — Ctrl+Enter to import';
    section.appendChild(hint);

    const form = document.createElement('div');
    form.id = 'mark-watched-bulk-form';

    const editorWrap = document.createElement('div');
    editorWrap.id = 'mark-watched-bulk-editor-wrap';

    const highlights = document.createElement('div');
    highlights.id = 'mark-watched-bulk-highlights';
    highlights.setAttribute('aria-hidden', 'true');

    const highlightsInner = document.createElement('div');
    highlightsInner.id = 'mark-watched-bulk-highlights-inner';
    highlights.appendChild(highlightsInner);
    editorWrap.appendChild(highlights);

    const titleInput = document.createElement('textarea');
    titleInput.id = 'mark-watched-bulk-input';
    titleInput.rows = 5;
    titleInput.placeholder = 'Aliens (1986)\nDistrict 9 (2009)\nBlade Runner';
    titleInput.autocomplete = 'off';
    titleInput.addEventListener('input', () => {
        resizeMarkWatchedTextarea();
        scheduleMarkWatchedLineHighlights();
    });
    titleInput.addEventListener('scroll', syncMarkWatchedHighlightScroll);
    titleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            submitMarkWatchedBulkImport();
        }
    });
    editorWrap.appendChild(titleInput);
    form.appendChild(editorWrap);

    const controlsRow = document.createElement('div');
    controlsRow.id = 'mark-watched-bulk-controls';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.id = 'mark-watched-bulk-submit';
    submitBtn.textContent = 'Import as Watched';
    submitBtn.addEventListener('click', submitMarkWatchedBulkImport);
    controlsRow.appendChild(submitBtn);

    form.appendChild(controlsRow);
    section.appendChild(form);

    const preview = document.createElement('div');
    preview.id = 'mark-watched-bulk-preview';
    preview.hidden = true;
    section.appendChild(preview);

    const status = document.createElement('div');
    status.id = 'mark-watched-bulk-status';
    status.setAttribute('aria-live', 'polite');
    section.appendChild(status);

    const addAFlick = document.getElementById('add-a-flick');
    if (addAFlick) {
        filtersPanel.insertBefore(section, addAFlick);
    } else {
        filtersPanel.appendChild(section);
    }
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
    label.textContent = 'ADD A NEW FLICK';
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

// --- TICKET SHUFFLE CONSTANTS ---

const SHUFFLE_TICKET_COUNT = 4;
const SHUFFLE_QUADRANT_SLOTS = [
    { left: 28, top: 28 },
    { left: 72, top: 28 },
    { left: 28, top: 72 },
    { left: 72, top: 72 }
];
const SHUFFLE_CW_NEXT = { 0: 1, 1: 3, 3: 2, 2: 0 };
const SHUFFLE_CCW_NEXT = { 0: 2, 2: 3, 3: 1, 1: 0 };
const SHUFFLE_DIAGONAL_PAIRS = [[0, 3], [1, 2]];
const SHUFFLE_ADJACENT_PAIRS = [[0, 1], [1, 3], [3, 2], [2, 0]];
const SHUFFLE_CROSS_SWAP_PAUSE_MS = 120;
const SHUFFLE_SWAP_MS_FAST = 500;
const SHUFFLE_SWAP_MS = 450;
const SHUFFLE_SWAP_MS_SLOW = 900;
const SHUFFLE_BURST_MS = 350;
const SHUFFLE_SPIN_MS = 900;
const SHUFFLE_FEINT_MS = 550;
const SHUFFLE_MIDAIR_JITTER_MS = 80;
const SHUFFLE_MISDIRECT_PULSE_MS = 50;
const SHUFFLE_FLIP_MS = 650;
const SHUFFLE_EMERGE_MS = 1500;
const SHUFFLE_PAIR_REST_MS = 1000;
const SHUFFLE_POSTER_FADE_MS = 1400;
const SHUFFLE_ROW_ALIGN_MS = 600;
const SHUFFLE_CROSSFADE_REST_MS = 1000;
const SHUFFLE_STACK_MS = 800;
const SHUFFLE_STACK_REST_MS = 1000;
const SHUFFLE_QUADRANT_DEPLOY_MS = 1000;
const SHUFFLE_PRE_SHUFFLE_REST_MS = 1000;
const SHUFFLE_ARC_OFFSET_PX = 48;
const SHUFFLE_ROW_SLOTS = [
    { left: 18, top: 50 },
    { left: 39, top: 50 },
    { left: 61, top: 50 },
    { left: 82, top: 50 }
];
const SHUFFLE_ROW_TICKET_ORDER = [2, 0, 1, 3];
const SHUFFLE_CONFIRM_WINNER_POS = { left: 50, top: 24 };
const SHUFFLE_CONFIRM_WINNER_SCALE = 3;
const SHUFFLE_CONFIRM_BOWER_POS = [
    { left: 22, top: 78, bow: 'left' },
    { left: 50, top: 82, bow: 'center' },
    { left: 78, top: 78, bow: 'right' }
];
const SHUFFLE_MYSTERY_SEQUEL_CATEGORY = 'SEQUEL STREET 🚗';

const SHUFFLE_JOKER_DISINTEGRATE_MS = 1400;
const SHUFFLE_JOKER_WHOOSH_PRE_ANIM_MS = 150;
const SHUFFLE_CONFIRM_ANIM_MS = 450;
const SHUFFLE_LOCK_IN_PATH = window.uiAudioPaths.shuffleLockIn;
const SHUFFLE_SHORT_SHUFFLE_PATH = window.uiAudioPaths.shuffleShortShuffle;
const SHUFFLE_JOKER_WHOOSH_PATH = window.uiAudioPaths.shuffleJokerWhoosh;
const SHUFFLE_GOLDEN_TICKET_PATH = window.uiAudioPaths.shuffleGoldenTicket;
const SHUFFLE_TROLL_PATH = window.uiAudioPaths.shuffleTroll;
const SHUFFLE_LOCK_IN_DURATION_FALLBACK_MS = 800;
const SHUFFLE_LOCK_IN_OVERLAY_DELAY_MS = 200;
const SHUFFLE_LOCK_IN_DECK_LAYERS = 5;
const SHUFFLE_GOLDEN_TICKET_MIN_PLAYBACK_RATE = 0.75;
const SHUFFLE_GOLDEN_TICKET_MAX_PLAYBACK_RATE = 3.0;

let shuffleIntroAudios = [];
let shuffleUiAudio = null;
let shuffleLockInAudio = null;
let shuffleLockInOverlayAudio = null;
let shuffleLockInOverlayTimer = null;
let shuffleLockInDurationMs = null;
let shuffleTrollAudio = null;

// --- TICKET SHUFFLE AUDIO ---

function stopShuffleIntroAudio() {
    shuffleIntroAudios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
    shuffleIntroAudios = [];
}

function stopShuffleUiAudio() {
    if (shuffleUiAudio) {
        shuffleUiAudio.pause();
        shuffleUiAudio.currentTime = 0;
        shuffleUiAudio = null;
    }
}

function stopShuffleLockInSounds() {
    if (shuffleLockInOverlayTimer !== null) {
        window.clearTimeout(shuffleLockInOverlayTimer);
        shuffleLockInOverlayTimer = null;
    }
    if (shuffleLockInAudio) {
        shuffleLockInAudio.pause();
        shuffleLockInAudio.currentTime = 0;
        shuffleLockInAudio = null;
    }
    if (shuffleLockInOverlayAudio) {
        shuffleLockInOverlayAudio.pause();
        shuffleLockInOverlayAudio.currentTime = 0;
        shuffleLockInOverlayAudio = null;
    }
}

function stopShuffleTrollAudio() {
    if (shuffleTrollAudio) {
        shuffleTrollAudio.pause();
        shuffleTrollAudio.currentTime = 0;
        shuffleTrollAudio = null;
    }
}

function startShuffleTrollAudio() {
    stopShuffleTrollAudio();
    const audio = new Audio(SHUFFLE_TROLL_PATH);
    shuffleTrollAudio = audio;
    audio.volume = getNormalizedVolume(SHUFFLE_TROLL_PATH, cabinetMixer.victoryClipVolume);
    audio.play().catch((err) => {
        console.log('Shuffle troll audio blocked or file not found:', SHUFFLE_TROLL_PATH, err);
        if (shuffleTrollAudio === audio) shuffleTrollAudio = null;
    });
    audio.onended = () => {
        if (shuffleTrollAudio === audio) shuffleTrollAudio = null;
    };
}

function clearShuffleLockInUI() {
    const shufflePreview = document.getElementById('shuffle-preview');
    const flightWrap = document.getElementById('coin-toss-flight-wrap');
    shufflePreview?.classList.remove('shuffle-locking-in');
    flightWrap?.classList.remove('shuffle-lock-in-active');
    shufflePreview?.style.removeProperty('--shuffle-lock-in-duration');
    flightWrap?.style.removeProperty('--shuffle-lock-in-duration');
}

function loadShuffleLockInDurationMs() {
    if (shuffleLockInDurationMs != null) return Promise.resolve(shuffleLockInDurationMs);

    return new Promise((resolve) => {
        const audio = new Audio(SHUFFLE_LOCK_IN_PATH);
        const finish = (ms) => {
            shuffleLockInDurationMs = ms;
            resolve(ms);
        };
        audio.addEventListener('loadedmetadata', () => {
            const ms = Number.isFinite(audio.duration) && audio.duration > 0
                ? Math.round(audio.duration * 1000)
                : SHUFFLE_LOCK_IN_DURATION_FALLBACK_MS;
            finish(ms);
        }, { once: true });
        audio.addEventListener('error', () => {
            finish(SHUFFLE_LOCK_IN_DURATION_FALLBACK_MS);
        }, { once: true });
        audio.load();
    });
}

function playShuffleUiClip(relativePath, options = {}) {
    stopShuffleUiAudio();
    const audio = new Audio(relativePath);
    shuffleUiAudio = audio;
    if (options.playbackRate) {
        audio.playbackRate = options.playbackRate;
    }
    audio.volume = getNormalizedVolume(relativePath, cabinetMixer.victoryClipVolume);
    audio.play().catch((err) => {
        console.log('Shuffle UI audio blocked or file not found:', relativePath, err);
        if (shuffleUiAudio === audio) shuffleUiAudio = null;
    });
    audio.onended = () => {
        if (shuffleUiAudio === audio) shuffleUiAudio = null;
    };
    return audio;
}

function playShuffleOverlayClip(relativePath) {
    const audio = new Audio(relativePath);
    audio.volume = getNormalizedVolume(relativePath, cabinetMixer.victoryClipVolume);
    audio.play().catch((err) => {
        console.log('Shuffle overlay audio blocked or file not found:', relativePath, err);
    });
    return audio;
}

function playShuffleLockInSounds() {
    stopShuffleLockInSounds();
    shuffleLockInAudio = playShuffleOverlayClip(SHUFFLE_LOCK_IN_PATH);
    shuffleLockInOverlayTimer = window.setTimeout(() => {
        shuffleLockInOverlayTimer = null;
        shuffleLockInOverlayAudio = playShuffleOverlayClip(SHUFFLE_SHORT_SHUFFLE_PATH);
    }, SHUFFLE_LOCK_IN_OVERLAY_DELAY_MS);
}

function getShuffleGoldenTicketPlaybackRate() {
    const map = window.shuffleGoldenTicketMap;
    const clipDurationMs = map?.clipDurationMs ?? 2000;
    const dingMs = map?.dingMs ?? Math.round(clipDurationMs * 0.75);
    const rawRate = dingMs / SHUFFLE_CONFIRM_ANIM_MS;
    return Math.min(
        SHUFFLE_GOLDEN_TICKET_MAX_PLAYBACK_RATE,
        Math.max(SHUFFLE_GOLDEN_TICKET_MIN_PLAYBACK_RATE, rawRate)
    );
}

function playShuffleGoldenTicketSound() {
    playShuffleUiClip(SHUFFLE_GOLDEN_TICKET_PATH, {
        playbackRate: getShuffleGoldenTicketPlaybackRate()
    });
}

async function playShuffleLockInTransition(durationMs, generation) {
    const shufflePreview = document.getElementById('shuffle-preview');
    const flightWrap = document.getElementById('coin-toss-flight-wrap');
    if (!shufflePreview || !flightWrap) {
        await shuffleSleep(durationMs);
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveMs = reducedMotion ? Math.min(durationMs, 200) : durationMs;

    shufflePreview.style.setProperty('--shuffle-lock-in-duration', `${effectiveMs}ms`);
    flightWrap.style.setProperty('--shuffle-lock-in-duration', `${effectiveMs}ms`);
    shufflePreview.classList.add('shuffle-locking-in');
    flightWrap.classList.add('shuffle-lock-in-active');

    await shuffleSleep(effectiveMs);
    if (generation !== coinTossGeneration) return;

    clearShuffleLockInUI();
}

function playShuffleIntroClip(key) {
    return; // cinematic intro SFX disabled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const relativePath = window.uiAudioPaths?.shuffleIntroSfx?.[key];
    if (!relativePath) return;

    const audio = new Audio(relativePath);
    shuffleIntroAudios.push(audio);
    audio.volume = getNormalizedVolume(relativePath, cabinetMixer.victoryClipVolume);
    audio.play().catch((err) => {
        console.log('Shuffle intro audio blocked or file not found:', relativePath, err);
        shuffleIntroAudios = shuffleIntroAudios.filter((entry) => entry !== audio);
    });
    audio.onended = () => {
        shuffleIntroAudios = shuffleIntroAudios.filter((entry) => entry !== audio);
    };
}

// --- COIN TOSS AND MINIGAME STATE ---

const COIN_FLIP_1_PATH = window.uiAudioPaths.coinFlip1;
const COIN_FLIP_2_PATH = window.uiAudioPaths.coinFlip2;
const COIN_FLIP_SPIN_SHORT_PATH = window.uiAudioPaths.coinFlipSpinShort;
const COIN_TOSS_CONFIRM_PATH = window.uiAudioPaths.coinTossConfirm;
const COIN_FLIP_SPIN_BED_CLIPS = window.uiAudioPaths.coinFlipSpinBedClips ?? [
    '..\audio/win/neon_skyline/HKE3.2.mp3',
    '..\audio/win/neon_skyline/HKE1.mp3',
    '..\audio/win/neon_skyline/HKE2.mp3',
    '..\audio/_staging/that-slow-motion-running-song-ii.mp3'
];
const COIN_FLIP_SPIN_BED_VOLUME_RATIO = 0.28;
const COIN_FLIP_SPIN_BED_FADE_MS = 80;
const COIN_FLIP_REGULAR_LOOPS = 1;
const COIN_FLIP_ACCEL_LOOPS = 19;
const COIN_FLIP_RAMP_LOOPS = 4;
const COIN_FLIP_1_DURATION_FALLBACK_MS = 770;
const COIN_FLIP_SPIN_SHORT_DURATION_FALLBACK_MS = 450;
const COIN_FLIP_ROTATIONS_PER_LOOP = 4;
const COIN_FLIP_FINAL_SEGMENT_MAX_FLIPS = 6;
const COIN_FLIP_TAIL_ROTATION_DEG = 180;
const COIN_ARM_SPIN_FLIP_COUNT = 8;
const COIN_ARM_SPIN_BED_MIN_VOLUME_RATIO = 0.12;
const COIN_LOCK_SHIMMER_MS = 600;
const COIN_BRIEF_SPIN_MIN_FLIPS = 6;
const COIN_BRIEF_SPIN_MAX_FLIPS = 10;

let coinTossSpinAudio = null;
let coinTossSpinAudioEnd = null;
let coinFlip1DurationMs = null;
let coinFlipSpinShortDurationMs = null;
let coinSpinDeg = 0;
let coinTossSpinShortAudio = null;
let coinTossFlipBedAudio = null;
let coinTossFlipBedFadeRaf = null;
let coinTossConfirmAudio = null;

function preloadCoinTossConfirmAudio() {
    if (!COIN_TOSS_CONFIRM_PATH || coinTossConfirmAudio) return;
    coinTossConfirmAudio = new Audio(COIN_TOSS_CONFIRM_PATH);
    coinTossConfirmAudio.preload = 'auto';
    coinTossConfirmAudio.load();
}

function coinFlipTransform(deg) {
    return `rotateX(${deg}deg)`;
}

let isShuffleActive = false;
let isCoinTossing = false;
let shufflePhase = 'idle';
let coinTossPhase = 'idle';
let shuffleTicketSlots = [0, 1, 2, 3];
let shuffleMysteryA = null;
let shuffleMysteryB = null;
let coinTossSlotA = null;
let coinTossSlotB = null;
let coinTossSlotC = null;
let coinTossSlotD = null;
let coinTossGeneration = 0;
let coinTossPendingWinner = null;
let coinTossPendingLoser = null;
let coinTossPendingWinnerIsFront = false;

function shuffleSleep(ms) {
    return new Promise((resolve) => { window.setTimeout(resolve, ms); });
}

function coinTossLabelsMatch(a, b) {
    return a && b && a === b;
}

const COIN_TOSS_SLOT_KEYS = ['a', 'b', 'c', 'd'];

function getCoinTossSlotElByKey(slotKey) {
    return document.getElementById(`coin-toss-slot-${slotKey}`);
}

function getCoinTossSlotByKey(slotKey) {
    if (slotKey === 'a') return coinTossSlotA;
    if (slotKey === 'b') return coinTossSlotB;
    if (slotKey === 'c') return coinTossSlotC;
    if (slotKey === 'd') return coinTossSlotD;
    return null;
}

function setCoinTossSlotByKey(slotKey, entry) {
    if (slotKey === 'a') coinTossSlotA = entry;
    else if (slotKey === 'b') coinTossSlotB = entry;
    else if (slotKey === 'c') coinTossSlotC = entry;
    else if (slotKey === 'd') coinTossSlotD = entry;
}

function getCoinTossUserSlotEntries() {
    return [coinTossSlotA, coinTossSlotB, coinTossSlotC, coinTossSlotD].filter(Boolean);
}

function getCoinTossExcludeLabels() {
    return getCoinTossUserSlotEntries().map((entry) => entry.label);
}

function coinTossUserSlotsAreUnique() {
    const labels = getCoinTossExcludeLabels();
    return new Set(labels).size === labels.length;
}

function areAllCoinTossSlotsFull() {
    return COIN_TOSS_SLOT_KEYS.every((key) => getCoinTossSlotByKey(key));
}

function isLabelInCoinTossSlot(label) {
    return getCoinTossUserSlotEntries().some((entry) => coinTossLabelsMatch(entry.label, label));
}

function renderAllCoinTossSlots() {
    COIN_TOSS_SLOT_KEYS.forEach((key) => {
        renderCoinTossSlot(getCoinTossSlotElByKey(key), getCoinTossSlotByKey(key));
    });
}

function clearAllCoinTossSlotDOM() {
    COIN_TOSS_SLOT_KEYS.forEach((key) => {
        const slotEl = getCoinTossSlotElByKey(key);
        if (!slotEl) return;
        slotEl.classList.remove('coin-toss-slot-winner', 'coin-toss-slot-loser', 'filled');
        slotEl.innerHTML = getInsertCoinMarkup();
    });
}

function clearAllCoinTossSlots() {
    coinTossSlotA = null;
    coinTossSlotB = null;
    coinTossSlotC = null;
    coinTossSlotD = null;
    clearAllCoinTossSlotDOM();
}

function buildCoinTossEntry(label, source, poster = null, runtimeMinutes = null) {
    const listing = getKeeperListingLabel(label);
    return {
        label,
        listing,
        poster,
        runtimeMinutes: runtimeMinutes ?? getMovieRuntimeMinutes(listing),
        source
    };
}

function getCoinTossPosterForEntry(entry) {
    let raw = null;
    if (entry.poster && entry.poster !== 'N/A') {
        raw = entry.poster;
    } else {
        const metadata = getMovieMetadata(entry.listing);
        if (metadata?.Poster && metadata.Poster !== 'N/A') {
            raw = metadata.Poster;
        }
    }
    if (!raw) return null;
    const candidates = getPosterLoadCandidates(raw);
    return candidates[0] || null;
}

function getCoinTossEmojiForEntry(entry) {
    const fromLabel = getKeeperCategoryEmoji(entry.label);
    if (fromLabel) return fromLabel;
    for (const category of Object.keys(movieDatabase)) {
        const movies = movieDatabase[category];
        if (movies.includes(entry.listing)) {
            const parts = category.split(' ');
            return parts[parts.length - 1];
        }
    }
    return '🎬';
}

function getCoinTossCandidates() {
    const seen = new Set();
    const candidates = [];

    const addCandidate = (entry) => {
        if (!entry?.label || seen.has(entry.label)) return;
        seen.add(entry.label);
        candidates.push(entry);
    };

    keeperPicks.forEach((pick) => {
        addCandidate(buildCoinTossEntry(pick.label, 'keeper', pick.poster, pick.runtimeMinutes));
    });

    recentSelections.forEach((label) => {
        addCandidate(buildCoinTossEntry(label, 'recent'));
    });

    if (hasSelectedMovie && lastRevealedLabel && lastRevealedListing) {
        const fromKeeper = keeperPicks.find((pick) => pick.label === lastRevealedLabel);
        addCandidate(buildCoinTossEntry(
            lastRevealedLabel,
            'current',
            fromKeeper?.poster ?? null,
            fromKeeper?.runtimeMinutes ?? null
        ));
    }

    return candidates;
}

function buildFilteredCoinTossPool(excludeLabels = [], categories = null) {
    const exclude = new Set(excludeLabels);
    const seen = new Set();
    const pool = [];
    const categoryList = categories ?? activeCategories;

    categoryList.forEach((category) => {
        const movies = getEligibleMovies(category);
        if (!movies.length) return;
        const parts = category.split(' ');
        const emoji = parts[parts.length - 1];
        movies.forEach((listing) => {
            const label = `${emoji} ${listing}`;
            if (exclude.has(label) || seen.has(label)) return;
            seen.add(label);
            pool.push(buildCoinTossEntry(label, 'mystery'));
        });
    });

    return pool;
}

function pickMysteryFlickForCoinToss() {
    if (isShuffleActive || isCoinTossing) return;

    const picked = drawNextMysteryFromCategories(activeCategories, getCoinTossExcludeLabels());
    if (!picked) {
        setCoinTossStatus('No movies match your filters.', true);
        return;
    }
    assignCoinTossSlot(resolveCoinTossEntry(picked));
}

function getShuffleBlockedReason() {
    if (!coinTossSlotA || !coinTossSlotB) return 'Pick two movies to shuffle.';
    if (!coinTossUserSlotsAreUnique()) return 'Pick different movies in each slot.';

    const exclude = getCoinTossExcludeLabels();
    const fullPool = buildFilteredCoinTossPool(exclude);

    if (!coinTossSlotC && !coinTossSlotD) {
        if (fullPool.length < 2) return 'Need at least 2 other filtered movies for mystery tickets.';
    } else if (!coinTossSlotC) {
        const sequelPool = buildFilteredCoinTossPool(exclude, [SHUFFLE_MYSTERY_SEQUEL_CATEGORY]);
        if (sequelPool.length === 0 && fullPool.length < 1) {
            return 'Need a Sequel Street mystery — pick slot C or adjust filters.';
        }
        if (!coinTossSlotD && fullPool.length < 1) {
            return 'Need a true random mystery — pick slot D or adjust filters.';
        }
    } else if (!coinTossSlotD) {
        if (fullPool.length < 1) return 'Need a true random mystery — pick slot D or adjust filters.';
    }

    const roundEntries = getCoinTossUserSlotEntries();
    if (!coinTossSlotC || !coinTossSlotD) {
        fullPool.slice(0, 2).forEach((entry) => roundEntries.push(resolveCoinTossEntry(entry)));
    }
    if (roundEntries.some((entry) => coinTossWouldNeedKeeperSlot(entry)) && getOpenKeeperSlots() === 0) {
        return 'Keeper full — discard a movie first.';
    }

    return '';
}

function resolveShuffleRoundTickets() {
    const exclude = getCoinTossExcludeLabels();
    const excludeListings = listingsFromExcludeLabels(exclude);
    shuffleMysteryA = null;
    shuffleMysteryB = null;

    let ticket2;
    let ticket2IsMystery;
    if (coinTossSlotC) {
        ticket2 = coinTossSlotC;
        ticket2IsMystery = false;
    } else {
        let firstEntry = drawNextMovieLabel(SHUFFLE_MYSTERY_SEQUEL_CATEGORY, { excludeListings });
        if (!firstEntry && !coinTossSlotD) {
            firstEntry = drawNextMysteryFromCategories(null, exclude);
            if (!firstEntry) return null;
            const secondExclude = [...exclude, firstEntry.label];
            const secondEntry = drawNextMysteryFromCategories(null, secondExclude);
            if (!secondEntry) return null;
            shuffleMysteryA = resolveCoinTossEntry(firstEntry);
            shuffleMysteryB = resolveCoinTossEntry(secondEntry);
            return {
                ticket2: shuffleMysteryA,
                ticket2IsMystery: true,
                ticket3: shuffleMysteryB,
                ticket3IsMystery: true
            };
        }
        if (!firstEntry) {
            firstEntry = drawNextMysteryFromCategories(null, exclude);
        }
        if (!firstEntry) return null;
        shuffleMysteryA = resolveCoinTossEntry(firstEntry);
        ticket2 = shuffleMysteryA;
        ticket2IsMystery = true;
    }

    let ticket3;
    let ticket3IsMystery;
    if (coinTossSlotD) {
        ticket3 = coinTossSlotD;
        ticket3IsMystery = false;
    } else {
        const mysteryExclude = [...exclude];
        if (ticket2IsMystery && ticket2?.label) mysteryExclude.push(ticket2.label);
        const secondEntry = drawNextMysteryFromCategories(null, mysteryExclude);
        if (!secondEntry) return null;
        shuffleMysteryB = resolveCoinTossEntry(secondEntry);
        ticket3 = shuffleMysteryB;
        ticket3IsMystery = true;
    }

    return { ticket2, ticket2IsMystery, ticket3, ticket3IsMystery };
}

function findMovieListingInDatabase(query) {
    const normalized = query.trim();
    if (!normalized) return { matches: [] };

    const exact = [];
    const partial = [];
    const lower = normalized.toLowerCase();

    for (const category of Object.keys(movieDatabase)) {
        const parts = category.split(' ');
        const categoryEmoji = parts[parts.length - 1];
        for (const listing of movieDatabase[category]) {
            const label = `${categoryEmoji} ${listing}`;
            const listingLower = listing.toLowerCase();
            if (listingLower === lower || label.toLowerCase() === lower) {
                exact.push(buildCoinTossEntry(label, 'manual'));
            } else if (listingLower.includes(lower)) {
                partial.push(buildCoinTossEntry(label, 'manual'));
            }
        }
    }

    if (exact.length) return { matches: exact };
    return { matches: partial.slice(0, 12) };
}

function resolveCoinTossEntry(entry) {
    if (!entry?.label) return null;
    const poster = getCoinTossPosterForEntry(entry);
    return {
        label: entry.label,
        listing: entry.listing || getKeeperListingLabel(entry.label),
        poster,
        runtimeMinutes: entry.runtimeMinutes ?? getMovieRuntimeMinutes(entry.listing || getKeeperListingLabel(entry.label)),
        source: entry.source || 'manual'
    };
}

function isEntryInKeeper(entry) {
    return keeperPicks.some((pick) => pick.label === entry.label);
}

function getKeeperIndexForEntry(entry) {
    return keeperPicks.findIndex((pick) => pick.label === entry.label);
}

function coinTossWouldNeedKeeperSlot(entry) {
    return !isEntryInKeeper(entry);
}

function canRunCoinTossFlip() {
    if (isSpinning || isDiscardingKeeper || isCoinTossing || isShuffleActive) return false;
    if (!coinTossSlotA || !coinTossSlotB) return false;
    if (coinTossLabelsMatch(coinTossSlotA.label, coinTossSlotB.label)) return false;

    const winnerNeedsSlot = coinTossWouldNeedKeeperSlot(coinTossSlotA)
        || coinTossWouldNeedKeeperSlot(coinTossSlotB);
    if (winnerNeedsSlot && getOpenKeeperSlots() === 0) return false;

    return true;
}

function canStartTicketShuffle() {
    if (isSpinning || isDiscardingKeeper || isShuffleActive || isCoinTossing) return false;
    if (!coinTossSlotA || !coinTossSlotB) return false;
    if (!coinTossUserSlotsAreUnique()) return false;
    return !getShuffleBlockedReason();
}

function setCoinTossStatus(message, isError = false) {
    const status = document.getElementById('coin-toss-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('coin-toss-status-error', isError);
    status.classList.toggle('coin-toss-status-success', !isError && Boolean(message));
}

function setCoinTossSlotsBlind(hidden) {
    document.getElementById('coin-toss-slots-row')?.classList.toggle('coin-toss-slots-blind', hidden);
}

function clearShuffleArenaEntering() {
    document.getElementById('ticket-shuffle-arena')?.classList.remove('shuffle-arena-entering', 'is-visible');
}

function clearShuffleIntroUI() {
    stopShuffleIntroAudio();
    const slotsRow = document.getElementById('coin-toss-slots-row');
    slotsRow?.classList.remove(
        'coin-toss-slots-shuffle-intro',
        'coin-toss-slots-poster-fade',
        'coin-toss-shuffle-active'
    );
    const arena = document.getElementById('ticket-shuffle-arena');
    arena?.classList.remove('shuffle-intro-row', 'shuffle-intro-quadrant', 'shuffle-intro-emerge');
    clearShuffleArenaEntering();
}

function resetTicketShuffleArena() {
    const arena = document.getElementById('ticket-shuffle-arena');
    if (!arena) return;
    clearShuffleIntroUI();
    arena.classList.remove('shuffle-confirm-mode');
    arena.hidden = true;
    arena.innerHTML = '';
    shufflePhase = 'idle';
    shuffleTicketSlots = [0, 1, 2, 3];
    shuffleMysteryA = null;
    shuffleMysteryB = null;
}

function clearShuffleConfirmUI() {
    const arena = document.getElementById('ticket-shuffle-arena');
    if (!arena) return;
    arena.classList.remove('shuffle-confirm-mode');
    arena.querySelectorAll('.shuffle-ticket').forEach((btn) => {
        btn.classList.remove(
            'shuffle-ticket-selected',
            'shuffle-ticket-dimmed',
            'shuffle-reveal-pending',
            'shuffle-ticket-bower',
            'shuffle-ticket-bower-left',
            'shuffle-ticket-bower-center',
            'shuffle-ticket-bower-right'
        );
    });
}

function layoutShuffleConfirmSelection(arena, selectedEl) {
    const bowers = [...arena.querySelectorAll('.shuffle-ticket')]
        .filter((btn) => btn !== selectedEl)
        .sort((a, b) => parseFloat(a.style.left || 0) - parseFloat(b.style.left || 0));

    setTicketPosition(selectedEl, SHUFFLE_CONFIRM_WINNER_POS, {
        zIndex: 10,
        transform: `translate(-50%, -50%) scale(${SHUFFLE_CONFIRM_WINNER_SCALE})`
    });

    bowers.forEach((btn, index) => {
        const slot = SHUFFLE_CONFIRM_BOWER_POS[index];
        if (!slot) return;
        btn.classList.add('shuffle-ticket-bower', `shuffle-ticket-bower-${slot.bow}`);
        setTicketPosition(btn, { left: slot.left, top: slot.top }, {
            zIndex: 2,
            transform: 'translate(-50%, -50%)'
        });
    });
}

function setShuffleTicketSelection(arena, ticketEl) {
    arena.classList.add('shuffle-confirm-mode');
    arena.querySelectorAll('.shuffle-ticket').forEach((btn) => {
        btn.classList.remove(
            'shuffle-ticket-selected',
            'shuffle-ticket-dimmed',
            'shuffle-ticket-bower',
            'shuffle-ticket-bower-left',
            'shuffle-ticket-bower-center',
            'shuffle-ticket-bower-right'
        );
        if (btn === ticketEl) {
            btn.classList.add('shuffle-ticket-selected');
        } else {
            btn.classList.add('shuffle-ticket-dimmed');
        }
    });
    playShuffleGoldenTicketSound();
    layoutShuffleConfirmSelection(arena, ticketEl);
}

function revealShuffleTicketTitle(btn) {
    const entry = btn._shuffleEntry;
    if (!entry) return;
    btn.classList.remove('face-down', 'face-down-settled');

    const title = btn.querySelector('.shuffle-ticket-title');
    if (title) {
        title.textContent = `${getCoinTossEmojiForEntry(entry)} ${getKeeperListingLabel(entry.label)}`;
    }
}

function revealAllShuffleTicketTitles(arena) {
    arena.querySelectorAll('.shuffle-ticket').forEach(revealShuffleTicketTitle);
}

function setShuffleJokerArmed(armed) {
    const shufflePreview = document.getElementById('shuffle-preview');
    if (!shufflePreview) return;
    shufflePreview.classList.toggle('shuffle-joker-armed', armed);
    shufflePreview.disabled = !armed;
    shufflePreview.setAttribute('aria-label', armed ? 'Start shuffle' : 'Shuffle preview');
}

function cancelActiveTicketShuffle() {
    coinTossGeneration += 1;
    isShuffleActive = false;
    shufflePhase = 'idle';
    stopShuffleIntroAudio();
    stopShuffleUiAudio();
    stopShuffleLockInSounds();
    stopShuffleTrollAudio();
    clearShuffleLockInUI();
    setCoinTossSlotsBlind(false);
    clearShuffleConfirmUI();
    resetTicketShuffleArena();
    setShuffleJokerArmed(false);
    setCoinTossStageVisible(false);
    setMiddlePreviewMode(null);

    renderAllCoinTossSlots();

    setCoinTossStatus('Shuffle cancelled.');
    updateCoinTossCoinFaces();
    updateDecisionButtonStates();
}

function resetTicketShuffleState() {
    coinTossGeneration += 1;
    isShuffleActive = false;
    isCoinTossing = false;
    shufflePhase = 'idle';
    clearCoinTossPendingState();
    coinTossSlotA = null;
    coinTossSlotB = null;
    coinTossSlotC = null;
    coinTossSlotD = null;
    shuffleTicketSlots = [0, 1, 2, 3];
    shuffleMysteryA = null;
    shuffleMysteryB = null;
    stopShuffleIntroAudio();
    stopShuffleUiAudio();
    stopShuffleLockInSounds();
    stopShuffleTrollAudio();
    clearShuffleLockInUI();
    stopCoinTossSpinAudio();
    setCoinTossStatus('');
    setCoinTossSlotsBlind(false);

    clearAllCoinTossSlotDOM();

    resetTicketShuffleArena();
    setShuffleJokerArmed(false);
    resetCoinTossStage();
    refreshCoinTossCandidatesUI();
    updateDecisionButtonStates();
}

function clearCoinFlipClasses(coin) {
    if (!coin) return;
    coin.classList.remove(
        'coin-toss-flipping',
        'coin-flip-lands-front',
        'coin-flip-lands-back',
        'coin-toss-spinning'
    );
    stopCoinTossVisualSpin(coin);
}

function clearCoinTossPendingState() {
    coinTossPhase = 'idle';
    coinTossPendingWinner = null;
    coinTossPendingLoser = null;
    coinTossPendingWinnerIsFront = false;
}

function clearCoinTossLandedUI() {
    const stage = document.getElementById('coin-toss-stage');
    const flightWrap = document.getElementById('coin-toss-flight-wrap');
    const coin = document.getElementById('coin-toss-coin');
    if (stage) stage.classList.remove('coin-toss-landed');
    if (flightWrap) {
        flightWrap.classList.remove('coin-toss-flipping', 'coin-toss-landed');
        flightWrap.style.transform = '';
    }
    if (coin) {
        coin.classList.remove(
            'coin-toss-flipping',
            'coin-toss-settled',
            'coin-toss-awaiting',
            'coin-toss-armed',
            'coin-toss-lock-shimmer',
            'coin-flip-lands-front',
            'coin-flip-lands-back',
            'coin-toss-spinning'
        );
        coin.querySelectorAll('.coin-face-winner').forEach((face) => {
            face.classList.remove('coin-face-winner');
        });
        stopCoinTossVisualSpin(coin);
        coin.disabled = true;
        coin.setAttribute('aria-label', 'Confirm coin toss winner');
    }
}

function clearCoinTossFaceStyles() {
    document.querySelectorAll('#coin-toss-coin .coin-face').forEach((face) => {
        face.classList.remove(
            'has-poster',
            'coin-face-winner',
            'coin-face-show-label',
            'coin-face-show-poster',
            'coin-face-show-landed'
        );
        const posterEl = face.querySelector('.coin-face-poster');
        const emojiEl = face.querySelector('.coin-face-emoji');
        const titleEl = face.querySelector('.coin-face-title');
        if (posterEl) posterEl.style.backgroundImage = '';
        if (emojiEl) emojiEl.textContent = '';
        if (titleEl) titleEl.textContent = '';
    });
}

function ensureCoinFaceStructure(faceEl) {
    if (!faceEl || faceEl.querySelector('.coin-face-label')) return;
    faceEl.innerHTML = `
        <div class="coin-face-poster"></div>
        <div class="coin-face-label">
            <span class="coin-face-emoji"></span>
            <span class="coin-face-title"></span>
        </div>
    `;
}

function applyCoinTossFaceEntry(entry, faceEl, mode = 'poster') {
    if (!faceEl || !entry) return;
    ensureCoinFaceStructure(faceEl);
    const posterEl = faceEl.querySelector('.coin-face-poster');
    const emojiEl = faceEl.querySelector('.coin-face-emoji');
    const titleEl = faceEl.querySelector('.coin-face-title');
    const url = getCoinTossPosterForEntry(entry);

    if (posterEl) {
        posterEl.style.backgroundImage = url ? `url(${JSON.stringify(url)})` : '';
    }
    faceEl.classList.toggle('has-poster', Boolean(url));
    if (emojiEl) {
        emojiEl.textContent = mode === 'landed' ? '' : getCoinTossEmojiForEntry(entry);
    }
    if (titleEl) titleEl.textContent = getKeeperListingLabel(entry.label);
    faceEl.classList.remove('coin-face-show-label', 'coin-face-show-poster', 'coin-face-show-landed');
    if (mode === 'label') {
        faceEl.classList.add('coin-face-show-label');
    } else if (mode === 'poster') {
        faceEl.classList.add('coin-face-show-poster');
    } else if (mode === 'landed') {
        faceEl.classList.add('coin-face-show-landed');
    }
}

function setCoinTossLabelSpinFaces() {
    const coin = document.getElementById('coin-toss-coin');
    if (!coin || !coinTossSlotA || !coinTossSlotB) return;
    applyCoinTossFaceEntry(coinTossSlotA, coin.querySelector('.coin-face-front'), 'label');
    applyCoinTossFaceEntry(coinTossSlotB, coin.querySelector('.coin-face-back'), 'label');
}

function applyCoinTossWinnerReveal(winner, winnerIsFront) {
    const coin = document.getElementById('coin-toss-coin');
    if (!coin) return;
    const winnerFace = coin.querySelector(winnerIsFront ? '.coin-face-front' : '.coin-face-back');
    const loserFace = coin.querySelector(winnerIsFront ? '.coin-face-back' : '.coin-face-front');
    if (loserFace) {
        loserFace.classList.remove('coin-face-winner');
        applyCoinTossFaceEntry(
            winnerIsFront ? coinTossSlotB : coinTossSlotA,
            loserFace,
            'label'
        );
    }
    if (winnerFace) {
        winnerFace.classList.add('coin-face-winner');
        applyCoinTossFaceEntry(winner, winnerFace, 'landed');
    }
}

function resetCoinTossStage() {
    const stage = document.getElementById('coin-toss-stage');
    const flightWrap = document.getElementById('coin-toss-flight-wrap');
    const coin = document.getElementById('coin-toss-coin');
    clearCoinTossLandedUI();
    if (stage) {
        stage.classList.remove('coin-toss-stage-active');
    }
    if (flightWrap) flightWrap.classList.remove('coin-toss-flipping');
    clearCoinFlipClasses(coin);
    setCoinTossStageVisible(isCoinTossing);
}

function canPreviewCoinToss() {
    return coinTossSlotA && coinTossSlotB && !isShuffleActive
        && coinTossPhase !== 'armed' && coinTossPhase !== 'flipping' && coinTossPhase !== 'awaitingConfirm';
}

function canPreviewShuffle() {
    return coinTossSlotA && coinTossSlotB && !isShuffleActive && !isCoinTossing
        && coinTossPhase !== 'armed' && coinTossPhase !== 'flipping' && coinTossPhase !== 'awaitingConfirm';
}

function setMiddlePreviewMode(mode) {
    const stage = document.getElementById('coin-toss-stage');
    const coin = document.getElementById('coin-toss-coin');
    const shufflePreview = document.getElementById('shuffle-preview');
    if (!stage || !coin || !shufflePreview) return;

    const isShuffle = mode === 'shuffle';
    stage.classList.toggle('coin-toss-stage-shuffle-preview', isShuffle);
    coin.hidden = isShuffle;
    shufflePreview.hidden = !isShuffle;
    shufflePreview.setAttribute('aria-hidden', String(!isShuffle));
    if (!isShuffle) {
        shufflePreview.classList.remove('shuffle-preview-disintegrating');
        setShuffleJokerArmed(false);
    }
    if (mode === 'coin' || mode === null) {
        coin.hidden = false;
    }
}

function setCoinTossStageVisible(visible) {
    const stage = document.getElementById('coin-toss-stage');
    if (!stage) return;
    stage.hidden = !visible;
    stage.classList.toggle('coin-toss-stage-visible', visible);
    if (!visible) setMiddlePreviewMode(null);
}

function showCoinTossPreview() {
    if (!canPreviewCoinToss()) return;
    preloadCoinTossConfirmAudio();
    setMiddlePreviewMode('coin');
    clearCoinTossFaceStyles();
    setCoinTossStageVisible(true);
}

function showShufflePreview() {
    if (!canPreviewShuffle()) return;
    setMiddlePreviewMode('shuffle');
    setCoinTossStageVisible(true);
}

function hideMiddlePreviewIfUnpinned() {
    const stage = document.getElementById('coin-toss-stage');
    if (stage?.classList.contains('shuffle-preview-exiting')) return;
    if (isCoinTossing || isShuffleActive) return;
    setCoinTossStageVisible(false);
}

function cleanupShuffleJokerDisintegrate(stage, shufflePreview, dustLayer) {
    stage?.classList.remove('shuffle-preview-exiting');
    dustLayer?.remove();
}

function appendShuffleJokerDustParticle(dustLayer, options) {
    const {
        kind = 'medium',
        size,
        ox,
        oy,
        dx,
        dy,
        delay,
        dur,
        rot,
        color,
        radius
    } = options;
    const particle = document.createElement('span');
    particle.className = `shuffle-joker-dust-particle shuffle-joker-dust-particle-${kind}`;
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--ox', `${ox}px`);
    particle.style.setProperty('--oy', `${oy}px`);
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--delay', `${delay}ms`);
    particle.style.setProperty('--dur', `${dur}ms`);
    particle.style.setProperty('--rot', `${rot}deg`);
    particle.style.setProperty('--dust-color', color);
    if (radius) particle.style.setProperty('--radius', radius);
    if (kind === 'chunk') particle.style.setProperty('--glow', '4px');
    dustLayer.appendChild(particle);
}

async function playShuffleJokerDisintegrate(generation) {
    const stage = document.getElementById('coin-toss-stage');
    const shufflePreview = document.getElementById('shuffle-preview');
    const flightWrap = document.getElementById('coin-toss-flight-wrap');
    if (!stage || !shufflePreview || !flightWrap) return;
    if (!stage.classList.contains('coin-toss-stage-shuffle-preview') || shufflePreview.hidden) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const durationMs = reducedMotion ? 200 : SHUFFLE_JOKER_DISINTEGRATE_MS;

    stage.classList.add('shuffle-preview-exiting');
    shufflePreview.classList.add('shuffle-preview-disintegrating');

    let dustLayer = null;
    if (!reducedMotion) {
        dustLayer = document.createElement('div');
        dustLayer.className = 'shuffle-joker-dust-layer';
        const dustColors = [
            'rgba(212, 175, 55, 0.95)',
            'rgba(255, 215, 0, 0.9)',
            'rgba(255, 193, 37, 0.88)',
            'rgba(139, 119, 42, 0.92)',
            'rgba(45, 35, 25, 0.88)',
            'rgba(90, 74, 58, 0.85)',
            'rgba(210, 180, 120, 0.8)'
        ];
        const smokeColors = [
            'rgba(210, 185, 110, 0.5)',
            'rgba(180, 150, 80, 0.42)',
            'rgba(120, 100, 70, 0.38)'
        ];
        const pickColor = (palette) => palette[Math.floor(Math.random() * palette.length)];
        const spawnSpread = (spread) => (Math.random() - 0.5) * spread;

        for (let i = 0; i < 48; i++) {
            appendShuffleJokerDustParticle(dustLayer, {
                kind: 'fine',
                size: 2 + Math.random() * 3.5,
                ox: spawnSpread(120),
                oy: spawnSpread(110),
                dx: 50 + Math.random() * 180,
                dy: -20 - Math.random() * 140,
                delay: Math.random() * 280,
                dur: 900 + Math.random() * 600,
                rot: (Math.random() - 0.5) * 420,
                color: pickColor(dustColors)
            });
        }
        for (let i = 0; i < 38; i++) {
            appendShuffleJokerDustParticle(dustLayer, {
                kind: 'chunk',
                size: 5 + Math.random() * 8,
                ox: spawnSpread(105),
                oy: spawnSpread(95),
                dx: 70 + Math.random() * 200,
                dy: -35 - Math.random() * 150,
                delay: Math.random() * 320,
                dur: 950 + Math.random() * 650,
                rot: (Math.random() - 0.5) * 480,
                color: pickColor(dustColors),
                radius: Math.random() > 0.45 ? '2px' : '50%'
            });
        }
        for (let i = 0; i < 14; i++) {
            appendShuffleJokerDustParticle(dustLayer, {
                kind: 'smoke',
                size: 14 + Math.random() * 16,
                ox: spawnSpread(90),
                oy: spawnSpread(80),
                dx: 40 + Math.random() * 160,
                dy: -50 - Math.random() * 120,
                delay: 40 + Math.random() * 360,
                dur: 1100 + Math.random() * 700,
                rot: (Math.random() - 0.5) * 120,
                color: pickColor(smokeColors)
            });
        }
        flightWrap.appendChild(dustLayer);
    }

    await new Promise((resolve) => window.setTimeout(resolve, durationMs));
    if (generation !== coinTossGeneration) {
        cleanupShuffleJokerDisintegrate(stage, shufflePreview, dustLayer);
        return;
    }
    cleanupShuffleJokerDisintegrate(stage, shufflePreview, dustLayer);
}

function hideCoinTossPreviewIfUnpinned() {
    hideMiddlePreviewIfUnpinned();
}

function refreshShufflePreviewIfHovering() {
    const shuffleBtn = document.getElementById('ticket-shuffle-start-btn');
    if (shuffleBtn?.matches(':hover')) {
        showShufflePreview();
    }
}

function refreshCoinTossPreviewIfHovering() {
    const flipBtn = document.getElementById('coin-toss-flip-btn');
    if (flipBtn?.matches(':hover')) {
        showCoinTossPreview();
        return;
    }
    refreshShufflePreviewIfHovering();
}

function updateCoinTossCoinFaces() {
    const coin = document.getElementById('coin-toss-coin');
    if (!coin) return;

    if (coinTossPhase === 'armed' || coinTossPhase === 'flipping' || coinTossPhase === 'awaitingConfirm') return;
    if (!coinTossSlotA || !coinTossSlotB || isShuffleActive) return;

    applyCoinTossFaceEntry(coinTossSlotA, coin.querySelector('.coin-face-front'), 'poster');
    applyCoinTossFaceEntry(coinTossSlotB, coin.querySelector('.coin-face-back'), 'poster');
}

function updateCoinTossFlipButtonState() {
    const flipBtn = document.getElementById('coin-toss-flip-btn');
    if (!flipBtn) return;

    if (coinTossPhase === 'armed') {
        const coin = document.getElementById('coin-toss-coin');
        flipBtn.disabled = Boolean(coin?.disabled);
        flipBtn.title = coin?.disabled ? 'Arming coin…' : '';
        return;
    }

    let blockedReason = '';
    if (isShuffleActive) {
        blockedReason = 'Shuffle in progress.';
    } else if (!coinTossSlotA || !coinTossSlotB) {
        blockedReason = 'Pick two movies to flip.';
    } else if (coinTossLabelsMatch(coinTossSlotA.label, coinTossSlotB.label)) {
        blockedReason = 'Pick two different movies.';
    } else if (getOpenKeeperSlots() === 0
        && (coinTossWouldNeedKeeperSlot(coinTossSlotA) || coinTossWouldNeedKeeperSlot(coinTossSlotB))) {
        blockedReason = 'Keeper full — discard a movie first.';
    }

    flipBtn.disabled = !canRunCoinTossFlip();
    flipBtn.title = blockedReason;
}

function updateDecisionButtonStates() {
    updateCoinTossFlipButtonState();
    updateTicketShuffleButtonState();
}

function preloadCoinTossPosters() {
    const urls = [
        getCoinTossPosterForEntry(coinTossSlotA),
        getCoinTossPosterForEntry(coinTossSlotB)
    ].filter(Boolean);

    if (!urls.length) return Promise.resolve();

    return Promise.all(urls.map((url) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
    })));
}

function loadCoinFlipSpinShortDurationMs() {
    if (coinFlipSpinShortDurationMs != null) return Promise.resolve(coinFlipSpinShortDurationMs);

    const activeBed = coinTossSpinShortAudio;
    if (activeBed) {
        if (Number.isFinite(activeBed.duration) && activeBed.duration > 0) {
            coinFlipSpinShortDurationMs = Math.round(activeBed.duration * 1000);
            return Promise.resolve(coinFlipSpinShortDurationMs);
        }
        return new Promise((resolve) => {
            const finish = (ms) => {
                coinFlipSpinShortDurationMs = ms;
                resolve(ms);
            };
            activeBed.addEventListener('loadedmetadata', () => {
                const ms = Number.isFinite(activeBed.duration) && activeBed.duration > 0
                    ? Math.round(activeBed.duration * 1000)
                    : COIN_FLIP_SPIN_SHORT_DURATION_FALLBACK_MS;
                finish(ms);
            }, { once: true });
            activeBed.addEventListener('error', () => {
                finish(COIN_FLIP_SPIN_SHORT_DURATION_FALLBACK_MS);
            }, { once: true });
        });
    }

    return new Promise((resolve) => {
        const audio = new Audio(COIN_FLIP_SPIN_SHORT_PATH);
        const finish = (ms) => {
            coinFlipSpinShortDurationMs = ms;
            resolve(ms);
        };
        audio.addEventListener('loadedmetadata', () => {
            const ms = Number.isFinite(audio.duration) && audio.duration > 0
                ? Math.round(audio.duration * 1000)
                : COIN_FLIP_SPIN_SHORT_DURATION_FALLBACK_MS;
            finish(ms);
        }, { once: true });
        audio.addEventListener('error', () => {
            finish(COIN_FLIP_SPIN_SHORT_DURATION_FALLBACK_MS);
        }, { once: true });
        audio.load();
    });
}

function getCoinTossArmSpinBedVolume(flipMs, fastestFlipMs) {
    const base = getNormalizedVolume(COIN_FLIP_SPIN_SHORT_PATH, cabinetMixer.victoryClipVolume);
    const velocityRatio = fastestFlipMs / flipMs;
    return base * Math.max(COIN_ARM_SPIN_BED_MIN_VOLUME_RATIO, Math.min(1, velocityRatio));
}

function setCoinTossArmSpinBedVolume(flipMs, fastestFlipMs) {
    if (!coinTossSpinShortAudio) return;
    coinTossSpinShortAudio.volume = getCoinTossArmSpinBedVolume(flipMs, fastestFlipMs);
}

function rampCoinTossArmSpinBedVolume(fromFlipMs, toFlipMs, fastestFlipMs, durationMs, generation) {
    if (!coinTossSpinShortAudio || durationMs <= 0 || generation !== coinTossGeneration) return;
    const fromVol = getCoinTossArmSpinBedVolume(fromFlipMs, fastestFlipMs);
    const toVol = getCoinTossArmSpinBedVolume(toFlipMs, fastestFlipMs);
    const start = performance.now();
    const tick = () => {
        if (generation !== coinTossGeneration || !coinTossSpinShortAudio) return;
        const t = Math.min(1, (performance.now() - start) / durationMs);
        coinTossSpinShortAudio.volume = fromVol + (toVol - fromVol) * t;
        if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

function buildArmSpinFlipDurations(totalMs, flipCount = COIN_ARM_SPIN_FLIP_COUNT) {
    const weights = Array.from({ length: flipCount }, (_, i) => (i + 1) ** 2);
    const sum = weights.reduce((a, b) => a + b, 0);
    return weights.map((w) => Math.max(20, Math.round((totalMs * w) / sum)));
}

function pickBriefSpinFlipCount(winnerIsFront) {
    let flipCount = COIN_BRIEF_SPIN_MIN_FLIPS
        + Math.floor(Math.random() * (COIN_BRIEF_SPIN_MAX_FLIPS - COIN_BRIEF_SPIN_MIN_FLIPS + 1));
    const needOdd = !winnerIsFront;
    if ((flipCount % 2 === 1) !== needOdd) flipCount += 1;
    return flipCount;
}

async function playCoinTossLockShimmer(coin, durationMs, generation) {
    if (!coin || generation !== coinTossGeneration) return;
    coin.classList.add('coin-toss-lock-shimmer');
    await shuffleSleep(durationMs);
    if (generation !== coinTossGeneration) return;
    coin.classList.remove('coin-toss-lock-shimmer');
}

async function playCoinTossBriefSpin(coin, durationMs, generation, winnerIsFront) {
    if (!coin || generation !== coinTossGeneration) return false;
    stopCoinTossVisualSpin(coin);
    coinSpinDeg = 0;
    coin.style.transform = coinFlipTransform(0);
    coin.classList.add('coin-toss-spinning');

    const flipCount = pickBriefSpinFlipCount(winnerIsFront);
    const flipDurations = buildArmSpinFlipDurations(durationMs, flipCount);
    const fastestFlipMs = flipDurations[0];
    setCoinTossArmSpinBedVolume(fastestFlipMs, fastestFlipMs);

    for (let i = 0; i < flipDurations.length; i += 1) {
        const flipMs = flipDurations[i];
        const nextFlipMs = flipDurations[i + 1] ?? flipMs;
        if (generation !== coinTossGeneration) return false;
        rampCoinTossArmSpinBedVolume(flipMs, nextFlipMs, fastestFlipMs, flipMs, generation);
        const ok = await animateCoinHalfFlip(coin, flipMs, generation);
        if (!ok) return false;
    }

    if (generation !== coinTossGeneration) return false;
    coin.classList.remove('coin-toss-spinning');
    cancelCoinSpinAnimations(coin);
    snapCoinToWinnerAngle(coin, winnerIsFront);
    return true;
}

function loadCoinFlip1DurationMs() {
    if (coinFlip1DurationMs != null) return Promise.resolve(coinFlip1DurationMs);
    const fromMap = window.coinFlipBlipMap?.clipDurationMs;
    if (fromMap) {
        coinFlip1DurationMs = fromMap;
        return Promise.resolve(fromMap);
    }
    return new Promise((resolve) => {
        const audio = new Audio(COIN_FLIP_1_PATH);
        const finish = (ms) => {
            coinFlip1DurationMs = ms;
            resolve(ms);
        };
        audio.addEventListener('loadedmetadata', () => {
            const ms = Number.isFinite(audio.duration) && audio.duration > 0
                ? Math.round(audio.duration * 1000)
                : COIN_FLIP_1_DURATION_FALLBACK_MS;
            finish(ms);
        }, { once: true });
        audio.addEventListener('error', () => {
            finish(COIN_FLIP_1_DURATION_FALLBACK_MS);
        }, { once: true });
        audio.load();
    });
}

function getCoinFlipBlipTimesMs() {
    const map = window.coinFlipBlipMap;
    if (map?.blipTimesMs?.length === COIN_FLIP_ROTATIONS_PER_LOOP) {
        return map.blipTimesMs;
    }
    const duration = coinFlip1DurationMs ?? COIN_FLIP_1_DURATION_FALLBACK_MS;
    return [1, 2, 3, 4].map((i) => Math.round((duration * i) / 5));
}

function buildBlipSyncedFlipDurations(playbackRate) {
    const blips = getCoinFlipBlipTimesMs();
    const scale = 1 / playbackRate;
    let prev = 0;
    return blips.map((blipMs) => {
        const flipMs = Math.max(1, Math.round((blipMs - prev) * scale));
        prev = blipMs;
        return flipMs;
    });
}

function getBlipFlipDuration(playbackRate, flipIndex) {
    const durations = buildBlipSyncedFlipDurations(playbackRate);
    return durations[flipIndex % durations.length];
}

function getCoinFlipTailDurationMs(playbackRate) {
    const blips = getCoinFlipBlipTimesMs();
    const duration = coinFlip1DurationMs ?? COIN_FLIP_1_DURATION_FALLBACK_MS;
    const lastBlip = blips[blips.length - 1];
    return Math.max(0, Math.round((duration - lastBlip) / playbackRate));
}

function buildCoinFlipLoopRates() {
    const ramp = [];
    for (let i = 1; i <= COIN_FLIP_RAMP_LOOPS; i += 1) {
        const exponent = COIN_FLIP_ACCEL_LOOPS - COIN_FLIP_RAMP_LOOPS + i;
        ramp.push(Math.pow(1.1, exponent));
    }

    const rates = Array(COIN_FLIP_REGULAR_LOOPS).fill(1);
    let rate = 1;
    for (let i = 0; i < COIN_FLIP_ACCEL_LOOPS; i += 1) {
        rate *= 1.1;
        rates.push(rate);
    }

    return [...ramp, ...rates.reverse()];
}

function stopCoinTossFlipBed({ immediate = true } = {}) {
    if (coinTossFlipBedFadeRaf !== null) {
        cancelAnimationFrame(coinTossFlipBedFadeRaf);
        coinTossFlipBedFadeRaf = null;
    }
    if (!coinTossFlipBedAudio) return;
    if (immediate) {
        coinTossFlipBedAudio.pause();
        coinTossFlipBedAudio.currentTime = 0;
        coinTossFlipBedAudio = null;
    }
}

function fadeOutCoinTossFlipBed(fadeMs = COIN_FLIP_SPIN_BED_FADE_MS) {
    const audio = coinTossFlipBedAudio;
    if (!audio) return Promise.resolve();
    if (coinTossFlipBedFadeRaf !== null) {
        cancelAnimationFrame(coinTossFlipBedFadeRaf);
        coinTossFlipBedFadeRaf = null;
    }
    const startVol = audio.volume;
    const start = performance.now();
    return new Promise((resolve) => {
        const tick = () => {
            if (!coinTossFlipBedAudio || coinTossFlipBedAudio !== audio) {
                resolve();
                return;
            }
            const t = Math.min(1, (performance.now() - start) / fadeMs);
            audio.volume = startVol * (1 - t);
            if (t >= 1) {
                coinTossFlipBedFadeRaf = null;
                stopCoinTossFlipBed({ immediate: true });
                resolve();
                return;
            }
            coinTossFlipBedFadeRaf = requestAnimationFrame(tick);
        };
        coinTossFlipBedFadeRaf = requestAnimationFrame(tick);
    });
}

function startCoinTossFlipBed(generation) {
    stopCoinTossFlipBed({ immediate: true });
    if (generation !== coinTossGeneration || !COIN_FLIP_SPIN_BED_CLIPS.length) return;

    const clipPath = COIN_FLIP_SPIN_BED_CLIPS[Math.floor(Math.random() * COIN_FLIP_SPIN_BED_CLIPS.length)];
    const audio = new Audio(clipPath);
    audio.volume = getNormalizedVolume(clipPath, cabinetMixer.victoryClipVolume) * COIN_FLIP_SPIN_BED_VOLUME_RATIO;
    audio.play().catch((err) => {
        console.log('Coin flip bed audio blocked or file not found:', clipPath, err);
    });
    coinTossFlipBedAudio = audio;
}

function stopCoinTossSpinBed() {
    if (coinTossSpinShortAudio) {
        coinTossSpinShortAudio.pause();
        coinTossSpinShortAudio.currentTime = 0;
        coinTossSpinShortAudio = null;
    }
}

function playCoinTossBedClip(relativePath, { loop = false } = {}) {
    const audio = new Audio(relativePath);
    audio.loop = loop;
    audio.volume = getNormalizedVolume(relativePath, cabinetMixer.victoryClipVolume);
    audio.play().catch((err) => {
        console.log('Coin toss bed audio blocked or file not found:', relativePath, err);
    });
    return audio;
}

function startCoinTossSpinBed(generation) {
    stopCoinTossSpinBed();
    if (generation !== coinTossGeneration) return;

    coinTossSpinShortAudio = playCoinTossBedClip(COIN_FLIP_SPIN_SHORT_PATH);
    if (coinTossSpinShortAudio) coinTossSpinShortAudio.volume = 0;
}

function stopCoinTossSpinAudio() {
    if (coinTossSpinAudio) {
        coinTossSpinAudio.pause();
        coinTossSpinAudio.currentTime = 0;
        coinTossSpinAudio = null;
    }
    if (coinTossSpinAudioEnd) {
        coinTossSpinAudioEnd();
        coinTossSpinAudioEnd = null;
    }
}

function playCoinFlip1Segment(playbackRate) {
    stopCoinTossSpinAudio();
    return new Promise((resolve) => {
        const audio = new Audio(COIN_FLIP_1_PATH);
        coinTossSpinAudio = audio;
        coinTossSpinAudioEnd = resolve;
        const finish = () => {
            if (coinTossSpinAudioEnd === resolve) coinTossSpinAudioEnd = null;
            if (coinTossSpinAudio === audio) coinTossSpinAudio = null;
            resolve();
        };
        audio.addEventListener('ended', finish, { once: true });
        audio.addEventListener('error', finish, { once: true });
        audio.playbackRate = playbackRate;
        audio.volume = getNormalizedVolume(COIN_FLIP_1_PATH, cabinetMixer.victoryClipVolume);
        audio.play().catch((err) => {
            console.log('Coin flip audio blocked or file not found:', COIN_FLIP_1_PATH, err);
            finish();
        });
    });
}

function playCoinTossArmConfirmSound() {
    if (!COIN_TOSS_CONFIRM_PATH) return;

    preloadCoinTossConfirmAudio();
    const audio = coinTossConfirmAudio;
    audio.volume = getNormalizedVolume(COIN_TOSS_CONFIRM_PATH, cabinetMixer.victoryClipVolume);
    if (!audio.paused) audio.pause();
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.log('Coin toss confirm audio blocked or file not found:', COIN_TOSS_CONFIRM_PATH, err);
    });
}

function playCoinTossLandSound() {
    stopCoinTossSpinBed();

    const landAudio = new Audio(COIN_FLIP_2_PATH);
    currentKeeperAudios.push(landAudio);
    landAudio.volume = getNormalizedVolume(COIN_FLIP_2_PATH, cabinetMixer.victoryClipVolume);

    const finishHkeBed = () => {
        fadeOutCoinTossFlipBed();
    };
    const cleanupLand = () => {
        currentKeeperAudios = currentKeeperAudios.filter((entry) => entry !== landAudio);
    };

    landAudio.addEventListener('ended', () => {
        cleanupLand();
        finishHkeBed();
    }, { once: true });
    landAudio.addEventListener('error', () => {
        cleanupLand();
        finishHkeBed();
    }, { once: true });
    landAudio.play().catch((err) => {
        console.log('Coin flip land audio blocked or file not found:', COIN_FLIP_2_PATH, err);
        cleanupLand();
        finishHkeBed();
    });
}

function isCoinSpinShowingFront() {
    const normalized = ((coinSpinDeg % 360) + 360) % 360;
    return normalized === 0;
}

async function runCoinFlipVisualSegment(coin, playbackRate, generation) {
    const flipDurations = buildBlipSyncedFlipDurations(playbackRate);
    for (const flipMs of flipDurations) {
        const ok = await animateCoinHalfFlip(coin, flipMs, generation);
        if (!ok) return false;
    }
    const tailMs = getCoinFlipTailDurationMs(playbackRate);
    return animateCoinSlowTailSpin(coin, tailMs, generation);
}

async function runCoinFlipFinalSegment(coin, playbackRate, generation, winnerIsFront) {
    if (isCoinSpinShowingFront() === winnerIsFront) {
        stopCoinTossSpinAudio();
        return generation === coinTossGeneration;
    }

    for (let flipIndex = 0; flipIndex < COIN_FLIP_FINAL_SEGMENT_MAX_FLIPS; flipIndex += 1) {
        if (generation !== coinTossGeneration) return false;
        const flipMs = getBlipFlipDuration(playbackRate, flipIndex);
        const ok = await animateCoinHalfFlip(coin, flipMs, generation);
        if (!ok) return false;
        if (isCoinSpinShowingFront() === winnerIsFront) {
            stopCoinTossSpinAudio();
            return true;
        }
    }

    return generation === coinTossGeneration;
}

async function runCoinTossSpinSequence(generation, coin, winnerIsFront) {
    await loadCoinFlip1DurationMs();
    const rates = buildCoinFlipLoopRates();
    const lastSegmentIndex = rates.length - 1;

    coinSpinDeg = 0;
    if (coin) {
        stopCoinTossVisualSpin(coin);
        coin.style.transform = coinFlipTransform(0);
        coin.classList.add('coin-toss-spinning');
    }

    for (let i = 0; i < rates.length; i += 1) {
        if (generation !== coinTossGeneration) return false;
        const rate = rates[i];
        if (i === lastSegmentIndex) {
            playCoinFlip1Segment(rate);
            const visualOk = await runCoinFlipFinalSegment(coin, rate, generation, winnerIsFront);
            if (!visualOk) return false;
        } else {
            const audioDone = playCoinFlip1Segment(rate);
            const visualDone = runCoinFlipVisualSegment(coin, rate, generation);
            const [visualOk] = await Promise.all([visualDone, audioDone]);
            if (!visualOk) return false;
        }
    }
    stopCoinTossSpinAudio();
    if (coin) {
        coin.classList.remove('coin-toss-spinning');
        cancelCoinSpinAnimations(coin);
        snapCoinToWinnerAngle(coin, winnerIsFront);
    }
    return generation === coinTossGeneration;
}

function stopCoinTossVisualSpin(coin) {
    if (coin) coin.getAnimations().forEach((anim) => anim.cancel());
    coinSpinDeg = 0;
}

function cancelCoinSpinAnimations(coin) {
    if (coin) coin.getAnimations().forEach((anim) => anim.cancel());
}

function snapCoinToWinnerAngle(coin, winnerIsFront) {
    if (!coin) return;
    coin.getAnimations().forEach((anim) => anim.cancel());
    const angle = winnerIsFront ? 0 : 180;
    coinSpinDeg = angle;
    coin.style.transform = coinFlipTransform(angle);
}

async function animateCoinHalfFlip(coin, durationMs, generation) {
    if (!coin || generation !== coinTossGeneration || durationMs <= 0) return false;
    cancelCoinSpinAnimations(coin);
    const fromDeg = coinSpinDeg;
    const toDeg = fromDeg + 180;
    const anim = coin.animate(
        [
            { transform: coinFlipTransform(fromDeg) },
            { transform: coinFlipTransform(toDeg) }
        ],
        { duration: durationMs, easing: 'linear', fill: 'forwards' }
    );
    try {
        await anim.finished;
    } catch {
        return false;
    }
    if (generation !== coinTossGeneration) return false;
    coinSpinDeg = toDeg;
    coin.style.transform = coinFlipTransform(toDeg);
    return true;
}

async function animateCoinSlowTailSpin(coin, tailMs, generation) {
    if (!coin || generation !== coinTossGeneration) return false;
    if (tailMs <= 0) return true;
    cancelCoinSpinAnimations(coin);
    const fromDeg = coinSpinDeg;
    const toDeg = fromDeg + COIN_FLIP_TAIL_ROTATION_DEG;
    const anim = coin.animate(
        [
            { transform: coinFlipTransform(fromDeg) },
            { transform: coinFlipTransform(toDeg) }
        ],
        { duration: tailMs, easing: 'linear', fill: 'forwards' }
    );
    try {
        await anim.finished;
    } catch {
        return false;
    }
    if (generation !== coinTossGeneration) return false;
    coinSpinDeg = toDeg;
    coin.style.transform = coinFlipTransform(toDeg);
    return true;
}

function cancelActiveCoinToss() {
    coinTossGeneration += 1;
    isCoinTossing = false;
    stopCoinTossSpinAudio();
    stopCoinTossSpinBed();
    stopCoinTossFlipBed();
    stopCoinTossVisualSpin(document.getElementById('coin-toss-coin'));
    clearCoinTossPendingState();
    clearCoinTossLandedUI();

    const stage = document.getElementById('coin-toss-stage');
    if (stage) stage.classList.remove('coin-toss-stage-active');

    renderAllCoinTossSlots();
    updateCoinTossCoinFaces();
    setCoinTossStageVisible(false);
    setCoinTossStatus('Coin toss cancelled.');
    updateDecisionButtonStates();
}

function confirmCoinToss() {
    if (coinTossPhase !== 'awaitingConfirm' || !coinTossPendingWinner || !coinTossPendingLoser) return;

    const winner = coinTossPendingWinner;
    const loser = coinTossPendingLoser;
    const winnerIsFront = coinTossPendingWinnerIsFront;

    const slotAEl = document.getElementById('coin-toss-slot-a');
    const slotBEl = document.getElementById('coin-toss-slot-b');

    setMarqueeText(`COIN TOSS // ${getKeeperListingLabel(winner.label)} WINS`);

    if (slotAEl && slotBEl) {
        const winnerEl = winnerIsFront ? slotAEl : slotBEl;
        const loserEl = winnerIsFront ? slotBEl : slotAEl;
        winnerEl.classList.add('coin-toss-slot-winner');
        loserEl.classList.add('coin-toss-slot-loser');
    }

    applyCoinTossResult(winner, loser);

    coinTossSlotA = null;
    coinTossSlotB = null;
    clearCoinTossPendingState();
    isCoinTossing = false;
    clearCoinTossLandedUI();

    if (slotAEl) {
        slotAEl.classList.remove('filled');
        slotAEl.innerHTML = getInsertCoinMarkup();
    }
    if (slotBEl) {
        slotBEl.classList.remove('filled');
        slotBEl.innerHTML = getInsertCoinMarkup();
    }

    resetCoinTossStage();
    setCoinTossStatus(`${getKeeperListingLabel(winner.label)} wins!`);
    refreshCoinTossCandidatesUI();
    updateDecisionButtonStates();
}

// --- COIN TOSS FLIP AND LAUNCH ---

async function armCoinToss({ autoLaunch = false } = {}) {
    if (!canRunCoinTossFlip()) {
        updateDecisionButtonStates();
        return;
    }

    coinTossGeneration += 1;
    const generation = coinTossGeneration;
    isCoinTossing = true;
    coinTossPhase = 'armed';
    coinTossPendingWinner = null;
    coinTossPendingLoser = null;

    playCoinTossArmConfirmSound();
    if (!isSpeedRunMode()) {
        startCoinTossFlipBed(generation);
    }
    if (generation !== coinTossGeneration) return;

    const coin = document.getElementById('coin-toss-coin');

    updateDecisionButtonStates();

    setMiddlePreviewMode('coin');
    setCoinTossStageVisible(true);

    const skipLockIn = autoLaunch || isInstantRevealMode();

    if (skipLockIn) {
        await preloadCoinTossPosters();
    } else {
        await Promise.all([
            playCoinTossLockShimmer(coin, COIN_LOCK_SHIMMER_MS, generation),
            preloadCoinTossPosters()
        ]);
    }
    if (generation !== coinTossGeneration) return;

    if (coin) {
        coin.disabled = false;
        coin.classList.add('coin-toss-armed');
        coin.setAttribute('aria-label', 'Flip coin');
    }

    updateCoinTossFlipButtonState();
    setCoinTossStatus('Click the coin or FLIP COIN to flip — Esc to cancel');

    if (autoLaunch && coinTossPhase === 'armed') {
        void launchCoinToss();
    }
}

async function launchCoinToss() {
    if (coinTossPhase !== 'armed') return;

    const generation = coinTossGeneration;
    coinTossPendingWinner = null;
    coinTossPendingLoser = null;

    const slotAEl = document.getElementById('coin-toss-slot-a');
    const slotBEl = document.getElementById('coin-toss-slot-b');
    const stage = document.getElementById('coin-toss-stage');
    const flightWrap = document.getElementById('coin-toss-flight-wrap');
    const coin = document.getElementById('coin-toss-coin');

    if (coin) {
        coin.disabled = true;
        coin.classList.remove('coin-toss-armed');
        coin.setAttribute('aria-label', 'Confirm coin toss winner');
    }
    if (slotAEl) slotAEl.classList.remove('coin-toss-slot-winner', 'coin-toss-slot-loser');
    if (slotBEl) slotBEl.classList.remove('coin-toss-slot-winner', 'coin-toss-slot-loser');

    const winnerIsFront = Math.random() < 0.5;
    const winner = winnerIsFront ? coinTossSlotA : coinTossSlotB;
    const loser = winnerIsFront ? coinTossSlotB : coinTossSlotA;

    setMiddlePreviewMode(null);
    setCoinTossStageVisible(true);
    if (generation !== coinTossGeneration) return;

    if (stage) stage.classList.add('coin-toss-stage-active');
    if (coin) {
        clearCoinFlipClasses(coin);
        coin.classList.remove('coin-toss-settled', 'coin-toss-awaiting');
    }
    if (flightWrap) {
        flightWrap.classList.remove('coin-toss-landed');
        flightWrap.style.transform = '';
    }

    if (coin && coinTossSlotA && coinTossSlotB) {
        applyCoinTossFaceEntry(coinTossSlotA, coin.querySelector('.coin-face-front'), 'poster');
        applyCoinTossFaceEntry(coinTossSlotB, coin.querySelector('.coin-face-back'), 'poster');
    }

    if (isSpeedRunMode()) {
        if (generation !== coinTossGeneration) return;

        stopCoinTossFlipBed();

        coinTossPendingWinner = winner;
        coinTossPendingLoser = loser;
        coinTossPendingWinnerIsFront = winnerIsFront;

        applyCoinTossWinnerReveal(winner, winnerIsFront);
        snapCoinToWinnerAngle(coin, winnerIsFront);
        if (coin) {
            coin.classList.add(
                'coin-toss-settled',
                'coin-toss-awaiting',
                winnerIsFront ? 'coin-flip-lands-front' : 'coin-flip-lands-back'
            );
            coin.disabled = false;
        }
        if (flightWrap) flightWrap.classList.add('coin-toss-landed');
        if (stage) stage.classList.add('coin-toss-landed');

        playCoinTossLandSound();
        coinTossPhase = 'awaitingConfirm';
        setCoinTossStatus('Click the coin to keep the winner — Esc to cancel');
        updateDecisionButtonStates();
        return;
    }

    coinTossPhase = 'flipping';
    updateDecisionButtonStates();
    if (generation !== coinTossGeneration) return;

    startCoinTossSpinBed(generation);
    if (generation !== coinTossGeneration) return;

    const spinDurationMs = await loadCoinFlipSpinShortDurationMs();
    if (generation !== coinTossGeneration) return;

    const spinOk = await playCoinTossBriefSpin(coin, spinDurationMs, generation, winnerIsFront);
    if (generation !== coinTossGeneration || !spinOk) {
        stopCoinTossSpinBed();
        stopCoinTossFlipBed();
        return;
    }

    playCoinTossLandSound();

    coinTossPendingWinner = winner;
    coinTossPendingLoser = loser;
    coinTossPendingWinnerIsFront = winnerIsFront;

    if (coin) {
        applyCoinTossWinnerReveal(winner, winnerIsFront);
        snapCoinToWinnerAngle(coin, winnerIsFront);
        coin.classList.add(
            'coin-toss-settled',
            'coin-toss-awaiting',
            winnerIsFront ? 'coin-flip-lands-front' : 'coin-flip-lands-back'
        );
        coin.disabled = false;
    }
    if (flightWrap) flightWrap.classList.add('coin-toss-landed');
    if (stage) stage.classList.add('coin-toss-landed');

    coinTossPhase = 'awaitingConfirm';
    setCoinTossStatus('Click the coin to keep the winner — Esc to cancel');
}

function renderCoinTossSlot(slotEl, entry) {
    if (!slotEl) return;
    slotEl.classList.remove('coin-toss-slot-winner', 'coin-toss-slot-loser');
    if (!entry) {
        slotEl.classList.remove('filled');
        slotEl.innerHTML = getInsertCoinMarkup();
        return;
    }

    slotEl.classList.add('filled');
    slotEl.innerHTML = '';

    const posterUrl = getCoinTossPosterForEntry(entry);
    if (posterUrl) {
        const img = document.createElement('img');
        img.className = 'coin-toss-slot-poster';
        img.src = posterUrl;
        img.alt = entry.label;
        slotEl.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'coin-toss-slot-poster coin-toss-slot-placeholder';
        placeholder.textContent = getCoinTossEmojiForEntry(entry);
        slotEl.appendChild(placeholder);
    }

    const title = document.createElement('span');
    title.className = 'coin-toss-slot-title';
    title.textContent = getKeeperListingLabel(entry.label);
    slotEl.appendChild(title);
}

function assignCoinTossSlot(entry) {
    if (isShuffleActive || isCoinTossing) return;
    const resolved = resolveCoinTossEntry(entry);
    if (!resolved) return;

    for (const key of COIN_TOSS_SLOT_KEYS) {
        const slot = getCoinTossSlotByKey(key);
        if (slot && coinTossLabelsMatch(slot.label, resolved.label)) {
            setCoinTossSlotByKey(key, null);
            renderCoinTossSlot(getCoinTossSlotElByKey(key), null);
            setCoinTossStatus('');
            updateCoinTossCoinFaces();
            refreshCoinTossPreviewIfHovering();
            updateDecisionButtonStates();
            refreshCoinTossCandidatesUI();
            return;
        }
    }

    for (const key of COIN_TOSS_SLOT_KEYS) {
        if (getCoinTossSlotByKey(key)) continue;
        if (isLabelInCoinTossSlot(resolved.label)) {
            setCoinTossStatus('Pick different movies in each slot.', true);
            return;
        }
        setCoinTossSlotByKey(key, resolved);
        renderCoinTossSlot(getCoinTossSlotElByKey(key), resolved);
        consumeListingAppearance(resolved.listing);
        setCoinTossStatus('');
        updateCoinTossCoinFaces();
        refreshCoinTossPreviewIfHovering();
        updateDecisionButtonStates();
        refreshCoinTossCandidatesUI();
        return;
    }

    setCoinTossStatus('All pick slots are full — click a slot to clear it.', true);
}

function clearCoinTossSlot(slotKey) {
    if (isShuffleActive || isCoinTossing) return;
    if (!COIN_TOSS_SLOT_KEYS.includes(slotKey)) return;
    setCoinTossSlotByKey(slotKey, null);
    renderCoinTossSlot(getCoinTossSlotElByKey(slotKey), null);
    setCoinTossStatus('');
    updateCoinTossCoinFaces();
    if (!canPreviewCoinToss()) {
        setCoinTossStageVisible(false);
    } else {
        refreshCoinTossPreviewIfHovering();
    }
    updateDecisionButtonStates();
    refreshCoinTossCandidatesUI();
}

function updateTicketShuffleButtonState() {
    const shuffleBtn = document.getElementById('ticket-shuffle-start-btn');
    if (!shuffleBtn) return;

    let blockedReason = '';
    if (shufflePhase === 'locking') {
        blockedReason = 'Shuffle locking in...';
    } else if (shufflePhase === 'armed') {
        blockedReason = 'Click the joker to shuffle.';
    } else if (isCoinTossing) {
        blockedReason = 'Coin flip in progress.';
    } else {
        blockedReason = getShuffleBlockedReason();
    }

    shuffleBtn.disabled = !canStartTicketShuffle();
    shuffleBtn.title = blockedReason;
}

function refreshCoinTossCandidatesUI() {
    const list = document.getElementById('coin-toss-candidates');
    if (!list) return;

    list.innerHTML = '';
    const candidates = getCoinTossCandidates();
    const mysteryPool = buildFilteredCoinTossPool(getCoinTossExcludeLabels());
    const duelLocked = isShuffleActive || isCoinTossing;
    const allSlotsFull = areAllCoinTossSlotsFull();

    const mysteryChip = document.createElement('button');
    mysteryChip.type = 'button';
    mysteryChip.className = 'coin-toss-chip coin-toss-chip-mystery';
    mysteryChip.disabled = duelLocked || mysteryPool.length === 0 || allSlotsFull;
    if (mysteryChip.disabled) {
        if (mysteryPool.length === 0) {
            mysteryChip.title = 'No movies match your filters.';
        } else if (allSlotsFull) {
            mysteryChip.title = 'All pick slots are full — click a slot to clear it.';
        } else if (duelLocked) {
            mysteryChip.title = 'Coin flip or shuffle in progress.';
        }
    }

    const mysterySource = document.createElement('span');
    mysterySource.className = 'coin-toss-chip-source';
    mysterySource.textContent = 'mystery';
    mysteryChip.appendChild(mysterySource);

    const mysteryLabel = document.createElement('span');
    mysteryLabel.className = 'coin-toss-chip-label';
    mysteryLabel.textContent = '? Mystery Flick';
    mysteryChip.appendChild(mysteryLabel);

    mysteryChip.addEventListener('click', () => pickMysteryFlickForCoinToss());
    list.appendChild(mysteryChip);

    if (!candidates.length && mysteryPool.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'coin-toss-candidates-empty';
        empty.textContent = 'Spin the wheel or keep a movie to build your pick list.';
        list.appendChild(empty);
        return;
    }

    candidates.forEach((entry) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'coin-toss-chip';
        const selected = isLabelInCoinTossSlot(entry.label);
        if (selected) chip.classList.add('selected');

        const sourceTag = document.createElement('span');
        sourceTag.className = 'coin-toss-chip-source';
        sourceTag.textContent = entry.source;
        chip.appendChild(sourceTag);

        const text = document.createElement('span');
        text.className = 'coin-toss-chip-label';
        text.textContent = getKeeperListingLabel(entry.label);
        chip.appendChild(text);

        chip.addEventListener('click', () => assignCoinTossSlot(entry));
        list.appendChild(chip);
    });
}

function shuffleRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffleSlotOrder() {
    const order = [0, 1, 2, 3];
    for (let i = order.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

function randomizeInitialShuffleSlots() {
    const slotOrder = shuffleSlotOrder();
    shuffleTicketSlots = shuffleTicketSlots.map((_, ticketIndex) => slotOrder[ticketIndex]);
}

function elementCenterInContainer(sourceEl, containerEl, targetSelector) {
    const containerRect = containerEl.getBoundingClientRect();
    if (containerRect.width <= 0 || containerRect.height <= 0) {
        return { left: 50, top: 50 };
    }

    const target = targetSelector ? sourceEl?.querySelector(targetSelector) : sourceEl;
    const rect = (target || sourceEl).getBoundingClientRect();
    return {
        left: ((rect.left + rect.width / 2 - containerRect.left) / containerRect.width) * 100,
        top: ((rect.top + rect.height / 2 - containerRect.top) / containerRect.height) * 100
    };
}

function posterCenterInIntro(slotEl, containerEl) {
    return elementCenterInContainer(slotEl, containerEl, '.coin-toss-slot-poster');
}

function getPosterSpawnPoint(slotEl, containerEl) {
    return posterCenterInIntro(slotEl, containerEl);
}

function getKnownSettlePoint(ticketIndex, slotEl, containerEl) {
    const center = posterCenterInIntro(slotEl, containerEl);
    return {
        left: (center.left + 50) / 2,
        top: center.top
    };
}

function buildKnownEmergeKeyframesFromPoints(spawn, settle) {
    const bulgeLeft = (spawn.left + settle.left) / 2;
    const bulgeTop = Math.min(spawn.top, settle.top) - 8;

    return [
        {
            left: `${spawn.left}%`,
            top: `${spawn.top}%`,
            transform: 'translate(-50%, -50%) scale(0.85)',
            opacity: 0,
            offset: 0
        },
        {
            left: `${spawn.left}%`,
            top: `${spawn.top}%`,
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
            offset: 0.18
        },
        {
            left: `${bulgeLeft}%`,
            top: `${bulgeTop}%`,
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
            offset: 0.55
        },
        {
            left: `${settle.left}%`,
            top: `${settle.top}%`,
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
            offset: 1
        }
    ];
}

function buildKnownEmergeKeyframes(ticketIndex, slotEl, containerEl) {
    const spawn = getPosterSpawnPoint(slotEl, containerEl);
    const settle = getKnownSettlePoint(ticketIndex, slotEl, containerEl);
    return buildKnownEmergeKeyframesFromPoints(spawn, settle);
}

function stripShuffleTicketPosClasses(ticketEl) {
    for (let s = 0; s < SHUFFLE_TICKET_COUNT; s += 1) {
        ticketEl.classList.remove(`shuffle-ticket-pos-${s}`);
    }
}

function primeKnownTicketAtPoster(ticketEl, slotEl, arenaEl) {
    stripShuffleTicketPosClasses(ticketEl);
    const spawn = getPosterSpawnPoint(slotEl, arenaEl);
    ticketEl.style.transition = 'none';
    setTicketPosition(ticketEl, spawn, { opacity: 0, zIndex: 4 });
    void ticketEl.offsetWidth;
    return spawn;
}

function getRowSlotForTicket(ticketIndex) {
    const rowIndex = SHUFFLE_ROW_TICKET_ORDER.indexOf(ticketIndex);
    return SHUFFLE_ROW_SLOTS[rowIndex >= 0 ? rowIndex : 0];
}

function setTicketPosition(ticketEl, pos, options = {}) {
    const { transform = 'translate(-50%, -50%)', zIndex, opacity } = options;
    ticketEl.style.left = `${pos.left}%`;
    ticketEl.style.top = `${pos.top}%`;
    ticketEl.style.transform = transform;
    if (zIndex !== undefined) ticketEl.style.zIndex = String(zIndex);
    if (opacity !== undefined) ticketEl.style.opacity = String(opacity);
}

function finalizeTicketAnimation(anim, ticketEl, pos, options = {}) {
    if (anim && typeof anim.commitStyles === 'function') {
        anim.commitStyles();
    }
    anim?.cancel();
    setTicketPosition(ticketEl, pos, { opacity: 1, ...options });
}

function setArenaIntroLayout(arena, mode) {
    arena.classList.remove('shuffle-intro-row', 'shuffle-intro-quadrant');
    if (mode === 'row') arena.classList.add('shuffle-intro-row');
    else if (mode === 'quadrant') arena.classList.add('shuffle-intro-quadrant');
}

// --- TICKET SHUFFLE SEQUENCES ---

async function runStackTicketsAtCenter(tickets, generation) {
    playShuffleIntroClip('stack');
    const center = { left: 50, top: 50 };
    const animations = tickets.map((ticketEl, ticketIndex) => {
        const currentLeft = parseFloat(ticketEl.style.left);
        const currentTop = parseFloat(ticketEl.style.top);

        return ticketEl.animate([
            {
                left: `${currentLeft}%`,
                top: `${currentTop}%`,
                transform: 'translate(-50%, -50%) scale(1)'
            },
            {
                left: `${center.left}%`,
                top: `${center.top}%`,
                transform: 'translate(-50%, -50%) scale(1)'
            }
        ], {
            duration: SHUFFLE_STACK_MS,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    });

    await shuffleSleep(SHUFFLE_STACK_MS);

    if (generation !== coinTossGeneration) {
        animations.forEach((anim) => anim.cancel());
        return false;
    }

    animations.forEach((anim) => anim.cancel());
    tickets.forEach((ticketEl, ticketIndex) => {
        setTicketPosition(ticketEl, center, { zIndex: ticketIndex + 1, opacity: 1 });
    });
    return true;
}

async function collapseShuffleIntroOverlay(slotsRow) {
    slotsRow?.classList.remove('coin-toss-shuffle-active');
    await new Promise((resolve) => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    });
}

async function runDeployFromStack(tickets, arena, slotsRow, generation) {
    playShuffleIntroClip('deploy');
    await collapseShuffleIntroOverlay(slotsRow);
    randomizeInitialShuffleSlots();
    setArenaIntroLayout(arena, 'quadrant');

    const center = { left: 50, top: 50 };
    tickets.forEach((ticketEl, ticketIndex) => {
        setTicketPosition(ticketEl, center, { zIndex: ticketIndex + 1 });
    });

    const animations = tickets.map((ticketEl, ticketIndex) => {
        const targetSlot = shuffleTicketSlots[ticketIndex];
        const target = SHUFFLE_QUADRANT_SLOTS[targetSlot];

        return ticketEl.animate([
            {
                left: `${center.left}%`,
                top: `${center.top}%`,
                transform: 'translate(-50%, -50%) scale(1)'
            },
            {
                left: `${target.left}%`,
                top: `${target.top}%`,
                transform: 'translate(-50%, -50%) scale(1)'
            }
        ], {
            duration: SHUFFLE_QUADRANT_DEPLOY_MS,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    });

    await shuffleSleep(SHUFFLE_QUADRANT_DEPLOY_MS);

    if (generation !== coinTossGeneration) {
        animations.forEach((anim) => anim.cancel());
        applyShufflePositionClasses(tickets);
        clearShuffleIntroUI();
        return false;
    }

    animations.forEach((anim) => anim.cancel());
    applyShufflePositionClasses(tickets);
    return true;
}

async function runShuffleCinematicIntro(tickets, arena, slotAEl, slotBEl, slotCEl, slotDEl, generation) {
    const slotsRow = document.getElementById('coin-toss-slots-row');
    const posContainer = arena;
    const ticket0 = tickets[0];
    const ticket1 = tickets[1];
    const ticket2 = tickets[2];
    const ticket3 = tickets[3];
    const ticket2IsMystery = ticket2._isMystery;
    const ticket3IsMystery = ticket3._isMystery;

    await new Promise((resolve) => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    });

    arena.classList.add('shuffle-intro-emerge');

    let centerA = posterCenterInIntro(slotAEl, posContainer);
    let centerB = posterCenterInIntro(slotBEl, posContainer);

    if (ticket2IsMystery) {
        setTicketPosition(ticket2, centerA, { opacity: 0, zIndex: 1 });
        ticket2.classList.add('shuffle-ticket-intro-hidden');
    }
    if (ticket3IsMystery) {
        setTicketPosition(ticket3, centerB, { opacity: 0, zIndex: 1 });
        ticket3.classList.add('shuffle-ticket-intro-hidden');
    }

    // Stage A — emerge known picks from their slot posters
    const emergeAnims = [];
    const emergeTargets = [
        { ticketEl: ticket0, slotEl: slotAEl, ticketIndex: 0 },
        { ticketEl: ticket1, slotEl: slotBEl, ticketIndex: 1 },
        { ticketEl: ticket2, slotEl: slotCEl, ticketIndex: 2, skip: ticket2IsMystery },
        { ticketEl: ticket3, slotEl: slotDEl, ticketIndex: 3, skip: ticket3IsMystery }
    ];
    const emergeSettles = [];

    emergeTargets.forEach(({ ticketEl, slotEl, ticketIndex, skip }) => {
        if (skip || !slotEl) return;
        const spawn = primeKnownTicketAtPoster(ticketEl, slotEl, posContainer);
        const settle = getKnownSettlePoint(ticketIndex, slotEl, posContainer);
        emergeSettles.push({ ticketEl, settle });
        emergeAnims.push(ticketEl.animate(
            buildKnownEmergeKeyframesFromPoints(spawn, settle),
            { duration: SHUFFLE_EMERGE_MS, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
        ));
    });

    if (emergeAnims.length) playShuffleIntroClip('emerge');

    await shuffleSleep(SHUFFLE_EMERGE_MS);
    if (generation !== coinTossGeneration) {
        emergeAnims.forEach((anim) => anim.cancel());
        clearShuffleIntroUI();
        return false;
    }
    emergeSettles.forEach(({ ticketEl, settle }, settleIndex) => {
        finalizeTicketAnimation(emergeAnims[settleIndex], ticketEl, settle, { zIndex: 4 });
        ticketEl.style.transition = '';
    });
    arena.classList.remove('shuffle-intro-emerge');

    // Stage B — rest with posters + known tickets
    await shuffleSleep(SHUFFLE_PAIR_REST_MS);
    if (generation !== coinTossGeneration) {
        clearShuffleIntroUI();
        return false;
    }

    // Stage C — slow poster fade, mysteries fade in at poster spots
    if (ticket2IsMystery || ticket3IsMystery) {
        centerA = posterCenterInIntro(slotAEl, posContainer);
        centerB = posterCenterInIntro(slotBEl, posContainer);
        slotsRow?.classList.add('coin-toss-slots-poster-fade');
        setCoinTossSlotsBlind(true);

        playShuffleIntroClip('mystery');

        const mysteryFadeAnims = [];
        if (ticket2IsMystery) {
            ticket2.classList.remove('shuffle-ticket-intro-hidden');
            mysteryFadeAnims.push(ticket2.animate([
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0.95)' },
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
            ], { duration: SHUFFLE_POSTER_FADE_MS, fill: 'forwards', easing: 'ease-out' }));
        }
        if (ticket3IsMystery) {
            ticket3.classList.remove('shuffle-ticket-intro-hidden');
            mysteryFadeAnims.push(ticket3.animate([
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0.95)' },
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
            ], { duration: SHUFFLE_POSTER_FADE_MS, fill: 'forwards', easing: 'ease-out' }));
        }

        await shuffleSleep(SHUFFLE_POSTER_FADE_MS);
        if (generation !== coinTossGeneration) {
            mysteryFadeAnims.forEach((anim) => anim.cancel());
            clearShuffleIntroUI();
            return false;
        }
        mysteryFadeAnims.forEach((anim) => anim.cancel());
        if (ticket2IsMystery) setTicketPosition(ticket2, centerA, { zIndex: 2, opacity: 1 });
        if (ticket3IsMystery) setTicketPosition(ticket3, centerB, { zIndex: 2, opacity: 1 });
    } else {
        slotsRow?.classList.add('coin-toss-slots-poster-fade');
        setCoinTossSlotsBlind(true);
    }

    // Stage D — crossfade rest
    await shuffleSleep(SHUFFLE_CROSSFADE_REST_MS);
    if (generation !== coinTossGeneration) {
        clearShuffleIntroUI();
        return false;
    }

    // Stage E — align into even row (M1 | Pick A | Pick B | M2), collapse slot frames
    setArenaIntroLayout(arena, 'row');
    playShuffleIntroClip('rowAlign');
    const rowAnims = tickets.map((ticketEl) => {
        const ticketIndex = Number(ticketEl.dataset.ticketIndex);
        const rowPos = getRowSlotForTicket(ticketIndex);
        const currentLeft = parseFloat(ticketEl.style.left);
        const currentTop = parseFloat(ticketEl.style.top);

        return ticketEl.animate([
            { left: `${currentLeft}%`, top: `${currentTop}%`, transform: 'translate(-50%, -50%) scale(1)' },
            { left: `${rowPos.left}%`, top: `${rowPos.top}%`, transform: 'translate(-50%, -50%) scale(1)' }
        ], {
            duration: SHUFFLE_ROW_ALIGN_MS,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    });

    await shuffleSleep(Math.round(SHUFFLE_ROW_ALIGN_MS * 0.65));
    slotsRow?.classList.add('coin-toss-slots-shuffle-intro');

    await shuffleSleep(Math.round(SHUFFLE_ROW_ALIGN_MS * 0.35));
    if (generation !== coinTossGeneration) {
        rowAnims.forEach((anim) => anim.cancel());
        clearShuffleIntroUI();
        return false;
    }
    rowAnims.forEach((anim) => anim.cancel());
    tickets.forEach((ticketEl) => {
        const rowPos = getRowSlotForTicket(Number(ticketEl.dataset.ticketIndex));
        setTicketPosition(ticketEl, rowPos, { zIndex: 3, opacity: 1 });
    });

    // Stage F — stack at center
    const stackOk = await runStackTicketsAtCenter(tickets, generation);
    if (!stackOk) {
        clearShuffleIntroUI();
        return false;
    }

    // Stage G — stack rest
    await shuffleSleep(SHUFFLE_STACK_REST_MS);
    if (generation !== coinTossGeneration) {
        clearShuffleIntroUI();
        return false;
    }

    // Stage H — deploy to random quadrants
    const deployOk = await runDeployFromStack(tickets, arena, slotsRow, generation);
    if (!deployOk) return false;

    // Stage I — flip face down
    tickets.forEach((ticketEl) => {
        ticketEl.classList.remove('shuffle-ticket-intro-hidden');
        if (ticketEl.style.opacity === '0') ticketEl.style.opacity = '1';
    });
    shufflePhase = 'faceDown';
    tickets.forEach((ticketEl) => ticketEl.classList.add('face-down'));
    playShuffleIntroClip('flip');
    await shuffleSleep(SHUFFLE_FLIP_MS);
    if (generation !== coinTossGeneration) {
        clearShuffleIntroUI();
        return false;
    }
    tickets.forEach((ticketEl) => ticketEl.classList.add('face-down-settled'));

    // Stage J — pre-shuffle rest
    await shuffleSleep(SHUFFLE_PRE_SHUFFLE_REST_MS);
    if (generation !== coinTossGeneration) {
        clearShuffleIntroUI();
        return false;
    }

    return true;
}

function pickRandomDiagonalPair() {
    return SHUFFLE_DIAGONAL_PAIRS[Math.floor(Math.random() * SHUFFLE_DIAGONAL_PAIRS.length)];
}

function pickRandomAdjacentPair() {
    return SHUFFLE_ADJACENT_PAIRS[Math.floor(Math.random() * SHUFFLE_ADJACENT_PAIRS.length)];
}

function buildRandomShufflePlan() {
    let logicalCount = shuffleRandomInt(8, 12);

    const logicalMoves = [];
    for (let i = 0; i < logicalCount; i += 1) {
        if (Math.random() < 0.45) {
            logicalMoves.push({
                type: 'rotation',
                direction: Math.random() < 0.5 ? 'cw' : 'ccw'
            });
        } else {
            const [slotA, slotB] = pickRandomDiagonalPair();
            logicalMoves.push({ type: 'crossSwap', slotA, slotB });
        }
    }

    const targetJitterCount = shuffleRandomInt(2, 3);
    const jitterIndices = new Set([logicalCount - 1]);
    while (jitterIndices.size < targetJitterCount && logicalCount > 2) {
        jitterIndices.add(shuffleRandomInt(1, logicalCount - 2));
    }

    logicalMoves.forEach((move, index) => {
        const isFirst = index === 0 || index === 1;
        const isLast = index === logicalMoves.length - 1;
        move.durationMs = isLast
            ? SHUFFLE_SWAP_MS_SLOW
            : isFirst
                ? SHUFFLE_SWAP_MS_FAST
                : SHUFFLE_SWAP_MS;
        if (Math.random() < 0.2) move.doubleBack = true;
        if (jitterIndices.has(index)) move.crossingJitter = true;
    });

    const burstSize = shuffleRandomInt(2, 3);
    const burstStartMin = Math.max(1, Math.floor(logicalCount / 3));
    const burstStartMax = Math.min(logicalCount - burstSize, Math.floor((logicalCount * 2) / 3));
    let burstStart = -1;
    const burstIndices = new Set();
    if (burstStartMax >= burstStartMin) {
        burstStart = shuffleRandomInt(burstStartMin, burstStartMax);
        for (let b = burstStart; b < burstStart + burstSize; b += 1) {
            burstIndices.add(b);
        }
    }

    const feintAfterMoves = new Set();
    const feintCount = shuffleRandomInt(1, 2);
    const feintA = Math.max(1, Math.floor(logicalCount * 0.25));
    const feintB = Math.max(2, Math.floor(logicalCount * 0.55));
    if (feintCount === 1) {
        feintAfterMoves.add(feintA);
    } else {
        feintAfterMoves.add(feintA);
        feintAfterMoves.add(feintB);
    }

    const misdirectAfterMove = shuffleRandomInt(3, Math.max(3, Math.floor(logicalCount * 0.7)));
    const spinAfterA = Math.max(1, Math.floor(logicalCount * 0.3));
    const spinAfterB = Math.max(2, Math.floor(logicalCount * 0.6));

    const appendDecoys = (plan, moveNumber) => {
        if (feintAfterMoves.has(moveNumber)) plan.push({ type: 'feint' });
        if (moveNumber === misdirectAfterMove) plan.push({ type: 'misdirect' });
        if (moveNumber === spinAfterA) plan.push({ type: 'spin', dir: 'cw' });
        if (moveNumber === spinAfterB) plan.push({ type: 'spin', dir: 'ccw' });
    };

    const plan = [];
    let moveNumber = 0;

    for (let index = 0; index < logicalMoves.length; index += 1) {
        if (burstIndices.has(index)) {
            if (index === burstStart) {
                const burstMoves = logicalMoves.slice(burstStart, burstStart + burstSize).map((move) => ({
                    type: move.type,
                    direction: move.direction,
                    slotA: move.slotA,
                    slotB: move.slotB,
                    doubleBack: move.doubleBack ?? false,
                    crossingJitter: move.crossingJitter ?? false
                }));
                plan.push({ type: 'burst', moves: burstMoves });
                moveNumber += burstSize;
                appendDecoys(plan, moveNumber);
            }
            continue;
        }

        moveNumber += 1;
        plan.push(logicalMoves[index]);
        appendDecoys(plan, moveNumber);
    }

    plan.push({ type: 'settle' });
    return plan;
}

function playShuffleRevealSound() {
    playKeeperClip(window.uiAudioPaths.keeperKaching);
}

function applyCoinTossResult(winner, loser) {
    const loserKeeperIndex = getKeeperIndexForEntry(loser);
    const winnerInKeeper = isEntryInKeeper(winner);
    let winnerAdded = false;

    if (loserKeeperIndex >= 0) {
        const entry = keeperPicks[loserKeeperIndex];
        keeperPicks.splice(loserKeeperIndex, 1);
        recentSelections.unshift(entry.label);
        if (recentSelections.length > 3) recentSelections.pop();
    }

    const canAddWinner = !winnerInKeeper && (getOpenKeeperSlots() > 0 || loserKeeperIndex >= 0);
    if (canAddWinner) {
        const recentIndex = recentSelections.indexOf(winner.label);
        if (recentIndex >= 0) {
            recentSelections.splice(recentIndex, 1);
        }

        const keeperEntry = {
            label: winner.label,
            poster: getCoinTossPosterForEntry(winner),
            runtimeMinutes: winner.runtimeMinutes ?? getMovieRuntimeMinutes(winner.listing)
        };
        applyKeeperPosterFromMetadata(keeperEntry);

        if (loserKeeperIndex >= 0) {
            keeperPicks.splice(loserKeeperIndex, 0, keeperEntry);
        } else {
            keeperPicks.push(keeperEntry);
        }

        winnerAdded = true;
        keeperUiGeneration += 1;
        playKeeperSound(keeperPicks.length);
    }

    let keeperUiUpdate = false;
    if (winnerAdded) {
        keeperUiUpdate = true;
    } else if (winnerInKeeper) {
        const slotIndex = getKeeperIndexForEntry(winner);
        if (slotIndex >= 0) {
            keeperUiGeneration += 1;
            playKeeperSound(slotIndex + 1);
            keeperUiUpdate = { animateSlotIndex: slotIndex };
        }
    }

    updateRecentSelectionsUI();
    updateKeeperPicksUI(keeperUiUpdate);
    updateKeeperButtonState();
}

const SHUFFLE_ANIM_CLASSES = [
    'shuffle-misdirect-glow-a',
    'shuffle-misdirect-glow-b',
    'shuffle-reveal-pending',
    'shuffle-ticket-waapi-spin'
];

function getTicketIndexAtSlot(slotIndex) {
    return shuffleTicketSlots.indexOf(slotIndex);
}

function getTicketsAtSlots(tickets, slotA, slotB) {
    const indexA = getTicketIndexAtSlot(slotA);
    const indexB = getTicketIndexAtSlot(slotB);
    return {
        ticketA: indexA >= 0 ? tickets[indexA] : null,
        ticketB: indexB >= 0 ? tickets[indexB] : null,
        indexA,
        indexB
    };
}

function buildQuadrantArcKeyframes(fromSlot, toSlot, options = {}) {
    const { arcOffsetPx = SHUFFLE_ARC_OFFSET_PX, leadShadow = false, doubleBack = false } = options;
    const from = SHUFFLE_QUADRANT_SLOTS[fromSlot];
    const to = SHUFFLE_QUADRANT_SLOTS[toSlot];
    const midLeft = (from.left + to.left) / 2;
    const midTop = (from.top + to.top) / 2;
    const centerPull = 0.25;
    const bulgeLeft = midLeft + (50 - midLeft) * centerPull;
    const bulgeTop = midTop + (50 - midTop) * centerPull;
    const arc = leadShadow ? arcOffsetPx : Math.round(arcOffsetPx * 0.65);
    const baseFilter = 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))';
    const leadFilter = 'drop-shadow(0 5px 12px rgba(0,0,0,0.55))';

    const startFrame = {
        left: `${from.left}%`,
        top: `${from.top}%`,
        transform: 'translate(-50%, -50%)',
        filter: baseFilter,
        offset: 0
    };
    const midFrame = {
        left: `${bulgeLeft}%`,
        top: `${bulgeTop}%`,
        transform: `translate(-50%, calc(-50% - ${arc}px))`,
        filter: leadShadow ? leadFilter : baseFilter,
        offset: 0.5
    };
    const endFrame = {
        left: `${to.left}%`,
        top: `${to.top}%`,
        transform: 'translate(-50%, -50%)',
        filter: baseFilter,
        offset: 1
    };

    if (doubleBack) {
        const wiggleLeft = from.left + (to.left - from.left) * 0.35;
        const wiggleTop = from.top + (to.top - from.top) * 0.35;
        const forwardLeft = from.left + (to.left - from.left) * 0.65;
        const forwardTop = from.top + (to.top - from.top) * 0.65;
        return [
            startFrame,
            { ...midFrame, offset: 0.4 },
            {
                left: `${wiggleLeft}%`,
                top: `${wiggleTop}%`,
                transform: `translate(-50%, calc(-50% - ${Math.round(arc * 0.75)}px))`,
                filter: leadShadow ? leadFilter : baseFilter,
                offset: 0.55
            },
            {
                left: `${forwardLeft}%`,
                top: `${forwardTop}%`,
                transform: `translate(-50%, calc(-50% - ${Math.round(arc * 0.88)}px))`,
                filter: leadShadow ? leadFilter : baseFilter,
                offset: 0.7
            },
            endFrame
        ];
    }

    return [startFrame, midFrame, endFrame];
}

function isRotationLeadTicket(fromSlot, direction) {
    if (direction === 'cw') return fromSlot === 1 || fromSlot === 3;
    return fromSlot === 0 || fromSlot === 2;
}

function clearMidairJitter(ticketEl) {
    ticketEl?.querySelector('.shuffle-ticket-inner')?.classList.remove('shuffle-midair-jitter');
}

function clearShuffleAnimClasses(ticketEl) {
    if (!ticketEl) return;
    ticketEl.classList.remove(...SHUFFLE_ANIM_CLASSES);
    clearMidairJitter(ticketEl);
}

async function runCrossSwapStep(tickets, generation, step) {
    const durationMs = step.durationMs ?? SHUFFLE_SWAP_MS;
    const { ticketA, ticketB, indexA, indexB } = getTicketsAtSlots(tickets, step.slotA, step.slotB);
    if (!ticketA || !ticketB || indexA < 0 || indexB < 0) return false;

    tickets.forEach((ticketEl, ticketIndex) => {
        if (ticketIndex !== indexA && ticketIndex !== indexB) {
            ticketEl.classList.add('shuffle-ticket-stationary');
        }
    });

    await shuffleSleep(SHUFFLE_CROSS_SWAP_PAUSE_MS);
    if (generation !== coinTossGeneration) {
        tickets.forEach((ticketEl) => ticketEl.classList.remove('shuffle-ticket-stationary'));
        return false;
    }

    const moving = [ticketA, ticketB];
    let jitterTimer = null;
    let jitterEndTimer = null;

    if (step.crossingJitter) {
        const jitterAt = Math.round(durationMs * 0.48);
        jitterTimer = window.setTimeout(() => {
            moving.forEach((ticketEl) => {
                ticketEl.querySelector('.shuffle-ticket-inner')?.classList.add('shuffle-midair-jitter');
            });
        }, jitterAt);
        jitterEndTimer = window.setTimeout(() => {
            moving.forEach(clearMidairJitter);
        }, jitterAt + SHUFFLE_MIDAIR_JITTER_MS);
    }

    const toA = SHUFFLE_QUADRANT_SLOTS[step.slotB];
    const toB = SHUFFLE_QUADRANT_SLOTS[step.slotA];
    const leadA = (toA.left + toA.top) >= (toB.left + toB.top);

    ticketA.style.zIndex = leadA ? '8' : '4';
    ticketB.style.zIndex = leadA ? '4' : '8';
    if (leadA) ticketA.classList.add('shuffle-ticket-leading');
    else ticketB.classList.add('shuffle-ticket-leading');

    const animA = ticketA.animate(
        buildQuadrantArcKeyframes(step.slotA, step.slotB, {
            leadShadow: leadA,
            doubleBack: step.doubleBack ?? false
        }),
        { duration: durationMs, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    );
    const animB = ticketB.animate(
        buildQuadrantArcKeyframes(step.slotB, step.slotA, {
            leadShadow: !leadA,
            doubleBack: step.doubleBack ?? false
        }),
        { duration: durationMs, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    );

    await shuffleSleep(durationMs);

    if (jitterTimer !== null) window.clearTimeout(jitterTimer);
    if (jitterEndTimer !== null) window.clearTimeout(jitterEndTimer);
    moving.forEach(clearMidairJitter);

    if (generation !== coinTossGeneration) {
        animA.cancel();
        animB.cancel();
        tickets.forEach((ticketEl) => {
            ticketEl.classList.remove('shuffle-ticket-stationary', 'shuffle-ticket-leading');
        });
        applyShufflePositionClasses(tickets);
        return false;
    }

    animA.cancel();
    animB.cancel();
    shuffleTicketSlots[indexA] = step.slotB;
    shuffleTicketSlots[indexB] = step.slotA;
    tickets.forEach((ticketEl) => {
        ticketEl.classList.remove('shuffle-ticket-stationary', 'shuffle-ticket-leading');
    });
    applyShufflePositionClasses(tickets);
    return true;
}

async function runRotationStep(tickets, generation, step) {
    const durationMs = step.durationMs ?? SHUFFLE_SWAP_MS;
    const nextMap = step.direction === 'cw' ? SHUFFLE_CW_NEXT : SHUFFLE_CCW_NEXT;
    const animations = [];
    const moving = [];

    for (let ticketIndex = 0; ticketIndex < SHUFFLE_TICKET_COUNT; ticketIndex += 1) {
        const fromSlot = shuffleTicketSlots[ticketIndex];
        const toSlot = nextMap[fromSlot];
        const ticketEl = tickets[ticketIndex];
        const leadShadow = isRotationLeadTicket(fromSlot, step.direction);

        ticketEl.style.zIndex = String(4 + fromSlot + toSlot);
        if (leadShadow) ticketEl.classList.add('shuffle-ticket-leading');
        moving.push(ticketEl);

        animations.push(ticketEl.animate(
            buildQuadrantArcKeyframes(fromSlot, toSlot, {
                leadShadow,
                doubleBack: step.doubleBack ?? false
            }),
            { duration: durationMs, fill: 'forwards', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
        ));
    }

    let jitterTimer = null;
    let jitterEndTimer = null;
    if (step.crossingJitter) {
        const jitterAt = Math.round(durationMs * 0.48);
        jitterTimer = window.setTimeout(() => {
            moving.forEach((ticketEl) => {
                ticketEl.querySelector('.shuffle-ticket-inner')?.classList.add('shuffle-midair-jitter');
            });
        }, jitterAt);
        jitterEndTimer = window.setTimeout(() => {
            moving.forEach(clearMidairJitter);
        }, jitterAt + SHUFFLE_MIDAIR_JITTER_MS);
    }

    await shuffleSleep(durationMs);

    if (jitterTimer !== null) window.clearTimeout(jitterTimer);
    if (jitterEndTimer !== null) window.clearTimeout(jitterEndTimer);
    moving.forEach(clearMidairJitter);

    if (generation !== coinTossGeneration) {
        animations.forEach((anim) => anim.cancel());
        moving.forEach((ticketEl) => ticketEl.classList.remove('shuffle-ticket-leading'));
        applyShufflePositionClasses(tickets);
        return false;
    }

    animations.forEach((anim) => anim.cancel());
    for (let ticketIndex = 0; ticketIndex < SHUFFLE_TICKET_COUNT; ticketIndex += 1) {
        shuffleTicketSlots[ticketIndex] = nextMap[shuffleTicketSlots[ticketIndex]];
    }
    moving.forEach((ticketEl) => ticketEl.classList.remove('shuffle-ticket-leading'));
    applyShufflePositionClasses(tickets);
    return true;
}

async function runBurstStep(tickets, generation, burstStep) {
    for (const move of burstStep.moves) {
        if (generation !== coinTossGeneration) return false;
        const stepOptions = { ...move, durationMs: SHUFFLE_BURST_MS };
        let ok = false;
        if (move.type === 'rotation') {
            ok = await runRotationStep(tickets, generation, stepOptions);
        } else if (move.type === 'crossSwap') {
            ok = await runCrossSwapStep(tickets, generation, stepOptions);
        }
        if (!ok) return false;
    }
    return true;
}

async function runFeintStep(tickets, generation) {
    const [slotA, slotB] = pickRandomAdjacentPair();
    const { ticketA, ticketB } = getTicketsAtSlots(tickets, slotA, slotB);
    if (!ticketA || !ticketB) return false;

    const fromA = SHUFFLE_QUADRANT_SLOTS[slotA];
    const fromB = SHUFFLE_QUADRANT_SLOTS[slotB];
    const midLeft = (fromA.left + fromB.left) / 2;
    const midTop = (fromA.top + fromB.top) / 2;
    const arc = Math.round(SHUFFLE_ARC_OFFSET_PX * 0.65);
    const halfMs = Math.round(SHUFFLE_FEINT_MS * 0.45);

    const animA = ticketA.animate([
        { left: `${fromA.left}%`, top: `${fromA.top}%`, transform: 'translate(-50%, -50%)' },
        { left: `${midLeft}%`, top: `${midTop}%`, transform: `translate(-50%, calc(-50% - ${arc}px))` }
    ], { duration: halfMs, fill: 'forwards', easing: 'ease-out' });
    const animB = ticketB.animate([
        { left: `${fromB.left}%`, top: `${fromB.top}%`, transform: 'translate(-50%, -50%)' },
        { left: `${midLeft}%`, top: `${midTop}%`, transform: `translate(-50%, calc(-50% + ${Math.round(arc * 0.5)}px))` }
    ], { duration: halfMs, fill: 'forwards', easing: 'ease-out' });

    await shuffleSleep(SHUFFLE_FEINT_MS);
    animA.cancel();
    animB.cancel();

    if (generation !== coinTossGeneration) return false;

    applyShufflePositionClasses(tickets);
    return true;
}

async function runVisualMisdirection(tickets, generation) {
    const shuffled = [...tickets].sort(() => Math.random() - 0.5);
    const first = shuffled[0];
    let second = shuffled[1];
    if (tickets.length > 2) {
        second = shuffled.find((t) => t !== first) ?? shuffled[1];
    }

    first.classList.add('shuffle-misdirect-glow-a');
    await shuffleSleep(SHUFFLE_MISDIRECT_PULSE_MS);
    if (generation !== coinTossGeneration) return false;

    first.classList.remove('shuffle-misdirect-glow-a');
    second.classList.add('shuffle-misdirect-glow-b');
    await shuffleSleep(SHUFFLE_MISDIRECT_PULSE_MS);
    second.classList.remove('shuffle-misdirect-glow-b');

    return generation === coinTossGeneration;
}

async function runSpinStep(tickets, direction, generation) {
    tickets.forEach((ticketEl) => ticketEl.classList.add('shuffle-ticket-waapi-spin'));

    await shuffleSleep(SHUFFLE_SPIN_MS);
    tickets.forEach(clearShuffleAnimClasses);

    return generation === coinTossGeneration;
}

function applyShufflePositionClasses(tickets) {
    tickets.forEach((ticketEl, ticketIndex) => {
        const slot = shuffleTicketSlots[ticketIndex];
        for (let s = 0; s < SHUFFLE_TICKET_COUNT; s += 1) {
            ticketEl.classList.remove(`shuffle-ticket-pos-${s}`);
        }
        ticketEl.classList.remove('shuffle-ticket-stationary', 'shuffle-ticket-leading', 'shuffle-ticket-intro-hidden');
        ticketEl.classList.add(`shuffle-ticket-pos-${slot}`);
        const pos = SHUFFLE_QUADRANT_SLOTS[slot];
        ticketEl.style.left = `${pos.left}%`;
        ticketEl.style.top = `${pos.top}%`;
        ticketEl.style.zIndex = String(slot + 1);
        ticketEl.style.opacity = '';
        ticketEl.style.pointerEvents = '';
    });
}

function buildShuffleTicket(entry, index, options = {}) {
    const { isMystery = false } = options;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `shuffle-ticket shuffle-ticket-pos-${index}${isMystery ? ' shuffle-ticket-mystery' : ''}`;
    btn.dataset.ticketIndex = String(index);
    btn.disabled = true;
    btn._shuffleEntry = entry;
    btn._isMystery = isMystery;

    const inner = document.createElement('div');
    inner.className = 'shuffle-ticket-inner';

    const front = document.createElement('div');
    front.className = 'shuffle-ticket-face shuffle-ticket-front';

    const frontShape = document.createElement('div');
    frontShape.className = 'ticket-stub-shape shuffle-ticket-shape-filled';
    front.appendChild(frontShape);

    const title = document.createElement('div');
    title.className = 'shuffle-ticket-title';
    title.textContent = isMystery
        ? '? MYSTERY'
        : `${getCoinTossEmojiForEntry(entry)} ${getKeeperListingLabel(entry.label)}`;
    front.appendChild(title);

    const back = document.createElement('div');
    back.className = 'shuffle-ticket-face shuffle-ticket-back';

    const backShape = document.createElement('div');
    backShape.className = 'ticket-stub-shape shuffle-ticket-shape-back';
    back.appendChild(backShape);

    inner.appendChild(front);
    inner.appendChild(back);
    btn.appendChild(inner);

    btn.addEventListener('click', () => { void onShuffleTicketPick(btn); });
    return btn;
}

function finishTicketShuffleRound(winner) {
    clearAllCoinTossSlots();

    resetTicketShuffleArena();
    setShuffleJokerArmed(false);
    isShuffleActive = false;
    shufflePhase = 'idle';
    resetCoinTossStage();
    refreshCoinTossCandidatesUI();
    updateDecisionButtonStates();
}

async function onShuffleTicketPick(ticketEl) {
    if (!isShuffleActive) return;

    const arena = document.getElementById('ticket-shuffle-arena');
    if (!arena) return;

    if (shufflePhase === 'picking') {
        shufflePhase = 'confirming';
        revealAllShuffleTicketTitles(arena);
        setShuffleTicketSelection(arena, ticketEl);
        setCoinTossStatus('Click again to keep — Esc to cancel');
        return;
    }

    if (shufflePhase === 'confirming') {
        if (!ticketEl.classList.contains('shuffle-ticket-selected')) {
            setShuffleTicketSelection(arena, ticketEl);
            return;
        }
        await confirmShuffleTicketPick(ticketEl);
    }
}

async function confirmShuffleTicketPick(ticketEl) {
    const pickGeneration = coinTossGeneration;
    const index = Number(ticketEl.dataset.ticketIndex);
    const winner = ticketEl._shuffleEntry;
    if (!winner) return;

    let loser;
    if (index === 0) {
        loser = coinTossSlotB;
    } else if (index === 1) {
        loser = coinTossSlotA;
    } else if (ticketEl._isMystery) {
        loser = Math.random() < 0.5 ? coinTossSlotA : coinTossSlotB;
    } else {
        const slotEntries = [coinTossSlotA, coinTossSlotB, coinTossSlotC, coinTossSlotD];
        const others = slotEntries.filter(
            (entry, slotIndex) => entry && slotIndex !== index && !coinTossLabelsMatch(entry.label, winner.label)
        );
        loser = others.length
            ? others[Math.floor(Math.random() * others.length)]
            : (Math.random() < 0.5 ? coinTossSlotA : coinTossSlotB);
    }
    if (!loser) return;

    const arena = document.getElementById('ticket-shuffle-arena');
    const revealDelayMs = shuffleRandomInt(300, 600);
    shufflePhase = 'revealPending';

    ticketEl.classList.add('shuffle-reveal-pending');
    arena?.querySelectorAll('.shuffle-ticket').forEach((btn) => {
        btn.disabled = true;
    });

    await shuffleSleep(revealDelayMs);
    if (pickGeneration !== coinTossGeneration || shufflePhase !== 'revealPending') return;

    shufflePhase = 'reveal';
    clearShuffleConfirmUI();
    setCoinTossSlotsBlind(false);
    ticketEl.classList.remove('face-down', 'face-down-settled', 'picking', 'shuffle-reveal-pending');
    ticketEl.classList.add('revealed');

    if (ticketEl._isMystery) {
        const title = ticketEl.querySelector('.shuffle-ticket-title');
        if (title) {
            title.textContent = `${getCoinTossEmojiForEntry(winner)} ${getKeeperListingLabel(winner.label)}`;
        }
    }

    if (ticketEl._isMystery) {
        setMarqueeText(`MYSTERY REVEALED // ${getKeeperListingLabel(winner.label)} KEPT`);
    } else {
        setMarqueeText(`TICKET SHUFFLE // ${getKeeperListingLabel(winner.label)} KEPT`);
    }

    playShuffleRevealSound();

    const slotEls = COIN_TOSS_SLOT_KEYS.map((key) => getCoinTossSlotElByKey(key));
    const slotEntries = [coinTossSlotA, coinTossSlotB, coinTossSlotC, coinTossSlotD];
    const winnerEl = slotEls[index];
    winnerEl?.classList.add('coin-toss-slot-winner');

    if (index === 0 || index === 1) {
        slotEls[index === 0 ? 1 : 0]?.classList.add('coin-toss-slot-loser');
    } else if (ticketEl._isMystery) {
        slotEls[0]?.classList.add('coin-toss-slot-loser');
        slotEls[1]?.classList.add('coin-toss-slot-loser');
    } else {
        const loserIndex = slotEntries.findIndex(
            (entry) => entry && coinTossLabelsMatch(entry.label, loser.label)
        );
        if (loserIndex >= 0) slotEls[loserIndex]?.classList.add('coin-toss-slot-loser');
    }

    applyCoinTossResult(winner, loser);
    setCoinTossStatus(`${getKeeperListingLabel(winner.label)} kept!`);

    window.setTimeout(() => finishTicketShuffleRound(winner), 800);
}

// --- TICKET SHUFFLE LAUNCH ---

async function armTicketShuffle() {
    if (!canStartTicketShuffle()) {
        updateDecisionButtonStates();
        return;
    }

    const resolved = resolveShuffleRoundTickets();
    if (!resolved) {
        setCoinTossStatus(getShuffleBlockedReason() || 'Need more filtered movies for mystery tickets.', true);
        updateDecisionButtonStates();
        return;
    }

    const roundEntries = [
        coinTossSlotA,
        coinTossSlotB,
        resolved.ticket2,
        resolved.ticket3
    ];
    if (roundEntries.some((entry) => coinTossWouldNeedKeeperSlot(entry)) && getOpenKeeperSlots() === 0) {
        setCoinTossStatus('Keeper full — discard a movie first.', true);
        shuffleMysteryA = null;
        shuffleMysteryB = null;
        updateDecisionButtonStates();
        return;
    }

    coinTossGeneration += 1;
    const generation = coinTossGeneration;
    isShuffleActive = true;
    shufflePhase = 'locking';
    shuffleTicketSlots = [0, 1, 2, 3];

    updateDecisionButtonStates();
    setMiddlePreviewMode('shuffle');
    setCoinTossStageVisible(true);
    setCoinTossStatus('Locking in shuffle...');

    const durationMs = await loadShuffleLockInDurationMs();
    if (generation !== coinTossGeneration) return;

    playShuffleLockInSounds();
    await playShuffleLockInTransition(durationMs, generation);
    if (generation !== coinTossGeneration) return;

    shufflePhase = 'armed';
    setShuffleJokerArmed(true);
    setCoinTossStatus('Click the joker to shuffle — Esc to cancel');
}

async function launchTicketShuffle() {
    if (shufflePhase !== 'armed') return;

    const generation = coinTossGeneration;
    playShuffleUiClip(SHUFFLE_JOKER_WHOOSH_PATH);
    setShuffleJokerArmed(false);
    shufflePhase = 'intro';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const whooshLeadMs = reducedMotion ? 0 : SHUFFLE_JOKER_WHOOSH_PRE_ANIM_MS;
    if (whooshLeadMs > 0) {
        await shuffleSleep(whooshLeadMs);
        if (generation !== coinTossGeneration) return;
    }

    await playShuffleJokerDisintegrate(generation);
    if (generation !== coinTossGeneration) return;

    setCoinTossStageVisible(false);

    const slotAEl = document.getElementById('coin-toss-slot-a');
    const slotBEl = document.getElementById('coin-toss-slot-b');
    const slotCEl = document.getElementById('coin-toss-slot-c');
    const slotDEl = document.getElementById('coin-toss-slot-d');
    [slotAEl, slotBEl, slotCEl, slotDEl].forEach((slotEl) => {
        slotEl?.classList.remove('coin-toss-slot-winner', 'coin-toss-slot-loser');
    });

    const arena = document.getElementById('ticket-shuffle-arena');
    if (!arena) return;

    const entry2 = coinTossSlotC ?? shuffleMysteryA;
    const entry3 = coinTossSlotD ?? shuffleMysteryB;
    const isMystery2 = !coinTossSlotC;
    const isMystery3 = !coinTossSlotD;

    const slotsRow = document.getElementById('coin-toss-slots-row');
    slotsRow?.classList.add('coin-toss-shuffle-active');

    arena.innerHTML = '';
    const ticket0 = buildShuffleTicket(coinTossSlotA, 0);
    const ticket1 = buildShuffleTicket(coinTossSlotB, 1);
    const ticket2 = buildShuffleTicket(entry2, 2, { isMystery: isMystery2 });
    const ticket3 = buildShuffleTicket(entry3, 3, { isMystery: isMystery3 });
    arena.appendChild(ticket0);
    arena.appendChild(ticket1);
    arena.appendChild(ticket2);
    arena.appendChild(ticket3);

    const tickets = [ticket0, ticket1, ticket2, ticket3];

    setArenaIntroLayout(arena, 'row');
    arena.hidden = false;
    arena.classList.add('shuffle-arena-entering');
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => arena.classList.add('is-visible'));
    });

    await new Promise((resolve) => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    });

    const introOk = await runShuffleCinematicIntro(
        tickets,
        arena,
        slotAEl,
        slotBEl,
        slotCEl,
        slotDEl,
        generation
    );
    if (!introOk) return;

    clearShuffleArenaEntering();
    shufflePhase = 'shuffling';
    startShuffleTrollAudio();

    try {
        const plan = buildRandomShufflePlan();
        for (const step of plan) {
            if (generation !== coinTossGeneration) return;
            if (step.type === 'rotation') {
                const ok = await runRotationStep(tickets, generation, step);
                if (!ok) return;
            } else if (step.type === 'crossSwap') {
                const ok = await runCrossSwapStep(tickets, generation, step);
                if (!ok) return;
            } else if (step.type === 'burst') {
                const ok = await runBurstStep(tickets, generation, step);
                if (!ok) return;
            } else if (step.type === 'feint') {
                const ok = await runFeintStep(tickets, generation);
                if (!ok) return;
            } else if (step.type === 'spin') {
                const ok = await runSpinStep(tickets, step.dir, generation);
                if (!ok) return;
            } else if (step.type === 'misdirect') {
                const ok = await runVisualMisdirection(tickets, generation);
                if (!ok) return;
            } else if (step.type === 'settle') {
                applyShufflePositionClasses(tickets);
                await shuffleSleep(SHUFFLE_SWAP_MS / 2);
            }
        }

        if (generation !== coinTossGeneration) return;

        shufflePhase = 'picking';
        setCoinTossStatus('Pick a ticket');
        tickets.forEach((ticketEl) => {
            ticketEl.disabled = false;
            ticketEl.classList.add('picking');
        });
    } finally {
        stopShuffleTrollAudio();
    }
}

function handleCoinTossManualSearch(slotKey) {
    if (isShuffleActive || isCoinTossing) return;
    if (!COIN_TOSS_SLOT_KEYS.includes(slotKey)) return;
    const input = document.getElementById(`coin-toss-search-${slotKey}`);
    const dropdown = document.getElementById(`coin-toss-dropdown-${slotKey}`);
    if (!input || !dropdown) return;

    const query = input.value.trim();
    if (!query) {
        dropdown.hidden = true;
        dropdown.innerHTML = '';
        return;
    }

    const { matches } = findMovieListingInDatabase(query);
    dropdown.innerHTML = '';

    if (!matches.length) {
        const empty = document.createElement('div');
        empty.className = 'coin-toss-dropdown-empty';
        empty.textContent = 'No matches in database.';
        dropdown.appendChild(empty);
        dropdown.hidden = false;
        return;
    }

    matches.forEach((entry) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'coin-toss-dropdown-option';
        option.textContent = getKeeperListingLabel(entry.label);
        option.addEventListener('click', () => {
            input.value = getKeeperListingLabel(entry.label);
            dropdown.hidden = true;
            dropdown.innerHTML = '';
            const resolved = resolveCoinTossEntry(entry);
            const duplicateKey = COIN_TOSS_SLOT_KEYS.find((key) => {
                const slot = getCoinTossSlotByKey(key);
                return slot && coinTossLabelsMatch(slot.label, resolved.label) && key !== slotKey;
            });
            if (duplicateKey) {
                setCoinTossStatus('Pick different movies in each slot.', true);
                return;
            }
            setCoinTossSlotByKey(slotKey, resolved);
            renderCoinTossSlot(getCoinTossSlotElByKey(slotKey), resolved);
            setCoinTossStatus('');
            updateCoinTossCoinFaces();
            refreshCoinTossPreviewIfHovering();
            updateDecisionButtonStates();
            refreshCoinTossCandidatesUI();
        });
        dropdown.appendChild(option);
    });

    dropdown.hidden = false;
}

// --- DUELING FLICKS UI ---

function getShuffleJokerPreviewMarkup() {
    const layers = Array.from({ length: SHUFFLE_LOCK_IN_DECK_LAYERS }, () =>
        '<span class="shuffle-joker-card-layer" aria-hidden="true">🃏</span>'
    ).join('');
    return `<span class="shuffle-joker-face"><span class="shuffle-joker-card-shell"><span class="shuffle-joker-deck" aria-hidden="true">${layers}</span></span></span>`;
}

function buildCoinTossUI() {
    const filtersPanel = document.getElementById('filters-panel');
    if (!filtersPanel || document.getElementById('coin-toss')) return;

    const section = document.createElement('div');
    section.id = 'coin-toss';

    const label = document.createElement('div');
    label.id = 'coin-toss-label';
    label.textContent = 'Dueling Flicks';
    section.appendChild(label);

    const hint = document.createElement('div');
    hint.id = 'coin-toss-hint';
    hint.textContent = 'Pick two movies to flip or shuffle — optional picks C and D replace the Sequel Street and true random mystery tickets.';
    section.appendChild(hint);

    const slotsRow = document.createElement('div');
    slotsRow.id = 'coin-toss-slots-row';

    const slotA = document.createElement('button');
    slotA.type = 'button';
    slotA.id = 'coin-toss-slot-a';
    slotA.className = 'coin-toss-slot';
    slotA.setAttribute('aria-label', 'Coin toss slot A');
    slotA.innerHTML = getInsertCoinMarkup();
    slotA.addEventListener('click', () => {
        if (isShuffleActive || isCoinTossing) return;
        if (coinTossSlotA) clearCoinTossSlot('a');
    });
    slotsRow.appendChild(slotA);

    const middle = document.createElement('div');
    middle.id = 'coin-toss-middle';

    const coinStage = document.createElement('div');
    coinStage.id = 'coin-toss-stage';
    coinStage.hidden = true;

    const flightWrap = document.createElement('div');
    flightWrap.id = 'coin-toss-flight-wrap';

    const coin = document.createElement('button');
    coin.type = 'button';
    coin.id = 'coin-toss-coin';
    coin.setAttribute('aria-label', 'Confirm coin toss winner');
    coin.disabled = true;
    coin.innerHTML = `
        <div class="coin-face coin-face-front"></div>
        <div class="coin-face coin-face-back"></div>
    `;
    coin.addEventListener('click', () => {
        if (coinTossPhase === 'armed') {
            void launchCoinToss();
            return;
        }
        confirmCoinToss();
    });
    flightWrap.appendChild(coin);

    const shufflePreview = document.createElement('button');
    shufflePreview.type = 'button';
    shufflePreview.id = 'shuffle-preview';
    shufflePreview.hidden = true;
    shufflePreview.disabled = true;
    shufflePreview.setAttribute('aria-hidden', 'true');
    shufflePreview.setAttribute('aria-label', 'Shuffle preview');
    shufflePreview.innerHTML = getShuffleJokerPreviewMarkup();
    shufflePreview.addEventListener('click', () => { void launchTicketShuffle(); });
    flightWrap.appendChild(shufflePreview);

    coinStage.appendChild(flightWrap);
    middle.appendChild(coinStage);

    const arena = document.createElement('div');
    arena.id = 'ticket-shuffle-arena';
    arena.hidden = true;
    middle.appendChild(arena);

    slotsRow.appendChild(middle);

    const slotsColumnB = document.createElement('div');
    slotsColumnB.id = 'coin-toss-slots-column-b';
    slotsColumnB.className = 'coin-toss-slots-column-b';

    const slotB = document.createElement('button');
    slotB.type = 'button';
    slotB.id = 'coin-toss-slot-b';
    slotB.className = 'coin-toss-slot';
    slotB.setAttribute('aria-label', 'Coin toss slot B');
    slotB.innerHTML = getInsertCoinMarkup();
    slotB.addEventListener('click', () => {
        if (isShuffleActive || isCoinTossing) return;
        if (coinTossSlotB) clearCoinTossSlot('b');
    });
    slotsColumnB.appendChild(slotB);

    const slotC = document.createElement('button');
    slotC.type = 'button';
    slotC.id = 'coin-toss-slot-c';
    slotC.className = 'coin-toss-slot coin-toss-slot-shuffle-extra';
    slotC.setAttribute('aria-label', 'Shuffle pick slot C');
    slotC.innerHTML = getInsertCoinMarkup();
    slotC.addEventListener('click', () => {
        if (isShuffleActive || isCoinTossing) return;
        if (coinTossSlotC) clearCoinTossSlot('c');
    });
    slotsColumnB.appendChild(slotC);

    const slotD = document.createElement('button');
    slotD.type = 'button';
    slotD.id = 'coin-toss-slot-d';
    slotD.className = 'coin-toss-slot coin-toss-slot-shuffle-extra';
    slotD.setAttribute('aria-label', 'Shuffle pick slot D');
    slotD.innerHTML = getInsertCoinMarkup();
    slotD.addEventListener('click', () => {
        if (isShuffleActive || isCoinTossing) return;
        if (coinTossSlotD) clearCoinTossSlot('d');
    });
    slotsColumnB.appendChild(slotD);

    slotsRow.appendChild(slotsColumnB);

    section.appendChild(slotsRow);

    const candidatesLabel = document.createElement('div');
    candidatesLabel.className = 'coin-toss-candidates-label';
    candidatesLabel.textContent = 'AVAILABLE PICKS';
    section.appendChild(candidatesLabel);

    const candidates = document.createElement('div');
    candidates.id = 'coin-toss-candidates';
    section.appendChild(candidates);

    const searchRow = document.createElement('div');
    searchRow.id = 'coin-toss-search-row';

    ['a', 'b', 'c', 'd'].forEach((slotKey) => {
        const wrap = document.createElement('div');
        wrap.className = 'coin-toss-search-wrap';

        const searchLabel = document.createElement('label');
        searchLabel.className = 'coin-toss-search-label';
        const searchLabels = { a: 'Search A', b: 'Search B', c: 'Search C', d: 'Search D' };
        searchLabel.textContent = searchLabels[slotKey];
        searchLabel.setAttribute('for', `coin-toss-search-${slotKey}`);
        wrap.appendChild(searchLabel);

        const input = document.createElement('input');
        input.type = 'search';
        input.id = `coin-toss-search-${slotKey}`;
        input.className = 'coin-toss-search-input';
        input.placeholder = 'Title (Year)';
        input.autocomplete = 'off';
        input.addEventListener('input', () => handleCoinTossManualSearch(slotKey));
        wrap.appendChild(input);

        const dropdown = document.createElement('div');
        dropdown.id = `coin-toss-dropdown-${slotKey}`;
        dropdown.className = 'coin-toss-dropdown';
        dropdown.hidden = true;
        wrap.appendChild(dropdown);

        searchRow.appendChild(wrap);
    });

    section.appendChild(searchRow);

    const actionRow = document.createElement('div');
    actionRow.id = 'coin-toss-actions';

    const flipBtn = document.createElement('button');
    flipBtn.type = 'button';
    flipBtn.id = 'coin-toss-flip-btn';
    flipBtn.className = 'coin-toss-action-btn';
    flipBtn.textContent = 'FLIP COIN';
    flipBtn.disabled = true;
    flipBtn.addEventListener('mouseenter', showCoinTossPreview);
    flipBtn.addEventListener('mouseleave', hideCoinTossPreviewIfUnpinned);
    flipBtn.addEventListener('click', () => {
        if (coinTossPhase === 'armed') {
            void launchCoinToss();
            return;
        }
        void armCoinToss({ autoLaunch: isInstantRevealMode() });
    });
    actionRow.appendChild(flipBtn);

    const shuffleBtn = document.createElement('button');
    shuffleBtn.type = 'button';
    shuffleBtn.id = 'ticket-shuffle-start-btn';
    shuffleBtn.className = 'coin-toss-action-btn';
    shuffleBtn.textContent = 'SHUFFLE';
    shuffleBtn.disabled = true;
    shuffleBtn.addEventListener('mouseenter', showShufflePreview);
    shuffleBtn.addEventListener('mouseleave', hideMiddlePreviewIfUnpinned);
    shuffleBtn.addEventListener('click', () => { void armTicketShuffle(); });
    actionRow.appendChild(shuffleBtn);

    section.appendChild(actionRow);

    const status = document.createElement('div');
    status.id = 'coin-toss-status';
    status.setAttribute('aria-live', 'polite');
    section.appendChild(status);

    filtersPanel.appendChild(section);
    refreshCoinTossCandidatesUI();
    preloadCoinTossConfirmAudio();
    updateDecisionButtonStates();
}

// --- TICKET STUBS ---

const ticketStubsPrintClipPath = window.uiAudioPaths.ticketStubsPrint;
const ticketStubsShredClipPath = window.uiAudioPaths.ticketStubsShred;
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
    const stubs = [...paper.querySelectorAll('.ticket-stub:not([hidden])')];
    if (paperRect.width <= 0 || paperRect.height <= 0 || stubs.length === 0) return;

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

function resetTicketStubVisibility() {
    document.querySelectorAll('#ticket-stubs-panel .ticket-stub').forEach((stub) => {
        stub.hidden = false;
    });
}

function syncTicketStubVisibility() {
    const stubs = document.querySelectorAll('#ticket-stubs-panel .ticket-stub');
    const count = keeperPicks.length;
    stubs.forEach((stub, index) => {
        const isActive = index < count;
        stub.hidden = !isActive;
        if (!isActive) {
            const titleText = stub.querySelector('.ticket-stub-title-text');
            if (titleText) titleText.textContent = '';
            stub.querySelectorAll('.ticket-stub-icon').forEach((icon) => {
                icon.hidden = true;
                icon.textContent = '';
            });
        }
    });
}

function populateTicketStubTitles() {
    const stubs = document.querySelectorAll('#ticket-stubs-panel .ticket-stub');
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
    if (!panel || keeperPicks.length === 0) return;

    const printDurationMs = await loadTicketStubsPrintMetadata();
    const animationDurationMs = Math.max(300, printDurationMs - ticketStubsAnimationDelayMs);

    ticketStubsPanelGeneration += 1;
    const generation = ticketStubsPanelGeneration;

    syncTicketStubVisibility();
    populateTicketStubTitles();
    void panel.offsetHeight;
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
            resetTicketStubVisibility();
        }
    }
}

function showTicketStubsMessage() {
    if (keeperPicks.length === 0) return;

    if (isTicketStubsPanelOpen()) {
        closeTicketStubsPanel();
        return;
    }

    openTicketStubsPanel();
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

function minimizeKeeperDeck() {
    if (keeperPicks.length === 0) return;
    isKeeperDeckMinimized = true;
    updateKeeperPicksUI(false);
}

function expandKeeperDeck() {
    if (keeperPicks.length === 0) return;
    isKeeperDeckMinimized = false;
    updateKeeperPicksUI(false);
}

function toggleKeeperDeck() {
    if (keeperPicks.length === 0) return;
    isKeeperDeckMinimized = !isKeeperDeckMinimized;
    updateKeeperPicksUI(false);
}

function syncKeeperDeckTier(activeCount) {
    const keeperStage = document.getElementById('keeper-stage');
    if (!keeperStage) return { showRuntime: false };

    const showExpandedLayout = activeCount > 0
        && !isKeeperDeckMinimized
        && keeperPicks.length === activeCount;
    const showFullFeatures = activeCount === 3 && isKeeperDeckFull() && !isKeeperDeckMinimized;
    const showTicketStubs = activeCount >= 1
        && keeperPicks.length === activeCount
        && !isDiscardingKeeper
        && !isKeeperDeckMinimized;
    keeperStage.classList.toggle('visible', activeCount > 0);
    keeperStage.classList.toggle('full', showExpandedLayout);
    syncTicketStubsUI(showTicketStubs);

    const hitbox = document.getElementById('keeper-header-hitbox');
    if (hitbox) {
        hitbox.hidden = activeCount === 0;
        hitbox.setAttribute(
            'aria-label',
            isKeeperDeckMinimized ? 'Expand Keeper Flicks' : 'Minimize Keeper Flicks'
        );
    }

    const showRuntime = showFullFeatures;
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

function renderKeeperSlots({ animateLatest = false, animateSlotIndex = -1, showRuntime = false } = {}) {
    const activeCount = keeperPicks.length;
    const keeperItems = document.querySelectorAll('#keeper-slots .keeper-item');
    keeperItems.forEach((item, index) => {
        item.classList.remove('entering', 'entering-active', 'empty', 'filled', 'exiting');
        item.innerHTML = '';

        const pick = keeperPicks[index];
        if (pick) {
            const shouldAnimate = (animateLatest && index === keeperPicks.length - 1)
                || index === animateSlotIndex;
            renderKeeperMovieSlot(
                item,
                pick,
                shouldAnimate,
                showRuntime
            );
        } else if (activeCount > 0 && index >= activeCount) {
            item.classList.add('empty');
            item.innerHTML = getInsertCoinMarkup();
        }
    });
}

function updateKeeperPicksUI(animateOrOptions = false) {
    const keeperStage = document.getElementById('keeper-stage');
    if (!keeperStage) return;

    const animateLatest = animateOrOptions === true;
    const animateSlotIndex = typeof animateOrOptions === 'object' && animateOrOptions != null
        && Number.isInteger(animateOrOptions.animateSlotIndex)
        ? animateOrOptions.animateSlotIndex
        : -1;
    const shouldAnimateSlot = animateSlotIndex >= 0;

    const activeCount = keeperPicks.length;
    if (activeCount === 0) {
        isKeeperDeckMinimized = false;
    } else if (animateLatest && activeCount === 3) {
        isKeeperDeckMinimized = false;
    } else if (shouldAnimateSlot && activeCount === 3) {
        isKeeperDeckMinimized = false;
    } else if (activeCount < 3 && (animateLatest || isDiscardingKeeper)) {
        isKeeperDeckMinimized = true;
    }

    const deferFullReveal = animateLatest && activeCount === 3;
    const tierCount = deferFullReveal ? 2 : activeCount;
    const { showRuntime } = syncKeeperDeckTier(tierCount);

    renderKeeperSlots({ animateLatest, animateSlotIndex, showRuntime });

    if (deferFullReveal) {
        const generation = keeperUiGeneration;
        setTimeout(() => {
            if (keeperUiGeneration !== generation) return;
            if (keeperPicks.length === 3 && !isDiscardingKeeper) {
                updateKeeperPicksUI(false);
            }
        }, 400);
    }

    updateManualKeeperPanelState();
}

function updateKeeperButtonState() {
    const keeperButton = document.getElementById('keeper-button');
    if (!keeperButton) return;

    const canKeep = !isSpinning && recentSelections.length > 0 && getOpenKeeperSlots() > 0;
    keeperButton.disabled = !canKeep;
    keeperButton.classList.toggle('keeper-btn-disabled', !canKeep);
    keeperButton.classList.toggle('keeper-btn-hidden', !hasSelectedMovie);

    updateManualKeeperPanelState();
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
    isKeeperDeckMinimized = false;
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

// --- KEEPER UI ---

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
        <button type="button" id="keeper-header-hitbox"
                aria-label="Expand Keeper Flicks" hidden></button>
        <div id="keeper-header">
            <span id="keeper-total-runtime" hidden></span>
        </div>
        <ul id="keeper-slots">
            <li class="keeper-item empty"></li>
            <li class="keeper-item empty"></li>
            <li class="keeper-item empty"></li>
        </ul>
    `;
    keeperDeck.querySelector('#keeper-header-hitbox')
        ?.addEventListener('click', toggleKeeperDeck);
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
    ticketStubsImage.src = '../graphics/ui/ticket-dispenser.png';
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
    ticketStubsCopy.textContent = 'Mark as Watched';
    ticketStubsCopy.addEventListener('click', () => {
        void markTicketStubsAsWatched();
    });

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

// --- INIT ---

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

initWatchedMovies();

void loadWatchedMoviesFileHandle();

buildRuntimeFilterUI();

buildDecadeFilterUI();

buildWatchedFilterUI();

buildWheelArtToggleUI();

buildFilterPanelToggles();

buildManualKeeperPanelUI();

buildWatchedFlicksPanelUI();

const markWatchedBtn = document.getElementById('mark-watched-btn');
if (markWatchedBtn) {
    markWatchedBtn.addEventListener('click', toggleCurrentResultWatched);
}

updateSpinBlockerUI();

buildKeeperUI();

buildCoinTossUI();

buildAddMovieUI();

buildWatchedBulkImportUI();

updateKeeperPicksUI();

updateAudioControlButtons();

updateRevealModeUI();

updateKeeperButtonState();

preloadSpinButtonClipAudio();
preloadMarkWatchedScribbleAudio();
initSnappyPowerGaugeSegments();

const spinButtonEl = document.getElementById('spin-button');
if (spinButtonEl) {
    spinButtonEl.addEventListener('pointerdown', onSpinButtonPointerDown);
    spinButtonEl.addEventListener('pointerup', onSpinButtonPointerUp);
    spinButtonEl.addEventListener('pointercancel', onSpinButtonPointerCancel);
    spinButtonEl.addEventListener('keydown', onSpinButtonKeyDown);
    spinButtonEl.addEventListener('keyup', onSpinButtonKeyUp);
}

const modeSelectorDialEl = document.getElementById('mode-selector-dial');
if (modeSelectorDialEl) {
    modeSelectorDialEl.addEventListener('click', toggleRevealMode);
    modeSelectorDialEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleRevealMode();
        }
    });
}

// --- KEYBOARD SHORTCUTS ---

function isKeyboardTypingTarget(target) {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT') return true;
    if (tag === 'TEXTAREA' && !target.readOnly) return true;
    if (target.isContentEditable) return true;
    return false;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (isCoinTossing) {
            cancelActiveCoinToss();
            event.preventDefault();
            return;
        }
        if (isShuffleActive) {
            cancelActiveTicketShuffle();
            event.preventDefault();
            return;
        }

        stopCabinetAudio();

        const keeperExpanded = keeperPicks.length > 0 && !isKeeperDeckMinimized;
        const ticketStubsActive = isTicketStubsPanelOpen() || isTicketStubsPanelVisible();

        if (ticketStubsActive) {
            void closeTicketStubsPanel();
        }
        if (keeperExpanded) {
            minimizeKeeperDeck();
        }
        return;
    }

    if (event.key === ' ') {
        if (isKeyboardTypingTarget(event.target)) return;
        event.preventDefault();
        handleSpinButtonKeyDown(event);
        return;
    }

    if (event.repeat || !event.shiftKey || (event.key !== 'p' && event.key !== 'P')) return;

    if (isKeyboardTypingTarget(event.target)) return;

    event.preventDefault();
    populateKeeperPicksDevShortcut();
});

document.addEventListener('keyup', (event) => {
    if (event.key !== ' ') return;
    if (!spinButtonKeyArmed) return;
    event.preventDefault();
    handleSpinButtonKeyUp(event);
});
