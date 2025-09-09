import  { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SuggestedActions } from './SuggestedActions';

describe('SuggestedActions', () => {
  it('renders with default props', () => {
    render(<SuggestedActions expanded={false} />);
    expect(screen.getByRole('img', { name: /bulb/i })).toBeInTheDocument();
  });

  it('renders with expanded prop', () => {
    render(<SuggestedActions expanded={true} />);
    expect(screen.getByRole('img', { name: /bulb-active/i })).toBeInTheDocument();
  });
});