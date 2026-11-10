import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DashboardBadge({
  children,
}: Props) {
  return (
    <span
      className="
      inline-flex
      items-center
      gap-2

      rounded-full

      border
      border-[#3E63B0]/20

      bg-[#3E63B0]/10

      px-4
      py-2

      text-xs
      font-medium

      uppercase
      tracking-[0.25em]

      text-[#85A3DE]
    "
    >
      <span
        className="
        h-2
        w-2
        rounded-full
        bg-[#5D85D1]
        animate-pulse
      "
      />

      {children}
    </span>
  );
}