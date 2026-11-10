"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface Props {
  label?: string;
}

export function DashboardAction({
  label = "Open",
}: Props) {
  return (
    <Button
      variant="ghost"
      className="
      rounded-full
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      hover:border-[#3E63B0]/40
      hover:bg-[#3E63B0]/10
      transition-all
    "
    >
      {label}

      <ArrowUpRight
        className="ml-2 h-4 w-4"
      />
    </Button>
  );
}