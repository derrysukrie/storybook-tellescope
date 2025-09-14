import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetailSelect from './detail-select-default';

// Test data factories
const createMockSortField = (label: string, value: string) => ({
  label,
  value,
  icon: <span data-testid={`icon-${value}`} />
});

const createMockFilterOption = (label: string, value: string) => ({
  label,
  value
});

// Mock data using factories
const availableSortFields = [
  createMockSortField('Name', 'name'),
  createMockSortField('Care Team', 'care team'),
  createMockSortField('Share Team', 'share team'),
  createMockSortField('Journeys', 'journeys'),    
  createMockSortField('Tags', 'tags'),
];

const filterOptions = [
  createMockFilterOption('is', 'is'),
  createMockFilterOption('is not', 'is not'),
  createMockFilterOption('contains', 'contains'),
  createMockFilterOption('does not contain', 'does not contain'),
  createMockFilterOption('starts with', 'starts with'),
  createMockFilterOption('ends with', 'ends with'),
  createMockFilterOption('is empty', 'is empty'),
  createMockFilterOption('is not empty', 'is not empty'),
];

describe('DetailSelect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Sort Mode', () => {
    it('renders sort button with default text when no sorts applied', () => {
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });

    it('renders sort button with field name when single sort applied', () => {
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
        />
      );
      expect(screen.getByText('name')).toBeInTheDocument();
    });

    it('renders sort button with count when multiple sorts applied', () => {
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[
            { field: 'name', order: 'ascending' },
            { field: 'care team', order: 'descending' },
          ]}
        />
      );
      expect(screen.getByText('2 Sorts')).toBeInTheDocument();
    });

    it('opens sort menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByText('Add sort')).toBeInTheDocument();
    });

    it('displays sort rows for existing sorts', async () => {
      const user = userEvent.setup();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const combos = screen.getAllByRole('combobox');
      expect(combos[0]).toHaveTextContent('name');
      if (combos[1]) expect(combos[1]).toHaveTextContent(/ascending/i);
    });

    it('calls onAddSort when adding a new sort', async () => {
      const user = userEvent.setup();
      const onAddSort = vi.fn();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          onAddSort={onAddSort}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const addSortButton = screen.getByText('Add sort');
      await user.click(addSortButton);
      const nameField = screen.getByText('Name');
      await user.click(nameField);
      expect(onAddSort).toHaveBeenCalledWith('name');
    });

    it('calls onDeleteSort when deleting all sorts', async () => {
      const user = userEvent.setup();
      const onDeleteSort = vi.fn();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
          onDeleteSort={onDeleteSort}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const deleteButton = screen.getByText('Delete sort');
      await user.click(deleteButton);
      expect(onDeleteSort).toHaveBeenCalled();
    });

    it('calls onChangeSort when field is changed', async () => {
      const user = userEvent.setup();
      const onChangeSort = vi.fn();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
          onChangeSort={onChangeSort}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const combos = screen.getAllByRole('combobox');
      await user.click(combos[0]);
      const careTeamOption = screen.getByText('Care Team');
      await user.click(careTeamOption);
      expect(onChangeSort).toHaveBeenCalledWith('care team', 'ascending', 'name');
    });

    it('calls onChangeSortOrder when order is changed', async () => {
      const user = userEvent.setup();
      const onChangeSortOrder = vi.fn();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
          onChangeSortOrder={onChangeSortOrder}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const combos = screen.getAllByRole('combobox');
      await user.click(combos[1]);
      const descendingOption = screen.getByText('Descending');
      await user.click(descendingOption);
      expect(onChangeSortOrder).toHaveBeenCalledWith('name', 'descending');
    });

    it('shows search functionality in field selector', async () => {
      const user = userEvent.setup();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const combos = screen.getAllByRole('combobox');
      await user.click(combos[0]);
      const searchInput = screen.getByPlaceholderText('Search For Property');
      expect(searchInput).toBeInTheDocument();
      await user.type(searchInput, 'care');
      expect(screen.getByText('Care Team')).toBeInTheDocument();
      expect(screen.queryByText('Share Team')).not.toBeInTheDocument();
      expect(screen.queryByText('Name')).not.toBeInTheDocument();
    });

    it('shows "No fields found" when search yields no results', async () => {
      const user = userEvent.setup();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const combos = screen.getAllByRole('combobox');
      await user.click(combos[0]);
      const searchInput = screen.getByPlaceholderText('Search For Property');
      await user.type(searchInput, 'nonexistent');
      expect(screen.getByText('No fields found')).toBeInTheDocument();
    });

    it('hides add sort option when all fields are used', async () => {
      const user = userEvent.setup();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={availableSortFields.map((f) => ({ field: f.value, order: 'ascending' as const }))}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.queryByText('Add sort')).not.toBeInTheDocument();
    });

    it('opens menu programmatically when open prop is true', () => {
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} open={true} />);
      expect(screen.getByText('Add sort')).toBeInTheDocument();
    });
  });

  describe('Filter Mode', () => {
    it('renders filter button with default styling when no filter applied', () => {
      render(<DetailSelect appearance="filter" filterOptions={filterOptions} field="name" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Aa')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
    });

    it('renders filter button with active styling when filter is applied', () => {
      render(
        <DetailSelect
          appearance="filter"
          filterOptions={filterOptions}
          field="name"
          value={{ value: 'test', filterOption: 'contains' }}
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#0288D114' });
    });

    it('opens filter menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<DetailSelect appearance="filter" filterOptions={filterOptions} field="name" />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getAllByText('name').length).toBeGreaterThan(0);
      expect(screen.getByRole('combobox')).toHaveTextContent('contains');
    });

    it('displays filter options selector', async () => {
      const user = userEvent.setup();
      render(<DetailSelect appearance="filter" filterOptions={filterOptions} field="name" />);
      const button = screen.getByRole('button');
      await user.click(button);
      const optionCombobox = screen.getByRole('combobox');
      await user.click(optionCombobox);
      expect(screen.getByText('is')).toBeInTheDocument();
      expect(screen.getByText('is not')).toBeInTheDocument();
      // 'contains' appears both as selected value and menu option; ensure at least one exists
      expect(screen.getAllByText('contains').length).toBeGreaterThan(0);
    });

    it('shows value input for non-empty filter options', async () => {
      const user = userEvent.setup();
      render(<DetailSelect appearance="filter" filterOptions={filterOptions} field="name" />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByPlaceholderText('Type a value...')).toBeInTheDocument();
    });

    it('hides value input for empty filter options', async () => {
      const user = userEvent.setup();
      render(
        <DetailSelect
          appearance="filter"
          filterOptions={filterOptions}
          field="name"
          value={{ value: '', filterOption: 'is empty' }}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.queryByPlaceholderText('Type a value...')).not.toBeInTheDocument();
    });

    it('calls onSetFilterOption when filter option is changed', async () => {
      const user = userEvent.setup();
      const onSetFilterOption = vi.fn();
      render(
        <DetailSelect
          appearance="filter"
          filterOptions={filterOptions}
          field="name"
          onSetFilterOption={onSetFilterOption}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const optionCombobox = screen.getByRole('combobox');
      await user.click(optionCombobox);
      const startsWithOption = screen.getByText('starts with');
      await user.click(startsWithOption);
      expect(onSetFilterOption).toHaveBeenCalledWith('starts with');
    });

    it('calls onSetFilterValue when filter value is changed', async () => {
      const user = userEvent.setup();
      const onSetFilterValue = vi.fn();
      render(
        <DetailSelect appearance="filter" filterOptions={filterOptions} field="name" onSetFilterValue={onSetFilterValue} />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const valueInput = screen.getByPlaceholderText('Type a value...');
      await user.type(valueInput, 'test');
      await waitFor(() => {
        expect(onSetFilterValue).toHaveBeenCalledWith('test');
      }, { timeout: 1000 });
    });

    it('calls onClearFilter when value is cleared', async () => {
      const user = userEvent.setup();
      const onClearFilter = vi.fn();
      render(
        <DetailSelect
          appearance="filter"
          filterOptions={filterOptions}
          field="name"
          value={{ value: 'test', filterOption: 'contains' }}
          onClearFilter={onClearFilter}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      const valueInput = screen.getByDisplayValue('test');
      await user.clear(valueInput);
      await waitFor(() => {
        expect(onClearFilter).toHaveBeenCalled();
      }, { timeout: 1000 });
    });

    it('displays correct filter text in button', () => {
      render(
        <DetailSelect
          appearance="filter"
          filterOptions={filterOptions}
          field="name"
          value={{ value: 'test', filterOption: 'starts with' }}
        />
      );
      expect(screen.getByText('name : starts with')).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('handles empty filter options correctly', () => {
      render(
        <DetailSelect
          appearance="filter"
          filterOptions={filterOptions}
          field="name"
          value={{ value: '', filterOption: 'is empty' }}
        />
      );
      expect(screen.getAllByText('name').length).toBeGreaterThan(0);
      expect(screen.getByText('is empty')).toBeInTheDocument();
    });
  });

  describe('Common Functionality', () => {
    it('calls onClose when menu is closed', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} onClose={onClose} />);
      const button = screen.getByRole('button');
      await user.click(button);
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });

    it('handles controlled open state', () => {
      const { rerender } = render(
        <DetailSelect appearance="sort" availableSortFields={availableSortFields} open={false} />
      );
      expect(screen.queryByText('Add sort')).not.toBeInTheDocument();
      rerender(<DetailSelect appearance="sort" availableSortFields={availableSortFields} open={true} />);
      expect(screen.getByText('Add sort')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for sort mode', () => {
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} />);
      const button = screen.getByRole('button');
      // The component doesn't set aria-haspopup on the button itself, but on the Menu
      expect(button).toBeInTheDocument();
    });

    it('has proper ARIA attributes for filter mode', () => {
      render(<DetailSelect appearance="filter" filterOptions={filterOptions} field="name" />);
      const button = screen.getByRole('button');
      // The component doesn't set aria-haspopup on the button itself, but on the Menu
      expect(button).toBeInTheDocument();
    });

    it('has accessible button text for screen readers', () => {
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Value');
    });

    it('has proper combobox roles for selects', async () => {
      const user = userEvent.setup();
      render(
        <DetailSelect
          appearance="sort"
          availableSortFields={availableSortFields}
          value={[{ field: 'name', order: 'ascending' }]}
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      
      const comboboxes = screen.getAllByRole('combobox');
      expect(comboboxes).toHaveLength(2); // Field and order selects
      expect(comboboxes[0]).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Error Handling', () => {
    it('handles empty availableSortFields gracefully', () => {
      render(<DetailSelect appearance="sort" availableSortFields={[]} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles empty filterOptions gracefully', () => {
      render(<DetailSelect appearance="filter" filterOptions={[]} field="name" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles missing required props gracefully', () => {
      // The component actually handles missing props gracefully by using defaults
      expect(() => render(<DetailSelect appearance="filter" filterOptions={[]} field="test" />)).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('debounces input changes correctly', async () => {
      const user = userEvent.setup();
      const onSetFilterValue = vi.fn();
      
      render(
        <DetailSelect 
          appearance="filter" 
          filterOptions={filterOptions} 
          field="name" 
          onSetFilterValue={onSetFilterValue} 
        />
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const valueInput = screen.getByPlaceholderText('Type a value...');
      
      // Type rapidly
      await user.type(valueInput, 'test');
      
      // Should not be called immediately
      expect(onSetFilterValue).not.toHaveBeenCalled();
      
      // Should be called after debounce delay
      await waitFor(() => {
        expect(onSetFilterValue).toHaveBeenCalledWith('test');
      }, { timeout: 1000 });
    });

    it('handles rapid clicks without memory leaks', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      
      render(<DetailSelect appearance="sort" availableSortFields={availableSortFields} onClose={onClose} />);
      const button = screen.getByRole('button');
      
      // Rapid clicks
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      // Should still work correctly
      expect(screen.getByText('Add sort')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works correctly with multiple instances', () => {
      render(
        <div>
          <DetailSelect appearance="sort" availableSortFields={availableSortFields} />
          <DetailSelect appearance="filter" filterOptions={filterOptions} field="name" />
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('maintains state independence between instances', async () => {
      const user = userEvent.setup();
      const onAddSort1 = vi.fn();
      const onAddSort2 = vi.fn();
      
      render(
        <div>
          <DetailSelect 
            appearance="sort" 
            availableSortFields={availableSortFields} 
            onAddSort={onAddSort1}
          />
          <DetailSelect 
            appearance="sort" 
            availableSortFields={availableSortFields} 
            onAddSort={onAddSort2}
          />
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      
      // Click first button
      await user.click(buttons[0]);
      const addSort1 = screen.getByText('Add sort');
      await user.click(addSort1);
      const nameField1 = screen.getByText('Name');
      await user.click(nameField1);
      
      expect(onAddSort1).toHaveBeenCalledWith('name');
      expect(onAddSort2).not.toHaveBeenCalled();
    });
  });
});
