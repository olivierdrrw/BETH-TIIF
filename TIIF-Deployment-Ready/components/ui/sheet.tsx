"use client";

import * as React from "react";

export function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-80 bg-black/40 backdrop-blur-xl border-r border-white/10">
        {children}
      </div>
    </div>
  );
}