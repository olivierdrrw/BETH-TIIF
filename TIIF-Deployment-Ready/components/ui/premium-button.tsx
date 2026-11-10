"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PremiumButtonVariant = "primary" | "secondary" | "success";

interface Props {
  href?: string;
  children: React.ReactNode;
  className?: string;
  secondary?: boolean;
  variant?: PremiumButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function PremiumButton({
  href,
  children,
  className,
  secondary = false,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: Props) {
  const selectedVariant = secondary ? "secondary" : variant;
  const classes = cn(
    "group inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-medium transition-all duration-300",
    selectedVariant === "secondary" && "border border-navy-500/20 bg-white/60 text-slate-900 backdrop-blur-xl hover:bg-white dark:bg-white/5 dark:text-white",
    selectedVariant === "success" && "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500",
    selectedVariant === "primary" && "bg-navy-700 text-white shadow-lg shadow-navy-600/20 hover:bg-navy-600",
    disabled && "cursor-not-allowed opacity-50",
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </>
  );

  return (
    <motion.div whileHover={disabled ? undefined : { y: -3, scale: 1.02 }} whileTap={disabled ? undefined : { scale: 0.98 }}>
      {href ? (
        <Link href={href} className={classes} aria-disabled={disabled} tabIndex={disabled ? -1 : undefined}>
          {content}
        </Link>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
