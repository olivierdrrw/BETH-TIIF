import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl",
        "bg-navy-500 text-white",
        "hover:bg-navy-400",
        "transition-all duration-300",
        "active:scale-95",
        "shadow-lg shadow-navy-500/20",
        className
      )}
      {...props}
    />
  );
}