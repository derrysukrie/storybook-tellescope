import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import { Badge, Stack } from '@mui/material'
import SwitchToggle from '../../../atoms/switch-toggle/switch-toggle'

type TeamChatSwitchProps = {
    checked: boolean
    setChecked: (value: boolean) => void
}

export const TeamChatSwitch = ({ checked, setChecked }: TeamChatSwitchProps) => {
    return (
        <SwitchToggle
            color="info"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            label={
                <Stack
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        px: 1,
                        transition: 'padding 0.3s ease',
                    }}
                >
                    <Badge
                        color="secondary"
                        variant="dot"
                        invisible={checked}
                        sx={{
                            '& .MuiBadge-badge.MuiBadge-dot': {
                                minWidth: 6,
                                height: 6,
                                bgcolor: 'rgba(139, 92, 242, 1)',
                                top: '10%',
                                right: '10%',
                            },
                        }}
                    >
                        <GroupsOutlinedIcon
                            sx={{
                                color: checked ? 'rgba(139, 92, 242, 1)' : undefined,
                                // mr: 1,
                                transition: 'color 0.3s ease-in-out',
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
