import type { Metadata } from "next";
import { FileCheck2 } from "lucide-react";
import { site } from "@/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Legal Documents",
  description: "Government registrations and licenses held by Himalayan Horizons Treks & Expedition.",
};

const documents = [
  { title: "Company Registration", body: `Registered with the Office of the Company Registrar, Government of Nepal. ${site.licenseNo}.` },
  { title: "Tourism Industry License", body: "Licensed by the Department of Tourism, Ministry of Culture, Tourism & Civil Aviation to operate trekking and tour services." },
  { title: "VAT / PAN Registration", body: "Registered with the Inland Revenue Department of Nepal for tax purposes (PAN No. 301-XXX-482, demo)." },
  { title: "TAAN Membership", body: "Active member of the Trekking Agencies' Association of Nepal — membership renewed annually." },
  { title: "NMA Membership", body: "Member of the Nepal Mountaineering Association for trekking-peak climbing permits and standards." },
  { title: "Guide Certifications", body: "All lead guides hold Ministry-issued trekking guide licenses and wilderness first-aid certification; climbing Sherpas hold NMA qualifications." },
];

export default function LegalDocumentsPage() {
  return (
    <>
      <PageHero
        title="Legal Documents"
        subtitle="Full government licensing — copies of any document below available on request."
      />
      <section className="section-pad">
        <div className="container grid max-w-4xl gap-4">
          {documents.map((doc) => (
            <div key={doc.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <FileCheck2 size={24} className="mt-0.5 shrink-0 text-forest-600" />
              <div>
                <h2 className="font-heading font-bold text-primary-900">{doc.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{doc.body}</p>
              </div>
            </div>
          ))}
          <p className="mt-4 text-sm text-slate-500">
            Note: this is a fictional demonstration website; document numbers shown are
            placeholders. To verify a real Nepali trekking agency, consult the Department of
            Tourism and TAAN member directories.
          </p>
        </div>
      </section>
    </>
  );
}
