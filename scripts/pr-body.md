## Summary

Builds the first Windows Dynamic Island MVP as an Electron, React, TypeScript desktop companion.

## What changed

- Added OpenSpec proposal, design, capability specs, and implementation tasks for `windows-dynamic-island`.
- Added a frameless always-on-top Electron island shell with tray controls, global shortcuts, preload bridge, and IPC handlers.
- Added a polished React island UI with compact and expanded states.
- Added local mock AI clipboard actions for summarize, rewrite, translate, extract tasks, and Markdown formatting.
- Added focus timer, quick note, recent activity, and result copyback flows.
- Added Vitest coverage for shared domain logic, window positioning, and renderer behavior.
- Added README and GitHub Actions CI for validation, typecheck, tests, and build.

## Verification

- `npm run check`
  - OpenSpec strict validation passed.
  - TypeScript renderer and Electron typecheck passed.
  - Vitest passed: 6 files, 16 tests.
  - Production renderer and Electron build passed.
  - Electron smoke startup passed.

## Notes

The initial AI provider is a deterministic local mock provider. No clipboard content is sent to a remote service by default. A future OpenAI provider can be added behind the existing provider boundary.
