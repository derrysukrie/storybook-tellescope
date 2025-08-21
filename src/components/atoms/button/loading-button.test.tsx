/** @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { LoadingButton } from './loading-button';

describe('LoadingButton', () => {
  it('exports component', () => {
    expect(LoadingButton).toBeDefined();
    expect(typeof LoadingButton).toBe('function');
  });

  it('renders children when not loading', () => {
    render(<LoadingButton>Submit</LoadingButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
    expect(document.querySelector('.MuiCircularProgress-root')).toBeNull();
  });

  it('disables button and shows spinner on start position', () => {
    render(
      <LoadingButton loading loadingPosition="start">Submit</LoadingButton>
    );
    const btn = screen.getByRole('button');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    expect(document.querySelector('.MuiCircularProgress-root')).not.toBeNull();
    // children should still be visible for start position
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('disables button and shows spinner on end position', () => {
    render(
      <LoadingButton loading loadingPosition="end">Pay</LoadingButton>
    );
    const btn = screen.getByRole('button');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    expect(document.querySelector('.MuiCircularProgress-root')).not.toBeNull();
    // children should still be visible for end position
    expect(screen.getByText('Pay')).toBeTruthy();
  });

  it('disables button and swaps children with center spinner + indicator', () => {
    render(
      <LoadingButton loading loadingPosition="center" loadingIndicator="Loading...">Save</LoadingButton>
    );
    const btn = screen.getByRole('button');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    expect(document.querySelector('.MuiCircularProgress-root')).not.toBeNull();
    // children hidden, indicator visible
    expect(screen.queryByText('Save')).toBeNull();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('maps appearance to MUI variant classes', () => {
    const { container, rerender } = render(
      <LoadingButton appearance="contained">A</LoadingButton>
    );
    expect(container.querySelector('.MuiButton-contained')).not.toBeNull();

    rerender(<LoadingButton appearance="outlined">A</LoadingButton>);
    expect(container.querySelector('.MuiButton-outlined')).not.toBeNull();

    rerender(<LoadingButton appearance="text">A</LoadingButton>);
    expect(container.querySelector('.MuiButton-text')).not.toBeNull();
  });

  it('forwards color to MUI', () => {
    const { container, rerender } = render(
      <LoadingButton appearance="contained" color="primary">A</LoadingButton>
    );
    expect(container.querySelector('.MuiButton-containedPrimary')).not.toBeNull();

    rerender(<LoadingButton appearance="contained" color="secondary">A</LoadingButton>);
    expect(container.querySelector('.MuiButton-containedSecondary')).not.toBeNull();

    rerender(<LoadingButton appearance="contained" color="info">A</LoadingButton>);
    expect(container.querySelector('.MuiButton-containedInfo')).not.toBeNull();
  });

  it('calls onClick when not loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LoadingButton onClick={onClick}>Go</LoadingButton>);
    await user.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when loading (disabled)', () => {
    const onClick = vi.fn();
    render(<LoadingButton loading onClick={onClick}>Go</LoadingButton>);
    const btn = screen.getByRole('button');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});


