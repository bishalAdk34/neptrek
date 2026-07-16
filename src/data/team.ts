import type { TeamMember } from "./types";
import { images } from "./images";

export const team: TeamMember[] = [
  {
    name: "Pemba Sherpa",
    role: "Founder & Managing Director",
    bio: "Born in Khumjung in the shadow of Everest, Pemba guided for a decade — including three Everest expeditions — before founding Himalayan Horizons in 2008. He still walks the Khumbu every autumn to inspect lodges and trails personally.",
    image: images.team1,
  },
  {
    name: "Anisha Gurung",
    role: "Operations Manager",
    bio: "Anisha runs the engine room: permits, flights, crew rosters and the hundred details that make a trip feel effortless. Twelve years in adventure operations and a finisher of the Annapurna Circuit in every season.",
    image: images.team3,
  },
  {
    name: "Lakpa Dorje Sherpa",
    role: "Head Trekking Guide",
    bio: "IFMGA-aspirant and wilderness first responder with 200+ Himalayan departures led. Lakpa has summited Island Peak 41 times and is our lead trainer for new guides.",
    image: images.team2,
  },
  {
    name: "Kiran Shrestha",
    role: "Travel Consultant & Medical Advisor",
    bio: "A Kathmandu-based physician with a special interest in altitude medicine, Kiran reviews every high-altitude itinerary we sell and writes our health briefings.",
    image: images.team4,
  },
];
