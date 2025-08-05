import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import Reset from './reset';

type StoryProps = ComponentProps<typeof Reset>

const meta = {
    title: 'ATOMS/TableControlElements/Reset',
    component: Reset,
    parameters: {
        controls: {
            exclude: ["small", "children", "value", "onChange"],
        },
    },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {

        return (
            <Reset>

            </Reset>
        )
    }
}