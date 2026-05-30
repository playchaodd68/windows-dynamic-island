import { describe, expect, it } from 'vitest';
import { addActivity, createNoteActivity, visibleActivities, type ActivityItem } from '../shared/activity';

describe('activity helpers', () => {
  it('stores non-empty quick notes', () => {
    const note = createNoteActivity('Capture this', 42);

    expect(note).toMatchObject({
      kind: 'note',
      title: '快速记录',
      body: 'Capture this',
      createdAt: 42
    });
  });

  it('rejects empty notes', () => {
    expect(() => createNoteActivity('   ', 42)).toThrow('请输入记录内容');
  });

  it('keeps recent activity newest first within a display limit', () => {
    const activities = [
      createNoteActivity('One', 1),
      createNoteActivity('Two', 2),
      createNoteActivity('Three', 3)
    ].reduce((items, item) => addActivity(items, item), [] as ActivityItem[]);

    expect(visibleActivities(activities, 2).map((item) => item.body)).toEqual(['Three', 'Two']);
  });
});
