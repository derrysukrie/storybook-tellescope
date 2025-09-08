import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderedList } from './OrderedList';

// Mock DataTransfer API for drag and drop tests
const mockDataTransfer = {
  effectAllowed: 'move',
  dropEffect: 'move',
  setData: vi.fn(),
  getData: vi.fn(),
  clearData: vi.fn(),
  files: [],
  items: [],
  types: [],
};

// Mock drag events with proper dataTransfer
const createDragEvent = (type: string, target: Element) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', {
    value: mockDataTransfer,
    writable: false,
  });
  Object.defineProperty(event, 'target', {
    value: target,
    writable: false,
  });
  Object.defineProperty(event, 'currentTarget', {
    value: target,
    writable: false,
  });
  return event;
};

beforeEach(() => {
  vi.clearAllMocks();
});

const mockList = [
  { id: 1, title: 'First Item', description: 'First description' },
  { id: 2, title: 'Second Item', description: 'Second description' },
  { id: 3, title: 'Third Item', description: 'Third description' },
];

describe('OrderedList', () => {
  it('renders queue title and all list items', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    expect(screen.getByText('Queue Title')).toBeInTheDocument();
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
    
    // Check descriptions
    expect(screen.getByText('First description')).toBeInTheDocument();
    expect(screen.getByText('Second description')).toBeInTheDocument();
    expect(screen.getByText('Third description')).toBeInTheDocument();
  });

  it('renders cloud download icon in header', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const cloudIcon = screen.getByAltText('Cloud Download');
    expect(cloudIcon).toBeInTheDocument();
    expect(cloudIcon).toHaveAttribute('width', '16');
    expect(cloudIcon).toHaveAttribute('height', '16');
  });

  it('renders action buttons for each item', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const getNextButtons = screen.getAllByText('GET NEXT TICKET');
    expect(getNextButtons).toHaveLength(3);
    
    // Check for icon buttons (ticket and edit icons)
    const iconButtons = screen.getAllByRole('button');
    expect(iconButtons.length).toBeGreaterThan(3); // 3 GET NEXT TICKET + icon buttons
  });

  it('reorders items on drag and drop', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const firstItem = screen.getByText('First Item').closest('li');
    const secondItem = screen.getByText('Second Item').closest('li');
    
    // Simulate drag and drop with proper events
    const dragStartEvent = createDragEvent('dragstart', firstItem!);
    const dragOverEvent = createDragEvent('dragover', secondItem!);
    const dropEvent = createDragEvent('drop', secondItem!);
    
    fireEvent(firstItem!, dragStartEvent);
    fireEvent(secondItem!, dragOverEvent);
    fireEvent(secondItem!, dropEvent);
    
    // Verify setList was called with a function
    expect(setList).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the function behavior
    const updateFunction = setList.mock.calls[0][0];
    const result = updateFunction(mockList);
    
    expect(result).toEqual([
      { id: 2, title: 'Second Item', description: 'Second description' },
      { id: 1, title: 'First Item', description: 'First description' },
      { id: 3, title: 'Third Item', description: 'Third description' },
    ]);
  });

  it('shows visual feedback during drag', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const firstItem = screen.getByText('First Item').closest('li');
    
    const dragStartEvent = createDragEvent('dragstart', firstItem!);
    fireEvent(firstItem!, dragStartEvent);
    
    // Check if dragged item has highlighted background
    expect(firstItem).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.05)' });
  });

  it('ignores drop on same item', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const firstItem = screen.getByText('First Item').closest('li');
    
    const dragStartEvent = createDragEvent('dragstart', firstItem!);
    const dragOverEvent = createDragEvent('dragover', firstItem!);
    const dropEvent = createDragEvent('drop', firstItem!);
    
    fireEvent(firstItem!, dragStartEvent);
    fireEvent(firstItem!, dragOverEvent);
    fireEvent(firstItem!, dropEvent);
    
    expect(setList).not.toHaveBeenCalled();
  });

  it('handles drag over correctly', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const firstItem = screen.getByText('First Item').closest('li');
    const secondItem = screen.getByText('Second Item').closest('li');
    
    // Test drag over
    const dragStartEvent = createDragEvent('dragstart', firstItem!);
    const dragOverEvent = createDragEvent('dragover', secondItem!);
    
    fireEvent(firstItem!, dragStartEvent);
    fireEvent(secondItem!, dragOverEvent);
    
    // Should not call setList on drag over
    expect(setList).not.toHaveBeenCalled();
  });

  it('handles empty list', () => {
    const setList = vi.fn();
    render(<OrderedList list={[]} setList={setList} title="Test Queue" />);
    
    expect(screen.getByText('Queue Title')).toBeInTheDocument();
    expect(screen.queryByText('First Item')).not.toBeInTheDocument();
  });

  it('handles single item list', () => {
    const singleItemList = [{ id: 1, title: 'Only Item', description: 'Only description' }];
    const setList = vi.fn();
    render(<OrderedList list={singleItemList} setList={setList} title="Test Queue" />);
    
    expect(screen.getByText('Only Item')).toBeInTheDocument();
    
    const onlyItem = screen.getByText('Only Item').closest('li');
    
    // Drag and drop on itself should be ignored
    const dragStartEvent = createDragEvent('dragstart', onlyItem!);
    const dragOverEvent = createDragEvent('dragover', onlyItem!);
    const dropEvent = createDragEvent('drop', onlyItem!);
    
    fireEvent(onlyItem!, dragStartEvent);
    fireEvent(onlyItem!, dragOverEvent);
    fireEvent(onlyItem!, dropEvent);
    
    expect(setList).not.toHaveBeenCalled();
  });

  it('reorders items correctly when dragging to different positions', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const firstItem = screen.getByText('First Item').closest('li');
    const thirdItem = screen.getByText('Third Item').closest('li');
    
    // Drag first item to third position
    const dragStartEvent = createDragEvent('dragstart', firstItem!);
    const dragOverEvent = createDragEvent('dragover', thirdItem!);
    const dropEvent = createDragEvent('drop', thirdItem!);
    
    fireEvent(firstItem!, dragStartEvent);
    fireEvent(thirdItem!, dragOverEvent);
    fireEvent(thirdItem!, dropEvent);
    
    // Verify setList was called with a function
    expect(setList).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the function behavior
    const updateFunction = setList.mock.calls[0][0];
    const result = updateFunction(mockList);
    
    expect(result).toEqual([
      { id: 2, title: 'Second Item', description: 'Second description' },
      { id: 3, title: 'Third Item', description: 'Third description' },
      { id: 1, title: 'First Item', description: 'First description' },
    ]);
  });

  it('renders drag indicators for each item', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    // Check that all list items are draggable
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach(item => {
      expect(item).toHaveAttribute('draggable', 'true');
    });
  });

  it('calls setList with function when provided', () => {
    const setList = vi.fn();
    render(<OrderedList list={mockList} setList={setList} title="Test Queue" />);
    
    const firstItem = screen.getByText('First Item').closest('li');
    const secondItem = screen.getByText('Second Item').closest('li');
    
    const dragStartEvent = createDragEvent('dragstart', firstItem!);
    const dragOverEvent = createDragEvent('dragover', secondItem!);
    const dropEvent = createDragEvent('drop', secondItem!);
    
    fireEvent(firstItem!, dragStartEvent);
    fireEvent(secondItem!, dragOverEvent);
    fireEvent(secondItem!, dropEvent);
    
    // Verify setList was called with a function
    expect(setList).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the function behavior
    const updateFunction = setList.mock.calls[0][0];
    const result = updateFunction(mockList);
    
    expect(result).toEqual([
      { id: 2, title: 'Second Item', description: 'Second description' },
      { id: 1, title: 'First Item', description: 'First description' },
      { id: 3, title: 'Third Item', description: 'Third description' },
    ]);
  });
});
