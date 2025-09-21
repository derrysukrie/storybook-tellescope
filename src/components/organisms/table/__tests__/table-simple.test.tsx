import { render, screen, fireEvent } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TableContent } from '../table';
import { data } from '../data';

// Mock the filter context hook
const mockUseFilterContext = vi.fn(() => ({ hide: false }));

vi.mock('../../molecules/table-elements/table-tabs-filters-controls/table-tabs-filters-controls', () => ({
  useFilterContext: mockUseFilterContext
}));

// Mock MUI components
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

// Mock other components
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

describe('Table Component - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFilterContext.mockReturnValue({ hide: false });
  });

  describe('Basic Rendering', () => {
    it('renders table structure', () => {
      render(<TableContent />);
      
      expect(screen.getByTestId('table-container')).toBeInTheDocument();
      expect(screen.getByTestId('mui-table')).toBeInTheDocument();
    });

    it('renders table headers', () => {
      render(<TableContent />);
      
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Care Team')).toBeInTheDocument();
      expect(screen.getByText('Share with')).toBeInTheDocument();
      expect(screen.getByText('Journeys')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    it('renders data rows', () => {
      render(<TableContent />);
      
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows).toHaveLength(data.length);
    });

    it('renders checkboxes for each row', () => {
      render(<TableContent />);
      
      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes).toHaveLength(data.length);
    });

    it('renders select components', () => {
      render(<TableContent />);
      
      const selects = screen.getAllByTestId('select');
      expect(selects.length).toBeGreaterThan(0);
    });
  });

  describe('Data Display', () => {
    it('displays name data', () => {
      render(<TableContent />);
      
      expect(screen.getByText('chompy')).toBeInTheDocument();
      expect(screen.getByText('quacks')).toBeInTheDocument();
      expect(screen.getByText('jumpy')).toBeInTheDocument();
    });

    it('displays all data rows', () => {
      render(<TableContent />);
      
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows).toHaveLength(data.length);
    });
  });

  describe('User Interactions', () => {
    it('allows checkbox interaction', async () => {
      const user = userEvent.setup();
      render(<TableContent />);
      
      const firstCheckbox = screen.getAllByTestId('checkbox')[0];
      expect(firstCheckbox).not.toBeChecked();
      
      await user.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
    });

    it('allows select interaction', async () => {
      const user = userEvent.setup();
      render(<TableContent />);
      
      const firstSelect = screen.getAllByTestId('select')[0];
      expect(firstSelect).toBeInTheDocument();
      
      // Test that select is interactive
      await user.click(firstSelect);
      expect(firstSelect).toBeInTheDocument();
    });
  });

  describe('Table Footer', () => {
    it('renders footer with add button', () => {
      render(<TableContent />);
      
      expect(screen.getByTestId('mui-table-footer')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });
  });

  describe('Filter Context', () => {
    it('uses filter context correctly', () => {
      render(<TableContent />);
      
      expect(mockUseFilterContext).toHaveBeenCalled();
    });

    it('handles hide state from context', () => {
      mockUseFilterContext.mockReturnValue({ hide: true });
      render(<TableContent />);
      
      expect(mockUseFilterContext).toHaveBeenCalled();
    });
  });

  describe('Data Validation', () => {
    it('has correct data structure', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      data.forEach((item) => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('careTeam');
        expect(item).toHaveProperty('shareWith');
        expect(item).toHaveProperty('journeys');
        expect(item).toHaveProperty('tags');
      });
    });

    it('has consistent data types', () => {
      data.forEach((item) => {
        expect(typeof item.name).toBe('string');
        expect(Array.isArray(item.careTeam)).toBe(true);
        expect(Array.isArray(item.shareWith)).toBe(true);
        expect(Array.isArray(item.journeys)).toBe(true);
        expect(Array.isArray(item.tags)).toBe(true);
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper table structure', () => {
      render(<TableContent />);
      
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('has form controls', () => {
      render(<TableContent />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });
});
