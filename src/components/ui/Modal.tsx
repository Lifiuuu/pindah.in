"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
}

export function Modal({ isOpen, onClose, title, description, children, maxWidth = "md" }: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          "w-full rounded-2xl bg-white p-5 shadow-2xl transition-all relative border border-slate-100 max-h-[90vh] overflow-y-auto",
          maxWidths[maxWidth]
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {title && <h3 className="text-lg font-bold text-slate-900 pr-8">{title}</h3>}
        {description && <p className="text-xs text-slate-500 mt-1 mb-4">{description}</p>}

        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

