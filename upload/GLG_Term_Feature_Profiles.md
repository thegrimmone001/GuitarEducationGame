Generated: 2026-01-17 05:50:14 UTC

Each profile is derived from scoped conversation events (2025-12-01 →
2026-01-16 UTC) and cross-referenced with Anchor98 docs where available.
This document is descriptive; it does not authorize changes.

# BONUS_PHASE

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-19 00:06:27 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   66
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:04:56 UTC --- Guitar education game design --- user:
sounds like a good plan of attack. I agree on the engine and
renderer\... enharmonics circle should be allowed to be scored twice
since there is both a flat and a sharp occupying that space. for
example: f sharp and g flat are different notes and can both be
generated in a chromatic mode but would on

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 01:23:55 UTC --- Guitar education game design --- assistant:
Perfect --- here's a tight spec-level refinement that keeps your
\*\*engine/renderer split intact\*\*, upgrades the \*\*classroom UX\*\*,
and cleanly introduces the \*\*enharmonic "double-connect" twist\*\*
without creating rule chaos. \## Scorecard UX and multiplier
presentation \### Scorecard layout (per player)

2025-12-19 02:13:53 UTC --- Guitar education game design --- assistant:
Here are the key optimizations to \*\*lock in now\*\* (before coding)
based on your new rules. These decisions touch multiple systems, so
settling them up front will prevent refactors. \## 1) Add the "Blackout"
match type cleanly \*\*Blackout\*\* ends the game when the fretboard is
"fully filled." To avoid a

2025-12-19 02:25:50 UTC --- Guitar education game design --- user:
\"blackout\" should be defined by what is available. so if we are in
chromatic it will be everything, if it is in a key, scale, or interval
it will be limited to the notes that are defined therein. Bonus 5pts if
they steal an enharmonic with the opposite generated, helps reinforce
the note position an

2025-12-19 02:25:54 UTC --- Guitar education game design --- assistant:
Here are the three updates, tightened into \*\*engine-ready rules\*\* so
you can code without reinterpretation later. \## 1) Blackout match type
is defined by "what is available" \*\*Definition:\*\* Blackout ends when
\*\*every claimable slot on the board (given the current Settings) has
been claimed by someon

# DEPRECATED_LAST_CHANCE

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     REMOVED

  Authority Source                    SPEC

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

# DEV_TOOLS_HIDDEN

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-30 16:07:49 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   14
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-30 16:07:49 UTC --- Rendered Staff+Tab Implementation ---
assistant: Understood. We'll shift to \*\*backend-functional work\*\*
that you can validate later without needing the visuals perfect right
now. Below is the next backend milestone plan and the concrete
implementation targets (files/modules, data shapes, and logic). This
will move the project forward materially wh

2025-12-30 18:52:38 UTC --- Rendered Staff+Tab Implementation ---
assistant: Excellent. I'll proceed exactly there and treat this as a
\*\*backend stabilization phase\*\* so that when you return to visual
testing, you're validating a system that is already logically correct.
Below is what I am locking in and beginning immediately, so expectations
are clear and we don't drift. \--

2026-01-10 08:43:42 UTC --- Patch Splash Match Rules --- assistant: You
were last at \*\*A1.40 (Settings Enforcement)\*\*. With the patches
applied since then, you are now at \*\*A1.46\*\*. \### A1.41--A1.46
(what moved forward) \*\*A1.41 --- Splash owns Match Rules\*\* - Match
Rules removed from the in-game/left menu and live entirely on the Start
Menu UI. \*\*A1.42 --- Dev/Test unloc

2026-01-12 05:17:10 UTC --- Guitar-Edu-UI Audit --- assistant: Phase
\*\*1.1 + 1.2\*\* is now implemented in the active build as a
\*\*timeline persistence stress layer + stacking rules\*\*, specifically
to expose capacity/shift flaws before we harden Mode 3's full truth
model. \[Download
guitar-edu-ui_01_11_26_07.zip\](sandbox:/mnt/data/guitar-edu-ui_01_11_26_07.zip)
\##

2026-01-12 05:42:36 UTC --- Guitar-Edu-UI Audit --- assistant: Phase
1.1 + 1.2 executed (persistence stress + stacking rules) \*\*using an
"accepted marks persist" pipeline\*\*, so we can safely lock Mode 3
truth-model on top without timeline corruption. \### What I implemented
(Phase 1.1 + 1.2, optimized for exposing capacity flaws) \#### 1)
Accepted-marks persisten

2026-01-12 09:04:34 UTC --- Guitar-Edu-UI Audit --- assistant:
Understood --- the screenshots make it clear we're hitting \*\*three
hard blockers\*\* that prevent meaningful testing right now: 1)
\*\*Dev/Test unlock "works" logically but you still can't reach the
controls\*\* (because the Dev pane entry point is trapped behind the
regressed menu/tabs UI). 2) \*\*TAB number

2026-01-12 09:26:01 UTC --- Guitar-Edu-UI Audit --- assistant: Here's a
clean "handoff packet" you can paste into a \*\*new chat thread\*\* to
pick up immediately without re-explaining anything. \-\-- \## New Thread
Title \*\*GuitarEdu UI --- Add Automated Tests + One-Click Runner
(Vitest + Playwright + In-App Test Runner)\*\* \-\-- \## Paste This As
The First Message In The N

2026-01-13 04:24:44 UTC --- Guitar Learning Game Menu --- assistant:
Below is a \*\*clean, canonical menu map\*\* for the \*\*Guitar Learning
Game\*\*, organized by \*\*System\*\*, \*\*Game\*\*, and
\*\*Preferences\*\*. This reflects the current direction of the project,
resolves prior ambiguities, and is structured for \*\*clarity,
testability, and future expansion\*\*. \-\-- \## 1. \*\*System

# DOUBLE_BOARDS

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     DEFERRED

  Authority Source                    CHAT_ONLY

  Disposition                         KEEP

  Date Created (first mention)        2026-01-16 22:48:42 UTC

  Last Modified (last mention)        2026-01-16 23:39:55 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-16 22:48:42 UTC --- Guitar Edu Game Setup --- user:
