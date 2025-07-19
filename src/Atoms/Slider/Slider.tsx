import React, { useState } from "react";
import {
  Box,
  Slider,
  Typography,
  Stack,
  IconButton,
  type SliderProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Slider as MuiSlider } from "@mui/material";

export default function DiscreteSlider({
  ...props
}: SliderProps & {
  stepper?: boolean;
}) {
  return (
    <Box sx={{ width: 300 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Slider
          {...props}
          {...(props.stepper && {
            ...props,
          })}
        />
      </Stack>
    </Box>
  );
}
