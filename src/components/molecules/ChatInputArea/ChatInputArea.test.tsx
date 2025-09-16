import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatInputArea } from './ChatInputArea';

// Mock the dependent components
vi.mock('../SuggestedActions/SuggestedActions', () => ({
  SuggestedActions: ({ expanded }: { expanded: boolean }) => (
    <div data-testid="suggested-actions" data-expanded={expanded}>
      Suggested Actions
    </div>
  ),
}));

vi.mock('../FileArray/FileArray', () => ({
  FileArray: () => (
    <div data-testid="file-array">File Array</div>
  ),
}));

vi.mock('../../atoms/ChatInput/ChatInput', () => ({
  default: ({ value, onChange, onSend }: any) => (
    <div data-testid="chat-input">
      <input
        data-testid="chat-input-field"
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
      />
      <button data-testid="send-button" onClick={onSend}>
        Send
      </button>
    </div>
  ),
}));

// Mock window.alert
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('ChatInputArea', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    alertSpy.mockClear();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<ChatInputArea />);
      expect(screen.getByTestId('suggested-actions')).toBeInTheDocument();
    });

    it('renders all required sub-components', () => {
      render(<ChatInputArea />);
      
      expect(screen.getByTestId('suggested-actions')).toBeInTheDocument();
      expect(screen.getByTestId('file-array')).toBeInTheDocument();
      expect(screen.getByTestId('chat-input')).toBeInTheDocument();
    });

    it('renders components in correct order', () => {
      const { container } = render(<ChatInputArea />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      
      const children = Array.from(section!.children);
      expect(children).toHaveLength(3);
      expect(children[0]).toContainElement(screen.getByTestId('suggested-actions'));
      expect(children[1]).toContainElement(screen.getByTestId('file-array'));
      expect(children[2]).toContainElement(screen.getByTestId('chat-input'));
    });

    it('has proper semantic structure', () => {
      const { container } = render(<ChatInputArea />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section!.tagName).toBe('SECTION');
      
      const divs = screen.getAllByRole('generic');
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('Component Configuration', () => {
    it('passes correct props to SuggestedActions', () => {
      render(<ChatInputArea />);
      
      const suggestedActions = screen.getByTestId('suggested-actions');
      expect(suggestedActions).toHaveAttribute('data-expanded', 'false');
    });

    it('renders FileArray without props', () => {
      render(<ChatInputArea />);
      
      expect(screen.getByTestId('file-array')).toBeInTheDocument();
    });

    it('initializes ChatInput with empty value', () => {
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      expect(input).toHaveValue('');
    });
  });

  describe('State Management', () => {
    it('manages message state correctly', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      
      await user.type(input, 'Hello world');
      expect(input).toHaveValue('Hello world');
    });

    it('updates state on input change', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      
      await user.type(input, 'Test message');
      expect(input).toHaveValue('Test message');
      
      await user.clear(input);
      expect(input).toHaveValue('');
    });

    it('handles multiple character inputs', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      
      await user.type(input, 'A');
      expect(input).toHaveValue('A');
      
      await user.type(input, 'B');
      expect(input).toHaveValue('AB');
      
      await user.type(input, 'C');
      expect(input).toHaveValue('ABC');
    });
  });

  describe('Send Functionality', () => {
    it('shows alert with message content when send is clicked', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      await user.type(input, 'Test message');
      await user.click(sendButton);
      
      expect(alertSpy).toHaveBeenCalledWith('Sending message: Test message');
    });

    it('clears message after sending', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      await user.type(input, 'Test message');
      expect(input).toHaveValue('Test message');
      
      await user.click(sendButton);
      expect(input).toHaveValue('');
    });

    it('sends empty message when input is empty', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const sendButton = screen.getByTestId('send-button');
      
      await user.click(sendButton);
      
      expect(alertSpy).toHaveBeenCalledWith('Sending message: ');
    });

    it('handles multiple send operations', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      // First message
      await user.type(input, 'Message 1');
      await user.click(sendButton);
      expect(alertSpy).toHaveBeenCalledWith('Sending message: Message 1');
      expect(input).toHaveValue('');
      
      // Second message
      await user.type(input, 'Message 2');
      await user.click(sendButton);
      expect(alertSpy).toHaveBeenCalledWith('Sending message: Message 2');
      expect(input).toHaveValue('');
      
      expect(alertSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct margin bottom to SuggestedActions container', () => {
      render(<ChatInputArea />);
      
      const suggestedActionsContainer = screen.getByTestId('suggested-actions').parentElement;
      expect(suggestedActionsContainer).toHaveStyle({ marginBottom: '8px' });
    });

    it('applies correct margin bottom to FileArray container', () => {
      render(<ChatInputArea />);
      
      const fileArrayContainer = screen.getByTestId('file-array').parentElement;
      expect(fileArrayContainer).toHaveStyle({ marginBottom: '8px' });
    });

    it('has proper Box component structure', () => {
      const { container } = render(<ChatInputArea />);
      
      const section = container.querySelector('section');
      expect(section!.className).toContain('MuiBox-root');
      
      const childBoxes = section!.querySelectorAll('.MuiBox-root');
      expect(childBoxes.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      const { container } = render(<ChatInputArea />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      await user.tab();
      expect(input).toHaveFocus();
      
      await user.tab();
      expect(sendButton).toHaveFocus();
    });

    it('handles keyboard input properly', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      input.focus();
      
      await user.keyboard('Hello');
      expect(input).toHaveValue('Hello');
      
      await user.keyboard(' World');
      expect(input).toHaveValue('Hello World');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long messages', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      const longMessage = 'A'.repeat(1000);
      await user.type(input, longMessage);
      await user.click(sendButton);
      
      expect(alertSpy).toHaveBeenCalledWith(`Sending message: ${longMessage}`);
      expect(input).toHaveValue('');
    });

    it('handles special characters in messages', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      const specialMessage = '!@#$%^&*()_+-=<>?';
      await user.type(input, specialMessage);
      await user.click(sendButton);
      
      expect(alertSpy).toHaveBeenCalledWith(`Sending message: ${specialMessage}`);
    });

    it('handles unicode characters', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      const unicodeMessage = '🎉 Hello 世界 🚀';
      await user.type(input, unicodeMessage);
      await user.click(sendButton);
      
      expect(alertSpy).toHaveBeenCalledWith(`Sending message: ${unicodeMessage}`);
    });

    it('handles rapid typing and sending', async () => {
      const user = userEvent.setup();
      render(<ChatInputArea />);
      
      const input = screen.getByTestId('chat-input-field');
      const sendButton = screen.getByTestId('send-button');
      
      // Rapid operations
      await user.type(input, 'Quick');
      await user.click(sendButton);
      await user.type(input, 'Messages');
      await user.click(sendButton);
      
      expect(alertSpy).toHaveBeenCalledTimes(2);
      expect(alertSpy).toHaveBeenNthCalledWith(1, 'Sending message: Quick');
      expect(alertSpy).toHaveBeenNthCalledWith(2, 'Sending message: Messages');
    });
  });

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      render(<ChatInputArea />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('handles rapid re-renders', () => {
      const { rerender } = render(<ChatInputArea />);
      
      // Multiple re-renders should not cause issues
      for (let i = 0; i < 10; i++) {
        rerender(<ChatInputArea />);
      }
      
      expect(screen.getByTestId('chat-input')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works correctly with multiple instances', () => {
      const { container } = render(
        <div>
          <ChatInputArea />
          <ChatInputArea />
        </div>
      );
      
      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(2);
      
      const inputs = screen.getAllByTestId('chat-input-field');
      expect(inputs).toHaveLength(2);
    });

    it('maintains state independence between instances', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ChatInputArea />
          <ChatInputArea />
        </div>
      );
      
      const inputs = screen.getAllByTestId('chat-input-field');
      
      await user.type(inputs[0], 'First instance');
      await user.type(inputs[1], 'Second instance');
      
      expect(inputs[0]).toHaveValue('First instance');
      expect(inputs[1]).toHaveValue('Second instance');
    });

    it('integrates properly with parent components', () => {
      const { container } = render(
        <div data-testid="parent">
          <ChatInputArea />
        </div>
      );
      
      const parent = screen.getByTestId('parent');
      const chatInputArea = container.querySelector('section');
      
      expect(parent).toContainElement(chatInputArea);
    });
  });
});
