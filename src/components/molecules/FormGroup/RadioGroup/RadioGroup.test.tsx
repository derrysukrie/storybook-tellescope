/** @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  it('renders label, helper text, and all radio options', () => {
    render(
      <RadioGroup label="Fruits" helperText="Pick one" options={options} onChange={() => {}} />
    );

    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Pick one')).toBeInTheDocument();

    expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Cherry' })).toBeInTheDocument();
  });

  it('calls onChange with selected value when an option is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup label="Fruits" helperText="Pick one" options={options} onChange={onChange} />
    );

    await user.click(screen.getByRole('radio', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith('banana');
  });
});


