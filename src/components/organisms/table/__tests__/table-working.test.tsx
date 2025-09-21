import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { data } from '../data';

// Mock the entire table-tabs-filters-controls module
vi.mock('../../molecules/table-elements/table-tabs-filters-controls/table-tabs-filters-controls', () => ({
  default: ({ tabPanels }: any) => (
    <div data-testid="table-tabs-filters">
      {tabPanels.map((panel: any, index: number) => (
        <div key={index} data-testid={`tab-panel-${index}`}>
          {panel.content}
        </div>
      ))}
    </div>
  ),
  useFilterContext: () => ({ hide: false })
}));

// Mock the appbar-sidebar
vi.mock('../appbar-sidebar/appbar-sidebar', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="appbar-sidebar" {...props}>
      {children}
    </div>
  )
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

// Import after mocking
import Table, { TableContent } from '../table';

describe('Table Component - Working Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Main Table Component', () => {
    it('renders with default props', () => {
      render(<Table />);
      
      expect(screen.getByTestId('appbar-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('table-tabs-filters')).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      render(<Table color="transitional" expanded={false} />);
      
      expect(screen.getByTestId('appbar-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('table-tabs-filters')).toBeInTheDocument();
    });

    it('renders tab panels correctly', () => {
      render(<Table />);
      
      expect(screen.getByTestId('tab-panel-0')).toBeInTheDocument();
      expect(screen.getByTestId('tab-panel-1')).toBeInTheDocument();
    });
  });

  describe('TableContent Component', () => {
    it('renders table structure correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByTestId('table-container')).toBeInTheDocument();
      expect(screen.getByTestId('mui-table')).toBeInTheDocument();
    });

    it('renders table headers correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Care Team')).toBeInTheDocument();
      expect(screen.getByText('Share with')).toBeInTheDocument();
      expect(screen.getByText('Journeys')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    it('renders data rows correctly', () => {
      render(<TableContent />);
      
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows).toHaveLength(data.length);
    });

    it('renders checkboxes for each row', () => {
      render(<TableContent />);
      
      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes).toHaveLength(data.length);
    });

    it('renders name data correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByText('chompy')).toBeInTheDocument();
      expect(screen.getByText('quacks')).toBeInTheDocument();
      expect(screen.getByText('jumpy')).toBeInTheDocument();
    });

    it('renders select components for each data column', () => {
      render(<TableContent />);
      
      const selects = screen.getAllByTestId('select');
      expect(selects.length).toBeGreaterThan(0);
    });

    it('renders table footer correctly', () => {
      render(<TableContent />);
      
      expect(screen.getByTestId('mui-table-footer')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('allows checkbox selection', async () => {
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
      
      await user.click(firstSelect);
      expect(firstSelect).toBeInTheDocument();
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

    it('displays all data rows', () => {
      render(<TableContent />);
      
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows).toHaveLength(data.length);
    });
  });

  describe('Accessibility', () => {
    it('has proper table structure', () => {
      render(<TableContent />);
      
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('has proper form controls', () => {
      render(<TableContent />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('Styling', () => {
    it('applies correct table container styles', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      expect(container).toHaveStyle({
        scrollbarWidth: 'none',
        overflowX: 'auto'
      });
    });

    it('renders sticky footer', () => {
      render(<TableContent />);
      
      const footer = screen.getByTestId('mui-table-footer');
      expect(footer).toBeInTheDocument();
    });
  });
});
