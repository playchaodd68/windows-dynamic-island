## ADDED Requirements

### Requirement: Local verification commands
The project SHALL provide commands for typechecking, unit tests, renderer tests, and production build.

#### Scenario: Developer runs tests
- **WHEN** the developer runs the test command
- **THEN** the project executes automated tests for domain logic and renderer behavior

#### Scenario: Developer builds project
- **WHEN** the developer runs the build command
- **THEN** the project compiles TypeScript and production renderer assets

### Requirement: Continuous integration workflow
The repository SHALL include a GitHub Actions workflow that installs dependencies, typechecks, tests, and builds on pull requests.

#### Scenario: Pull request opens
- **WHEN** a pull request targets the main branch
- **THEN** GitHub Actions runs install, typecheck, test, and build steps

### Requirement: Repository documentation
The project SHALL document the app purpose, local setup, development commands, test commands, and privacy defaults.

#### Scenario: Developer opens README
- **WHEN** a developer reads the README
- **THEN** they can understand what the app does and how to run it locally

### Requirement: Git-managed delivery
The project SHALL be committed to Git and prepared for a GitHub pull request.

#### Scenario: Local implementation is complete
- **WHEN** implementation tasks and verification commands are complete
- **THEN** the working tree contains committed project changes on an implementation branch
