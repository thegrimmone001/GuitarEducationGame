"use client";

import { PlayerState } from "@/lib/guitar-game/types";

// ============================================================================
// TYPES
// ============================================================================

interface ResultsScreenProps {
  players: PlayerState[];
  playerColors: string[];
  totalRounds: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ResultsScreen({
  players,
  playerColors,
  totalRounds,
  onPlayAgain,
  onMainMenu,
}: ResultsScreenProps) {
  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = sortedPlayers.length > 1 && sortedPlayers[0].score === sortedPlayers[1].score;

  return (
    <div className="bg-slate-900 rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6" translate="no">
        Game Over!
      </h2>

      {/* Winner announcement */}
      {winner && !isTie && (
        <div className="text-center mb-6">
          <div className="text-lg text-slate-400 mb-2" translate="no">Winner</div>
          <div
            className="text-3xl font-bold"
            style={{ color: playerColors[players.indexOf(winner)] }}
          >
            {winner.profile.name}
          </div>
          <div className="text-xl text-slate-300 mt-1">
            {winner.score} points
          </div>
        </div>
      )}

      {isTie && (
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-yellow-400" translate="no">
            It&apos;s a Tie!
          </div>
          <div className="text-lg text-slate-400 mt-2">
            {sortedPlayers.filter(p => p.score === winner.score).map(p => p.profile.name).join(" & ")}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="space-y-3 mb-6">
        <h3 className="text-lg font-semibold text-slate-300" translate="no">Final Standings</h3>
        {sortedPlayers.map((player, index) => {
          const originalIndex = players.indexOf(player);
          const isWinner = index === 0 && !isTie;
          
          return (
            <div
              key={player.profile.id}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                isWinner ? "bg-yellow-500/20 ring-1 ring-yellow-500" : "bg-slate-800"
              }`}
            >
              {/* Rank */}
              <div className="w-8 text-center font-bold text-lg">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`}
              </div>
              
              {/* Player color */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: playerColors[originalIndex] }}
              >
                {player.profile.name.charAt(0)}
              </div>
              
              {/* Player name */}
              <div className="flex-1 font-medium">
                {player.profile.name}
              </div>
              
              {/* Stats */}
              <div className="text-right">
                <div className="font-bold">{player.score}</div>
                <div className="text-xs text-slate-400">
                  {player.tokenCount} tokens
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Game stats */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-300 mb-3" translate="no">Game Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400" translate="no">Rounds Played:</span>
          </div>
          <div className="text-right">{totalRounds}</div>
          <div>
            <span className="text-slate-400" translate="no">Total Players:</span>
          </div>
          <div className="text-right">{players.length}</div>
          <div>
            <span className="text-slate-400" translate="no">High Score:</span>
          </div>
          <div className="text-right font-bold text-green-400">{winner?.score || 0}</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          onClick={onPlayAgain}
          className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-500 font-semibold transition-colors"
        >
          <span translate="no">Play Again</span>
        </button>
        <button
          onClick={onMainMenu}
          className="flex-1 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 font-semibold transition-colors"
        >
          <span translate="no">Main Menu</span>
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;
