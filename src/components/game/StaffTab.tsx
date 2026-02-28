"use client";

import { useMemo } from "react";
import { PitchClass, SlotType } from "@/lib/guitar-game/types";

// ============================================================================
// TYPES
// ============================================================================

interface StaffProps {
  /** Notes to display - pitch class and position in measure */
  notes?: Array<{
    pitchClass: PitchClass;
    spelling: SlotType;
    position: number; // 0-7 for eighth note positions
    duration: "whole" | "half" | "quarter" | "eighth";
  }>;
  /** Key signature (number of sharps/flats, negative for flats) */
  keySignature?: number;
  /** Time signature */
  timeSignature?: { numerator: number; denominator: number };
  /** Whether staff is interactive */
  interactive?: boolean;
  /** Callback when a position is clicked */
  onPositionClick?: (position: number) => void;
  /** Highlighted position */
  highlightedPosition?: number;
  /** Current clef */
  clef?: "treble" | "bass";
}

interface TabProps {
  /** Tab entries - string index and fret number */
  entries?: Array<{
    stringIndex: number; // 0 = high E, 5 = low E
    fret: number;
    position: number; // horizontal position in measure
  }>;
  /** Whether tab is interactive */
  interactive?: boolean;
  /** Callback when a position is clicked */
  onPositionClick?: (stringIndex: number, position: number) => void;
  /** Highlighted entry */
  highlightedEntry?: { stringIndex: number; position: number };
}

// ============================================================================
// STAFF COMPONENT
// ============================================================================

export function Staff({
  notes = [],
  keySignature = 0,
  timeSignature = { numerator: 4, denominator: 4 },
  interactive = true,
  onPositionClick,
  highlightedPosition,
  clef = "treble",
}: StaffProps) {
  // Staff line Y positions (5 lines, middle C is below)
  const linePositions = [0, 1, 2, 3, 4]; // Lines from top to bottom
  
  // Calculate vertical position for a note (in staff units)
  // Middle C (MIDI 60) = ledger line below staff for treble clef
  // E4 (top space) = position 0, F4 (top line) = position 1, etc.
  const getNotePosition = (pitchClass: PitchClass, octave: number = 4): number => {
    // For treble clef: E4 is the bottom line (position 8 in half-steps from E4)
    // We need to convert pitch class + octave to staff position
    // Staff positions: E4=0, F4=1, G4=2, A4=3, B4=4, C5=5, D5=6, E5=7, F5=8, G5=9, A5=10, B5=11, C6=12
    const baseOctave = 4;
    const baseNote = 4; // E
    const semitonesFromE4 = (octave - baseOctave) * 12 + (pitchClass - baseNote);
    // Convert to staff position (each line/space = 2 semitones from E4)
    const staffPosition = semitonesFromE4 / 2;
    return staffPosition;
  };

  // Positions for 8 eighth note slots
  const positions = [0, 1, 2, 3, 4, 5, 6, 7];
  
  return (
    <div className="bg-slate-800/30 rounded-lg p-4 overflow-x-auto">
      {/* Staff notation */}
      <div className="relative min-w-[400px] h-32">
        {/* Treble Clef */}
        <div className="absolute left-2 top-4 text-4xl text-slate-300 font-serif select-none" style={{ fontFamily: "serif" }}>
          𝄞
        </div>
        
        {/* Staff lines */}
        <div className="absolute left-12 right-4 top-8">
          {[0, 1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="absolute w-full h-px bg-slate-400"
              style={{ top: `${line * 12}px` }}
            />
          ))}
        </div>
        
        {/* Measure lines */}
        <div className="absolute left-12 top-8 bottom-8 w-px bg-slate-400" />
        <div className="absolute right-4 top-8 bottom-8 w-px bg-slate-400" />
        
        {/* Clickable positions */}
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => interactive && onPositionClick?.(pos)}
            className={`
              absolute top-4 bottom-12 w-12
              ${interactive ? "hover:bg-blue-500/10 cursor-pointer" : "cursor-default"}
              ${highlightedPosition === pos ? "bg-blue-500/20" : ""}
            `}
            style={{ left: `${60 + pos * 40}px` }}
          />
        ))}
        
        {/* Notes */}
        {notes.map((note, idx) => {
          const staffPos = getNotePosition(note.pitchClass);
          const isLedgerBelow = staffPos < 0;
          const isLedgerAbove = staffPos > 8;
          
          return (
            <div
              key={idx}
              className="absolute"
              style={{
                left: `${70 + note.position * 40}px`,
                top: `${44 + (4 - staffPos) * 6}px`,
              }}
            >
              {/* Ledger line for middle C or above staff */}
              {(isLedgerBelow || isLedgerAbove || staffPos === 5) && (
                <div className="absolute w-5 h-px bg-slate-400 -left-1 top-1/2" />
              )}
              
              {/* Note head (ellipse) */}
              <div
                className={`
                  w-3 h-2.5 rounded-full border border-slate-200
                  ${note.duration === "whole" ? "bg-transparent" : "bg-slate-200"}
                  ${highlightedPosition === note.position ? "border-blue-400 bg-blue-400" : ""}
                `}
                style={{ transform: "rotate(-15deg)" }}
              />
              
              {/* Stem (for non-whole notes) */}
              {note.duration !== "whole" && (
                <div
                  className="absolute w-px bg-slate-200"
                  style={{
                    height: "20px",
                    left: staffPos > 4 ? "-1px" : "11px",
                    top: staffPos > 4 ? "-18px" : "10px",
                  }}
                />
              )}
            </div>
          );
        })}
        
        {/* Time signature */}
        <div className="absolute left-16 top-6 flex flex-col items-center text-slate-300 text-sm font-bold">
          <span>{timeSignature.numerator}</span>
          <span>{timeSignature.denominator}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB COMPONENT
