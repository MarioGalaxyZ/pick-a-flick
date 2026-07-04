# Wheel categories

Editorial guide for what each category wheel means when curating or adding movies. The **source of truth for which titles belong on each wheel** is still the `movieDatabase` object at the top of [`app/main.js`](../app/main.js).

Category keys must match **exactly** (including emoji) across:

- `movieDatabase` in `app/main.js`
- [`scripts/win-clip-categories.mjs`](../scripts/win-clip-categories.mjs)
- `audio/win/<folder>/`

---

## Overview

| Category | Type | Count | One-line blurb |
|----------|------|------:|----------------|
| ALIEN ALLEY 👽 | Genre/Vibe | 16 | Alien encounters, invasion, and extraterrestrial sci-fi |
| ANIMATION STATION 👾 | Genre/Vibe | 31 | Hand-drawn, stop-motion, CG, and hybrid animation |
| CAGE STAGE 🐷 | Actor | 25 | Nicolas Cage across action, horror, drama, and chaos |
| CARREY'S CHARACTERS 🎭 | Actor | 22 | Jim Carrey from rubber-faced comedy to darker character work |
| KAUFMAN'S KORNER 🌞 | Writer | 9 | Charlie Kaufman scripts — identity, meta-fiction, existential dread |
| MOVIES TO FALL ASLEEP TO 💤 | Ironic | 23 | Intense and unsettling picks (ironic name — not cozy bedtime films) |
| MUSIC MOUNTAIN ⛰️ | Genre/Vibe | 20 | Music biopics, rock history, and music-driven narratives |
| PEGG'S PLAYGROUND 🎡 | Actor | 15 | Simon Pegg — Cornetto trilogy, British comedy, odd jobs |
| SEQUEL STREET 🚗 | Sequels | 22 | Follow-ups and franchise entries (not usually the first film) |
| WACKY WAY 🤪 | Genre/Vibe | 69 | Surreal, cult, and offbeat comedy/horror/fantasy |
| ZEMECKIS ZONE 🐇 | Director | 10 | Robert Zemeckis — time travel, effects showcases, adult drama |
| PHOENIX FREEWAY 🃏 | Actor | 14 | Joaquin Phoenix in brooding, often noir-leaning work |
| FOREIGN EMBASSY 🌐 | International | 17 | International and non-English cinema |
| TUMBLEWEED TURNPIKE 🏜️ | Genre/Vibe | 11 | Westerns and neo-westerns |
| JB JUNCTION 🎸 | Actor | 17 | Jack Black — loud, earnest, often musical comedy |
| NEON & NINETIES 🌃 | Genre/Vibe | 39 | Neon-noir, cyberpunk, and cool-crime aesthetic (not strictly 1990s) |

