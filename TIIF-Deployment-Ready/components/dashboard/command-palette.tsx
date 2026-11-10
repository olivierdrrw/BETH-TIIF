"use client";

import * as React from "react";
import { Command } from "cmdk";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);

    return () =>
      document.removeEventListener(
        "keydown",
        down
      );
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="mx-auto mt-32 max-w-xl overflow-hidden rounded-2xl border bg-background shadow-2xl">
        <Command>
          <Command.Input
            placeholder="Search anything..."
            className="w-full border-b p-4 outline-none"
          />

          <Command.List className="max-h-[400px] overflow-auto p-2">
            <Command.Item className="rounded-lg p-3 cursor-pointer">
              Dashboard Overview
            </Command.Item>

            <Command.Item className="rounded-lg p-3 cursor-pointer">
              Analytics
            </Command.Item>

            <Command.Item className="rounded-lg p-3 cursor-pointer">
              AI Insights
            </Command.Item>

            <Command.Item className="rounded-lg p-3 cursor-pointer">
              Reports
            </Command.Item>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}