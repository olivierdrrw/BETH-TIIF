"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { navigation } from "./navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl lg:hidden"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#061321]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-lg font-semibold text-white">TIIF</span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 px-6">
              {navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3 px-6">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl bg-[#1F2D63] px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#1F2D63]/30"
              >
                Start Journey
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
