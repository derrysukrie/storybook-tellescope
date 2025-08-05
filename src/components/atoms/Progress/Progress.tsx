import * as React from "react";
import {
  LinearProgress as MuiProgress,
  type LinearProgressProps,
} from "@mui/material";

interface CustomProgressProps extends LinearProgressProps {}

const LinearProgress: React.FC<CustomProgressProps> = ({ sx, ...props }) => {
  return (
    <MuiProgress
      {...props}
      sx={{
        ...sx,
      }}
    />
  );
};

export default LinearProgress;
