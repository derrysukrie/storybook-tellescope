# ItemViewer - Fixed Architecture

This document outlines the corrected architecture for the ItemViewer component, which now properly implements the MessageProps interface and provides a unified API.

## Architecture Overview

### Before (Broken)
- Component ignored MessageProps interface
- Duplicate state management (local + hook)
- Inconsistent API design
- Redundant validation logic

### After (Fixed)
- Component properly implements MessageProps
- Single source of truth via useMessageState
- Consistent API design
- Centralized validation

## Usage

### Basic Usage
```tsx
import { ItemViewer } from './ItemViewer';
import type { MessageCallbacks } from '../../components/molecules/Message';

const callbacks: MessageCallbacks = {
  onMessageSubmit: (content) => {
    console.log('Message submitted:', content);
  },
  onInputChange: (value) => {
    console.log('Input changed:', value);
  },
  onChatInterfaceChange: (interface) => {
    console.log('Interface changed:', interface);
  },
  onTeamChatToggle: (enabled) => {
    console.log('Team chat toggled:', enabled);
  },
  onHeaderFormChange: (field, value) => {
    console.log('Header form changed:', field, value);
  },
  onMessageReaction: (messageId, reaction) => {
    console.log('Message reaction:', messageId, reaction);
  },
  onMessageOptions: (messageId, action) => {
    console.log('Message options:', messageId, action);
  },
};

<ItemViewer
  messages={messages}
  config={{
    enableTeamChat: true,
    chatInterface: "EMAIL",
    input: {
      placeholder: "Type a message...",
      maxLength: 500,
      showCharacterCount: true,
    },
    header: {
      showForm: true,
      formData: {
        to: "recipient@example.com",
        subject: "Test Email",
      },
    },
    container: {
      width: "800px",
      height: "600px",
    },
  }}
  callbacks={callbacks}
/>
```

### Advanced Usage with Error Handling
```tsx
import { ItemViewer } from './ItemViewer';
import type { MessageCallbacks, MessageError } from '../../components/molecules/Message';

const [error, setError] = useState<MessageError | null>(null);
const [loading, setLoading] = useState({ isSubmitting: false });

const callbacks: MessageCallbacks = {
  onMessageSubmit: async (content) => {
    setLoading({ isSubmitting: true });
    setError(null);
    
    try {
      await submitMessageToAPI(content);
    } catch (err) {
      setError({
        type: 'SUBMISSION',
        message: 'Failed to send message',
        code: 'API_ERROR'
      });
    } finally {
      setLoading({ isSubmitting: false });
    }
  },
  // ... other callbacks
};

<ItemViewer
  messages={messages}
  config={{
    enableTeamChat: false,
    chatInterface: "CHAT",
    input: {
      placeholder: "Type a message...",
      error: !!error,
      disabled: loading.isSubmitting,
    },
  }}
  callbacks={callbacks}
  error={error}
  loading={loading}
/>
```

## Component Structure

### ItemViewer.tsx
- Main component that implements MessageProps
- Uses useMessageState for centralized state management
- Renders MessageContainer, MessageHeader, Messages, and MessageInput

### useMessageState Hook
- Centralized state management
- Handles all validation logic
- Provides consistent actions interface
- Manages loading and error states

### MessageInput Component
- Simplified to focus on input handling
- Removes redundant validation
- Trusts parent state management

## Key Improvements

1. **Single Source of Truth**: All state managed through useMessageState
2. **Proper Interface Implementation**: Component actually uses MessageProps
3. **Consistent Error Handling**: Centralized error management
4. **Simplified Validation**: No duplicate validation logic
5. **Better Type Safety**: Full TypeScript compliance
6. **Cleaner API**: Consistent prop patterns

## Migration Guide

If you were using the old broken version:

```tsx
// Old (broken)
<ItemViewer /> // No props, internal state

// New (fixed)
<ItemViewer
  messages={messages}
  config={config}
  callbacks={callbacks}
/>
```

## Testing

The component now properly supports:
- Unit testing with mocked callbacks
- Integration testing with real state
- Error state testing
- Loading state testing
- Accessibility testing

## Performance

- Memoized state and actions
- Reduced re-renders through proper state management
- Efficient validation through centralized logic 