# GuitarEdu — Shell v3 (Modes 1 + 3)

## Requirements
- Node.js 18+ (recommended: 20+)
- npm (bundled with Node)

## Run
```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173/).

## If you see a blank screen
- Make sure you opened `http://localhost:5173/` (NOT `view-source:`).
- Open DevTools → Console to see any errors.
- Ensure you ran `npm install` in this folder.

## Notes
- Mode 1 (fretboard) is wired.
- Mode 3 (tab) is wired with a 10-key + string/row selection + 16-slot measure that clears when full.
- `public/Guitar_Tab_Staff-Blank.svg` is referenced by the Mode 3 view (underscore filename, no `&`).
- Modes 2 and 4 are placeholders.
