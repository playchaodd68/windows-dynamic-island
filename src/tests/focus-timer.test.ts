import { describe, expect, it } from 'vitest';
import { createTimer, pauseTimer, resetTimer, resumeTimer, startTimer, tickTimer } from '../shared/focus-timer';

describe('focus timer', () => {
  it('starts, pauses, resumes, and completes a countdown', () => {
    const running = startTimer(createTimer(), 3);
    const paused = pauseTimer(tickTimer(running));
    const resumed = resumeTimer(paused);
    const complete = tickTimer(tickTimer(tickTimer(resumed)));

    expect(running).toMatchObject({ status: 'running', durationSeconds: 3, remainingSeconds: 3 });
    expect(paused).toMatchObject({ status: 'paused', remainingSeconds: 2 });
    expect(complete).toMatchObject({ status: 'complete', remainingSeconds: 0 });
  });

  it('rejects non-positive durations', () => {
    expect(() => startTimer(createTimer(), 0)).toThrow('Timer duration must be positive');
  });

  it('resets to idle state', () => {
    expect(resetTimer(startTimer(createTimer(), 60))).toMatchObject({
      status: 'idle',
      durationSeconds: 0,
      remainingSeconds: 0
    });
  });
});