\[15:42:28.576\] SYS eventLog:installed {\"max\":400} \[15:42:49.330\]
UI gedu:players {\"count\":2} \[15:42:49.533\] UI gedu:players
{\"count\":2} \[15:42:49.709\] UI gedu:players {\"count\":2}
\[15:42:49.873\] UI gedu:players {\"count\":2} \[15:42:50.049\] UI
gedu:players {\"count\":2} \[15:42:50.237\] UI gedu:players {\"co

2026-01-16 23:17:15 UTC --- Guitar Edu Game Setup --- assistant: Done.
\## A) Solution B is now canonical \### Purpose Eliminate the redundant
nested folder issue during Windows extraction by switching snapshot
artifacts to \*\*flat zip format\*\*. \### Files touched -
\`DECISIONS_LOG.md\` (packaging invariant + extraction rule updated) -
\`tools/tripwire_zip_structure.mjs

2026-01-16 23:34:08 UTC --- Guitar Edu Game Setup --- user:
\[16:30:12.794\] SYS eventLog:installed {\"max\":400} \[16:30:39.401\]
UI gedu:players {\"count\":2} \[16:30:39.797\] UI gedu:players
{\"count\":2} \[16:30:40.073\] UI gedu:players {\"count\":2}
\[16:30:40.333\] UI gedu:players {\"count\":2} \[16:30:52.446\] UI
gedu:matchOptions {\"learningType\":\"single\",\"context\":{\"key\":

2026-01-16 23:39:55 UTC --- Guitar Edu Game Setup --- assistant: Applied
two targeted fixes to address the runtime issues you reported ("settings
not being applied" + "double boards rendering"). \## 1) Match settings
not applying (Key / Pitch Framework) \*\*Root cause:\*\*
\`buildSettingsFromUi()\` was still reading \*legacy\* UI controls
(\`#core-root\`, \`#core-modes\`) whe

# FRETBOARD

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-19 00:06:27 UTC

  Last Modified (last mention)        2026-01-16 23:39:55 UTC

  Mentions (scoped)                   195
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 01:23:55 UTC --- Guitar education game design --- assistant:
Perfect --- here's a tight spec-level refinement that keeps your
\*\*engine/renderer split intact\*\*, upgrades the \*\*classroom UX\*\*,
and cleanly introduces the \*\*enharmonic "double-connect" twist\*\*
without creating rule chaos. \## Scorecard UX and multiplier
presentation \### Scorecard layout (per player)

2025-12-19 01:34:09 UTC --- Guitar education game design --- assistant:
Got it --- we'll match the \*\*SVG mental model\*\* exactly: - \*\*Sharp
= left half\*\* (because it "goes up") - \*\*Flat = right half\*\*
(because it "goes down") - The split visually "leans toward" the note
it's affecting (your intuition is solid, and yes: \*affect\* is the verb
😉). And we'll support \*\*two diffe

2025-12-19 01:39:14 UTC --- Guitar education game design --- assistant:
That's a strong lever, and it fits the "scaffold → remove scaffolding"
progression cleanly. \## Difficulty spec update: "label-on-claim" as the
key difference Think of difficulty as controlling \*\*what information
is visible, and when\*\*. We can formalize it with two independent
visibility layers: 1) \*

2025-12-19 01:41:57 UTC --- Guitar education game design --- assistant:
Great --- let's formalize \*\*"Show after miss"\*\* so it's powerful for
teaching \*without\* breaking multiplayer competitiveness. \## "Show
After Miss" (SAM) setting \### What it does When a player answers
incorrectly (or times out), the game can optionally reveal the correct
answer \*briefly\*. This is a tea

2025-12-19 01:57:53 UTC --- Guitar education game design --- assistant:
Here are the highest-leverage optimizations to lock down \*\*before
coding\*\*, so you don't end up refactoring core rules/UI later. I'm
focusing on decisions that (1) touch many systems, (2) affect
fairness/teachability, and (3) are easiest to settle now. \## 1)
Formalize the "single source of truth" fo

# GEG-001

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 08:48:42 UTC

  Last Modified (last mention)        2026-01-16 22:42:13 UTC

  Mentions (scoped)                   19
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 08:48:42 UTC --- Patch Splash Match Rules --- assistant:
Agreed --- we drifted from the project's file/zip naming + documentation
discipline. \### Fixed (and recorded) - \*\*Restored the deliverable
naming convention\*\* for full builds: -
\`guitar-edu-ui_MM_DD_YY\_##.zip\` - \*\*Enforced clean packaging\*\*
per \`DOCS/CHANGELOG.md\`: - \*\*No \`node_modules/\`\*\* - \*\*No \`dis

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

2026-01-15 03:06:13 UTC --- Match Options UI Reconciliation ---
assistant: Understood. Right-click stays in canon, but we will \*\*not
implement it now\*\*. \## Updated priority - \*\*GEG-116 (Right-click
Answer Shortcut Menu):\*\* Defer. No code work until higher-priority
testing blockers are cleared. \## Next step The next highest-value step
for testing is to make sure \*\*the core

2026-01-15 03:20:34 UTC --- Match Options UI Reconciliation ---
assistant: You're right: that screenshot is not "missing features," it's
a \*\*surface init failure\*\* that leaves the UI shell intact but
prevents the rendering subsystems from coming online. \## Audit findings
(root causes) \### 1) Fretboard + Staff/Tab backgrounds are failing to
load (critical) In \`src/app/gameC

2026-01-16 10:15:38 UTC --- Guitar Edu Game Setup --- assistant: \##
Assessment result: last completed GEG checkpoint (per the zip) \###
Purpose Identify the most recent \*\*GEG-xxx checkpoint marked as
completed\*\* in the uploaded snapshot
\`guitar-edu-ui_01_15_26_78.zip\`. \### Files reviewed (read-only) -
\`BUILD_LOG.md\` - \`CHANGELOG.md\` - \`CHECKLIST.md\` - \`docs/TASK_B

2026-01-16 10:28:58 UTC --- Guitar Edu Game Setup --- assistant: \##
Step completed: reconcile "GEG-xxx completion" conflicts (doc authority
clarified) \### Purpose Remove ambiguity about which files define "done
vs remaining," so we can return to checklist-driven coding without
documentation drift. \### Files touched (docs-only) -
\`docs/TASK_BOARD.md\` \*(marked lega

## Anchor Evidence (docs)

CHECKLIST.md: - \[x\] \*\*GEG-001\*\* Engage / \*\*End\*\* / New
correctly control a single match instance (End truly terminates the
match state).

BUILD_LOG.md: - Completed GEG-001: restored deterministic repaint of
Canvas2D surfaces by calling renderer \`draw()\` from the controller
\`renderAll()\` loop.

BUILD_LOG.md: - Checklist: GEG-001 marked complete.

# GEG-002

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 08:43:42 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   15
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 08:43:42 UTC --- Patch Splash Match Rules --- assistant: You
were last at \*\*A1.40 (Settings Enforcement)\*\*. With the patches
applied since then, you are now at \*\*A1.46\*\*. \### A1.41--A1.46
(what moved forward) \*\*A1.41 --- Splash owns Match Rules\*\* - Match
Rules removed from the in-game/left menu and live entirely on the Start
Menu UI. \*\*A1.42 --- Dev/Test unloc

2026-01-10 09:17:47 UTC --- Patch Splash Match Rules --- assistant:
Implemented the next functional patch (now tracked as \*\*A1.48\*\*) and
rolled it into a new correctly-named build. \### What changed (A1.48) -
\*\*Turn-start is now "real" in the engine → UI pipeline\*\* - Added a
new engine effect: \`TURN_STARTED\` - Emitted on \`START_TURN\` (only
when a prompt is actually g

2026-01-10 09:30:43 UTC --- Patch Splash Match Rules --- assistant:
You're right --- \*\*the GEG tracking path in the repo docs was
drifting\*\*, mainly because Start Menu enforcement was living under
\*\*"A0"\*\* while the rest of the requirements were \*\*GEG-###\*\*,
and the \*\*A-series ↔ GEG-series crosswalk wasn't explicit\*\*. \###
What I changed after reviewing the recorded do

2026-01-10 09:37:10 UTC --- Patch Splash Match Rules --- assistant:
Confirmed --- the safest way to stay on the \*\*most up-to-date path\*\*
is to make \*\*date-based precedence explicit\*\* in the repo (so older
notes cannot "win" by accident). \### What I checked - Reviewed the
dated canon in \`DOCS/DECISIONS_LOG.md\`: - \*\*Newest guidance is
2026-01-10\*\* (A1.48, A1.47, A1.41--A

2026-01-10 09:51:49 UTC --- Patch Splash Match Rules --- assistant: You
are currently at \*\*A1.48\*\* (GEG-002 prerequisite): \*\*turn-start
timer wiring is in place\*\*, with \*\*A1.41--A1.47 already
consolidated\*\* (Start Menu enforcement, Dev unlock, system menu
restriction, pointer reliability, End/New hardened, \*\*no Pause\*\*,
and visible intermission countdown). I also ali

2026-01-10 10:50:34 UTC --- Patch Splash Match Rules --- assistant:
Understood. I just did a \*\*canon audit\*\* on the latest packaged
build (\*\*\`guitar-edu-ui_01_10_26_09.zip\`\*\*) by reading the repo's
recorded documentation (not memory), and I'm now locked to the
\*\*newest dated path\*\*. \### Canon lock: what I am using as the
source of truth \*\*Order of authority (hard ru

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-002\*\* Turn loop fully wired: turn start
→ input → end turn → scoring → (bonus phase if \*\*enabled and
triggered\*\*) → next player.

BUILD_LOG.md: - Checklist: add note under GEG-002; add GEG-005
multiplayer player roster UI.

# GEG-003

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 09:07:49 UTC

  Last Modified (last mention)        2026-01-16 22:42:13 UTC

  Mentions (scoped)                   11
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 09:07:49 UTC --- Patch Splash Match Rules --- assistant: You
were last at \*\*A1.40\*\*. With the patches since then, you are now
at: - \*\*A1.46\*\* (Start Menu enforcement + input reliability + "no
pause") - \*\*A1.47\*\* (Multiplayer intermission countdown visibility)
\### What I just implemented (A1.47) - \*\*Multiplayer intermission is
now visible\*\* via a countdown

2026-01-10 10:05:01 UTC --- Patch Splash Match Rules --- assistant:
Implemented the fix for \*\*"turn timer works but there is no
intermission"\*\* and advanced the build. \### What was wrong The engine
\*was\* entering \`phase = \"INTERMISSION\"\`, but the UI \*\*was not
re-rendering after reducer dispatch\*\*, so the intermission phase never
visibly appeared. \### What's now fixe

2026-01-10 10:50:34 UTC --- Patch Splash Match Rules --- assistant:
Understood. I just did a \*\*canon audit\*\* on the latest packaged
build (\*\*\`guitar-edu-ui_01_10_26_09.zip\`\*\*) by reading the repo's
recorded documentation (not memory), and I'm now locked to the
\*\*newest dated path\*\*. \### Canon lock: what I am using as the
source of truth \*\*Order of authority (hard ru

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[x\] \*\*GEG-003\*\* Intermission phase displays and
transitions correctly (multiplayer).

# GEG-004

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   6
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 12:44:04 UTC --- Guitar Edu Game Setup --- assistant:
Understood. The checklist \*\*is\*\* partially outdated relative to the
\*\*current Start/Launch menu + Match Options UI\*\* in the latest
snapshot (\`guitar-edu-ui_01_16_26_83.zip\`). I scanned the canon docs
and the actual UI implementation to identify \*\*exact conflicts\*\* and
the \*\*minimum revision set\*\* ne

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-004\*\* Bonus phase reliably reachable and
visible (including via dev tools).

# GEG-005

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 11:00:56 UTC

  Last Modified (last mention)        2026-01-14 11:00:56 UTC

  Mentions (scoped)                   1
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-005\*\* Multiplayer player roster UI: show
player count, editable player names, add/remove players with controls
(future: link to accounts).

BUILD_LOG.md: - Checklist: add note under GEG-002; add GEG-005
multiplayer player roster UI.

# GEG-010

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 22:42:13 UTC

  Mentions (scoped)                   9
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

2026-01-16 22:22:52 UTC --- Guitar Edu Game Setup --- assistant:
Acknowledged. \*\*Runtime test cadence is now locked: every 15
iterations starting at build 90\*\* (90, 105, 120, ...). No test run
will be requested outside that cadence unless you explicitly override.
\## Next step completed (Build 89): Preferences redundancy cleanup \###
Purpose Remove \*\*non-presentation

2026-01-16 22:31:09 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding to \*\*Build 90 runtime checkpoint\*\* (per the new cadence:
\*\*90, 105, 120...\*\*). \## What I changed for Build 90 (minimal +
deterministic) \### Purpose - Stop the "wrong nested folder" issue at
the source (by ensuring the \*\*top-level folder name matches the zip
name\*\*) - Make Build 90 a clean,

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-010\*\* Sequence detection in 4
directions: horizontal, vertical, diagonal up, diagonal down.

# GEG-011

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 12:39:01 UTC --- Guitar Edu Game Setup --- assistant:
Understood. I will \*\*resume the checklist at the lowest-numbered
item\*\* and \*\*advance only to the next item that can be legitimately
completed\*\*, strictly following canon and the Stability Audit rules.
Below is the \*\*initial pass\*\* with clear determinations. \*\*No
boxes are checked yet\*\*---I will ask f

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-011\*\* Segment scoring matches canon (4+
run):

# GEG-012

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   6
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:18:44 UTC --- Match Options UI Reconciliation ---
assistant: Below are \*\*lock-in tables\*\* for the five items you
listed. Treat these as \*\*canonical truth tables\*\* for implementation
and testing. They are written to be \*\*deterministic\*\*,
\*\*non-overlapping\*\*, and \*\*compatible with the
"Active/Prompt/Mark" surface model\*\*. \-\-- \# 1) Display modes
priority and sta

2026-01-14 11:43:51 UTC --- Match Options UI Reconciliation ---
assistant: Locked. Here are the \*\*final canon tables\*\* for the
remaining items (2--5), updated so they are \*\*lexicon-safe\*\* and
\*\*do not reinvent\*\* anything that your fine-detail definitions
already cover. \-\-- \# 2) Difficulty matrix truth table (Easy / Medium
/ Hard + Free Play) \*\*Lock:\*\* "Learning" is removed

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-012\*\* Token awarding matches canon:
\*\*1 token per NEW segment\*\* (not per note, not per extension).

# GEG-013

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-013\*\* Steal token spend + resolution
works (ownership updates + scoring side-effects where applicable).

# GEG-014

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-014\*\* Last-chance phase works:
steals/tokens-only behavior and clean end conditions.

# GEG-015

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-015\*\* Main Menu Settings: \*\*Token
cap\*\* adjustable.

# GEG-016

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:46:55 UTC --- Guitar Edu Game Setup --- assistant: \###
Checklist ↔ Code audit (GEG-001 → GEG-016) Scope: \*\*factual "present
in code vs not present"\*\* only. No new files, no code changes. \-\--
\## A) Core gameplay flow \*\*GEG-001 --- Start / Pause / End / New
control a single match instance\*\* - \*\*Partially backed by
code.\*\* - \*\*Start/Engage\*\* exists via t

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-016\*\* Main Menu Settings: \*\*Starting
tokens\*\* adjustable (supports gameplay variants).

# GEG-020

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-020\*\* Player card includes: avatar,
score, tokens, \*\*timer\*\* (turn timer) to save UI space.

# GEG-021

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 23:17:15 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 23:17:15 UTC --- Guitar Edu Game Setup --- assistant: Done.
\## A) Solution B is now canonical \### Purpose Eliminate the redundant
nested folder issue during Windows extraction by switching snapshot
artifacts to \*\*flat zip format\*\*. \### Files touched -
\`DECISIONS_LOG.md\` (packaging invariant + extraction rule updated) -
\`tools/tripwire_zip_structure.mjs

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-021\*\* Multiplayer player setup: show
player count, editable player names, and a visual add/remove list for
player slots (future: link to accounts).

CHECKLIST.md: - \[x\] \*\*GEG-021\*\* Multiplayer player roster UI:

CHECKLIST.md: - \[ \] \*\*GEG-021a\*\* (Deferred) Account linking hook:
roster slots must be compatible with later account selection/import, but
no account system is required for completion of GEG-021.

CHECKLIST.md: - \[ \] \*\*GEG-021a\*\* (Deferred) Account linking hook:
roster slots must be compatible with later account selection/import, but
no account system is required for completion of GEG-021.

CHECKLIST.md: - \[ \] \*\*GEG-110\*\* Remove legacy/superseded item:
\*\*GEG-021\*\* (no longer relevant).

BUILD_LOG.md: - Checklist update: add GEG-021 / GEG-021a for multiplayer
roster + player naming.

BUILD_LOG.md: - Checklist update: add GEG-021 / GEG-021a for multiplayer
roster + player naming.

CHANGELOG.md: - Checklist: added GEG-021 roster + player names (and
deferred GEG-021a).

# GEG-022

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-022\*\* In-match leaderboard shows
\*\*active players only\*\* (no empty slots).

# GEG-023

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-023\*\* Add \*\*persistent High Score
Board\*\* (saved across sessions; local storage acceptable for now) and
render it in Utility area.

# GEG-030

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 11:10:55 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   8
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 11:10:55 UTC --- Patch Splash Match Rules --- assistant:
You're no longer at \*\*A1.40\*\* --- the repo is now at \*\*A1.51\*\*
(with A1.41--A1.50 already captured in \`DOCS/CHANGELOG.md\` and
\`DOCS/DECISIONS_LOG.md\`). \## What I corrected + advanced (A1.51)
\### 1) Gameplay Type tabs are now \*\*real controls\*\* - \*\*Single
Note / Chords / Scales\*\* tabs are now \*\*clickable

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 11:09:02 UTC --- Guitar Edu Game Setup --- assistant:
Approved refinements applied \*\*(docs-only)\*\* --- with one important
constraint: - ✅ I \*\*did\*\* implement the \*\*Section D rewrite\*\*
exactly as previously proposed (Surface Controls + Active Surface Matrix
as the primary abstraction; legacy Mode 1--5 removed from the checklist
language). - ⚠️ I \*\*did not\*

2026-01-16 11:11:25 UTC --- Guitar Edu Game Setup --- assistant:
Understood. Proceeding with a \*\*strict re-audit\*\* under Stability
Audit rules. This is \*\*analysis only\*\*. No files are changed in this
step. \-\-- \# Comprehensive Re-Audit Report \*\*Snapshot under
review:\*\* \`guitar-edu-ui_01_15_26_79.zip\` \*\*Baseline
comparison:\*\* \`guitar-edu-ui_01_15_26_78.zip\` \*\*Phase

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-030\*\* Surface Control System replaces
rigid "Mode 1--5" selection.

# GEG-031

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 11:47:01 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   6
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 11:47:01 UTC --- Patch Splash Match Rules --- assistant:
Understood, and corrected. \### What changed (A1.53) - \*\*"Not visible"
no longer removes the panel.\*\* Staff/TAB and Fretboard sections now
\*\*stay in the layout\*\* (no UI jumping). - \*\*"Not visible" now
means:\*\* - the \*\*overlay layer\*\* (notes/positions/claims) is
hidden, and - \*\*interaction is disabled

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-031\*\* Active Surface Matrix governs both
rendering and allowed input per surface.

# GEG-032

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-032\*\* Surface independence is the
default.

# GEG-033

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-033\*\* Surface Control System is the
primary configuration mechanism.

# GEG-034

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-034\*\* Presets A--J define bundled
Surface Control configurations.

# GEG-035

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-035\*\* Match configuration is finalized
at engage/start.

# GEG-036

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:34:05 UTC

  Mentions (scoped)                   7
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 11:09:02 UTC --- Guitar Edu Game Setup --- assistant:
Approved refinements applied \*\*(docs-only)\*\* --- with one important
constraint: - ✅ I \*\*did\*\* implement the \*\*Section D rewrite\*\*
exactly as previously proposed (Surface Controls + Active Surface Matrix
as the primary abstraction; legacy Mode 1--5 removed from the checklist
language). - ⚠️ I \*\*did not\*

2026-01-16 11:11:25 UTC --- Guitar Edu Game Setup --- assistant:
Understood. Proceeding with a \*\*strict re-audit\*\* under Stability
Audit rules. This is \*\*analysis only\*\*. No files are changed in this
step. \-\-- \# Comprehensive Re-Audit Report \*\*Snapshot under
review:\*\* \`guitar-edu-ui_01_15_26_79.zip\` \*\*Baseline
comparison:\*\* \`guitar-edu-ui_01_15_26_78.zip\` \*\*Phase

2026-01-16 13:34:05 UTC --- Guitar Edu Game Setup --- assistant: Here's
the \*\*re-run from the lowest checklist ID\*\*, using the \*\*updated
definitions\*\* in \`CHECKLIST.md\` (notably: items are only checkable
when \*\*implemented and verified in the running build\*\*). Since
\*\*testing is still suspended\*\*, anything that requires runtime
verification is \*\*"Eligible after v

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-036\*\* All surface input gating must key
exclusively off Prompt / Mark / Display / SAM roles.

# GEG-040

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 12:36:04 UTC

  Mentions (scoped)                   9
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:18:44 UTC --- Match Options UI Reconciliation ---
assistant: Below are \*\*lock-in tables\*\* for the five items you
listed. Treat these as \*\*canonical truth tables\*\* for implementation
and testing. They are written to be \*\*deterministic\*\*,
\*\*non-overlapping\*\*, and \*\*compatible with the
"Active/Prompt/Mark" surface model\*\*. \-\-- \# 1) Display modes
priority and sta

2026-01-14 11:43:51 UTC --- Match Options UI Reconciliation ---
assistant: Locked. Here are the \*\*final canon tables\*\* for the
remaining items (2--5), updated so they are \*\*lexicon-safe\*\* and
\*\*do not reinvent\*\* anything that your fine-detail definitions
already cover. \-\-- \# 2) Difficulty matrix truth table (Easy / Medium
/ Hard + Free Play) \*\*Lock:\*\* "Learning" is removed

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

2026-01-16 10:53:40 UTC --- Guitar Edu Game Setup --- assistant:
Understood. We will \*\*resolve Section D conflicts now\*\*,
\*\*before\*\* moving forward, by \*\*rewriting the affected checklist
language to match the current canon and the code reality\*\*---without
introducing new features, abstractions, or behaviors. This is a
\*\*documentation correction step\*\*, not a featur

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-040\*\* Learning difficulty: show
\*\*all\*\* labels AND still fully playable (simulate gameplay:
claim/highlight, trigger sequences, earn tokens).

# GEG-041

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 11:10:55 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 11:10:55 UTC --- Patch Splash Match Rules --- assistant:
You're no longer at \*\*A1.40\*\* --- the repo is now at \*\*A1.51\*\*
(with A1.41--A1.50 already captured in \`DOCS/CHANGELOG.md\` and
\`DOCS/DECISIONS_LOG.md\`). \## What I corrected + advanced (A1.51)
\### 1) Gameplay Type tabs are now \*\*real controls\*\* - \*\*Single
Note / Chords / Scales\*\* tabs are now \*\*clickable

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-041\*\* SAM options: \`single\` and
\`multiple\`.

# GEG-042

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 12:18:08 UTC

  Last Modified (last mention)        2026-01-16 13:26:34 UTC

  Mentions (scoped)                   8
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 12:18:08 UTC --- Patch Splash Match Rules --- assistant: \###
✅ Proceeded to the next step --- and corrected the trajectory We are
\*\*no longer at A1.40\*\*. Based on the latest recorded decisions and
the code state inside \`/mnt/data/guitar_13/guitar-edu-ui\`, the project
has already advanced through \*\*A1.53\*\*, and I have now implemented
the next logical step th

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

2026-01-16 12:44:04 UTC --- Guitar Edu Game Setup --- assistant:
Understood. The checklist \*\*is\*\* partially outdated relative to the
\*\*current Start/Launch menu + Match Options UI\*\* in the latest
snapshot (\`guitar-edu-ui_01_16_26_83.zip\`). I scanned the canon docs
and the actual UI implementation to identify \*\*exact conflicts\*\* and
the \*\*minimum revision set\*\* ne

2026-01-16 13:12:19 UTC --- Guitar Edu Game Setup --- assistant: Proceed
complete. I performed the \*\*checklist/spec alignment revision\*\*
based on your resolutions and removed the specific outdated elements you
flagged. \## Brief summary - Implemented \*\*R-1 (A):\*\* removed the
\*\*Accidentals Pool control\*\* from Match Options UI, while preserving
\*\*Staff Accidentals\*\*

2026-01-16 13:26:34 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding as directed. I performed a \*\*comprehensive, step-by-step
audit\*\* of the canon docs against the \*\*current Launch/Menu + Match
Options\*\* implementation and applied the \*\*minimum revisions\*\*
needed to resolve the specific outdated instructions you flagged
(without introducing new systems). \#

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-042\*\* Default fret range: \*\*min 0, max
12, visible 12 frets\*\*.

# GEG-043

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-043\*\* Note visibility modes everywhere:
\*\*All / Naturals / Enharmonic\*\* (rail + fretboard reflect choice).

# GEG-044

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-044\*\* Highlighting system supports:

# GEG-045

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:51:04 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:51:04 UTC --- Guitar Edu Game Setup --- assistant: \###
Documented audit and proceed (no new files, no code changes) \####
Purpose Continue the \*\*Checklist ↔ Code\*\* audit by verifying whether
the next checklist items are \*\*actually represented in code\*\*, and
where they are not. \#### Files reviewed (read-only) -
\`CHECKLIST.md\` - \`src/ui/layout.ts\` - \`s

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-045\*\* Note display options (global,
consistent across UI):

# GEG-050

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-050\*\* Staff hover highlight + click
placement aligned to staff lines/spaces.

# GEG-051

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-051\*\* Tab hover highlight + click
placement aligned to tab lines + measure divisions.

CHECKLIST.md: - \[ \] \*\*GEG-051a\*\* Staff + Tab share a single
\*\*subdivision timeline\*\*:

# GEG-052

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-052\*\* TAB mode behavior: player can
\*\*select string then input fret\*\* OR \*\*input fret then select
string\*\*.

# GEG-053

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-053\*\* Keypad accepts only \*\*0--24\*\*
(reject 25+).

# GEG-054

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-054\*\* "Multiple valid answers" handled
cleanly:

# GEG-055

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-055\*\* Mirroring behavior options:

# GEG-060

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   6
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:18:44 UTC --- Match Options UI Reconciliation ---
assistant: Below are \*\*lock-in tables\*\* for the five items you
listed. Treat these as \*\*canonical truth tables\*\* for implementation
and testing. They are written to be \*\*deterministic\*\*,
\*\*non-overlapping\*\*, and \*\*compatible with the
"Active/Prompt/Mark" surface model\*\*. \-\-- \# 1) Display modes
priority and sta

2026-01-14 11:43:51 UTC --- Match Options UI Reconciliation ---
assistant: Locked. Here are the \*\*final canon tables\*\* for the
remaining items (2--5), updated so they are \*\*lexicon-safe\*\* and
\*\*do not reinvent\*\* anything that your fine-detail definitions
already cover. \-\-- \# 2) Difficulty matrix truth table (Easy / Medium
/ Hard + Free Play) \*\*Lock:\*\* "Learning" is removed

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-060\*\* Current note centered; two-octave
span; "endless loop" illusion.

# GEG-061

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-061\*\* Chromatic uses rotating rail;
scales/keys/chords use fixed reference rail.

# GEG-062

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-062\*\* Rail labels never overflow a cell
(sharps/flats stay within the note cell region).

# GEG-063

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-063\*\* Rail is clickable (acts like a
button/input surface):

# GEG-064

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 11:50:56 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-064\*\* Rail selection integrates into the
unified input pipeline (per-mode and per-settings behavior).

# GEG-070

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   4
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-070\*\* Interval Roman display format: \`I
ii II iii III IV \...\`

# GEG-071

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 11:09:02 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:21:31 UTC --- Guitar Edu Game Setup --- assistant: \##
Reconciliation via code audit (canon-safe) \### Purpose Reconcile the
conflicting "GEG-xxx completion" signals by checking what the \*\*code
actually implements\*\* versus what the various tracking docs claim.
\### Files touched - \`docs/SUGGESTIONS_LOG.md\` \*(doc-only: logged
conflicts per drift-prevent

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

2026-01-16 11:09:02 UTC --- Guitar Edu Game Setup --- assistant:
Approved refinements applied \*\*(docs-only)\*\* --- with one important
constraint: - ✅ I \*\*did\*\* implement the \*\*Section D rewrite\*\*
exactly as previously proposed (Surface Controls + Active Surface Matrix
as the primary abstraction; legacy Mode 1--5 removed from the checklist
language). - ⚠️ I \*\*did not\*

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-071\*\* Tritone: make \*\*all options
available\*\*:

# GEG-072

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   6
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:50:56 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding. The lock-in is now treated as \*\*canonical
documentation\*\*, not discussion. \-\-- \## ✅ Action taken I have
finalized these five areas as \*\*authoritative lock-in rules\*\*: 1.
\*\*Display modes priority / stacking\*\* 2. \*\*Difficulty matrix (Free
Play / Easy / Medium / Hard)\*\* 3. \*\*SAM strict acce

2026-01-16 10:15:38 UTC --- Guitar Edu Game Setup --- assistant: \##
Assessment result: last completed GEG checkpoint (per the zip) \###
Purpose Identify the most recent \*\*GEG-xxx checkpoint marked as
completed\*\* in the uploaded snapshot
\`guitar-edu-ui_01_15_26_78.zip\`. \### Files reviewed (read-only) -
\`BUILD_LOG.md\` - \`CHANGELOG.md\` - \`CHECKLIST.md\` - \`docs/TASK_B

2026-01-16 10:28:58 UTC --- Guitar Edu Game Setup --- assistant: \##
Step completed: reconcile "GEG-xxx completion" conflicts (doc authority
clarified) \### Purpose Remove ambiguity about which files define "done
vs remaining," so we can return to checklist-driven coding without
documentation drift. \### Files touched (docs-only) -
\`docs/TASK_BOARD.md\` \*(marked lega

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-072\*\* Tritone spelling resolved by
\*\*scale/mode/key context\*\* where applicable (some scales imply #IV,
others ♭V).

# GEG-080

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-080\*\* Utility tabs exist and match
labels: Num / Note / Chord / Scale.

# GEG-081

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-081\*\* Num tab:

# GEG-082

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 10:59:06 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding. Below is the \*\*Rewrite Audit -- Suggestions Only\*\* for
the \*\*next sections of the checklist\*\*, following the exact method
agreed upon. No files are modified. This is a \*\*proposal report\*\*,
not an execution step. \-\-- \# REWRITE AUDIT -- SUGGESTIONS REPORT
\*\*Scope:\*\* Remaining checklist secti

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-082\*\* Note tab:

# GEG-083

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-083\*\* Chord tab:

# GEG-084

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-084\*\* Scale tab:

# GEG-090

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-090\*\* Dev/Test Mode toggle in Main Menu
Settings works.

# GEG-091

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-091\*\* When Dev/Test is enabled, show dev
options inside the Utility/Misc area (per spec).

# GEG-092

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-092\*\* Dev tools allow:

# GEG-100

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-100\*\* Update fretboard background image
and re-align hitboxes precisely.

# GEG-101

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-101\*\* Update staff + tablature
background and re-align hitboxes precisely.

# GEG-102

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-102\*\* Confirm hover highlight + click
zones align to the new art at different viewport sizes.

# GEG-110

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-110\*\* Remove legacy/superseded item:
\*\*GEG-021\*\* (no longer relevant).

# GEG-111

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-111\*\* Stop button label is \*\*End\*\*
(ends the game instance).

# GEG-112

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-16 13:26:34 UTC

  Mentions (scoped)                   5
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-16 12:44:04 UTC --- Guitar Edu Game Setup --- assistant:
Understood. The checklist \*\*is\*\* partially outdated relative to the
\*\*current Start/Launch menu + Match Options UI\*\* in the latest
snapshot (\`guitar-edu-ui_01_16_26_83.zip\`). I scanned the canon docs
and the actual UI implementation to identify \*\*exact conflicts\*\* and
the \*\*minimum revision set\*\* ne

2026-01-16 13:12:19 UTC --- Guitar Edu Game Setup --- assistant: Proceed
complete. I performed the \*\*checklist/spec alignment revision\*\*
based on your resolutions and removed the specific outdated elements you
flagged. \## Brief summary - Implemented \*\*R-1 (A):\*\* removed the
\*\*Accidentals Pool control\*\* from Match Options UI, while preserving
\*\*Staff Accidentals\*\*

2026-01-16 13:26:34 UTC --- Guitar Edu Game Setup --- assistant:
Proceeding as directed. I performed a \*\*comprehensive, step-by-step
audit\*\* of the canon docs against the \*\*current Launch/Menu + Match
Options\*\* implementation and applied the \*\*minimum revisions\*\*
needed to resolve the specific outdated instructions you flagged
(without introducing new systems). \#

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-112\*\* Accidentals controls are present
in Match Controls UI and staff accidental behavior is preserved (staff
adheres to standard notation rules; other surfaces remain flexible).

# GEG-113

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-113\*\* Remove "Unlimited Misses" and "No
Hints" from play style options (per project direction).

# GEG-116

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-15 02:54:25 UTC

  Last Modified (last mention)        2026-01-15 03:06:13 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-15 02:54:25 UTC --- Match Options UI Reconciliation ---
assistant: Added to canon: \*\*Right-click (mouse context menu) opens an
Answer Shortcut Menu\*\* (details to be defined/refined later). \## Next
steps \### 1) Canon insertion points (documentation) -
\*\*DOCS/LOCK_IN_TABLES.md\*\* - Add a new subsection under
input/interaction rules: \*\*Answer Shortcut Menu (Right-Click

2026-01-15 03:00:06 UTC --- Match Options UI Reconciliation ---
assistant: Completed. I \*\*canonized\*\* the right-click Answer
Shortcut Menu and made it \*\*auditable + testable in docs\*\* (without
defining contents prematurely). \### What I shipped (doc + ledger
updates) - \*\*Created:\*\* \`DOCS/LOCK_IN_TABLES.md\` - Locks the five
truth-table areas (Display Modes, Difficulty, SAM,

2026-01-15 03:06:13 UTC --- Match Options UI Reconciliation ---
assistant: Understood. Right-click stays in canon, but we will \*\*not
implement it now\*\*. \## Updated priority - \*\*GEG-116 (Right-click
Answer Shortcut Menu):\*\* Defer. No code work until higher-priority
testing blockers are cleared. \## Next step The next highest-value step
for testing is to make sure \*\*the core

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] GEG-116 Right-click Answer Shortcut Menu
(surface-aware, context-gated; submits through unified input pipeline).

CHANGELOG.md: - Checklist: Added \`GEG-116\` Right-click Answer Shortcut
Menu.

# GEG-200

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-200\*\* Readability/contrast pass across
menus and tabs.

# GEG-201

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 10:56:08 UTC

  Mentions (scoped)                   2
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-201\*\* Button/tab state styling
consistency (selected vs disabled vs hover).

# GEG-202

  -----------------------------------------------------------------------
  Type                                ChecklistItem
  ----------------------------------- -----------------------------------
  Lifecycle State                     ACTIVE

  Authority Source                    CHECKLIST

  Disposition                         KEEP

  Date Created (first mention)        2026-01-14 10:18:47 UTC

  Last Modified (last mention)        2026-01-14 11:00:56 UTC

  Mentions (scoped)                   3
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 11:00:56 UTC --- Match Options UI Reconciliation ---
assistant: They are \*\*not "missing tasks"\*\* in the current canon
set. In \*\*01_13_26_19\*\*, the \*\*only authoritative task ledger\*\*
that defines GEG IDs is \*\*CHECKLIST.md\*\*, and it simply does \*\*not
define\*\* a large number of numbers---so those IDs \*\*do not exist\*\*
in the project right now unless we explicitly add

## Anchor Evidence (docs)

CHECKLIST.md: - \[ \] \*\*GEG-202\*\* Spacing/alignment final pass:
staff/tab, rail, fretboard, utility panels.

# MATCH_SETTINGS_APPLY

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     DEFERRED

  Authority Source                    CHAT_ONLY

  Disposition                         KEEP

  Date Created (first mention)        2026-01-10 11:28:38 UTC

  Last Modified (last mention)        2026-01-16 23:39:55 UTC

  Mentions (scoped)                   21
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-10 11:28:38 UTC --- Patch Splash Match Rules --- assistant: You
were at \*\*A1.40\*\* earlier; the current build line is now at
\*\*A1.52\*\*. I applied the \*\*next step (A1.52)\*\* to keep the
project trajectory "playable-first" and to stop settings drift: -
\*\*Fixed live settings sync\*\* - \`accidentalView\` now correctly
syncs from Start Menu → active match settings. -

2026-01-14 09:30:49 UTC --- Match Options UI Reconciliation --- user:
Goal: Finalize and implement the Match Options UI and behavior using the
existing archive as the single source of truth, resolving only
documented conflicts and making no speculative additions. This frames
the conversation as execution + reconciliation, not ideation. 2. Files
to Treat as Authoritati

2026-01-14 09:30:51 UTC --- Match Options UI Reconciliation ---
assistant: \## Authoritative files for this chat (single source of
truth) MATCH_SETTINGS_SPEC.md START_SCREEN_UI_MAPPING.md
ADVANCED_MATCH_OPTIONS_UI_MAPPING.md DEPRECATED_TERMS.md Latest build
archive (guitar-edu-ui_01_13_26_18.zip or newer) If something is not in
these files, it does not exist unless we expli

2026-01-14 09:32:50 UTC --- Match Options UI Reconciliation --- user:
Goal: Finalize and implement the Match Options UI and behavior using the
existing archive as the single source of truth, resolving only
documented conflicts and making no speculative additions. This frames
the conversation as execution + reconciliation, not ideation. 2. Files
to Treat as Authoritati

2026-01-14 09:33:53 UTC --- Match Options UI Reconciliation ---
assistant: MATCH_SETTINGS_SPEC.md START_SCREEN_UI_MAPPING.md
ADVANCED_MATCH_OPTIONS_UI_MAPPING.md DEPRECATED_TERMS.md Latest build
archive (guitar-edu-ui_01_13_26_18.zip or newer) If something is not in
these files, it does not exist unless we explicitly add it. - No legacy
Mode 1--5 concepts - Musical modes ar

2026-01-14 10:56:08 UTC --- Match Options UI Reconciliation --- user: A)
Core gameplay flow GEG-001 End / New / Exit correctly control a single
match instance (End truly terminates match state) GEG-002 Turn loop
fully wired: turn start → input → end turn → scoring → (bonus phase) →
next player GEG-003 Intermission phase displays and transitions
correctly (multiplayer)

2026-01-14 12:21:36 UTC --- Match Options UI Reconciliation ---
assistant: Understood. To reliably test what you \*already have\*, the
menus must match the \*\*canonical menu spec\*\* you uploaded
(\`Guitar-Edu-UI_Menu_Layout_and_Design.md\`) and the match canon docs
in the build. Below is a \*\*menu compliance checklist\*\* (what's
currently mismatched vs what must be true), followed

2026-01-14 13:09:41 UTC --- Match Options UI Reconciliation ---
assistant: Proceeding---with \*\*context-gated controls\*\* explicitly
incorporated---so the menus become test-ready \*\*without inventing new
systems\*\*. \## What "up to date" means for testing A tester should be
able to: - Start a match with \*\*Basic Match Settings\*\* fully visible
and complete. - Expand \*\*Advanced Match

# MULTI_SURFACE_DESYNC

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     DEFERRED

  Authority Source                    CHAT_ONLY

  Disposition                         KEEP

  Date Created (first mention)        2025-12-19 00:06:27 UTC

  Last Modified (last mention)        2026-01-16 23:39:55 UTC

  Mentions (scoped)                   139
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 02:56:03 UTC --- Guitar education game design --- assistant:
Below is a \*\*Systems Contract\*\* you can treat as the "immutable
spine" of the project. It's written engine-first, renderer-agnostic, and
covers the rules you've locked in so far. (It's intentionally explicit
so it can be implemented and unit-tested.) \-\-- \# Guitar Education
Game Systems Contract v1.0

2025-12-19 16:01:03 UTC --- Guitar education game design --- user: I
think there is a misunderstanding of what I want for mode 3. I don\'t
want the strings to be in the \"10 key\" that makes it not a 10 key\...
the interfaces goal for this game needs to include tablature to
reinforce reading the notes from it. the way I envision this working is
the player clicks on the

2025-12-19 16:28:21 UTC --- Guitar education game design --- assistant:
You're absolutely right---Mode 3 should \*\*teach tablature fluency\*\*,
so the interface must \*\*look and behave like tab\*\*, not like a
keypad with strings embedded in it. Here's what I've implemented
conceptually and partially in the current shell, and what still needs
finishing before you'll have a clea

2025-12-19 17:02:38 UTC --- Guitar education game design --- assistant:
Understood --- \*\*Mode 3 should be tab-only\*\*, and \*\*Mode 4 will be
the one that combines tab + staff + fretboard\*\*. The version you
tested treated Mode 3 like "tab keypad + string buttons," which breaks
the learning goal (it's not reinforcing real tablature reading/writing).
Here's what we are impleme

2025-12-19 17:22:25 UTC --- Guitar education game design --- assistant:
You can have \*\*both consistency and maximum learning impact\*\* if you
separate three things that are currently entangled: 1) \*\*What the
player sees (representation)\*\*: tab, staff, fretboard 2) \*\*What the
player must do (task)\*\*: write tab, read tab, name a note, find a
location 3) \*\*What the competit

2025-12-19 18:14:47 UTC --- Guitar education game design --- assistant:
Yep --- that sketch is a strong "systems UI" layout. It's basically a
\*\*3-zone vertical stack + right-side player dock\*\*, which scales
cleanly from mouse to smartboard. Here's how I'd formalize it so we can
build it without rework, including the rotating/shrinking scorecards.
\-\-- \## Screen layout cont

# NOTE_RAIL

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-24 19:28:15 UTC

  Last Modified (last mention)        2026-01-16 22:03:14 UTC

  Mentions (scoped)                   36
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-24 19:28:15 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Summary of Guitar Learning Game
Requirements\*\* The project centers around a \*\*guitar learning
game\*\* that teaches players various musical concepts such as
\*\*notes, chords, scales, and intervals\*\*, through an interactive
gaming experience. Below is a detailed, structured breakdown of t

2025-12-24 19:47:16 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Description of the Guitar Learning Game
Interface\*\* The user interface (UI) for the \*\*Guitar Learning
Game\*\* should provide a \*\*clean, intuitive, and engaging\*\*
environment that allows players to learn guitar concepts in a visually
stimulating way. The interface needs to blend functio

2025-12-24 19:55:30 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Description of the Guitar Learning Game
Interface\*\* The \*\*guitar learning game interface\*\* is designed to
provide an intuitive and immersive environment for learning musical
concepts like notes, chords, scales, and intervals. This interface
should not only be functional but also engag

2025-12-24 19:56:20 UTC --- Guitar Learning Game Requirements ---
assistant: The interface for the guitar learning game should be
intuitive and visually engaging, offering clear feedback for both
beginners and experienced players. The key elements of the interface are
outlined below, with attention to user experience, functionality, and
scalability. \-\-- \### \*\*1. Main View an

2025-12-24 19:59:26 UTC --- Guitar Learning Game Requirements ---
assistant: \### \*\*Detailed Description of the Game Modes\*\* The
guitar learning game will feature \*\*four main modes\*\* to guide
players through various aspects of music theory, and two additional
modes (Chords and Scales) that have yet to be fully added. Each mode has
a specific educational focus, allowing player

2025-12-24 20:04:41 UTC --- Guitar Learning Game Design - Layout HTML,
CSS, JAVA --- user: Detailed Summary of Guitar Learning Game
Requirements The project centers around a guitar learning game that
teaches players various musical concepts such as notes, chords, scales,
and intervals, through an interactive gaming experience. Below is a
detailed, structured breakdown of the requirements

2025-12-24 20:04:42 UTC --- Guitar Learning Game Design - Layout HTML,
CSS, JAVA --- assistant: \### Guitar Learning Game: Detailed Project
Breakdown \*\*Objective:\*\* The guitar learning game aims to teach
players musical theory concepts such as notes, chords, scales,
intervals, and more through an interactive gaming experience. Below is a
comprehensive breakdown of the project's requirements, fo

2025-12-24 20:34:10 UTC --- Guitar Learning Game Design - Layout HTML,
CSS, JAVA --- assistant: We can proceed to coding the layout based on
the provided files and the structure. From the files you\'ve uploaded,
the \`package.json\`, \`vite.config.ts\`, and \`tsconfig.json\` give us
important information about the build environment (Vite, TypeScript),
while the SVGs provide assets like guitar tabs, f

# RIGHT_CLICK_SHORTCUT

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2026-01-12 08:53:38 UTC

  Last Modified (last mention)        2026-01-16 22:38:56 UTC

  Mentions (scoped)                   9
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-12 08:53:38 UTC --- Guitar-Edu-UI Audit --- user: the dev/tools
are not showing up as activated but cannot see the controls. I have
attached screen shots showing step by step what is happening and how
things are not appearing or disappearing when one input after another is
put in. i cannot test making chords in the staff as only one note is
showing

2026-01-15 02:54:14 UTC --- Match Options UI Reconciliation --- user:
before I forget\... I just got the idea to use the mouse right click as
a shortcut menu for answers, add it to the cannon which we can flush out
and define/refine later. show next steps

2026-01-15 02:54:16 UTC --- Match Options UI Reconciliation ---
assistant: Add to Guitar Education Game canon: use mouse right-click as
a shortcut/context menu for answers (to be defined/refined later).

2026-01-15 02:54:25 UTC --- Match Options UI Reconciliation ---
assistant: Added to canon: \*\*Right-click (mouse context menu) opens an
Answer Shortcut Menu\*\* (details to be defined/refined later). \## Next
steps \### 1) Canon insertion points (documentation) -
\*\*DOCS/LOCK_IN_TABLES.md\*\* - Add a new subsection under
input/interaction rules: \*\*Answer Shortcut Menu (Right-Click

2026-01-15 03:00:06 UTC --- Match Options UI Reconciliation ---
assistant: Completed. I \*\*canonized\*\* the right-click Answer
Shortcut Menu and made it \*\*auditable + testable in docs\*\* (without
defining contents prematurely). \### What I shipped (doc + ledger
updates) - \*\*Created:\*\* \`DOCS/LOCK_IN_TABLES.md\` - Locks the five
truth-table areas (Display Modes, Difficulty, SAM,

2026-01-15 03:06:13 UTC --- Match Options UI Reconciliation ---
assistant: Understood. Right-click stays in canon, but we will \*\*not
implement it now\*\*. \## Updated priority - \*\*GEG-116 (Right-click
Answer Shortcut Menu):\*\* Defer. No code work until higher-priority
testing blockers are cleared. \## Next step The next highest-value step
for testing is to make sure \*\*the core

2026-01-15 04:34:28 UTC --- Match Options UI Reconciliation ---
assistant: Below is a \*\*clean, authoritative "fresh chat" instruction
block\*\* you can paste verbatim into a new conversation. It is designed
to force a \*\*full audit\*\*, eliminate drift, and reset the assistant
into \*\*execution + reconciliation mode\*\*, not ideation. \-\-- \#
Guitar Education Game --- Full Audit & Rec

2026-01-15 04:37:12 UTC --- Guitar Education Game Audit --- user: Guitar
Education Game --- Full Audit & Recovery Pass Primary Objective Conduct
a full audit of the Guitar Education Game project with the goal of
restoring functional rendering, interaction, and testability, strictly
using the existing documentation and build artifacts as the single
source of truth. T

# RUNTIME_TESTS

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2026-01-12 09:15:45 UTC

  Last Modified (last mention)        2026-01-16 23:39:55 UTC

  Mentions (scoped)                   12
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2026-01-12 09:15:45 UTC --- Guitar-Edu-UI Audit --- assistant:
Yes---adding a \*\*repeatable test script + a one-click runner\*\* will
dramatically speed iteration, especially for the staff/tab timeline and
Mode 3 truth rules. \## A practical testing stack for GuitarEdu UI
\### 1) "Fast logic tests" (no browser UI) Use \*\*Vitest\*\* for pure,
deterministic tests of the ru

2026-01-12 09:26:01 UTC --- Guitar-Edu-UI Audit --- assistant: Here's a
clean "handoff packet" you can paste into a \*\*new chat thread\*\* to
pick up immediately without re-explaining anything. \-\-- \## New Thread
Title \*\*GuitarEdu UI --- Add Automated Tests + One-Click Runner
(Vitest + Playwright + In-App Test Runner)\*\* \-\-- \## Paste This As
The First Message In The N

2026-01-14 10:18:47 UTC --- Match Options UI Reconciliation ---
assistant: You're right --- my prior list only reflected the \*\*Match
Options reconciliation\*\* and ignored the repo's \*\*actual task
ledger\*\* (CHECKLIST + CANON_PROGRESS + BUILD_LOG). Below is the
comprehensive, documentation-driven status map for \*\*01_13_26_19\*\*.
\-\-- \# ✅ Completed (implemented in code and/or lock

2026-01-15 04:39:25 UTC --- Guitar Education Game Audit --- assistant:
Below is \*\*Task 1: the audit table\*\*, produced strictly from what is
\*actually present\* in the mounted build artifacts I can inspect in
this environment. \## Critical blocker (fact, evidenced) The build
archive you named as canonical
(\*\*\`guitar-edu-ui_01_14_26_07.zip\`\*\*) is \*\*not available\*\* in
the c

2026-01-16 21:15:23 UTC --- Guitar Edu Game Setup --- assistant: Runtime
test attempt completed (container-side), with \*\*blocking
dependency-install limitations\*\* in this environment. I \*did\* get us
back to a \*\*canon-compliant, type-safe\*\* state and repaired the
deprecated-terms tripwire so it matches the updated definitions. \###
What I ran (and what happened) -

2026-01-16 21:44:49 UTC --- Guitar Edu Game Setup --- assistant: Got it.
Your runtime log + screenshot are enough to take action, and you're
right: there are \*\*several UI elements that are now
redundant/out-of-canon for the current Match Options model\*\*, plus one
\*\*core correctness issue\*\* (exact pitch matching across
staff/tab/fretboard). I'm going to handle thi

2026-01-16 22:03:14 UTC --- Guitar Edu Game Setup --- assistant:
Completed \*\*Step 1: UI redundancy cleanup\*\* (only what you
approved). \## Brief summary - Removed the redundant \*\*Play Style
Options\*\* block from \*\*Operations\*\* - Removed \*\*Active
Surfaces\*\* from the \*\*Task Context\*\* panel (left menu) - Removed
the \*\*Prompt banner/label/value\*\* from the \*\*Note Rail\*\*

2026-01-16 22:22:45 UTC --- Guitar Edu Game Setup --- assistant: User
wants runtime tests every 15 iterations starting at build 90 (90, 105,
120, etc.) going forward.

# STAFF_RULES

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-27 22:16:50 UTC

  Last Modified (last mention)        2026-01-16 22:13:02 UTC

  Mentions (scoped)                   40
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-27 22:16:50 UTC --- Rendered Staff+Tab Implementation ---
assistant: Done. I replaced the \*\*static Staff+Tab SVG\*\* with a
\*\*fully rendered Staff+Tab surface\*\* (Canvas), so it can scale
cleanly, generate ledger lines correctly, and keep staff notes + tab
numbers locked to the same subdivision grid. \[Download the updated
project zip\](sandbox:/mnt/data/gedu_stafftab_ren

2025-12-28 00:09:39 UTC --- Rendered Staff+Tab Implementation --- user:
the music staff being rendered doesn\'t leave room for notes E2 to
E5\... it also needs to show the Treble Clef and any sharps or flats to
indicate key signatures. the fretboard is rendering fine but it is
leaving a lot of room below it. we can take some of that room to center
the fretboard and use th

2025-12-28 00:30:55 UTC --- Rendered Staff+Tab Implementation --- user:
the music staff being rendered doesn\'t leave room for notes E2 to
E5\... it also needs to show the Treble Clef and any sharps or flats to
indicate key signatures. the fretboard is rendering fine but it is
leaving a lot of room below it. we can take some of that room to center
the fretboard and use th

2025-12-28 00:36:41 UTC --- Rendered Staff+Tab Implementation ---
assistant: Understood. Here's what I've confirmed so far and the
concrete plan to address every point in your screenshot. \-\-- \##
What's actually wrong right now (root causes) \### 1) \*\*Staff range is
clipped (E2 → E5 can't fit)\*\* The current canvas renderer only
allocates \*\*staff step centers from the bottom li

2025-12-28 00:56:30 UTC --- Rendered Staff+Tab Implementation ---
assistant: Understood --- here is what has been addressed so far, what
was implemented, and what still needs to be completed to fully satisfy
your requirements. \-\-- \## ✅ What has already been implemented (in
the new v31 layout) \### 1) \*\*Staff + Tab is now rendered (Canvas),
not SVG\*\* - The Staff + Tab panel has

2025-12-28 04:59:29 UTC --- Rendered Staff+Tab Implementation ---
assistant: Implemented in the \*\*newer v31 layout\*\*: \### What
changed - \*\*Staff+TAB background is now generated (rendered) at
runtime\*\* (no dependency on the exported staff SVG file). - Added a
\*\*Treble Clef\*\* plus \*\*automatic key signature rendering\*\*
(Ionian → Locrian derive parent major; Chromatic/Pentatonic

2025-12-28 05:41:11 UTC --- Rendered Staff+Tab Implementation ---
assistant: I updated the \*\*new-layout v31 build\*\* so the Staff+TAB
panel is \*\*fully programmatic (no external SVG asset)\*\*, has
\*\*extended vertical headroom for ledger notes\*\*, and now renders a
\*\*clef + key signature\*\*. I also tightened the fretboard
presentation by \*\*centering the SVG\*\* so you can reclaim so

2025-12-28 07:13:33 UTC --- Rendered Staff+Tab Implementation ---
assistant: I updated the \*\*latest v31 layout zip you provided\*\* and
replaced the Staff+Tab SVG dependency with a \*\*canvas renderer\*\*
that supports: - \*\*Standard notation framing\*\* (treble/bass clef
support) - \*\*Key signature rendering\*\* (sharps/flats) -
\*\*Ledger-line-safe vertical scaling\*\* so the staff always

# SVG_RENDERER_DUPLICATION

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     DEFERRED

  Authority Source                    CHAT_ONLY

  Disposition                         KEEP

  Date Created (first mention)        2025-12-19 00:10:00 UTC

  Last Modified (last mention)        2026-01-16 23:39:55 UTC

  Mentions (scoped)                   90
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:04:56 UTC --- Guitar education game design --- user:
sounds like a good plan of attack. I agree on the engine and
renderer\... enharmonics circle should be allowed to be scored twice
since there is both a flat and a sharp occupying that space. for
example: f sharp and g flat are different notes and can both be
generated in a chromatic mode but would on

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 01:34:07 UTC --- Guitar education game design --- user: no
the inharmonic split should be the same as in the SVGs\... to sharpen
you go up and to flat you go down\... so sharp on the left and flat on
the right. it makes more sense visually since it connects closest to the
note it is effecting (affect/effect whatever). on the sharps and flats
if it isn\'t to

2025-12-19 01:34:09 UTC --- Guitar education game design --- assistant:
Got it --- we'll match the \*\*SVG mental model\*\* exactly: - \*\*Sharp
= left half\*\* (because it "goes up") - \*\*Flat = right half\*\*
(because it "goes down") - The split visually "leans toward" the note
it's affecting (your intuition is solid, and yes: \*affect\* is the verb
😉). And we'll support \*\*two diffe

2025-12-19 02:45:14 UTC --- Guitar education game design --- assistant:
Absolutely. Here's an "optimization-first" checklist---\*\*macro to
micro\*\*---that will save you time, bugs, and performance headaches on
smart boards. I'm framing these as \*\*decisions + small implementation
patterns\*\* you can lock in before writing real code. \-\-- \## 1) Lock
the event order so rules never

2025-12-19 02:56:03 UTC --- Guitar education game design --- assistant:
Below is a \*\*Systems Contract\*\* you can treat as the "immutable
spine" of the project. It's written engine-first, renderer-agnostic, and
covers the rules you've locked in so far. (It's intentionally explicit
so it can be implemented and unit-tested.) \-\-- \# Guitar Education
Game Systems Contract v1.0

2025-12-19 03:27:53 UTC --- Guitar education game design --- assistant:
Here's the next concrete step: I built a \*\*runnable Mode 1 (fretboard)
prototype\*\* that includes the \*\*UI adapter + SVG layout extraction +
split-circle sharp/flat tap logic + basic overlay renderer + local
leaderboard\*\*. \[Download the prototype
ZIP\](sandbox:/mnt/data/gedu-fretboard-prototype.zip) \#

# TAB_RULES

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-19 00:06:27 UTC

  Last Modified (last mention)        2026-01-16 10:59:06 UTC

  Mentions (scoped)                   40
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:05:28 UTC --- Guitar education game design --- assistant:
Understood --- these refinements make the game \*more musically
correct\* and give the board real strategic depth without bloating the
engine. Here's how I would formalize it so it stays clean in code and
clear on the smart board. \## Enharmonics as distinct "claimable
variants" (F# and Gb can both score

2025-12-19 16:01:03 UTC --- Guitar education game design --- user: I
think there is a misunderstanding of what I want for mode 3. I don\'t
want the strings to be in the \"10 key\" that makes it not a 10 key\...
the interfaces goal for this game needs to include tablature to
reinforce reading the notes from it. the way I envision this working is
the player clicks on the

2025-12-19 16:28:21 UTC --- Guitar education game design --- assistant:
You're absolutely right---Mode 3 should \*\*teach tablature fluency\*\*,
so the interface must \*\*look and behave like tab\*\*, not like a
keypad with strings embedded in it. Here's what I've implemented
conceptually and partially in the current shell, and what still needs
finishing before you'll have a clea

2025-12-19 17:02:38 UTC --- Guitar education game design --- assistant:
Understood --- \*\*Mode 3 should be tab-only\*\*, and \*\*Mode 4 will be
the one that combines tab + staff + fretboard\*\*. The version you
tested treated Mode 3 like "tab keypad + string buttons," which breaks
the learning goal (it's not reinforcing real tablature reading/writing).
Here's what we are impleme

2025-12-19 21:16:10 UTC --- Guitar education game design --- assistant:
Excellent --- the shell, rail, and Mode 1 flow are now stable enough
that the next step should be \*\*Mode 3 built correctly\*\*
(tablature-first interaction), while preserving the modular systems
contract we've been building toward. Below is the "next step" plan I
recommend locking in before we write mor

2025-12-20 01:19:29 UTC --- Guitar education game design --- assistant:
Understood --- I've made two concrete forward moves in the project: 1)
✅ \*\*Updated the project/asset naming to remove problematic
characters\*\* 2) ✅ \*\*Proceeded to the next step by implementing the
core Mode 3 (tablature) interaction model\*\* However, there is \*\*one
UI wiring mismatch\*\* that still needs

# UTILITY_TABS

  -----------------------------------------------------------------------
  Type                                SystemTerm
  ----------------------------------- -----------------------------------
  Lifecycle State                     UNKNOWN

  Authority Source                    CHAT_ONLY

  Disposition                         ARCHIVE_CANDIDATE

  Date Created (first mention)        2025-12-19 00:06:27 UTC

  Last Modified (last mention)        2026-01-16 12:44:04 UTC

  Mentions (scoped)                   109
  -----------------------------------------------------------------------

## Description

(Populate from Specs/Checklist during Phase 4 reconciliation. This entry
lists evidence only.)

## Function

(To be mapped to UI/engine behavior; no assumptions in Phase 3.)

## Notes About Changes (evidence excerpts)

2025-12-19 00:06:27 UTC --- Guitar education game design --- user: I
want to create a video game for teaching. I will be using this on a
smart board. The game should work on computers, browsers, and smart
screens. So touch, and mice will need to be considered. I would like the
game to have a splash screen where you can select game mode, players (1
to 16), and have

2025-12-19 00:10:00 UTC --- Guitar education game design --- assistant:
\## 1) Platform decision that fits smart boards (and doesn't fight you
later) Build this as a \*\*web game (HTML5)\*\* that runs: -
\*\*Browser\*\* (Chrome/Edge/Safari) on PCs, tablets, smart boards -
\*\*Fullscreen / kiosk-ready\*\* - \*\*Touch + mouse unified\*\* via
\*\*Pointer Events\*\* (\`pointerdown\`, \`pointerup\`)

2025-12-19 01:23:53 UTC --- Guitar education game design --- user:
multiplier behavior should show the multiplier next to the score so at
three in a row a x2, six a x3, etc\... would show up next to their score
card. while a large animation would show \"3 in a row!\"\... \"6 in a
row\" \... \"8 in a row\" \"heating up\" and once they get to 10 in a
row \"hot streak\" and at 20

2025-12-19 01:23:55 UTC --- Guitar education game design --- assistant:
Perfect --- here's a tight spec-level refinement that keeps your
\*\*engine/renderer split intact\*\*, upgrades the \*\*classroom UX\*\*,
and cleanly introduces the \*\*enharmonic "double-connect" twist\*\*
without creating rule chaos. \## Scorecard UX and multiplier
presentation \### Scorecard layout (per player)

2025-12-19 01:57:53 UTC --- Guitar education game design --- assistant:
Here are the highest-leverage optimizations to lock down \*\*before
coding\*\*, so you don't end up refactoring core rules/UI later. I'm
focusing on decisions that (1) touch many systems, (2) affect
fairness/teachability, and (3) are easiest to settle now. \## 1)
Formalize the "single source of truth" fo

2025-12-19 02:25:50 UTC --- Guitar education game design --- user:
\"blackout\" should be defined by what is available. so if we are in
chromatic it will be everything, if it is in a key, scale, or interval
it will be limited to the notes that are defined therein. Bonus 5pts if
they steal an enharmonic with the opposite generated, helps reinforce
the note position an

2025-12-19 02:25:54 UTC --- Guitar education game design --- assistant:
Here are the three updates, tightened into \*\*engine-ready rules\*\* so
you can code without reinterpretation later. \## 1) Blackout match type
is defined by "what is available" \*\*Definition:\*\* Blackout ends when
\*\*every claimable slot on the board (given the current Settings) has
been claimed by someon

2025-12-19 02:37:43 UTC --- Guitar education game design --- assistant:
These are excellent "pre-code" optimizations because they touch the
generator, fairness, steals, and connect mechanics all at once. Here's a
tight, engine-ready way to lock them in. \## 1) Never generate an
unwinnable prompt \### Core rule A prompt may only be generated if the
\*\*current player has at
