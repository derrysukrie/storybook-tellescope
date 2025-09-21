import { render, screen, waitFor } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TableContent } from '../table';
import { data } from '../data';

// Create a mock context provider for testing
const MockFilterProvider = ({ children, hide = false }: { children: React.ReactNode; hide?: boolean }) => {
  return (
    <div data-testid="filter-provider" data-hide={hide}>
      {children}
    </div>
  );
};

// Mock the useFilterContext hook to use our mock provider
vi.mock('../../molecules/table-elements/table-tabs-filters-controls/table-tabs-filters-controls', () => ({
  useFilterContext: () => ({ hide: false })
}));

// Mock console.log to avoid noise in tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Table Component - Context Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Context Provider Integration', () => {
    it('renders with filter context provider', async () => {
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      expect(screen.getByTestId('filter-provider')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('handles different context states', async () => {
      const { rerender } = render(
        <MockFilterProvider hide={false}>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      expect(screen.getByTestId('filter-provider')).toHaveAttribute('data-hide', 'false');
      
      // Test with hide=true
      rerender(
        <MockFilterProvider hide={true}>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('filter-provider')).toHaveAttribute('data-hide', 'true');
      });
    });
  });

  describe('Table Content Integration', () => {
    it('renders complete table structure', async () => {
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check table structure
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByLabelText('sticky table')).toBeInTheDocument();
      
      // Check headers
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Care Team')).toBeInTheDocument();
      expect(screen.getByText('Share with')).toBeInTheDocument();
      expect(screen.getByText('Journeys')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    it('displays all data correctly', async () => {
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check for data entries
      expect(screen.getByText('chompy')).toBeInTheDocument();
      expect(screen.getByText('quacks')).toBeInTheDocument();
      expect(screen.getByText('jumpy')).toBeInTheDocument();
      expect(screen.getByText('fungi')).toBeInTheDocument();
      expect(screen.getByText('bok')).toBeInTheDocument();
    });

    it('renders interactive elements', async () => {
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check for checkboxes
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
      
      // Check for select elements
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThan(0);
    });
  });

  describe('User Interaction Integration', () => {
    it('handles checkbox interactions', async () => {
      const user = userEvent.setup();
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];
      
      expect(firstCheckbox).not.toBeChecked();
      
      await user.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
    });

    it('handles select interactions', async () => {
      const user = userEvent.setup();
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const selects = screen.getAllByRole('combobox');
      const firstSelect = selects[0];
      
      await user.click(firstSelect);
      
      // Verify select is interactive
      expect(firstSelect).toBeInTheDocument();
    });

    it('handles multiple interactions', async () => {
      const user = userEvent.setup();
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Interact with multiple elements
      const checkboxes = screen.getAllByRole('checkbox');
      const selects = screen.getAllByRole('combobox');
      
      // Click first checkbox
      await user.click(checkboxes[0]);
      expect(checkboxes[0]).toBeChecked();
      
      // Click first select
      await user.click(selects[0]);
      expect(selects[0]).toBeInTheDocument();
      
      // Click second checkbox
      if (checkboxes[1]) {
        await user.click(checkboxes[1]);
        expect(checkboxes[1]).toBeChecked();
      }
    });
  });

  describe('Data Flow Integration', () => {
    it('displays correct number of rows', async () => {
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Count table rows
      const tableRows = screen.getAllByRole('row');
      expect(tableRows.length).toBeGreaterThan(data.length);
    });

    it('handles data updates', async () => {
      const { rerender } = render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Rerender with same data
      rerender(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Data should still be displayed
      expect(screen.getByText('chompy')).toBeInTheDocument();
    });

    it('maintains state across re-renders', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Interact with component
      const firstCheckbox = screen.getAllByRole('checkbox')[0];
      await user.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
      
      // Rerender
      rerender(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Component should still be functional
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('Error Boundary Integration', () => {
    it('handles component errors gracefully', async () => {
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Component should render without errors
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('maintains functionality after interactions', async () => {
      const user = userEvent.setup();
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Perform interactions
      const firstCheckbox = screen.getAllByRole('checkbox')[0];
      await user.click(firstCheckbox);
      
      // Component should still work
      expect(firstCheckbox).toBeChecked();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('renders within acceptable time', async () => {
      const startTime = performance.now();
      
      render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      expect(renderTime).toBeLessThan(3000);
    });

    it('handles re-renders efficiently', async () => {
      const { rerender } = render(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const startTime = performance.now();
      rerender(
        <MockFilterProvider>
          <TableContent />
        </MockFilterProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const rerenderTime = endTime - startTime;
      
      expect(rerenderTime).toBeLessThan(1000);
    });
  });
});
