import React from "react";
import { Box, TextField } from "@mui/material";

type SearchFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dense?: boolean;
};

export const SearchField: React.FC<SearchFieldProps> = ({ 
  value, 
  onChange,
  dense = false 
}) => (
  <Box px={1} pb={1}>
    <TextField
      placeholder="Search..."
      value={value}
      onChange={onChange}
      sx={{
        width: "100%",
        border: "2px solid #1C7AE0",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          height: "32px",
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
          "& input": {
            padding: dense ? "6px 12px" : "8px 12px",
            fontSize: "14px",
          },
        },
      }}
      size={dense ? "small" : "medium"}
    />
  </Box>
); 