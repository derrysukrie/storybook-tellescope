import type { Meta, StoryObj } from "@storybook/react";
import ListItem from "./ListItem";
import { List } from "@mui/material";

const meta: Meta<typeof ListItem> = {
  title: "Atoms/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  args: {
    iconLeft: false,
    iconRight: undefined,
    secondaryText: undefined,
    disableGutters: false,
    dense: false,
  },
  argTypes: {
    iconLeft: {
      control: "boolean",
    },
    iconRight: {
      control: "radio",
      options: ["1", "2", "3"],
    },
    disableGutters: {
      control: "boolean",
    },
    dense: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  render: (args) => (
    <List>
      <ListItem {...args}></ListItem>
    </List>
  ),
};

export const Dense: Story = {
  args: {
    dense: true,
  },
  render: (args) => (
    <List>
      <ListItem {...args}></ListItem>
    </List>
  ),
};

export const LeftSlot: Story = {
  args: {
    iconLeft: true,
  },
  render: (args) => (
    <List>
      <ListItem {...args}></ListItem>
    </List>
  ),
};

export const RightSlot: Story = {
  args: {
    iconRight: "1",
  },
  render: (args) => (
    <List>
      <ListItem {...args}></ListItem>
    </List>
  ),
};

export const DisabledGutters: Story = {
  args: {
    disableGutters: true,
  },
  render: (args) => (
    <List>
      <ListItem {...args}></ListItem>
    </List>
  ),
};

export const SelectedSidebarItem: Story = {
  args: {
    selected: true,
  },
  argTypes: {
    selected: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <List>
      <ListItem {...args}></ListItem>
    </List>
  ),
};
