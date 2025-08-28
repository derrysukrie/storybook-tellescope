import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './Slider'

const meta = {
    title: 'ATOMS/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        stepper: {
            control: 'boolean',
            description: 'Whether to show stepper controls',
        },
    },
    args: {
        stepper: false,
    },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        stepper: false,
        sx: {
            width: 500,
        },
    },
}

export const WithStepper: Story = {
    args: {
        min: 0,
        max: 100,
        step: 10,
        shiftStep: 10,
        marks: true,
        stepper: true,
        sx: {
            width: 500,
        },
        onChange: (_, value) => {
            console.log(value)
        },
    },
}
