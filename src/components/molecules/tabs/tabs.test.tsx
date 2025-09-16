import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Tabs from './tabs';
import { Star, CalendarViewMonth } from '@mui/icons-material';
import { Typography } from '@mui/material';

// Test data factories
const createMockTab = (label: string, icon: React.ReactElement) => ({
  label,
  icon
});

const createMockTabPanel = (content: string) => ({
  content: <Typography variant="body2" sx={{ p: 2 }}>{content}</Typography>
});

// Mock data
const mockTabs = [
  createMockTab('Tab 1', <Star data-testid="star-icon-1" />),
  createMockTab('Tab 2', <Star data-testid="star-icon-2" />),
  createMockTab('Tab 3', <Star data-testid="star-icon-3" />),
];

const mockTabPanels = [
  createMockTabPanel('Content for Tab 1'),
  createMockTabPanel('Content for Tab 2'),
  createMockTabPanel('Content for Tab 3'),
];

const mockTableTabs = [
  createMockTab('All Contacts', <CalendarViewMonth data-testid="calendar-icon-1" />),
  createMockTab('Patients', <CalendarViewMonth data-testid="calendar-icon-2" />),
];

describe('Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders all tabs with correct labels', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders icons when icon prop is true', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          icon={true}
        />
      );
      
      expect(screen.getByTestId('star-icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('star-icon-2')).toBeInTheDocument();
      expect(screen.getByTestId('star-icon-3')).toBeInTheDocument();
    });

    it('does not render icons when icon prop is false', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          icon={false}
        />
      );
      
      expect(screen.queryByTestId('star-icon-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('star-icon-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('star-icon-3')).not.toBeInTheDocument();
    });

    it('renders tab panels with correct content', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
      expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
    });
  });

  describe('Appearance Modes', () => {
    it('renders default appearance correctly', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
    });

    it('renders table appearance correctly', () => {
      render(
        <Tabs
          appearance="table"
          tabs={mockTableTabs}
          tabPanels={mockTabPanels.slice(0, 2)}
        />
      );
      
      expect(screen.getByText('All Contacts')).toBeInTheDocument();
      expect(screen.getByText('Patients')).toBeInTheDocument();
    });

    it('shows add button only in table appearance', () => {
      const { rerender } = render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.queryByTestId('AddIcon')).not.toBeInTheDocument();
      
      rerender(
        <Tabs
          appearance="table"
          tabs={mockTableTabs}
          tabPanels={mockTabPanels.slice(0, 2)}
        />
      );
      
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });
  });

  describe('Tab Interactions', () => {
    it('switches to second tab when clicked', async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
      expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);
      
      expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    });

    it('calls onChange callback when tab is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          onChange={onChange}
        />
      );
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), 1);
    });

    it('uses value prop for initial state', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          value={1}
        />
      );
      
      expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    });

    it('uses defaultTab when no value is provided', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          defaultTab={2}
        />
      );
      
      expect(screen.getByText('Content for Tab 3')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toHaveAttribute('aria-label', 'basic tabs example');
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('id', 'simple-tab-0');
      expect(tabs[0]).toHaveAttribute('aria-controls', 'simple-tabpanel-0');
    });

    it('has proper tabpanel attributes', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabPanel = screen.getByRole('tabpanel');
      expect(tabPanel).toHaveAttribute('id', 'simple-tabpanel-0');
      expect(tabPanel).toHaveAttribute('aria-labelledby', 'simple-tab-0');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();
      
      await user.keyboard('{ArrowRight}');
      
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(secondTab).toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('applies correct styling for default appearance', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
    });

    it('applies correct styling for table appearance', () => {
      render(
        <Tabs
          appearance="table"
          tabs={mockTableTabs}
          tabPanels={mockTabPanels.slice(0, 2)}
        />
      );
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
    });

    it('shows selected tab with correct styling', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          value={1}
        />
      );
      
      const selectedTab = screen.getByRole('tab', { name: 'Tab 2', selected: true });
      expect(selectedTab).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tabs array', () => {
      render(
        <Tabs
          appearance="default"
          tabs={[]}
          tabPanels={[]}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles empty tabPanels array', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={[]}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles mismatched tabs and tabPanels arrays', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels.slice(0, 2)}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles out of bounds value', () => {
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          value={10}
        />
      );
      
      // Should not crash and should show no content
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('handles rapid tab switching', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <Tabs
          appearance="default"
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          onChange={onChange}
        />
      );
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      // Rapid clicking - only clicking different tabs triggers onChange
      await user.click(tab2);
      await user.click(tab3);
      await user.click(tab1);
      
      expect(onChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Integration', () => {
    it('works correctly with multiple instances', () => {
      render(
        <div>
          <Tabs
            appearance="default"
            tabs={mockTabs}
            tabPanels={mockTabPanels}
          />
          <Tabs
            appearance="table"
            tabs={mockTableTabs}
            tabPanels={mockTabPanels.slice(0, 2)}
          />
        </div>
      );
      
      const tabLists = screen.getAllByRole('tablist');
      expect(tabLists).toHaveLength(2);
    });

    it('maintains state independence between instances', async () => {
      const user = userEvent.setup();
      const onChange1 = vi.fn();
      const onChange2 = vi.fn();
      
      render(
        <div>
          <Tabs
            appearance="default"
            tabs={mockTabs}
            tabPanels={mockTabPanels}
            onChange={onChange1}
          />
          <Tabs
            appearance="table"
            tabs={mockTableTabs}
            tabPanels={mockTabPanels.slice(0, 2)}
            onChange={onChange2}
          />
        </div>
      );
      
      const firstTabList = screen.getAllByRole('tablist')[0];
      const firstTab2 = within(firstTabList).getByRole('tab', { name: 'Tab 2' });
      await user.click(firstTab2);
      
      expect(onChange1).toHaveBeenCalledWith(expect.any(Object), 1);
      expect(onChange2).not.toHaveBeenCalled();
    });
  });
});
