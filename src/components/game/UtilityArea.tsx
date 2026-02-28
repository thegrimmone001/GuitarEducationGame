"use client";

import { useState, useCallback } from "react";

// ============================================================================
// UTILITY AREA - TAB SYSTEM
// ============================================================================

/**
 * UtilityArea - Tabbed utility panel for gameplay tools
 * 
 * Tabs: Num / Note / Chord / Scale
 * 
 * Per spec:
 * - Num tab: 25-key (5×5) keypad with 0–24 only, instant selection
 * - Note tab: Display format, note visibility, tritone options
 * - Chord tab: Chord menus, extended highlighting (7/9/11/13), diagrams
 * - Scale tab: Scale/mode selection, degree/interval display
 */

type UtilityTab = "num" | "note" | "chord" | "scale";

interface UtilityAreaProps {
  activeTab?: UtilityTab;
  onTabChange?: (tab: UtilityTab) => void;
  onFretSelect?: (fret: number) => void;
  onNoteSelect?: (note: string) => void;
  selectedFret?: number;
  selectedNote?: string;
  noteDisplayMode?: "names" | "numbers" | "intervals" | "roman";
  noteVisibility?: "all" | "naturals" | "enharmonic";
  tritoneMode?: "tt" | "plus-minus" | "sharp-four" | "flat-five" | "auto";
  className?: string;
}

