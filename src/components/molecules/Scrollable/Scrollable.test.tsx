import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScrollableSection from './Scrollable';

describe('ScrollableSection', () => {
  it('renders header and drag indicator title', () => {
    render(<ScrollableSection />);
    expect(screen.getByText('Recent activity')).toBeInTheDocument();
  });

  it('renders a scrollable container with correct styles and focusability', () => {
    render(<ScrollableSection />);
    // The scrollable container has tabIndex={0} and overflow styles
    const scrollable = screen.getByText('Recent activity').parentElement?.nextElementSibling as HTMLElement;
    expect(scrollable).toBeInTheDocument();
    expect(scrollable).toHaveAttribute('tabindex', '0');
    expect(scrollable).toHaveStyle({ overflowY: 'auto' });
    expect(scrollable).toHaveStyle({ maxHeight: '204px' });
  });

  it('renders multiple activity items with titles and timestamps', () => {
    render(<ScrollableSection />);
    // Spot check a few items from the list
    expect(screen.getByText('Ticket assigned')).toBeInTheDocument();
    expect(screen.getByText('Ticket completed')).toBeInTheDocument();
    expect(screen.getByText('Chat resolved')).toBeInTheDocument();
    expect(screen.getByText('Ticket reopened')).toBeInTheDocument();
    expect(screen.getByText('Survey submitted')).toBeInTheDocument();
    // Timestamps and names for one of them
    expect(screen.getByText(/3\/5\/2025 at 1:00 PM/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });
});


