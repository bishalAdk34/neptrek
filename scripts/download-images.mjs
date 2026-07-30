// One-off script: downloads all Unsplash images referenced in
// src/data/images.ts to public/images/<key>.jpg.
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const unsplash = (id, w = 1600, q = 75) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

const sources = {
  homeHero: unsplash("photo-1544735716-392fe2489ffa", 2000),
  ctaBanner: unsplash("photo-1585409677983-0f6c41ca9c3b", 2000),

  everest1: unsplash("photo-1544735716-392fe2489ffa"),
  everest2: unsplash("photo-1516302752625-fcc3c50ae61f"),
  everest3: unsplash("photo-1522410818928-5522dacd5066"),
  gokyo1: unsplash("photo-1486911278844-a81c5267e227"),
  everestView1: unsplash("photo-1533130061792-64b345e4a833"),
  islandPeak1: unsplash("photo-1454496522488-7a8e488e8606"),
  heli1: unsplash("photo-1512036666432-2181c1f26420"),

  annapurna1: unsplash("photo-1526772662000-3f88f10405ff"),
  annapurna2: unsplash("photo-1519681393784-d120267933ba"),
  abc1: unsplash("photo-1551632811-561732d1e306"),

  langtang1: unsplash("photo-1585409677983-0f6c41ca9c3b"),
  manaslu1: unsplash("photo-1506905925346-21bda4d32df4"),
  mustang1: unsplash("photo-1605640840605-14ac1855827b"),

  kathmandu1: unsplash("photo-1558799401-1dcba79834c2"),
  chitwan1: unsplash("photo-1549366021-9f761d450615"),

  nepal: unsplash("photo-1544735716-392fe2489ffa"),
  tibet: unsplash("photo-1509233725247-49e657c54213"),
  bhutan: unsplash("photo-1553856622-d1b352e9a211"),

  blogPacking: unsplash("photo-1553531384-cc64ac80f931"),
  blogSeason: unsplash("photo-1526772662000-3f88f10405ff"),
  blogAltitude: unsplash("photo-1519681393784-d120267933ba"),
  blogPermits: unsplash("photo-1558799401-1dcba79834c2"),

  team1: unsplash("photo-1507003211169-0a1dd7228f2d", 600),
  team2: unsplash("photo-1500648767791-00dcc994a43e", 600),
  team3: unsplash("photo-1544005313-94ddf0286df2", 600),
  team4: unsplash("photo-1472099645785-5658abf4ff4e", 600),

  routeMap: unsplash("photo-1524661135-423995f22d0b", 1400),
};

const OUT_DIR = path.join(process.cwd(), "public", "images");

async function download(key, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${key}: HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT_DIR, `${key}.jpg`), buf);
  console.log(`✓ ${key}.jpg (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const entries = Object.entries(sources);
  for (const [key, url] of entries) {
    await download(key, url);
  }
  console.log(`Downloaded ${entries.length} images to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
