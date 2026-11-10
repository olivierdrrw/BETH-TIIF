import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  children,
  size = "xl",
  className,
  ...props
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 py-8", sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
}
