import type { Meta, StoryObj } from "@storybook/react";
import List from "./List";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import {
  Bluetooth,
  Drafts,
  ExpandLess,
  ExpandMore,
  Inbox,
  Send,
  StarBorder,
  Wifi,
} from "@mui/icons-material";
import { useState } from "react";
import ListSubheader from "./ListSubHeader";

const meta: Meta<typeof List> = {
  title: "Atoms/List",
  component: List,
  tags: ["autodocs"],
  args: {
    density: "normal",
  },
  argTypes: {
    density: {
      control: "radio",
      options: ["normal", "dense"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const NestedList: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        dense={args?.density == "dense" ? true : false}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
        {...args}
      >
        <ListItemButton sx={{ borderRadius: "4px" }}>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: "4px" }}>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton sx={{ borderRadius: "4px" }} onClick={handleClick}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            dense={args?.density == "dense" ? true : false}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ pl: 4, borderRadius: "4px" }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="List Item" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    );
  },
};

export const SwitchList: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(["wifi"]);

    const handleToggle = (value: string) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        aria-labelledby="switch-list-subheader"
        subheader={
          <ListSubheader component="div" id="switch-list-subheader">
            Switch List
          </ListSubheader>
        }
        {...args}
      >
        <ListItem>
          <ListItemIcon>
            <Wifi />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <Switch
            edge="end"
            onChange={handleToggle("wifi")}
            checked={checked.includes("wifi")}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
            sx={{
              width: "65px",
              ".MuiSwitch-switchBase": {
                top: "7.9px",
                left: "8.5px",
              },
              ".MuiSwitch-switchBase.Mui-checked": {
                top: "6.5px",
                left: "4.5px",
              },
              ".MuiSwitch-thumb": {
                width: "12px",
                height: "12px",
                background: "#79747E",
              },
              ".MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                width: "15px",
                height: "15px",
                background: "#fff",
              },
              ".MuiSwitch-switchBase.Mui-checked ~ .MuiSwitch-track": {
                background: "var(--primary-main)",
                opacity: 0.5,
                border: "none",
              },
              ".MuiSwitch-root": {
                width: "65px",
              },
              ".MuiSwitch-track": {
                height: "23px",
                width: "40px",
                borderRadius: "100px",
                background: "transparent",
                border: "solid 1px #79747E",
                opacity: 1,
              },
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Bluetooth />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <Switch
            edge="end"
            onChange={handleToggle("bluetooth")}
            checked={checked.includes("bluetooth")}
            inputProps={{
              "aria-labelledby": "switch-list-label-bluetooth",
            }}
            sx={{
              width: "65px",
              ".MuiSwitch-switchBase": {
                top: "7.9px",
                left: "8.5px",
              },
              ".MuiSwitch-switchBase.Mui-checked": {
                top: "6.5px",
                left: "4.5px",
              },
              ".MuiSwitch-thumb": {
                width: "12px",
                height: "12px",
                background: "#79747E",
              },
              ".MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                width: "15px",
                height: "15px",
                background: "#fff",
              },
              ".MuiSwitch-switchBase.Mui-checked ~ .MuiSwitch-track": {
                background: "var(--primary-main)",
                opacity: 0.5,
                border: "none",
              },
              ".MuiSwitch-root": {
                width: "65px",
              },
              ".MuiSwitch-track": {
                height: "23px",
                width: "40px",
                borderRadius: "100px",
                background: "transparent",
                border: "solid 1px #79747E",
                opacity: 1,
              },
            }}
          />
        </ListItem>
      </List>
    );
  },
};
