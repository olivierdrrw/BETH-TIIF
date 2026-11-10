import { GraduationCap, Building2, Heart, Stethoscope, Mail } from "lucide-react";

const PARTNER_TYPES = [
  {
    icon: GraduationCap,
    title: "Schools & Universities",
    description: "Bring identity and wellbeing support to your students at scale, with aggregate (never individual) insight for counselors.",
  },
  {
    icon: Stethoscope,
    title: "Therapists & Clinics",
    description: "Give your clients a companion between sessions, with session notes and screener results they can bring in.",
  },
  {
    icon: Heart,
    title: "NGOs",
    description: "Extend trauma-informed support to communities you serve, with tools built for low-bandwidth, multilingual contexts.",
  },
  {
    icon: Building2,
    title: "Organizations",
    description: "Support employee wellbeing with a private, non-punitive tool that never reports individual data to employers.",
  },
];

export default function PartnershipsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Partnerships</h1>
        <p className="mt-1 text-slate-400">
          TIIF works with institutions who care about the people they serve.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PARTNER_TYPES.map((p) => (
          <div key={p.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <p.icon size={20} className="text-navy-300" />
            <h3 className="mt-3 font-medium text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{p.description}</p>
          </div>
        ))}
      </div>

      <a
        href="mailto:partnerships@tiif.app"
        className="flex items-center justify-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-400"
      >
        <Mail size={16} /> Get in touch about a partnership
      </a>
    </div>
  );
}
