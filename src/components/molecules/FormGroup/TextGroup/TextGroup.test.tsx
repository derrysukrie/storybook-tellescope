/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../../../test/test-utils';
import { TextGroup } from './TextGroup';

describe('TextGroup', () => {
  const options = [
    { label: 'Option 1', value: 'one' },
    { label: 'Option 2', value: 'two' },
    { label: 'Option 3', value: 'three' },
  ];

  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  describe('Component rendering', () => {
    it('renders label, helper text, and all text inputs', () => {
      render(<TextGroup label="Texts" helperText="Enter values" options={options} />);

      expect(screen.getByText('Texts')).toBeInTheDocument();
      expect(screen.getByText('Enter values')).toBeInTheDocument();

      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(options.length);
    });

    it('renders without helper text when not provided', () => {
      render(<TextGroup label="Texts" options={options} />);
      expect(screen.getByText('Texts')).toBeInTheDocument();
      expect(screen.queryByText('Enter values')).not.toBeInTheDocument();
    });
  });

  describe('Controlled behavior', () => {
    it('calls onChange with merged record for a changed input', () => {
      const value = { one: '', two: '', three: '' };
      render(<TextGroup label="Texts" options={options} value={value} onChange={onChange} />);

      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: 'Hello' } });

      expect(onChange).toHaveBeenLastCalledWith({ one: 'Hello', two: '', three: '' });
    });

    it('supports sequential updates across inputs', () => {
      const initial = { one: '', two: '', three: '' };
      const { rerender } = render(
        <TextGroup label="Texts" options={options} value={initial} onChange={onChange} />
      );

      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: 'First' } });
      expect(onChange).toHaveBeenLastCalledWith({ one: 'First', two: '', three: '' });

      const afterFirst = { one: 'First', two: '', three: '' };
      rerender(
        <TextGroup label="Texts" options={options} value={afterFirst} onChange={onChange} />
      );

      const inputsAfter = screen.getAllByRole('textbox');
      fireEvent.change(inputsAfter[1], { target: { value: 'Second' } });
      expect(onChange).toHaveBeenLastCalledWith({ one: 'First', two: 'Second', three: '' });
    });
  });

  describe('Uncontrolled behavior', () => {
    it('updates internal state when uncontrolled', () => {
      render(<TextGroup label="Texts" options={options} />);
      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[2], { target: { value: 'Local' } });
      expect(inputs[2]).toHaveValue('Local');
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<TextGroup label="Empty" options={[]} />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('handles undefined onChange without throwing', () => {
      render(<TextGroup label="Texts" options={options} onChange={undefined as any} />);
      const inputs = screen.getAllByRole('textbox');
      expect(() => {
        fireEvent.change(inputs[0], { target: { value: 'No crash' } });
      }).not.toThrow();
    });
  });
});
