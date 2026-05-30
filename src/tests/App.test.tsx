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

    expect(screen.getByText('Ready')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /expand island/i }));

    expect(screen.getByText('Clipboard actions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /summarize/i })).toBeInTheDocument();
    expect(screen.getByText('Focus timer')).toBeInTheDocument();
  });

  it('runs a clipboard action and exposes the result', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /expand island/i }));
    await user.click(screen.getByRole('button', { name: /summarize/i }));

    expect(await screen.findByText('Summary ready')).toBeInTheDocument();
    expect(screen.getAllByText('Plan the build.').length).toBeGreaterThan(0);
  });
});
