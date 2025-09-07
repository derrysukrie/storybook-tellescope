/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { SelectGroup } from './SelectGroup';

describe('SelectGroup', () => {
  const options = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ];

  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  describe('Component rendering', () => {
    it('renders without crashing', () => {
      render(<SelectGroup label="Select Items" options={options} />);
      expect(screen.getByText('Select Items')).toBeInTheDocument();
    });

    it('renders label, helper text, and all select dropdowns', () => {
      render(<SelectGroup label="Select Items" helperText="Choose options" options={options} />);
      
      expect(screen.getByText('Select Items')).toBeInTheDocument();
      expect(screen.getByText('Choose options')).toBeInTheDocument();
      
      // Each option gets its own select dropdown
      const selectComboboxes = screen.getAllByRole('combobox');
      expect(selectComboboxes).toHaveLength(options.length);
    });

    it('shows placeholder for each select', () => {
      render(<SelectGroup label="Select Items" options={options} />);
      // Each Select has a disabled placeholder option "Select an option"
      expect(screen.getAllByText('Select an option').length).toBe(options.length);
    });
  });

  describe('Controlled behavior', () => {
    it('calls onChange with updated record when a select changes', async () => {
      const user = userEvent.setup();
      const value = { alpha: '', beta: '', gamma: '' };
      render(<SelectGroup label="Select Items" options={options} value={value} onChange={onChange} />);

      // Open first select and choose Alpha
      const selectComboboxes = screen.getAllByRole('combobox');
      await user.click(selectComboboxes[0]);
      await user.click(screen.getByRole('option', { name: 'Alpha' }));

      expect(onChange).toHaveBeenCalledWith({ alpha: 'alpha', beta: '', gamma: '' });
    });

    it('handles multiple selections across different selects', async () => {
      const user = userEvent.setup();
      const value = { alpha: '', beta: '', gamma: '' };
      const { rerender } = render(<SelectGroup label="Select Items" options={options} value={value} onChange={onChange} />);

      // Select Alpha from first dropdown
      const selectComboboxes = screen.getAllByRole('combobox');
      await user.click(selectComboboxes[0]);
      await user.click(screen.getByRole('option', { name: 'Alpha' }));
      expect(onChange).toHaveBeenCalledWith({ alpha: 'alpha', beta: '', gamma: '' });

      // Rerender with updated value
      const newValue = { alpha: 'alpha', beta: '', gamma: '' };
      rerender(<SelectGroup label="Select Items" options={options} value={newValue} onChange={onChange} />);

      // Select Beta from second dropdown
      await user.click(selectComboboxes[1]);
      await user.click(screen.getByRole('option', { name: 'Beta' }));
      expect(onChange).toHaveBeenCalledWith({ alpha: 'alpha', beta: 'beta', gamma: '' });
    });
  });

  describe('Uncontrolled behavior', () => {
    it('updates internal state when uncontrolled', async () => {
      const user = userEvent.setup();
      render(<SelectGroup label="Select Items" options={options} />);

      const selectComboboxes = screen.getAllByRole('combobox');
      await user.click(selectComboboxes[0]);
      await user.click(screen.getByRole('option', { name: 'Alpha' }));

      // After selection, placeholder should no longer be visible for first select
      expect(screen.getAllByText('Select an option').length).toBe(options.length - 1);
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<SelectGroup label="Empty" options={[]} />);
      
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('handles single option', () => {
      const singleOption = [{ label: 'Only Option', value: 'only' }];
      render(<SelectGroup label="Single" options={singleOption} />);
      
      const selectComboboxes = screen.getAllByRole('combobox');
      expect(selectComboboxes).toHaveLength(1);
    });

    it('handles undefined onChange gracefully', () => {
      expect(() => {
        render(<SelectGroup label="Test" options={options} onChange={undefined as any} />);
      }).not.toThrow();
    });
  });
});