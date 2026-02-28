"use client";

import { useMemo } from "react";
import {
  SlotType,
  VariantId,
  PitchClass,
} from "@/lib/guitar-game/types";
import {
  pitchClassAt,
  pitchClassName,
  stringName,
  isValidSpelling,
  IS_BLACK,
} from "@/lib/guitar-game/music";

// ============================================================================
// TYPES
// ============================================================================

/** Cardinality type for surface controls */
export type Cardinality = "off" | "single" | "equivalents" | "all";

interface CellClaim {
  playerId: number;
  isVulnerable: boolean;
  isConnectSegment: boolean;
  /** Which slot (spelling) was claimed - for split circle display */
  slot?: SlotType;
}

interface FretboardProps {
  /** Number of frets to display (default 13 for 0-12) */
  fretCount?: number;
  /** Minimum visible fret */
  minFret?: number;
  /** Maximum visible fret */
  maxFret?: number;
  /** Which strings are enabled (index 0 = high E) */
  enabledStrings?: boolean[];
  /** Current prompt variant ID */
  promptVariantId: VariantId | null;
  /** Cell claims - key is "stringIdx-fretIdx-slot" for split cells */
  claims?: Map<string, CellClaim>;
  /** Player colors for rendering claims */
  playerColors?: string[];
  /** Whether to show note labels */
  showLabels?: boolean;
  /** Difficulty mode affects visibility */
  difficulty?: "learning" | "easy" | "medium" | "hard";
  /** Currently highlighted cells (for SAM feedback) */
  highlightedCells?: Set<string>;
  /** Callback when a cell is clicked */
  onCellClick?: (stringIndex: number, fretIndex: number) => void;
  /** Whether the fretboard is interactive */
  interactive?: boolean;
  /** Current player index (for visual indicator) */
  currentPlayerIndex?: number;
  /** Color blind mode */
  colorBlindMode?: boolean;
  /** Show prompt highlight on matching cells */
  showPrompt?: boolean;
  /** Cardinality mode for highlighting */
  cardinality?: Cardinality;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STRING_COLORS = [
  "#e5e5e5", // e (high E) - silver
  "#e5e5e5", // B - silver  
  "#a3a3a3", // G - slightly darker
  "#d4af37", // D - gold/brass
  "#d4af37", // A - gold/brass
  "#d4af37", // E (low E) - gold/brass
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getFretDots(fret: number): number {
  if (fret === 12 || fret === 24) return 2;
  if ([3, 5, 7, 9, 15, 17, 19, 21].includes(fret)) return 1;
  return 0;
}

// ============================================================================
// SPLIT CIRCLE CELL COMPONENT
// ============================================================================

interface SplitCellProps {
  pitchClass: PitchClass;
  claims?: { sharp?: CellClaim; flat?: CellClaim };
  playerColors: string[];
  showLabel: boolean;
  isHighlighted: boolean;
  isExactMatch: boolean;
  onClick?: () => void;
  interactive: boolean;
  enabled: boolean;
}

function SplitCircleCell({
  pitchClass,
  claims,
  playerColors,
  showLabel,
  isHighlighted,
  isExactMatch,
  onClick,
  interactive,
  enabled,
}: SplitCellProps) {
  // Get sharp and flat names
  const sharpName = pitchClassName(pitchClass, SlotType.SHR);
  const flatName = pitchClassName(pitchClass, SlotType.FLT);
  
  // Get claim colors
  const sharpColor = claims?.sharp ? playerColors[claims.sharp.playerId] || "#3b82f6" : null;
  const flatColor = claims?.flat ? playerColors[claims.flat.playerId] || "#3b82f6" : null;
  
  // Check if same player owns both
  const sameOwner = claims?.sharp && claims?.flat && claims.sharp.playerId === claims.flat.playerId;
  
  // Base highlight color for prompt matching
  const highlightColor = isExactMatch ? "rgba(59, 130, 246, 0.25)" : "rgba(59, 130, 246, 0.15)";
  
  return (
    <button
      onClick={onClick}
      disabled={!interactive || !enabled}
      className={`
        w-full h-8 relative overflow-hidden
        border-2 rounded transition-all min-w-[36px]
        ${isExactMatch ? "border-blue-500" : isHighlighted ? "border-blue-400/50" : "border-transparent"}
        ${enabled && interactive ? "cursor-pointer hover:brightness-110" : "cursor-not-allowed opacity-30"}
      `}
      style={{
        backgroundColor: isHighlighted ? highlightColor : "transparent",
      }}
    >
      {/* Split circle container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-7 h-7">
          {/* Sharp half (LEFT) */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div
              className="w-full h-full rounded-l-full flex items-center justify-center"
              style={{
                backgroundColor: sharpColor || "rgba(255,255,255,0.1)",
                border: sameOwner && claims?.sharp ? "2px solid rgba(255,255,255,0.6)" : "none",
                borderRight: "none",
              }}
            >
              {showLabel && (
                <span className="text-[10px] font-bold text-white drop-shadow-lg ml-0.5">
                  {sharpName}
                </span>
              )}
            </div>
          </div>
          
          {/* Flat half (RIGHT) */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div
              className="w-full h-full rounded-r-full flex items-center justify-center"
              style={{
                backgroundColor: flatColor || "rgba(255,255,255,0.1)",
                border: sameOwner && claims?.flat ? "2px solid rgba(255,255,255,0.6)" : "none",
                borderLeft: "none",
              }}
            >
              {showLabel && (
                <span className="text-[10px] font-bold text-white drop-shadow-lg mr-0.5">
                  {flatName}
                </span>
              )}
            </div>
          </div>
          
          {/* Center divider line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-600/50 -translate-x-1/2" />
          
          {/* Double ring for same owner */}
          {sameOwner && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: "2px solid white",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.3)",
              }}
            />
          )}
        </div>
      </div>
      
      {/* Vulnerability indicator */}
      {(claims?.sharp?.isVulnerable || claims?.flat?.isVulnerable) && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      )}
    </button>
  );
}

