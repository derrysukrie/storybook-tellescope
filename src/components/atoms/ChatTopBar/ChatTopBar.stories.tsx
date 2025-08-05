import type { Meta, StoryObj } from "@storybook/react";
import { Box, IconButton } from "@mui/material";
import PenIcon from "../../../assets/pen.svg";
import FilterIcon from "../../../assets/filter.svg";
import CancelIcon from "../../../assets/cancel.svg";

const meta: Meta = {
  title: "Atoms/ChatTopBar",
};

export default meta;

export const Default: StoryObj = {
  render() {
    return (
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ flexGrow: 1 }}
        >
          <IconButton aria-label="edit" sx={{ width: "36px", height: "36px" }}>
            <img src={PenIcon} alt="edit" />
          </IconButton>
          <IconButton
            aria-label="filter"
            sx={{ width: "36px", height: "36px" }}
          >
            <img src={FilterIcon} alt="filter" />
          </IconButton>
        </Box>
        <IconButton aria-label="cancel" sx={{ width: "36px", height: "36px" }}>
          <img src={CancelIcon} alt="cancel" />
        </IconButton>
      </Box>
    );
  },
};
