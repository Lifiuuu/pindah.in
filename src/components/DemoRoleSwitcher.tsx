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

  // Expand logic: ensures expanded bar stays completely within viewport
  const expandSwitcher = () => {
    if (position && typeof window !== "undefined") {
      const estimatedExpandedWidth = 330;
      const maxX = Math.max(10, window.innerWidth - estimatedExpandedWidth - 12);
      let nextX = position.x;
      let nextY = position.y;
      let adjusted = false;

      if (position.x > maxX) {
        nextX = maxX;
        adjusted = true;
      }
      const maxY = Math.max(10, window.innerHeight - 56 - 12);
      if (position.y > maxY) {
        nextY = maxY;
        adjusted = true;
      }

      if (adjusted) {
        const adjustedPos = { x: nextX, y: nextY };
        setPosition(adjustedPos);
        try {
          localStorage.setItem("pindahin_demo_role_pos", JSON.stringify(adjustedPos));
        } catch {}
      }
    }
    setIsExpanded(true);
  };

  const collapseSwitcher = () => {
    setIsExpanded(false);
  };

  // Close on outside click when expanded
  useEffect(() => {
    if (!isExpanded) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", handleOutsideClick);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isExpanded]);

  // Keep within bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !position) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxX = Math.max(10, window.innerWidth - rect.width - 10);
      const maxY = Math.max(10, window.innerHeight - rect.height - 10);

      const clampedX = Math.min(Math.max(10, position.x), maxX);
      const clampedY = Math.min(Math.max(10, position.y), maxY);

      if (clampedX !== position.x || clampedY !== position.y) {
        const nextPos = { x: clampedX, y: clampedY };
        setPosition(nextPos);
        try {
          localStorage.setItem("pindahin_demo_role_pos", JSON.stringify(nextPos));
        } catch {}
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

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

    // Use 8px threshold to avoid false positives on taps/clicks
    if (Math.hypot(dx, dy) > 8) {
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

    if (hasDraggedRef.current) {
      // It was dragged
      if (position) {
        try {
          localStorage.setItem("pindahin_demo_role_pos", JSON.stringify(position));
        } catch {}
      }
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
    } else {
      // It was a tap/click!
      if (!isExpanded) {
        expandSwitcher();
      }
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
      onClick={(e) => {
        if (!isExpanded && !hasDraggedRef.current) {
          e.stopPropagation();
          expandSwitcher();
        }
      }}
      style={stylePosition}
      className={cn(
        "fixed z-50 select-none font-sans print:hidden",
        position ? "" : "bottom-4 md:bottom-6 right-3 sm:right-6",
        isDragging ? "cursor-grabbing" : isExpanded ? "cursor-grab" : "cursor-pointer"
      )}
    >
      {isExpanded ? (
        <div className="flex items-center gap-1.5 bg-surface-900/95 text-white backdrop-blur-md border border-surface-700/80 shadow-2xl rounded-2xl p-1.5 ring-1 ring-black/20 transition-all">
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
              collapseSwitcher();
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
          onClick={(e) => {
            e.stopPropagation();
            expandSwitcher();
          }}
          title="Buka Demo Role Switcher (Klik untuk buka, tahan & geser untuk pindah)"
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
