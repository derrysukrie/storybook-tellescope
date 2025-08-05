import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from './tabs';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded';

const meta = {
    title: 'MOLECULES/Tabs',
    component: Tabs,
    parameters: {
        controls: {
            include: ['appearance', 'icon'],
        },
    },
    argTypes: {
        appearance: {
            control: { type: 'select', options: ['default', 'table'] },
        },
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
    {
        label: "Tab",
        icon: <StarIcon />
    },
    {
        label: "Tab",
        icon: <StarIcon />
    },
    {
        label: "Tab",
        icon: <StarIcon />
    }
];
const tabPanels = [
    {
        content: <Typography variant="body2" sx={{ p: 2 }}>Content for Tab 1</Typography>
    },
    {
        content: <Typography variant="body2" sx={{ p: 2 }}>Content for Tab 2</Typography>
    },
    {
        content: <Typography variant="body2" sx={{ p: 2 }}>Content for Tab 3</Typography>
    }
];

const tabsTable = [
    {
        label: "Tab",
        icon: <CalendarViewMonthRoundedIcon />
    },
    {
        label: "Tab",
        icon: <CalendarViewMonthRoundedIcon />
    },
];

export const Standard: Story = {
    args: {
        tabs: [],
        tabPanels: [],
        appearance: "table",
        icon: true,
    },
    render: ({ appearance, icon }) => {

        return (
            <Tabs
                tabs={appearance === "table" ? tabsTable : tabs}
                tabPanels={tabPanels}
                appearance={appearance}
                icon={icon}
            />
        )
    }
}