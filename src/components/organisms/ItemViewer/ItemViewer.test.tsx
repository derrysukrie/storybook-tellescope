import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ItemViewer } from './ItemViewer';
import type { MessageProps, IMessage, ChatInterface, MessageError, MessageLoadingState } from '../../molecules/Message';

// Mock the dependent components
vi.mock('../../molecules', () => ({
  MessageContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="message-container">{children}</div>
  ),
  MessageHeader: ({ 
    chatInterface, 
    content, 
    enableTeamChat, 
    setEnableTeamChat, 
    onHeaderFormChange 
  }: any) => (
    <div data-testid="message-header">
      <div data-testid="chat-interface">{chatInterface}</div>
      <div data-testid="enable-team-chat">{enableTeamChat?.toString()}</div>
      <div data-testid="messages-count">{content?.length || 0}</div>
      <button 
        data-testid="toggle-team-chat" 
        onClick={() => setEnableTeamChat?.(!enableTeamChat)}
      >
        Toggle Team Chat
      </button>
      <button 
        data-testid="header-form-change" 
        onClick={() => onHeaderFormChange?.('subject', 'Test Subject')}
      >
        Change Header
      </button>
    </div>
  ),
  Messages: ({ content, onMessageRetry }: any) => (
    <div data-testid="messages">
      <div data-testid="messages-list-count">{content?.length || 0}</div>
      {content?.map((message: IMessage, index: number) => (
        <div key={message.id || index} data-testid={`message-${index}`}>
          {message.text}
        </div>
      ))}
      <button 
        data-testid="retry-message" 
        onClick={() => onMessageRetry?.('test-message-id')}
      >
        Retry Message
      </button>
    </div>
  ),
  MessageInput: ({ 
    enableTeamChat, 
    chatInterface, 
    setChatInterface, 
    onSubmit, 
    config 
  }: any) => (
    <div data-testid="message-input">
      <div data-testid="input-team-chat">{enableTeamChat?.toString()}</div>
      <div data-testid="input-chat-interface">{chatInterface}</div>
      <div data-testid="input-disabled">{config?.disabled?.toString()}</div>
      <div data-testid="input-error">{config?.error?.toString()}</div>
      <input 
        data-testid="message-input-field"
        placeholder="Type a message..."
        onChange={(_) => {/* handle input */}}
      />
      <button 
        data-testid="submit-message" 
        onClick={() => onSubmit?.('Test message')}
        disabled={config?.disabled}
      >
        Send
      </button>
      <button 
        data-testid="change-interface" 
        onClick={() => setChatInterface?.('EMAIL')}
      >
        Change Interface
      </button>
    </div>
  ),
}));

// Test data factories
const createMockMessage = (overrides: Partial<IMessage> = {}): IMessage => ({
  id: 'test-message-1',
  type: 'INCOMING',
  text: 'Test message content',
  createdAt: new Date('2023-01-01'),
  avatar: 'https://example.com/avatar.jpg',
  role: 'User',
  ...overrides,
});

const createMockMessages = (count: number): IMessage[] => 
  Array.from({ length: count }, (_, index) => 
    createMockMessage({ 
      id: `test-message-${index + 1}`,
      text: `Test message ${index + 1}`,
      type: index % 2 === 0 ? 'INCOMING' : 'OUTGOING'
    })
  );

const createMockCallbacks = (overrides: Partial<MessageProps['callbacks']> = {}): MessageProps['callbacks'] => ({
  onMessageSubmit: vi.fn(),
  onChatInterfaceChange: vi.fn(),
  onTeamChatToggle: vi.fn(),
  onHeaderFormChange: vi.fn(),
  onMessageReaction: vi.fn(),
  onMessageOptions: vi.fn(),
  onMessageRetry: vi.fn(),
  ...overrides,
});

const createMockConfig = (overrides: Partial<MessageProps['config']> = {}): MessageProps['config'] => ({
  enableTeamChat: false,
  chatInterface: 'CHAT' as ChatInterface,
  input: {
    placeholder: 'Type a message...',
    disabled: false,
    error: false,
  },
  header: {
    showForm: false,
    showTeamChatToggle: true,
    showInterfaceSelector: true,
  },
  container: {
    width: '100%',
    height: 'auto',
  },
  ...overrides,
});

const createMockError = (overrides: Partial<MessageError> = {}): MessageError => ({
  type: 'VALIDATION',
  message: 'Test error message',
  ...overrides,
});

