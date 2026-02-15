# GLG Failure Matrix (What breaks what)
| Area | Symptom | Likely Cause | Quick Diagnosis | Fix Path |
|---|---|---|---|---|
| Engine lifecycle | Match won't start | INIT_MATCH settings invalid / null player | eventLog missing INIT_MATCH or errors in console | validate settings schema; ensure defaults apply |
| Engine lifecycle | Match won't end cleanly | END_MATCH not firing | eventLog lacks END_MATCH on stop | wire stop handler to END_MATCH |
| Validation | Correct answers marked wrong | pitch normalization mismatch | compare prompt pitch vs input pitch in logs | fix normalization layer; verify enharmonic policy |
| Validation | OUT_OF_SCOPE when it shouldn't | domain bounds mismatch | check minFret/maxFret, enabledStrings | fix domain constraints; ensure UI writes correct values |
| Fretboard render | Notes misaligned | multiple coordinate systems | resize causes drift; mismatch between render & hit-test | enforce single didactic layout model everywhere |
| Fretboard visibility | Hard to see neck | low contrast / missing silhouette cues | strings vanish; frets too faint | increase string hierarchy; add taper/nut cues (no geometry drift) |
| MIDI | Ghost notes / stuck input | listeners not detached | logs show attach without detach | detach on disable/unmount; handle device disconnect |
| Import | Import starts match | import handler calling BEGIN_MATCH | eventLog shows BEGIN_MATCH after import | separate import pipeline; only create artifact |
| Import | Ties lost | import parser drops tie chains | inspect imported artifact for tie groups | preserve tie chains as canonical TieChain |
| Role | Students can change locked settings | checks only in UI | settings change persists despite locks | enforce at write boundary in controller/storage |
| Traditional mode | Scoring still active | mode flag not checked in scoring path | score increments in logs | bypass scoring/timers/bonuses/steal when enabled |
| Assessment | Summary numbers incorrect | projection recomputing truth incorrectly | compare session raw counts vs view totals | derive strictly from stored attempts; unit test projections |
| Adaptive | Feels random | missing seed or unstable ordering | same inputs produce different outputs | require seed; stable sort; stable stringify |
| Teacher bundles | Bad bundles still import | checksum validation too weak | import accepts altered files | require checksums for required artifacts; strict exam mode |
| Persistence | Settings reset on reload | storage key mismatch | localStorage missing expected keys | unify storage keys; migration logic |
