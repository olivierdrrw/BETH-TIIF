"use client";

interface Props {
  title: string;
  subtitle: string;
}

export default function ChartHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div>

      <p className="text-xs uppercase tracking-[0.35em] text-navy-400">
        {subtitle}
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {title}
      </h2>

    </div>
  );
}