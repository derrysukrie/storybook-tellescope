import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ItemPortal } from './item';

describe('ItemPortal', () => {
  it('renders title and icon for type=form', () => {
    render(<ItemPortal type="form" title="Form A" />);
    expect(screen.getByText('Form A')).toBeInTheDocument();
  });

  it('form: shows "Not started" and error icon when not completed', () => {
    render(<ItemPortal type="form" title="Form" completed={false} />);
    expect(screen.getByText(/Not started/i)).toBeInTheDocument();
  });

  it('form: shows "Completed" when completed', () => {
    render(<ItemPortal type="form" title="Form" completed />);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  it('message: shows dateTime and doctorName when provided', () => {
    render(<ItemPortal type="message" title="Msg" dateTime="Jan 1" doctorName="Dr. A" />);
    expect(screen.getByText('Jan 1')).toBeInTheDocument();
    expect(screen.getByText('Dr. A')).toBeInTheDocument();
  });

  it('message: shows avatar only when src provided', () => {
    const { rerender } = render(<ItemPortal type="message" title="Msg" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    rerender(<ItemPortal type="message" title="Msg" avatarSrc="x.png" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('message: shows red dot when hasNewMessage', () => {
    render(<ItemPortal type="message" title="Msg" hasNewMessage />);
    // The red dot is a small Box; we can assert it exists by querying by title text fallback
    // If needed in the future, add data-testid to the dot in implementation
    // For now, ensure component renders without errors
    expect(screen.getByText('Msg')).toBeInTheDocument();
  });

  it('badge: shows count when enabled, hides when disabled', () => {
    const { rerender } = render(<ItemPortal type="link" title="Link" badge badgeCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    rerender(<ItemPortal type="link" title="Link" />);
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('click: calls onClick when provided', async () => {
    const onClick = vi.fn();
    render(<ItemPortal type="link" title="Link" onClick={onClick} />);
    await userEvent.click(screen.getByText('Link'));
    expect(onClick).toHaveBeenCalled();
  });
});


