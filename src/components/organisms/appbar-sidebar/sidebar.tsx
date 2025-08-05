import { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ForumIcon from '@mui/icons-material/Forum';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import StorageIcon from '@mui/icons-material/Storage';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ShareIcon from '@mui/icons-material/Share';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useAppbarSidebarContext } from "./context";


const COLLAPSED_WIDTH = 48;
const EXPANDED_WIDTH = 205;

const sidebarItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        text: "Analytics",
        icon: <BarChartIcon />,
    },
    {
        text: "Calendar",
        icon: <CalendarTodayIcon />,
    },
    {
        text: "Email",
        icon: <EmailIcon />,
    },
    {
        text: "Contacts",
        icon: <GroupIcon />,
    },
    {
        text: "Orders",
        icon: <CompareArrowsIcon />,
    },
    {
        text: "Shipping",
        icon: <LocalShippingIcon />,
    },
    {
        text: "Delivery",
        icon: <AccessTimeIcon />,
    },
    {
        text: "Chat",
        icon: <ChatBubbleIcon />,
    },
    {
        text: "Tasks",
        icon: <AssignmentIcon />,
    },
    {
        text: "Reports",
        icon: <TrendingUpIcon />,
    },
    {
        text: "Forum",
        icon: <ForumIcon />,
    },
    {
        text: "Files",
        icon: <FolderIcon />,
    },
    {
        text: "Documents",
        icon: <InsertDriveFileIcon />,
    },
    {
        text: "Storage",
        icon: <StorageIcon />,
    },
    {
        text: "Mobile App",
        icon: <PhoneIphoneIcon />,
    },
    {
        text: "Share",
        icon: <ShareIcon />,
    },
    {
        text: "Shop",
        icon: <LocalMallIcon />,
    },
    {
        text: "Tables",
        icon: <TableChartIcon />,
    }
];

const Sidebar = () => {
    const { bgColor: contextBgColor, expanded: contextExpanded, setExpanded } = useAppbarSidebarContext()
    const [collapsed, setCollapsed] = useState(!contextExpanded);

    return (
        <Stack>
            <List
                sx={{
                    width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
                    transition: "width 0.2s",
                    height: "calc(100vh - 64px)",
                    overflowY: "auto",
                    padding: 0,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    msOverflowStyle: "none",
                }}
            >
                <ListItem
                    sx={{
                        justifyContent: "center",
                        userSelect: "none",
                        height: 48,
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        background: contextBgColor,
                    }}
                    onClick={() => {
                        setCollapsed((prev) => !prev);
                        setExpanded(!contextExpanded);
                    }}
                >
                    <ListItemIcon sx={{
                        justifyContent: "center",
                    }}>
                        <KeyboardArrowLeftIcon
                            sx={{
                                transform: collapsed ? "rotate(180deg)" : "none",
                                transition: "transform 0.2s"
                            }}
                        />
                    </ListItemIcon>
                </ListItem>
                {sidebarItems.map(({ text, icon }, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            height: 48,
                            padding: collapsed ? 1.5 : undefined,
                            transition: "0.2s",
                        }}
                    >
                        <ListItemIcon sx={{
                        }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            sx={{
                                opacity: 0.7,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                transition: "0.2s",
                                width: collapsed ? 0 : "auto",
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
};

export default Sidebar;
