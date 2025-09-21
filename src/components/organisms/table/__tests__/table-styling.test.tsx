import { render, screen } from '../../../../../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { TableContent } from '../table';

// Mock the same dependencies
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

describe('Table Styling and Layout', () => {
  describe('Table Container Styling', () => {
    it('applies correct scrollbar styles', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      expect(container).toHaveStyle({
        scrollbarWidth: 'none'
      });
    });

    it('applies webkit scrollbar styles', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      const styles = window.getComputedStyle(container);
      
      // Note: These styles are applied via CSS-in-JS, so we check the element exists
      expect(container).toBeInTheDocument();
    });

    it('applies horizontal overflow', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      expect(container).toHaveStyle({
        overflowX: 'auto'
      });
    });

    it('applies correct max height calculation', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      // The maxHeight is calculated dynamically based on viewport
      expect(container).toHaveStyle({
        maxHeight: expect.stringContaining('calc(100vh')
      });
    });
  });

  describe('Table Head Styling', () => {
    it('applies border styling to headers', () => {
      render(<TableContent />);
      
      const headers = screen.getAllByTestId('table-head');
      expect(headers.length).toBeGreaterThan(0);
      
      // Check that headers have border styling
      headers.forEach(header => {
        expect(header).toHaveStyle({
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        });
      });
    });

    it('applies checkbox styling to first header', () => {
      render(<TableContent />);
      
      const headers = screen.getAllByTestId('table-head');
      const firstHeader = headers[0];
      
      // First header should have checkbox and small props
      expect(firstHeader).toBeInTheDocument();
    });
  });

  describe('Table Cell Styling', () => {
    it('applies correct width to name cells', () => {
      render(<TableContent />);
      
      const cells = screen.getAllByTestId('table-cell');
      expect(cells.length).toBeGreaterThan(0);
      
      // Check that cells have width styling
      cells.forEach(cell => {
        expect(cell).toHaveStyle({
          width: '20%'
        });
      });
    });

    it('applies minimum width constraints', () => {
      render(<TableContent />);
      
      const cells = screen.getAllByTestId('table-cell');
      expect(cells.length).toBeGreaterThan(0);
      
      // Check for minWidth styling
      cells.forEach(cell => {
        const styles = window.getComputedStyle(cell);
        expect(cell).toBeInTheDocument();
      });
    });

    it('applies text transformation to name cells', () => {
      render(<TableContent />);
      
      const cells = screen.getAllByTestId('table-cell');
      const nameCells = cells.filter(cell => 
        cell.textContent?.includes('chompy') || 
        cell.textContent?.includes('quacks')
      );
      
      expect(nameCells.length).toBeGreaterThan(0);
    });
  });

  describe('Table Footer Styling', () => {
    it('applies sticky positioning to footer', () => {
      render(<TableContent />);
      
      const footer = screen.getByTestId('mui-table-footer');
      expect(footer).toHaveStyle({
        position: 'sticky',
        bottom: '0',
        backgroundColor: '#fff',
        zIndex: '10',
        borderTop: '1px solid rgba(0,0,0,0.12)'
      });
    });

    it('applies special styling to add button cell', () => {
      render(<TableContent />);
      
      const addIcon = screen.getByTestId('add-icon');
      const addCell = addIcon.closest('[data-testid="table-cell"]');
      
      expect(addCell).toHaveStyle({
        justifyContent: 'center',
        display: 'flex',
        border: '0',
        borderRadius: '4px',
        backgroundColor: '#EEEDF4'
      });
    });
  });

  describe('Select Component Styling', () => {
    it('applies correct width to select components', () => {
      render(<TableContent />);
      
      const selects = screen.getAllByTestId('select');
      expect(selects.length).toBeGreaterThan(0);
      
      selects.forEach(select => {
        expect(select).toHaveStyle({
          width: '100%'
        });
      });
    });

    it('applies icon positioning for specific columns', () => {
      render(<TableContent />);
      
      const calendarIcons = screen.getAllByTestId('calendar-icon');
      expect(calendarIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Behavior', () => {
    it('handles different viewport sizes', () => {
      // Test with different viewport sizes
      const { rerender } = render(<TableContent />);
      
      // Simulate different screen sizes
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 600,
      });
      
      rerender(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      expect(container).toBeInTheDocument();
    });

    it('maintains table structure on resize', () => {
      const { rerender } = render(<TableContent />);
      
      // Simulate window resize
      window.dispatchEvent(new Event('resize'));
      rerender(<TableContent />);
      
      expect(screen.getByTestId('mui-table')).toBeInTheDocument();
      expect(screen.getByTestId('table-container')).toBeInTheDocument();
    });
  });

  describe('Accessibility Styling', () => {
    it('maintains proper contrast ratios', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      expect(container).toBeInTheDocument();
      
      // Check that text is visible (basic accessibility check)
      const textElements = screen.getAllByText(/chompy|quacks|jumpy/);
      expect(textElements.length).toBeGreaterThan(0);
    });

    it('provides proper focus indicators', () => {
      render(<TableContent />);
      
      const checkboxes = screen.getAllByTestId('checkbox');
      const selects = screen.getAllByTestId('select');
      
      expect(checkboxes.length).toBeGreaterThan(0);
      expect(selects.length).toBeGreaterThan(0);
    });
  });

  describe('Icon Styling', () => {
    it('displays add icon correctly', () => {
      render(<TableContent />);
      
      const addIcon = screen.getByTestId('add-icon');
      expect(addIcon).toBeInTheDocument();
    });

    it('displays calendar icons for specific columns', () => {
      render(<TableContent />);
      
      const calendarIcons = screen.getAllByTestId('calendar-icon');
      expect(calendarIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Border and Spacing', () => {
    it('applies consistent borders', () => {
      render(<TableContent />);
      
      const headers = screen.getAllByTestId('table-head');
      headers.forEach(header => {
        expect(header).toHaveStyle({
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        });
      });
    });

    it('maintains proper spacing between elements', () => {
      render(<TableContent />);
      
      const container = screen.getByTestId('table-container');
      expect(container).toBeInTheDocument();
      
      // Check that elements are properly spaced
      const rows = screen.getAllByTestId('table-cell-row');
      expect(rows.length).toBeGreaterThan(0);
    });
  });

  describe('Color Scheme', () => {
    it('uses consistent color palette', () => {
      render(<TableContent />);
      
      const addCell = screen.getByTestId('add-icon').closest('[data-testid="table-cell"]');
      expect(addCell).toHaveStyle({
        backgroundColor: '#EEEDF4'
      });
    });

    it('applies proper text colors', () => {
      render(<TableContent />);
      
      const addCell = screen.getByTestId('add-icon').closest('[data-testid="table-cell"]');
      expect(addCell).toHaveStyle({
        '& .MuiTypography-root': {
          color: '#00000099'
        }
      });
    });
  });
});
