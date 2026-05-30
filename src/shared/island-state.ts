import type { ActivityItem } from './activity';
import { addActivity } from './activity';

export type IslandMode = 'idle' | 'expanded' | 'working' | 'success' | 'warning' | 'hidden';

export interface IslandState {
  mode: IslandMode;
  status: string;
  activities: ActivityItem[];
  lastResult?: string;
}

export type IslandEvent =
  | { type: 'toggle-expanded' }
  | { type: 'show' }
  | { type: 'hide' }
  | { type: 'action-started'; label: string }
  | { type: 'action-succeeded'; message: string; result?: string }
  | { type: 'action-failed'; message: string }
  | { type: 'activity-added'; activity: ActivityItem };

export function createInitialIslandState(): IslandState {
  return {
    mode: 'idle',
    status: 'Ready',
    activities: []
  };
}

export function islandReducer(state: IslandState, event: IslandEvent): IslandState {
  switch (event.type) {
    case 'toggle-expanded':
      return {
        ...state,
        mode: state.mode === 'expanded' ? 'idle' : 'expanded',
        status: state.mode === 'expanded' ? 'Ready' : 'Expanded'
      };
    case 'show':
      return {
        ...state,
        mode: state.mode === 'hidden' ? 'idle' : state.mode,
        status: state.mode === 'hidden' ? 'Ready' : state.status
      };
    case 'hide':
      return {
        ...state,
        mode: 'hidden',
        status: 'Hidden'
      };
    case 'action-started':
      return {
        ...state,
        mode: 'working',
        status: event.label
      };
    case 'action-succeeded':
      return {
        ...state,
        mode: 'success',
        status: event.message,
        lastResult: event.result ?? state.lastResult
      };
    case 'action-failed':
      return {
        ...state,
        mode: 'warning',
        status: event.message
      };
    case 'activity-added':
      return {
        ...state,
        activities: addActivity(state.activities, event.activity)
      };
    default:
      return state;
  }
}
