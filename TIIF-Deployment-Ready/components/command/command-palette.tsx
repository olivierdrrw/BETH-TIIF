"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { commandItems } from "./command-items";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter();

  function go(href: string) {
    router.push(href);
    setOpen(false);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search TIIF"
      className="fixed left-1/2 top-24 z-[100] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4">
        <Search size={16} className="text-slate-500" />
        <Command.Input
          placeholder="Search pages, goals, journal..."
          className="w-full bg-transparent py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none"
        />
      </div>

      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="px-4 py-6 text-center text-sm text-slate-500">
          No results found.
        </Command.Empty>

        {commandItems.map((item) => (
          <Command.Item
            key={item.href}
            onSelect={() => go(item.href)}
            className="cursor-pointer rounded-xl px-4 py-3 text-sm text-slate-300 data-[selected=true]:bg-navy-500/10 data-[selected=true]:text-white"
          >
            {item.title}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
