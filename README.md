# 🚀 Cosmic Explorer 3D

**A free, open, photoreal 3D journey from Earth & the Moon to Starman's Tesla Roadster, the Voyager probes, all 6,451 confirmed NASA Exoplanets, the Milky Way, and the edge of the observable universe — built for curious kids.**

🌐 **Live Web App:** **[https://cosmic-explorer-universe.web.app](https://cosmic-explorer-universe.web.app)**

Everything is real data: NASA & ESO imagery, JPL orbital elements for today's date, IAU rotation poles, Hipparcos/Gaia star distances, the complete NASA Exoplanet Archive (`pscomppars`, 6,451 confirmed exoplanets across 4,847 host systems), and Local Group catalogs. No accounts, no ads, no tracking, no backend.

---

## ✨ What you can explore (one continuous zoom, 5 scales)

| Scale | What you see |
|---|---|
| **🌍 Earth & Moon** | NASA Blue Marble surface, Black Marble city lights on the real night side, cloud layer, ocean sun-glint, atmosphere; the Moon at its true distance with tonight's real phase; the ISS in a 51.6° orbit |
| **☀️ Solar System & Probes** | Sun with corona, all 8 planets textured & lit, Saturn's rings with the planet's shadow, Jupiter's & Saturn's big moons, Pluto/Ceres/Eris, Halley's comet, asteroid & Kuiper belts, **Starman's Tesla Roadster (`2018-017A`)** on its Mars-crossing heliocentric orbit, and **Voyager 1 & 2** with their real flyby paths and live distances |
| **⭐ Nearby Stars & All 6,451 NASA Exoplanets** | The real night sky (ESO Milky Way panorama in galactic coordinates), **all 6,451 confirmed exoplanets across 4,847 host star systems** (including **152 habitable-zone candidates**) plotted at true 3D RA/Dec & Gaia distances, plus on-demand 3D star/planet system materialization, habitable zones, binary companions, debris disks, nebulae & clusters |
| **🌌 Milky Way** | A structured barred spiral (Scutum–Centaurus, Perseus, Sagittarius & Outer arms, Orion Spur, dust lanes, HII regions, bulge, halo) oriented with the real galactic frame; Sagittarius A*; "you are here" |
| **🕸️ Universe** | Andromeda, Triangulum, the Magellanic Clouds and ~40 real galaxies/clusters at true positions, the cosmic web of filaments and voids, and the cosmic microwave background sphere |

### Kid-friendly tools & themes
- **🪐 6,451 Exoplanets Explorer** – Search and filter all 4,847 exoplanet host systems (*Habitable Zone (152)*, *Multi-Planet Systems (3+)*, *Nearest (< 65 ly)*, *Kepler & TESS Worlds*) and click any star or planet to fly there in 3D.
- **🚗 Live Tesla Roadster & Voyager Telemetry** – Real-time heliocentric & geocentric distances, orbital velocities, and orbits completed since launch.
- **☀️ Light Mode & 🌙 Dark Mode** – Switch between Deep-Space Dark Mode and a Celestial Star-Atlas Light Mode (`#...&th=l`).
- **🔊 Studio Read Aloud & 🧭 Guided Tour** – Studio-grade **Google Cloud Chirp 3 HD (`en-US-Chirp3-HD-Aoede`)** planetarium narration across all major objects and 11 Guided Tour stops, with an automatic Neural Web Speech fallback for all 6,451 exoplanets.
- **🏆 Space Quiz** • **📏 True-scale toggle** • **⏩ Time controls** • Shareable deep links (`#f=...&z=...`).

---

## ▶️ Run it locally

```bash
python3 server.py            # serves http://127.0.0.1:8088 (localhost only, strict security headers)
```

Open **http://127.0.0.1:8088** in Chrome, Edge, Firefox or Safari.

> No build step is required. Three.js is vendored in `vendor/three`, NASA/ESO textures are in `assets/textures`, and studio narration audio is in `assets/audio`.

**Controls:** drag to orbit • scroll / pinch to zoom • click any world or label to fly there • arrow keys rotate • `+`/`-` zoom.

---

## 🧠 How it works

- `src/engine/CosmicEngine3D.js` – WebGL renderer (`three.js`) with a **logarithmic depth buffer** and double-precision CPU transforms, spanning 10⁰ … 10²⁰ Earth radii without z-fighting or jitter. HDR bloom + ACES tone mapping + Dark/Light theme engine.
- `src/engine/astro.js` – JPL Keplerian elements (including Starman's Tesla Roadster `-143205` / `2018-017A`), Meeus lunar theory, IAU rotation poles & prime meridians, J2000 ↔ ecliptic ↔ galactic frames.
- `src/catalog/exoplanetArchive.js` – Complete NASA Exoplanet Archive (`pscomppars`) catalog of 6,451 confirmed exoplanets across 4,847 planetary systems.
- `src/engine/stages/*` – The five cosmic stages (Earth–Moon, Solar System, Stellar & Exoplanet Archive, Galaxy, Universe), each fading smoothly by zoom.
- `src/engine/shaders.js` – Day/night/specular/haze planet shader, ring shader with planet shadow, atmosphere rim, sun corona, HDR point sprites.

---

## 🙏 Credits & licenses

| Source | Used for | License |
|---|---|---|
| NASA Visible Earth (Blue Marble, Black Marble 2016, cloud composite) | Earth | Public domain |
| NASA SVS CGI Moon Kit (LRO LOLA) | Moon elevation | Public domain |
| Solar System Scope textures | Sun, Mercury, Venus, Mars, Jupiter, Saturn (+rings), Uranus, Neptune, Moon color | CC BY 4.0 |
| ESO / S. Brunier – Milky Way panorama (eso0932a) | Night sky | CC BY 4.0 |
| three.js | Rendering engine | MIT |
| JPL Horizons (`-143205` Roadster, Voyager 1 & 2, planetary ephemerides), IAU WGCCRE, NASA Exoplanet Archive (`pscomppars`) | Ephemerides & catalogs | Public data |

Code: MIT.