// ============================================================================
// FULL CIRCLE CELL COMPONENT (for natural notes)
// ============================================================================

interface FullCellProps {
  pitchClass: PitchClass;
  claim?: CellClaim;
  playerColors: string[];
  showLabel: boolean;
  isHighlighted: boolean;
  isExactMatch: boolean;
  onClick?: () => void;
  interactive: boolean;
  enabled: boolean;
}

function FullCircleCell({
  pitchClass,
  claim,
  playerColors,
  showLabel,
  isHighlighted,
  isExactMatch,
  onClick,
  interactive,
  enabled,
}: FullCellProps) {
  const noteName = pitchClassName(pitchClass, SlotType.NAT);
  const claimColor = claim ? playerColors[claim.playerId] || "#3b82f6" : null;
  const highlightColor = isExactMatch ? "rgba(59, 130, 246, 0.25)" : "rgba(59, 130, 246, 0.15)";
  
  return (
    <button
      onClick={onClick}
      disabled={!interactive || !enabled}
      className={`
        w-full h-8 relative flex items-center justify-center
        border-2 rounded transition-all min-w-[36px]
        ${isExactMatch ? "border-blue-500" : isHighlighted ? "border-blue-400/50" : "border-transparent"}
        ${enabled && interactive ? "cursor-pointer hover:brightness-110" : "cursor-not-allowed opacity-30"}
      `}
      style={{
        backgroundColor: claimColor || (isHighlighted ? highlightColor : "transparent"),
      }}
    >
      {/* Full circle */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: claimColor || "rgba(255,255,255,0.1)",
          border: claim ? "2px solid rgba(255,255,255,0.4)" : "none",
        }}
      >
        {showLabel && (
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {noteName}
          </span>
        )}
      </div>
      
      {/* Vulnerability indicator */}
      {claim?.isVulnerable && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      )}
    </button>
  );
}

// ============================================================================
// MAIN FRETBOARD COMPONENT
// ============================================================================

