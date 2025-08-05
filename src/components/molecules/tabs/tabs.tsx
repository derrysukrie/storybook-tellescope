import { Add } from "@mui/icons-material";
import { Box, Tabs as MuiTabs, Tab, Typography } from "@mui/material";
import { useState, type FC, type JSX } from "react";

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
    appearance: "default" | "table";
    tabs: {
        label: string;
        icon: JSX.Element;
    }[],
    tabPanels: {
        content: JSX.Element;
    }[],
    icon?: boolean;
    value?: number;
    onChange?: (event: React.SyntheticEvent, newValue: number) => void;
    defaultTab?: number;

}

const Tabs: FC<TabsProps> = ({ tabs, tabPanels, appearance, icon = true, value, onChange, defaultTab }) => {
    const [selectedValue, setSelectedValue] = useState(value || defaultTab || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedValue(newValue);
        onChange?.(event, newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
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
                            bottom: 0,
                            '& > span': {
                                maxWidth: "calc(100%)",
                                width: '100%',
                                backgroundColor: appearance === "table" ? theme.palette.common.black : theme.palette.primary.main,
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
                        gap: appearance === "table" ? 2 : 3,
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
                                    backgroundColor: appearance === "table" ? "transparent" : undefined,
                                    color: appearance === "table" ? "common.black" : "primary.main",
                                }
                            }}
                            color="default"
                            iconPosition="start"
                            icon={icon ? tab.icon : undefined}
                            label={
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{tab.label}</Typography>
                            }
                            {...a11yProps(index)}
                        />
                    ))
                }
                {
                    appearance === "table" ? (
                        <Tab
                            disableRipple
                            sx={{
                                padding: 0,
                                minHeight: "35px",
                                minWidth: "fit-content",
                                color: "#8C90A1",
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
                    ) : null
                }
            </MuiTabs>
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

export default Tabs