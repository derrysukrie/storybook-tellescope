import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MultimodalTab, MultimodalIcons } from '../multimodal';
import TicketIcon from '../../../../assets/ticket.svg';

describe('Multimodal Icons and Tab', () => {
  it('renders MultimodalIcons img with 24x24', () => {
    render(<MultimodalIcons IconName={TicketIcon} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('width', '24');
    expect(img).toHaveAttribute('height', '24');
  });

  it('renders MultimodalTab button and icon', () => {
    render(
      <MultimodalTab
        activeTab={false}
        ticketIcon={TicketIcon}
      />
    );

    // IconButton renders a button
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    // image inside
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('fires onClick when MultimodalTab is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <MultimodalTab
        activeTab={true}
        ticketIcon={TicketIcon}
        onClick={onClick}
      />
    );

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});


