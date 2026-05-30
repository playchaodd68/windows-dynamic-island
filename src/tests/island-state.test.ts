import { describe, expect, it } from 'vitest';
import { createInitialIslandState, islandReducer } from '../shared/island-state';

describe('islandReducer', () => {
  it('expands from idle and collapses back without losing activity', () => {
    const initial = createInitialIslandState();
    const expanded = islandReducer(initial, { type: 'toggle-expanded' });
    const withActivity = islandReducer(expanded, {
      type: 'activity-added',
      activity: { id: 'a1', kind: 'note', title: 'Saved note', body: 'Draft', createdAt: 1000 }
    });

    expect(expanded.mode).toBe('expanded');
    expect(islandReducer(withActivity, { type: 'toggle-expanded' })).toMatchObject({
      mode: 'idle',
      activities: [expect.objectContaining({ id: 'a1' })]
    });
  });

  it('moves through working, success, warning, and hidden states', () => {
    const initial = createInitialIslandState();
    const working = islandReducer(initial, { type: 'action-started', label: 'Summarizing' });
    const success = islandReducer(working, { type: 'action-succeeded', message: '摘要已完成' });
    const warning = islandReducer(success, { type: 'action-failed', message: '剪贴板没有内容' });
    const hidden = islandReducer(warning, { type: 'hide' });

    expect(working).toMatchObject({ mode: 'working', status: 'Summarizing' });
    expect(success).toMatchObject({ mode: 'success', status: '摘要已完成' });
    expect(warning).toMatchObject({ mode: 'warning', status: '剪贴板没有内容' });
    expect(hidden.mode).toBe('hidden');
  });
});
