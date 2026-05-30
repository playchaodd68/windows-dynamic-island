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
    label: '总结',
    description: '把剪贴板内容压缩成最有用的摘要。'
  },
  {
    id: 'rewrite',
    label: '润色',
    description: '让剪贴板文字更清晰、更有质感。'
  },
  {
    id: 'translate',
    label: '翻译',
    description: '生成简洁的中文翻译草稿。'
  },
  {
    id: 'extractTasks',
    label: '提取任务',
    description: '把文本整理成可执行清单。'
  },
  {
    id: 'formatMarkdown',
    label: '转 Markdown',
    description: '把文本排版成干净的 Markdown。'
  }
];

export async function runMockAiAction(actionId: AiActionId, input: string): Promise<AiActionResult> {
  const text = input.trim();
  if (!text) {
    throw new Error('需要剪贴板文本');
  }

  switch (actionId) {
    case 'summarize':
      return {
        actionId,
        title: '摘要',
        body: firstSentence(text)
      };
    case 'rewrite':
      return {
        actionId,
        title: '润色',
        body: `清晰版：${normalizeWhitespace(text)}`
      };
    case 'translate':
      return {
        actionId,
        title: '翻译',
        body: `中文草稿: ${normalizeWhitespace(text)}`
      };
    case 'extractTasks':
      return {
        actionId,
        title: '任务清单',
        body: extractTasks(text)
      };
    case 'formatMarkdown':
      return {
        actionId,
        title: 'Markdown 排版',
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
