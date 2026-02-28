"use client";

import { useMemo, useState, useRef } from "react";
import { NOTE_NAMES, variantLabel, pitchClassName, IS_BLACK } from "@/lib/guitar-game/music";
import { SlotType, VariantId, PitchClass } from "@/lib/guitar-game/types";

// ============================================================================
// TYPES
// ============================================================================

interface NoteRailProps {
  /** Current prompt variant ID */
  promptVariantId?: VariantId | null;
  /** Which accidentals to show */
  showAccidentals?: ("naturals" | "sharps" | "flats")[];
  /** Display mode */
  displayMode?: "names" | "numbers" | "intervals";
  /** Root note for interval display */
  rootNote?: PitchClass;
  /** Callback when a note is clicked */
  onNoteClick?: (pitchClass: PitchClass, spelling: SlotType) => void;
  /** Whether the rail is interactive */
  interactive?: boolean;
  /** Cardinality mode */
  cardinality?: "off" | "single" | "equivalents" | "all";
  /** Enabled strings for position mapping */
  enabledStrings?: boolean[];
  /** Fret range for position mapping */
  minFret?: number;
  maxFret?: number;
  /** Callback to tap a cell on fretboard */
  onCellTap?: (stringIndex: number, fretIndex: number) => void;
}

// ============================================================================
// CHROMATIC NOTES DATA
// ============================================================================

