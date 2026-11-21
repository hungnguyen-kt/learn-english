"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface ResizableSplitPaneProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: [ReactNode, ReactNode] | ReactNode[];
  defaultPercent?: number;
  minPercent?: number;
  maxPercent?: number;
  minPanelPx?: number;
  storageKey?: string;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  onResize?: (leftPercent: number) => void;
}

export interface ResizableDividerHandleProps {
  isDragging: boolean;
  leftWidth: number;
  minPercent: number;
  maxPercent: number;
  onPointerDown: (e: React.MouseEvent | React.TouchEvent) => void;
  onDoubleClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  title?: string;
}

/**
 * Handle element with vertical line and centered circle with `< >` chevrons
 */
export function ResizableDividerHandle({
  isDragging,
  leftWidth,
  minPercent,
  maxPercent,
  onPointerDown,
  onDoubleClick,
  onKeyDown,
  title = "Kéo sang trái hoặc phải để điều chỉnh kích thước (Nhấp đúp để đặt lại 50%)",
}: ResizableDividerHandleProps) {
  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation="vertical"
      aria-label="Thanh kéo điều chỉnh kích thước hai khung"
      aria-valuenow={Math.round(leftWidth)}
      aria-valuemin={minPercent}
      aria-valuemax={maxPercent}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      title={title}
      className="group relative hidden lg:flex items-center justify-center w-5 -mx-2.5 z-20 cursor-col-resize select-none touch-none focus:outline-none"
    >
      {/* Continuous vertical divider line */}
      <div
        className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] transition-colors ${
          isDragging ? "bg-blue-500" : "bg-slate-200 group-hover:bg-blue-400"
        }`}
      />

      {/* Centered circular handle matching reference image */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onDoubleClick}
        className={`sticky top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-white border shadow-sm transition-all ${
          isDragging
            ? "border-blue-500 ring-4 ring-blue-100 shadow-md text-blue-600 scale-110"
            : "border-slate-300 text-slate-500 group-hover:border-blue-400 group-hover:text-blue-600 group-hover:scale-105"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 pointer-events-none"
          aria-hidden="true"
        >
          <path d="M5.5 5L2.5 8L5.5 11" />
          <path d="M10.5 5L13.5 8L10.5 11" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Reusable Split Pane with a draggable divider between two panels.
 * On mobile (< lg), panels stack vertically.
 * On desktop (>= lg), panels can be resized smoothly by dragging the handle.
 */
export default function ResizableSplitPane({
  left,
  right,
  children,
  defaultPercent = 50,
  minPercent = 20,
  maxPercent = 80,
  minPanelPx = 280,
  storageKey,
  className = "",
  leftClassName = "",
  rightClassName = "",
  onResize,
}: ResizableSplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState<number>(defaultPercent);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Determine left and right panels from props or children
  const leftPanel = left ?? (Array.isArray(children) ? children[0] : null);
  const rightPanel = right ?? (Array.isArray(children) ? children[1] : null);

  // Restore saved width from localStorage if storageKey is provided
  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= minPercent && val <= maxPercent) {
          setLeftWidth(val);
        }
      }
    } catch {}
  }, [storageKey, minPercent, maxPercent]);

  // Update width based on clientX position
  const updateWidth = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      const minDynamicPercent = Math.max(minPercent, (minPanelPx / rect.width) * 100);
      const maxDynamicPercent = Math.min(maxPercent, 100 - minDynamicPercent);

      const rawPercent = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(Math.max(rawPercent, minDynamicPercent), maxDynamicPercent);

      setLeftWidth(clamped);
      if (onResize) onResize(clamped);
    },
    [minPercent, maxPercent, minPanelPx, onResize]
  );

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if ("button" in e && e.button !== 0) return;
    e.preventDefault();

    setIsDragging(true);
    isDraggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      updateWidth(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      updateWidth(e.touches[0].clientX);
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";

        if (storageKey) {
          setLeftWidth((current) => {
            try {
              localStorage.setItem(storageKey, current.toFixed(1));
            } catch {}
            return current;
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);
    window.addEventListener("touchcancel", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handlePointerUp);
      window.removeEventListener("touchcancel", handlePointerUp);
    };
  }, [updateWidth, storageKey]);

  const resetWidth = () => {
    setLeftWidth(defaultPercent);
    if (onResize) onResize(defaultPercent);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, defaultPercent.toString());
      } catch {}
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let delta = 0;
    if (e.key === "ArrowLeft") {
      delta = -2.5;
    } else if (e.key === "ArrowRight") {
      delta = 2.5;
    } else if (e.key === "Home") {
      e.preventDefault();
      setLeftWidth(minPercent);
      if (onResize) onResize(minPercent);
      return;
    } else if (e.key === "End") {
      e.preventDefault();
      setLeftWidth(maxPercent);
      if (onResize) onResize(maxPercent);
      return;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      resetWidth();
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      setLeftWidth((w) => {
        const next = Math.min(Math.max(w + delta, minPercent), maxPercent);
        if (storageKey) {
          try {
            localStorage.setItem(storageKey, next.toFixed(1));
          } catch {}
        }
        if (onResize) onResize(next);
        return next;
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Full-screen drag blocker to prevent children from capturing mouse/selection during drag */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize select-none" />
      )}

      <div
        ref={containerRef}
        style={
          {
            "--left-panel-width": `${leftWidth}%`,
            "--right-panel-width": `${100 - leftWidth}%`,
          } as React.CSSProperties
        }
        className="relative flex min-h-full flex-col lg:flex-row"
      >
        {/* Left Panel */}
        <div
          className={`w-full min-w-0 lg:w-[var(--left-panel-width)] lg:shrink-0 ${
            isDragging ? "select-none" : "transition-[width] duration-75"
          } ${leftClassName}`}
        >
          {leftPanel}
        </div>

        {/* Resizable Divider */}
        <ResizableDividerHandle
          isDragging={isDragging}
          leftWidth={leftWidth}
          minPercent={minPercent}
          maxPercent={maxPercent}
          onPointerDown={handlePointerDown}
          onDoubleClick={resetWidth}
          onKeyDown={handleKeyDown}
        />

        {/* Right Panel */}
        <div
          className={`w-full min-w-0 lg:w-[var(--right-panel-width)] lg:shrink-0 ${
            isDragging ? "select-none" : "transition-[width] duration-75"
          } ${rightClassName}`}
        >
          {rightPanel}
        </div>
      </div>
    </div>
  );
}
