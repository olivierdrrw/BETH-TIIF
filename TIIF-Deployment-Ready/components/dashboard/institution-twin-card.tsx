"use client";

import { useInstitutionStore }
from "@/stores/institution-store";

export function InstitutionTwinCard() {
  const { institution } =
    useInstitutionStore();

  return (
    <div className="rounded-3xl border border-white/10 p-6">
      <h3 className="text-lg font-semibold">
        Institution Twin
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p>Wellness</p>
          <strong>
            {institution.wellnessIndex}%
          </strong>
        </div>

        <div>
          <p>Growth</p>
          <strong>
            {institution.growthIndex}%
          </strong>
        </div>

        <div>
          <p>Impact</p>
          <strong>
            {institution.impactIndex}%
          </strong>
        </div>

        <div>
          <p>Risk</p>
          <strong>
            {institution.riskIndex}%
          </strong>
        </div>
      </div>
    </div>
  );
}