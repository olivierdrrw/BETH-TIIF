import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Tone types
// ---------------------------------------------------------------------------

type TypographyTone =
  | "default"
  | "muted"
  | "subtle"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "inherit";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const toneVariants: Record<TypographyTone, string> = {
  default: "text-slate-900 dark:text-slate-100",
  muted: "text-slate-600 dark:text-slate-400",
  subtle: "text-slate-500 dark:text-slate-500",
  accent: "text-navy-500 dark:text-navy-400",
  success: "text-success-600 dark:text-success-400",
  warning: "text-navy-500 dark:text-navy-400",
  danger: "text-red-500 dark:text-red-400",
  inherit: "text-inherit",
};

const alignVariants = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} as const;

// ---------------------------------------------------------------------------
// Shared Base Props (IMPORTANT FIX)
// ---------------------------------------------------------------------------

type ElementType = React.ElementType;

type BaseProps<T extends ElementType> = {
  as?: T;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  tone?: TypographyTone;
  align?: keyof typeof alignVariants;
  truncate?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

// helper: safe component resolver (FIX FOR SVG ERROR)
function resolveComponent<T extends ElementType>(asChild: boolean, as: T | undefined, fallback: T) {
  if (asChild) return Slot;
  return as ?? fallback;
}

// ---------------------------------------------------------------------------
// DISPLAY
// ---------------------------------------------------------------------------

const displayVariants = cva(
  "font-heading font-semibold tracking-tight text-balance transition-colors duration-150",
  {
    variants: {
      tone: toneVariants,
      align: alignVariants,
      hero: {
        true: "tracking-[-0.04em]",
        false: "",
      },
      gradient: {
        true:
          "bg-gradient-to-r from-navy-400 to-navy-400 bg-clip-text text-transparent",
        false: "",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      align: "left",
      hero: false,
      gradient: false,
      truncate: false,
    },
  }
);

type DisplayProps = BaseProps<"h1"> & VariantProps<typeof displayVariants>;

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ as, asChild = false, className, tone, align, truncate, ...props }, ref) => {
    const Comp = resolveComponent(asChild, as, "h1");

    return (
      <Comp
        ref={ref as any}
        data-slot="display"
        className={cn(displayVariants({ tone, align, truncate }), className)}
        {...props}
      />
    );
  }
);

Display.displayName = "Display";

// ---------------------------------------------------------------------------
// HEADING
// ---------------------------------------------------------------------------

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingTags: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const headingVariants = cva(
  "font-heading font-semibold tracking-tight text-balance transition-colors duration-150",
  {
    variants: {
      tone: toneVariants,
      align: alignVariants,
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      align: "left",
      truncate: false,
    },
  }
);

type HeadingProps = BaseProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    level?: HeadingLevel;
  };

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild = false, as, className, tone, align, truncate, level = 2, ...props }, ref) => {
    const Comp = asChild ? Slot : headingTags[level];

    return (
      <Comp
        ref={ref as any}
        data-slot="heading"
        data-level={level}
        className={cn(headingVariants({ tone, align, truncate }), className)}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

// ---------------------------------------------------------------------------
// SUBHEADING
// ---------------------------------------------------------------------------

const subheadingVariants = cva(
  "font-heading font-medium tracking-tight transition-colors duration-150",
  {
    variants: {
      tone: toneVariants,
      align: alignVariants,
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      tone: "muted",
      align: "left",
      truncate: false,
    },
  }
);

type SubheadingProps = BaseProps<"p"> &
  VariantProps<typeof subheadingVariants>;

export const Subheading = React.forwardRef<HTMLParagraphElement, SubheadingProps>(
  ({ as, asChild = false, className, tone, align, truncate, ...props }, ref) => {
    const Comp = resolveComponent(asChild, as, "p");

    return (
      <Comp
        ref={ref as any}
        data-slot="subheading"
        className={cn(subheadingVariants({ tone, align, truncate }), className)}
        {...props}
      />
    );
  }
);

Subheading.displayName = "Subheading";

// ---------------------------------------------------------------------------
// BODY
// ---------------------------------------------------------------------------

const bodyVariants = cva(
  "font-sans leading-relaxed text-pretty transition-colors duration-150",
  {
    variants: {
      tone: toneVariants,
      align: alignVariants,
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      align: "left",
      size: "default",
      truncate: false,
    },
  }
);

type BodyProps = BaseProps<"p"> & VariantProps<typeof bodyVariants>;

export const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ as, asChild = false, className, tone, align, size, truncate, ...props }, ref) => {
    const Comp = resolveComponent(asChild, as, "p");

    return (
      <Comp
        ref={ref as any}
        data-slot="body"
        className={cn(bodyVariants({ tone, align, size, truncate }), className)}
        {...props}
      />
    );
  }
);

Body.displayName = "Body";

// ---------------------------------------------------------------------------
// CAPTION
// ---------------------------------------------------------------------------

const captionVariants = cva(
  "font-sans leading-normal transition-colors duration-150",
  {
    variants: {
      tone: toneVariants,
      align: alignVariants,
      size: {
        sm: "text-xs",
        default: "text-sm",
      },
      uppercase: {
        true: "uppercase tracking-wider",
        false: "",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      tone: "subtle",
      align: "left",
      size: "default",
      uppercase: false,
      truncate: false,
    },
  }
);

type CaptionProps = BaseProps<"span"> &
  VariantProps<typeof captionVariants>;

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ as, asChild = false, className, tone, align, size, uppercase, truncate, ...props }, ref) => {
    const Comp = resolveComponent(asChild, as, "span");

    return (
      <Comp
        ref={ref as any}
        data-slot="caption"
        className={cn(
          captionVariants({ tone, align, size, uppercase, truncate }),
          className
        )}
        {...props}
      />
    );
  }
);

Caption.displayName = "Caption";