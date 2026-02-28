"use client";

import { useState, useMemo, useCallback } from "react";
import { useGameEngine, useGameAudio } from "@/lib/guitar-game";
import { variantLabel } from "@/lib/guitar-game/music";
import {
  Difficulty,
  SlotType,
  PLAYER_MARKS,
} from "@/lib/guitar-game/types";
import { Fretboard } from "@/components/game/Fretboard";
import { ResultsScreen } from "@/components/game/ResultsScreen";
import { NoteRail } from "@/components/game/NoteRail";
import { StaffTabView } from "@/components/game/StaffTab";

// ============================================================================
// TYPES
// ============================================================================

type MenuItem = "single-player" | "multiplayer" | "education" | "settings" | "help" | "exit";
type SinglePlayerSubmenu = "main" | "free-play" | "challenge";
type MultiplayerSubmenu = "main" | "players" | "match-settings";
type GamePhase = "menu" | "playing" | "results";

// Surface types
type SurfaceType = "fretboard" | "staff" | "tab" | "noteRail";
type SurfaceRole = "prompt" | "mark" | "display" | "sam";
type Cardinality = "off" | "single" | "equivalents" | "all";

type SurfaceControlConfig = {
  prompt: boolean;
  mark: boolean;
  display: boolean;
  sam: boolean;
  cardinality: Cardinality;
};

