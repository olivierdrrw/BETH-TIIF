"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// BUTTON VARIANTS
// ---------------------------------------------------------------------------

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",

        secondary:
          "bg-navy-500 text-white hover:bg-navy-600",

        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",

        danger:
          "bg-red-500 text-white hover:bg-red-600",
      },

      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },

      fullWidth: {
        true: "w-full",
        false: "",
      },

      iconOnly: {
        true: "aspect-square p-0",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      iconOnly: false,
    },
  }
);

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      iconOnly,
      loading = false,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : motion.button;

    return (
      <Comp
        ref={ref}
        disabled={asChild ? undefined : disabled || loading}
        className={cn(
          buttonVariants({ variant, size, fullWidth, iconOnly }),
          className
        )}
        whileHover={
          asChild
            ? undefined
            : {
                scale: 1.02,
              }
        }
        whileTap={
          asChild
            ? undefined
            : {
                scale: 0.98,
              }
        }
        {...props}
      >
        {loading ? "Loading..." : children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };