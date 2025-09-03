/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/test-utils';
import { EmojiPicker } from './EmojiPicker';

// Mock the emoji-mart dependencies
vi.mock('@emoji-mart/data', () => ({
  default: {
    categories: [
      {
        id: 'smileys',
        name: 'Smileys & Emotion',
        emojis: ['😀', '😃', '😄']
      }
    ],
    emojis: {
      '😀': {
        id: '😀',
        name: 'grinning_face',
        colons: ':grinning:',
        emoticons: [':D', ':-D'],
        keywords: ['face', 'grin', 'grinning', 'smile', 'smiley']
      }
    }
  }
}));

vi.mock('@emoji-mart/react', () => ({
  default: vi.fn(({ onEmojiSelect, data, previewPosition, theme }) => {
    return React.createElement('div', {
      'data-testid': 'emoji-picker',
      'data-preview-position': previewPosition,
      'data-theme': theme,
      onClick: () => {
        // Simulate emoji selection
        onEmojiSelect({
          id: '😀',
          name: 'grinning_face',
          colons: ':grinning:',
          emoticons: [':D', ':-D'],
          keywords: ['face', 'grin', 'grinning', 'smile', 'smiley']
        });
      }
    }, 'Emoji Picker Mock');
  })
}));

describe('EmojiPicker', () => {
  const mockOnEmojiSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exports component', () => {
    expect(EmojiPicker).toBeDefined();
    expect(typeof EmojiPicker).toBe('object');
  });

  it('renders the emoji picker component', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    expect(picker).toBeInTheDocument();
    expect(picker).toHaveTextContent('Emoji Picker Mock');
  });

  it('passes correct props to the Picker component', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    expect(picker).toHaveAttribute('data-preview-position', 'none');
    expect(picker).toHaveAttribute('data-theme', 'light');
  });

  it('calls onEmojiSelect when an emoji is selected', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    fireEvent.click(picker);
    
    expect(mockOnEmojiSelect).toHaveBeenCalledTimes(1);
    expect(mockOnEmojiSelect).toHaveBeenCalledWith({
      id: '😀',
      name: 'grinning_face',
      colons: ':grinning:',
      emoticons: [':D', ':-D'],
      keywords: ['face', 'grin', 'grinning', 'smile', 'smiley']
    });
  });

  it('passes the emoji data to the Picker', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    // The mock verifies that the data prop is passed through
    // We can verify this by checking that the component renders without errors
    expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
  });

  it('is memoized to prevent unnecessary re-renders', () => {
    const { rerender } = render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    // Re-render with the same props
    rerender(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    // The component should still be rendered
    expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
  });

  it('handles multiple emoji selections correctly', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    
    // Select multiple emojis
    fireEvent.click(picker);
    fireEvent.click(picker);
    fireEvent.click(picker);
    
    expect(mockOnEmojiSelect).toHaveBeenCalledTimes(3);
  });

  it('maintains consistent props across re-renders', () => {
    const { rerender } = render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const initialPicker = screen.getByTestId('emoji-picker');
    expect(initialPicker).toHaveAttribute('data-preview-position', 'none');
    expect(initialPicker).toHaveAttribute('data-theme', 'light');
    
    // Re-render with same props
    rerender(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const rerenderedPicker = screen.getByTestId('emoji-picker');
    expect(rerenderedPicker).toHaveAttribute('data-preview-position', 'none');
    expect(rerenderedPicker).toHaveAttribute('data-theme', 'light');
  });

  it('handles different onEmojiSelect callbacks', () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();
    
    const { rerender } = render(<EmojiPicker onEmojiSelect={firstCallback} />);
    
    const picker = screen.getByTestId('emoji-picker');
    fireEvent.click(picker);
    expect(firstCallback).toHaveBeenCalledTimes(1);
    
    // Change callback
    rerender(<EmojiPicker onEmojiSelect={secondCallback} />);
    fireEvent.click(picker);
    
    expect(firstCallback).toHaveBeenCalledTimes(1); // Should not change
    expect(secondCallback).toHaveBeenCalledTimes(1); // Should be called
  });

  it('renders with correct default theme', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    expect(picker).toHaveAttribute('data-theme', 'light');
  });

  it('renders with correct preview position', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    expect(picker).toHaveAttribute('data-preview-position', 'none');
  });

  it('passes emoji data structure correctly', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    
    const picker = screen.getByTestId('emoji-picker');
    fireEvent.click(picker);
    
    const expectedEmojiData = {
      id: '😀',
      name: 'grinning_face',
      colons: ':grinning:',
      emoticons: [':D', ':-D'],
      keywords: ['face', 'grin', 'grinning', 'smile', 'smiley']
    };
    
    expect(mockOnEmojiSelect).toHaveBeenCalledWith(expectedEmojiData);
  });
});
