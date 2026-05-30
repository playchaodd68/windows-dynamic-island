export type ActivityKind = 'ai' | 'timer' | 'note' | 'system';

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  body: string;
  createdAt: number;
}

export function addActivity(items: ActivityItem[], activity: ActivityItem, limit = 12): ActivityItem[] {
  return [activity, ...items].slice(0, limit);
}

export function createNoteActivity(text: string, createdAt = Date.now()): ActivityItem {
  const body = text.trim();
  if (!body) {
    throw new Error('Note text is required');
  }

  return {
    id: `note-${createdAt}-${body.length}`,
    kind: 'note',
    title: 'Quick note',
    body,
    createdAt
  };
}

export function createActivity(kind: ActivityKind, title: string, body: string, createdAt = Date.now()): ActivityItem {
  return {
    id: `${kind}-${createdAt}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    kind,
    title,
    body,
    createdAt
  };
}

export function visibleActivities(items: ActivityItem[], limit = 5): ActivityItem[] {
  return items.slice(0, Math.max(0, limit));
}
