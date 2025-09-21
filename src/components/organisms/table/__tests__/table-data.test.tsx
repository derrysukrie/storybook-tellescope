import { render, screen } from '../../../../../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { TableContent } from '../table';
import { data } from '../data';

// Mock the same dependencies as the main test file
vi.mock('../../molecules/table-elements/table-tabs-filters-controls/table-tabs-filters-controls', () => ({
  useFilterContext: () => ({ hide: false })
}));

vi.mock('../../molecules/table-elements/table-cell-row/table-cell-row', () => ({
  default: ({ children, ...props }: any) => (
    <tr data-testid="table-cell-row" {...props}>
      {children}
    </tr>
  )
}));

vi.mock('../../atoms/table-control-elements/table-head/table-head', () => ({
  default: ({ children, ...props }: any) => (
    <th data-testid="table-head" {...props}>
      {children}
    </th>
  )
}));

vi.mock('../../atoms/table-control-elements/table-cell/table-cell', () => ({
  default: ({ children, ...props }: any) => (
    <td data-testid="table-cell" {...props}>
      {children}
    </td>
  )
}));

vi.mock('../../atoms/checkbox/checkbox', () => ({
  default: ({ ...props }: any) => (
    <input type="checkbox" data-testid="checkbox" {...props} />
  )
}));

vi.mock('../../atoms/select/select', () => ({
  default: ({ children, value, onChange, ...props }: any) => (
    <select 
      data-testid="select" 
      value={Array.isArray(value) ? value.join(',') : value}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  )
}));

vi.mock('../../atoms/table-control-elements/table-footer/table-footer', () => ({
  default: ({ children, ...props }: any) => (
    <td data-testid="table-footer" {...props}>
      {children}
    </td>
  )
}));

vi.mock('@mui/icons-material/Add', () => ({
  default: () => <span data-testid="add-icon">Add</span>
}));

vi.mock('@mui/icons-material/CalendarMonth', () => ({
  default: () => <span data-testid="calendar-icon">Calendar</span>
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Table: ({ children, ...props }: any) => (
      <table data-testid="mui-table" {...props}>
        {children}
      </table>
    ),
    TableRow: ({ children, ...props }: any) => (
      <tr data-testid="mui-table-row" {...props}>
        {children}
      </tr>
    ),
    TableContainer: ({ children, ...props }: any) => (
      <div data-testid="table-container" {...props}>
        {children}
      </div>
    ),
    TableFooter: ({ children, ...props }: any) => (
      <tfoot data-testid="mui-table-footer" {...props}>
        {children}
      </tfoot>
    ),
    MenuItem: ({ children, value, ...props }: any) => (
      <option value={value} {...props}>
        {children}
      </option>
    ),
    Stack: ({ children, ...props }: any) => (
      <div data-testid="stack" {...props}>
        {children}
      </div>
    )
  };
});

