"use client";

import { useEffect } from "react";
import { CommandPalette } from "./command-palette";
import { useCommandPaletteStore } from "@/stores/command-palette-store";

export function CommandProvider() {
  const { open, setOpen, toggle } = useCommandPaletteStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return <CommandPalette open={open} setOpen={setOpen} />;
}
