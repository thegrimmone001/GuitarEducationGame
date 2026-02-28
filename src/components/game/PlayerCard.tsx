"use client";

import { useMemo } from "react";
import { PLAYER_MARKS } from "@/lib/guitar-game/types";
import { formatTime } from "@/hooks/useTimer";

// ============================================================================
// PLAYER CARD COMPONENT
// ============================================================================

/**
 * PlayerCard - Displays player information during gameplay
 * 
 * Per GEG-020:
 * - Avatar/identifier
 * - Score
 * - Tokens
 * - Timer (turn timer)
 * 
 * Designed to save UI space by consolidating all player info.
 */

interface PlayerCardProps {
  /** Player name */
  name: string;
  /** Player color ID for coloring */
  colorId: number;
  /** Player score */
  score: number;
  /** Player token count */
  tokens: number;
  /** Remaining turn time in ms (0 = no timer) */
  timerMs?: number;
  /** Total turn time in ms */
  timerTotal?: number;
  /** Whether timer is paused */
  timerPaused?: boolean;
  /** Whether this is the active player */
  isActive?: boolean;
  /** Whether this player is in "fire mode" */
  isOnFire?: boolean;
  /** Color blind mode - use symbols */
  colorBlindMode?: boolean;
  /** Whether to show extended info */
  compact?: boolean;
  /** Current streak count */
  streakCount?: number;
  /** Additional className */
  className?: string;
}

