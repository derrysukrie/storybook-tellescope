/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from './Avatar';
import { AvatarSizeValues } from '../../../shared';
import type { AvatarSize } from '../../../shared/types/avatar.types';

function renderWithTheme(element: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
}

describe('Avatar (RTL)', () => {
  it('exports component', () => {
    expect(Avatar).toBeDefined();
    expect(typeof Avatar).toBe('function');
  });

  it('renders initials without badge', () => {
    renderWithTheme(<Avatar>OP</Avatar>);
    expect(screen.getByText('OP')).toBeTruthy();
  });

  it('renders with badge when badge=true', () => {
    const { container } = renderWithTheme(<Avatar badge>OP</Avatar>);
    expect(screen.getByText('OP')).toBeTruthy();
    expect(container.querySelector('.MuiBadge-root')).not.toBeNull();
    expect(container.querySelector('.MuiBadge-dot')).not.toBeNull();
  });

  it('passes alt and src to underlying image', () => {
    renderWithTheme(
      <Avatar alt="User Photo" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />
    );
    const img = screen.getByRole('img', { name: 'User Photo' });
    expect(img).toBeTruthy();
    expect((img as HTMLImageElement).src).toContain('data:image/gif;base64');
  });

  it('applies size styles based on size prop', () => {
    const xs = AvatarSizeValues.extraSmall as unknown as AvatarSize;
    const lg = AvatarSizeValues.large as unknown as AvatarSize;
    const { rerender } = renderWithTheme(<Avatar size={xs}>A</Avatar>);
    // Emotion injects dynamic CSS into <head>. Validate height/width values present.
    expect(document.head.innerHTML).toContain('height:24');
    expect(document.head.innerHTML).toContain('width:24');

    rerender(
      <ThemeProvider theme={createTheme()}>
        <Avatar size={lg}>A</Avatar>
      </ThemeProvider>
    );
    expect(document.head.innerHTML).toContain('height:56');
    expect(document.head.innerHTML).toContain('width:56');
  });

  it('applies color border based on color prop', () => {
    renderWithTheme(<Avatar color="primary">A</Avatar>);
    // Border uses CSS var; ensure rule emitted by Emotion
    expect(document.head.innerHTML).toContain('var(--primary-light)');
  });
});


