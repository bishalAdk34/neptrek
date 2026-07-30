import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Permit Fees",
  description: "Current trekking permit and entry fees for Nepal's national parks and restricted areas.",
};

const tables: { title: string; note?: string; rows: [string, string][] }[] = [
  {
    title: "General Permits",
    rows: [
      ["TIMS Card (foreigners, via agency)", "NPR 2,000"],
      ["TIMS Card (SAARC nationals)", "NPR 1,000"],
    ],
  },
  {
    title: "National Park & Conservation Area Fees",
    rows: [
      ["Sagarmatha National Park (Everest)", "NPR 3,000"],
      ["Khumbu Pasang Lhamu Rural Municipality", "NPR 2,000"],
      ["Annapurna Conservation Area (ACAP)", "NPR 3,000"],
      ["Langtang National Park", "NPR 3,000"],
      ["Manaslu Conservation Area (MCAP)", "NPR 3,000"],
      ["Chitwan National Park (per day)", "NPR 2,000"],
    ],
  },
  {
    title: "Restricted Area Permits",
    note: "Minimum two trekkers plus registered guide required. Issued only through agencies.",
    rows: [
      ["Upper Mustang (first 10 days)", "US$ 500"],
      ["Upper Mustang (per extra day)", "US$ 50"],
      ["Manaslu (Sep–Nov, per week)", "US$ 100"],
      ["Manaslu (Dec–Aug, per week)", "US$ 75"],
      ["Upper Dolpo (first 10 days)", "US$ 500"],
    ],
  },
  {
    title: "NMA Climbing Permits (Group B peaks, e.g. Island Peak)",
    rows: [
      ["Spring (Mar–May)", "US$ 250"],
      ["Autumn (Sep–Nov)", "US$ 125"],
      ["Winter/Summer", "US$ 70"],
      ["Garbage deposit (refundable)", "US$ 500 per group"],
    ],
  },
];

export default function PermitFeesPage() {
  return (
    <>
      <PageHero
        title="Permit Fees"
        subtitle="Every permit listed in a trip's 'Includes' section is arranged and paid by us."
      />
      <section className="section-pad">
        <div className="container max-w-3xl space-y-8">
          {tables.map((t) => (
            <div key={t.title}>
              <h2 className="mb-3 text-xl font-bold">{t.title}</h2>
              {t.note && <p className="mb-3 text-sm text-slate-500">{t.note}</p>}
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {t.rows.map(([label, fee]) => (
                      <tr key={label}>
                        <td className="px-4 py-3 text-slate-700">{label}</td>
                        <td className="px-4 py-3 text-right font-semibold text-primary-800">{fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <p className="text-sm text-slate-500">
            Fees are set by the Government of Nepal and the NMA and may change without notice;
            figures above are indicative for planning. All applicable permits are included in our
            trip prices unless a trip page states otherwise.
          </p>
        </div>
      </section>
    </>
  );
}
