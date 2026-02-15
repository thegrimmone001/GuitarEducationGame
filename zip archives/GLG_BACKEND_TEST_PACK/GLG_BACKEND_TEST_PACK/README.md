# GLG Backend Test Pack
Files:
- 01_executable_checklist.md — checkbox checklist for manual execution
- 02_console_smoke_script.md — fast console/eventLog validation script
- 03_vitest_harness_outline.md — automated test scaffold outline (Vitest)
- 04_failure_matrix.md — symptom→cause→diagnosis mapping

Usage:
1) Run smoke script first (02) to catch blockers quickly.
2) Run full checklist (01) and record PASS/FAIL.
3) Use failure matrix (04) to triage failures.
4) When stable, implement automated tests per (03).
