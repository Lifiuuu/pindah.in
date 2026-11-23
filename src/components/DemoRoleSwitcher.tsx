"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, HardHat, BarChart3, Layers, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRoleSwitcher() {
  const pathname = usePathname();
  // Default closed (minimized)
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // Snapped side: "left" or "right" (cannot stay in the middle)
  const [side, setSide] = useState<"left" | "right">("right");
  // Vertical position Y
  const [y, setY] = useState<number | null>(null);
  // Transient drag position while actively dragging
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const dragStartPointerRef = useRef({ x: 0, y: 0 });
  const dragStartElementRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const lastClickTimeRef = useRef(0);
  const clickCountRef = useRef(0);

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
    const defaultY = Math.max(12, window.innerHeight - 76);
    try {
      const saved = localStorage.getItem("pindahin_demo_role_pos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.side === "left" || parsed.side === "right") {
          setSide(parsed.side);
          if (typeof parsed.y === "number") {
            const clampedY = Math.min(Math.max(12, parsed.y), window.innerHeight - 68);
            setY(clampedY);
            return;
          }
        } else if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          const isLeft = parsed.x < window.innerWidth / 2;
          setSide(isLeft ? "left" : "right");
          const clampedY = Math.min(Math.max(12, parsed.y), window.innerHeight - 68);
          setY(clampedY);
          return;
        }
      }
    } catch {}

    setSide("right");
    setY(defaultY);
  }, []);

  // Global safety net: cancel any orphaned drag on window pointerup/pointercancel
  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        setIsDragging(false);
        setDragPos(null);
      }
    };

    window.addEventListener("pointerup", handleGlobalRelease);
    window.addEventListener("pointercancel", handleGlobalRelease);
    return () => {
      window.removeEventListener("pointerup", handleGlobalRelease);
      window.removeEventListener("pointercancel", handleGlobalRelease);
    };
  }, []);

  // Expand logic: ensure it fits vertically within viewport
  const expandSwitcher = () => {
    if (typeof window !== "undefined" && y !== null) {
      const maxY = Math.max(12, window.innerHeight - 68);
      if (y > maxY) {
        setY(maxY);
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
      if (typeof window === "undefined" || y === null) return;
      const elementHeight = containerRef.current?.getBoundingClientRect().height || 48;
      const maxY = Math.max(12, window.innerHeight - elementHeight - 12);
      if (y > maxY) {
        setY(maxY);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [y]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // If interacting directly with child links or action buttons, don't initiate drag
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button.action-btn")) {
      return;
    }

    // Only allow primary pointer button (left click on mouse)
    if (e.button !== 0) return;

    const isMouse = e.pointerType === "mouse";
    const now = Date.now();

    // Track click count for double-click detection (within 350ms)
    if (now - lastClickTimeRef.current < 350) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    dragStartPointerRef.current = { x: e.clientX, y: e.clientY };

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      dragStartElementRef.current = { x: rect.left, y: rect.top };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Safety check 1: MUST be pressed down
    if (!isPointerDownRef.current) return;

    const isMouse = e.pointerType === "mouse";

    // Safety check 2: For mouse, left button MUST be physically pressed (buttons === 1)
    if (isMouse && e.buttons !== 1) {
      isPointerDownRef.current = false;
      setIsDragging(false);
      setDragPos(null);
      return;
    }

    // Safety check 3: On desktop, dragging requires double-click
    // Single click on desktop NEVER drags and NEVER sticks to cursor!
    if (isMouse && clickCountRef.current < 2) {
      return;
    }

    const dx = e.clientX - dragStartPointerRef.current.x;
    const dy = e.clientY - dragStartPointerRef.current.y;

    // Use 8px threshold to differentiate between tap and drag
    if (!hasDraggedRef.current) {
      if (Math.hypot(dx, dy) > 8) {
        hasDraggedRef.current = true;
        setIsDragging(true);
        try {
          (containerRef.current as HTMLElement)?.setPointerCapture(e.pointerId);
        } catch {}
      } else {
        return;
      }
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = Math.max(10, window.innerWidth - rect.width - 10);
    const maxY = Math.max(10, window.innerHeight - rect.height - 10);

    const nextX = Math.min(Math.max(10, dragStartElementRef.current.x + dx), maxX);
    const nextY = Math.min(Math.max(10, dragStartElementRef.current.y + dy), maxY);

    setDragPos({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const isMouse = e.pointerType === "mouse";

    if (hasDraggedRef.current) {
      setIsDragging(false);

      // Snap magnetically to the nearest edge (left or right)
      if (dragPos && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementCenterX = dragPos.x + rect.width / 2;
        const isLeft = elementCenterX < window.innerWidth / 2;
        const newSide: "left" | "right" = isLeft ? "left" : "right";

        const elementHeight = rect.height || 48;
        const maxY = Math.max(12, window.innerHeight - elementHeight - 12);
        const newY = Math.min(Math.max(12, dragPos.y), maxY);

        setSide(newSide);
        setY(newY);
        setDragPos(null);

        try {
          localStorage.setItem(
            "pindahin_demo_role_pos",
            JSON.stringify({ side: newSide, y: newY })
          );
        } catch {}
      } else {
        setDragPos(null);
      }

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
    } else {
      // Tap or click without drag
      setIsDragging(false);
      setDragPos(null);

      // On desktop: double-click without drag toggles side (Left <-> Right)
      if (isMouse && clickCountRef.current >= 2) {
        const newSide = side === "right" ? "left" : "right";
        setSide(newSide);
        try {
          localStorage.setItem(
            "pindahin_demo_role_pos",
            JSON.stringify({ side: newSide, y })
          );
        } catch {}
      } else {
        // Single click: expand if collapsed
        if (!isExpanded) {
          expandSwitcher();
        }
      }
    }
  };

  // Position styles:
  // When dragging: follow pointer freely
  // When released: snap to edge ('left: 12px' or 'right: 12px') with smooth springy glide
  const stylePosition: React.CSSProperties = isDragging && dragPos
    ? {
        left: `${dragPos.x}px`,
        top: `${dragPos.y}px`,
        touchAction: "none",
      }
    : y !== null
    ? {
        top: `${y}px`,
        ...(side === "left" ? { left: "12px" } : { right: "12px" }),
        touchAction: "none",
      }
    : {
        bottom: "24px",
        right: "12px",
        touchAction: "none",
      };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={(e) => {
        if (!isExpanded && !hasDraggedRef.current && clickCountRef.current < 2) {
          e.stopPropagation();
          expandSwitcher();
        }
      }}
      style={stylePosition}
      className={cn(
        "fixed z-50 select-none font-sans print:hidden",
        isDragging
          ? "cursor-grabbing"
          : cn(
              "transition-[top,left,right] duration-300 ease-out",
              isExpanded ? "cursor-grab" : "cursor-pointer"
            )
      )}
    >
      {isExpanded ? (
        <div className="flex items-center gap-1.5 bg-surface-900/95 text-white backdrop-blur-md border border-surface-700/80 shadow-2xl rounded-2xl p-1.5 ring-1 ring-black/20 max-w-[calc(100vw-24px)] overflow-x-auto scrollbar-none animate-in fade-in zoom-in-95 duration-150">
          {/* Drag Handle & Side Indicator */}
          <div
            title="Klik 2x untuk pindah sisi, atau tahan & geser setelah klik 2x"
            className="flex items-center gap-1 pl-1.5 pr-1 text-[11px] font-bold text-surface-400 cursor-grab active:cursor-grabbing shrink-0"
          >
            <GripVertical className="h-3.5 w-3.5 text-surface-500" />
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-[10px] text-surface-300">Role:</span>
          </div>

          {/* Role Pills */}
          <div className="flex items-center gap-1 bg-surface-800/80 p-0.5 rounded-xl border border-surface-700 shrink-0">
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
                    "flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0",
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
            className="action-btn h-7 w-7 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 flex items-center justify-center transition shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        /* Collapsed Icon Trigger (Default) */
        <button
          type="button"
          onClick={(e) => {
            if (clickCountRef.current < 2) {
              e.stopPropagation();
              expandSwitcher();
            }
          }}
          title="Demo Role Switcher (Klik untuk buka, klik 2x untuk pindah sisi/geser)"
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
