## ADDED Requirements

### Requirement: Frameless always-on-top island window
The system SHALL create a frameless desktop window that is anchored near the top center of the primary display and remains above normal application windows while visible.

#### Scenario: App starts island shell
- **WHEN** the desktop app starts
- **THEN** the system creates one compact island window without standard operating system window chrome
- **AND** the window is positioned near the top center of the primary display

#### Scenario: Island remains compact while idle
- **WHEN** no activity is running
- **THEN** the shell displays the compact idle island instead of a full application window

### Requirement: Tray controls
The system SHALL provide tray controls for showing, hiding, expanding, and quitting the island.

#### Scenario: User hides island from tray
- **WHEN** the user chooses the hide command from the tray menu
- **THEN** the island window becomes hidden without quitting the app

#### Scenario: User quits from tray
- **WHEN** the user chooses the quit command from the tray menu
- **THEN** the application exits cleanly

### Requirement: Global shortcut controls
The system SHALL register global shortcuts for toggling visibility and expansion while the app is running.

#### Scenario: User toggles island with shortcut
- **WHEN** the user presses the configured toggle shortcut
- **THEN** the app toggles between hidden and visible island states

#### Scenario: User expands island with shortcut
- **WHEN** the user presses the configured expand shortcut
- **THEN** the visible island expands to the activity panel

### Requirement: Secure renderer bridge
The system SHALL expose native desktop capabilities to the renderer through a typed preload bridge instead of direct Node access.

#### Scenario: Renderer requests clipboard text
- **WHEN** the renderer calls the clipboard read API
- **THEN** the preload bridge sends an IPC request to the main process and returns text data

#### Scenario: Renderer lacks direct Node globals
- **WHEN** renderer code runs in the app window
- **THEN** Node integration is disabled and renderer code uses only the exposed island API
