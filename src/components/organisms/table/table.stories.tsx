import type { Meta, StoryObj } from '@storybook/react-vite'
import Table from './table'

const meta = {
    title: 'ORGANISMS/Table',
    component: Table,
    parameters: {
        controls: {
            include: ['color'],
        },
    },
    argTypes: {
        color: {
            options: ['standard', 'transitional'],
            control: { type: 'select' },
        },
    },
    args: {
        color: 'standard',
        expanded: true,
    },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const ContactsList: Story = {
    render: args => (
        <>
            <style>
                {`
                    body.sb-main-padded.sb-show-main {
                    padding: 0 !important;
                    }
                `}
            </style>
            <Table {...args} expanded={false} />
        </>
    ),
}
