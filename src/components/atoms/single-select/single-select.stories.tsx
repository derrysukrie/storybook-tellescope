import type { Meta, StoryObj } from '@storybook/react-vite';
import SingleSelect from './single-select';

const meta = {
    title: 'ATOMS/Single Select',
    component: SingleSelect,
    parameters: {
        controls: {
            include: ["appearance"],
        }
    },
    argTypes: {
        "appearance": {
            control: {
                type: 'select',
                options: ['enabled', 'hovered', 'selected'],
            },
        }
    }
} satisfies Meta<typeof SingleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'This is a selectable  question ',
    },
}