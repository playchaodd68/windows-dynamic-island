## Context

The workspace starts empty, so the project can choose a desktop stack optimized for Windows and fast verification. The app should feel like a Windows-native version of Dynamic Island: a compact top-center pill that expands only when it has useful context. It must be useful as a local utility even before real OpenAI credentials are configured.

The main stakeholders are a Windows user testing Codex and a future maintainer who needs predictable commands, tests, and GitHub project hygiene.

## Goals / Non-Goals

**Goals:**

- Build a Windows desktop MVP with a frameless, always-on-top island shell.
- Provide a polished renderer UI with compact and expanded states.
- Support clipboard AI-style workflows through a provider abstraction with a deterministic mock provider.
- Include non-AI utilities such as timers and quick notes so the island remains useful offline.
- Keep core behavior testable outside Electron where possible.
- Add local verification commands and GitHub Actions for repository management.

**Non-Goals:**

- Shipping a signed installer or auto-updater in the first iteration.
- Implementing voice capture, OCR, screen selection, or system-audio transcription.
- Storing user clipboard history beyond the active session.
- Sending data to OpenAI by default. The first implementation uses a local mock provider and leaves real API integration behind an explicit provider boundary.

## Decisions

### Use Electron, React, TypeScript, and Vite

Electron is the pragmatic Windows desktop choice here because Node and npm are available locally while Rust is not installed. Tauri would produce a lighter binary, but it would require the Rust toolchain and add setup friction. A web-only PWA would be easier to host but could not reliably provide frameless always-on-top behavior, global shortcuts, tray controls, or clipboard integration.

React and TypeScript keep the renderer modular and testable. Vite gives fast local development and straightforward builds.

### Split Electron responsibilities from domain logic

The Electron main process owns native behavior: window creation, tray, global shortcuts, clipboard access, and IPC. The preload script exposes a narrow API to the renderer. Shared domain modules own island state, action routing, timer state, and mock AI transformations.

This separation keeps native integration thin and lets Vitest cover most behavior without launching Electron.

### Start with a deterministic mock AI provider

The first provider runs locally and returns predictable summaries, rewrites, translations, task extraction, and formatting. This makes tests stable and avoids requiring an API key before the app is useful.

The provider interface will accept an action kind and input text, then return a structured result. A future OpenAI provider can implement the same interface and be selected from settings.

### Design the island as a state machine

The UI should not be driven by scattered booleans. It will use explicit states: `idle`, `expanded`, `working`, `success`, `warning`, and `hidden`. Events such as `toggle`, `run-action`, `action-complete`, `timer-start`, and `timer-complete` transition the island in a predictable way.

This makes behavior easier to reason about and gives tests precise coverage for interactions.

### Keep the visual direction compact and premium

The app should not look like a generic dashboard. The island uses a dark translucent glass pill, high-contrast accent glows, tight typography, and motion that makes the pill feel alive without becoming distracting. Expanded content uses dense cards, icon buttons, segmented controls, and clear status chips rather than marketing-style sections.

## Risks / Trade-offs

- Electron app size is larger than native alternatives -> Use Electron for MVP speed, keep modules portable, and leave Tauri as a future option if distribution size becomes important.
- Always-on-top windows can annoy users -> Provide hide, tray, and shortcut controls from the first version.
- Clipboard AI can leak sensitive data if sent to a remote provider -> Default to local mock mode, show provider mode, and require explicit future configuration for remote APIs.
- Global shortcuts may conflict with user apps -> Use a configurable default and expose visible shortcut hints.
- Frameless overlay behavior differs across Windows versions and display scaling -> Keep positioning logic isolated and test its calculations independently.

## Migration Plan

This is a new project, so there is no migration. The initial rollout is:

1. Commit OpenSpec artifacts and project scaffold.
2. Implement the MVP behind deterministic local providers.
3. Run typecheck, unit tests, and production build locally.
4. Create a GitHub repository and open the first pull request from the implementation branch.

Rollback is deleting the generated app files or reverting the implementation branch because no external state or user data migration exists.

## Open Questions

- GitHub repository creation requires user authentication. Local Git commits can be prepared now; remote creation and PR opening need either GitHub CLI login, a token, or an available GitHub connector.
- The real OpenAI provider is intentionally deferred until the MVP shell and provider boundary are verified.
