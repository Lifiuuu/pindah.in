import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "accent" | "success" | "warning" | "neutral" | "danger";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "brand", size = "sm", children, ...props }: BadgeProps) {
  const variants = {
    brand: "bg-brand-50 text-brand-800 border-brand-200",
    accent: "bg-accent-100 text-accent-900 border-accent-300",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    neutral: "bg-surface-100 text-surface-700 border-surface-200",
    danger: "bg-rose-50 text-rose-800 border-rose-200",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-1 font-semibold",
    md: "text-xs px-3 py-1.5 font-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full border tracking-wide",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
