## ADDED Requirements

### Requirement: Focus timer
The system SHALL provide a countdown timer that can start, pause, resume, reset, and complete.

#### Scenario: User starts timer
- **WHEN** the user starts a timer with a positive duration
- **THEN** the timer enters running state and exposes remaining time

#### Scenario: Timer completes
- **WHEN** the running timer reaches zero
- **THEN** the timer enters complete state and the island shows a success status

### Requirement: Quick note capture
The system SHALL allow the user to create a short in-memory note from the expanded island.

#### Scenario: User saves note
- **WHEN** the user submits non-empty note text
- **THEN** the system stores the note in recent activity for the current session

#### Scenario: User submits empty note
- **WHEN** the user submits an empty note
- **THEN** the system rejects it and keeps the current notes unchanged

### Requirement: Recent activity
The system SHALL show recent AI action, timer, and note events in the expanded panel.

#### Scenario: New activity is added
- **WHEN** an action, timer, or note event completes
- **THEN** the event appears in recent activity with a label and timestamp

#### Scenario: Activity exceeds display limit
- **WHEN** more activities exist than the display limit
- **THEN** the system keeps the most recent entries visible first
