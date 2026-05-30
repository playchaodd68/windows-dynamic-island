## Why

Windows lacks a compact, always-available interaction surface similar to macOS Dynamic Island. A small desktop "island" can make AI and utility actions feel ambient: visible when useful, out of the way when not, and fast to trigger with a keyboard shortcut.

This project is also a strong test target for Windows Codex because it exercises product design, a local desktop runtime, window behavior, IPC, UI polish, tests, Git, and GitHub workflow in one coherent app.

## What Changes

- Create a Windows desktop companion app with a frameless, always-on-top pill window anchored near the top center of the screen.
- Add island states for idle, listening, working, success, warning, and expanded modes.
- Add an expandable activity panel with status cards for clipboard actions, timers, quick notes, and AI-style commands.
- Add global shortcuts and tray controls for showing, hiding, expanding, and quitting the app.
- Add clipboard-aware actions that can summarize, rewrite, translate, extract tasks, and format text through a deterministic local mock provider first.
- Add a timer card that can start, pause, resume, and complete a focused countdown.
- Add settings for launch behavior, shortcut hints, API provider mode, and privacy defaults.
- Add automated tests for state transitions, action routing, timer behavior, and renderer UI behavior.
- Add project documentation, local development commands, and GitHub-ready CI workflow.

## Capabilities

### New Capabilities

- `desktop-island-shell`: Window, tray, shortcut, and app-shell behavior for the Windows Dynamic Island.
- `island-interaction-model`: UI states, expansion behavior, cards, and user interactions inside the island.
- `ai-action-workflows`: Clipboard and text-based AI actions, provider abstraction, privacy-safe mock behavior, and future OpenAI integration path.
- `focus-utilities`: Timer, quick note, and status utilities that make the island useful without requiring external AI calls.
- `quality-and-release-workflow`: Tests, build commands, CI, Git metadata, and release-ready project management artifacts.

### Modified Capabilities

- None.

## Impact

- Adds an Electron, React, TypeScript, Vite, and Vitest desktop application.
- Adds Electron main/preload processes, renderer UI modules, shared domain logic, tests, and documentation.
- Adds OpenSpec artifacts for proposal, specifications, design, and implementation tasks.
- Adds GitHub Actions workflow for install, typecheck, tests, and build.
- Requires Node.js and npm locally. No Rust toolchain is required.
