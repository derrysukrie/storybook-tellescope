import type { Meta, StoryObj } from '@storybook/react-vite';
import SwitchToggle from './switch-toggle';
import { useState } from 'react';
import { Badge, Stack, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const meta = {
    title: 'ATOMS/Switch/Switch Toggle',
    component: SwitchToggle,
    parameters: {
        controls: {
            include: [''],
        },
    },
    argTypes: {
        color: {
            options: ["default", 'primary', 'secondary', 'info'],
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
            options: ['medium', 'small'],
        },
        checked: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
        onChange: {
            action: 'changed',
        },
    },
} satisfies Meta<typeof SwitchToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileTimeTrackingToggle: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <SwitchToggle
                color="info"
                value="timeTracking"
                name="timeTracking"
                checked={checked}
                onChange={(e, checked) => setChecked(checked)}
                label={
                    <Stack sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: checked ? 1 : 0,
                        px: 1,
                        transition: "padding 0.3s ease",
                    }}>
                        <TimerOutlinedIcon
                            sx={{
                                color: checked ? "rgba(242, 117, 92, 1)" : undefined,
                                transition: "color 0.3s ease-in-out",
                            }}
                        />
                        <WifiCalling3OutlinedIcon
                            sx={{
                                color: "rgba(242, 117, 92, 1)",
                                opacity: checked ? 1 : 0,
                                maxWidth: checked ? 24 : 0,
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                            }}
                        />
                    </Stack>
                }
                formlabelProps={{
                    sx: {
                        background: checked ? 'rgba(254, 231, 211, 1)' : undefined,
                    },
                }}
            />
        )
    }
};

export const AppBarTimeTrackingToggle: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <SwitchToggle
                color="info"
                value="appBarTimeTracking"
                name="appBarTimeTracking"
                checked={checked}
                onChange={(e, checked) => setChecked(checked)}
                label={
                    <Stack sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: checked ? 1 : 0,
                        px: 1,
                        transition: "all 0.3s ease",
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "rgba(242, 117, 92, 1)",
                                fontWeight: 600,
                                opacity: checked ? 1 : 0,
                                maxWidth: checked ? 200 : 0,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                transition: "all 0.3s ease",
                                userSelect: "none",
                            }}
                        >
                            Name
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "rgba(242, 117, 92, 1)",
                                fontWeight: 600,
                                opacity: checked ? 1 : 0,
                                maxWidth: checked ? 200 : 0,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                userSelect: "none",
                                transition: "all 0.3s ease",
                            }}
                        >
                            00:00
                        </Typography>
                        <TimerOutlinedIcon
                            sx={{
                                color: checked ? "rgba(242, 117, 92, 1)" : undefined,
                                transition: "color 0.3s ease-in-out",
                            }}
                        />
                        <WifiCalling3OutlinedIcon
                            sx={{
                                color: "rgba(242, 117, 92, 1)",
                                opacity: checked ? 1 : 0,
                                maxWidth: checked ? 24 : 0,
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                            }}
                        />
                    </Stack>
                }
                formlabelProps={{
                    sx: {
                        background: checked ? 'rgba(254, 231, 211, 1)' : undefined,
                    },
                }}
            />
        )
    }
};

export const TeamChatToggle: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <SwitchToggle
                color="info"
                value="teamChat"
                name="teamChat"
                checked={checked}
                onChange={(e, checked) => setChecked(checked)}
                label={
                    <Stack sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        px: 1,
                        transition: "padding 0.3s ease",
                    }}>
                        <Badge color="secondary" variant="dot" invisible={checked} sx={{
                            "& .MuiBadge-badge.MuiBadge-dot": {
                                minWidth: 6,
                                height: 6,
                                bgcolor: "rgba(139, 92, 242, 1)",
                                top: "10%",
                                right: "10%",
                            },
                        }}>
                            <GroupsOutlinedIcon
                                sx={{
                                    color: checked ? "rgba(139, 92, 242, 1)" : undefined,
                                    // mr: 1,
                                    transition: "color 0.3s ease-in-out",
                                }}
                            />
                        </Badge>

                    </Stack>
                }
                formlabelProps={{
                    sx: {
                        background: checked ? 'rgba(222, 211, 254, 1)' : undefined,
                    },
                }}
            />
        )
    }
};