/** All 12 chromatic notes with both spellings where applicable */
const CHROMATIC_NOTES: Array<{
  pitchClass: PitchClass;
  natural?: string;
  sharp?: string;
  flat?: string;
  isBlack: boolean;
}> = [
  { pitchClass: 0, natural: "C", isBlack: false },
  { pitchClass: 1, sharp: "C♯", flat: "D♭", isBlack: true },
  { pitchClass: 2, natural: "D", isBlack: false },
  { pitchClass: 3, sharp: "D♯", flat: "E♭", isBlack: true },
  { pitchClass: 4, natural: "E", isBlack: false },
  { pitchClass: 5, natural: "F", isBlack: false },
  { pitchClass: 6, sharp: "F♯", flat: "G♭", isBlack: true },
  { pitchClass: 7, natural: "G", isBlack: false },
  { pitchClass: 8, sharp: "G♯", flat: "A♭", isBlack: true },
  { pitchClass: 9, natural: "A", isBlack: false },
  { pitchClass: 10, sharp: "A♯", flat: "B♭", isBlack: true },
  { pitchClass: 11, natural: "B", isBlack: false },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function NoteRail({
  promptVariantId,
  showAccidentals = ["naturals", "sharps", "flats"],
  displayMode = "names",
  rootNote = 0,
  onNoteClick,
  interactive = true,
  cardinality = "all",
  enabledStrings = [true, true, true, true, true, true],
  minFret = 0,
  maxFret = 12,
  onCellTap,
}: NoteRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Get current prompt info
  const promptInfo = useMemo(() => {
    if (promptVariantId === null || promptVariantId === undefined) return null;
    const pc = Math.floor(promptVariantId / 3) as PitchClass;
    const spelling = (promptVariantId % 3) as SlotType;
    return { pitchClass: pc, spelling };
  }, [promptVariantId]);

  // Build visible notes (centered on current prompt)
  const visibleNotes = useMemo(() => {
    const centerIdx = promptInfo ? promptInfo.pitchClass : 0;
    const notes: Array<typeof CHROMATIC_NOTES[0] & { position: number; offset: number }> = [];
    
    // Show notes from -5 to +6 around center (12 notes total)
    for (let i = -5; i <= 6; i++) {
      const idx = ((centerIdx + i) % 12 + 12) % 12;
      notes.push({
        ...CHROMATIC_NOTES[idx],
        position: i + 5,
        offset: i,
      });
    }
    return notes;
  }, [promptInfo]);

  // Check if a note should be highlighted
  const getNoteHighlight = (note: typeof CHROMATIC_NOTES[0]) => {
    if (!promptInfo || cardinality === "off") return { isTarget: false, isEnharmonic: false };
    
    const isTarget = note.pitchClass === promptInfo.pitchClass;
    return { isTarget, isEnharmonic: isTarget };
  };

  // Handle note click
  const handleNoteClick = (note: typeof CHROMATIC_NOTES[0], spelling: SlotType) => {
    if (!interactive) return;
    
    // If we have cell tap callback, find first matching position
    if (onCellTap) {
      for (let s = 0; s < 6; s++) {
        if (!enabledStrings[s]) continue;
        for (let f = minFret; f <= maxFret; f++) {
          const pc = (note.pitchClass) as PitchClass;
          // This is simplified - real impl would check actual fretboard positions
          onCellTap(s, f);
          return;
        }
      }
    }
    
    onNoteClick?.(note.pitchClass, spelling);
  };

  // Drag handlers for scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart(e.clientX - scrollOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - dragStart;
    // Constrain scroll
    const maxScroll = 0;
    const minScroll = -((visibleNotes.length - 8) * 48);
    setScrollOffset(Math.max(minScroll, Math.min(maxScroll, newOffset)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-2 select-none">
      {/* Compact header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-slate-500 uppercase tracking-wider">Note Rail</span>
        {promptInfo && (
          <span className="text-sm font-bold text-blue-400">
            {variantLabel(promptVariantId!)}
          </span>
        )}
      </div>
      
      {/* Note strip */}
      <div 
        ref={railRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="flex gap-1 transition-transform duration-100"
          style={{ transform: `translateX(${scrollOffset}px)` }}
        >
          {visibleNotes.map((note, idx) => {
            const { isTarget, isEnharmonic } = getNoteHighlight(note);
            const showNatural = !note.isBlack && showAccidentals.includes("naturals");
            const showSharp = note.isBlack && showAccidentals.includes("sharps");
            const showFlat = note.isBlack && showAccidentals.includes("flats");
            
            return (
              <div
                key={`${note.pitchClass}-${idx}`}
                className={`
                  flex-shrink-0 w-12 h-14 rounded-lg flex flex-col items-center justify-center
                  transition-all duration-150
                  ${isTarget 
                    ? "bg-blue-600 scale-110 shadow-lg shadow-blue-500/30 z-10" 
                    : "bg-slate-700/50 hover:bg-slate-600/50"
                  }
                  ${interactive ? "cursor-pointer" : "cursor-default"}
                `}
                onClick={() => {
                  if (note.isBlack) {
                    handleNoteClick(note, showSharp ? SlotType.SHR : SlotType.FLT);
                  } else {
                    handleNoteClick(note, SlotType.NAT);
                  }
                }}
              >
                {/* Natural note */}
                {!note.isBlack && showNatural && (
                  <span className="text-base font-bold text-white">
                    {note.natural}
                  </span>
                )}
                
                {/* Black key - show both spellings */}
                {note.isBlack && (
                  <div className="flex flex-col items-center leading-tight">
                    {showSharp && (
                      <span className={`text-xs font-bold ${isTarget ? "text-white" : "text-slate-200"}`}>
                        {note.sharp}
                      </span>
                    )}
                    {showSharp && showFlat && (
                      <span className="text-[8px] text-slate-400">/</span>
                    )}
                    {showFlat && (
                      <span className={`text-xs font-bold ${isTarget ? "text-white" : "text-slate-300"}`}>
                        {note.flat}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Position indicator for target */}
                {isTarget && (
                  <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-blue-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Octave navigation */}
      <div className="flex justify-center gap-2 mt-2">
        <button className="px-2 py-0.5 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-400">
          ◀
        </button>
        <span className="text-xs text-slate-500">Octave 4</span>
        <button className="px-2 py-0.5 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-400">
          ▶
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// EXTENDED NOTE RAIL
// ============================================================================

interface ExtendedNoteRailProps extends NoteRailProps {
  showOctaves?: boolean;
  currentOctave?: number;
}

export function ExtendedNoteRail({
  showOctaves = true,
  currentOctave = 4,
  ...props
}: ExtendedNoteRailProps) {
  return (
    <div className="space-y-1">
      <NoteRail {...props} />
    </div>
  );
}
