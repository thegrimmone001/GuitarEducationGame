/**
 * Audio Feedback Utility
 *
 * Provides audio feedback for game events using Web Audio API.
 * Generates simple synthesized sounds for correct/wrong answers and other events.
 */

// ============================================================================
// AUDIO CONTEXT
// ============================================================================

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

// ============================================================================
// SOUND GENERATORS
// ============================================================================

/**
 * Play a simple tone
 */
function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.3
): void {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio not supported or blocked
  }
}

/**
 * Play a chord (multiple frequencies)
 */
function playChord(
  frequencies: number[],
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.2
): void {
  try {
    const ctx = getAudioContext();

    frequencies.forEach((freq) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    });
  } catch {
    // Audio not supported or blocked
  }
}

// ============================================================================
// GAME SOUND EFFECTS
// ============================================================================

/**
 * Play correct answer sound
 * A pleasant ascending chord
 */
export function playCorrectSound(): void {
  // Major chord: C-E-G (C major)
  playChord([523.25, 659.25, 783.99], 0.3, "sine", 0.15);
}

/**
 * Play wrong answer sound
 * A descending minor tone
 */
export function playWrongSound(): void {
  // Descending tones
  playTone(330, 0.15, "square", 0.1);
  setTimeout(() => playTone(293.66, 0.2, "square", 0.1), 100);
}

/**
 * Play streak sound (for milestones)
 */
export function playStreakSound(streakCount: number): void {
  if (streakCount >= 20) {
    // Fire mode - triumphant arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.3, "sine", 0.2), i * 80);
    });
  } else if (streakCount >= 10) {
    // Hot streak - ascending arpeggio
    playChord([523.25, 659.25, 783.99], 0.4, "sine", 0.2);
  } else if (streakCount >= 6) {
    // Heating up
    playTone(659.25, 0.2, "sine", 0.2);
  } else if (streakCount >= 3) {
    // 3 in a row
    playTone(523.25, 0.2, "sine", 0.15);
  }
}

/**
 * Play token earned sound
 */
export function playTokenSound(): void {
  // Quick ascending chime
  playTone(880, 0.1, "sine", 0.15);
  setTimeout(() => playTone(1108.73, 0.15, "sine", 0.15), 50);
}

/**
 * Play steal sound
 */
export function playStealSound(): void {
  // Sharp, attention-grabbing sound
  playTone(440, 0.1, "sawtooth", 0.1);
  setTimeout(() => playTone(550, 0.15, "sawtooth", 0.1), 80);
}

/**
 * Play game over sound
 */
export function playGameOverSound(): void {
  // Fanfare-like ending
  setTimeout(() => playChord([523.25, 659.25, 783.99], 0.5, "sine", 0.2), 0);
  setTimeout(() => playChord([523.25, 659.25, 783.99, 1046.5], 0.8, "sine", 0.25), 300);
}

/**
 * Play turn start sound
 */
export function playTurnStartSound(): void {
  // Quick attention sound
  playTone(660, 0.1, "sine", 0.1);
}

/**
 * Play connect-4 bonus sound
 */
export function playConnectBonusSound(): void {
  // Celebratory sound
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.25, "sine", 0.2), i * 60);
  });
}

/**
 * Resume audio context (needed for browsers that require user interaction)
 */
export function resumeAudioContext(): void {
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }
}

/**
 * Check if audio is available
 */
export function isAudioAvailable(): boolean {
  try {
    getAudioContext();
    return true;
  } catch {
    return false;
  }
}
