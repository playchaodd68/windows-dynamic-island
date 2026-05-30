## ADDED Requirements

### Requirement: Clipboard text ingestion
The system SHALL read clipboard text on demand and use it as input for AI-style workflows.

#### Scenario: Clipboard contains text
- **WHEN** the user runs a clipboard action
- **THEN** the system reads the current clipboard text and passes it to the selected action

#### Scenario: Clipboard is empty
- **WHEN** the user runs a clipboard action with no clipboard text available
- **THEN** the system shows a warning state and does not run the action

### Requirement: AI action catalog
The system SHALL provide actions for summarize, rewrite, translate, extract tasks, and format as Markdown.

#### Scenario: User summarizes clipboard text
- **WHEN** the user selects summarize
- **THEN** the system returns a concise summary result

#### Scenario: User extracts tasks
- **WHEN** the user selects extract tasks
- **THEN** the system returns a checklist-style result

### Requirement: Provider abstraction
The system SHALL route AI-style actions through a provider interface that supports deterministic local mock behavior and future remote providers.

#### Scenario: Mock provider is selected
- **WHEN** provider mode is mock
- **THEN** actions complete without network access and return deterministic results

#### Scenario: Future provider is unavailable
- **WHEN** a non-configured remote provider is selected
- **THEN** the system reports a warning instead of silently failing

### Requirement: Result copyback
The system SHALL allow action results to be copied back to the clipboard.

#### Scenario: User copies result
- **WHEN** the user chooses copy on a result card
- **THEN** the system writes the result text to the clipboard
