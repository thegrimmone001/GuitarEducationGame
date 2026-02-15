// Assignment and classroom workflow artifacts.
//
// Canon intent:
// - These are SYSTEM/WORKFLOW artifacts (teacher authored), not match settings.
// - They must be portable (USB/offline) and auditable.
// - No UI assumptions are embedded here.

export type AssignmentType = "lesson" | "assignment" | "exam";
export type AssessmentMode = "practice" | "quiz" | "exam";

export interface DomainConstraints {
  // Mirrors the domain fields used by the engine settings. Keep this loose for now.
  minFret?: number;
  maxFret?: number;
  enabledStrings?: boolean[];
  fretCount?: number;
}

export interface AssessmentRules {
  // Minimal forward-compatible rules container.
  // (Detailed rules live in the E7 assessment module; this is a workflow reference.)
  allowRetries?: boolean;
  maxAttemptsPerPrompt?: number;
  revealFeedback?: "immediate" | "delayed" | "none";
}

export interface AdaptiveRef {
  enabled: boolean;
  policyId: string;
}

export interface GeneratorPlan {
  seed: string;
  profileId: string;
  constraints: DomainConstraints;
  adaptive?: AdaptiveRef;
}

export interface ContentPlan {
  source: "generated" | "imported" | "mixed";
  // IDs of imported/shaped artifacts referenced by this assignment.
  contentIds?: string[];
  generator?: GeneratorPlan;
  shapingProfileId?: string;
}

export interface AssignmentLocks {
  readOnlyContent: boolean;
  lockSettings: boolean;
  lockAdvancedMenus: boolean;
  lockSystemSettings: boolean;
  lockModeSwitching: boolean;
}

export interface ExportPolicy {
  allowCsv: boolean;
  allowJson: boolean;
}

export interface AssessmentPlan {
  mode: AssessmentMode;
  rules: AssessmentRules;
}

export interface AssignmentDefinition {
  id: string;
  title: string;
  createdAtIso: string;
  type: AssignmentType;
  contentPlan: ContentPlan;
  assessmentPlan: AssessmentPlan;
  locks: AssignmentLocks;
  exports: ExportPolicy;
}

// --- Portable bundle ---

export type AssignmentBundleV1 = {
  version: 1;
  exportedAtIso: string;
  assignment: AssignmentDefinition;
  // Arbitrary artifacts keyed by id. (Prompt queues, imported notation, etc.)
  artifacts: Record<string, unknown>;
  // Hashes keyed by artifact id, including "assignment".
  checksums: Record<string, string>;
};

// --- Student output packet ---

export type PromptResultCode = "C" | "I" | "O"; // Correct / Incorrect / OutOfScope

export interface AssignmentResultPacketV1 {
  version: 1;
  createdAtIso: string;
  assignmentId: string;
  sessionId: string;
  summary: {
    prompts: number;
    correctFirstTry: number;
    correctOverall: number;
    incorrect: number;
    outOfScope: number;
    attemptsTotal: number;
  };
  rows: Array<{
    promptId: string;
    conceptId: string;
    atIso: string;
    result: PromptResultCode;
    attemptsForPrompt: number;
    responseMs?: number;
    inputSource?: "midi" | "mouse" | "touch" | "unknown";
  }>;
  checksums: {
    packet: string;
  };
}