// ============================================================================

export function Tab({
  entries = [],
  interactive = true,
  onPositionClick,
  highlightedEntry,
}: TabProps) {
  // String names (high to low)
  const stringNames = ["e", "B", "G", "D", "A", "E"];
  
  // Positions for 8 eighth note slots
  const positions = [0, 1, 2, 3, 4, 5, 6, 7];
  
  return (
    <div className="bg-slate-800/30 rounded-lg p-4 overflow-x-auto">
      {/* Tab notation */}
      <div className="relative min-w-[400px] h-24">
        {/* TAB label */}
        <div className="absolute left-2 top-4 text-xl text-slate-300 font-bold select-none">
          TAB
        </div>
        
        {/* String lines */}
        <div className="absolute left-12 right-4 top-2">
          {[0, 1, 2, 3, 4, 5].map((string) => (
            <div
              key={string}
              className="absolute w-full h-px bg-slate-500"
              style={{ top: `${string * 12}px` }}
            />
          ))}
        </div>
        
        {/* String names */}
        <div className="absolute left-6 top-2">
          {stringNames.map((name, idx) => (
            <div
              key={idx}
              className="absolute text-xs text-slate-400 font-mono"
              style={{ top: `${idx * 12 - 4}px` }}
            >
              {name}
            </div>
          ))}
        </div>
        
        {/* Clickable positions */}
        {positions.map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0 w-10"
            style={{ left: `${60 + pos * 40}px` }}
          >
            {[0, 1, 2, 3, 4, 5].map((stringIdx) => (
              <button
                key={stringIdx}
                onClick={() => interactive && onPositionClick?.(stringIdx, pos)}
                className={`
                  absolute w-8 h-4 flex items-center justify-center
                  ${interactive ? "hover:bg-blue-500/20 cursor-pointer" : "cursor-default"}
                  ${highlightedEntry?.stringIndex === stringIdx && highlightedEntry?.position === pos 
                    ? "bg-blue-500/30" 
                    : ""
                  }
                `}
                style={{ top: `${stringIdx * 12 - 6}px` }}
              />
            ))}
          </div>
        ))}
        
        {/* Fret numbers */}
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className={`
              absolute text-sm font-bold
              ${highlightedEntry?.stringIndex === entry.stringIndex && highlightedEntry?.position === entry.position
                ? "text-blue-400"
                : "text-slate-200"
              }
            `}
            style={{
              left: `${65 + entry.position * 40}px`,
              top: `${entry.stringIndex * 12 + 2}px`,
            }}
          >
            {entry.fret}
          </div>
        ))}
        
        {/* Measure line */}
        <div className="absolute right-4 top-2 bottom-2 w-px bg-slate-500" />
      </div>
    </div>
  );
}

// ============================================================================
// COMBINED STAFF + TAB VIEW
// ============================================================================

interface StaffTabViewProps {
  staffProps?: Partial<StaffProps>;
  tabProps?: Partial<TabProps>;
  showStaff?: boolean;
  showTab?: boolean;
}

export function StaffTabView({
  staffProps = {},
  tabProps = {},
  showStaff = true,
  showTab = true,
}: StaffTabViewProps) {
  return (
    <div className="space-y-2">
      {showStaff && <Staff {...staffProps} />}
      {showTab && <Tab {...tabProps} />}
    </div>
  );
}
