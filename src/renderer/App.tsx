import { useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { Check, Clipboard, Clock3, Copy, EyeOff, Languages, ListChecks, Minimize2, PenLine, Sparkles } from 'lucide-react';
import { AI_ACTIONS, type AiActionId, type AiActionResult, runMockAiAction } from '../shared/ai-actions';
import { createActivity, createNoteActivity, visibleActivities } from '../shared/activity';
import { createTimer, pauseTimer, resetTimer, resumeTimer, startTimer, tickTimer } from '../shared/focus-timer';
import { createInitialIslandState, islandReducer } from '../shared/island-state';
import type { IslandBridge } from '../preload/island-api';

const fallbackBridge: IslandBridge = {
  clipboard: {
    readText: async () => '',
    writeText: async () => undefined
  },
  shell: {
    show: async () => undefined,
    hide: async () => undefined,
    expand: async () => undefined,
    collapse: async () => undefined,
    quit: async () => undefined
  },
  app: {
    getVersion: async () => '0.1.0'
  }
};

const actionIcons: Record<AiActionId, ReactNode> = {
  summarize: <Sparkles size={16} />,
  rewrite: <PenLine size={16} />,
  translate: <Languages size={16} />,
  extractTasks: <ListChecks size={16} />,
  formatMarkdown: <Clipboard size={16} />
};

export function App() {
  const [state, dispatch] = useReducer(islandReducer, undefined, createInitialIslandState);
  const [panelOpen, setPanelOpen] = useState(false);
  const [timer, setTimer] = useState(createTimer);
  const [note, setNote] = useState('');
  const [latestResult, setLatestResult] = useState<AiActionResult | null>(null);
  const [version, setVersion] = useState('0.1.0');
  const bridge = useMemo(() => window.island ?? fallbackBridge, []);
  const activities = visibleActivities(state.activities, 5);

  useEffect(() => {
    void bridge.app.getVersion().then(setVersion);
  }, [bridge]);

  useEffect(() => {
    if (timer.status !== 'running') {
      return undefined;
    }

    const id = window.setInterval(() => {
      setTimer((current) => tickTimer(current));
    }, 1000);

    return () => window.clearInterval(id);
  }, [timer.status]);

  useEffect(() => {
    if (timer.status !== 'complete') {
      return;
    }

    dispatch({ type: 'action-succeeded', message: 'Timer complete' });
  }, [timer.status]);

  function toggleExpanded() {
    const nextOpen = !panelOpen;
    setPanelOpen(nextOpen);
    dispatch({ type: 'toggle-expanded' });
    void (nextOpen ? bridge.shell.expand() : bridge.shell.collapse());
  }

  async function runClipboardAction(actionId: AiActionId) {
    dispatch({ type: 'action-started', label: 'Working' });

    try {
      const clipboardText = await bridge.clipboard.readText();
      const result = await runMockAiAction(actionId, clipboardText);
      setLatestResult(result);
      setPanelOpen(true);
      dispatch({ type: 'action-succeeded', message: `${result.title} ready`, result: result.body });
      dispatch({
        type: 'activity-added',
        activity: createActivity('ai', result.title, result.body)
      });
    } catch (error) {
      dispatch({
        type: 'action-failed',
        message: error instanceof Error ? error.message : 'Action failed'
      });
    }
  }

  function saveNote() {
    try {
      const activity = createNoteActivity(note);
      dispatch({ type: 'activity-added', activity });
      dispatch({ type: 'action-succeeded', message: 'Note saved', result: activity.body });
      setNote('');
    } catch (error) {
      dispatch({
        type: 'action-failed',
        message: error instanceof Error ? error.message : 'Note failed'
      });
    }
  }

  function startPresetTimer(durationSeconds: number) {
    setTimer((current) => startTimer(current, durationSeconds));
    dispatch({ type: 'action-started', label: 'Timer running' });
  }

  async function copyLatestResult() {
    if (!latestResult) {
      return;
    }
    await bridge.clipboard.writeText(latestResult.body);
    dispatch({ type: 'action-succeeded', message: 'Copied result', result: latestResult.body });
  }

  return (
    <main className={`app-root mode-${state.mode} ${panelOpen ? 'is-expanded' : ''}`}>
      <section className="island-shell" aria-label="Windows Dynamic Island">
        <div className="compact-pill">
          <div className="orb" aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <div className="status-copy">
            <span className="eyebrow">Windows Island</span>
            <strong>{state.status}</strong>
          </div>
          <button className="icon-button" type="button" aria-label="Expand island" onClick={toggleExpanded}>
            {panelOpen ? <Minimize2 size={18} /> : <Sparkles size={18} />}
          </button>
        </div>

        {panelOpen ? (
          <div className="activity-panel">
            <div className="panel-header">
              <div>
                <p className="section-kicker">Mock provider</p>
                <h1>Clipboard actions</h1>
              </div>
              <span className="version-chip">v{version}</span>
            </div>

            <div className="action-grid">
              {AI_ACTIONS.map((action) => (
                <button className="action-card" type="button" key={action.id} onClick={() => void runClipboardAction(action.id)}>
                  {actionIcons[action.id]}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            <section className="utility-card">
              <div className="card-title">
                <Clock3 size={16} />
                <span>Focus timer</span>
              </div>
              <div className="timer-readout">{formatRemaining(timer.remainingSeconds)}</div>
              <div className="segmented-actions">
                <button type="button" onClick={() => startPresetTimer(300)}>
                  5m
                </button>
                <button type="button" onClick={() => startPresetTimer(1500)}>
                  25m
                </button>
                <button type="button" onClick={() => setTimer((current) => (current.status === 'paused' ? resumeTimer(current) : pauseTimer(current)))}>
                  {timer.status === 'paused' ? 'Resume' : 'Pause'}
                </button>
                <button type="button" onClick={() => setTimer((current) => resetTimer(current))}>
                  Reset
                </button>
              </div>
            </section>

            <section className="utility-card note-card">
              <div className="card-title">
                <PenLine size={16} />
                <span>Quick note</span>
              </div>
              <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Capture a thought without opening another app" />
              <button className="primary-button" type="button" onClick={saveNote}>
                Save note
              </button>
            </section>

            {latestResult ? (
              <section className="result-card">
                <div>
                  <p className="section-kicker">{latestResult.title}</p>
                  <p>{latestResult.body}</p>
                </div>
                <button className="icon-button" type="button" aria-label="Copy result" onClick={() => void copyLatestResult()}>
                  <Copy size={17} />
                </button>
              </section>
            ) : null}

            <section className="activity-list">
              <div className="card-title">
                <Check size={16} />
                <span>Recent activity</span>
              </div>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <article key={activity.id}>
                    <strong>{activity.title}</strong>
                    <span>{activity.body}</span>
                  </article>
                ))
              ) : (
                <p className="empty-state">No recent activity yet.</p>
              )}
            </section>

            <footer className="settings-strip">
              <span>Ctrl+Shift+Space</span>
              <span>Local mock AI</span>
              <button type="button" onClick={() => void bridge.shell.hide()}>
                <EyeOff size={14} />
                Hide
              </button>
            </footer>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function formatRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const rest = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}
