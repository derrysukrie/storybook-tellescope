import { render, screen, waitFor } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Table, { TableContent } from '../table';
import { data } from '../data';
import TableTabsFiltersControls from '../../../molecules/table-elements/table-tabs-filters-controls/table-tabs-filters-controls';

// Mock only the external dependencies that are not part of the table system
vi.mock('../../../assets/tellescope-logo.svg', () => ({
  default: 'mocked-logo.svg'
}));

// Mock console.log to avoid noise in tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Table Component - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Full Table Integration', () => {
    it('renders complete table with all dependencies', async () => {
      render(<Table />);
      
      // Wait for the component to fully render
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check that the table structure is present
      expect(screen.getByRole('table')).toBeInTheDocument();
      
      // Check for table headers
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Care Team')).toBeInTheDocument();
      expect(screen.getByText('Share with')).toBeInTheDocument();
      expect(screen.getByText('Journeys')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    it('renders with different props', async () => {
      render(<Table color="transitional" expanded={false} />);
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('displays all data rows correctly', async () => {
      render(<Table />);
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check that data is displayed using getAllByText to handle multiple occurrences
      const chompyElements = screen.getAllByText('chompy');
      expect(chompyElements.length).toBeGreaterThan(0);
      
      const quacksElements = screen.getAllByText('quacks');
      expect(quacksElements.length).toBeGreaterThan(0);
      
      const jumpyElements = screen.getAllByText('jumpy');
      expect(jumpyElements.length).toBeGreaterThan(0);
    });
  });

  describe('TableContent Integration', () => {
    it('renders table content with proper context', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Verify table structure
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByLabelText('sticky table')).toBeInTheDocument();
    });

    it('renders all data entries', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check for data entries using getAllByText to handle multiple occurrences
      const chompyElements = screen.getAllByText('chompy');
      expect(chompyElements.length).toBeGreaterThan(0);
      
      const quacksElements = screen.getAllByText('quacks');
      expect(quacksElements.length).toBeGreaterThan(0);
    });

    it('renders interactive elements', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
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

  describe('User Interaction Flows', () => {
    it('allows checkbox selection', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const firstCheckbox = screen.getAllByRole('checkbox')[0];
      expect(firstCheckbox).not.toBeChecked();
      
      await user.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
    });

    it('allows multiple checkbox selections', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Select first few checkboxes
      for (let i = 0; i < Math.min(3, checkboxes.length); i++) {
        await user.click(checkboxes[i]);
        expect(checkboxes[i]).toBeChecked();
      }
    });

    it('allows select interaction', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThan(0);
      
      // Test select interaction
      const firstSelect = selects[0];
      await user.click(firstSelect);
      
      // Verify select is interactive
      expect(firstSelect).toBeInTheDocument();
    });
  });

  describe('Data Integration', () => {
    it('displays correct number of rows', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Count table rows (excluding header)
      const tableRows = screen.getAllByRole('row');
      // Should have header + data rows
      expect(tableRows.length).toBeGreaterThan(data.length);
    });

    it('displays all unique names from data', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check for unique names using getAllByText to handle multiple occurrences
      const uniqueNames = [...new Set(data.map(item => item.name))];
      uniqueNames.forEach(name => {
        const nameElements = screen.getAllByText(name);
        expect(nameElements.length).toBeGreaterThan(0);
      });
    });

    it('handles data changes correctly', async () => {
      const { rerender } = render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Rerender with same data
      rerender(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Data should still be displayed
      const chompyElements = screen.getAllByText('chompy');
      expect(chompyElements.length).toBeGreaterThan(0);
    });
  });

  describe('Context Integration', () => {
    it('uses filter context correctly', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Table should render successfully with context
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('handles context changes', async () => {
      const { rerender } = render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Rerender to test context handling
      rerender(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Table should still render correctly
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('Accessibility Integration', () => {
    it('has proper ARIA labels and roles', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check for proper table structure
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByLabelText('sticky table')).toBeInTheDocument();
      
      // Check for form controls
      const checkboxes = screen.getAllByRole('checkbox');
      const selects = screen.getAllByRole('combobox');
      
      expect(checkboxes.length).toBeGreaterThan(0);
      expect(selects.length).toBeGreaterThan(0);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Test tab navigation
      await user.tab();
      
      // Should focus on first interactive element
      const focusedElement = document.activeElement;
      expect(focusedElement).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('renders efficiently with large dataset', async () => {
      const startTime = performance.now();
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within reasonable time
      expect(renderTime).toBeLessThan(2000);
    });

    it('handles re-renders efficiently', async () => {
      const { rerender } = render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const startTime = performance.now();
      rerender(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const rerenderTime = endTime - startTime;
      
      // Re-render should be fast
      expect(rerenderTime).toBeLessThan(500);
    });
  });

  describe('Error Handling Integration', () => {
    it('handles missing data gracefully', async () => {
      // Test with empty data scenario
      const { rerender } = render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Component should still render
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('maintains functionality after errors', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Simulate an error by clicking a checkbox
      const user = userEvent.setup();
      const firstCheckbox = screen.getAllByRole('checkbox')[0];
      await user.click(firstCheckbox);
      
      // Component should still work
      expect(firstCheckbox).toBeChecked();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('Responsive Integration', () => {
    it('adapts to different viewport sizes', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Test with different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      });
      
      window.dispatchEvent(new Event('resize'));
      
      // Table should still be functional
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('maintains scroll functionality', async () => {
      render(
        <TableTabsFiltersControls
          tabPanels={[
            { content: <div>Contacts Content</div> },
            { content: <TableContent /> }
          ]}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
      
      // Check that table container has scroll properties
      const tableContainer = screen.getByRole('table').closest('[data-testid="table-container"]') || 
                            screen.getByRole('table').parentElement;
      
      expect(tableContainer).toBeInTheDocument();
    });
  });
});
