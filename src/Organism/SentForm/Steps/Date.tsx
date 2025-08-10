import { Box, MenuItem, Typography } from "@mui/material";
import DialogDatePicker from "../../../components/molecules/date-time-picker/dialog-date-picker/dialog-date-picker";
import Select from "../../../components/atoms/select/select";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";

export const Date = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent<string | string[]>) => {
    // This will be called when the select is clicked
    return;
  };

  const handleDatePickerClose = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  return (
    <Box>
      <Box pt={"48px"} pb={"12px"}>
        <Typography variant="h5">Date and Time</Typography>
      </Box>
      <Select
        appearance="outlined"
        size="small"
        placeholder="Select a date"
        readOnly
        value={selectedDate}
        onChange={handleSelectChange}
        onClick={handleDatePickerClose}
        sx={{
          backgroundColor: "white",
          width: "100%",
          "& .MuiPaper-root": {
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "none",
          },
        }}
      >
        <MenuItem selected value="a">Select a date</MenuItem>
      </Select>
      {isDatePickerOpen && (
        <Box mt={1}>
          <DialogDatePicker />
        </Box>
      )}
    </Box>
  );
};
