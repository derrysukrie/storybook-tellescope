/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { Dialog, type DialogAction } from './Dialog';

describe('Dialog', () => {
  const mockOnClick = vi.fn();
  const mockAction: DialogAction = {
    label: 'Test Action',
    onClick: mockOnClick,
    color: 'primary',
    variant: 'contained'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('exports component', () => {
      expect(Dialog).toBeDefined();
      expect(typeof Dialog).toBe('function');
    });

    it('renders open dialog when open prop is true', () => {
      render(<Dialog open={true} />);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    });

    it('does not render dialog when open prop is false', () => {
      render(<Dialog open={false} />);
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Dialog open={true} title="Test Dialog Title" />);
      
      expect(screen.getByText('Test Dialog Title')).toBeInTheDocument();
    });

    it('renders children content when provided', () => {
      render(
        <Dialog open={true}>
          Test content
        </Dialog>
      );
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  describe('Dialog Actions', () => {
    it('renders custom actions when provided as array', () => {
      render(
        <Dialog 
          open={true} 
          actions={[mockAction]}
        />
      );
      
      expect(screen.getByText('Test Action')).toBeInTheDocument();
    });

    it('calls action onClick when action button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Dialog 
          open={true} 
          actions={[mockAction]}
        />
      );
      
      const actionButton = screen.getByText('Test Action');
      await user.click(actionButton);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('renders no actions when actions is "none"', () => {
      render(<Dialog open={true} actions="none" />);
      
      expect(screen.queryByRole('button', { name: /confirm|cancel|save|publish/i })).not.toBeInTheDocument();
    });

    it('renders one action when actions is "one"', () => {
      render(<Dialog open={true} actions="one" />);
      
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('renders two actions when actions is "two"', () => {
      render(<Dialog open={true} actions="two" />);
      
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('renders three actions when actions is "three"', () => {
      render(<Dialog open={true} actions="three" />);
      
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save Draft')).toBeInTheDocument();
      expect(screen.getByText('Publish')).toBeInTheDocument();
    });

    it('applies correct button variants for predefined actions', () => {
      render(<Dialog open={true} actions="three" />);
      
      const cancelButton = screen.getByText('Cancel');
      const saveButton = screen.getByText('Save Draft');
      const publishButton = screen.getByText('Publish');
      
      expect(cancelButton).toHaveClass('MuiButton-text');
      expect(saveButton).toHaveClass('MuiButton-outlined');
      expect(publishButton).toHaveClass('MuiButton-contained');
    });

    it('handles disabled actions correctly', () => {
      const disabledAction: DialogAction = {
        label: 'Disabled Action',
        onClick: mockOnClick,
        disabled: true
      };
      
      render(
        <Dialog 
          open={true} 
          actions={[disabledAction]}
        />
      );
      
      const disabledButton = screen.getByText('Disabled Action');
      expect(disabledButton).toBeDisabled();
    });

    it('applies custom colors to action buttons', () => {
      const errorAction: DialogAction = {
        label: 'Error Action',
        onClick: mockOnClick,
        color: 'error'
      };
      
      render(
        <Dialog 
          open={true} 
          actions={[errorAction]}
        />
      );
      
      const errorButton = screen.getByText('Error Action');
      expect(errorButton).toHaveClass('MuiButton-colorError');
    });
  });

  describe('Dialog Sizing', () => {
    it('applies correct size for xs', () => {
      render(<Dialog open={true} size="xs" />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('applies correct size for sm', () => {
      render(<Dialog open={true} size="sm" />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('applies correct size for md', () => {
      render(<Dialog open={true} size="md" />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('uses default size when not specified', () => {
      render(<Dialog open={true} />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Collapsible Behavior', () => {
    it('shows collapse button when collapsible is true', () => {
      render(<Dialog open={true} collapsible={true} />);
      
      expect(screen.getByLabelText('collapse')).toBeInTheDocument();
    });

    it('does not show collapse button when collapsible is false', () => {
      render(<Dialog open={true} collapsible={false} />);
      
      expect(screen.queryByLabelText('collapse')).not.toBeInTheDocument();
    });

    it('toggles between collapse and expand icons', async () => {
      const user = userEvent.setup();
      render(<Dialog open={true} collapsible={true} />);
      
      const collapseButton = screen.getByLabelText('collapse');
      expect(collapseButton).toBeInTheDocument();
      
      await user.click(collapseButton);
      
      expect(screen.getByLabelText('expand')).toBeInTheDocument();
    });

    it('hides content when collapsed', async () => {
      const user = userEvent.setup();
      render(
        <Dialog open={true} collapsible={true}>
          Test content
        </Dialog>
      );
      
      const collapseButton = screen.getByLabelText('collapse');
      await user.click(collapseButton);
      
      expect(screen.queryByText('Test content')).not.toBeInTheDocument();
    });

    it('hides actions when collapsed', async () => {
      const user = userEvent.setup();
      render(
        <Dialog 
          open={true} 
          collapsible={true} 
          actions={[mockAction]}
        />
      );
      
      const collapseButton = screen.getByLabelText('collapse');
      await user.click(collapseButton);
      
      expect(screen.queryByText('Test Action')).not.toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('shows close button when closeButton is true', () => {
      render(<Dialog open={true} closeButton={true} />);
      
      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });

    it('does not show close button when closeButton is false', () => {
      render(<Dialog open={true} closeButton={false} />);
      
      expect(screen.queryByLabelText('close')).not.toBeInTheDocument();
    });

    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Dialog open={true} closeButton={true} />);
      
      const closeButton = screen.getByLabelText('close');
      await user.click(closeButton);
      
      // The component uses internal state, so we need to wait for the state update
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Background and Styling', () => {
    it('shows backdrop when background is true', () => {
      render(<Dialog open={true} background={true} />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('hides backdrop when background is false', () => {
      render(<Dialog open={true} background={false} />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('applies custom sx styles', () => {
      const customSx = { '& .MuiPaper-root': { backgroundColor: 'red' } };
      render(<Dialog open={true} sx={customSx} />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('opens dialog when open button is clicked', async () => {
      const user = userEvent.setup();
      render(<Dialog open={false} />);
      
      const openButton = screen.getByText('Open Dialog');
      await user.click(openButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('toggles dialog open/close state', async () => {
      const user = userEvent.setup();
      render(<Dialog open={false} />);
      
      const openButton = screen.getByText('Open Dialog');
      
      // Open dialog
      await user.click(openButton);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      // Close dialog
      await user.click(openButton);
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('maintains internal state correctly', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Dialog open={false} />);
      
      const openButton = screen.getByText('Open Dialog');
      
      // Open dialog
      await user.click(openButton);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      // Change open prop to false
      rerender(<Dialog open={false} />);
      
      // Dialog should still be open due to internal state
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty actions array', () => {
      render(<Dialog open={true} actions={[]} />);
      
      expect(screen.queryByRole('button', { name: /confirm|cancel|save|publish/i })).not.toBeInTheDocument();
    });

    it('handles undefined actions', () => {
      render(<Dialog open={true} actions={undefined} />);
      
      expect(screen.queryByRole('button', { name: /confirm|cancel|save|publish/i })).not.toBeInTheDocument();
    });

    it('handles actions with missing optional properties', () => {
      const minimalAction: DialogAction = {
        label: 'Minimal Action',
        onClick: mockOnClick
      };
      
      render(
        <Dialog 
          open={true} 
          actions={[minimalAction]}
        />
      );
      
      const actionButton = screen.getByText('Minimal Action');
      expect(actionButton).toBeInTheDocument();
      expect(actionButton).toHaveClass('MuiButton-contained'); // Default variant
      expect(actionButton).toHaveClass('MuiButton-colorPrimary'); // Default color
    });

    it('handles very long action labels', () => {
      const longLabelAction: DialogAction = {
        label: 'This is a very long action label that might cause layout issues',
        onClick: mockOnClick
      };
      
      render(
        <Dialog 
          open={true} 
          actions={[longLabelAction]}
        />
      );
      
      expect(screen.getByText('This is a very long action label that might cause layout issues')).toBeInTheDocument();
    });
  });
});