type SurfaceControls = {
  [K in SurfaceType]: SurfaceControlConfig;
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
  const engine = useGameEngine();
  const audio = useGameAudio(engine.lastEffects, { enabled: true });

  // Menu state
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);
  const [singlePlayerSubmenu, setSinglePlayerSubmenu] = useState<SinglePlayerSubmenu>("main");
  const [multiplayerSubmenu, setMultiplayerSubmenu] = useState<MultiplayerSubmenu>("main");

  // Surface controls state
  const [surfaceControls, setSurfaceControls] = useState<SurfaceControls>({
    fretboard: { prompt: true, mark: true, display: true, sam: false, cardinality: "all" },
    staff: { prompt: false, mark: false, display: true, sam: false, cardinality: "off" },
    tab: { prompt: false, mark: false, display: true, sam: false, cardinality: "off" },
    noteRail: { prompt: true, mark: false, display: true, sam: false, cardinality: "single" },
  });

  // Timer settings
  const [timerSettings, setTimerSettings] = useState({
    mode: "turn-based" as "off" | "turn-based" | "continuous",
    turnSeconds: 10,
    timeBank: 0,
    runtimeCap: 0,
    addTimeOnCorrect: 0,
    subtractTimeOnMiss: 0,
  });

  // Dev mode settings
  const [devMode, setDevMode] = useState(false);
  const [devPaintMode, setDevPaintMode] = useState<"paint" | "erase">("paint");

  // Current prompt display
  const promptDisplay = engine.gameState
    ? variantLabel(engine.gameState.prompt.variantId)
    : "—";

  const currentPlayer = engine.gameState
    ? engine.players[engine.gameState.currentPlayer]
    : null;

  const showResults = engine.gameState?.phase === "RESULTS";

  const getPlayerColor = useCallback((colorId: number) => {
    const colors = [
      "#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6",
      "#ec4899", "#06b6d4", "#f97316", "#84cc16", "#6366f1",
      "#14b8a6", "#a855f7", "#eab308", "#10b981", "#0ea5e9", "#d946ef",
    ];
    return colors[colorId % colors.length];
  }, []);

  const handlePlayAgain = useCallback(() => {
    engine.endMatch();
    setTimeout(() => engine.startMatch(), 100);
  }, [engine]);

  const handleMainMenu = useCallback(() => {
    engine.endMatch();
    setActiveMenuItem(null);
    setSinglePlayerSubmenu("main");
    setMultiplayerSubmenu("main");
  }, [engine]);

  const handleStartMatch = useCallback(() => {
    audio.enableAudio();
    engine.startMatch();
  }, [audio, engine]);

  const handleCellTap = useCallback((stringIndex: number, fretIndex: number) => {
    audio.enableAudio();
    engine.tapCell(stringIndex, fretIndex);
  }, [audio, engine]);

  const claimsMap = useMemo(() => {
    const map = new Map<string, { playerId: number; isVulnerable: boolean; isConnectSegment: boolean }>();
    if (!engine.gameState) return map;

    const { board, cellCount, fretCount, players } = engine.gameState;

    for (let slot = 0; slot < 3; slot++) {
      for (let cellIdx = 0; cellIdx < cellCount; cellIdx++) {
        const ownerId = board.owner[slot as SlotType][cellIdx];
        if (ownerId >= 0) {
          const stringIndex = Math.floor(cellIdx / fretCount);
          const fretIndex = cellIdx % fretCount;
          const key = `${stringIndex}-${fretIndex}`;
          const playerIndex = players.findIndex(p => p.profile.id === ownerId);

          map.set(key, {
            playerId: playerIndex >= 0 ? playerIndex : 0,
            isVulnerable: board.vulnerable[slot as SlotType][cellIdx] === 1,
            isConnectSegment: board.connectClaimed[slot as SlotType][cellIdx] > 0,
          });
        }
      }
    }
    return map;
  }, [engine.gameState]);

  const playerColors = useMemo(() => {
    return engine.players.map((player) => getPlayerColor(player.colorId));
  }, [engine.players, getPlayerColor]);

  const gamePhase: GamePhase = engine.isPlaying
    ? (showResults ? "results" : "playing")
    : "menu";

  const handleMenuSelect = useCallback((item: MenuItem) => {
    if (item === "exit") {
      setActiveMenuItem(null);
      return;
    }
    setActiveMenuItem(item);
    setSinglePlayerSubmenu("main");
    setMultiplayerSubmenu("main");

    if (item === "education") {
      engine.setPlayType(1);
      audio.enableAudio();
      engine.startMatch();
    }
  }, [engine, audio]);

  const handleBack = useCallback(() => {
    if (activeMenuItem === "single-player" && singlePlayerSubmenu !== "main") {
      setSinglePlayerSubmenu("main");
      return;
    }
    if (activeMenuItem === "multiplayer" && multiplayerSubmenu !== "main") {
      setMultiplayerSubmenu("main");
      return;
    }
    setActiveMenuItem(null);
  }, [activeMenuItem, singlePlayerSubmenu, multiplayerSubmenu]);

  // Toggle surface control
  const toggleSurfaceControl = useCallback((surface: SurfaceType, role: SurfaceRole) => {
    setSurfaceControls(prev => ({
      ...prev,
      [surface]: {
        ...prev[surface],
        [role]: !prev[surface][role],
      },
    }));
  }, []);

  // Set cardinality
  const setCardinality = useCallback((surface: SurfaceType, cardinality: Cardinality) => {
    setSurfaceControls(prev => ({
      ...prev,
      [surface]: {
        ...prev[surface],
        cardinality,
      },
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-yellow-400" translate="no">GuitarEdu</h1>
        <div className="flex gap-3">
          <button className="px-4 py-1.5 text-sm rounded bg-slate-800 hover:bg-slate-700 transition-colors">Log In</button>
          <button className="px-4 py-1.5 text-sm rounded bg-blue-600 hover:bg-blue-500 transition-colors">Create Account</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {gamePhase === "menu" ? (
          <MenuScreen
            activeMenuItem={activeMenuItem}
            singlePlayerSubmenu={singlePlayerSubmenu}
            multiplayerSubmenu={multiplayerSubmenu}
            engine={engine}
            getPlayerColor={getPlayerColor}
            surfaceControls={surfaceControls}
            timerSettings={timerSettings}
            onMenuSelect={handleMenuSelect}
            onBack={handleBack}
            onSetSinglePlayerSubmenu={setSinglePlayerSubmenu}
            onSetMultiplayerSubmenu={setMultiplayerSubmenu}
            onStartMatch={handleStartMatch}
            onToggleSurfaceControl={toggleSurfaceControl}
            onSetCardinality={setCardinality}
            onTimerSettingsChange={setTimerSettings}
          />
        ) : gamePhase === "results" && engine.gameState ? (
          <ResultsScreen
            players={engine.gameState.players}
            playerColors={playerColors}
            totalRounds={engine.gameState.roundIndex}
            onPlayAgain={handlePlayAgain}
            onMainMenu={handleMainMenu}
          />
        ) : (
          <GameScreen
            engine={engine}
            promptDisplay={promptDisplay}
            currentPlayer={currentPlayer}
            getPlayerColor={getPlayerColor}
            claimsMap={claimsMap}
            playerColors={playerColors}
            surfaceControls={surfaceControls}
            timerSettings={timerSettings}
            onCellClick={handleCellTap}
            onMainMenu={handleMainMenu}
            onToggleSurfaceControl={toggleSurfaceControl}
            onSetCardinality={setCardinality}
            devMode={devMode}
            devPaintMode={devPaintMode}
            onSetDevMode={setDevMode}
            onSetDevPaintMode={setDevPaintMode}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between px-6 py-2 border-t border-slate-800 text-xs text-slate-500">
        <div className="text-blue-400">ALERTS</div>
        <div>Build 01_28_26_001</div>
      </footer>
    </div>
  );
}

// ============================================================================
// MENU SCREEN
// ============================================================================

interface MenuScreenProps {
  activeMenuItem: MenuItem | null;
  singlePlayerSubmenu: SinglePlayerSubmenu;
  multiplayerSubmenu: MultiplayerSubmenu;
  engine: ReturnType<typeof useGameEngine>;
  getPlayerColor: (colorId: number) => string;
  surfaceControls: SurfaceControls;
  timerSettings: typeof timerSettings;
  onMenuSelect: (item: MenuItem) => void;
  onBack: () => void;
  onSetSinglePlayerSubmenu: (submenu: SinglePlayerSubmenu) => void;
  onSetMultiplayerSubmenu: (submenu: MultiplayerSubmenu) => void;
  onStartMatch: () => void;
  onToggleSurfaceControl: (surface: SurfaceType, role: SurfaceRole) => void;
  onSetCardinality: (surface: SurfaceType, cardinality: Cardinality) => void;
  onTimerSettingsChange: (settings: typeof timerSettings) => void;
}

function MenuScreen({
  activeMenuItem,
  singlePlayerSubmenu,
  multiplayerSubmenu,
  engine,
  getPlayerColor,
  surfaceControls,
  timerSettings,
  onMenuSelect,
  onBack,
  onSetSinglePlayerSubmenu,
  onSetMultiplayerSubmenu,
  onStartMatch,
  onToggleSurfaceControl,
  onSetCardinality,
  onTimerSettingsChange,
}: MenuScreenProps) {
  return (
    <div className="flex-1 flex">
      {/* Left Sidebar Menu */}
      <nav className="w-56 bg-[#1a1a1a] border-r border-slate-800 p-4">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-4">Menu</div>
        <div className="space-y-1">
          {[
            { id: "single-player" as MenuItem, label: "Single Player" },
            { id: "multiplayer" as MenuItem, label: "Multiplayer" },
            { id: "education" as MenuItem, label: "Education" },
            { id: "settings" as MenuItem, label: "Settings" },
            { id: "help" as MenuItem, label: "FAQ / Help" },
            { id: "exit" as MenuItem, label: "Exit" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onMenuSelect(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded transition-colors ${
                activeMenuItem === item.id ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {!activeMenuItem ? (
          <WelcomePanel />
        ) : activeMenuItem === "single-player" ? (
          <SinglePlayerPanel
            submenu={singlePlayerSubmenu}
            engine={engine}
            surfaceControls={surfaceControls}
            timerSettings={timerSettings}
            onBack={onBack}
            onSetSubmenu={onSetSinglePlayerSubmenu}
            onStartMatch={onStartMatch}
            onToggleSurfaceControl={onToggleSurfaceControl}
            onSetCardinality={onSetCardinality}
            onTimerSettingsChange={onTimerSettingsChange}
          />
        ) : activeMenuItem === "multiplayer" ? (
          <MultiplayerPanel
            submenu={multiplayerSubmenu}
            engine={engine}
            getPlayerColor={getPlayerColor}
            surfaceControls={surfaceControls}
            timerSettings={timerSettings}
            onBack={onBack}
            onSetSubmenu={onSetMultiplayerSubmenu}
            onStartMatch={onStartMatch}
            onToggleSurfaceControl={onToggleSurfaceControl}
            onSetCardinality={onSetCardinality}
            onTimerSettingsChange={onTimerSettingsChange}
          />
        ) : activeMenuItem === "settings" ? (
          <SettingsPanel 
            engine={engine} 
            surfaceControls={surfaceControls} 
            onBack={onBack} 
            onToggleSurfaceControl={onToggleSurfaceControl} 
            onSetCardinality={onSetCardinality}
            devMode={devMode}
            onSetDevMode={setDevMode}
          />
        ) : activeMenuItem === "help" ? (
          <HelpPanel onBack={onBack} />
        ) : null}
      </div>
    </div>
  );
}

// ============================================================================
// WELCOME PANEL
// ============================================================================

function WelcomePanel() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4" translate="no">Welcome to GuitarEdu</h2>
        <p className="text-slate-400 max-w-md">Interactive guitar learning games for smart-boards. Select a menu option from the left to begin.</p>
      </div>
    </div>
  );
}

// ============================================================================
// SINGLE PLAYER PANEL
// ============================================================================

interface SinglePlayerPanelProps {
  submenu: SinglePlayerSubmenu;
  engine: ReturnType<typeof useGameEngine>;
  surfaceControls: SurfaceControls;
  timerSettings: typeof timerSettings;
  onBack: () => void;
  onSetSubmenu: (submenu: SinglePlayerSubmenu) => void;
  onStartMatch: () => void;
  onToggleSurfaceControl: (surface: SurfaceType, role: SurfaceRole) => void;
  onSetCardinality: (surface: SurfaceType, cardinality: Cardinality) => void;
  onTimerSettingsChange: (settings: typeof timerSettings) => void;
}

function SinglePlayerPanel({ submenu, engine, surfaceControls, timerSettings, onBack, onSetSubmenu, onStartMatch, onToggleSurfaceControl, onSetCardinality, onTimerSettingsChange }: SinglePlayerPanelProps) {
  if (submenu === "main") {
    return (
      <div className="max-w-lg">
        <h2 className="text-2xl font-bold mb-6" translate="no">Single Player</h2>
        <div className="space-y-3">
          <button onClick={() => engine.startMatch()} className="w-full p-6 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors">
            <div className="font-semibold text-lg" translate="no">Free Play</div>
            <p className="text-slate-400 text-sm mt-1">Practice without timers or scoring</p>
          </button>
          <button onClick={() => onSetSubmenu("challenge")} className="w-full p-6 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors">
            <div className="font-semibold text-lg" translate="no">Challenge</div>
            <p className="text-slate-400 text-sm mt-1">Timed gameplay with scoring and achievements</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <MatchSettingsPanel
      engine={engine}
      surfaceControls={surfaceControls}
      timerSettings={timerSettings}
      onBack={onBack}
      onStartMatch={onStartMatch}
      title="Challenge Mode"
      onToggleSurfaceControl={onToggleSurfaceControl}
      onSetCardinality={onSetCardinality}
      onTimerSettingsChange={onTimerSettingsChange}
    />
  );
}

// ============================================================================
// MULTIPLAYER PANEL
// ============================================================================

interface MultiplayerPanelProps {
  submenu: MultiplayerSubmenu;
  engine: ReturnType<typeof useGameEngine>;
  getPlayerColor: (colorId: number) => string;
  surfaceControls: SurfaceControls;
  timerSettings: typeof timerSettings;
  onBack: () => void;
  onSetSubmenu: (submenu: MultiplayerSubmenu) => void;
  onStartMatch: () => void;
  onToggleSurfaceControl: (surface: SurfaceType, role: SurfaceRole) => void;
  onSetCardinality: (surface: SurfaceType, cardinality: Cardinality) => void;
  onTimerSettingsChange: (settings: typeof timerSettings) => void;
}

function MultiplayerPanel({ submenu, engine, getPlayerColor, surfaceControls, timerSettings, onBack, onSetSubmenu, onStartMatch, onToggleSurfaceControl, onSetCardinality, onTimerSettingsChange }: MultiplayerPanelProps) {
  if (submenu === "main") {
    return (
      <div className="max-w-lg">
        <h2 className="text-2xl font-bold mb-6" translate="no">Multiplayer</h2>
        <p className="text-slate-400 mb-6">Compete with friends on the same device. Take turns finding notes on the fretboard.</p>
        <button onClick={() => onSetSubmenu("players")} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
          Add Players
        </button>
      </div>
    );
  }

  if (submenu === "players") {
    return (
      <PlayerSetupPanel
        engine={engine}
        getPlayerColor={getPlayerColor}
        onBack={onBack}
        onContinue={() => onSetSubmenu("match-settings")}
      />
    );
  }

  return (
    <MatchSettingsPanel
      engine={engine}
      surfaceControls={surfaceControls}
      timerSettings={timerSettings}
      onBack={onBack}
      onStartMatch={onStartMatch}
      title="Match Settings"
      isMultiplayer
      onToggleSurfaceControl={onToggleSurfaceControl}
      onSetCardinality={onSetCardinality}
      onTimerSettingsChange={onTimerSettingsChange}
    />
  );
}

// ============================================================================
// PLAYER SETUP PANEL
// ============================================================================

// Available player colors
const PLAYER_COLORS = [
  "#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#f97316", "#84cc16", "#6366f1",
  "#14b8a6", "#a855f7", "#eab308", "#10b981", "#0ea5e9", "#d946ef",
];

function PlayerSetupPanel({ engine, getPlayerColor, onBack, onContinue }: { engine: ReturnType<typeof useGameEngine>; getPlayerColor: (colorId: number) => string; onBack: () => void; onContinue: () => void }) {
  const [colorPickerFor, setColorPickerFor] = useState<number | null>(null);

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-6" translate="no">Players</h2>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-slate-400">Number of Players:</span>
        <div className="flex items-center gap-2">
          <button onClick={() => engine.setPlayerCount(Math.max(2, engine.players.length - 1))} disabled={engine.players.length <= 2} className="w-10 h-10 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-xl">−</button>
          <span className="w-12 text-center text-xl font-bold">{engine.players.length}</span>
          <button onClick={() => engine.setPlayerCount(Math.min(8, engine.players.length + 1))} disabled={engine.players.length >= 8} className="w-10 h-10 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-xl">+</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {engine.players.map((player, i) => (
          <div key={player.id} className="relative">
            <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-3">
              {/* Clickable color icon */}
              <button
                onClick={() => setColorPickerFor(colorPickerFor === player.id ? null : player.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-white/50 transition-all"
                style={{ backgroundColor: getPlayerColor(player.colorId) }}
                title="Click to change color"
              >
                {engine.settings.accessibility.colorBlindMode ? PLAYER_MARKS[player.colorId % PLAYER_MARKS.length] : "●"}
              </button>
              <input
                type="text"
                value={player.name}
                onChange={(e) => engine.setPlayerName(player.id, e.target.value)}
                className="flex-1 bg-transparent border border-slate-700 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
                placeholder={`Player ${i + 1}`}
                maxLength={16}
              />
            </div>
            {/* Color picker dropdown */}
            {colorPickerFor === player.id && (
              <div className="absolute top-full left-0 mt-1 z-20 bg-slate-900 border border-slate-700 rounded-lg p-2 shadow-xl">
                <div className="text-xs text-slate-400 mb-2 px-1">Select Color</div>
                <div className="grid grid-cols-8 gap-1">
                  {PLAYER_COLORS.map((color, colorIdx) => (
                    <button
                      key={colorIdx}
                      onClick={() => {
                        engine.setPlayerColor(player.id, colorIdx);
                        setColorPickerFor(null);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 ${player.colorId === colorIdx ? 'ring-2 ring-white' : ''}`}
                      style={{ backgroundColor: color }}
                    >
                      {engine.settings.accessibility.colorBlindMode ? PLAYER_MARKS[colorIdx % PLAYER_MARKS.length] : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Click outside to close color picker */}
      {colorPickerFor !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setColorPickerFor(null)} />
      )}
      <div className="flex gap-4">
        <button onClick={onBack} className="px-6 py-2.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors">Back</button>
        <button onClick={onContinue} className="px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">Continue to Match Settings</button>
      </div>
    </div>
  );
}

// ============================================================================
// MATCH SETTINGS PANEL
// ============================================================================

interface MatchSettingsPanelProps {
  engine: ReturnType<typeof useGameEngine>;
  surfaceControls: SurfaceControls;
  timerSettings: typeof timerSettings;
  onBack: () => void;
  onStartMatch: () => void;
  title: string;
  isMultiplayer?: boolean;
  onToggleSurfaceControl: (surface: SurfaceType, role: SurfaceRole) => void;
  onSetCardinality: (surface: SurfaceType, cardinality: Cardinality) => void;
  onTimerSettingsChange: (settings: typeof timerSettings) => void;
}

function MatchSettingsPanel({ engine, surfaceControls, timerSettings, onBack, onStartMatch, title, isMultiplayer = false, onToggleSurfaceControl, onSetCardinality, onTimerSettingsChange }: MatchSettingsPanelProps) {
  const [advancedSection, setAdvancedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => setAdvancedSection(prev => prev === section ? null : section);

  return (
    <div className="max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold" translate="no">{title}</h2>

      {/* Basic Match Settings */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Basic Match Settings</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Learning Type */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Learning Type</label>
            <select className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
              <option>Single Note</option>
              <option>Intervals</option>
              <option>Chords</option>
              <option>Scales</option>
              <option>Arpeggios</option>
            </select>
          </div>

          {/* Key */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Key</label>
            <select value={engine.settings.promptProfileId} onChange={(e) => engine.updateSettings({ promptProfileId: e.target.value })} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
              <option value="chromatic">Chromatic</option>
              <option value="key:C:maj">C Major</option>
              <option value="key:G:maj">G Major</option>
              <option value="key:D:maj">D Major</option>
              <option value="key:A:maj">A Major</option>
              <option value="key:E:maj">E Major</option>
              <option value="key:F:maj">F Major</option>
              <option value="key:A:min">A Minor</option>
              <option value="key:E:min">E Minor</option>
            </select>
          </div>

          {/* Pitch Framework */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Pitch Framework</label>
            <select className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
              <option>Chromatic</option>
              <option>Ionian (Major)</option>
              <option>Dorian</option>
              <option>Phrygian</option>
              <option>Lydian</option>
              <option>Mixolydian</option>
              <option>Aeolian (Minor)</option>
              <option>Locrian</option>
              <option>Pentatonic</option>
              <option>Blues</option>
            </select>
          </div>

          {/* Fret Range */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Fret Range</label>
            <div className="flex gap-2">
              <input type="number" defaultValue={0} min={0} max={24} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" placeholder="Min" />
              <input type="number" defaultValue={12} min={0} max={24} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" placeholder="Max" />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Difficulty</label>
            <select value={engine.settings.difficulty} onChange={(e) => engine.setDifficulty(e.target.value as Difficulty)} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
              <option value={Difficulty.LEARNING}>Learning</option>
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
            </select>
          </div>

          {/* Accidentals */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Accidentals</label>
            <div className="flex gap-4 py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Naturals</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Sharps</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Flats</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Match Settings Accordion */}
      <div className="bg-slate-800/50 rounded-lg overflow-hidden">
        {/* Instrument Section */}
        <button onClick={() => toggleSection("instrument")} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors">
          <span className="font-semibold text-slate-300">1. Instrument</span>
          <span className="text-slate-400">{advancedSection === "instrument" ? "▼" : "▶"}</span>
        </button>
        {advancedSection === "instrument" && (
          <div className="px-6 pb-6 border-t border-slate-700 pt-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Instrument</label>
                <select className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
                  <option>Guitar</option>
                  <option>Bass</option>
                  <option>Ukulele</option>
                  <option>Banjo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Tuning</label>
                <select className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
                  <option>Standard</option>
                  <option>Drop D</option>
                  <option>Open G</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Strings</label>
                <div className="flex gap-1">
                  {[6, 5, 4, 3, 2, 1].map((s) => (
                    <button key={s} className="w-8 h-8 rounded bg-blue-600 text-sm font-medium">{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Span</label>
                <input type="number" defaultValue={12} min={1} max={24} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" />
              </div>
            </div>
          </div>
        )}

        {/* Presets Section */}
        <button onClick={() => toggleSection("presets")} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors border-t border-slate-700">
          <span className="font-semibold text-slate-300">2. Presets (A-J)</span>
          <span className="text-slate-400">{advancedSection === "presets" ? "▼" : "▶"}</span>
        </button>
        {advancedSection === "presets" && (
          <div className="px-6 pb-6 border-t border-slate-700 pt-4">
            <div className="flex gap-2">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((preset) => (
                <button key={preset} className="w-10 h-10 rounded bg-slate-700 hover:bg-slate-600 text-sm font-medium">{preset}</button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">Surface configuration shortcuts. Do not alter Basic Match Settings.</p>
          </div>
        )}

        {/* Input Method Section */}
        <button onClick={() => toggleSection("input")} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors border-t border-slate-700">
          <span className="font-semibold text-slate-300">3. Input Method</span>
          <span className="text-slate-400">{advancedSection === "input" ? "▼" : "▶"}</span>
        </button>
        {advancedSection === "input" && (
          <div className="px-6 pb-6 border-t border-slate-700 pt-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="inputMethod" defaultChecked className="w-4 h-4" />
                <span>Single-Note Input</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="inputMethod" className="w-4 h-4" />
                <span>Shape Placement</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="inputMethod" className="w-4 h-4" />
                <span>Pattern Placement</span>
              </label>
            </div>
          </div>
        )}

        {/* Surface Controls Section */}
        <button onClick={() => toggleSection("surface")} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors border-t border-slate-700">
          <span className="font-semibold text-slate-300">4. Surface Controls</span>
          <span className="text-slate-400">{advancedSection === "surface" ? "▼" : "▶"}</span>
        </button>
        {advancedSection === "surface" && (
          <div className="px-6 pb-6 border-t border-slate-700 pt-4">
            <p className="text-xs text-slate-500 mb-4">Surface activity is implicit. If no controls are checked, the surface is inactive.</p>
            <div className="grid grid-cols-5 gap-4">
              {/* Header */}
              <div></div>
              <div className="text-xs text-slate-400 text-center">Prompt</div>
              <div className="text-xs text-slate-400 text-center">Mark</div>
              <div className="text-xs text-slate-400 text-center">Display</div>
              <div className="text-xs text-slate-400 text-center">SAM</div>
              
              {/* Fretboard */}
              <div className="text-sm">Fretboard</div>
              {(["prompt", "mark", "display", "sam"] as SurfaceRole[]).map((role) => (
                <div key={role} className="flex justify-center">
                  <input type="checkbox" checked={surfaceControls.fretboard[role]} onChange={() => onToggleSurfaceControl("fretboard", role)} className="w-5 h-5 rounded" />
                </div>
              ))}
              
              {/* Staff */}
              <div className="text-sm">Staff</div>
              {(["prompt", "mark", "display", "sam"] as SurfaceRole[]).map((role) => (
                <div key={role} className="flex justify-center">
                  <input type="checkbox" checked={surfaceControls.staff[role]} onChange={() => onToggleSurfaceControl("staff", role)} className="w-5 h-5 rounded" />
                </div>
              ))}
              
              {/* Tab */}
              <div className="text-sm">TAB</div>
              {(["prompt", "mark", "display", "sam"] as SurfaceRole[]).map((role) => (
                <div key={role} className="flex justify-center">
                  <input type="checkbox" checked={surfaceControls.tab[role]} onChange={() => onToggleSurfaceControl("tab", role)} className="w-5 h-5 rounded" />
                </div>
              ))}
              
              {/* Note Rail */}
              <div className="text-sm">Note Rail</div>
              {(["prompt", "mark", "display", "sam"] as SurfaceRole[]).map((role) => (
                <div key={role} className="flex justify-center">
                  <input type="checkbox" checked={surfaceControls.noteRail[role]} onChange={() => onToggleSurfaceControl("noteRail", role)} className="w-5 h-5 rounded" />
                </div>
              ))}
            </div>

            {/* Cardinality */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Cardinality</h4>
              <div className="grid grid-cols-5 gap-4">
                <div></div>
                {["Off", "Single", "Equivalents", "All"].map((card) => (
                  <div key={card} className="text-xs text-slate-400 text-center">{card}</div>
                ))}
                
                {(["fretboard", "staff", "tab", "noteRail"] as SurfaceType[]).map((surface) => (
                  <div key={surface} className="contents">
                    <div className="text-sm capitalize">{surface === "noteRail" ? "Note Rail" : surface}</div>
                    {(["off", "single", "equivalents", "all"] as Cardinality[]).map((card) => (
                      <div key={card} className="flex justify-center">
                        <input type="radio" name={`cardinality-${surface}`} checked={surfaceControls[surface].cardinality === card} onChange={() => onSetCardinality(surface, card)} className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timers & Rules Section */}
        <button onClick={() => toggleSection("timers")} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors border-t border-slate-700">
          <span className="font-semibold text-slate-300">5. Timers & Rules</span>
          <span className="text-slate-400">{advancedSection === "timers" ? "▼" : "▶"}</span>
        </button>
        {advancedSection === "timers" && (
          <div className="px-6 pb-6 border-t border-slate-700 pt-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Timer Model</label>
                <select value={timerSettings.mode} onChange={(e) => onTimerSettingsChange({ ...timerSettings, mode: e.target.value as typeof timerSettings.mode })} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
                  <option value="off">Off</option>
                  <option value="turn-based">Turn Window</option>
                  <option value="continuous">Time Bank</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Time per Turn (sec)</label>
                <input type="number" value={timerSettings.turnSeconds} onChange={(e) => onTimerSettingsChange({ ...timerSettings, turnSeconds: parseInt(e.target.value) || 0 })} min={0} max={120} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Time Bank (sec)</label>
                <input type="number" value={timerSettings.timeBank} onChange={(e) => onTimerSettingsChange({ ...timerSettings, timeBank: parseInt(e.target.value) || 0 })} min={0} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Runtime Cap (min)</label>
                <input type="number" value={timerSettings.runtimeCap} onChange={(e) => onTimerSettingsChange({ ...timerSettings, runtimeCap: parseInt(e.target.value) || 0 })} min={0} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Add Time on Correct</label>
                <input type="number" value={timerSettings.addTimeOnCorrect} onChange={(e) => onTimerSettingsChange({ ...timerSettings, addTimeOnCorrect: parseInt(e.target.value) || 0 })} min={0} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Subtract Time on Miss</label>
                <input type="number" value={timerSettings.subtractTimeOnMiss} onChange={(e) => onTimerSettingsChange({ ...timerSettings, subtractTimeOnMiss: parseInt(e.target.value) || 0 })} min={0} className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700" />
              </div>
            </div>
          </div>
        )}

        {/* Player / Board Options Section */}
        <button onClick={() => toggleSection("board")} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors border-t border-slate-700">
          <span className="font-semibold text-slate-300">6. Player / Board Options</span>
          <span className="text-slate-400">{advancedSection === "board" ? "▼" : "▶"}</span>
        </button>
        {advancedSection === "board" && (
          <div className="px-6 pb-6 border-t border-slate-700 pt-4">
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="boardType" defaultChecked className="w-4 h-4" />
                <span>Shared Board</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="boardType" className="w-4 h-4" />
                <span>Player Boards</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={onBack} className="px-6 py-2.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors">Back</button>
        <button onClick={onStartMatch} className="px-6 py-2.5 rounded bg-green-600 hover:bg-green-500 font-semibold transition-colors">Start Match</button>
      </div>
    </div>
  );
}

// ============================================================================
// SETTINGS PANEL
// ============================================================================

function SettingsPanel({ engine, surfaceControls, onBack, onToggleSurfaceControl, onSetCardinality, devMode, onSetDevMode }: { 
  engine: ReturnType<typeof useGameEngine>; 
  surfaceControls: SurfaceControls; 
  onBack: () => void; 
  onToggleSurfaceControl: (surface: SurfaceType, role: SurfaceRole) => void; 
  onSetCardinality: (surface: SurfaceType, cardinality: Cardinality) => void;
  devMode: boolean;
  onSetDevMode: (enabled: boolean) => void;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6" translate="no">Settings</h2>
      <div className="space-y-4">
        {/* Dev Mode Toggle */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-slate-300">Developer Mode</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={devMode} 
              onChange={(e) => onSetDevMode(e.target.checked)} 
              className="w-5 h-5 rounded" 
            />
            <span>Enable Dev Mode</span>
          </label>
          <p className="text-xs text-slate-500 mt-2">Dev Mode provides testing tools for game development and debugging.</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-slate-300">Accessibility</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={engine.settings.accessibility.colorBlindMode} onChange={(e) => engine.updateSettings({ accessibility: { ...engine.settings.accessibility, colorBlindMode: e.target.checked } })} className="w-5 h-5 rounded" />
            <span>Color-blind mode (use symbols)</span>
          </label>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-slate-300">Audio</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            <span>Sound effects</span>
          </label>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-slate-300">Display</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Note Display</label>
              <select className="w-full py-2 px-3 rounded bg-slate-800 border border-slate-700">
                <option>Note Names</option>
                <option>Numbers</option>
                <option>Intervals</option>
                <option>Interval Roman</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors">Back</button>
    </div>
  );
}

// ============================================================================
// HELP PANEL
// ============================================================================

function HelpPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6" translate="no">FAQ / Help</h2>
      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-slate-300">How to Play</h3>
          <p className="text-slate-400 text-sm">When a note appears on screen, click the correct location on the fretboard to claim it. Earn points for correct answers. In multiplayer, players take turns and compete for the highest score.</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-slate-300">Surface Controls</h3>
          <p className="text-slate-400 text-sm"><strong>Prompt:</strong> Where the target is shown. <strong>Mark:</strong> Where you can input answers. <strong>Display:</strong> What surfaces are visible. <strong>SAM:</strong> Show All Matches helper.</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-slate-300">Cardinality</h3>
          <p className="text-slate-400 text-sm"><strong>Off:</strong> No interaction. <strong>Single:</strong> One answer required. <strong>Equivalents:</strong> All enharmonic equivalents. <strong>All:</strong> All instances on the surface.</p>
        </div>
      </div>
      <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors">Back</button>
    </div>
  );
}

// ============================================================================
// GAME SCREEN
// ============================================================================

interface GameScreenProps {
  engine: ReturnType<typeof useGameEngine>;
  promptDisplay: string;
  currentPlayer: { id: number; name: string; colorId: number } | null;
  getPlayerColor: (colorId: number) => string;
  claimsMap: Map<string, { playerId: number; isVulnerable: boolean; isConnectSegment: boolean }>;
  playerColors: string[];
  surfaceControls: SurfaceControls;
  timerSettings: typeof timerSettings;
  onCellClick: (stringIndex: number, fretIndex: number) => void;
  onMainMenu: () => void;
  onToggleSurfaceControl: (surface: SurfaceType, role: SurfaceRole) => void;
  onSetCardinality: (surface: SurfaceType, cardinality: Cardinality) => void;
  devMode: boolean;
  devPaintMode: "paint" | "erase";
  onSetDevMode: (enabled: boolean) => void;
  onSetDevPaintMode: (mode: "paint" | "erase") => void;
}

function GameScreen({ engine, promptDisplay, currentPlayer, getPlayerColor, claimsMap, playerColors, surfaceControls, timerSettings, onCellClick, onMainMenu, onToggleSurfaceControl, onSetCardinality, devMode, devPaintMode, onSetDevMode, onSetDevPaintMode }: GameScreenProps) {
  const gameState = engine.gameState;
  if (!gameState) return null;

  const isInMatch = gameState.phase === "IN_MATCH";
  const isIntermission = gameState.phase === "INTERMISSION";

  return (
    <div className="flex-1 flex">
      {/* Left Sidebar - Operations & Teaching Controls */}
      <div className="w-56 bg-[#1a1a1a] border-r border-slate-800 p-3 overflow-y-auto flex flex-col">
        {/* Compact Prompt Display */}
        <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
          <div className="text-xs text-slate-500 mb-1">Find:</div>
          <div className="text-4xl font-bold text-blue-400 text-center">{promptDisplay}</div>
          <div className="text-xs text-slate-400 text-center mt-1">
            Round {gameState.roundIndex} • Turn {gameState.turnCounter}
          </div>
          {engine.callout && <div className="mt-2 text-sm font-bold text-yellow-400 text-center animate-pulse">{engine.callout}</div>}
        </div>

        {/* Operations */}
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Operations</div>
        <div className="space-y-1 mb-4">
          <button onClick={onMainMenu} className="w-full flex items-center gap-2 px-3 py-2 rounded bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>End
          </button>
          <button onClick={() => { onMainMenu(); setTimeout(() => engine.startMatch(), 100); }} className="w-full flex items-center gap-2 px-3 py-2 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 transition-colors text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>New
          </button>
        </div>

        {/* Task Context - Compact */}
        <div className="mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Context</div>
          <div className="text-xs bg-slate-800/50 rounded p-2 space-y-0.5">
            <div className="flex justify-between"><span className="text-slate-400">Target:</span><span>Single Note</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Input:</span><span>Fretboard</span></div>
          </div>
        </div>

        {/* Teaching Controls - Compact */}
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Teaching</div>
        <div className="space-y-2 mb-4">
          <select className="w-full py-1 px-2 text-xs rounded bg-slate-800 border border-slate-700">
            <option>Note Names</option>
            <option>Numbers</option>
            <option>Intervals</option>
          </select>
        </div>

        {/* Quick Surface Controls */}
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Surfaces</div>
        <div className="space-y-1 mb-4">
          {(["fretboard", "staff", "tab", "noteRail"] as SurfaceType[]).map((surface) => (
            <div key={surface} className="flex items-center justify-between text-xs">
              <span className="capitalize">{surface === "noteRail" ? "Rail" : surface}</span>
              <div className="flex gap-0.5">
                {(["P", "M", "D", "S"] as const).map((letter, idx) => {
                  const role = (["prompt", "mark", "display", "sam"] as SurfaceRole[])[idx];
                  return (
                    <button
                      key={role}
                      onClick={() => onToggleSurfaceControl(surface, role)}
                      className={`w-5 h-5 rounded text-[10px] font-medium ${surfaceControls[surface][role] ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-400"}`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Cardinality - Compact */}
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cardinality</div>
        <div className="grid grid-cols-4 gap-1 mb-4">
          {(["off", "single", "equivalents", "all"] as Cardinality[]).map((card) => (
            <button
              key={card}
              onClick={() => onSetCardinality("fretboard", card)}
              className={`py-1 text-[10px] rounded ${surfaceControls.fretboard.cardinality === card ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-400"}`}
            >
              {card.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Turn Stats */}
        <div className="mt-auto bg-slate-800/50 rounded p-2">
          <div className="text-xs text-slate-500 mb-1">Stats</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>✓ <span className="text-green-400">{gameState.turn.correctCount}</span></div>
            <div>✗ <span className="text-red-400">{gameState.turn.wrongCount}</span></div>
            <div>🔥 <span className="text-yellow-400">{gameState.turn.streakCount}</span></div>
            <div>📊 <span>{Math.round((gameState.variants.claimedRequired / gameState.variants.requiredTotal) * 100)}%</span></div>
          </div>
        </div>

        {/* Phase indicator */}
        <div className="mt-2 text-center">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            gameState.phase === "IN_MATCH" ? "bg-green-600/30 text-green-400" : 
            gameState.phase === "INTERMISSION" ? "bg-yellow-600/30 text-yellow-400" : 
            gameState.phase === "BONUS" ? "bg-purple-600/30 text-purple-400" : 
            gameState.phase === "LAST_CHANCE" ? "bg-red-600/30 text-red-400" : "bg-slate-700 text-slate-400"
          }`}>
            {gameState.phase.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 p-3 flex flex-col overflow-hidden">
        {/* Top row: Staff + Tab */}
        {(surfaceControls.staff.display || surfaceControls.tab.display) && (
          <div className="mb-2">
            <StaffTabView
              showStaff={surfaceControls.staff.display}
              showTab={surfaceControls.tab.display}
              staffProps={{ 
                showLabels: engine.settings.difficulty === "learning",
                interactive: surfaceControls.staff.mark,
              }}
              tabProps={{ 
                interactive: surfaceControls.tab.mark,
              }}
            />
          </div>
        )}

        {/* Note Rail - Compact */}
        {surfaceControls.noteRail.display && (
          <div className="mb-2">
            <NoteRail
              promptVariantId={isInMatch ? gameState.prompt.variantId : null}
              interactive={surfaceControls.noteRail.mark}
              displayMode="names"
              showAccidentals={["naturals", "sharps", "flats"]}
              cardinality={surfaceControls.noteRail.cardinality}
              onCellTap={isInMatch && surfaceControls.noteRail.mark ? onCellClick : undefined}
              enabledStrings={[...gameState.settings.domain.enabledStrings]}
              minFret={gameState.settings.domain.minFret}
              maxFret={gameState.settings.domain.maxFret}
            />
          </div>
        )}

        {/* Fretboard - Main focus */}
        {surfaceControls.fretboard.display && (
          <div className="flex-1 min-h-0">
            <Fretboard
              fretCount={gameState.fretCount}
              minFret={gameState.settings.domain.minFret}
              maxFret={gameState.settings.domain.maxFret}
              enabledStrings={[...gameState.settings.domain.enabledStrings]}
              promptVariantId={isInMatch ? gameState.prompt.variantId : null}
              claims={claimsMap}
              playerColors={playerColors}
              showLabels={gameState.settings.difficulty === "learning"}
              difficulty={gameState.settings.difficulty}
              onCellClick={isInMatch && surfaceControls.fretboard.mark ? onCellClick : undefined}
              interactive={isInMatch && surfaceControls.fretboard.mark}
              currentPlayerIndex={gameState.currentPlayer}
              colorBlindMode={engine.settings.accessibility.colorBlindMode}
              showPrompt={surfaceControls.fretboard.prompt}
              cardinality={surfaceControls.fretboard.cardinality}
            />
          </div>
        )}

        {/* Dev Tools Panel - Bottom */}
        {devMode && (
          <div className="mt-2 bg-purple-900/30 border border-purple-500/50 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 text-xs font-semibold">🔧 Dev Tools</span>
              <button onClick={() => onSetDevMode(false)} className="ml-auto text-xs text-slate-400 hover:text-white">Disable</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={gameState.currentPlayer}
                onChange={(e) => engine.devSetCurrentPlayer(parseInt(e.target.value))}
                className="py-1 px-2 text-xs rounded bg-slate-800 border border-slate-700"
              >
                {gameState.players.map((p, i) => (
                  <option key={p.profile.id} value={i}>{p.profile.name}</option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  const phase = e.target.value as "IN_MATCH" | "INTERMISSION" | "BONUS" | "LAST_CHANCE" | "RESULTS";
                  if (phase) engine.devForcePhase(phase);
                }}
                className="py-1 px-2 text-xs rounded bg-slate-800 border border-slate-700"
              >
                <option value="">Force Phase...</option>
                <option value="IN_MATCH">In Match</option>
                <option value="INTERMISSION">Intermission</option>
                <option value="BONUS">Bonus</option>
                <option value="LAST_CHANCE">Last Chance</option>
                <option value="RESULTS">Results</option>
              </select>
              <div className="flex gap-1">
                <button onClick={() => onSetDevPaintMode("paint")} className={`px-2 py-1 text-xs rounded ${devPaintMode === "paint" ? "bg-green-600" : "bg-slate-700"}`}>Paint</button>
                <button onClick={() => onSetDevPaintMode("erase")} className={`px-2 py-1 text-xs rounded ${devPaintMode === "erase" ? "bg-red-600" : "bg-slate-700"}`}>Erase</button>
              </div>
              <button onClick={() => engine.devClearBoard()} className="px-2 py-1 text-xs rounded bg-red-600/50 hover:bg-red-600">Clear</button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Players */}
      <div className="w-52 bg-[#1a1a1a] border-l border-slate-800 p-3 overflow-y-auto">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Players</div>
        <div className="space-y-2">
          {gameState.players.map((ps, i) => {
            const isActive = i === gameState.currentPlayer;
            const isOnFire = engine.firePlayers.has(ps.profile.id);
            return (
              <div 
                key={ps.profile.id} 
                className={`rounded-lg p-2 transition-all ${
                  isActive 
                    ? "bg-slate-700 ring-2 ring-blue-500" 
                    : "bg-slate-800/50"
                } ${isOnFire ? "ring-2 ring-orange-500" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" 
                    style={{ backgroundColor: getPlayerColor(ps.profile.colorId) }}
                  >
                    {engine.settings.accessibility.colorBlindMode 
                      ? PLAYER_MARKS[ps.profile.colorId % PLAYER_MARKS.length] 
                      : ps.profile.name.charAt(0)
                    }
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{ps.profile.name}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-white font-medium">{ps.score}</span>
                      <span>🔑{ps.tokenCount}</span>
                      {timerSettings.mode !== "off" && isActive && (
                        <span className="text-yellow-400">⏱{timerSettings.turnSeconds}s</span>
                      )}
                    </div>
                  </div>
                </div>
                {isOnFire && (
                  <div className="mt-1 text-xs text-orange-400 text-center">🔥 ON FIRE!</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Game Controls */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Controls</div>
          <div className="space-y-1">
            {!isInMatch && (
              <button 
                onClick={engine.startTurn} 
                className="w-full px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 font-semibold text-sm"
              >
                Start Turn
              </button>
            )}
            <button 
              onClick={engine.togglePause} 
              className="w-full px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-sm"
            >
              {engine.timerPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
          </div>
        </div>

        {/* Board Progress */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 mb-1">Board Progress</div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all" 
              style={{ width: `${(gameState.variants.claimedRequired / gameState.variants.requiredTotal) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 text-center mt-1">
            {gameState.variants.claimedRequired} / {gameState.variants.requiredTotal}
          </div>
        </div>
      </div>

      {/* Intermission Overlay */}
      {isIntermission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 text-center max-w-md">
            <h3 className="text-2xl font-bold mb-4" translate="no">Intermission</h3>
            <p className="text-slate-400 mb-4">Next player: <span className="font-bold text-white" style={{ color: getPlayerColor(gameState.players[gameState.currentPlayer]?.profile.colorId ?? 0) }}>{engine.players[gameState.currentPlayer]?.name}</span></p>
            <button onClick={engine.startTurn} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold"><span translate="no">Ready!</span></button>
          </div>
        </div>
      )}
    </div>
  );
}
