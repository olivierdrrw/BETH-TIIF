"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  icon: React.ElementType;
  title: string;
}

export function NavItem({
  href,
  icon: Icon,
  title,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  );
}