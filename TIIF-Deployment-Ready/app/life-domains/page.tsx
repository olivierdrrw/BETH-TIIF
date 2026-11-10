import {
  LifeDomainsForm,
} from "@/features/life-domains/components/life-domains-form";

export default function LifeDomainsPage() {
  return (
    <div
      className="
      mx-auto
      max-w-4xl
      py-12
    "
    >
      <h1
        className="
        mb-8
        text-4xl
        font-bold
        "
      >
        Life Domains Assessment
      </h1>

      <LifeDomainsForm />
    </div>
  );
}