"use client";

import { Search } from "lucide-react";

export function SearchButton() {
  return (
    <button
      className="
        hidden
        lg:flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-navy-400/30
        hover:bg-white/10
      "
    >
      <Search className="h-5 w-5 text-zinc-300" />
    </button>
  );
}