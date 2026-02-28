"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  playCorrectSound,
  playWrongSound,
  playStreakSound,
  playTokenSound,
  playGameOverSound,
  playTurnStartSound,
  playConnectBonusSound,
  resumeAudioContext,
} from "./audio";
import type { Effect } from "./types";

// ============================================================================
// TYPES
// ============================================================================

interface UseGameAudioOptions {
  enabled?: boolean;
  volume?: number;
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook for handling game audio feedback
 *
 * Processes game effects and plays appropriate sounds.
 */
export function useGameAudio(
  effects: Effect[],
  options: UseGameAudioOptions = {}
): {
  enableAudio: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playGameOver: () => void;
  playTurnStart: () => void;
} {
  const { enabled = true } = options;
  const lastEffectCount = useRef(0);
  const audioEnabled = useRef(enabled);

  // Enable audio on first user interaction
  const enableAudio = useCallback(() => {
    resumeAudioContext();
    audioEnabled.current = true;
  }, []);

  // Play sounds based on new effects
  useEffect(() => {
    if (!audioEnabled.current || effects.length === lastEffectCount.current) {
      return;
    }

    // Get only new effects
    const newEffects = effects.slice(lastEffectCount.current);

    for (const effect of newEffects) {
      switch (effect.type) {
        case "FEEDBACK_PULSE":
          // Correct answer
          if (effect.scoreDelta > 0) {
            playCorrectSound();
          } else {
            playWrongSound();
          }
          break;

        case "STREAK_CALLOUT":
          // Extract streak count from message if possible
          const match = effect.message.match(/(\d+)/);
          if (match) {
            playStreakSound(parseInt(match[1], 10));
          }
          break;

        case "TURN_ENDED":
          // Could play a subtle turn end sound
          break;

        case "BONUS_STARTED":
          playConnectBonusSound();
          break;

        case "MATCH_COMPLETE":
          playGameOverSound();
          break;

        case "LAST_CHANCE_STARTED":
          // Attention sound for last chance
          playTokenSound();
          break;
      }
    }

    lastEffectCount.current = effects.length;
  }, [effects]);

  // Manual trigger functions
  const playCorrect = useCallback(() => {
    if (audioEnabled.current) playCorrectSound();
  }, []);

  const playWrong = useCallback(() => {
    if (audioEnabled.current) playWrongSound();
  }, []);

  const playGameOver = useCallback(() => {
    if (audioEnabled.current) playGameOverSound();
  }, []);

  const playTurnStart = useCallback(() => {
    if (audioEnabled.current) playTurnStartSound();
  }, []);

  return {
    enableAudio,
    playCorrect,
    playWrong,
    playGameOver,
    playTurnStart,
  };
}
