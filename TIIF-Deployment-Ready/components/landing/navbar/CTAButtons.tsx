"use client";

import Link from "next/link";

export function CTAButtons() {
  return (
    <div
      className="
        hidden
        lg:flex
        items-center
        gap-3
      "
    >
      <Link
        href="/login"
        className="
          rounded-xl
          px-5
          py-2.5
          text-sm
          font-medium
          text-zinc-300
          transition-all
          duration-300
          hover:text-white
        "
      >
        Login
      </Link>

      <Link
        href="/register"
        className="
          rounded-2xl
          bg-[#1F2D63]
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-[#1F2D63]/30
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[#1F2D63]/50
        "
      >
        Start Journey
      </Link>
    </div>
  );
}