**Total listings:** 360 across all categories. Some titles appear in more than one wheel (see [Cross-category duplicates](#cross-category-duplicates)).

---

## ALIEN ALLEY 👽

**Type:** Genre/Vibe  
**Count:** 16

**Blurb:** First contact, invasion, and extraterrestrial sci-fi — from classic blockbusters to satire and thoughtful or tense takes on visitors from beyond.

**Examples:** *Alien* (1979), *E.T. the Extra Terrestrial* (1982), *District 9* (2009), *Annihilation* (2018), *Mars Attacks!* (1996)

---

## ANIMATION STATION 👾

**Type:** Genre/Vibe  
**Count:** 31

**Blurb:** Animated films across studios and eras — family favorites, cult picks, and oddballs. Not one studio or style; the through-line is "animated, and interesting."

**Examples:** *The Iron Giant* (1999), *Shrek* (2001), *Chicken Run* (2000), *The Secret of NIMH* (1982), *A Scanner Darkly* (2006)

---

## CAGE STAGE 🐷

**Type:** Actor  
**Count:** 25

**Blurb:** Nicolas Cage across genres: action, horror, drama, and Coen-adjacent chaos. The wheel is defined by the lead, not a single tone.

**Examples:** *The Rock* (1996), *Leaving Las Vegas* (1995), *Raising Arizona* (1987), *Pig* (2021), *Color Out of Space* (2019)

---

## CARREY'S CHARACTERS 🎭

**Type:** Actor  
**Count:** 22

**Blurb:** Jim Carrey from rubber-faced comedy through weirder and darker work, including recent voice and live-action roles.

**Examples:** *The Mask* (1994), *Dumb and Dumber* (1994), *The Truman Show* (1998), *Man On The Moon* (1999), *Liar Liar* (1997)

---

## KAUFMAN'S KORNER 🌞

**Type:** Writer  
**Count:** 9

**Blurb:** Charlie Kaufman–written stories: identity, meta-fiction, and existential dread. Mind-bending scripts rather than a star or genre hook.

**Examples:** *Being John Malkovich* (1999), *Adaptation.* (2002), *Eternal Sunshine of the Spotless Mind* (2004), *Synecdoche, New York* (2008), *Anomalisa* (2015)

---

## MOVIES TO FALL ASLEEP TO 💤

**Type:** Ironic  
**Count:** 23

**Blurb:** Horror, thriller, and anxiety fuel — **not** cozy bedtime picks. The category name is deliberately ironic.

**Examples:** *Midsommar* (2019), *Crank* (2006), *Beau is Afraid* (2023), *Possessor* (2020), *Jacob's Ladder* (1990)

**Notes:** Folk horror, body horror, action intensity, and unsettling drama all fit here. Do not add gentle or slow "background noise" films unless the joke is the point.

---

## MUSIC MOUNTAIN ⛰️

**Type:** Genre/Vibe  
**Count:** 20

**Blurb:** Music as subject or backbone — biopics, rock history, and narratives where music drives the story.

**Examples:** *Ray* (2004), *Walk the Line* (2005), *The Blues Brothers* (1980), *24 Hour Party People* (2002), *O Brother Where Art Thou* (2000)

---

## PEGG'S PLAYGROUND 🎡

**Type:** Actor  
**Count:** 15

**Blurb:** Simon Pegg — especially the Cornetto trilogy, British comedy, odd jobs, and bigger-budget appearances.

**Examples:** *Shaun of the Dead* (2004), *Hot Fuzz* (2007), *The World's End* (2013), *Run Fatboy Run* (2007), *Ready Player One* (2018)

---

## SEQUEL STREET 🚗

**Type:** Sequels  
**Count:** 22

**Blurb:** Follow-ups and franchise entries. The first film in a series usually lives elsewhere; this wheel is for part 2 and beyond.

**Examples:** *Back to the Future Part 2* (1989), *Shrek 2* (2004), *Kung Fu Panda 2* (2011), *Bill & Ted's Bogus Journey* (1991), *Ip Man 2* (2010)

**Notes:** Includes upcoming or placeholder entries (e.g. *The Super Mario Galaxy Movie* (2026)). *Ip Man* (2008) lives on Foreign Embassy; sequels live here.

---

## WACKY WAY 🤪

**Type:** Genre/Vibe  
**Count:** 69

**Blurb:** The largest category — surreal, cult, and offbeat comedy, horror, and fantasy. Absurdist energy, creature features, 80s/90s oddities, and "how did this get made?" picks.

**Examples:** *Kung Pow: Enter the Fist* (2002), *Swiss Army Man* (2016), *Repo Man* (1984), *The Dark Crystal* (1982), *UHF* (1989)

---

## ZEMECKIS ZONE 🐇

**Type:** Director  
**Count:** 10

**Blurb:** Robert Zemeckis — time travel, landmark effects work, and adult drama. A smaller, director-focused slice of the wheel.

**Examples:** *Back to the Future* (1985), *Who Framed Roger Rabbit* (1988), *Cast Away* (2000), *Contact* (1997), *Flight* (2012)

---

## PHOENIX FREEWAY 🃏

**Type:** Actor  
**Count:** 14

**Blurb:** Joaquin Phoenix in brooding, often noir-leaning work — PTA, crime, and character studies.

**Examples:** *The Master* (2012), *Her* (2013), *You Were Never Really Here* (2017), *Inherent Vice* (2014), *8MM* (1999)

---

## FOREIGN EMBASSY 🌐

**Type:** International  
**Count:** 17

**Blurb:** International cinema — Korean, Chinese/Hong Kong, French, Brazilian, Scandinavian, and other non-English or globally notable films.

**Examples:** *Parasite* (2019), *Train to Busan* (2016), *City of God* (2002), *La Haine* (1995), *Ip Man* (2008)

**Notes:** *Ip Man* sequels live on Sequel Street. Martial-arts franchise logic: first film here, follow-ups on Sequel Street.

---

## TUMBLEWEED TURNPIKE 🏜️

**Type:** Genre/Vibe  
**Count:** 11

**Blurb:** Westerns and neo-westerns — classics, revisionist takes, survival and revenge, and modern frontier crime.

**Examples:** *Unforgiven* (1992), *True Grit* (2010), *Hell or High Water* (2016), *The Revenant* (2015), *Slow West* (2015)

---

## JB JUNCTION 🎸

**Type:** Actor  
**Count:** 17

**Blurb:** Jack Black's loud, earnest, often musical comedy — rock teachers, mockumentary parody, and action-comedy.

**Examples:** *School of Rock* (2003), *Nacho Libre* (2006), *Bernie* (2011), *Walk Hard: The Dewey Cox Story* (2007), *Kung Fu Panda* (2008)

---

## NEON & NINETIES 🌃

**Type:** Genre/Vibe  
**Count:** 39

**Blurb:** Neon-noir, cyberpunk, and "cool crime" vibe. Despite the name, **not limited to the 1990s** — includes *Blade Runner* (1982), *Drive* (2011), and synth-adjacent sci-fi alongside 90s cult comedy.

**Examples:** *Blade Runner* (1982), *Drive* (2011), *Office Space* (1999), *Dark City* (1998), *Ex Machina* (2015)

**Notes:** Curate for aesthetic and mood, not release decade. 90s comedy (*Clerks*, *Wayne's World*, *The Big Lebowski*) sits alongside neon sci-fi (*Tron*, *Gattaca*, *Strange Days*).

---

## Cross-category duplicates

Some titles intentionally appear in more than one wheel:

| Title | Categories |
|-------|------------|
| *Used Cars* (1980) | Wacky Way, Zemeckis Zone |
| *Tenacious D in The Pick of Destiny* (2006) | Music Mountain, JB Junction |
| *Tropic Thunder* (2008) | Wacky Way, JB Junction |
| *Bill & Ted's Excellent Adventure* (1989) | Wacky Way (original); sequels on Sequel Street |
| *Back to the Future* (1985) | Zemeckis Zone; Parts 2 & 3 on Sequel Street |
| *Ip Man* (2008) | Foreign Embassy; sequels on Sequel Street |
| *Kung Fu Panda* (2008) | JB Junction; sequels on Sequel Street |
| *Shrek* (2001) | Animation Station; *Shrek 2* on Sequel Street |
| *Sonic the Hedgehog* (2020) | Animation Station; *Sonic 2* on Sequel Street |

When adding a title, pick the primary wheel first; duplicate only when the split is intentional (e.g. original vs sequel, or director + vibe fit).

---

## Related docs

- [User Guide](USER-GUIDE.md) — player-facing filters and spin behavior
- [docs/AGENTS.md](AGENTS.md) — architecture map and `app/main.js` section banners
