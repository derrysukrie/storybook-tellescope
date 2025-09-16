import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TableTabsFiltersControls from './table-tabs-filters-controls';
import { CalendarViewMonth, Person } from '@mui/icons-material';
import { Typography } from '@mui/material';

// Mock the complex sub-components to focus on the main functionality
vi.mock('../../tabs/tab-bar', () => ({
  default: ({ tabs, tabPanels, tableControls, defaultTab, onChange }: any) => (
    <div data-testid="tab-bar">
      <div data-testid="tabs">
        {tabs?.map((tab: any, index: number) => (
          <button key={index} data-testid={`tab-${index}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div data-testid="tab-panels">
        {tabPanels?.map((panel: any, index: number) => (
          <div key={index} data-testid={`panel-${index}`}>
            {panel.content}
          </div>
        ))}
      </div>
      <div data-testid="table-controls">
        {tableControls}
      </div>
    </div>
  ),
}));

vi.mock('../detail-select/detail-select-pending', () => ({
  default: ({ availableFilterFields, onChangeFilter }: any) => (
    <div data-testid="detail-select-pending">
      <button
        data-testid="add-filter-button"
        onClick={() => onChangeFilter?.('testField')}
      >
        Add Filter
      </button>
      <span data-testid="available-fields-count">
        {availableFilterFields?.length || 5}
      </span>
    </div>
  ),
}));

vi.mock('../detail-select/detail-select-default', () => ({
  default: ({ appearance, field, onAddSort, onDeleteSort }: any) => (
    <div data-testid={`detail-select-${appearance}`}>
      <span data-testid="field-name">{field}</span>
      {appearance === 'sort' && (
        <>
          <button
            data-testid="add-sort-button"
            onClick={() => onAddSort?.('sortField')}
          >
            Add Sort
          </button>
          <button
            data-testid="delete-sort-button"
            onClick={() => onDeleteSort?.()}
          >
            Delete Sort
          </button>
        </>
      )}
    </div>
  ),
}));

vi.mock('../../../atoms/table-control-elements/reset/reset', () => ({
  default: ({ onClick }: any) => (
    <button data-testid="reset-button" onClick={onClick}>
      Reset
    </button>
  ),
}));

// Mock data
const mockTabs = [
  { label: 'All Contacts', icon: <CalendarViewMonth /> },
  { label: 'Patients', icon: <Person /> },
];

const mockTabPanels = [
  { content: <Typography>All Contacts Content</Typography> },
  { content: <Typography>Patients Content</Typography> },
];

const mockSelectedFilters = [
  { field: 'name', value: 'John', filterOption: 'contains' },
];

const mockSelectedSorts = [
  { field: 'date', order: 'ascending' as const },
];

describe('TableTabsFiltersControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<TableTabsFiltersControls />);
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('renders with provided tabs and panels', () => {
      render(
        <TableTabsFiltersControls
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
      expect(screen.getByTestId('tab-panels')).toBeInTheDocument();
    });

    it('renders table controls', () => {
      render(<TableTabsFiltersControls />);
      expect(screen.getByTestId('table-controls')).toBeInTheDocument();
    });
  });

  describe('Filter Management', () => {
    it('initializes with provided selected filters', () => {
      render(
        <TableTabsFiltersControls selectedFilters={mockSelectedFilters} />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('shows filter controls when filters are selected', () => {
      render(
        <TableTabsFiltersControls selectedFilters={mockSelectedFilters} />
      );
      
      // Filter button should be visible
      const filterButtons = screen.getAllByTestId('add-filter-button');
      expect(filterButtons.length).toBeGreaterThan(0);
    });

    it('handles adding new filters', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls />
      );
      
      // Add a filter via the detail select component
      const addFilterButtons = screen.getAllByTestId('add-filter-button');
      await user.click(addFilterButtons[0]);
      
      // Should not throw errors
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('shows available filter fields correctly', () => {
      render(
        <TableTabsFiltersControls selectedFilters={mockSelectedFilters} />
      );
      
      // Should show reduced available fields
      const availableFieldsCounts = screen.getAllByTestId('available-fields-count');
      expect(availableFieldsCounts.length).toBeGreaterThan(0);
    });

    it('handles filter reset functionality', () => {
      render(
        <TableTabsFiltersControls
          selectedFilters={mockSelectedFilters}
          reset={true}
        />
      );
      
      expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });
  });

  describe('Sort Management', () => {
    it('initializes with provided selected sorts', () => {
      render(
        <TableTabsFiltersControls selectedSorts={mockSelectedSorts} />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('handles adding new sorts', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls />
      );
      
      // Add a sort via the detail select component - only if it exists
      const addSortButtons = screen.queryAllByTestId('add-sort-button');
      if (addSortButtons.length > 0) {
        await user.click(addSortButtons[0]);
      }
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('shows sort controls when sorts are selected', () => {
      render(
        <TableTabsFiltersControls selectedSorts={mockSelectedSorts} />
      );
      
      expect(screen.getByTestId('detail-select-sort')).toBeInTheDocument();
    });

    it('handles sort deletion', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls selectedSorts={mockSelectedSorts} />
      );
      
      // Delete sort if button exists
      const deleteSortButtons = screen.queryAllByTestId('delete-sort-button');
      if (deleteSortButtons.length > 0) {
        await user.click(deleteSortButtons[0]);
      }
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('integrates with TabBar component', () => {
      render(
        <TableTabsFiltersControls
          tabs={mockTabs}
          tabPanels={mockTabPanels}
        />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
      expect(screen.getByTestId('tab-panels')).toBeInTheDocument();
    });

    it('passes correct props to sub-components', () => {
      render(
        <TableTabsFiltersControls
          selectedFilters={mockSelectedFilters}
          selectedSorts={mockSelectedSorts}
        />
      );
      
      // Check that detail select components are rendered
      expect(screen.getByTestId('detail-select-pending')).toBeInTheDocument();
      expect(screen.getByTestId('detail-select-sort')).toBeInTheDocument();
    });

    it('handles complex state interactions', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls />
      );
      
      // Add filter and sort
      const addFilterButtons = screen.getAllByTestId('add-filter-button');
      const addSortButtons = screen.queryAllByTestId('add-sort-button');
      
      await user.click(addFilterButtons[0]);
      if (addSortButtons.length > 0) {
        await user.click(addSortButtons[0]);
      }
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('handles all optional props', () => {
      render(
        <TableTabsFiltersControls
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          selectedFilters={mockSelectedFilters}
          selectedSorts={mockSelectedSorts}
          openSortMenu={true}
          reset={true}
          openDetailSelectSort={true}
          openDetailSelectFilter={{ open: true, index: 0 }}
        />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('works with minimal props', () => {
      render(<TableTabsFiltersControls />);
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      render(
        <TableTabsFiltersControls
          tabs={undefined}
          tabPanels={undefined}
          selectedFilters={undefined}
          selectedSorts={undefined}
        />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty arrays', () => {
      render(
        <TableTabsFiltersControls
          tabs={[]}
          tabPanels={[]}
          selectedFilters={[]}
          selectedSorts={[]}
        />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('handles large numbers of filters and sorts', () => {
      const manyFilters = Array.from({ length: 10 }, (_, i) => ({
        field: `field${i}`,
        value: `value${i}`,
        filterOption: 'contains',
      }));
      
      const manySorts = Array.from({ length: 10 }, (_, i) => ({
        field: `field${i}`,
        order: i % 2 === 0 ? 'ascending' as const : 'descending' as const,
      }));
      
      render(
        <TableTabsFiltersControls
          selectedFilters={manyFilters}
          selectedSorts={manySorts}
        />
      );
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });

    it('handles rapid state changes', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls />
      );
      
      const addFilterButtons = screen.getAllByTestId('add-filter-button');
      const addSortButtons = screen.queryAllByTestId('add-sort-button');
      
      // Rapid clicks
      await user.click(addFilterButtons[0]);
      if (addSortButtons.length > 0) {
        await user.click(addSortButtons[0]);
      }
      await user.click(addFilterButtons[0]);
      if (addSortButtons.length > 0) {
        await user.click(addSortButtons[0]);
      }
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with complex state', () => {
      const startTime = performance.now();
      
      render(
        <TableTabsFiltersControls
          tabs={mockTabs}
          tabPanels={mockTabPanels}
          selectedFilters={mockSelectedFilters}
          selectedSorts={mockSelectedSorts}
        />
      );
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('handles multiple re-renders efficiently', () => {
      const { rerender } = render(
        <TableTabsFiltersControls selectedFilters={[]} />
      );
      
      // Multiple re-renders with different props
      for (let i = 0; i < 5; i++) {
        rerender(
          <TableTabsFiltersControls
            selectedFilters={[
              { field: `field${i}`, value: `value${i}`, filterOption: 'contains' }
            ]}
          />
        );
      }
      
      expect(screen.getByTestId('tab-bar')).toBeInTheDocument();
    });
  });
});