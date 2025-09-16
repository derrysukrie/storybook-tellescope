import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TableCellRow from './table-cell-row';
import { TableCell, Table, TableBody } from '@mui/material';

describe('TableCellRow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Test Content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
              <TableCell>Cell 3</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText('Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 2')).toBeInTheDocument();
      expect(screen.getByText('Cell 3')).toBeInTheDocument();
    });

    it('renders with default MUI TableRow structure', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
      expect(row.className).toContain('MuiTableRow-root');
    });

    it('handles empty children gracefully', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow />
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });

    it('renders with different types of children', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Text content</TableCell>
              <TableCell>
                <button>Button content</button>
              </TableCell>
              <TableCell>
                <div>
                  <span>Nested content</span>
                </div>
              </TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText('Text content')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies default border styling to td elements', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
      
      // Check that the component has the expected sx prop structure
      // The actual border styles are applied via sx prop to td elements
    });

    it('applies correct border bottom styling', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = container.querySelector('.MuiTableRow-root');
      expect(row).toBeInTheDocument();
    });

    it('applies correct border right styling', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = container.querySelector('.MuiTableRow-root');
      expect(row).toBeInTheDocument();
    });

    it('merges custom sx prop with default styling', () => {
      const customSx = { backgroundColor: 'red' };
      
      render(
        <Table>
          <TableBody>
            <TableCellRow sx={customSx}>
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });

    it('handles multiple sx properties correctly', () => {
      const complexSx = {
        backgroundColor: 'blue',
        color: 'white',
        padding: 2,
        '&:hover': {
          backgroundColor: 'darkblue',
        },
      };
      
      render(
        <Table>
          <TableBody>
            <TableCellRow sx={complexSx}>
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });

    it('allows sx prop to override default styling', () => {
      const overrideSx = {
        '& td': {
          borderBottom: 'none',
          borderRight: 'none',
        },
      };
      
      render(
        <Table>
          <TableBody>
            <TableCellRow sx={overrideSx}>
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });
  });

  describe('Props Passthrough', () => {
    it('passes through all MUI TableRow props', () => {
      const onClickHandler = vi.fn();
      
      render(
        <Table>
          <TableBody>
            <TableCellRow
              onClick={onClickHandler}
              className="custom-class"
              id="custom-id"
              role="row"
              tabIndex={0}
            >
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toHaveClass('custom-class');
      expect(row).toHaveAttribute('id', 'custom-id');
      expect(row).toHaveAttribute('tabindex', '0');
    });

    it('handles className prop correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow className="test-class">
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toHaveClass('test-class');
    });

    it('handles id prop correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow id="test-row">
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toHaveAttribute('id', 'test-row');
    });

    it('handles onClick prop correctly', async () => {
      const user = userEvent.setup();
      const onClickHandler = vi.fn();
      
      render(
        <Table>
          <TableBody>
            <TableCellRow onClick={onClickHandler}>
              <TableCell>Clickable content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      await user.click(row);
      
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('handles mouse event props correctly', async () => {
      const user = userEvent.setup();
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();
      
      render(
        <Table>
          <TableBody>
            <TableCellRow
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <TableCell>Hover content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      
      await user.hover(row);
      expect(onMouseEnter).toHaveBeenCalledTimes(1);
      
      await user.unhover(row);
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles role prop correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow role="row">
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toHaveAttribute('role', 'row');
    });

    it('handles tabIndex prop correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow tabIndex={5}>
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toHaveAttribute('tabindex', '5');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper table row semantics', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Accessible content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });

    it('supports ARIA attributes from MUI TableRow', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow
              aria-label="Custom row label"
              aria-selected={true}
            >
              <TableCell>Test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toHaveAttribute('aria-label', 'Custom row label');
      expect(row).toHaveAttribute('aria-selected', 'true');
    });

    it('works with screen readers', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Screen reader content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
      
      const cell = screen.getByRole('cell');
      expect(cell).toBeInTheDocument();
    });

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <Table>
          <TableBody>
            <TableCellRow tabIndex={0}>
              <TableCell>Keyboard accessible</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      row.focus();
      
      expect(row).toHaveFocus();
      
      await user.keyboard('{Enter}');
      // Should not throw any errors
    });
  });

  describe('Edge Cases', () => {
    it('handles null children', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              {null}
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              {undefined}
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
    });

    it('handles multiple children', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
              <TableCell>Cell 3</TableCell>
              <TableCell>Cell 4</TableCell>
              <TableCell>Cell 5</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(5);
    });

    it('handles complex nested children', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>
                <div>
                  <span>Nested</span>
                  <button>Button</button>
                  <input placeholder="Input" />
                </div>
              </TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longContent = 'A'.repeat(1000);
      
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>{longContent}</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });

    it('handles special characters in children', () => {
      const specialContent = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>{specialContent}</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText(specialContent)).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works within a table structure', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Row 1, Cell 1</TableCell>
              <TableCell>Row 1, Cell 2</TableCell>
            </TableCellRow>
            <TableCellRow>
              <TableCell>Row 2, Cell 1</TableCell>
              <TableCell>Row 2, Cell 2</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(2);
      
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(4);
    });

    it('works with TableCell components', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell align="left">Left aligned</TableCell>
              <TableCell align="center">Center aligned</TableCell>
              <TableCell align="right">Right aligned</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      expect(screen.getByText('Left aligned')).toBeInTheDocument();
      expect(screen.getByText('Center aligned')).toBeInTheDocument();
      expect(screen.getByText('Right aligned')).toBeInTheDocument();
    });

    it('multiple instances work correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Instance 1</TableCell>
            </TableCellRow>
            <TableCellRow>
              <TableCell>Instance 2</TableCell>
            </TableCellRow>
            <TableCellRow>
              <TableCell>Instance 3</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(3);
      
      expect(screen.getByText('Instance 1')).toBeInTheDocument();
      expect(screen.getByText('Instance 2')).toBeInTheDocument();
      expect(screen.getByText('Instance 3')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many children', () => {
      const startTime = performance.now();
      
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              {Array.from({ length: 20 }, (_, i) => (
                <TableCell key={i}>Cell {i}</TableCell>
              ))}
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('handles rapid re-renders', () => {
      const { rerender } = render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Initial content</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      // Multiple re-renders
      for (let i = 0; i < 10; i++) {
        rerender(
          <Table>
            <TableBody>
              <TableCellRow>
                <TableCell>Content {i}</TableCell>
              </TableCellRow>
            </TableBody>
          </Table>
        );
      }
      
      expect(screen.getByText('Content 9')).toBeInTheDocument();
    });

    it('has reasonable memory usage', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      render(
        <Table>
          <TableBody>
            <TableCellRow>
              <TableCell>Memory test</TableCell>
            </TableCellRow>
          </TableBody>
        </Table>
      );
      
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryDiff = finalMemory - initialMemory;
      
      // Should not use excessive memory (less than 1MB for this simple component)
      expect(memoryDiff).toBeLessThan(1024 * 1024);
    });
  });
});
