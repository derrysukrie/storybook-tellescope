import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TagIcon from '@mui/icons-material/Tag';
import DetailSelectPending from './detail-select-pending';


type StoryProps = ComponentProps<typeof DetailSelectPending> & {
    active: boolean;
}

const meta = {
    title: 'MOLECULES/Table Elements/Detail Select',
    component: DetailSelectPending,
    parameters: {
        controls: {
            include: ["active",],
        },
    },
    argTypes: {
        active: {
            control: { type: 'boolean' },
        },
    },
    args: {
        active: false,
    }
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

const availableFilterFields = [
    { label: "Name", value: "name", icon: <PersonOutlineOutlinedIcon /> },
    { label: "Care Team", value: "care team", icon: <GroupOutlinedIcon /> },
    { label: "Share Team", value: "share team", icon: <GroupOutlinedIcon /> },
    { label: "Journeys", value: "journeys", icon: <ShowChartIcon /> },
    { label: "Tags", value: "tags", icon: <TagIcon /> }
];



export const Pending: Story = {
    render: ({ active }) => {

        /*
            - This methods helps developer make the component more interactive.
            * onChangeFilter
        */

        return (
            <DetailSelectPending
                open={active}
                availableFilterFields={availableFilterFields}
            // onChangeFilter={(field) => console.log("Filter changed", { field })}
            />
        )
    }
};


/*
    - Fixing Children Prop 
*/