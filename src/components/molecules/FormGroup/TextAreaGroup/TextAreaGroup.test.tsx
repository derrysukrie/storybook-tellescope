/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../../../test/test-utils';
import { TextAreaGroup } from './TextAreaGroup';

describe('TextAreaGroup', () => {
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
      render(<TextAreaGroup label="Notes" options={options} />);
      expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    it('renders label, helper text, and all textareas', () => {
      render(<TextAreaGroup label="Notes" helperText="Provide details" options={options} />);

      expect(screen.getByText('Notes')).toBeInTheDocument();
      expect(screen.getByText('Provide details')).toBeInTheDocument();

      const textareas = screen.getAllByRole('textbox');
      expect(textareas).toHaveLength(options.length);
    });
  });

  describe('Controlled behavior', () => {
    it('calls onChange with updated record when a textarea changes', async () => {
      const value = { alpha: '', beta: '', gamma: '' };
      render(<TextAreaGroup label="Notes" options={options} value={value} onChange={onChange} />);

      const textareas = screen.getAllByRole('textbox');
      fireEvent.change(textareas[0], { target: { value: 'Hello' } });

      expect(onChange).toHaveBeenLastCalledWith({ alpha: 'Hello', beta: '', gamma: '' });
    });

    it('handles multiple updates across different textareas with rerender', async () => {
      const initial = { alpha: '', beta: '', gamma: '' };
      const { rerender } = render(
        <TextAreaGroup label="Notes" options={options} value={initial} onChange={onChange} />
      );

      const textareas = screen.getAllByRole('textbox');
      fireEvent.change(textareas[0], { target: { value: 'First' } });
      expect(onChange).toHaveBeenLastCalledWith({ alpha: 'First', beta: '', gamma: '' });

      const afterFirst = { alpha: 'First', beta: '', gamma: '' };
      rerender(
        <TextAreaGroup label="Notes" options={options} value={afterFirst} onChange={onChange} />
      );

      const textareasAfter = screen.getAllByRole('textbox');
      fireEvent.change(textareasAfter[1], { target: { value: 'Second' } });
      expect(onChange).toHaveBeenLastCalledWith({ alpha: 'First', beta: 'Second', gamma: '' });
    });
  });

  describe('Uncontrolled behavior', () => {
    it('updates internal state when uncontrolled', async () => {
      render(<TextAreaGroup label="Notes" options={options} />);

      const textareas = screen.getAllByRole('textbox');
      fireEvent.change(textareas[2], { target: { value: 'Internal' } });

      expect(textareas[2]).toHaveValue('Internal');
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<TextAreaGroup label="Empty" options={[]} />);

      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('handles undefined onChange gracefully', async () => {
      render(<TextAreaGroup label="Test" options={options} onChange={undefined as any} />);
      const textareas = screen.getAllByRole('textbox');

      expect(() => {
        fireEvent.change(textareas[0], { target: { value: 'No crash' } });
      }).not.toThrow();
    });
  });
});


