import type { Destination } from "./types";
import { images } from "./images";

export const destinations: Destination[] = [
  {
    slug: "nepal",
    name: "Nepal",
    tagline: "Home of eight of the world's fourteen 8,000 m peaks",
    description:
      "Nepal is the beating heart of Himalayan adventure — a country where a single journey can pass from tiger-filled jungle at 100 m to the flanks of Everest at 5,000 m. Beyond the mountains lie living medieval cities, a warm teahouse culture found nowhere else on earth, and trails for every level: gentle week-long hill walks, the classic Everest and Annapurna routes, and remote restricted-area expeditions in Mustang, Manaslu and Dolpo.",
    image: images.nepal,
  },
  {
    slug: "tibet",
    name: "Tibet",
    tagline: "The roof of the world",
    description:
      "Cross into the vast Tibetan plateau for turquoise lakes, fortress monasteries and the north face of Everest. Our Tibet journeys run overland from Lhasa's Potala Palace across high passes to Rongbuk — the world's highest monastery — before descending to the Nepal border. All permits and Chinese group visas are arranged by our Kathmandu office.",
    image: images.tibet,
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    tagline: "The last Himalayan kingdom",
    description:
      "Bhutan limits its visitors and protects its culture like nowhere else in the Himalaya. Expect immaculate dzong fortresses, prayer-flag passes, the cliff-hanging Tiger's Nest monastery and all-inclusive travel where every meal, guide and government fee is covered in one transparent price.",
    image: images.bhutan,
  },
];
