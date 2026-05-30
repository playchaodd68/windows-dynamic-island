import { describe, expect, it } from 'vitest';
import { AI_ACTIONS, runMockAiAction } from '../shared/ai-actions';

describe('AI actions', () => {
  it('exposes the required action catalog', () => {
    expect(AI_ACTIONS.map((action) => action.id)).toEqual([
      'summarize',
      'rewrite',
      'translate',
      'extractTasks',
      'formatMarkdown'
    ]);
  });

  it('summarizes clipboard text deterministically', async () => {
    await expect(runMockAiAction('summarize', 'First sentence. Second sentence with more detail.')).resolves.toMatchObject({
      title: 'Summary',
      body: 'First sentence.'
    });
  });

  it('extracts checkbox tasks from multiple lines', async () => {
    const result = await runMockAiAction('extractTasks', 'Email Amy\nReview PR\nShip build');

    expect(result.body).toContain('- [ ] Email Amy');
    expect(result.body).toContain('- [ ] Review PR');
    expect(result.body).toContain('- [ ] Ship build');
  });

  it('rejects empty clipboard input', async () => {
    await expect(runMockAiAction('rewrite', '   ')).rejects.toThrow('Clipboard text is required');
  });
});
