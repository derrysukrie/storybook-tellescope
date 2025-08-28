import type { Meta, StoryObj } from '@storybook/react-vite'
import Textaraa from './textarea'

const meta = {
    title: 'ATOMS/FormInputs/Textarea',
    component: Textaraa,
    parameters: {
        controls: {
            exclude: ['label', 'error'],
        },
    },
    argTypes: {
        appearance: {
            options: ['standard', 'filled', 'outlined', 'patientForm'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof Textaraa>

export default meta
type Story = StoryObj<typeof meta>

export const ErrorTextarea: Story = {
    args: {
        appearance: 'standard',
        label: 'Label',
        error: true,
    },
}
