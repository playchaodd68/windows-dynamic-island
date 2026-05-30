export type TimerStatus = 'idle' | 'running' | 'paused' | 'complete';

export interface FocusTimer {
  status: TimerStatus;
  durationSeconds: number;
  remainingSeconds: number;
}

export function createTimer(): FocusTimer {
  return {
    status: 'idle',
    durationSeconds: 0,
    remainingSeconds: 0
  };
}

export function startTimer(timer: FocusTimer, durationSeconds: number): FocusTimer {
  if (durationSeconds <= 0) {
    throw new Error('Timer duration must be positive');
  }

  return {
    ...timer,
    status: 'running',
    durationSeconds,
    remainingSeconds: durationSeconds
  };
}

export function pauseTimer(timer: FocusTimer): FocusTimer {
  if (timer.status !== 'running') {
    return timer;
  }

  return {
    ...timer,
    status: 'paused'
  };
}

export function resumeTimer(timer: FocusTimer): FocusTimer {
  if (timer.status !== 'paused') {
    return timer;
  }

  return {
    ...timer,
    status: 'running'
  };
}

export function resetTimer(_timer: FocusTimer): FocusTimer {
  return createTimer();
}

export function tickTimer(timer: FocusTimer): FocusTimer {
  if (timer.status !== 'running') {
    return timer;
  }

  const remainingSeconds = Math.max(0, timer.remainingSeconds - 1);

  return {
    ...timer,
    remainingSeconds,
    status: remainingSeconds === 0 ? 'complete' : 'running'
  };
}
