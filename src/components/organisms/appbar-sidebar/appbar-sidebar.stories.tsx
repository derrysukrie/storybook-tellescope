import type { Meta, StoryObj } from '@storybook/react-vite';
import AppbarSidebar from './appbar-sidebar';

const meta = {
    title: 'ORGANISMS/Appbar and Side Bar',
    component: AppbarSidebar,
    parameters: {
        controls: {
            include: ['color'],
        }
    },
    argTypes: {
        color: {
            options: ["standard", "transitional",],
            control: { type: "select" }
        }
    },
    args: {
        color: "standard",
    }
} satisfies Meta<typeof AppbarSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpandedSidebar: Story = {
    args: {

    },
    render: (args) => (
        <>
            <style>
                {`
            body.sb-main-padded.sb-show-main {
            padding: 0 !important;
            }
        `}
            </style>
            <AppbarSidebar {...args} expanded={true} />
        </>
    )
};