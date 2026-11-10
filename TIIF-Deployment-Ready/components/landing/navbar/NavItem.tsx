"use client";

import Link from "next/link";

interface Props {
  href: string;
  title: string;
}

export function NavItem({
  href,
  title,
}: Props) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        px-3
        py-2
        text-sm
        font-medium
        text-zinc-300
        transition-all
        duration-300
        hover:text-white
      "
    >
      {title}

      <span
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          rounded-full
          bg-navy-400
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </Link>
  );
}