export function PlayerCard({
  name,
  colorId,
  score,
  tokens,
  timerMs = 0,
  timerTotal = 0,
  timerPaused = false,
  isActive = false,
  isOnFire = false,
  colorBlindMode = false,
  compact = false,
  streakCount = 0,
  className = "",
}: PlayerCardProps) {
  // Get player color
  const color = useMemo(() => {
    const colors = [
      "#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6",
      "#ec4899", "#06b6d4", "#f97316", "#84cc16", "#6366f1",
      "#14b8a6", "#a855f7", "#eab308", "#10b981", "#0ea5e9", "#d946ef",
    ];
    return colors[colorId % colors.length];
  }, [colorId]);

  // Timer status
  const timerPercentage = timerTotal > 0 ? (timerMs / timerTotal) * 100 : 0;
  const isTimerLow = timerPercentage < 30;
  const isTimerCritical = timerPercentage < 10;

  // Format score with commas
  const formattedScore = useMemo(() => {
    return score.toLocaleString();
  }, [score]);

  if (compact) {
    return (
      <div
        className={`
          flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all
          ${isActive ? "bg-slate-700 ring-2 ring-blue-500" : "bg-slate-800"}
          ${className}
        `}
      >
        {/* Avatar */}
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ backgroundColor: color }}
        >
          {colorBlindMode ? PLAYER_MARKS[colorId % PLAYER_MARKS.length] : name.charAt(0)}
        </span>

        {/* Name and Score */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{name}</div>
        </div>

        {/* Score */}
        <div className="text-sm font-semibold text-white">
          {formattedScore}
        </div>

        {/* Tokens */}
        {tokens > 0 && (
          <div className="text-xs text-yellow-400">
            🔑{tokens}
          </div>
        )}

        {/* Timer */}
        {timerMs > 0 && timerTotal > 0 && (
          <span
            className={`
              font-mono text-xs px-1.5 py-0.5 rounded
              ${timerPaused ? "text-slate-400 bg-slate-900" : ""}
              ${isTimerCritical && !timerPaused ? "text-red-400 animate-pulse" : ""}
              ${isTimerLow && !timerPaused && !isTimerCritical ? "text-yellow-400" : ""}
              ${!isTimerLow && !timerPaused ? "text-white bg-slate-900" : ""}
            `}
          >
            {formatTime(timerMs)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${isActive ? "bg-slate-700 ring-2 ring-blue-500 shadow-lg" : "bg-slate-800"}
        ${isOnFire ? "ring-orange-500 ring-2" : ""}
        ${className}
      `}
    >
      {/* Fire effect */}
      {isOnFire && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none" />
      )}

      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ring-2 ring-white/20"
        style={{ backgroundColor: color }}
      >
        {colorBlindMode ? PLAYER_MARKS[colorId % PLAYER_MARKS.length] : name.charAt(0).toUpperCase()}
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <div className="flex items-center gap-2">
          <span className="font-semibold truncate">{name}</span>
          {isOnFire && (
            <span className="text-orange-400 text-sm animate-pulse">🔥 ON FIRE!</span>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 text-sm">
          {/* Score */}
          <span className="font-bold text-white">
            {formattedScore} pts
          </span>

          {/* Tokens */}
          <span className="text-yellow-400 flex items-center gap-1">
            <span>🔑</span>
            <span>{tokens}</span>
          </span>

          {/* Streak */}
          {streakCount >= 3 && (
            <span className="text-blue-400">
              🔥 {streakCount}
            </span>
          )}
        </div>
      </div>

      {/* Timer */}
      {timerMs > 0 && timerTotal > 0 && (
        <div className="flex flex-col items-end gap-1">
          <div
            className={`
              font-mono text-lg font-bold
              ${timerPaused ? "text-slate-400" : ""}
              ${isTimerCritical && !timerPaused ? "text-red-400 animate-pulse" : ""}
              ${isTimerLow && !timerPaused && !isTimerCritical ? "text-yellow-400" : ""}
              ${!isTimerLow && !timerPaused ? "text-white" : ""}
            `}
          >
            {formatTime(timerMs)}
          </div>

          {/* Timer Progress */}
          <div className="w-16 h-1 bg-slate-600 rounded-full overflow-hidden">
            <div
              className={`
                h-full transition-all duration-200
                ${isTimerCritical ? "bg-red-500" : isTimerLow ? "bg-yellow-500" : "bg-blue-500"}
              `}
              style={{ width: `${Math.max(0, timerPercentage)}%` }}
            />
          </div>

          {timerPaused && (
            <span className="text-xs text-slate-500 uppercase">Paused</span>
          )}
        </div>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}

// ============================================================================
// PLAYER STRIP COMPONENT
// ============================================================================

interface PlayerStripProps {
  /** Players to display */
  players: Array<{
    id: number;
    name: string;
    colorId: number;
    score: number;
    tokens: number;
  }>;
  /** Index of current player */
  currentPlayerIndex: number;
  /** Remaining time for current player */
  currentTimeMs?: number;
  /** Total time per turn */
  totalTimeMs?: number;
  /** Timer paused */
  timerPaused?: boolean;
  /** Players in fire mode */
  firePlayers?: Set<number>;
  /** Color blind mode */
  colorBlindMode?: boolean;
  /** Layout variant */
  layout?: "horizontal" | "grid";
  /** Additional className */
  className?: string;
}

export function PlayerStrip({
  players,
  currentPlayerIndex,
  currentTimeMs = 0,
  totalTimeMs = 0,
  timerPaused = false,
  firePlayers = new Set(),
  colorBlindMode = false,
  layout = "horizontal",
  className = "",
}: PlayerStripProps) {
  const layoutClass = layout === "grid"
    ? "grid grid-cols-2 gap-2"
    : "flex flex-wrap gap-3 justify-center";

  return (
    <div className={`${layoutClass} ${className}`}>
      {players.map((player, index) => (
        <PlayerCard
          key={player.id}
          name={player.name}
          colorId={player.colorId}
          score={player.score}
          tokens={player.tokens}
          timerMs={index === currentPlayerIndex ? currentTimeMs : 0}
          timerTotal={index === currentPlayerIndex ? totalTimeMs : 0}
          timerPaused={timerPaused}
          isActive={index === currentPlayerIndex}
          isOnFire={firePlayers.has(player.id)}
          colorBlindMode={colorBlindMode}
          compact={layout === "horizontal"}
        />
      ))}
    </div>
  );
}
