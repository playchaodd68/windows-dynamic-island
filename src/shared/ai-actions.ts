export type AiActionId = 'summarize' | 'rewrite' | 'translate' | 'extractTasks' | 'formatMarkdown';

export interface AiActionDefinition {
  id: AiActionId;
  label: string;
  description: string;
}

export interface AiActionResult {
  actionId: AiActionId;
  title: string;
  body: string;
}

export const AI_ACTIONS: AiActionDefinition[] = [
  {
    id: 'summarize',
    label: 'Summarize',
    description: 'Compress clipboard text into the smallest useful summary.'
  },
  {
    id: 'rewrite',
    label: 'Rewrite',
    description: 'Make the clipboard text clearer and more direct.'
  },
  {
    id: 'translate',
    label: 'Translate',
    description: 'Create a concise Chinese translation draft.'
  },
  {
    id: 'extractTasks',
    label: 'Extract tasks',
    description: 'Turn lines or sentences into a checklist.'
  },
  {
    id: 'formatMarkdown',
    label: 'Markdown',
    description: 'Format clipboard text as clean Markdown.'
  }
];

export async function runMockAiAction(actionId: AiActionId, input: string): Promise<AiActionResult> {
  const text = input.trim();
  if (!text) {
    throw new Error('Clipboard text is required');
  }

  switch (actionId) {
    case 'summarize':
      return {
        actionId,
        title: 'Summary',
        body: firstSentence(text)
      };
    case 'rewrite':
      return {
        actionId,
        title: 'Rewrite',
        body: `Clear version: ${normalizeWhitespace(text)}`
      };
    case 'translate':
      return {
        actionId,
        title: 'Chinese translation',
        body: `中文草稿: ${normalizeWhitespace(text)}`
      };
    case 'extractTasks':
      return {
        actionId,
        title: 'Tasks',
        body: extractTasks(text)
      };
    case 'formatMarkdown':
      return {
        actionId,
        title: 'Markdown',
        body: `> ${normalizeWhitespace(text)}`
      };
    default:
      return assertNever(actionId);
  }
}

function firstSentence(text: string): string {
  const match = text.match(/.*?[.!?](\s|$)/);
  return (match?.[0] ?? text).trim();
}

function extractTasks(text: string): string {
  return text
    .split(/\r?\n|[.;]/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `- [ ] ${line}`)
    .join('\n');
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function assertNever(value: never): never {
  throw new Error(`Unsupported AI action: ${value}`);
}
