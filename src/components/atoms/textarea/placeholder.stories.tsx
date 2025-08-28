import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Textaraa from './textarea'

const meta = {
    title: 'ATOMS/FormInputs/Textarea',
    component: Textaraa,
    parameters: {
        controls: {
            include: ['appearance'],
        },
    },
    argTypes: {
        appearance: {
            options: ['standard', 'filled', 'outlined', 'patientForm'],
            control: { type: 'select' },
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Textaraa>

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
    args: {
        appearance: 'standard',
        label: 'Label',
        placeholder: 'Placeholder',
    },
}
