import type { Meta, StoryObj } from '@storybook/react-vite'
import TableTabsFiltersControls from './table-tabs-filters-controls'

const meta = {
    title: 'MOLECULES/Table Elements/Table tabs filters and controls',
    component: TableTabsFiltersControls,
    parameters: {
        controls: {
            include: [''],
        },
    },
} satisfies Meta<typeof TableTabsFiltersControls>

export default meta
type Story = StoryObj<typeof meta>

export const FilterReset: Story = {
    args: {
        tabs: [],
        tabPanels: [],
    },
    render: () => {
        return <TableTabsFiltersControls reset={true} />
    },
}
