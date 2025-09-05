/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup, type CheckboxGroupProps } from './CheckboxGroup';

describe('CheckboxGroup', () => {
  const options: CheckboxGroupProps['options'] = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];

  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  describe('Component rendering', () => {
    it('renders without crashing', () => {
      render(<CheckboxGroup options={options} onChange={onChange} />);
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
    });

    it('renders all options as checkboxes', () => {
      render(<CheckboxGroup options={options} onChange={onChange} />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).toBeInTheDocument();
    });

    it('renders with label when provided', () => {
      render(<CheckboxGroup label="Select Options" options={options} onChange={onChange} />);
      
      expect(screen.getByText('Select Options')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(
        <CheckboxGroup 
          options={options} 
          onChange={onChange} 
          helperText="Please select at least one option"
        />
      );
      
      expect(screen.getByText('Please select at least one option')).toBeInTheDocument();
    });

    it('does not render helper text when not provided', () => {
      render(<CheckboxGroup options={options} onChange={onChange} />);
      
      expect(screen.queryByText('Please select at least one option')).not.toBeInTheDocument();
    });
  });

  describe('Default and value handling', () => {
    it('has no checked boxes by default when value is not provided', () => {
      render(<CheckboxGroup options={options} onChange={onChange} />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).not.toBeChecked();
    });

    it('has no checked boxes when value is empty array', () => {
      render(<CheckboxGroup options={options} value={[]} onChange={onChange} />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).not.toBeChecked();
    });

    it('checks boxes based on provided value array', () => {
      render(<CheckboxGroup options={options} value={['a', 'c']} onChange={onChange} />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).toBeChecked();
    });

    it('handles single selected value', () => {
      render(<CheckboxGroup options={options} value={['b']} onChange={onChange} />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).not.toBeChecked();
    });
  });

  describe('Selection behavior', () => {
    it('adds value when unchecked option is clicked', async () => {
      const user = userEvent.setup();
      render(<CheckboxGroup options={options} value={[]} onChange={onChange} />);
      
      await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
      
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['a']);
    });

    it('removes value when checked option is clicked', async () => {
      const user = userEvent.setup();
      render(<CheckboxGroup options={options} value={['a', 'b']} onChange={onChange} />);
      
      await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
      
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['b']);
    });

    it('handles multiple sequential selections', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<CheckboxGroup options={options} value={['a']} onChange={onChange} />);

      // Add Option B
      await user.click(screen.getByRole('checkbox', { name: 'Option B' }));
      expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
      let latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<CheckboxGroup options={options} value={latest} onChange={onChange} />);

      // Add Option C
      await user.click(screen.getByRole('checkbox', { name: 'Option C' }));
      expect(onChange).toHaveBeenLastCalledWith(['a', 'b', 'c']);
    });

    it('handles removing from multiple selections', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<CheckboxGroup options={options} value={['a', 'b', 'c']} onChange={onChange} />);

      // Remove Option B
      await user.click(screen.getByRole('checkbox', { name: 'Option B' }));
      expect(onChange).toHaveBeenLastCalledWith(['a', 'c']);
      let latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<CheckboxGroup options={options} value={latest} onChange={onChange} />);

      // Remove Option A
      await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
      expect(onChange).toHaveBeenLastCalledWith(['c']);
    });
  });

  describe('Disabled state', () => {
    it('disables all checkboxes when disabled prop is true', () => {
      render(<CheckboxGroup options={options} onChange={onChange} disabled />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).toBeDisabled();
    });

    it('does not call onChange when disabled checkbox is clicked', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      render(<CheckboxGroup options={options} value={[]} onChange={onChange} disabled />);

      await user.click(screen.getByRole('checkbox', { name: 'Option A' }));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('enables checkboxes when disabled prop is false', () => {
      render(<CheckboxGroup options={options} onChange={onChange} disabled={false} />);
      
      expect(screen.getByRole('checkbox', { name: 'Option A' })).not.toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).not.toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).not.toBeDisabled();
    });
  });

  describe('Row layout', () => {
    it('passes row prop to FormGroup', () => {
      render(<CheckboxGroup options={options} onChange={onChange} row />);
      
      // The row prop affects the FormGroup layout, but we can't easily test the CSS
      // We just ensure the component renders without errors when row is true
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
    });

    it('renders in column layout by default', () => {
      render(<CheckboxGroup options={options} onChange={onChange} />);
      
      // Default behavior (row=false) should work
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
    });
  });

  describe('Label size', () => {
    it('renders with default label size', () => {
      render(<CheckboxGroup label="Test Label" options={options} onChange={onChange} />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with large label size', () => {
      render(<CheckboxGroup label="Test Label" labelSize="large" options={options} onChange={onChange} />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates labels with checkboxes for screen readers', () => {
      render(<CheckboxGroup options={options} onChange={onChange} />);
      
      // Each checkbox should be accessible by its label
      expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Option C' })).toBeInTheDocument();
    });

    it('allows clicking on labels to toggle checkboxes', async () => {
      const user = userEvent.setup();
      render(<CheckboxGroup options={options} value={[]} onChange={onChange} />);
      
      // Click on the label text should toggle the checkbox
      await user.click(screen.getByText('Option A'));
      
      expect(onChange).toHaveBeenCalledWith(['a']);
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<CheckboxGroup options={[]} onChange={onChange} />);
      
      // Should render without crashing, no checkboxes should be present
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });

    it('handles options with duplicate labels but different values', async () => {
      const duplicateOptions = [
        { label: 'Same Label', value: 'value1' },
        { label: 'Same Label', value: 'value2' },
      ];
      
      const user = userEvent.setup();
      const { rerender } = render(<CheckboxGroup options={duplicateOptions} value={[]} onChange={onChange} />);
      
      const checkboxes = screen.getAllByRole('checkbox', { name: 'Same Label' });
      expect(checkboxes).toHaveLength(2);
      
      // Click first checkbox
      await user.click(checkboxes[0]);
      expect(onChange).toHaveBeenCalledWith(['value1']);
      let latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<CheckboxGroup options={duplicateOptions} value={latest} onChange={onChange} />);
      
      // Click second checkbox
      await user.click(checkboxes[1]);
      expect(onChange).toHaveBeenCalledWith(['value1', 'value2']);
    });

    it('handles rapid clicking on same checkbox', async () => {
      const user = userEvent.setup();
      render(<CheckboxGroup options={options} value={[]} onChange={onChange} />);
      
      const checkbox = screen.getByRole('checkbox', { name: 'Option A' });
      
      // Rapid clicks
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);
      
      // Should only be called once (first click adds, subsequent clicks remove and add)
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(['a']);
    });
  });
});
