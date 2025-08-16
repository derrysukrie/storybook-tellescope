# MessageHeader Refactoring

This document outlines the refactoring of the MessageHeader component from a deeply nested structure to a flattened, more maintainable architecture.

## What Changed

### Before (Deeply Nested Structure)
```
MessageHeader/
├── components/
│   ├── EmptyHeader/
│   │   ├── EmptyHeaderChat.tsx
│   │   ├── EmptyHeaderEmail.tsx
│   │   ├── EmptyHeaderSMS.tsx
│   │   └── EmptyHeaderMMS.tsx
│   └── Header/
│       ├── HeaderChat.tsx
│       ├── HeaderEmail.tsx
│       ├── HeaderSMS.tsx
│       └── HeaderMMS.tsx
├── enums/
└── styles/
```

### After (Flattened Structure)
```
MessageHeader/
├── MessageHeader.tsx      # Main component
├── HeaderContent.tsx      # Handles display logic
├── HeaderForm.tsx         # Handles form inputs
├── HeaderActions.tsx      # Action buttons
├── types.ts              # TypeScript interfaces
├── index.ts              # Exports
└── README.md             # This file
```

## Key Benefits

1. **Reduced Nesting**: Eliminated 5+ level directory structure
2. **Code Reuse**: Single components handle multiple chat interfaces
3. **Better Imports**: Shorter, cleaner import paths
4. **Easier Testing**: Fewer components to test
5. **State Management**: Centralized form state in parent component
6. **Type Safety**: Comprehensive TypeScript interfaces

## Usage

### Basic Usage
```tsx
import { MessageHeader } from './MessageHeader';

<MessageHeader
  chatInterface="EMAIL"
  content={messageContent}
  enableTeamChat={false}
  setEnableTeamChat={setTeamChat}
/>
```

### With Form Data (for empty state)
```tsx
import { MessageHeader, type HeaderFormData } from './MessageHeader';

const [headerFormData, setHeaderFormData] = useState<HeaderFormData>({
  to: "",
  cc: "",
  from: "",
  subject: "",
  tags: []
});

const handleHeaderFormChange = (field: keyof HeaderFormData, value: string | string[]) => {
  setHeaderFormData(prev => ({ ...prev, [field]: value }));
};

<MessageHeader
  chatInterface="EMAIL"
  content={null} // Empty state
  enableTeamChat={false}
  setEnableTeamChat={setTeamChat}
  headerFormData={headerFormData}
  onHeaderFormChange={handleHeaderFormChange}
/>
```

## API Data Extraction

The refactored component enables easy extraction of all form data for API submission:

```tsx
const submitToAPI = async () => {
  const apiData = {
    headerForm: headerFormData,
    chatInterface: switchMode,
    teamChatEnabled: activateTeamChat,
    messages: contentData,
    timestamp: new Date().toISOString()
  };
  
  // Submit to your API
  await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiData)
  });
};
```

## Component Architecture

### MessageHeader.tsx
Main component that orchestrates the header display and manages props.

### HeaderContent.tsx
Handles the core display logic for both empty and filled states across all chat interfaces.

### HeaderForm.tsx
Manages form inputs for different chat interfaces (EMAIL, SMS, MMS, CHAT) when in empty state.

### HeaderActions.tsx
Reusable component for action buttons (call, video, close).

### types.ts
Defines TypeScript interfaces for type safety and better developer experience.

## Migration Guide

If you were previously importing from the old structure:

```tsx
// Old
import { MessageHeader } from '../../Message/container';

// New
import { MessageHeader } from '../../Message/MessageHeader';
```

The component API remains largely the same, with the addition of optional form data props for state lifting.