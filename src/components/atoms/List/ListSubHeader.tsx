import React from "react";
import {
  ListSubheader as MuiListSubheader,
  type ListSubheaderProps,
} from "@mui/material";

interface CustomListSubheaderProps extends ListSubheaderProps {}

const ListSubheader: React.FC<CustomListSubheaderProps> = ({
  sx,
  ...props
}) => {
  return <MuiListSubheader sx={{ ...sx }} {...props} />;
};

export default ListSubheader;
