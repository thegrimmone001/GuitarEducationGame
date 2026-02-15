# Runtime Canon Guards (Enforcement Hooks)

This document records the minimal runtime enforcement hooks that prevent regression into deprecated
legacy patterns.

These guards are intentionally small and surgical. They do not create new systems or refactor the app.
They exist to ensure the codebase cannot silently drift back into prohibited concepts.

---

## Guard 1 — No “Modes” (Legacy uiMode Freeze)

Status: ACTIVE

- Any legacy `uiMode` value (anything other than `"m4"`) is treated as deprecated.
- Runtime behavior forcibly freezes uiMode to `"m4"`.
- A one-time console warning is emitted if a non-`m4` value is encountered.
- The UI selector `#core-gameMode` is disabled and forced to `"m4"` when present.

This guard exists because the canon forbids “modes” and requires Surface Controls + Match Rules
to define session behavior.

References:
- `DOCS/DEPRECATED_TERMS.md`
- `DOCS/CANONICAL_LAYERS_DIAGRAM.md`
- `DOCS/ADVANCED_MATCH_OPTIONS_UI_MAPPING.md`
- `DOCS/START_SCREEN_UI_MAPPING.md`
