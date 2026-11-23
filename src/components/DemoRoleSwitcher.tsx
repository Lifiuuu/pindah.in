"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, HardHat, BarChart3, Layers, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRoleSwitcher() {
  const pathname = usePathname();
  // Default closed (minimized) as requested
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPointerRef = useRef({ x: 0, y: 0 });
  const dragStartElementRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Determine current active role
  const currentRole = pathname.startsWith("/mitra")
    ? "mitra"
    : pathname.startsWith("/admin")
    ? "admin"
    : "pelanggan";

  const roles = [
    {
      id: "pelanggan",
      label: "Pelanggan",
      icon: User,
      href: "/",
      tooltip: "Mode Mahasiswa (Booking, QRIS & Lacak)",
    },
    {
      id: "mitra",
      label: "Mitra Driver",
      icon: HardHat,
      href: "/mitra",
      tooltip: "Mode Driver & Helper (Tugas & Dompet 80%)",
    },
    {
      id: "admin",
      label: "Admin",
      icon: BarChart3,
      href: "/admin",
      tooltip: "Mode Manajemen (Validasi BEP & Bisnis)",
    },
  ];

  // Initialize position on mount: restore from localStorage or default to bottom-right
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pindahin_demo_role_pos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          const x = Math.min(Math.max(10, parsed.x), window.innerWidth - 64);
          const y = Math.min(Math.max(10, parsed.y), window.innerHeight - 68);
          setPosition({ x, y });
          return;
        }
      }
    } catch {}

    // Default placement: bottom-right
    const initialX = Math.max(12, window.innerWidth - 68);
    const initialY = Math.max(12, window.innerHeight - 76);
    setPosition({ x: initialX, y: initialY });
  }, []);

  // Ensure widget stays within viewport when toggled (expanded/collapsed) or when window resizes
  useEffect(() => {
    const clampToViewport = () => {
      if (!containerRef.current || !position) return;
      const rect = containerRef.current.getBoundingClientRect();
      let newX = position.x;
      let newY = position.y;
      let adjusted = false;

      if (rect.right > window.innerWidth - 10) {
        newX = Math.max(10, window.innerWidth - rect.width - 10);
        adjusted = true;
      }
      if (rect.left < 10) {
        newX = 10;
        adjusted = true;
      }
      if (rect.bottom > window.innerHeight - 10) {
        newY = Math.max(10, window.innerHeight - rect.height - 10);
        adjusted = true;
      }
      if (rect.top < 10) {
        newY = 10;
        adjusted = true;
      }

      if (adjusted) {
        setPosition({ x: newX, y: newY });
        try {
          localStorage.setItem("pindahin_demo_role_pos", JSON.stringify({ x: newX, y: newY }));
        } catch {}
      }
    };

    clampToViewport();
    window.addEventListener("resize", clampToViewport);
    return () => window.removeEventListener("resize", clampToViewport);
  }, [isExpanded, position?.x, position?.y]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // If interacting directly with child links or action buttons, don't initiate drag
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button.action-btn")) {
      return;
    }

    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartPointerRef.current = { x: e.clientX, y: e.clientY };

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      dragStartElementRef.current = { x: rect.left, y: rect.top };
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;

    const dx = e.clientX - dragStartPointerRef.current.x;
    const dy = e.clientY - dragStartPointerRef.current.y;

    if (Math.hypot(dx, dy) > 4) {
      hasDraggedRef.current = true;
    }

    if (hasDraggedRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const maxX = Math.max(10, window.innerWidth - rect.width - 10);
      const maxY = Math.max(10, window.innerHeight - rect.height - 10);

      const nextX = Math.min(Math.max(10, dragStartElementRef.current.x + dx), maxX);
      const nextY = Math.min(Math.max(10, dragStartElementRef.current.y + dy), maxY);

      setPosition({ x: nextX, y: nextY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    if (hasDraggedRef.current && position) {
      try {
        localStorage.setItem("pindahin_demo_role_pos", JSON.stringify(position));
      } catch {}
    }
  };

  const stylePosition = position
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: "none" as const,
      }
    : {
        touchAction: "none" as const,
      };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={stylePosition}
      className={cn(
        "fixed z-50 select-none font-sans print:hidden",
        position ? "" : "bottom-4 md:bottom-6 right-3 sm:right-6",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
    >
      {isExpanded ? (
        <div className="flex items-center gap-1.5 bg-surface-900/95 text-white backdrop-blur-md border border-surface-700/80 shadow-2xl rounded-2xl p-1.5 ring-1 ring-black/20 animate-in fade-in zoom-in-95 duration-150">
          {/* Drag Handle & Indicator */}
          <div
            title="Tahan & geser untuk memindahkan posisi"
            className="flex items-center gap-1 pl-1.5 pr-1 text-[11px] font-bold text-surface-400 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-3.5 w-3.5 text-surface-500" />
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-[10px] text-surface-300">Role:</span>
          </div>

          {/* Role Pills */}
          <div className="flex items-center gap-1 bg-surface-800/80 p-0.5 rounded-xl border border-surface-700">
            {roles.map((role) => {
              const isActive = currentRole === role.id;
              const Icon = role.icon;

              return (
                <Link
                  key={role.id}
                  href={role.href}
                  title={role.tooltip}
                  onClick={(e) => {
                    if (hasDraggedRef.current) {
                      e.preventDefault();
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    isActive
                      ? "bg-brand-600 text-white shadow-sm ring-1 ring-white/20"
                      : "text-surface-300 hover:text-white hover:bg-surface-700/60"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{role.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Minimize Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!hasDraggedRef.current) {
                setIsExpanded(false);
              }
            }}
            title="Tutup demo role switcher"
            className="action-btn h-7 w-7 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 flex items-center justify-center transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        /* Collapsed Icon Trigger (Default) */
        <button
          type="button"
          onClick={() => {
            if (!hasDraggedRef.current) {
              setIsExpanded(true);
            }
          }}
          title="Buka Demo Role Switcher (Dapat digeser kemanapun)"
          className="h-12 w-12 rounded-2xl bg-surface-900/95 text-accent-300 border border-surface-700/90 shadow-2xl flex items-center justify-center hover:bg-surface-800 hover:scale-105 active:scale-95 transition-transform group backdrop-blur-md"
        >
          <Layers className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-surface-900 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
          </span>
        </button>
      )}
    </div>
  );
}
