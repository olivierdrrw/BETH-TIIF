"use client";

import {
  useSidebarStore,
} from "@/stores/sidebar-store";

export function SidebarToggle() {

  const {
    toggle,
  } = useSidebarStore();

  return (

    <button
      onClick={toggle}
      className="
      rounded-xl
      border
      p-2
      "
    >
      ☰
    </button>

  );
}