"use client";

import { navigation } from "./navigation";
import { NavItem } from "./NavItem";

export function DesktopNav() {
  return (
    <nav
      className="
        hidden
        lg:flex
        items-center
        gap-2
      "
    >
      {navigation.map((item) => (
        <NavItem
          key={item.title}
          href={item.href}
          title={item.title}
        />
      ))}
    </nav>
  );
}