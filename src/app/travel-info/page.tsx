import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Travel Info",
  description: "Visas, insurance, money, connectivity and health information for travelling in Nepal.",
};

const sections = [
  {
    title: "Nepal Visa",
    content:
      "Most nationalities obtain a visa on arrival at Kathmandu's Tribhuvan Airport: US$30 for 15 days, US$50 for 30 days, US$125 for 90 days (cash, major currencies accepted). Bring one passport photo and ensure your passport has 6 months' validity. You can also apply online in advance at the Department of Immigration website to skip the form queue.",
  },
  {
    title: "Travel Insurance",
    content:
      "Insurance is mandatory on all our treks and climbs. Your policy must explicitly cover trekking to your itinerary's maximum altitude and helicopter evacuation. We check policy details at your pre-trip briefing — travellers without adequate cover cannot join high-altitude departures.",
  },
  {
    title: "Money & Payments",
    content:
      "Nepal's currency is the rupee (NPR). ATMs are plentiful in Kathmandu and Pokhara (typical limit NPR 35,000 per withdrawal); on trek, carry cash. Budget US$15–25 per day on trek for drinks, hot showers, Wi-Fi and charging. We accept trip payments by bank transfer, card (3.5% surcharge) or cash.",
  },
  {
    title: "Connectivity",
    content:
      "Buy an NTC or Ncell SIM at the airport (bring a passport photo). Coverage reaches surprisingly high — Everest region has 4G in most villages plus paid Wi-Fi (Everest Link). Expect dead zones in Manaslu's upper gorge and parts of Upper Mustang.",
  },
  {
    title: "Health & Vaccinations",
    content:
      "No vaccinations are mandatory for entry, but hepatitis A, typhoid and routine boosters are commonly recommended — consult a travel clinic 6–8 weeks before departure. Drink only purified water. For altitude guidance, see our blog article on AMS prevention, and always disclose medical conditions at booking.",
  },
  {
    title: "What to Pack",
    content:
      "A full gear list is sent with your booking confirmation and checked at the Kathmandu briefing. Almost everything can be bought or rented in Thamel — quality down jackets and sleeping bags rent for about US$1–2 per day. Porter weight limit: 15 kg per trekker in a provided duffel.",
  },
  {
    title: "Best Seasons",
    content:
      "October–November and March–May are the classic trekking windows. Winter suits lower treks (Everest View, Langtang); monsoon suits the rain-shadow regions (Upper Mustang) and Tibet. See our blog for a full season-by-season guide.",
  },
];

export default function TravelInfoPage() {
  return (
    <>
      <PageHero
        title="Travel Information"
        subtitle="The practical essentials — visas, money, insurance and staying connected."
      />
      <section className="section-pad">
        <div className="container max-w-3xl">
          <Accordion items={sections} />
        </div>
      </section>
    </>
  );
}
