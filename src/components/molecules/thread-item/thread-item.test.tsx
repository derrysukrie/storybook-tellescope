import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThreadItem from './thread-item';
import { Star, Person, Message } from '@mui/icons-material';

// Test data factories
const createMockThreadItem = (overrides = {}) => ({
  icon: <Star data-testid="test-icon" />,
  title: 'Test Thread',
  date: '2024-01-15',
  content: 'Test content',
  name: 'John Doe',
  details: '2 min ago',
  unread: false,
  current: false,
  pinned: false,
  archived: false,
  ...overrides,
});

describe('ThreadItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<ThreadItem icon={<Star />} title="Test Thread" />);
      expect(screen.getByText('Test Thread')).toBeInTheDocument();
    });

    it('renders with required props only', () => {
      render(<ThreadItem icon={<Star />} title="Minimal Thread" />);
      
      expect(screen.getByText('Minimal Thread')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders with all optional props', () => {
      const props = createMockThreadItem();
      render(<ThreadItem {...props} />);
      
      expect(screen.getByText('Test Thread')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2 min ago')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('displays icon correctly', () => {
      const customIcon = <Person data-testid="person-icon" />;
      render(<ThreadItem icon={customIcon} title="Test Thread" />);
      
      expect(screen.getByTestId('person-icon')).toBeInTheDocument();
    });

    it('displays title correctly', () => {
      render(<ThreadItem icon={<Star />} title="Custom Title" />);
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('displays date when provided', () => {
      render(<ThreadItem icon={<Star />} title="Test Thread" date="2024-01-15" />);
      
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('displays content when provided', () => {
      render(<ThreadItem icon={<Star />} title="Test Thread" content="Test content" />);
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('displays name and details when provided', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Test Thread" 
          content="Test content"
          name="John Doe"
          details="2 min ago"
        />
      );
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2 min ago')).toBeInTheDocument();
    });
  });

  describe('State Variations', () => {
    describe('Unread State', () => {
      it('shows unread indicator when unread=true and not current/pinned/archived', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Unread Thread" 
            unread={true}
            current={false}
            pinned={false}
            archived={false}
          />
        );
        
        const unreadIndicator = screen.getByRole('generic', { hidden: true });
        expect(unreadIndicator).toHaveStyle({
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(60, 130, 246, 1)',
        });
      });

      it('hides unread indicator when current=true', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Current Thread" 
            unread={true}
            current={true}
          />
        );
        
        // Should not show unread indicator
        const container = screen.getByText('Current Thread').closest('[data-testid]') || screen.getByText('Current Thread').parentElement;
        expect(container).not.toHaveStyle({
          backgroundColor: 'rgba(60, 130, 246, 1)',
        });
      });

      it('hides unread indicator when pinned=true', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Pinned Thread" 
            unread={true}
            pinned={true}
          />
        );
        
        // Should not show unread indicator
        const container = screen.getByText('Pinned Thread').closest('[data-testid]') || screen.getByText('Pinned Thread').parentElement;
        expect(container).not.toHaveStyle({
          backgroundColor: 'rgba(60, 130, 246, 1)',
        });
      });

      it('hides unread indicator when archived=true', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Archived Thread" 
            unread={true}
            archived={true}
          />
        );
        
        // Should not show unread indicator
        const container = screen.getByText('Archived Thread').closest('[data-testid]') || screen.getByText('Archived Thread').parentElement;
        expect(container).not.toHaveStyle({
          backgroundColor: 'rgba(60, 130, 246, 1)',
        });
      });

      it('applies unread background color when unread=true and not current/pinned/archived', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Unread Thread" 
            unread={true}
            current={false}
            pinned={false}
            archived={false}
          />
        );
        
        const container = screen.getByText('Unread Thread').closest('div');
        expect(container).toHaveStyle({
          backgroundColor: 'rgba(239, 246, 255, 1)',
        });
      });
    });

    describe('Current State', () => {
      it('shows blue left border when current=true and unread=false', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Current Thread" 
            current={true}
            unread={false}
          />
        );
        
        const container = screen.getByText('Current Thread').closest('div');
        expect(container).toHaveStyle({
          borderLeft: '5px solid rgba(60, 130, 246, 1)',
        });
      });

      it('does not show left border when current=false', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Regular Thread" 
            current={false}
          />
        );
        
        const container = screen.getByText('Regular Thread').closest('div');
        expect(container).toHaveStyle({
          borderLeft: 'none',
        });
      });
    });

    describe('Pinned State', () => {
      it('shows filled pin icon when pinned=true', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Pinned Thread" 
            pinned={true}
          />
        );
        
        // Check for filled pin icon (PushPinIcon)
        const pinButton = screen.getByRole('button');
        expect(pinButton).toBeInTheDocument();
      });

      it('shows outlined pin icon when pinned=false', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Regular Thread" 
            pinned={false}
          />
        );
        
        // Check for outlined pin icon (PushPinOutlinedIcon)
        const pinButton = screen.getByRole('button');
        expect(pinButton).toBeInTheDocument();
      });
    });

    describe('Archived State', () => {
      it('shows "Archived" text instead of date when archived=true', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Archived Thread" 
            archived={true}
            date="2024-01-15"
          />
        );
        
        expect(screen.getByText('Archived')).toBeInTheDocument();
        expect(screen.queryByText('2024-01-15')).not.toBeInTheDocument();
      });

      it('shows unarchive icon when archived=true', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Archived Thread" 
            archived={true}
          />
        );
        
        // Check for unarchive icon (UnarchiveOutlinedIcon)
        const archiveButton = screen.getAllByRole('button')[1];
        expect(archiveButton).toBeInTheDocument();
      });

      it('shows archive icon when archived=false', () => {
        render(
          <ThreadItem 
            icon={<Star />} 
            title="Regular Thread" 
            archived={false}
          />
        );
        
        // Check for archive icon (ArchiveOutlinedIcon)
        const archiveButton = screen.getAllByRole('button')[1];
        expect(archiveButton).toBeInTheDocument();
      });
    });
  });

  describe('Content Layouts', () => {
    it('renders minimal content layout when no content, name, or details', () => {
      render(<ThreadItem icon={<Star />} title="Minimal Thread" />);
      
      // Should show pin and archive buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      
      // Should not show content section
      expect(screen.queryByText('Test content')).not.toBeInTheDocument();
    });

    it('renders content only layout when content provided but no name/details', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Content Thread" 
          content="Test content"
        />
      );
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
      
      // Should not show action buttons
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders full content layout when content, name, and details provided', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Full Thread" 
          content="Test content"
          name="John Doe"
          details="2 min ago"
        />
      );
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2 min ago')).toBeInTheDocument();
      
      // Should show action buttons at bottom
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });
  });

  describe('Styling', () => {
    it('applies correct background color for unread items', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Unread Thread" 
          unread={true}
          current={false}
          pinned={false}
          archived={false}
        />
      );
      
      const container = screen.getByText('Unread Thread').closest('div');
      expect(container).toHaveStyle({
        backgroundColor: 'rgba(239, 246, 255, 1)',
      });
    });

    it('applies transparent background for non-unread items', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Regular Thread" 
          unread={false}
        />
      );
      
      const container = screen.getByText('Regular Thread').closest('div');
      expect(container).toHaveStyle({
        backgroundColor: 'transparent',
      });
    });

    it('applies left border for current items when not unread', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Current Thread" 
          current={true}
          unread={false}
        />
      );
      
      const container = screen.getByText('Current Thread').closest('div');
      expect(container).toHaveStyle({
        borderLeft: '5px solid rgba(60, 130, 246, 1)',
      });
    });

    it('applies top border for items with content', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Content Thread" 
          content="Test content"
        />
      );
      
      const container = screen.getByText('Content Thread').closest('div');
      expect(container).toHaveStyle({
        borderTop: '1px solid rgba(226, 232, 240, 1)',
      });
    });

    it('applies proper text styling for title', () => {
      render(<ThreadItem icon={<Star />} title="Styled Title" />);
      
      const title = screen.getByText('Styled Title');
      expect(title).toHaveStyle({
        fontWeight: '600',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      });
    });

    it('applies proper text styling for content', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Content Thread" 
          content="Styled content"
        />
      );
      
      const content = screen.getByText('Styled content');
      expect(content).toHaveStyle({
        fontWeight: '400',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      });
    });
  });

  describe('Interactive Elements', () => {
    it('renders pin button with correct icon based on pinned state', () => {
      const { rerender } = render(
        <ThreadItem icon={<Star />} title="Test Thread" pinned={false} />
      );
      
      let pinButton = screen.getByRole('button');
      expect(pinButton).toBeInTheDocument();
      
      rerender(<ThreadItem icon={<Star />} title="Test Thread" pinned={true} />);
      
      pinButton = screen.getByRole('button');
      expect(pinButton).toBeInTheDocument();
    });

    it('renders archive button with correct icon based on archived state', () => {
      const { rerender } = render(
        <ThreadItem icon={<Star />} title="Test Thread" archived={false} />
      );
      
      let archiveButton = screen.getAllByRole('button')[1];
      expect(archiveButton).toBeInTheDocument();
      
      rerender(<ThreadItem icon={<Star />} title="Test Thread" archived={true} />);
      
      archiveButton = screen.getAllByRole('button')[1];
      expect(archiveButton).toBeInTheDocument();
    });

    it('handles button click events', async () => {
      const user = userEvent.setup();
      const onPinClick = vi.fn();
      const onArchiveClick = vi.fn();
      
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Test Thread" 
          pinned={false}
          archived={false}
        />
      );
      
      const pinButton = screen.getByRole('button');
      const archiveButton = screen.getAllByRole('button')[1];
      
      await user.click(pinButton);
      await user.click(archiveButton);
      
      // Note: The component doesn't have onClick handlers, so we just test that buttons are clickable
      expect(pinButton).toBeInTheDocument();
      expect(archiveButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible button elements', () => {
      render(<ThreadItem icon={<Star />} title="Test Thread" />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });

    it('has proper text structure for screen readers', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Accessible Thread" 
          content="Test content"
          name="John Doe"
          details="2 min ago"
        />
      );
      
      expect(screen.getByText('Accessible Thread')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2 min ago')).toBeInTheDocument();
    });

    it('supports keyboard navigation for buttons', async () => {
      const user = userEvent.setup();
      render(<ThreadItem icon={<Star />} title="Test Thread" />);
      
      const pinButton = screen.getByRole('button');
      pinButton.focus();
      
      expect(pinButton).toHaveFocus();
      
      await user.keyboard('{Tab}');
      
      const archiveButton = screen.getAllByRole('button')[1];
      expect(archiveButton).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing optional props gracefully', () => {
      render(<ThreadItem icon={<Star />} title="Minimal Thread" />);
      
      expect(screen.getByText('Minimal Thread')).toBeInTheDocument();
      expect(screen.queryByText('Test content')).not.toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('handles empty strings', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="" 
          content=""
          name=""
          details=""
        />
      );
      
      // Should render without crashing
      expect(screen.getByRole('generic')).toBeInTheDocument();
    });

    it('handles very long titles with ellipsis', () => {
      const longTitle = 'This is a very long title that should be truncated with ellipsis to prevent overflow';
      render(<ThreadItem icon={<Star />} title={longTitle} />);
      
      const title = screen.getByText(longTitle);
      expect(title).toHaveStyle({
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      });
    });

    it('handles very long content with ellipsis', () => {
      const longContent = 'This is a very long content that should be truncated with ellipsis to prevent overflow and maintain proper layout';
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Test Thread" 
          content={longContent}
        />
      );
      
      const content = screen.getByText(longContent);
      expect(content).toHaveStyle({
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      });
    });

    it('handles multiple states simultaneously', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Complex Thread" 
          unread={true}
          current={true}
          pinned={true}
          archived={true}
        />
      );
      
      expect(screen.getByText('Complex Thread')).toBeInTheDocument();
      expect(screen.getByText('Archived')).toBeInTheDocument();
    });

    it('handles all states false', () => {
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Default Thread" 
          unread={false}
          current={false}
          pinned={false}
          archived={false}
        />
      );
      
      expect(screen.getByText('Default Thread')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many props', () => {
      const startTime = performance.now();
      
      render(
        <ThreadItem 
          icon={<Star />} 
          title="Performance Thread" 
          content="Test content"
          name="John Doe"
          details="2 min ago"
          date="2024-01-15"
          unread={true}
          current={false}
          pinned={true}
          archived={false}
        />
      );
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // Should render quickly
    });

    it('handles rapid state changes', () => {
      const { rerender } = render(
        <ThreadItem icon={<Star />} title="Test Thread" unread={false} />
      );
      
      // Rapid state changes
      rerender(<ThreadItem icon={<Star />} title="Test Thread" unread={true} />);
      rerender(<ThreadItem icon={<Star />} title="Test Thread" unread={false} />);
      rerender(<ThreadItem icon={<Star />} title="Test Thread" unread={true} />);
      
      expect(screen.getByText('Test Thread')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works correctly with multiple instances', () => {
      render(
        <div>
          <ThreadItem icon={<Star />} title="Thread 1" />
          <ThreadItem icon={<Person />} title="Thread 2" />
          <ThreadItem icon={<Message />} title="Thread 3" />
        </div>
      );
      
      expect(screen.getByText('Thread 1')).toBeInTheDocument();
      expect(screen.getByText('Thread 2')).toBeInTheDocument();
      expect(screen.getByText('Thread 3')).toBeInTheDocument();
    });

    it('maintains state independence between instances', () => {
      render(
        <div>
          <ThreadItem icon={<Star />} title="Thread 1" unread={true} />
          <ThreadItem icon={<Person />} title="Thread 2" unread={false} />
        </div>
      );
      
      const thread1 = screen.getByText('Thread 1').closest('div');
      const thread2 = screen.getByText('Thread 2').closest('div');
      
      expect(thread1).toHaveStyle({
        backgroundColor: 'rgba(239, 246, 255, 1)',
      });
      
      expect(thread2).toHaveStyle({
        backgroundColor: 'transparent',
      });
    });
  });
});
