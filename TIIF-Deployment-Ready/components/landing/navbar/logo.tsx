"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <img
        src="/logo.png"
        alt="TIIF"
        className="h-11 w-11 rounded-2xl shadow-lg shadow-[#1F2D63]/30"
      />

      <div className="leading-tight">
        <h2 className="text-lg font-semibold tracking-tight">
          TIIF
        </h2>

        <p className="text-xs text-zinc-400">
          Human Development OS
        </p>
      </div>
    </Link>
  );
}