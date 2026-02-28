"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================================
// TIMER HOOK
// ============================================================================

interface UseTimerOptions {
  /** Initial time in milliseconds */
  initialTime: number;
  /** Whether timer should start automatically */
  autoStart?: boolean;
  /** Callback when timer reaches 0 */
  onExpire?: () => void;
  /** Callback on each tick */
  onTick?: (remaining: number) => void;
  /** Interval in milliseconds */
  interval?: number;
}

interface UseTimerReturn {
  /** Remaining time in milliseconds */
  remaining: number;
  /** Whether timer is currently running */
  isRunning: boolean;
  /** Whether timer is paused */
  isPaused: boolean;
  /** Whether timer has expired */
  isExpired: boolean;
  /** Start the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Resume the timer */
  resume: () => void;
  /** Reset the timer to initial time */
  reset: () => void;
  /** Reset and set new time */
  setTime: (ms: number) => void;
  /** Add time to remaining */
  addTime: (ms: number) => void;
  /** Subtract time from remaining */
  subtractTime: (ms: number) => void;
}

/**
 * Hook for managing a countdown timer
 */
export function useTimer({
  initialTime,
  autoStart = false,
  onExpire,
  onTick,
  interval = 100,
}: UseTimerOptions): UseTimerReturn {
  const [remaining, setRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const onExpireRef = useRef(onExpire);
  const onTickRef = useRef(onTick);

  // Update refs
  useEffect(() => {
    onExpireRef.current = onExpire;
    onTickRef.current = onTick;
  }, [onExpire, onTick]);

  // Timer effect
  useEffect(() => {
    if (!isRunning || isPaused || remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining((prev) => {
        const next = Math.max(0, prev - interval);

        if (next <= 0) {
          setIsRunning(false);
          setIsExpired(true);
          onExpireRef.current?.();
        } else {
          onTickRef.current?.(next);
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, remaining, interval]);

  const start = useCallback(() => {
    if (remaining > 0) {
      setIsRunning(true);
      setIsPaused(false);
      setIsExpired(false);
    }
  }, [remaining]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (remaining > 0 && !isExpired) {
      setIsPaused(false);
    }
  }, [remaining, isExpired]);

  const reset = useCallback(() => {
    setRemaining(initialTime);
    setIsRunning(false);
    setIsPaused(false);
    setIsExpired(false);
  }, [initialTime]);

  const setTime = useCallback((ms: number) => {
    setRemaining(ms);
    setIsExpired(false);
  }, []);

  const addTime = useCallback((ms: number) => {
    setRemaining((prev) => prev + ms);
  }, []);

  const subtractTime = useCallback((ms: number) => {
    setRemaining((prev) => Math.max(0, prev - ms));
  }, []);

  return {
    remaining,
    isRunning,
    isPaused,
    isExpired,
    start,
    pause,
    resume,
    reset,
    setTime,
    addTime,
    subtractTime,
  };
}

// ============================================================================
// FORMAT TIME UTILITIES
// ============================================================================

/**
 * Format milliseconds to MM:SS
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format milliseconds to SS.S
 */
export function formatTimeShort(ms: number): string {
  const totalSeconds = ms / 1000;
  return totalSeconds.toFixed(1);
}

/**
 * Format milliseconds to human readable
 */
export function formatTimeHuman(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);

  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (seconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${seconds}s`;
}
