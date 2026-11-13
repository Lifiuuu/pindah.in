import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "accent" | "success" | "warning" | "neutral" | "danger";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "brand", size = "sm", children, ...props }: BadgeProps) {
  const variants = {
    brand: "bg-brand-50 text-brand-700 border-brand-200",
    accent: "bg-amber-50 text-amber-700 border-amber-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-orange-50 text-orange-700 border-orange-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
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

