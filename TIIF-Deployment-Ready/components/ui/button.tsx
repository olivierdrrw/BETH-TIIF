import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "ghost" | "outline" | "secondary" | "destructive";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-navy-500 text-white hover:bg-navy-400 shadow-lg shadow-navy-500/20",
  ghost: "bg-transparent text-current shadow-none hover:bg-white/10",
  outline: "border border-white/15 bg-transparent text-current shadow-none hover:bg-white/10",
  secondary: "bg-white/10 text-white shadow-none hover:bg-white/15",
  destructive: "bg-red-600 text-white shadow-none hover:bg-red-500",
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type}
      className={cn(
        "rounded-xl px-4 py-2 transition-all duration-300 active:scale-95",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