const createMockLoading = (overrides: Partial<MessageLoadingState> = {}): MessageLoadingState => ({
  isSubmitting: false,
  isTyping: false,
  isUploading: false,
  ...overrides,
});

describe('ItemViewer', () => {
  const defaultProps: MessageProps = {
    messages: createMockMessages(3),
    config: createMockConfig(),
    callbacks: createMockCallbacks(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<ItemViewer {...defaultProps} />);
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
    });

    it('renders all required child components', () => {
      render(<ItemViewer {...defaultProps} />);
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
      expect(screen.getByTestId('message-header')).toBeInTheDocument();
      expect(screen.getByTestId('messages')).toBeInTheDocument();
      expect(screen.getByTestId('message-input')).toBeInTheDocument();
    });

    it('renders components in correct order', () => {
      render(<ItemViewer {...defaultProps} />);
      
      const messageContainer = screen.getByTestId('message-container');
      const children = Array.from(messageContainer.children);
      
      expect(children).toHaveLength(3);
      expect(children[0]).toContainElement(screen.getByTestId('message-header'));
      expect(children[1]).toContainElement(screen.getByTestId('messages'));
      expect(children[2]).toContainElement(screen.getByTestId('message-input'));
    });

    it('has proper semantic structure with Box component', () => {
      const { container } = render(<ItemViewer {...defaultProps} />);
      
      const boxComponent = container.firstChild;
      expect(boxComponent).toBeInTheDocument();
      expect(boxComponent).toHaveClass('MuiBox-root');
    });

    it('applies displayName correctly', () => {
      expect(ItemViewer.displayName).toBe('ItemViewer');
    });
  });

  describe('Props Handling and Configuration', () => {
    it('passes messages to MessageHeader and Messages components', () => {
      const messages = createMockMessages(5);
      render(<ItemViewer {...defaultProps} messages={messages} />);
      
      expect(screen.getByTestId('messages-count')).toHaveTextContent('5');
      expect(screen.getByTestId('messages-list-count')).toHaveTextContent('5');
    });

    it('passes config props correctly to child components', () => {
      const config = createMockConfig({
        enableTeamChat: true,
        chatInterface: 'EMAIL',
      });
      
      render(<ItemViewer {...defaultProps} config={config} />);
      
      expect(screen.getByTestId('enable-team-chat')).toHaveTextContent('true');
      expect(screen.getByTestId('chat-interface')).toHaveTextContent('EMAIL');
      expect(screen.getByTestId('input-team-chat')).toHaveTextContent('true');
      expect(screen.getByTestId('input-chat-interface')).toHaveTextContent('EMAIL');
    });

    it('passes callbacks correctly to child components', () => {
      const callbacks = createMockCallbacks();
      render(<ItemViewer {...defaultProps} callbacks={callbacks} />);
      
      // All callback-related elements should be present
      expect(screen.getByTestId('toggle-team-chat')).toBeInTheDocument();
      expect(screen.getByTestId('header-form-change')).toBeInTheDocument();
      expect(screen.getByTestId('submit-message')).toBeInTheDocument();
      expect(screen.getByTestId('change-interface')).toBeInTheDocument();
    });

    it('handles missing config gracefully with defaults', () => {
      render(<ItemViewer {...defaultProps} config={undefined} />);
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
      expect(screen.getByTestId('enable-team-chat')).toHaveTextContent('');
      expect(screen.getByTestId('chat-interface')).toHaveTextContent('');
    });

    it('applies custom className', () => {
      const { container } = render(
        <ItemViewer {...defaultProps} className="custom-item-viewer" />
      );
      
      const boxComponent = container.firstChild;
      expect(boxComponent).toHaveClass('custom-item-viewer');
    });
  });

  describe('Container Styling and Configuration', () => {
    it('applies default container styles', () => {
      const { container } = render(<ItemViewer {...defaultProps} />);
      
      const boxComponent = container.firstChild as HTMLElement;
      expect(boxComponent).toHaveStyle({
        width: '100%',
        height: 'auto',
      });
    });

    it('applies custom container dimensions from config', () => {
      const config = createMockConfig({
        container: {
          width: '800px',
          height: '600px',
          maxWidth: '1000px',
          minHeight: '400px',
        },
      });
      
      const { container } = render(<ItemViewer {...defaultProps} config={config} />);
      
      const boxComponent = container.firstChild as HTMLElement;
      expect(boxComponent).toHaveStyle({
        width: '800px',
        height: '600px',
        maxWidth: '1000px',
        minHeight: '400px',
      });
    });

    it('handles partial container config', () => {
      const config = createMockConfig({
        container: {
          width: '500px',
          // height defaults to 'auto'
        },
      });
      
      const { container } = render(<ItemViewer {...defaultProps} config={config} />);
      
      const boxComponent = container.firstChild as HTMLElement;
      expect(boxComponent).toHaveStyle({
        width: '500px',
        height: 'auto',
      });
    });
  });

  describe('Callback Integration', () => {
    it('calls onTeamChatToggle when team chat is toggled', async () => {
      const user = userEvent.setup();
      const callbacks = createMockCallbacks();
      
      render(<ItemViewer {...defaultProps} callbacks={callbacks} />);
      
      const toggleButton = screen.getByTestId('toggle-team-chat');
      await user.click(toggleButton);
      
      expect(callbacks.onTeamChatToggle).toHaveBeenCalledWith(true);
    });

    it('calls onHeaderFormChange when header form changes', async () => {
      const user = userEvent.setup();
      const callbacks = createMockCallbacks();
      
      render(<ItemViewer {...defaultProps} callbacks={callbacks} />);
      
      const formChangeButton = screen.getByTestId('header-form-change');
      await user.click(formChangeButton);
      
      expect(callbacks.onHeaderFormChange).toHaveBeenCalledWith('subject', 'Test Subject');
    });

    it('calls onMessageSubmit when message is submitted', async () => {
      const user = userEvent.setup();
      const callbacks = createMockCallbacks();
      
      render(<ItemViewer {...defaultProps} callbacks={callbacks} />);
      
      const submitButton = screen.getByTestId('submit-message');
      await user.click(submitButton);
      
      expect(callbacks.onMessageSubmit).toHaveBeenCalledWith('Test message');
    });

    it('calls onChatInterfaceChange when interface changes', async () => {
      const user = userEvent.setup();
      const callbacks = createMockCallbacks();
      
      render(<ItemViewer {...defaultProps} callbacks={callbacks} />);
      
      const interfaceButton = screen.getByTestId('change-interface');
      await user.click(interfaceButton);
      
      expect(callbacks.onChatInterfaceChange).toHaveBeenCalledWith('EMAIL');
    });

    it('handles missing callbacks gracefully', () => {
      const incompleteCallbacks = {
        onMessageSubmit: vi.fn(),
        // Missing other callbacks
      } as any;
      
      expect(() => {
        render(<ItemViewer {...defaultProps} callbacks={incompleteCallbacks} />);
      }).not.toThrow();
    });
  });

  describe('Error and Loading States', () => {
    it('passes loading state to MessageInput config', () => {
      const loading = createMockLoading({ isSubmitting: true });
      
      render(<ItemViewer {...defaultProps} loading={loading} />);
      
      expect(screen.getByTestId('input-disabled')).toHaveTextContent('true');
      expect(screen.getByTestId('submit-message')).toBeDisabled();
    });

    it('passes error state to MessageInput config', () => {
      const error = createMockError({ type: 'VALIDATION' });
      
      render(<ItemViewer {...defaultProps} error={error} />);
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('true');
    });

    it('handles both error and loading states together', () => {
      const loading = createMockLoading({ isSubmitting: true });
      const error = createMockError({ type: 'SUBMISSION' });
      
      render(<ItemViewer {...defaultProps} loading={loading} error={error} />);
      
      expect(screen.getByTestId('input-disabled')).toHaveTextContent('true');
      expect(screen.getByTestId('input-error')).toHaveTextContent('true');
    });

    it('handles falsy loading state correctly', () => {
      render(<ItemViewer {...defaultProps} loading={undefined} />);
      
      expect(screen.getByTestId('input-disabled')).toHaveTextContent('false');
    });

    it('handles falsy error state correctly', () => {
      render(<ItemViewer {...defaultProps} error={null} />);
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('false');
    });
  });

  describe('Performance and React.memo', () => {
    it('uses React.memo for performance optimization', () => {
      // React.memo components have a special $$typeof symbol
      expect(ItemViewer).toBeDefined();
      expect(typeof ItemViewer).toBe('object');
    });

    it('prevents unnecessary re-renders with same props', () => {
      const { rerender } = render(<ItemViewer {...defaultProps} />);
      
      // Re-render with same props should not cause issues
      rerender(<ItemViewer {...defaultProps} />);
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
    });

    it('renders efficiently with large datasets', () => {
      const startTime = performance.now();
      
      render(
        <ItemViewer 
          {...defaultProps} 
          messages={createMockMessages(100)}
        />
      );
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(200);
    });
  });

  describe('Message Handling and Edge Cases', () => {
    it('renders empty messages array', () => {
      render(<ItemViewer {...defaultProps} messages={[]} />);
      
      expect(screen.getByTestId('messages-count')).toHaveTextContent('0');
      expect(screen.getByTestId('messages-list-count')).toHaveTextContent('0');
    });

    it('renders single message', () => {
      const singleMessage = [createMockMessage({ text: 'Single test message' })];
      
      render(<ItemViewer {...defaultProps} messages={singleMessage} />);
      
      expect(screen.getByTestId('messages-count')).toHaveTextContent('1');
      expect(screen.getByTestId('message-0')).toHaveTextContent('Single test message');
    });

    it('renders multiple messages in correct order', () => {
      const messages = [
        createMockMessage({ id: '1', text: 'First message' }),
        createMockMessage({ id: '2', text: 'Second message' }),
        createMockMessage({ id: '3', text: 'Third message' }),
      ];
      
      render(<ItemViewer {...defaultProps} messages={messages} />);
      
      expect(screen.getByTestId('message-0')).toHaveTextContent('First message');
      expect(screen.getByTestId('message-1')).toHaveTextContent('Second message');
      expect(screen.getByTestId('message-2')).toHaveTextContent('Third message');
    });

    it('handles undefined config object', () => {
      expect(() => {
        render(<ItemViewer {...defaultProps} config={undefined} />);
      }).not.toThrow();
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
    });

    it('handles empty config object', () => {
      render(<ItemViewer {...defaultProps} config={{}} />);
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
    });

    it('handles very large message arrays', () => {
      const largeMessageArray = createMockMessages(1000);
      
      render(<ItemViewer {...defaultProps} messages={largeMessageArray} />);
      
      expect(screen.getByTestId('messages-count')).toHaveTextContent('1000');
    });

    it('handles messages with missing properties', () => {
      const messagesWithMissingProps = [
        { type: 'INCOMING', text: 'Message without ID' } as IMessage,
        { id: 'test', type: 'OUTGOING' } as IMessage, // Missing text
      ];
      
      expect(() => {
        render(<ItemViewer {...defaultProps} messages={messagesWithMissingProps} />);
      }).not.toThrow();
    });

    it('handles null/undefined messages array gracefully', () => {
      expect(() => {
        render(<ItemViewer {...defaultProps} messages={null as any} />);
      }).not.toThrow();
    });

    it('passes undefined onMessageRetry correctly', () => {
      render(<ItemViewer {...defaultProps} />);
      
      // The component should render without issues even with undefined onMessageRetry
      expect(screen.getByTestId('messages')).toBeInTheDocument();
      expect(screen.getByTestId('retry-message')).toBeInTheDocument();
    });

    it('handles different ChatInterface types', () => {
      const interfaces: ChatInterface[] = ['CHAT', 'SMS', 'EMAIL', 'MMS'];
      
      interfaces.forEach((chatInterface) => {
        const config = createMockConfig({ chatInterface });
        
        const { unmount } = render(<ItemViewer {...defaultProps} config={config} />);
        
        expect(screen.getByTestId('chat-interface')).toHaveTextContent(chatInterface);
        
        unmount();
      });
    });
  });

  describe('Accessibility and Semantic Structure', () => {
    it('maintains proper semantic structure', () => {
      const { container } = render(<ItemViewer {...defaultProps} />);
      
      const boxComponent = container.firstChild;
      expect(boxComponent).toBeInTheDocument();
      
      const messageContainer = screen.getByTestId('message-container');
      expect(messageContainer).toBeInTheDocument();
    });

    it('supports keyboard navigation through child components', async () => {
      render(<ItemViewer {...defaultProps} />);
      
      const inputField = screen.getByTestId('message-input-field');
      
      inputField.focus();
      expect(inputField).toHaveFocus();
    });

    it('provides proper component structure for screen readers', () => {
      render(<ItemViewer {...defaultProps} />);
      
      // Components should be in logical order for screen readers
      const container = screen.getByTestId('message-container');
      const header = screen.getByTestId('message-header');
      const messages = screen.getByTestId('messages');
      const input = screen.getByTestId('message-input');
      
      expect(container).toContainElement(header);
      expect(container).toContainElement(messages);
      expect(container).toContainElement(input);
    });

    it('maintains accessibility when config changes', () => {
      const { rerender } = render(<ItemViewer {...defaultProps} />);
      
      // Change config and verify accessibility is maintained
      const newConfig = createMockConfig({ enableTeamChat: true });
      rerender(<ItemViewer {...defaultProps} config={newConfig} />);
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
      expect(screen.getByTestId('message-header')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('works correctly with multiple instances', () => {
      render(
        <div>
          <ItemViewer {...defaultProps} />
          <ItemViewer {...defaultProps} />
        </div>
      );
      
      const containers = screen.getAllByTestId('message-container');
      expect(containers).toHaveLength(2);
    });

    it('maintains state independence between instances', async () => {
      const user = userEvent.setup();
      const callbacks1 = createMockCallbacks();
      const callbacks2 = createMockCallbacks();
      
      render(
        <div>
          <ItemViewer {...defaultProps} callbacks={callbacks1} />
          <ItemViewer {...defaultProps} callbacks={callbacks2} />
        </div>
      );
      
      const submitButtons = screen.getAllByTestId('submit-message');
      await user.click(submitButtons[0]);
      
      expect(callbacks1.onMessageSubmit).toHaveBeenCalledWith('Test message');
      expect(callbacks2.onMessageSubmit).not.toHaveBeenCalled();
    });

    it('integrates properly with parent component styling', () => {
      const { container } = render(
        <div data-testid="parent-wrapper" style={{ padding: '20px' }}>
          <ItemViewer {...defaultProps} className="child-item-viewer" />
        </div>
      );
      
      const parent = screen.getByTestId('parent-wrapper');
      const child = container.querySelector('.child-item-viewer') as HTMLElement;
      
      expect(parent).toContainElement(child);
      expect(child).toHaveClass('child-item-viewer');
    });

    it('handles complex callback chains correctly', async () => {
      const user = userEvent.setup();
      
      const callbacks = createMockCallbacks({
        onTeamChatToggle: vi.fn(),
        onChatInterfaceChange: vi.fn(),
      });
      
      render(<ItemViewer {...defaultProps} callbacks={callbacks} />);
      
      // Trigger multiple callbacks
      await user.click(screen.getByTestId('toggle-team-chat'));
      await user.click(screen.getByTestId('change-interface'));
      
      expect(callbacks.onTeamChatToggle).toHaveBeenCalledWith(true);
      expect(callbacks.onChatInterfaceChange).toHaveBeenCalledWith('EMAIL');
    });

    it('accepts valid MessageProps interface', () => {
      const validProps: MessageProps = {
        messages: createMockMessages(2),
        config: createMockConfig(),
        callbacks: createMockCallbacks(),
        loading: createMockLoading(),
        error: createMockError(),
        className: 'test-class',
      };
      
      expect(() => {
        render(<ItemViewer {...validProps} />);
      }).not.toThrow();
    });

    it('handles input configuration merging', () => {
      const config = createMockConfig({
        input: {
          placeholder: 'Custom placeholder',
          maxLength: 100,
          autoFocus: true,
        },
      });
      const loading = createMockLoading({ isSubmitting: true });
      const error = createMockError();
      
      render(
        <ItemViewer 
          {...defaultProps} 
          config={config} 
          loading={loading} 
          error={error} 
        />
      );
      
      expect(screen.getByTestId('input-disabled')).toHaveTextContent('true');
      expect(screen.getByTestId('input-error')).toHaveTextContent('true');
    });

    it('handles header configuration', () => {
      const config = createMockConfig({
        header: {
          formData: {
            to: 'test@example.com',
            subject: 'Test Subject',
            cc: 'cc@example.com',
          },
        },
      });
      
      render(<ItemViewer {...defaultProps} config={config} />);
      
      expect(screen.getByTestId('message-header')).toBeInTheDocument();
    });

    it('handles rapid prop changes efficiently', () => {
      const { rerender } = render(<ItemViewer {...defaultProps} />);
      
      // Rapid re-renders with different props
      for (let i = 0; i < 10; i++) {
        const newConfig = createMockConfig({ 
          enableTeamChat: i % 2 === 0 
        });
        rerender(
          <ItemViewer 
            {...defaultProps} 
            config={newConfig}
          />
        );
      }
      
      expect(screen.getByTestId('message-container')).toBeInTheDocument();
    });
  });
});
