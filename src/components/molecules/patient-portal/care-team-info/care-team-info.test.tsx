import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CareTeamInfo } from './care-team-info';

describe('CareTeamInfo', () => {
  it('renders header and avatar', () => {
    render(<CareTeamInfo />);
    expect(screen.getByText('Bok')).toBeInTheDocument();
    expect(screen.getByText('Care Team')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('actions=1: renders one centered button', () => {
    render(<CareTeamInfo actions={1} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
  });

  it('actions=2: renders EMAIL and CHAT', () => {
    render(<CareTeamInfo actions={2} />);
    expect(screen.getByRole('button', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
  });

  it('actions=3: renders EMAIL, CALL, CHAT', () => {
    render(<CareTeamInfo actions={3} />);
    expect(screen.getByRole('button', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /call/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
  });
});


