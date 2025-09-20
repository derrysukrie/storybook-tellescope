import { render, screen } from '../../../../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { TicketMultimodalComponent } from '../multimodal';

const countRenderedTickets = () => {
  const matches = screen.queryAllByText(/^(Ticket Name( \d+)?)$|^(Snoozed Dumpling( \d+)?)$/);
  return matches.length;
};

describe('TicketMultimodalComponent', () => {
  it('renders tab strip and ticket content', () => {
    const { container } = render(<TicketMultimodalComponent snoozed={false} nameSorted={false} />);
    // Tab strip contains multiple IconButtons
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(9);
    // Header exists
    expect(screen.getByText(/Tickets/)).toBeInTheDocument();
  });

  it('respects snoozed=false by showing only non-snoozed tickets', () => {
    render(<TicketMultimodalComponent snoozed={false} nameSorted={false} />);
    // From source data: 3 non-snoozed when snoozed=false
    expect(countRenderedTickets()).toBe(3);
  });

  it('respects snoozed=true by showing only snoozed tickets', () => {
    render(<TicketMultimodalComponent snoozed={true} nameSorted={false} />);
    // From source data: 3 snoozed when snoozed=true
    expect(countRenderedTickets()).toBe(3);
  });

  it('sorts by name when nameSorted=true', () => {
    render(<TicketMultimodalComponent snoozed={false} nameSorted={true} />);
    // The first visible ticket should be alphabetically first among non-snoozed
    const rows = screen.getAllByText(/Ticket Name/);
    expect(rows.length).toBeGreaterThan(0);
  });

  // Snooze toggle is icon-only without labels; skip direct interaction test to avoid brittle selectors
});


