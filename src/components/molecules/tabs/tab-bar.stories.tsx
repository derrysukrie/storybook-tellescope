import type { Meta, StoryObj } from '@storybook/react-vite';
import TabBar from './tab-bar';
import { Typography } from '@mui/material';
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded';
import { IconButton } from '../../atoms/button/icon-button';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SearchIcon from '@mui/icons-material/Search';

const meta = {
    title: 'MOLECULES/Tabs',
    component: TabBar,
    parameters: {
        controls: {
            include: [''],
        },
    },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabPanels = [
    {
        content: <Typography variant="body2" sx={{ p: 2 }}>Content for Tab 1</Typography>
    },
    {
        content: <Typography variant="body2" sx={{ p: 2 }}>Content for Tab 2</Typography>
    },
];

const tabsTable = [
    {
        label: "All Contacts",
        icon: <CalendarViewMonthRoundedIcon />
    },
    {
        label: "Patients",
        icon: <CalendarViewMonthRoundedIcon />
    },
];

export const Topbar: Story = {
    args: {
        tabs: [],
        tabPanels: [],
    },
    render: () => {
        return (
            <TabBar
                tabs={tabsTable}
                tabPanels={tabPanels}
                tableControls={
                    <>
                        <IconButton color="default" size="small">
                            <FilterListIcon />
                        </IconButton>
                        <IconButton color="default" size="small">
                            <SwapVertIcon />
                        </IconButton>
                        <IconButton color="default" size="small">
                            <SearchIcon />
                        </IconButton>
                    </>
                }
            />
        )
    }
}