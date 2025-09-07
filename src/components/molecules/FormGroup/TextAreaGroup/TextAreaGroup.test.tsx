/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { TextAreaGroup } from './TextAreaGroup';

describe('TextAreaGroup', () => {
  const options = [
    { label: 'Description', value: 'description' },
    { label: 'Comments', value: 'comments' },
    { label: 'Notes', value: 'notes' },
  ];

  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  describe('Component rendering', () => {
    it('renders without crashing', () => {
      render(<TextAreaGroup label="Text Areas" options={options} />);
      expect(screen.getByText('Text Areas')).toBeInTheDocument();
    });

    it('renders label, helper text, and all text areas', () => {
      render(
        <TextAreaGroup 
          label="Text Areas" 
          helperText="Enter your information" 
          options={options} 
        />
      );
      
      expect(screen.getByText('Text Areas')).toBeInTheDocument();
      expect(screen.getByText('Enter your information')).toBeInTheDocument();
      
      // Each option should render as a textarea
      const textareas = screen.getAllByRole('textbox');
      expect(textareas).toHaveLength(3);
    });

    it('renders with default label size', () => {
      render(<TextAreaGroup label="Test Label" options={options} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with large label size', () => {
      render(<TextAreaGroup label="Test Label" labelSize="large" options={options} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<TextAreaGroup label="Test" helperText="This is help text" options={options} />);
      expect(screen.getByText('This is help text')).toBeInTheDocument();
    });

    it('does not render helper text when not provided', () => {
      render(<TextAreaGroup label="Test" options={options} />);
      expect(screen.queryByText('This is help text')).not.toBeInTheDocument();
    });
  });

  describe('Props validation', () => {
    it('requires all required props', () => {
      expect(() => {
        render(<TextAreaGroup label="Test" options={options} />);
      }).not.toThrow();
    });

    it('handles undefined onChange gracefully', () => {
      expect(() => {
        render(<TextAreaGroup label="Test" options={options} onChange={undefined} />);
      }).not.toThrow();
    });

    it('handles undefined value gracefully', () => {
      expect(() => {
        render(<TextAreaGroup label="Test" options={options} value={undefined} />);
      }).not.toThrow();
    });

    it('handles empty options array', () => {
      render(<TextAreaGroup label="Empty" options={[]} />);
      
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('handles single option', () => {
      const singleOption = [{ label: 'Only TextArea', value: 'only' }];
      render(<TextAreaGroup label="Single" options={singleOption} />);
      
      const textareas = screen.getAllByRole('textbox');
      expect(textareas).toHaveLength(1);
    });
  });

  describe('Default state', () => {
    it('has empty text areas by default when value is not provided', () => {
      render(<TextAreaGroup label="Text Areas" options={options} />);
      
      const textareas = screen.getAllByRole('textbox');
      textareas.forEach(textarea => {
        expect(textarea).toHaveValue('');
      });
    });

    it('has empty text areas when value is empty object', () => {
      render(<TextAreaGroup label="Text Areas" options={options} value={{}} />);
      
      const textareas = screen.getAllByRole('textbox');
      textareas.forEach(textarea => {
        expect(textarea).toHaveValue('');
      });
    });

    it('populates text areas based on provided value object', () => {
      const value = {
        description: 'This is a description',
        comments: 'These are comments',
        notes: 'These are notes'
      };
      render(<TextAreaGroup label="Text Areas" options={options} value={value} />);
      
      expect(screen.getByDisplayValue('This is a description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('These are comments')).toBeInTheDocument();
      expect(screen.getByDisplayValue('These are notes')).toBeInTheDocument();
    });

    it('handles partial value object', () => {
      const value = {
        description: 'Only description filled',
        comments: '',
        notes: 'Only notes filled'
      };
      render(<TextAreaGroup label="Text Areas" options={options} value={value} />);
      
      expect(screen.getByDisplayValue('Only description filled')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Only notes filled')).toBeInTheDocument();
      
      const textareas = screen.getAllByRole('textbox');
      const commentsTextarea = textareas.find(textarea => textarea.getAttribute('value') === '');
      expect(commentsTextarea).toBeInTheDocument();
    });
  });

  describe('Text input behavior', () => {
    it('calls onChange when text is entered in textarea', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} value={{}} onChange={onChange} />);
      
      const textareas = screen.getAllByRole('textbox');
      await user.type(textareas[0], 'Hello world');
      
      expect(onChange).toHaveBeenCalled();
    });

    it('updates multiple text areas independently', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} value={{}} onChange={onChange} />);
      
      const textareas = screen.getAllByRole('textbox');
      
      // Type in first textarea
      await user.type(textareas[0], 'Description text');
      expect(onChange).toHaveBeenCalled();
      
      // Type in second textarea
      await user.type(textareas[1], 'Comments text');
      expect(onChange).toHaveBeenCalled();
    });

    it('handles clearing text from textarea', async () => {
      const user = userEvent.setup();
      const initialValue = {
        description: 'Initial text',
        comments: 'More text',
        notes: ''
      };
      render(
        <TextAreaGroup label="Text Areas" options={options} value={initialValue} onChange={onChange} />
      );
      
      const textareas = screen.getAllByRole('textbox');
      const descriptionTextarea = textareas[0];
      
      // Clear the text
      await user.clear(descriptionTextarea);
      expect(onChange).toHaveBeenCalled();
    });

    it('handles rapid typing in textarea', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} value={{}} onChange={onChange} />);
      
      const textareas = screen.getAllByRole('textbox');
      await user.type(textareas[0], 'Rapid typing test');
      
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Controlled behavior', () => {
    it('maintains controlled state with rerenders', () => {
      const value = {
        description: 'Controlled description',
        comments: 'Controlled comments',
        notes: ''
      };
      const { rerender } = render(
        <TextAreaGroup label="Text Areas" options={options} value={value} onChange={onChange} />
      );

      // Rerender with same value
      rerender(<TextAreaGroup label="Text Areas" options={options} value={value} onChange={onChange} />);
      
      // Values should remain the same
      expect(screen.getByDisplayValue('Controlled description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Controlled comments')).toBeInTheDocument();
    });

    it('updates when controlled value changes', () => {
      const initialValue = {
        description: 'Initial description',
        comments: '',
        notes: ''
      };
      const { rerender } = render(
        <TextAreaGroup label="Text Areas" options={options} value={initialValue} onChange={onChange} />
      );

      // Rerender with different value
      const newValue = {
        description: 'Updated description',
        comments: 'New comments',
        notes: 'New notes'
      };
      rerender(<TextAreaGroup label="Text Areas" options={options} value={newValue} onChange={onChange} />);
      
      // Values should be updated
      expect(screen.getByDisplayValue('Updated description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('New comments')).toBeInTheDocument();
      expect(screen.getByDisplayValue('New notes')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled behavior', () => {
    it('updates internal state when uncontrolled', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} />);

      const textareas = screen.getAllByRole('textbox');
      await user.type(textareas[0], 'Uncontrolled text');
      
      // Component should handle internal state, no onChange called
      expect(onChange).not.toHaveBeenCalled();
      
      // Text should still be visible
      expect(screen.getByDisplayValue('Uncontrolled text')).toBeInTheDocument();
    });

    it('handles multiple internal state updates', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} />);

      const textareas = screen.getAllByRole('textbox');
      await user.type(textareas[0], 'First text');
      await user.type(textareas[1], 'Second text');
      
      // Component should handle internal state, no onChange called
      expect(onChange).not.toHaveBeenCalled();
      
      // Both texts should be visible
      expect(screen.getByDisplayValue('First text')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Second text')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders textareas with proper roles', () => {
      render(<TextAreaGroup label="Text Areas" options={options} />);
      
      const textareas = screen.getAllByRole('textbox');
      expect(textareas).toHaveLength(3);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} />);
      
      const textareas = screen.getAllByRole('textbox');
      
      // Focus first textarea and use Tab to navigate
      textareas[0].focus();
      expect(textareas[0]).toHaveFocus();
      
      await user.keyboard('{Tab}');
      expect(textareas[1]).toHaveFocus();
      
      await user.keyboard('{Tab}');
      expect(textareas[2]).toHaveFocus();
    });

    it('supports typing in focused textarea', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Text Areas" options={options} />);
      
      const textareas = screen.getAllByRole('textbox');
      textareas[0].focus();
      
      await user.keyboard('Typed with keyboard');
      expect(screen.getByDisplayValue('Typed with keyboard')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles options with duplicate labels but different values', async () => {
      const duplicateOptions = [
        { label: 'Same Label', value: 'value1' },
        { label: 'Same Label', value: 'value2' },
      ];
      
      const user = userEvent.setup();
      render(<TextAreaGroup label="Duplicates" options={duplicateOptions} onChange={onChange} />);
      
      const textareas = screen.getAllByRole('textbox');
      expect(textareas).toHaveLength(2);
      
      // Type in first textarea
      await user.type(textareas[0], 'First value');
      expect(onChange).toHaveBeenCalled();
      
      // Type in second textarea
      await user.type(textareas[1], 'Second value');
      expect(onChange).toHaveBeenCalled();
    });

    it('handles options with special characters in labels and values', async () => {
      const specialOptions = [
        { label: 'Text & Value', value: 'special&chars' },
        { label: 'Text < > " \'', value: 'quotes<>' },
      ];
      
      const user = userEvent.setup();
      render(<TextAreaGroup label="Special" options={specialOptions} onChange={onChange} />);
      
      const textareas = screen.getAllByRole('textbox');
      await user.type(textareas[0], 'Special text');
      expect(onChange).toHaveBeenCalled();
    });

    it('handles very long text input', async () => {
      const user = userEvent.setup();
      render(<TextAreaGroup label="Long Text" options={options} onChange={onChange} />);
      
      const longText = 'This is a very long text that might test the component\'s ability to handle large amounts of text input without any issues or performance problems. It should work smoothly even with extensive content.';
      
      const textareas = screen.getAllByRole('textbox');
      await user.type(textareas[0], longText);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('handles null/undefined values in value object gracefully', () => {
      // The component should handle null values by treating them as empty objects
      expect(() => {
        render(<TextAreaGroup label="Test" options={options} value={null as any} />);
      }).not.toThrow();
      
      // Should render with empty text areas when value is null
      const textareas = screen.getAllByRole('textbox');
      textareas.forEach(textarea => {
        expect(textarea).toHaveValue('');
      });
    });

    it('handles empty string values in value object', () => {
      const valueWithEmptyStrings = {
        description: '',
        comments: '',
        notes: ''
      };
      render(<TextAreaGroup label="Empty Strings" options={options} value={valueWithEmptyStrings} />);
      
      const textareas = screen.getAllByRole('textbox');
      textareas.forEach(textarea => {
        expect(textarea).toHaveValue('');
      });
    });

    it('handles value object with extra keys not in options', () => {
      const valueWithExtraKeys = {
        description: 'Description text',
        comments: 'Comments text',
        notes: 'Notes text',
        extraKey: 'This should be ignored'
      };
      render(<TextAreaGroup label="Extra Keys" options={options} value={valueWithExtraKeys} />);
      
      // Should only show values for options that exist
      expect(screen.getByDisplayValue('Description text')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Comments text')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Notes text')).toBeInTheDocument();
    });
  });
});
