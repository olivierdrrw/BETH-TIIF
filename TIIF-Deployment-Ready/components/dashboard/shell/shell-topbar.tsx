"use client";

import { Bell, Search } from "lucide-react";

export default function ShellTopbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-white/10
        bg-[#050816]/70
        px-8
        backdrop-blur-3xl
      "
    >
      <div>

        <h2 className="text-2xl font-semibold">
          Human Development Operating System™
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-xl bg-white/5 p-3">
          <Search size={18} />
        </button>

        <button className="rounded-xl bg-white/5 p-3">
          <Bell size={18} />
        </button>

      </div>

    </header>
  );
}