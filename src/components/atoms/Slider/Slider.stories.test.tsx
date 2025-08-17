import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react-vite';
import * as stories from './Slider.stories';
import { Slider } from './Slider';

const { Default, WithStepper } = composeStories(stories);

describe('Slider Component', () => {
  it('exports Slider component', () => {
    expect(Slider).toBeDefined();
    expect(typeof Slider).toBe('function');
  });

  it('has Default story', () => {
    expect(Default).toBeDefined();
    expect(Default.args).toBeDefined();
  });

  it('has WithStepper story', () => {
    expect(WithStepper).toBeDefined();
    expect(WithStepper.args).toBeDefined();
  });

  it('WithStepper story has correct props', () => {
    expect(WithStepper.args?.min).toBe(0);
    expect(WithStepper.args?.max).toBe(100);
    expect(WithStepper.args?.step).toBe(10);
    expect(WithStepper.args?.stepper).toBe(true);
  });

  it('Default story has correct props', () => {
    expect(Default.args?.stepper).toBe(false);
    expect(Default.args?.sx).toBeDefined();
  });
});
