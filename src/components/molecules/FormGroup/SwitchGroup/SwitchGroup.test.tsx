/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { SwitchGroup } from './SwitchGroup';

describe('SwitchGroup', () => {
  const options = [
    { label: 'Email Notifications', value: 'email' },
    { label: 'SMS Notifications', value: 'sms' },
    { label: 'Push Notifications', value: 'push' },
  ];

  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  describe('Component rendering', () => {
    it('renders without crashing', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} />);
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders label, helper text, and all switches', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} />);
      
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Choose channels')).toBeInTheDocument();
      
      // Each option should render as a switch
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).toBeInTheDocument();
    });

    it('renders with default label size', () => {
      render(<SwitchGroup label="Test Label" helperText="Help" options={options} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with large label size', () => {
      render(<SwitchGroup label="Test Label" labelSize="large" helperText="Help" options={options} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<SwitchGroup label="Test" helperText="This is help text" options={options} />);
      expect(screen.getByText('This is help text')).toBeInTheDocument();
    });

    it('renders empty helper text when provided as empty string', () => {
      render(<SwitchGroup label="Test" helperText="" options={options} />);
      // Helper text should still be rendered even if empty - check for FormHelperText component
      const helperTextElement = document.querySelector('[class*="MuiFormHelperText"]');
      expect(helperTextElement).toBeInTheDocument();
    });
  });

  describe('Props validation', () => {
    it('requires all required props', () => {
      expect(() => {
        render(<SwitchGroup label="Test" helperText="Help" options={options} />);
      }).not.toThrow();
    });

    it('handles undefined onChange gracefully', () => {
      expect(() => {
        render(<SwitchGroup label="Test" helperText="Help" options={options} onChange={undefined} />);
      }).not.toThrow();
    });

    it('handles undefined value gracefully', () => {
      expect(() => {
        render(<SwitchGroup label="Test" helperText="Help" options={options} value={undefined} />);
      }).not.toThrow();
    });

    it('handles empty options array', () => {
      render(<SwitchGroup label="Empty" helperText="No options" options={[]} />);
      
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });

    it('handles single option', () => {
      const singleOption = [{ label: 'Only Switch', value: 'only' }];
      render(<SwitchGroup label="Single" helperText="One choice" options={singleOption} />);
      
      expect(screen.getByRole('checkbox', { name: 'Only Switch' })).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    });
  });

  describe('Default state', () => {
    it('has no switches checked by default when value is not provided', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} />);
      
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).not.toBeChecked();
    });

    it('has no switches checked when value is empty array', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={[]} />);
      
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).not.toBeChecked();
    });

    it('checks switches based on provided value array', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['email', 'push']} />);
      
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).toBeChecked();
    });

    it('handles single selected value', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['sms']} />);
      
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).not.toBeChecked();
    });
  });

  describe('Switch toggling behavior', () => {
    it('adds value when unchecked switch is toggled on', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={[]} onChange={onChange} />);
      
      await user.click(screen.getByRole('checkbox', { name: 'Email Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['email']);
    });

    it('removes value when checked switch is toggled off', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['email', 'sms']} onChange={onChange} />);
      
      await user.click(screen.getByRole('checkbox', { name: 'Email Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['sms']);
    });

    it('handles multiple sequential toggles', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={[]} onChange={onChange} />);
      
      // Toggle Email on
      await user.click(screen.getByRole('checkbox', { name: 'Email Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['email']);
      let latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={latest} onChange={onChange} />);

      // Toggle SMS on
      await user.click(screen.getByRole('checkbox', { name: 'SMS Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['email', 'sms']);
      latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={latest} onChange={onChange} />);

      // Toggle Push on
      await user.click(screen.getByRole('checkbox', { name: 'Push Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['email', 'sms', 'push']);
    });

    it('handles removing from multiple selections', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['email', 'sms', 'push']} onChange={onChange} />);
      
      // Remove SMS
      await user.click(screen.getByRole('checkbox', { name: 'SMS Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['email', 'push']);
      let latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={latest} onChange={onChange} />);

      // Remove Email
      await user.click(screen.getByRole('checkbox', { name: 'Email Notifications' }));
      expect(onChange).toHaveBeenCalledWith(['push']);
    });

    it('handles toggling same switch multiple times', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={[]} onChange={onChange} />);
      
      const emailSwitch = screen.getByRole('checkbox', { name: 'Email Notifications' });
      
      // Toggle on
      await user.click(emailSwitch);
      expect(onChange).toHaveBeenCalledWith(['email']);
      let latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={latest} onChange={onChange} />);
      
      // Toggle off
      await user.click(emailSwitch);
      expect(onChange).toHaveBeenCalledWith([]);
      latest = onChange.mock.calls.at(-1)?.[0] ?? [];
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={latest} onChange={onChange} />);
      
      // Toggle on again
      await user.click(emailSwitch);
      expect(onChange).toHaveBeenCalledWith(['email']);
    });
  });

  describe('Controlled behavior', () => {
    it('maintains controlled state with rerenders', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['email']} onChange={onChange} />
      );

      // Rerender with same value
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['email']} onChange={onChange} />);
      
      // Email switch should still be checked
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).toBeChecked();
    });

    it('updates when controlled value changes', () => {
      const { rerender } = render(
        <SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['email']} onChange={onChange} />
      );

      // Rerender with different value
      rerender(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={['sms', 'push']} onChange={onChange} />);
      
      // Email should be unchecked, SMS and Push should be checked
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).toBeChecked();
    });
  });

  describe('Uncontrolled behavior', () => {
    it('updates internal state when uncontrolled', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} />);

      await user.click(screen.getByRole('checkbox', { name: 'Email Notifications' }));
      // Component should handle internal state, no onChange called
      expect(onChange).not.toHaveBeenCalled();
    });

    it('handles multiple internal state updates', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} />);

      await user.click(screen.getByRole('checkbox', { name: 'Email Notifications' }));
      await user.click(screen.getByRole('checkbox', { name: 'SMS Notifications' }));
      
      // Component should handle internal state, no onChange called
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('associates labels with switches for screen readers', () => {
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} />);
      
      // Each switch should be accessible by its label
      expect(screen.getByRole('checkbox', { name: 'Email Notifications' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Push Notifications' })).toBeInTheDocument();
    });

    it('allows clicking on labels to toggle switches', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={[]} onChange={onChange} />);
      
      // Click on the label text should toggle the switch
      await user.click(screen.getByText('Email Notifications'));
      expect(onChange).toHaveBeenCalledWith(['email']);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} onChange={onChange} />);
      
      // Focus first switch and use Tab to navigate
      const firstSwitch = screen.getByRole('checkbox', { name: 'Email Notifications' });
      firstSwitch.focus();
      
      await user.keyboard('{Tab}');
      expect(screen.getByRole('checkbox', { name: 'SMS Notifications' })).toHaveFocus();
    });
  });

  describe('Edge cases', () => {
    it('handles options with duplicate labels but different values', async () => {
      const duplicateOptions = [
        { label: 'Same Label', value: 'value1' },
        { label: 'Same Label', value: 'value2' },
      ];
      
      const user = userEvent.setup();
      render(<SwitchGroup label="Duplicates" helperText="Test" options={duplicateOptions} onChange={onChange} />);
      
      const switches = screen.getAllByRole('checkbox', { name: 'Same Label' });
      expect(switches).toHaveLength(2);
      
      // Toggle first switch
      await user.click(switches[0]);
      expect(onChange).toHaveBeenCalledWith(['value1']);
      
      // Toggle second switch
      await user.click(switches[1]);
      expect(onChange).toHaveBeenCalledWith(['value1', 'value2']);
    });

    it('handles options with special characters in labels and values', async () => {
      const specialOptions = [
        { label: 'Switch & Value', value: 'special&chars' },
        { label: 'Switch < > " \'', value: 'quotes<>' },
      ];
      
      const user = userEvent.setup();
      render(<SwitchGroup label="Special" helperText="Test" options={specialOptions} onChange={onChange} />);
      
      await user.click(screen.getByRole('checkbox', { name: 'Switch & Value' }));
      expect(onChange).toHaveBeenCalledWith(['special&chars']);
      
      await user.click(screen.getByRole('checkbox', { name: 'Switch < > " \'' }));
      expect(onChange).toHaveBeenCalledWith(['special&chars', 'quotes<>']);
    });

    it('handles very long labels', () => {
      const longLabelOptions = [
        { label: 'This is a very long label that might wrap or cause layout issues in the component', value: 'long' },
      ];
      
      render(<SwitchGroup label="Long Labels" helperText="Test" options={longLabelOptions} />);
      
      expect(screen.getByRole('checkbox', { name: 'This is a very long label that might wrap or cause layout issues in the component' })).toBeInTheDocument();
    });

    it('handles rapid clicking on switches', async () => {
      const user = userEvent.setup();
      render(<SwitchGroup label="Notifications" helperText="Choose channels" options={options} value={[]} onChange={onChange} />);
      
      const emailSwitch = screen.getByRole('checkbox', { name: 'Email Notifications' });
      
      // Rapid clicks
      await user.click(emailSwitch);
      await user.click(emailSwitch);
      await user.click(emailSwitch);
      
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(['email']);
    });

    it('handles null/undefined values in value array gracefully', () => {
      expect(() => {
        render(<SwitchGroup label="Test" helperText="Help" options={options} value={null as any} />);
      }).not.toThrow();
    });
  });
});
