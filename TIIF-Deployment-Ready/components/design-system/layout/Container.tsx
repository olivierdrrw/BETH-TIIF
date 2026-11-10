"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// SIZE VARIANTS
// ---------------------------------------------------------------------------

export const containerSizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-none",
} as const;

// ---------------------------------------------------------------------------
// PADDING VARIANTS
// ---------------------------------------------------------------------------

export const containerPadding = {
  none: "",
  sm: "px-4",
  md: "px-4 sm:px-6",
  lg: "px-4 sm:px-6 lg:px-8",
} as const;

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export type ContainerSize = keyof typeof containerSizes;
export type ContainerPadding = keyof typeof containerPadding;

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement> {
  size?: ContainerSize;
  padding?: ContainerPadding;
  centered?: boolean;
  as?: React.ElementType;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      className,
      size = "lg",
      padding = "lg",
      centered = true,
      as: Component = "div",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full",
          containerSizes[size],
          containerPadding[padding],
          centered && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------

export default Container;