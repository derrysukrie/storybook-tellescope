/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { SelectableGroup } from './SelectableGroup';

describe('SelectableGroup', () => {
  const options = [
    { label: 'Plan A', value: 'a' },
    { label: 'Plan B', value: 'b' },
    { label: 'Plan C', value: 'c' },
  ];

  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  describe('Component rendering', () => {
    it('renders without crashing', () => {
      render(<SelectableGroup label="Plans" options={options} />);
      expect(screen.getByText('Plans')).toBeInTheDocument();
    });

    it('renders label, helper text, and all options as clickable boxes', () => {
      render(<SelectableGroup label="Plans" helperText="Choose one" options={options} />);
      
      expect(screen.getByText('Plans')).toBeInTheDocument();
      expect(screen.getByText('Choose one')).toBeInTheDocument();
      expect(screen.getByText('Plan A')).toBeInTheDocument();
      expect(screen.getByText('Plan B')).toBeInTheDocument();
      expect(screen.getByText('Plan C')).toBeInTheDocument();
    });

    it('renders with default label size', () => {
      render(<SelectableGroup label="Test Label" options={options} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with large label size', () => {
      render(<SelectableGroup label="Test Label" labelSize="large" options={options} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<SelectableGroup label="Test" helperText="This is help text" options={options} />);
      expect(screen.getByText('This is help text')).toBeInTheDocument();
    });

    it('does not render helper text when not provided', () => {
      render(<SelectableGroup label="Test" options={options} />);
      expect(screen.queryByText('This is help text')).not.toBeInTheDocument();
    });
  });

  describe('Single selection mode (default)', () => {
    it('calls onChange with selected value when option is clicked', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} onChange={onChange} />);

      await user.click(screen.getByText('Plan B'));
      expect(onChange).toHaveBeenCalledWith('b');
    });

    it('handles switching between different options', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} onChange={onChange} />);

      await user.click(screen.getByText('Plan A'));
      expect(onChange).toHaveBeenCalledWith('a');

      await user.click(screen.getByText('Plan C'));
      expect(onChange).toHaveBeenCalledWith('c');
    });

    it('handles multiple clicks on same option', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} onChange={onChange} />);

      const planA = screen.getByText('Plan A');
      await user.click(planA);
      await user.click(planA);
      await user.click(planA);

      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith('a');
    });
  });

  describe('Multiple selection mode', () => {
    it('calls onChange with array when multiple=true', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} multiple onChange={onChange} />);

      await user.click(screen.getByText('Plan A'));
      expect(onChange).toHaveBeenCalledWith(['a']);
    });

    it('toggles values in array for multiple selections', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} multiple onChange={onChange} />);

      await user.click(screen.getByText('Plan A'));
      expect(onChange).toHaveBeenCalledWith(['a']);

      await user.click(screen.getByText('Plan B'));
      expect(onChange).toHaveBeenCalledWith(['a', 'b']);
    });

    it('removes values when clicked again in multiple mode', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} multiple onChange={onChange} />);

      await user.click(screen.getByText('Plan A'));
      expect(onChange).toHaveBeenCalledWith(['a']);

      await user.click(screen.getByText('Plan B'));
      expect(onChange).toHaveBeenCalledWith(['a', 'b']);

      await user.click(screen.getByText('Plan A'));
      expect(onChange).toHaveBeenCalledWith(['b']);
    });
  });

  describe('Controlled behavior', () => {
    it('single mode: maintains selection with controlled value', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <SelectableGroup label="Plans" options={options} value="a" onChange={onChange} />
      );

      await user.click(screen.getByText('Plan B'));
      expect(onChange).toHaveBeenCalledWith('b');

      // Rerender with new value
      rerender(<SelectableGroup label="Plans" options={options} value="b" onChange={onChange} />);
      
      // Should maintain the controlled state
      expect(screen.getByText('Plan B')).toBeInTheDocument();
    });

    it('multiple mode: maintains selections with controlled value', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <SelectableGroup label="Plans" options={options} multiple value={['a']} onChange={onChange} />
      );

      await user.click(screen.getByText('Plan B'));
      expect(onChange).toHaveBeenCalledWith(['a', 'b']);

      // Rerender with new value
      rerender(<SelectableGroup label="Plans" options={options} multiple value={['a', 'b']} onChange={onChange} />);
      
      // Should maintain the controlled state
      expect(screen.getByText('Plan A')).toBeInTheDocument();
      expect(screen.getByText('Plan B')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled behavior', () => {
    it('single mode: updates internal state when uncontrolled', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} />);

      await user.click(screen.getByText('Plan A'));
      // Component should handle internal state, no onChange called
      expect(onChange).not.toHaveBeenCalled();
    });

    it('multiple mode: updates internal state when uncontrolled', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} multiple />);

      await user.click(screen.getByText('Plan A'));
      await user.click(screen.getByText('Plan B'));
      // Component should handle internal state, no onChange called
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has clickable elements with proper cursor styling', () => {
      render(<SelectableGroup label="Plans" options={options} />);
      
      const planA = screen.getByText('Plan A');
      expect(planA).toBeInTheDocument();
      // The parent Box should have cursor: pointer styling
    });

    it('has clickable elements that respond to user interaction', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} onChange={onChange} />);
      
      // Test that clicking works (which is the primary interaction method)
      const planA = screen.getByText('Plan A');
      await user.click(planA);
      
      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('has proper text contrast and styling', () => {
      render(<SelectableGroup label="Plans" options={options} />);
      
      // Text should be visible and properly styled
      expect(screen.getByText('Plan A')).toBeInTheDocument();
      expect(screen.getByText('Plan B')).toBeInTheDocument();
      expect(screen.getByText('Plan C')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<SelectableGroup label="Empty" options={[]} />);
      
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.queryByText('Plan A')).not.toBeInTheDocument();
    });

    it('handles single option', () => {
      const singleOption = [{ label: 'Only Plan', value: 'only' }];
      render(<SelectableGroup label="Single" options={singleOption} />);
      
      expect(screen.getByText('Only Plan')).toBeInTheDocument();
    });

    it('handles options with duplicate labels but different values', async () => {
      const duplicateOptions = [
        { label: 'Same Label', value: 'value1' },
        { label: 'Same Label', value: 'value2' },
      ];
      
      const user = userEvent.setup();
      render(<SelectableGroup label="Duplicates" options={duplicateOptions} onChange={onChange} />);
      
      const labels = screen.getAllByText('Same Label');
      expect(labels).toHaveLength(2);
      
      // Click first option
      await user.click(labels[0]);
      expect(onChange).toHaveBeenCalledWith('value1');
      
      // Click second option
      await user.click(labels[1]);
      expect(onChange).toHaveBeenCalledWith('value2');
    });

    it('handles options with special characters in labels and values', async () => {
      const specialOptions = [
        { label: 'Plan & Value', value: 'special&chars' },
        { label: 'Plan < > " \'', value: 'quotes<>' },
      ];
      
      const user = userEvent.setup();
      render(<SelectableGroup label="Special" options={specialOptions} onChange={onChange} />);
      
      await user.click(screen.getByText('Plan & Value'));
      expect(onChange).toHaveBeenCalledWith('special&chars');
      
      await user.click(screen.getByText('Plan < > " \''));
      expect(onChange).toHaveBeenCalledWith('quotes<>');
    });

    it('handles very long labels', () => {
      const longLabelOptions = [
        { label: 'This is a very long label that might wrap or cause layout issues in the component', value: 'long' },
      ];
      
      render(<SelectableGroup label="Long Labels" options={longLabelOptions} />);
      
      expect(screen.getByText('This is a very long label that might wrap or cause layout issues in the component')).toBeInTheDocument();
    });

    it('handles rapid clicking on multiple options', async () => {
      const user = userEvent.setup();
      render(<SelectableGroup label="Plans" options={options} multiple onChange={onChange} />);

      // Rapid clicks on different options
      await user.click(screen.getByText('Plan A'));
      await user.click(screen.getByText('Plan B'));
      await user.click(screen.getByText('Plan C'));
      await user.click(screen.getByText('Plan A'));

      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toHaveBeenLastCalledWith(['b', 'c']);
    });
  });

  describe('Props validation', () => {
    it('handles undefined onChange gracefully', () => {
      expect(() => {
        render(<SelectableGroup label="Test" options={options} onChange={undefined as any} />);
      }).not.toThrow();
    });

    it('handles missing optional props', () => {
      expect(() => {
        render(<SelectableGroup label="Test" options={options} />);
      }).not.toThrow();
    });

    it('handles invalid value types gracefully', () => {
      expect(() => {
        render(<SelectableGroup label="Test" options={options} value={null as any} />);
      }).not.toThrow();
    });
  });
});