export function UtilityArea({
  activeTab = "num",
  onTabChange,
  onFretSelect,
  onNoteSelect,
  selectedFret,
  selectedNote,
  noteDisplayMode = "names",
  noteVisibility = "all",
  tritoneMode = "tt",
  className = "",
}: UtilityAreaProps) {
  const [internalTab, setInternalTab] = useState<UtilityTab>(activeTab);
  
  const currentTab = onTabChange ? activeTab : internalTab;
  const handleTabChange = useCallback((tab: UtilityTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  }, [onTabChange]);

  return (
    <div className={`bg-slate-800/50 rounded-lg overflow-hidden ${className}`}>
      {/* Tab Headers */}
      <div className="flex border-b border-slate-700">
        {(["num", "note", "chord", "scale"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors capitalize ${
              currentTab === tab
                ? "bg-slate-700 text-white border-b-2 border-blue-500"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {currentTab === "num" && (
          <NumTab
            onFretSelect={onFretSelect}
            selectedFret={selectedFret}
          />
        )}
        {currentTab === "note" && (
          <NoteTab
            onNoteSelect={onNoteSelect}
            selectedNote={selectedNote}
            displayMode={noteDisplayMode}
            visibility={noteVisibility}
            tritoneMode={tritoneMode}
          />
        )}
        {currentTab === "chord" && <ChordTab />}
        {currentTab === "scale" && <ScaleTab />}
      </div>
    </div>
  );
}

// ============================================================================
// NUM TAB - 5x5 KEYPAD (0-24)
// ============================================================================

interface NumTabProps {
  onFretSelect?: (fret: number) => void;
  selectedFret?: number;
}

function NumTab({ onFretSelect, selectedFret }: NumTabProps) {
  const handleFretClick = useCallback((fret: number) => {
    onFretSelect?.(fret);
  }, [onFretSelect]);

  // Build 5x5 grid (0-24)
  const frets = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div>
      <div className="text-xs text-slate-400 mb-3">
        Instant fret selection (0–24)
      </div>
      <div className="grid grid-cols-5 gap-1">
        {frets.map((fret) => (
          <button
            key={fret}
            onClick={() => handleFretClick(fret)}
            className={`
              h-10 rounded text-sm font-medium transition-all
              ${selectedFret === fret
                ? "bg-blue-600 text-white ring-2 ring-blue-400"
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }
            `}
          >
            {fret}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Click to select fret number for TAB entry
      </p>
    </div>
  );
}

// ============================================================================
// NOTE TAB - DISPLAY OPTIONS
// ============================================================================

interface NoteTabProps {
  onNoteSelect?: (note: string) => void;
  selectedNote?: string;
  displayMode: "names" | "numbers" | "intervals" | "roman";
  visibility: "all" | "naturals" | "enharmonic";
  tritoneMode: "tt" | "plus-minus" | "sharp-four" | "flat-five" | "auto";
}

const CHROMATIC_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NATURAL_NOTES = ["C", "D", "E", "F", "G", "A", "B"];

function NoteTab({
  onNoteSelect,
  selectedNote,
  displayMode,
  visibility,
  tritoneMode,
}: NoteTabProps) {
  const [internalDisplayMode, setInternalDisplayMode] = useState(displayMode);
  const [internalVisibility, setInternalVisibility] = useState(visibility);
  const [internalTritone, setInternalTritone] = useState(tritoneMode);

  const notes = internalVisibility === "naturals" ? NATURAL_NOTES : CHROMATIC_NOTES;

  return (
    <div className="space-y-4">
      {/* Display Format */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Display Format</label>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "names", label: "Names" },
            { id: "numbers", label: "Numbers" },
            { id: "intervals", label: "Intervals" },
            { id: "roman", label: "Roman" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setInternalDisplayMode(mode.id as typeof displayMode)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                internalDisplayMode === mode.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Note Visibility */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Note Visibility</label>
        <div className="flex gap-2">
          {[
            { id: "all", label: "All" },
            { id: "naturals", label: "Naturals" },
            { id: "enharmonic", label: "Enharmonic" },
          ].map((vis) => (
            <button
              key={vis.id}
              onClick={() => setInternalVisibility(vis.id as typeof visibility)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                internalVisibility === vis.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {vis.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tritone Options */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Tritone Display</label>
        <select
          value={internalTritone}
          onChange={(e) => setInternalTritone(e.target.value as typeof tritoneMode)}
          className="w-full py-2 px-3 rounded bg-slate-700 border border-slate-600 text-sm"
        >
          <option value="tt">TT</option>
          <option value="plus-minus">+/o (Interval Roman default)</option>
          <option value="sharp-four">#IV / +IV</option>
          <option value="flat-five">♭V / oV</option>
          <option value="auto">Auto (context)</option>
        </select>
      </div>

      {/* Note Selection */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Quick Note Select</label>
        <div className="grid grid-cols-6 gap-1">
          {notes.map((note) => (
            <button
              key={note}
              onClick={() => onNoteSelect?.(note)}
              className={`h-8 rounded text-xs font-medium transition-colors ${
                selectedNote === note
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              {note}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CHORD TAB - CHORD MENUS AND HIGHLIGHTING
// ============================================================================

function ChordTab() {
  const [selectedQuality, setSelectedQuality] = useState("maj");
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);
  const [showCaged, setShowCaged] = useState(true);

  const qualities = ["Maj", "Min", "Dim", "Aug", "Sus2", "Sus4", "Half-dim"];
  const extensions = ["♭5", "6", "♭7", "7", "maj7", "9", "11", "13"];

  const toggleExtension = (ext: string) => {
    setSelectedExtensions((prev) =>
      prev.includes(ext) ? prev.filter((e) => e !== ext) : [...prev, ext]
    );
  };

  return (
    <div className="space-y-4">
      {/* Chord Quality */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Chord Quality</label>
        <div className="flex gap-1 flex-wrap">
          {qualities.map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQuality(q.toLowerCase())}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                selectedQuality === q.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Extensions */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Extensions</label>
        <div className="flex gap-1 flex-wrap">
          {extensions.map((ext) => (
            <button
              key={ext}
              onClick={() => toggleExtension(ext)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                selectedExtensions.includes(ext)
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              {ext}
            </button>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Display Options</label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCaged}
            onChange={(e) => setShowCaged(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">Show CAGED diagrams</span>
        </label>
      </div>

      {/* Chord Diagram Placeholder */}
      <div className="bg-slate-900 rounded p-3 text-center">
        <div className="text-xs text-slate-500">
          Chord diagram will appear here
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCALE TAB - SCALE/MODE SELECTION
// ============================================================================

const SCALES = [
  { id: "chromatic", name: "Chromatic" },
  { id: "ionian", name: "Ionian (Major)" },
  { id: "dorian", name: "Dorian" },
  { id: "phrygian", name: "Phrygian" },
  { id: "lydian", name: "Lydian" },
  { id: "mixolydian", name: "Mixolydian" },
  { id: "aeolian", name: "Aeolian (Minor)" },
  { id: "locrian", name: "Locrian" },
  { id: "pentatonic-major", name: "Pentatonic Major" },
  { id: "pentatonic-minor", name: "Pentatonic Minor" },
  { id: "blues", name: "Blues" },
];

function ScaleTab() {
  const [selectedScale, setSelectedScale] = useState("ionian");
  const [showDegrees, setShowDegrees] = useState(true);
  const [showIntervals, setShowIntervals] = useState(false);

  return (
    <div className="space-y-4">
      {/* Scale Selection */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Scale / Mode</label>
        <select
          value={selectedScale}
          onChange={(e) => setSelectedScale(e.target.value)}
          className="w-full py-2 px-3 rounded bg-slate-700 border border-slate-600 text-sm"
        >
          {SCALES.map((scale) => (
            <option key={scale.id} value={scale.id}>
              {scale.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Options */}
      <div>
        <label className="block text-xs text-slate-400 mb-2">Display Options</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDegrees}
              onChange={(e) => setShowDegrees(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Show scale degrees</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showIntervals}
              onChange={(e) => setShowIntervals(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Show intervals</span>
          </label>
        </div>
      </div>

      {/* Scale Preview */}
      <div className="bg-slate-900 rounded p-3">
        <div className="text-xs text-slate-400 mb-2">Scale Notes</div>
        <div className="flex gap-1">
          {selectedScale === "ionian" && (
            <>
              {["C", "D", "E", "F", "G", "A", "B"].map((note, i) => (
                <div
                  key={note}
                  className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-xs font-medium"
                >
                  {showDegrees ? i + 1 : note}
                </div>
              ))}
            </>
          )}
          {selectedScale === "chromatic" && (
            <>
              {CHROMATIC_NOTES.map((note, i) => (
                <div
                  key={note}
                  className="w-6 h-8 rounded bg-slate-700 flex items-center justify-center text-xs"
                >
                  {note}
                </div>
              ))}
            </>
          )}
          {!["ionian", "chromatic"].includes(selectedScale) && (
            <div className="text-xs text-slate-500">
              Scale pattern preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
