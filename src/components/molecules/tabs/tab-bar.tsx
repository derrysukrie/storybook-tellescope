import { Add } from "@mui/icons-material";
import { Box, Tabs as MuiTabs, Stack, Tab, Typography } from "@mui/material";
import { useState, type FC, type JSX, type ReactNode } from "react";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


interface TabsProps {
    tabs: {
        label: string;
        icon: JSX.Element;
    }[],
    tabPanels: {
        content: JSX.Element;
    }[],
    value?: number;
    onChange?: (event: React.SyntheticEvent, newValue: number) => void;

    tableControls?: ReactNode;
    defaultTab?: number;
}

const TabBar: FC<TabsProps> = ({ tabs, tabPanels, value, onChange, tableControls, defaultTab }) => {
    const [selectedValue, setSelectedValue] = useState(value || defaultTab || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedValue(newValue);
        onChange?.(event, newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: 1, borderColor: 'divider' }}>
                <MuiTabs
                    value={selectedValue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                        sx: (theme) => (
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                '& > span': {
                                    maxWidth: "calc(100%)",
                                    width: '100%',
                                    backgroundColor: theme.palette.common.black,
                                    borderRadius: '100px 100px 0 0',
                                    height: 3,
                                },
                            }
                        ),
                        children: <span />,
                    }}
                    sx={{
                        minHeight: "auto",
                        "& .MuiTabs-flexContainer": {
                            gap: 2,
                        }
                    }}
                >
                    {
                        tabs.map((tab, index) => (
                            <Tab
                                disableRipple
                                key={index}
                                sx={{
                                    padding: 0,
                                    minHeight: "35px",
                                    minWidth: "fit-content",
                                    "&.Mui-selected": {
                                        backgroundColor: "transparent",
                                        color: "common.black",
                                    }
                                }}
                                color="default"
                                iconPosition="start"
                                icon={tab.icon}

                                label={
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{tab.label}</Typography>
                                }
                                {...a11yProps(index)}
                            />
                        ))
                    }
                    {
                        <Tab
                            disableRipple
                            sx={{
                                padding: 0,
                                minHeight: "35px",
                                minWidth: "fit-content",
                                "&.Mui-selected": {
                                    backgroundColor: "transparent",
                                    color: "common.black",
                                }
                            }}
                            color="default"
                            iconPosition="start"
                            icon={<Add />}
                            {...a11yProps(tabs.length)}
                        />
                    }
                </MuiTabs>
                <Stack sx={{ flexDirection: "row", gap: 1, }}>
                    {
                        tableControls
                    }
                </Stack>
            </Stack>
            {
                tabPanels.map((panel, index) => (
                    <CustomTabPanel value={selectedValue} index={index} key={index}>
                        {panel.content}
                    </CustomTabPanel>
                ))
            }
        </Box>
    )
}

export default TabBar