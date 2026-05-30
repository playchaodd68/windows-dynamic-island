## 1. Project Setup

- [x] 1.1 Initialize npm, TypeScript, Vite, Electron, React, Vitest, and Testing Library project files
- [x] 1.2 Add source folder structure for Electron main, preload, renderer, shared domain logic, tests, and docs
- [x] 1.3 Add npm scripts for dev, build, typecheck, test, lint-equivalent checks, and Electron preview
- [x] 1.4 Add README and GitHub Actions workflow for install, typecheck, tests, and build

## 2. Shared Domain Logic

- [x] 2.1 Add failing tests for island state transitions, then implement the island state reducer
- [x] 2.2 Add failing tests for deterministic AI action routing, then implement the mock AI provider and action catalog
- [x] 2.3 Add failing tests for focus timer transitions, then implement timer state helpers
- [x] 2.4 Add failing tests for recent activity and notes, then implement activity helpers

## 3. Electron Native Shell

- [x] 3.1 Implement the frameless always-on-top island window with top-center positioning
- [x] 3.2 Implement preload bridge APIs for clipboard, shell controls, app metadata, and settings
- [x] 3.3 Implement main-process IPC handlers for clipboard read/write and island window commands
- [x] 3.4 Implement tray menu and global shortcuts for show, hide, expand, and quit

## 4. Renderer User Interface

- [x] 4.1 Add failing renderer tests for compact and expanded island views, then implement the main React app shell
- [x] 4.2 Implement compact pill UI for idle, working, success, warning, expanded, and hidden-derived visual states
- [x] 4.3 Implement expanded panel with clipboard action cards, timer card, quick note card, recent activity, and settings strip
- [x] 4.4 Implement polished styling, responsive fixed dimensions, motion, disabled states, copy result controls, and keyboard-accessible buttons

## 5. Integration and Verification

- [x] 5.1 Wire renderer actions to preload APIs and shared domain modules
- [x] 5.2 Run OpenSpec validation and fix any proposal/spec/task issues
- [x] 5.3 Run typecheck, tests, and production build locally
- [x] 5.4 Initialize Git repository, commit the implementation branch, and prepare GitHub repository/PR publication
