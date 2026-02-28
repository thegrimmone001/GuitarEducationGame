# Build Archive Protocol (Canon)

Tool-enforced canon: `tools/package_release.mjs` and `tools/tripwire_zip_structure.mjs`.

## Canon ZIP rule (Solution B)
Release ZIPs MUST be flat (no top-level root folder).

ZIP root MUST include (minimum):
- package.json
- src/
- DOCS/

Allowed top-level folders at ZIP root:
- DOCS/
- public/
- scripts/
- src/
- tests/
- tools/
