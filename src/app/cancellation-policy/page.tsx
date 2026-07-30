import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Booking, payment and cancellation terms for Himalayan Horizons trips.",
};

const tiers = [
  { period: "60+ days before departure", fee: "Full refund minus US$100 administration fee" },
  { period: "30–59 days before departure", fee: "80% refund of trip cost" },
  { period: "15–29 days before departure", fee: "50% refund of trip cost" },
  { period: "7–14 days before departure", fee: "25% refund of trip cost" },
  { period: "Less than 7 days / no-show", fee: "No refund" },
];

export default function CancellationPolicyPage() {
  return (
    <>
      <PageHero
        title="Cancellation Policy"
        subtitle="Fair, transparent terms — and free date changes up to 30 days out."
      />
      <section className="section-pad">
        <div className="container max-w-3xl space-y-8">
          <div>
            <h2 className="mb-3 text-xl font-bold">Booking &amp; Payment</h2>
            <p className="leading-relaxed text-slate-600">
              A 20% deposit confirms your booking; the balance is due 30 days before departure (or
              on arrival in Kathmandu by prior arrangement). Restricted-area trips (Upper Mustang,
              Manaslu) and Bhutan tours require a 30% deposit to cover non-refundable permit costs.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">If You Cancel</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-900">
                  <tr>
                    <th className="px-4 py-3">Notice Given</th>
                    <th className="px-4 py-3">Refund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tiers.map((t) => (
                    <tr key={t.period}>
                      <td className="px-4 py-3 font-medium text-slate-700">{t.period}</td>
                      <td className="px-4 py-3 text-slate-600">{t.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Non-recoverable third-party costs (issued permits, internal flight tickets, Bhutan
              SDF) are deducted from any refund tier above.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">Free Date Changes</h2>
            <p className="leading-relaxed text-slate-600">
              Up to 30 days before departure you may move your booking to any other date or any
              trip of equal value, free of charge, once. Within 30 days, changes are treated as a
              cancellation and rebooking.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">If We Cancel</h2>
            <p className="leading-relaxed text-slate-600">
              If we cancel a guaranteed departure for any reason other than force majeure, you
              receive a full refund or free transfer — your choice. In cases of force majeure
              (natural disaster, government restriction, pandemic), payments are held as credit
              valid for 3 years.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">Unused Services</h2>
            <p className="leading-relaxed text-slate-600">
              No refunds are payable for services unused after departure — for example leaving a
              trek early, missed meals or unused hotel nights — as crew and lodging are committed
              in advance. Travel insurance with trip-interruption cover is strongly recommended.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
