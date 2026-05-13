# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (http://localhost:5173) with HMR
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
npm run lint       # ESLint on all .js/.jsx files
```

No test framework is configured yet.

## Architecture

**Stack:** React 19 + Vite (JSX only, no TypeScript). ESLint uses the flat config format (`eslint.config.js`).

**Entry point flow:** `index.html` → `src/main.jsx` (mounts `<App>` into `#root` in StrictMode) → `src/App.jsx`.

**Styling:** Global design tokens and resets in `src/index.css` (CSS custom properties, light/dark via `prefers-color-scheme`). Component-scoped styles live alongside the component (e.g., `App.css`). Vite enables modern nested CSS syntax natively — no preprocessor needed.

**Static assets:** `public/` is served as-is (e.g., `public/icons.svg` for an SVG sprite). Import images/SVGs inside `src/` directly as ES modules.

## Working Rules

- Never run git commit or git push — the user handles all git operations
- After every change, suggest a commit message covering everything that was modified
- Always, for all yet to be commited changes, combine all the messages into a new commit message
- Never rewrite an entire file unless absolutely necessary — only edit the specific lines that changed
- Always state which file and line(s) you are editing before making the edit
- User is on Windows (PowerShell terminal)