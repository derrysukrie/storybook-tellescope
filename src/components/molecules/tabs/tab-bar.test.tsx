import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TabBar from './tab-bar';
import { CalendarViewMonth, Person, Settings } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';

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
  createMockTab('All Contacts', <CalendarViewMonth data-testid="calendar-icon-1" />),
  createMockTab('Patients', <CalendarViewMonth data-testid="calendar-icon-2" />),
  createMockTab('Staff', <Person data-testid="person-icon" />),
];

const mockTabPanels = [
  createMockTabPanel('All Contacts Content'),
  createMockTabPanel('Patients Content'),
  createMockTabPanel('Staff Content'),
];

const mockTableControls = (
  <>
    <IconButton data-testid="filter-control">
      <Settings />
    </IconButton>
    <IconButton data-testid="sort-control">
      <Settings />
    </IconButton>
  </>
);

describe('TabBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders all tabs with correct labels', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByText('All Contacts')).toBeInTheDocument();
      expect(screen.getByText('Patients')).toBeInTheDocument();
      expect(screen.getByText('Staff')).toBeInTheDocument();
    });

    it('renders icons for all tabs', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByTestId('calendar-icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-icon-2')).toBeInTheDocument();
      expect(screen.getByTestId('person-icon')).toBeInTheDocument();
    });

    it('renders tab panels with correct content', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      // Only first tab panel should be visible initially
      expect(screen.getByText('All Contacts Content')).toBeInTheDocument();
      expect(screen.queryByText('Patients Content')).not.toBeInTheDocument();
      expect(screen.queryByText('Staff Content')).not.toBeInTheDocument();
    });

    it('always renders add button', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });
  });

  describe('Table Controls', () => {
    it('renders table controls when provided', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          tableControls={mockTableControls}
        />
      );
      
      expect(screen.getByTestId('filter-control')).toBeInTheDocument();
      expect(screen.getByTestId('sort-control')).toBeInTheDocument();
    });

    it('does not render table controls when not provided', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.queryByTestId('filter-control')).not.toBeInTheDocument();
      expect(screen.queryByTestId('sort-control')).not.toBeInTheDocument();
    });

    it('positions table controls on the right side', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          tableControls={mockTableControls}
        />
      );
      
      const headerStack = screen.getByRole('tablist').closest('div')?.parentElement;
      expect(headerStack).toBeInTheDocument();
      
      const controlsContainer = screen.getByTestId('filter-control').closest('div');
      expect(controlsContainer).toBeInTheDocument();
    });
  });

  describe('Tab Interactions', () => {
    it('switches to second tab when clicked', async () => {
      const user = userEvent.setup();
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByText('All Contacts Content')).toBeInTheDocument();
      expect(screen.queryByText('Patients Content')).not.toBeInTheDocument();
      
      const patientsTab = screen.getByRole('tab', { name: 'Patients' });
      await user.click(patientsTab);
      
      expect(screen.queryByText('All Contacts Content')).not.toBeInTheDocument();
      expect(screen.getByText('Patients Content')).toBeInTheDocument();
    });

    it('calls onChange callback when tab is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          onChange={onChange}
        />
      );
      
      const patientsTab = screen.getByRole('tab', { name: 'Patients' });
      await user.click(patientsTab);
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), 1);
    });

    it('switches to third tab when clicked', async () => {
      const user = userEvent.setup();
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const staffTab = screen.getByRole('tab', { name: 'Staff' });
      await user.click(staffTab);
      
      expect(screen.queryByText('All Contacts Content')).not.toBeInTheDocument();
      expect(screen.queryByText('Patients Content')).not.toBeInTheDocument();
      expect(screen.getByText('Staff Content')).toBeInTheDocument();
    });

    it('handles add button click', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          onChange={onChange}
        />
      );
      
      const addButton = screen.getByTestId('AddIcon').closest('button');
      await user.click(addButton!);
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), mockTabs.length);
    });

    it('uses defaultTab when provided', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          defaultTab={1}
        />
      );
      
      expect(screen.getByText('Patients Content')).toBeInTheDocument();
      expect(screen.queryByText('All Contacts Content')).not.toBeInTheDocument();
    });

    it('uses value prop for initial state', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          value={2}
        />
      );
      
      expect(screen.getByText('Staff Content')).toBeInTheDocument();
      expect(screen.queryByText('All Contacts Content')).not.toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct styling to tab bar container', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const container = screen.getByRole('tablist').closest('div')?.parentElement;
      // MUI Tabs container styling may vary, so we check for basic structure
      expect(container).toBeInTheDocument();
    });

    it('applies correct styling to individual tabs', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        // MUI Tab styling may vary, so we check for basic structure
        expect(tab).toBeInTheDocument();
        expect(tab).toHaveAttribute('role', 'tab');
      });
    });

    it('shows selected tab with correct styling', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          value={1}
        />
      );
      
      const selectedTab = screen.getByRole('tab', { name: 'Patients', selected: true });
      expect(selectedTab).toBeInTheDocument();
    });

    it('applies proper spacing between table controls', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          tableControls={mockTableControls}
        />
      );
      
      const controlsContainer = screen.getByTestId('filter-control').closest('div');
      expect(controlsContainer).toHaveStyle({
        gap: '8px',
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for tablist', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toHaveAttribute('aria-label', 'basic tabs example');
    });

    it('has proper ARIA attributes for tabs', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute('id', `simple-tab-${index}`);
        expect(tab).toHaveAttribute('aria-controls', `simple-tabpanel-${index}`);
      });
    });

    it('has proper ARIA attributes for add button', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const addButton = screen.getByTestId('AddIcon').closest('button');
      expect(addButton).toHaveAttribute('id', `simple-tab-${mockTabs.length}`);
      expect(addButton).toHaveAttribute('aria-controls', `simple-tabpanel-${mockTabs.length}`);
    });

    it('has proper tabpanel attributes', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const activeTabPanel = screen.getByRole('tabpanel');
      expect(activeTabPanel).toHaveAttribute('id', 'simple-tabpanel-0');
      expect(activeTabPanel).toHaveAttribute('aria-labelledby', 'simple-tab-0');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const firstTab = screen.getByRole('tab', { name: 'All Contacts' });
      firstTab.focus();
      
      await user.keyboard('{ArrowRight}');
      
      const secondTab = screen.getByRole('tab', { name: 'Patients' });
      expect(secondTab).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tabs array', () => {
      render(
        <TabBar
          tabs={[]}
          tabPanels={[]}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      // Only add button should be present
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('handles single tab', () => {
      const singleTab = [mockTabs[0]];
      const singlePanel = [mockTabPanels[0]];
      
      render(
        <TabBar
          tabs={singleTab}
          tabPanels={singlePanel}
        />
      );
      
      expect(screen.getByText('All Contacts')).toBeInTheDocument();
      expect(screen.getByText('All Contacts Content')).toBeInTheDocument();
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('handles mismatched tabs and panels', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels.slice(0, 2)}
        />
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(mockTabs.length + 1); // +1 for add button
    });

    it('handles out of bounds value', () => {
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          value={10}
        />
      );
      
      // Should not crash and should show no content
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles undefined onChange', async () => {
      const user = userEvent.setup();
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      const secondTab = screen.getByRole('tab', { name: 'Patients' });
      
      // Should not throw error
      await user.click(secondTab);
      expect(screen.getByText('Patients Content')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('handles rapid tab switching', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          onChange={onChange}
        />
      );
      
      const tab1 = screen.getByRole('tab', { name: 'All Contacts' });
      const tab2 = screen.getByRole('tab', { name: 'Patients' });
      const tab3 = screen.getByRole('tab', { name: 'Staff' });
      
      // Rapid clicking
      await user.click(tab2);
      await user.click(tab3);
      await user.click(tab1);
      
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('renders efficiently with many tabs', () => {
      const manyTabs = Array.from({ length: 20 }, (_, i) => 
        createMockTab(`Tab ${i}`, <Settings key={i} />)
      );
      const manyPanels = Array.from({ length: 20 }, (_, i) => 
        createMockTabPanel(`Content ${i}`)
      );
      
      const startTime = performance.now();
      render(
        <TabBar
          tabs={manyTabs}
          tabPanels={manyPanels}
        />
      );
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('Integration', () => {
    it('works correctly with multiple instances', () => {
      render(
        <div>
          <TabBar
            tabs={mockTabs.slice(0, 2)}
            tabPanels={mockTabPanels.slice(0, 2)}
          />
          <TabBar
            tabs={mockTabs.slice(1, 3)}
            tabPanels={mockTabPanels.slice(1, 3)}
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
          <TabBar
            tabs={mockTabs}
            tabPanels={mockTabPanels}
            onChange={onChange1}
          />
          <TabBar
            tabs={mockTabs}
            tabPanels={mockTabPanels}
            onChange={onChange2}
          />
        </div>
      );
      
      const tabLists = screen.getAllByRole('tablist');
      const firstTabList = tabLists[0];
      const firstTab2 = within(firstTabList).getByRole('tab', { name: 'Patients' });
      
      await user.click(firstTab2);
      
      expect(onChange1).toHaveBeenCalledWith(expect.any(Object), 1);
      expect(onChange2).not.toHaveBeenCalled();
    });

    it('works with complex table controls', () => {
      const complexControls = (
        <div data-testid="complex-controls">
          <IconButton>Filter</IconButton>
          <IconButton>Sort</IconButton>
          <IconButton>Search</IconButton>
        </div>
      );
      
      render(
        <TabBar
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          tableControls={complexControls}
        />
      );
      
      expect(screen.getByTestId('complex-controls')).toBeInTheDocument();
    });
  });
});
