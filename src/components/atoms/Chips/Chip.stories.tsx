import type { Meta, StoryObj } from "@storybook/react";
import Chip from "./Chip";
import CheckIcon from "@mui/icons-material/Check";
import { Stack, Avatar } from "@mui/material";
import { ChildCareOutlined } from "@mui/icons-material";
import { useState } from "react";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    label: "Chip Filled",
    appearance: "filled",
    color: "default",
    size: "medium",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary"],
    },
    appearance: {
      control: "radio",
      options: ["filled", "outlined", "square"],
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

// Default Chip Story
export const Default: Story = {
  args: {
    label: "Default",
    appearance: "filled",
    color: "default",
    size: "medium",
  },
};

// Deletable Chip Story
export const Deletable: Story = {
  args: {
    label: "Deletable",
    appearance: "filled",
    color: "default",
    size: "medium",
    onDelete: () => alert("Implement Delete Logic"),
  },
  argTypes: {
    appearance: {
      control: "radio",
      options: ["filled", "outlined"],
    },
    onDelete: {
      table: {
        disable: true,
      },
    },
  },
};

// Selectable Chip Story
export const Selectable: Story = {
  args: {
    appearance: "square",
    color: "default",
    size: "medium",
  },
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
    appearance: {
      control: "radio",
      options: ["square"],
    },
    selected: {
      table: { disable: true },
    },
  },
  render: (args) => {
    const fruits = ["Apple", "Mango", "Guava", "Melon", "Blueberries"];

    const [selectedFruits, setSelectedFruits] = useState<string[]>(["Guava"]);

    const handleSelect = (fruit: string) => {
      setSelectedFruits((prev) =>
        prev.includes(fruit)
          ? prev.filter((item) => item !== fruit)
          : [...prev, fruit]
      );
    };

    return (
      <Stack direction="row" display="flex" spacing={1}>
        {fruits?.map((fruit, index) => {
          const isSelected = selectedFruits.includes(fruit);

          return (
            <Chip
              key={index}
              label={fruit}
              clickable={true}
              size={args.size}
              color={args.color}
              appearance={args.appearance}
              selected={isSelected}
              onClick={() => handleSelect(fruit)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(211, 222, 235, 1) !important",
                  color: "rgba(73, 69, 79, 1) !important",
                  borderColor: "rgba(202, 196, 208, 1) !important",
                  cursor: "pointer",
                },
                "&:active": {
                  backgroundColor: "inherit!important",
                  boxShadow: "none!important",
                },
                "& .MuiTouchRipple-root": {
                  display: "none!important",
                },
              }}
              icon={isSelected ? <CheckIcon fontSize="small" /> : undefined}
            />
          );
        })}
      </Stack>
    );
  },
};

// Avatar Story
export const AvatarChip: Story = {
  args: {
    label: "Avatar",
    appearance: "filled",
    color: "default",
    size: "medium",
  },
  argTypes: {
    appearance: {
      control: "radio",
      options: ["filled", "outlined"],
    },
    color: {
      control: "radio",
      options: ["default"],
    },
  },
  render: (args) => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip {...args} avatar={<Avatar>M</Avatar>} />
      <Chip
        {...args}
        avatar={<Avatar alt="avatar" src="https://picsum.photos/200"></Avatar>}
      />
    </Stack>
  ),
};

// Icon Chip
export const IconChip: Story = {
  args: {
    label: "Icon",
    appearance: "filled",
    color: "default",
    size: "medium",
  },
  argTypes: {
    appearance: {
      control: "radio",
      options: ["filled", "outlined"],
    },
    color: {
      control: "radio",
      options: ["default"],
    },
  },
  render: (args) => <Chip {...args} icon={<ChildCareOutlined />} />,
};