export function Fretboard({
  fretCount = 13,
  minFret = 0,
  maxFret = 12,
  enabledStrings = [true, true, true, true, true, true],
  promptVariantId = null,
  claims = new Map(),
  playerColors = [],
  showLabels = true,
  difficulty = "medium",
  highlightedCells = new Set(),
  onCellClick,
  interactive = true,
  currentPlayerIndex = 0,
  colorBlindMode = false,
  showPrompt = true,
  cardinality = "all",
}: FretboardProps) {
  // Calculate visible frets
  const visibleFrets = useMemo(() => {
    const frets: number[] = [];
    for (let f = minFret; f <= Math.min(maxFret, fretCount - 1); f++) {
      frets.push(f);
    }
    return frets;
  }, [minFret, maxFret, fretCount]);

  // Get prompt pitch class and spelling
  const promptInfo = useMemo(() => {
    if (promptVariantId === null) return null;
    const pc = Math.floor(promptVariantId / 3) as PitchClass;
    const spelling = (promptVariantId % 3) as SlotType;
    return { pitchClass: pc, spelling };
  }, [promptVariantId]);

  // Check if a cell matches the prompt
  const cellMatchesPrompt = (stringIndex: number, fretIndex: number): { matches: boolean; isExact: boolean } => {
    if (!promptInfo || cardinality === "off" || !showPrompt) {
      return { matches: false, isExact: false };
    }
    const pc = pitchClassAt(stringIndex, fretIndex);
    const matchesPC = pc === promptInfo.pitchClass;
    
    if (!matchesPC) return { matches: false, isExact: false };
    
    // Exact match means the spelling matches
    const isExact = isValidSpelling(pc, promptInfo.spelling);
    
    if (cardinality === "single") {
      // For single, only highlight the first match
      // This is simplified - in real impl you'd find the first one
      return { matches: true, isExact };
    }
    
    return { matches: true, isExact };
  };

  // Check if cell should show label
  const shouldShowLabel = (stringIndex: number, fretIndex: number): boolean => {
    if (difficulty === "learning") return true;
    if (difficulty === "easy") return true;
    const cellKey = `${stringIndex}-${fretIndex}`;
    if (highlightedCells.has(cellKey)) return true;
    if (claims.has(cellKey)) return true;
    return false;
  };

  // Handle cell click
  const handleCellClick = (stringIndex: number, fretIndex: number) => {
    if (!interactive) return;
    if (!enabledStrings[stringIndex]) return;
    onCellClick?.(stringIndex, fretIndex);
  };

  // Get claims for a cell (for split display)
  const getCellClaims = (stringIndex: number, fretIndex: number): { sharp?: CellClaim; flat?: CellClaim } | undefined => {
    const pc = pitchClassAt(stringIndex, fretIndex);
    if (!IS_BLACK[pc]) {
      // Natural note - single claim
      const key = `${stringIndex}-${fretIndex}`;
      const claim = claims.get(key);
      return claim ? { sharp: claim } : undefined;
    }
    
    // Black key - check for split claims
    const sharpKey = `${stringIndex}-${fretIndex}-shr`;
    const flatKey = `${stringIndex}-${fretIndex}-flt`;
    const sharpClaim = claims.get(sharpKey);
    const flatClaim = claims.get(flatKey);
    
    if (sharpClaim || flatClaim) {
      return { sharp: sharpClaim, flat: flatClaim };
    }
    return undefined;
  };

  return (
    <div className="relative bg-gradient-to-b from-amber-900 to-amber-950 rounded-lg p-4 select-none overflow-x-auto">
      {/* Fretboard container */}
      <div className="relative min-w-[600px]">
        {/* Nut (fret 0 divider) */}
        <div className="absolute left-[52px] top-0 bottom-0 w-2 bg-gradient-to-r from-amber-200 to-amber-100 rounded-sm z-10" />
        
        {/* String names column */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-around items-center">
          {[0, 1, 2, 3, 4, 5].map((stringIdx) => (
            <div
              key={stringIdx}
              className={`text-xs font-mono ${
                enabledStrings[stringIdx] ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {stringName(stringIdx)}
            </div>
          ))}
        </div>

        {/* Fret numbers row */}
        <div className="ml-12 mb-1 flex" style={{ gap: "2px" }}>
          <div className="w-8" /> {/* Open string column */}
          {visibleFrets.filter(f => f > 0).map((fret) => (
            <div
              key={fret}
              className="flex-1 text-center text-xs text-slate-400 min-w-[36px]"
            >
              {fret}
            </div>
          ))}
        </div>

        {/* Strings and cells */}
        <div className="ml-12 relative">
          {[0, 1, 2, 3, 4, 5].map((stringIdx) => (
            <div key={stringIdx} className="relative flex mb-1" style={{ gap: "2px" }}>
              {/* Open string cell */}
              {(() => {
                const pc = pitchClassAt(stringIdx, 0);
                const { matches, isExact } = cellMatchesPrompt(stringIdx, 0);
                const isBlack = IS_BLACK[pc];
                const cellClaims = getCellClaims(stringIdx, 0);
                
                return isBlack ? (
                  <SplitCircleCell
                    pitchClass={pc}
                    claims={cellClaims}
                    playerColors={playerColors}
                    showLabel={shouldShowLabel(stringIdx, 0)}
                    isHighlighted={matches}
                    isExactMatch={isExact}
                    onClick={() => handleCellClick(stringIdx, 0)}
                    interactive={interactive}
                    enabled={enabledStrings[stringIdx]}
                  />
                ) : (
                  <FullCircleCell
                    pitchClass={pc}
                    claim={cellClaims?.sharp}
                    playerColors={playerColors}
                    showLabel={shouldShowLabel(stringIdx, 0)}
                    isHighlighted={matches}
                    isExactMatch={isExact}
                    onClick={() => handleCellClick(stringIdx, 0)}
                    interactive={interactive}
                    enabled={enabledStrings[stringIdx]}
                  />
                );
              })()}

              {/* Fretted cells */}
              {visibleFrets.filter(f => f > 0).map((fret) => {
                const hasDot = getFretDots(fret) > 0;
                const isDoubleDot = getFretDots(fret) === 2;
                const pc = pitchClassAt(stringIdx, fret);
                const { matches, isExact } = cellMatchesPrompt(stringIdx, fret);
                const isBlack = IS_BLACK[pc];
                const cellClaims = getCellClaims(stringIdx, fret);
                
                return (
                  <div key={fret} className="relative flex-1 min-w-[36px]">
                    {/* Cell */}
                    {isBlack ? (
                      <SplitCircleCell
                        pitchClass={pc}
                        claims={cellClaims}
                        playerColors={playerColors}
                        showLabel={shouldShowLabel(stringIdx, fret)}
                        isHighlighted={matches}
                        isExactMatch={isExact}
                        onClick={() => handleCellClick(stringIdx, fret)}
                        interactive={interactive}
                        enabled={enabledStrings[stringIdx]}
                      />
                    ) : (
                      <FullCircleCell
                        pitchClass={pc}
                        claim={cellClaims?.sharp}
                        playerColors={playerColors}
                        showLabel={shouldShowLabel(stringIdx, fret)}
                        isHighlighted={matches}
                        isExactMatch={isExact}
                        onClick={() => handleCellClick(stringIdx, fret)}
                        interactive={interactive}
                        enabled={enabledStrings[stringIdx]}
                      />
                    )}
                    
                    {/* Fret marker dots */}
                    {hasDot && stringIdx === 2 && (
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                        <div className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-slate-400" />
                          {isDoubleDot && (
                            <div className="w-2 h-2 rounded-full bg-slate-400" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* String line overlay */}
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: "50%",
                  height: `${2 + (5 - stringIdx) * 0.3}px`,
                  transform: "translateY(-50%)",
                  backgroundColor: STRING_COLORS[stringIdx],
                  opacity: enabledStrings[stringIdx] ? 0.8 : 0.2,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      {promptInfo && showPrompt && cardinality !== "off" && (
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-500/25" />
            <span className="text-slate-400">Target Note</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-2 border-blue-400/50" />
            <span className="text-slate-400">Enharmonic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
            <span className="text-slate-400">Sharp / Flat</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fretboard;
