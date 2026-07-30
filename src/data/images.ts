// Central image registry. All images resolve through here so swapping
// sources (e.g. to a CMS) is a one-file change. Files live in public/images/
// (downloaded once via scripts/download-images.mjs).

const local = (key: string) => `/images/${key}.jpg`;

export const images = {
  // Heroes / general
  homeHero: local("homeHero"),
  ctaBanner: local("ctaBanner"),

  // Everest region
  everest1: local("everest1"),
  everest2: local("everest2"),
  everest3: local("everest3"),
  gokyo1: local("gokyo1"),
  everestView1: local("everestView1"),
  islandPeak1: local("islandPeak1"),
  heli1: local("heli1"),

  // Annapurna region
  annapurna1: local("annapurna1"),
  annapurna2: local("annapurna2"),
  abc1: local("abc1"),

  // Langtang / Manaslu / Mustang
  langtang1: local("langtang1"),
  manaslu1: local("manaslu1"),
  mustang1: local("mustang1"),

  // Tours / safari
  kathmandu1: local("kathmandu1"),
  chitwan1: local("chitwan1"),

  // Destinations
  nepal: local("nepal"),
  tibet: local("tibet"),
  bhutan: local("bhutan"),

  // Blog
  blogPacking: local("blogPacking"),
  blogSeason: local("blogSeason"),
  blogAltitude: local("blogAltitude"),
  blogPermits: local("blogPermits"),

  // Team (portraits)
  team1: local("team1"),
  team2: local("team2"),
  team3: local("team3"),
  team4: local("team4"),

  // Static route-map placeholder (topo-style terrain shot)
  routeMap: local("routeMap"),
} as const;

export type ImageKey = keyof typeof images;
