"use client";

import { useMemo } from "react";
import { formatTime, formatTimeHuman } from "@/hooks/useTimer";

// ============================================================================
// TIMER DISPLAY COMPONENT
// ============================================================================

interface TimerDisplayProps {
  /** Remaining time in milliseconds */
  remainingMs: number;
  /** Initial/total time in milliseconds */
  totalMs: number;
  /** Whether timer is paused */
  isPaused?: boolean;
  /** Whether timer is expired */
  isExpired?: boolean;
  /** Display format */
  format?: "mm:ss" | "seconds" | "human";
  /** Show progress bar */
  showProgress?: boolean;
  /** Warn when below this percentage */
  warnThreshold?: number;
  /** Critical when below this percentage */
  criticalThreshold?: number;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional className */
  className?: string;
}

export function TimerDisplay({
  remainingMs,
  totalMs,
  isPaused = false,
  isExpired = false,
  format = "mm:ss",
  showProgress = true,
  warnThreshold = 30,
  criticalThreshold = 10,
  size = "md",
  className = "",
}: TimerDisplayProps) {
  // Calculate percentage remaining
  const percentage = useMemo(() => {
    if (totalMs <= 0) return 0;
    return (remainingMs / totalMs) * 100;
  }, [remainingMs, totalMs]);

  // Determine status
  const status = useMemo(() => {
    if (isExpired) return "expired";
    if (isPaused) return "paused";
    if (percentage <= criticalThreshold) return "critical";
    if (percentage <= warnThreshold) return "warning";
    return "normal";
  }, [isExpired, isPaused, percentage, criticalThreshold, warnThreshold]);

  // Get color for status
  const statusColor = useMemo(() => {
    switch (status) {
      case "expired":
        return "text-red-500";
      case "critical":
        return "text-red-400 animate-pulse";
      case "warning":
        return "text-yellow-400";
      case "paused":
        return "text-slate-400";
      default:
        return "text-white";
    }
  }, [status]);

  // Get progress bar color
  const progressColor = useMemo(() => {
    switch (status) {
      case "expired":
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "paused":
        return "bg-slate-500";
      default:
        return "bg-blue-500";
    }
  }, [status]);

  // Format time
  const displayTime = useMemo(() => {
    switch (format) {
      case "seconds":
        return formatTimeHuman(remainingMs);
      case "human":
        return formatTimeHuman(remainingMs);
      default:
        return formatTime(remainingMs);
    }
  }, [remainingMs, format]);

  // Size classes
  const sizeClasses = useMemo(() => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-3xl font-bold";
      default:
        return "text-xl font-semibold";
    }
  }, [size]);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Time Display */}
      <div className={`flex items-center gap-2 ${statusColor} ${sizeClasses}`}>
        <span className="font-mono">
          {displayTime}
        </span>
        {isPaused && !isExpired && (
          <span className="text-xs uppercase tracking-wider opacity-75">
            Paused
          </span>
        )}
        {isExpired && (
          <span className="text-xs uppercase tracking-wider opacity-75">
            Time!
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${progressColor}`}
            style={{ width: `${Math.max(0, percentage)}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MINI TIMER COMPONENT
// ============================================================================

interface MiniTimerProps {
  remainingMs: number;
  totalMs: number;
  isPaused?: boolean;
  className?: string;
}

export function MiniTimer({
  remainingMs,
  totalMs,
  isPaused = false,
  className = "",
}: MiniTimerProps) {
  const percentage = totalMs > 0 ? (remainingMs / totalMs) * 100 : 0;
  const isLow = percentage < 30;

  return (
    <span
      className={`
        font-mono text-xs px-1.5 py-0.5 rounded
        ${isPaused ? "text-slate-400 bg-slate-800" : ""}
        ${isLow && !isPaused ? "text-yellow-400" : ""}
        ${!isLow && !isPaused ? "text-white" : ""}
        ${className}
      `}
    >
      ⏱ {formatTime(remainingMs)}
    </span>
  );
}
