#!/usr/bin/env bash
# Downloads the public-domain / CC-BY imagery used by Cosmic Explorer 3D into assets/textures.
# Sources & licenses (also listed in README.md → Credits):
#   • NASA Visible Earth (Blue Marble, Black Marble, clouds)  — Public Domain
#   • NASA SVS CGI Moon Kit (LRO LOLA displacement)           — Public Domain
#   • Solar System Scope planet maps                           — CC BY 4.0 (https://www.solarsystemscope.com/textures/)
#   • ESO / S. Brunier Milky Way panorama (eso0932a)           — CC BY 4.0 (https://www.eso.org/public/images/eso0932a/)
#   • three.js Earth specular map                               — MIT (https://github.com/mrdoob/three.js)
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="assets/textures"
mkdir -p "$OUT"

fetch () {
  local url="$1" dest="$2"
  if [ -s "$OUT/$dest" ]; then echo "✓ $dest (cached)"; return; fi
  echo "↓ $dest"
  curl -fsSL --retry 3 --max-time 180 -o "$OUT/$dest.part" "$url" && mv "$OUT/$dest.part" "$OUT/$dest"
}

SSS="https://www.solarsystemscope.com/textures/download"
NASA_EO="https://eoimages.gsfc.nasa.gov/images/imagerecords"

# Earth (NASA)
fetch "$NASA_EO/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg" earth_day_nasa_5400.jpg
fetch "$NASA_EO/144000/144898/BlackMarble_2016_01deg.jpg"             earth_night_nasa_3600.jpg
fetch "$NASA_EO/57000/57747/cloud_combined_2048.jpg"                   earth_clouds_nasa_2048.jpg
fetch "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg" earth_specular_2048.jpg

# Moon (Solar System Scope color + NASA LRO LOLA elevation for bump mapping)
fetch "$SSS/2k_moon.jpg"                                                        moon_2k.jpg
fetch "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg"  moon_bump_nasa_1440.jpg

# Sun & planets (Solar System Scope, CC BY 4.0)
fetch "$SSS/2k_sun.jpg"               sun_2k.jpg
fetch "$SSS/2k_mercury.jpg"           mercury_2k.jpg
fetch "$SSS/2k_venus_atmosphere.jpg"  venus_atmosphere_2k.jpg
fetch "$SSS/2k_mars.jpg"              mars_2k.jpg
fetch "$SSS/2k_jupiter.jpg"           jupiter_2k.jpg
fetch "$SSS/2k_saturn.jpg"            saturn_2k.jpg
fetch "$SSS/2k_saturn_ring_alpha.png" saturn_ring_alpha_2k.png
fetch "$SSS/2k_uranus.jpg"            uranus_2k.jpg
fetch "$SSS/2k_neptune.jpg"           neptune_2k.jpg

# Real night sky: ESO Milky Way panorama in galactic coordinates (CC BY 4.0, ESO/S. Brunier)
fetch "https://cdn.eso.org/images/publicationjpg/eso0932a.jpg" milkyway_eso0932a_full.jpg

# Produce browser-friendly sky resolutions with macOS `sips` (or ImageMagick if present)
if command -v sips >/dev/null 2>&1; then
  [ -s "$OUT/sky_milkyway_6k.jpg" ] || sips -Z 6144 -s format jpeg -s formatOptions 82 "$OUT/milkyway_eso0932a_full.jpg" --out "$OUT/sky_milkyway_6k.jpg" >/dev/null
  [ -s "$OUT/sky_milkyway_2k.jpg" ] || sips -Z 2048 -s format jpeg -s formatOptions 80 "$OUT/milkyway_eso0932a_full.jpg" --out "$OUT/sky_milkyway_2k.jpg" >/dev/null
elif command -v magick >/dev/null 2>&1; then
  [ -s "$OUT/sky_milkyway_6k.jpg" ] || magick "$OUT/milkyway_eso0932a_full.jpg" -resize 6144x -quality 82 "$OUT/sky_milkyway_6k.jpg"
  [ -s "$OUT/sky_milkyway_2k.jpg" ] || magick "$OUT/milkyway_eso0932a_full.jpg" -resize 2048x -quality 80 "$OUT/sky_milkyway_2k.jpg"
fi

echo "All textures ready in $OUT"
ls -la "$OUT"