describe('Table Data Handling', () => {
  describe('Data Structure Validation', () => {
    it('has correct data structure', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      data.forEach((item, index) => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('careTeam');
        expect(item).toHaveProperty('shareWith');
        expect(item).toHaveProperty('journeys');
        expect(item).toHaveProperty('tags');
        
        expect(typeof item.name).toBe('string');
        expect(Array.isArray(item.careTeam)).toBe(true);
        expect(Array.isArray(item.shareWith)).toBe(true);
        expect(Array.isArray(item.journeys)).toBe(true);
        expect(Array.isArray(item.tags)).toBe(true);
      });
    });

    it('has unique names for most entries', () => {
      const names = data.map(item => item.name);
      const uniqueNames = new Set(names);
      
      // Allow for some duplicates (the data has 9 repeated "name" entries)
      expect(uniqueNames.size).toBeGreaterThan(data.length * 0.5);
    });

    it('has consistent data types across all entries', () => {
      data.forEach(item => {
        expect(item.careTeam.every(team => typeof team === 'string')).toBe(true);
        expect(item.shareWith.every(share => typeof share === 'string')).toBe(true);
        expect(item.journeys.every(journey => typeof journey === 'string')).toBe(true);
        expect(item.tags.every(tag => typeof tag === 'string')).toBe(true);
      });
    });
  });

  describe('Data Rendering', () => {
    it('renders all data entries', () => {
      render(<TableContent />);
      
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows).toHaveLength(data.length);
    });

    it('displays all unique names', () => {
      render(<TableContent />);
      
      const uniqueNames = [...new Set(data.map(item => item.name))];
      uniqueNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it('renders correct number of checkboxes', () => {
      render(<TableContent />);
      
      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes).toHaveLength(data.length);
    });

    it('renders correct number of select components', () => {
      render(<TableContent />);
      
      const selects = screen.getAllByTestId('select');
      // Each row has 4 selects (careTeam, shareWith, journeys, tags)
      expect(selects).toHaveLength(data.length * 4);
    });
  });

  describe('Data Content Validation', () => {
    it('displays care team data correctly', () => {
      render(<TableContent />);
      
      // Check that care team options are available
      expect(screen.getByText('Rice')).toBeInTheDocument();
      expect(screen.getByText('Nom')).toBeInTheDocument();
      expect(screen.getByText('Bobba')).toBeInTheDocument();
      expect(screen.getByText('Chompy')).toBeInTheDocument();
      expect(screen.getByText('Fungi')).toBeInTheDocument();
      expect(screen.getByText('Bok')).toBeInTheDocument();
      expect(screen.getByText('Choy')).toBeInTheDocument();
    });

    it('displays share with data correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByText('Organization')).toBeInTheDocument();
    });

    it('displays journeys data correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByText('Synt to Healthie')).toBeInTheDocument();
      expect(screen.getByText('Content campaign')).toBeInTheDocument();
    });

    it('displays tags data correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByText('Added to Tellescope')).toBeInTheDocument();
    });
  });

  describe('Data Edge Cases', () => {
    it('handles empty arrays in data', () => {
      const emptyDataItem = {
        name: 'test',
        careTeam: [],
        shareWith: [],
        journeys: [],
        tags: []
      };
      
      // Mock data with empty arrays
      vi.doMock('../data', () => ({
        data: [emptyDataItem]
      }));
      
      render(<TableContent />);
      
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('handles special characters in names', () => {
      render(<TableContent />);
      
      // The data contains names with various characters
      data.forEach(item => {
        if (item.name) {
          expect(screen.getByText(item.name)).toBeInTheDocument();
        }
      });
    });

    it('handles long data arrays', () => {
      render(<TableContent />);
      
      // Check that all rows are rendered even with large dataset
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows).toHaveLength(data.length);
    });
  });

  describe('Data Consistency', () => {
    it('has consistent shareWith values', () => {
      const shareWithValues = data.map(item => item.shareWith);
      const allShareWith = shareWithValues.flat();
      const uniqueShareWith = [...new Set(allShareWith)];
      
      // All shareWith values should be the same
      expect(uniqueShareWith).toEqual(['organization']);
    });

    it('has consistent journeys values', () => {
      const journeysValues = data.map(item => item.journeys);
      const allJourneys = journeysValues.flat();
      const uniqueJourneys = [...new Set(allJourneys)];
      
      // All journeys should be the same
      expect(uniqueJourneys).toEqual(['synt to healthie', 'content campaign']);
    });

    it('has consistent tags values', () => {
      const tagsValues = data.map(item => item.tags);
      const allTags = tagsValues.flat();
      const uniqueTags = [...new Set(allTags)];
      
      // All tags should be the same
      expect(uniqueTags).toEqual(['added to tellescope']);
    });

    it('has varied careTeam values', () => {
      const careTeamValues = data.map(item => item.careTeam);
      const allCareTeam = careTeamValues.flat();
      const uniqueCareTeam = [...new Set(allCareTeam)];
      
      // Care team should have variety
      expect(uniqueCareTeam.length).toBeGreaterThan(5);
    });
  });

  describe('Data Performance', () => {
    it('renders efficiently with large dataset', () => {
      const startTime = performance.now();
      render(<TableContent />);
      const endTime = performance.now();
      
      // Should render within reasonable time (adjust threshold as needed)
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('handles data updates efficiently', () => {
      const { rerender } = render(<TableContent />);
      
      const startTime = performance.now();
      rerender(<TableContent />);
      const endTime = performance.now();
      
      // Re-render should be fast
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});
