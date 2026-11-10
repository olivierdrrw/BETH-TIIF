"use client";

import { Search } from "lucide-react";

export function GlobalSearch() {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <input
        placeholder="Search users, therapists, reports..."
        className="h-10 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}