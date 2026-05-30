## ADDED Requirements

### Requirement: Explicit island states
The system SHALL model island presentation with explicit states for idle, expanded, working, success, warning, and hidden.

#### Scenario: User expands from idle
- **WHEN** the island is idle and the user toggles expansion
- **THEN** the state becomes expanded

#### Scenario: Action starts
- **WHEN** an AI or utility action starts
- **THEN** the state becomes working and displays active feedback

#### Scenario: Action completes
- **WHEN** an action completes successfully
- **THEN** the state becomes success and displays the result summary

### Requirement: Compact pill view
The system SHALL show a compact pill view that communicates current status without covering the user's workspace.

#### Scenario: Idle compact view
- **WHEN** the island state is idle
- **THEN** the compact view shows the app mark, current status, and a visible expand affordance

#### Scenario: Working compact view
- **WHEN** the island state is working
- **THEN** the compact view shows active motion and a short working label

### Requirement: Expanded activity panel
The system SHALL expand into a panel containing action cards, utility cards, and recent result cards.

#### Scenario: User opens expanded panel
- **WHEN** the user expands the island
- **THEN** the panel displays clipboard actions, timer controls, quick note input, and recent activity

#### Scenario: User collapses expanded panel
- **WHEN** the user collapses the panel
- **THEN** the island returns to compact view without losing in-memory activity state

### Requirement: Polished interaction feedback
The system SHALL provide visual feedback for hover, active, disabled, loading, success, and warning states.

#### Scenario: Action unavailable
- **WHEN** an action requires clipboard text and the clipboard is empty
- **THEN** the action appears disabled and communicates that text is required

#### Scenario: Result is ready
- **WHEN** an action result is available
- **THEN** the panel highlights the result card and exposes a copy affordance
