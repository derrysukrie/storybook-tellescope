import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  TicketSectionItem,
  EventSectionItem,
  PrescriptionSectionItem,
  FileSectionItem,
  MedicationSectionItem,
  PaymentSectionItem,
  ContentSectionItem,
  DeviceOrderSectionItem,
  EncounterSectionItem,
  TicketassignedSectionItem,
  TicketcompletedSectionItem,
  EventScheduledSectionItem,
  EventCancelledSectionItem,
  ChatResolvedSectionItem,
  AddedToJourneySectionItem,
  RemovedFromJourneySectionItem,
} from './SectionItem';

describe('SectionItem components', () => {
  describe('TicketSectionItem', () => {
    it('renders default title and timestamp', () => {
      render(<TicketSectionItem snoozed={false} resolved={false} assigned={false} badge={false} />);
      expect(screen.getByText('Ticket Name')).toBeInTheDocument();
      expect(screen.getByText('3/5/2025 at 1:00 PM PST')).toBeInTheDocument();
    });

    it('shows snooze icon when not snoozed', () => {
      render(<TicketSectionItem snoozed={false} resolved={false} assigned={false} badge={false} />);
      expect(screen.getByTestId('SnoozeIcon')).toBeInTheDocument();
    });

    it('shows alarm off icon when snoozed', () => {
      render(<TicketSectionItem snoozed={true} resolved={false} assigned={false} badge={false} />);
      expect(screen.getByTestId('AlarmOffOutlinedIcon')).toBeInTheDocument();
      expect(screen.queryByTestId('SnoozeIcon')).not.toBeInTheDocument();
    });

    it('shows avatar when assigned and not snoozed', () => {
      render(<TicketSectionItem snoozed={false} resolved={false} assigned={true} badge={false} />);
      expect(screen.getByText('OP')).toBeInTheDocument();
    });

    it('shows dumpling icon when assigned and snoozed', () => {
      render(<TicketSectionItem snoozed={true} resolved={false} assigned={true} badge={false} />);
      const images = screen.getAllByRole('img');
      const dumplingImg = images.find(img => img.getAttribute('src') === '/src/assets/dumpling.svg');
      expect(dumplingImg).toBeInTheDocument();
    });

    it('shows badge dot when badge is true', () => {
      render(<TicketSectionItem snoozed={false} resolved={false} assigned={false} badge={true} />);
      // Badge with dot should be present - check by looking for the Badge component
      const badge = screen.getByRole('img').closest('[class*="MuiBadge"]');
      expect(badge).toBeInTheDocument();
    });

    it('shows resolved toggle button when resolved is true', () => {
      render(<TicketSectionItem snoozed={false} resolved={true} assigned={false} badge={false} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTestId('TaskAltOutlinedIcon')).toBeInTheDocument();
    });

    it('toggles TaskAltOutlined color when clicked', async () => {
      render(<TicketSectionItem snoozed={false} resolved={true} assigned={false} badge={false} />);
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('TaskAltOutlinedIcon');
      
      // Initial color should be default
      expect(icon).toHaveStyle({ color: '#49454F' });
      
      // Click to toggle
      await userEvent.click(button);
      expect(icon).toHaveStyle({ color: 'rgb(0, 128, 0)' });
      
      // Click again to toggle back
      await userEvent.click(button);
      expect(icon).toHaveStyle({ color: '#49454F' });
    });

    it('uses custom name when provided', () => {
      render(<TicketSectionItem snoozed={false} resolved={false} assigned={false} badge={false} name="Custom Ticket" />);
      expect(screen.getByText('Custom Ticket')).toBeInTheDocument();
    });

    it('shows "Snoozy Dumplings" when snoozed and no custom name', () => {
      render(<TicketSectionItem snoozed={true} resolved={false} assigned={false} badge={false} />);
      expect(screen.getByText('Snoozy Dumplings')).toBeInTheDocument();
    });
  });

  describe('EventSectionItem', () => {
    it('renders default title and timestamp', () => {
      render(<EventSectionItem resolved={false} />);
      expect(screen.getByText('Event Name')).toBeInTheDocument();
      expect(screen.getByText('3/5/2025 1:00 PM PST')).toBeInTheDocument();
    });

    it('shows MoreVert and toggle button when resolved', () => {
      render(<EventSectionItem resolved={true} />);
      expect(screen.getByTestId('MoreVertIcon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTestId('TaskAltOutlinedIcon')).toBeInTheDocument();
    });

    it('toggles TaskAltOutlined color when clicked', async () => {
      render(<EventSectionItem resolved={true} />);
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('TaskAltOutlinedIcon');
      
      expect(icon).toHaveStyle({ color: '#49454F' });
      await userEvent.click(button);
      expect(icon).toHaveStyle({ color: 'rgb(0, 128, 0)' });
    });

    it('uses custom name when provided', () => {
      render(<EventSectionItem resolved={false} name="Custom Event" />);
      expect(screen.getByText('Custom Event')).toBeInTheDocument();
    });
  });

  describe('PrescriptionSectionItem', () => {
    it('renders default name and status', () => {
      render(<PrescriptionSectionItem status="Pending" />);
      expect(screen.getByText('tropfungin')).toBeInTheDocument();
      expect(screen.getByText('0.1 mg 3 month Pending')).toBeInTheDocument();
    });

    it('shows different statuses', () => {
      const { rerender } = render(<PrescriptionSectionItem status="Pending" />);
      expect(screen.getByText(/Pending/)).toBeInTheDocument();
      rerender(<PrescriptionSectionItem status="Approved" />);
      expect(screen.getByText(/Approved/)).toBeInTheDocument();

      rerender(<PrescriptionSectionItem status="Denied" />);
      expect(screen.getByText(/Denied/)).toBeInTheDocument();
    });

    it('uses custom name when provided', () => {
      render(<PrescriptionSectionItem status="Pending" name="Custom Drug" />);
      expect(screen.getByText('Custom Drug')).toBeInTheDocument();
    });
  });

  describe('FileSectionItem', () => {
    it('renders default title and subtitle', () => {
      render(<FileSectionItem />);
      expect(screen.getByText('file')).toBeInTheDocument();
      expect(screen.getByText('JPEG 1.7 MB March 5, 2025')).toBeInTheDocument();
    });

    it('uses custom name when provided', () => {
      render(<FileSectionItem name="document.pdf" />);
      expect(screen.getByText('document.pdf')).toBeInTheDocument();
    });
  });

  describe('MedicationSectionItem', () => {
    it('renders default title and subtitle', () => {
      render(<MedicationSectionItem />);
      expect(screen.getByText('tropfugin')).toBeInTheDocument();
      expect(screen.getByText('0.1 mg 3 month March 5, 2025')).toBeInTheDocument();
    });

    it('uses custom name when provided', () => {
      render(<MedicationSectionItem name="Custom Med" />);
      expect(screen.getByText('Custom Med')).toBeInTheDocument();
    });
  });

  describe('PaymentSectionItem', () => {
    it('renders default title and subtitle', () => {
      render(<PaymentSectionItem />);
      expect(screen.getByText('Payment')).toBeInTheDocument();
      expect(screen.getByText('$100 March 5, 2025 A descriptive expl...')).toBeInTheDocument();
    });

    it('uses custom name when provided', () => {
      render(<PaymentSectionItem name="Custom Payment" />);
      expect(screen.getByText('Custom Payment')).toBeInTheDocument();
    });
  });

  describe('ContentSectionItem', () => {
    it('renders default title and subtitle', () => {
      render(<ContentSectionItem />);
      expect(screen.getByText('Content title')).toBeInTheDocument();
      expect(screen.getByText('March 5, 2025')).toBeInTheDocument();
    });

    it('uses custom name and icon when provided', () => {
      render(<ContentSectionItem name="Custom Content" icon="custom-icon.svg" />);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('DeviceOrderSectionItem', () => {
    it('renders default title and subtitle with info icon', () => {
      render(<DeviceOrderSectionItem />);
      expect(screen.getByText('Open Stock iBlood Pressure Cuff')).toBeInTheDocument();
      expect(screen.getByText('3/5/2025 at 1:15 PM PST')).toBeInTheDocument();
      expect(screen.getByTestId('InfoOutlinedIcon')).toBeInTheDocument();
    });

    it('uses custom name when provided', () => {
      render(<DeviceOrderSectionItem name="Custom Device" />);
      expect(screen.getByText('Custom Device')).toBeInTheDocument();
    });
  });

  describe('EncounterSectionItem', () => {
    it('renders default title and subtitle', () => {
      render(<EncounterSectionItem />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText(/3\/5\/2025 at 1:15 PM PST.*In Candid/)).toBeInTheDocument();
    });

    it('uses custom name when provided', () => {
      render(<EncounterSectionItem name="Custom Encounter" />);
      expect(screen.getByText('Custom Encounter')).toBeInTheDocument();
    });
  });

  describe('Other Section Items', () => {
    it('renders all remaining section items with their default content', () => {
      render(
        <>
          <TicketassignedSectionItem />
          <TicketcompletedSectionItem />
          <EventScheduledSectionItem />
          <EventCancelledSectionItem />
          <ChatResolvedSectionItem />
          <AddedToJourneySectionItem />
          <RemovedFromJourneySectionItem />
        </>
      );

      expect(screen.getByText('Ticket assigned')).toBeInTheDocument();
      expect(screen.getByText('Ticket completed')).toBeInTheDocument();
      expect(screen.getByText('Event scheduled')).toBeInTheDocument();
      expect(screen.getByText('Event cancelled')).toBeInTheDocument();
      expect(screen.getByText('Chat resolved')).toBeInTheDocument();
      expect(screen.getByText('Added to journey')).toBeInTheDocument();
      expect(screen.getByText('Removed from journey')).toBeInTheDocument();
    });

    it('uses custom names when provided', () => {
      render(
        <>
          <TicketassignedSectionItem name="Custom Assigned" />
          <TicketcompletedSectionItem name="Custom Completed" />
          <EventScheduledSectionItem name="Custom Scheduled" />
          <EventCancelledSectionItem name="Custom Cancelled" />
          <ChatResolvedSectionItem name="Custom Resolved" />
          <AddedToJourneySectionItem name="Custom Added" />
          <RemovedFromJourneySectionItem name="Custom Removed" />
        </>
      );

      expect(screen.getByText('Custom Assigned')).toBeInTheDocument();
      expect(screen.getByText('Custom Completed')).toBeInTheDocument();
      expect(screen.getByText('Custom Scheduled')).toBeInTheDocument();
      expect(screen.getByText('Custom Cancelled')).toBeInTheDocument();
      expect(screen.getByText('Custom Resolved')).toBeInTheDocument();
      expect(screen.getByText('Custom Added')).toBeInTheDocument();
      expect(screen.getByText('Custom Removed')).toBeInTheDocument();
    });
  });

  describe('Common elements', () => {
    it('all items render arrow forward icon', () => {
      render(
        <>
          <TicketSectionItem snoozed={false} resolved={false} assigned={false} badge={false} />
          <EventSectionItem resolved={false} />
          <PrescriptionSectionItem status="Pending" />
        </>
      );

      const arrows = screen.getAllByTestId('ArrowForwardIosIcon');
      expect(arrows).toHaveLength(3);
    });

    it('all items render MoreVert icon where applicable', () => {
      render(
        <>
          <PrescriptionSectionItem status="Pending" />
          <FileSectionItem />
          <MedicationSectionItem />
          <PaymentSectionItem />
          <ContentSectionItem />
        </>
      );

      const moreVertIcons = screen.getAllByTestId('MoreVertIcon');
      expect(moreVertIcons.length).toBeGreaterThan(0);
    });
  });
});
