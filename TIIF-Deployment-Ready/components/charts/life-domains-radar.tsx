"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  domains: {
    mental: number;
    emotional: number;
    identity: number;
    relationships: number;
    education: number;
    career: number;
    purpose: number;
    physical: number;
  };
}

export function LifeDomainsRadar({
  domains,
}: Props) {

  const data = [
    {
      domain: "Mental",
      value: domains.mental,
    },

    {
      domain: "Emotional",
      value: domains.emotional,
    },

    {
      domain: "Identity",
      value: domains.identity,
    },

    {
      domain: "Relationships",
      value:
        domains.relationships,
    },

    {
      domain: "Education",
      value:
        domains.education,
    },

    {
      domain: "Career",
      value:
        domains.career,
    },

    {
      domain: "Purpose",
      value:
        domains.purpose,
    },

    {
      domain: "Physical",
      value:
        domains.physical,
    },
  ];

  return (
    <div className="h-[400px]">

      <ResponsiveContainer>

        <RadarChart
          data={data}
        >
          <PolarGrid />

          <PolarAngleAxis
            dataKey="domain"
          />

          <Radar
            dataKey="value"
          />

        </RadarChart>

      </ResponsiveContainer>

    </div>
  );
}