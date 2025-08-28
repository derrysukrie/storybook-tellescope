import type { Meta, StoryObj } from '@storybook/react-vite'
import Textaraa from './textarea'

const meta = {
    title: 'ATOMS/FormInputs/Textarea',
    component: Textaraa,
    parameters: {
        controls: {
            exclude: ['label'],
        },
    },
    argTypes: {
        appearance: {
            options: ['filled'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof Textaraa>

export default meta
type Story = StoryObj<typeof meta>

export const Display: Story = {
    args: {
        appearance: 'filled',
        label: 'Label',
    },
}
