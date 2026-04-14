# Star Wars Canonical Timeline Gantt

An interactive Gantt chart visualizing the complete Star Wars canon timeline (BBY/ABY), covering all major media: films, animated series, live-action series, comics, novels, video games, Legends soft-canon references, and character lifespans.

![Star Wars Timeline](https://img.shields.io/badge/Star%20Wars-Canon%20Timeline-f5c030?style=flat&labelColor=090910)
![React](https://img.shields.io/badge/React-18-38b4f0?style=flat&labelColor=090910)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-6dc87a?style=flat&labelColor=090910)

**Live demo:** [simmonsstummer.github.io/starwars-gantt](https://simmonsstummer.github.io/starwars-gantt)

---

## Features

- **3-zone non-linear scale** — ultra-compressed before 392 BBY (Old Republic era), compressed between 392–30 BBY (High Republic era), expanded for the main saga
- **Scale-break indicators** — zigzag lines mark where the scale changes, with legend explaining the compression factor
- **Split bars** — broken bars with dashed connectors show temporal jumps within the same series (e.g. Clone Wars, Andor S2)
- **8 categories** — films, animated series, live-action, comics, novels, video games, soft canon (Legends references in Disney canon), and **character lifespans** (Characters category collapsed by default)
- **Collapsible categories** — click any category header to collapse/expand its rows; expand-all / collapse-all buttons in the label header
- **Era backgrounds** — color-coded bands for High Republic, Fall of the Republic, Imperial Era, Rebellion, New Republic, Rise of the First Order
- **Galactic events** — toggleable vertical dashed markers for key events (Order 66, Death Star destructions, Battle of Endor, Starkiller, Rule of Two, New Jedi Order founding, etc.), color-coded: red for wars/battles, indigo for historical/institutional milestones; hover/tap shows full description banner
- **Character lifespans** — dedicated section showing 46 major characters (including droids and KOTOR-era Jedi: Revan, Malak, Bane) as birth-to-death bars; triangular arrowheads mark uncertain/approximate dates; lifespan in years shown next to death date when both dates are certain; scrubber shows who is alive at any given year
- **Side panel** — click any row to pin a detail panel showing: spoiler-free description, release date, era, timeline segments, seasons/arcs, canonical notes, source links, watch order (before/after), personal completion checkbox, and 5-star rating
- **Scrubber line** — move the mouse over the chart to see what media and characters are active at any point in time; click to lock the scrubber and get a list at that exact year
- **Connection lines** — toggleable orthogonal step-path connectors linking related/sequential media across the chart (Links on/off button)
- **Sticky timeline ruler** — year axis stays visible at the top while scrolling vertically through rows
- **Personal tracking** — completion status and star rating saved per-title in localStorage; watched counter in header
- **Light/dark mode** — toggle between dark (default) and light themes; preference persisted in localStorage
- **PNG export** — export the full timeline as a high-resolution PNG image
- **Drag to pan** — click and drag to scroll the timeline horizontally
- **Ctrl+scroll to zoom** — zoom in/out with Ctrl+mouse wheel anchored at the cursor position; plain scroll moves the page normally
- **Zoom buttons** — −/reset/+ buttons in the header for keyboard-free zoom control
- **Mobile responsive** — under 760px width the app switches to a touch-optimized layout: compact header, hamburger menu with all controls, pinch-to-zoom, native touch pan, tap-to-reveal event banners, slide-up bottom sheet for detail panels, and a one-tap fullscreen+landscape button (Android). Desktop layout is preserved pixel-for-pixel.

---

## Media included

| Category | Titles |
|---|---|
| Films | All 11 canon films (Episodes I–IX, Rogue One, Solo) |
| Animated | Clone Wars, Rebels, Bad Batch, Resistance, Tales of the Jedi, Tales of the Empire, Tales of the Underworld, Maul: Shadow Lord, Young Jedi Adventures, The Acolyte |
| Live-action | Mandalorian, Andor (S1+S2), Obi-Wan Kenobi, Ahsoka, Book of Boba Fett, Skeleton Crew |
| Comics | High Republic (3 phases), Shadow of Maul, Darth Vader: Dark Lord, Doctor Aphra, Star Wars (Marvel 2015), War of the Bounty Hunters / Crimson Reign |
| Novels | High Republic (3 phases), Ahsoka, Master & Apprentice, Thrawn, Lost Stars, Aftermath, Alphabet Squadron, Bloodline |
| Video games | Jedi: Fallen Order, Jedi: Survivor, Star Wars Outlaws, Star Wars Squadrons, Battlefront II (story mode) |
| Soft Canon | KOTOR I & II, The Old Republic (MMO), Republic Commando, The Force Unleashed I+II, Shadows of the Empire |
| Characters | 46 major characters — lifespan bars (birth → death) with uncertainty markers (◂▸) for approximate or unknown dates; includes Jedi Council members (Plo Koon, Ki-Adi-Mundi, Kit Fisto, Shaak Ti, Luminara, Aayla Secura, Depa Billaba), bounty hunters (Jango Fett), Sith Lords of the old era (Darth Bane), and KOTOR-era figures (Revan, Malak) |

### Season / arc breakdowns

Series with non-linear or multi-era timelines include per-season year placements:

- **The Clone Wars** — 7 seasons (~22–19 BBY)
- **The Bad Batch** — 3 seasons (19–17 BBY)
- **Star Wars Rebels** — 4 seasons + epilogue (5 BBY – 4 ABY)
- **Star Wars Resistance** — 2 seasons (34–35 ABY)
- **Andor** — S1 + S2 in 4 chapters, each +1 year (5–1 BBY)
- **The Mandalorian** — 3 seasons (9–10 ABY)
- **Book of Boba Fett** — flashbacks (4 ABY) + present (9 ABY)
- **Ahsoka** — S1 (9 ABY)

---

## Mobile support

The desktop layout is preserved pixel-for-pixel — nothing changes when viewed on a normal computer. Under 760px of width, or on any touch device in landscape with a short viewport, the app switches to a touch-optimized layout:

- **Compact header** — reduced title and hidden legend/hint line to save vertical space
- **Hamburger menu (☰)** — dark/light toggle, connections toggle, events toggle, zoom −/reset/+, export PNG, and watched counter all gathered into a single overlay sheet
- **Fullscreen + landscape button (⛶)** — taps into the Fullscreen API and requests a landscape orientation lock (works on Android; iOS Safari enters fullscreen but doesn't honor the orientation lock, so the user rotates the device manually)
- **Pinch-to-zoom** — two-finger gesture zooms anchored to the midpoint between fingers; one-finger drag pans horizontally via native touch scroll
- **Tap-to-reveal event banners** — tap an event marker on the ruler and its description appears as a fixed banner at the top of the screen; tap anywhere to dismiss
- **Slide-up bottom sheet** — the detail panel animates up from the bottom (max 65vh) when a row is tapped, instead of opening as a fixed side column
- **Scrollable page** — the full timeline fills the viewport, and the shortcuts / disclaimer / data-sources footers live below the chart so the user can swipe down to read them without them ever covering the timeline itself

---

## Architecture

The project is a **single self-contained `index.html`** file — no build step required. It uses:

- **React 18** + **ReactDOM** via CDN
- **Babel Standalone** for in-browser JSX transpilation
- **DM Mono** (Google Fonts) for typography
- No external dependencies beyond the above

This makes it trivially deployable on GitHub Pages by just serving the file.

The `index.html` is the canonical version served by GitHub Pages.

---

## Run locally

Simply open `index.html` in a browser — no server needed.

Or, to use the JSX component in a React project:

```bash
npx create-react-app starwars-gantt
cd starwars-gantt
cp path/to/starwars-gantt.jsx src/App.js
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Data sources

- [Wookieepedia](https://starwars.fandom.com) — canonical year references and episode-level details
- [GamesRadar Star Wars Timeline](https://www.gamesradar.com/star-wars-timeline/)
- [Empire Online Star Wars Timeline](https://www.empireonline.com/movies/features/star-wars-timeline-chronological-order/)
- [Wikipedia](https://en.wikipedia.org) — general publication and plot information

---

## Disclaimer

This is an unofficial fan project created for informational and entertainment purposes only. It is not affiliated with, endorsed by, or connected to Lucasfilm Ltd., The Walt Disney Company, or any of their subsidiaries or affiliates. Star Wars and all related names, characters, titles, and indicia are trademarks and/or copyrights of Lucasfilm Ltd. / The Walt Disney Company. All rights reserved. No copyright infringement is intended. No commercial use is made of any protected material.
