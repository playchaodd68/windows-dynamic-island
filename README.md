# Windows Dynamic Island

A Windows desktop companion inspired by Dynamic Island. It runs as a compact, frameless, always-on-top pill near the top of the screen and expands into a local AI-style utility panel for clipboard actions, focus timers, quick notes, and recent activity.

## What It Does

- Shows a compact top-center island with idle, working, success, warning, and expanded states.
- Expands into a dense desktop utility panel with clipboard actions, timer controls, quick notes, and recent activity.
- Uses a deterministic local mock AI provider for summarize, rewrite, translate, task extraction, and Markdown formatting.
- Reads and writes clipboard text only when the user triggers an action.
- Provides Electron tray controls and global shortcuts.

## Privacy Defaults

The first implementation does not send clipboard content to any remote service. AI-style actions run through the local mock provider. A future OpenAI provider can be added behind the provider interface when explicit API-key configuration is available.

## Shortcuts

- `Ctrl+Shift+Space`: show or hide the island.
- `Ctrl+Shift+I`: show and expand the island.

## Development

```powershell
npm install
npm run dev
```

## Verification

```powershell
npm run validate:openspec
npm run typecheck
npm test
npm run build
npm run smoke
```

Or run the combined gate:

```powershell
npm run check
```

## Project Structure

- `src/main`: Electron main process, native window, tray, shortcuts, and IPC.
- `src/preload`: Typed renderer bridge for clipboard and shell controls.
- `src/renderer`: React island UI.
- `src/shared`: Testable domain logic for states, AI actions, timers, and activity.
- `src/tests`: Vitest tests for shared behavior and renderer behavior.
- `openspec`: OpenSpec proposal, design, specs, and tasks.
