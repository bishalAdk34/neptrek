import type { Category } from "./types";
import { images } from "./images";

export const categories: Category[] = [
  {
    slug: "everest-region",
    name: "Everest Region",
    destination: "nepal",
    description:
      "The Khumbu — Sherpa homeland and stage for the world's most famous trek. Base camp journeys, the turquoise Gokyo lakes and short Everest-view walks all start with the legendary flight into Lukla.",
    image: images.everest1,
  },
  {
    slug: "annapurna-region",
    name: "Annapurna Region",
    destination: "nepal",
    description:
      "Nepal's most varied trekking region: the great Circuit over Thorong La, the amphitheatre of the Annapurna Sanctuary, and lake-side Pokhara as your basecamp.",
    image: images.annapurna1,
  },
  {
    slug: "langtang-region",
    name: "Langtang Region",
    destination: "nepal",
    description:
      "The valley of glaciers, just north of Kathmandu — Tamang villages, yak cheese, red pandas and big viewpoints without internal flights.",
    image: images.langtang1,
  },
  {
    slug: "other-regions",
    name: "Manaslu, Mustang & Beyond",
    destination: "nepal",
    description:
      "Restricted-area gems for those who want trails to themselves: the Manaslu Circuit, the desert kingdom of Upper Mustang, Dolpo and more.",
    image: images.mustang1,
  },
  {
    slug: "tours",
    name: "Cultural Tours",
    destination: "nepal",
    description:
      "UNESCO heritage cities, Himalayan sunrises and overland journeys through Nepal, Tibet and Bhutan — no trekking boots required.",
    image: images.kathmandu1,
  },
  {
    slug: "peak-climbing",
    name: "Peak Climbing",
    destination: "nepal",
    description:
      "Your first Himalayan summit: Island Peak, Mera Peak and Lobuche East with qualified climbing Sherpas, full training and 1:2 ratios on summit day.",
    image: images.islandPeak1,
  },
  {
    slug: "rafting",
    name: "River Rafting",
    destination: "nepal",
    description:
      "Glacier-fed whitewater from half-day splashes on the Trishuli to multi-day wilderness expeditions on the Sun Koshi. Ask us for tailor-made rafting add-ons.",
    image: images.ctaBanner,
  },
  {
    slug: "jungle-safari",
    name: "Jungle Safari",
    destination: "nepal",
    description:
      "Rhinos, tigers and 540 bird species in the lowland jungles of Chitwan and Bardia national parks.",
    image: images.chitwan1,
  },
  {
    slug: "helicopter-tours",
    name: "Helicopter Tours",
    destination: "nepal",
    description:
      "Everest before lunch: heli tours to Kala Patthar, Annapurna Base Camp and Langtang for those short on time — every seat a window seat.",
    image: images.heli1,
  },
];
