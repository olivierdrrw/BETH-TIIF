"use client";

import { motion } from "framer-motion";

import { Logo } from "./logo";
import { DesktopNav } from "./DesktopNav";
import { CTAButtons } from "./CTAButtons";
import { MobileNav } from "./MobileNav";
import { SearchButton } from "./SearchButton";

export function Navbar() {
  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: .8,
      }}
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      flex
      justify-center
      px-6
      pt-6
      "
    >
      <div
        className="
        w-full
        max-w-7xl

        rounded-[28px]

        border

        border-white/10

        bg-white/[0.05]

        backdrop-blur-3xl

        shadow-[0_10px_60px_rgba(0,0,0,.35)]

        transition-all

        duration-500
        "
      >
        <div
          className="
          flex

          h-20

          items-center

          justify-between

          px-8
          "
        >
          <Logo />

          <DesktopNav />

          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            <SearchButton />

            <CTAButtons />

            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  );
}