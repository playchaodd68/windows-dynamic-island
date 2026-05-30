import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../renderer/App';

describe('App', () => {
  beforeEach(() => {
    window.island = {
      clipboard: {
        readText: vi.fn().mockResolvedValue('Plan the build. Review the tests.'),
        writeText: vi.fn().mockResolvedValue(undefined)
      },
      shell: {
        show: vi.fn().mockResolvedValue(undefined),
        hide: vi.fn().mockResolvedValue(undefined),
        expand: vi.fn().mockResolvedValue(undefined),
        collapse: vi.fn().mockResolvedValue(undefined),
        quit: vi.fn().mockResolvedValue(undefined)
      },
      app: {
        getVersion: vi.fn().mockResolvedValue('0.1.0')
      }
    };
  });

  it('renders compact island status and expands to the activity panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('就绪')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '展开灵动岛' }));

    expect(screen.getByText('智能剪贴板')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /总结/ })).toBeInTheDocument();
    expect(screen.getByText('专注计时')).toBeInTheDocument();
    expect(screen.getByText('快速记录')).toBeInTheDocument();
  });

  it('runs a clipboard action and exposes the result', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '展开灵动岛' }));
    await user.click(screen.getByRole('button', { name: /总结/ }));

    expect(await screen.findByText('摘要已完成')).toBeInTheDocument();
    expect(screen.getAllByText('Plan the build.').length).toBeGreaterThan(0);
  });
});
