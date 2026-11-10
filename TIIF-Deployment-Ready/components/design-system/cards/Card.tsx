"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// CARD VARIANTS
// ---------------------------------------------------------------------------

const cardVariants = cva(
  "rounded-xl border transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-background border-slate-200 dark:border-slate-800",

        glass:
          "bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border-white/20 dark:border-white/10",

        glassIntense:
          "bg-white/10 dark:bg-slate-900/20 backdrop-blur-2xl border-white/20 dark:border-white/10",

        outline:
          "bg-transparent border-slate-200 dark:border-slate-800",

        soft:
          "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800",
      },

      padding: {
        none: "",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
      },

      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-xl",
      },

      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },

    defaultVariants: {
      variant: "glass",
      padding: "md",
      shadow: "sm",
      interactive: false,
    },
  }
);

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  onClick?: () => void;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      shadow,
      interactive,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || !!onClick;

    return (
      <motion.div
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        className={cn(
          cardVariants({ variant, padding, shadow, interactive }),
          className
        )}
        whileHover={
          isInteractive
            ? {
                y: -4,
                scale: 1.01,
              }
            : undefined
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
        onClick={onClick}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (!isInteractive) return;

          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// ---------------------------------------------------------------------------
// CARD PARTS
// ---------------------------------------------------------------------------

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-5 flex flex-col gap-2", className)} {...props} />
);

CardHeader.displayName = "CardHeader";

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100",
      className
    )}
    {...props}
  />
);

CardTitle.displayName = "CardTitle";

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(
      "text-sm text-slate-500 dark:text-slate-400 leading-6 text-pretty",
      className
    )}
    {...props}
  />
);

CardDescription.displayName = "CardDescription";

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm leading-6 text-pretty", className)} {...props} />
);

CardContent.displayName = "CardContent";

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-5 flex items-center justify-between", className)}
    {...props}
  />
);

CardFooter.displayName = "CardFooter";

export { cardVariants };