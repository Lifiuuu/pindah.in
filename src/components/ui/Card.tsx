import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-7 shadow-subtle transition-all hover:shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
