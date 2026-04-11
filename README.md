# Star Wars Canonical Timeline Gantt

An interactive Gantt chart visualizing the complete Star Wars canon timeline (BBY/ABY), covering all major media: films, animated series, live-action series, comics, novels, and video games.

![Star Wars Timeline](https://img.shields.io/badge/Star%20Wars-Canon%20Timeline-f5c030?style=flat&labelColor=090910)
![React](https://img.shields.io/badge/React-18-38b4f0?style=flat&labelColor=090910)

## Features

- **Dual scale** — compressed before 30 BBY (High Republic era), expanded for the main saga
- **Split bars** — broken bars with dashed connectors show temporal jumps within the same series
- **6 media categories** — films, animated series, live-action, comics, novels, video games
- **Hover info** — hover any row for exact year ranges and notes
- **Era backgrounds** — color-coded bands for Alta Repubblica, Era Imperiale, Ribellione, etc.

## Media included

| Category | Titles |
|---|---|
| Films | All 11 canon films (Episodes I–IX, Rogue One, Solo) |
| Animated | Clone Wars, Rebels, Bad Batch, Resistance, Tales of the Jedi, Tales of the Empire, Tales of the Underworld, Maul: Shadow Lord, Young Jedi Adventures, The Acolyte |
| Live-action | Mandalorian, Andor, Obi-Wan Kenobi, Ahsoka, Book of Boba Fett, Skeleton Crew |
| Comics | High Republic (3 phases), Darth Vader: Dark Lord, Doctor Aphra, Star Wars (Marvel 2015), War of the Bounty Hunters / Crimson Reign |
| Novels | High Republic (3 phases), Ahsoka, Thrawn, Lost Stars, Aftermath, Alphabet Squadron |
| Video games | Jedi: Fallen Order, Jedi: Survivor, Star Wars Outlaws, Battlefront II |

## Run locally

```bash
npx create-react-app starwars-gantt
cd starwars-gantt
cp path/to/starwars-gantt.jsx src/App.js
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

## Data sources

- [Wookieepedia](https://starwars.fandom.com) — canonical year references
- [GamesRadar Star Wars Timeline](https://www.gamesradar.com/star-wars-timeline/)
- [Empire Online Star Wars Timeline](https://www.empireonline.com/movies/features/star-wars-timeline-chronological-order/)

## Disclaimer

This is an unofficial fan project. Star Wars and all related properties are trademarks of Lucasfilm Ltd. / The Walt Disney Company. This project is not affiliated with or endorsed by Lucasfilm or Disney.
