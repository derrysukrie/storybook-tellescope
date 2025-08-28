import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import CallIcon from '@mui/icons-material/Call'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined'
import { Avatar, Badge, AppBar as MUIAppbar, Stack } from '@mui/material'
import { IconButton } from '../../atoms/button/icon-button'
import { AppbarSearch } from '../../atoms/input/app-bar-search'
import { useAppbarSidebarContext } from './context'

const Appbar = () => {
    const { bgColor: contextBgColor } = useAppbarSidebarContext()
    return (
        <MUIAppbar
            position="sticky"
            sx={{
                boxShadow: 'none',
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 24px',
                flexDirection: 'row',
                background: contextBgColor,
            }}
        >
            <img src="logo.png" alt="Logo" width={154} height={32} />
            <Stack
                sx={{
                    flexDirection: 'row',
                    gap: '24px',
                    alignItems: 'center',
                }}
            >
                <AppbarSearch placeholder="Search database" />
                <Stack
                    sx={{
                        flexDirection: 'row',
                        gap: '8px',
                    }}
                >
                    {[WifiCalling3OutlinedIcon, AccountBalanceWalletOutlinedIcon].map(
                        (Ele, index) => (
                            <IconButton
                                color="default"
                                size="small"
                                key={index.toString()}
                                sx={{
                                    color: '#000',
                                }}
                            >
                                <Ele />
                            </IconButton>
                        )
                    )}
                    <IconButton
                        color="default"
                        aria-label={`${1} notifications`}
                        sx={{
                            color: '#000',
                        }}
                        size="small"
                    >
                        <Badge
                            badgeContent={1}
                            color="error"
                            sx={{
                                '.MuiBadge-badge': {
                                    top: 6,
                                    right: 0,
                                    width: 16,
                                    height: 16,
                                    fontSize: 10,
                                    borderRadius: '50%',
                                    minWidth: 16,
                                },
                            }}
                        >
                            <InfoOutlinedIcon />
                        </Badge>
                    </IconButton>
                    {[
                        AccessAlarmOutlinedIcon,
                        NotificationsNoneOutlinedIcon,
                        HelpOutlineOutlinedIcon,
                    ].map((Ele, index) => (
                        <IconButton
                            key={index.toString()}
                            color="default"
                            sx={{
                                color: '#000',
                            }}
                            size="small"
                        >
                            <Ele />
                        </IconButton>
                    ))}
                </Stack>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                        <Badge
                            badgeContent={
                                <CallIcon
                                    sx={{
                                        width: 8,
                                        height: 8,
                                    }}
                                />
                            }
                            color="success"
                            overlap="circular"
                            sx={{
                                '.MuiBadge-badge ': {
                                    width: '16px',
                                    height: '16px',
                                    minWidth: '16px',
                                },
                            }}
                        ></Badge>
                    }
                >
                    <Avatar alt="OP" src="avatar.png" />
                </Badge>
            </Stack>
        </MUIAppbar>
    )
}

export default Appbar
