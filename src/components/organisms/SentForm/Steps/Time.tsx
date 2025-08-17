import { MenuItem, Stack, type SelectChangeEvent } from "@mui/material";
import { Select } from "../../../atoms";
import { FormControlAtom } from "../../../atoms/Form";
import { StepWrapper, useStepField } from "./shared";
import { useCallback, useMemo } from "react";

const timeOptions = ["01", "02", "03", "04", "05"];
const minuteOptions = ["00", "15", "20", "30", "45"];
const amPmOptions = ["AM", "PM"];

// Time object interface
interface TimeData {
  hour: string;
  minute: string;
  amPm: string;
}

export const Time = () => {
  // Single field hook that stores the entire time object
  const { value: timeData, error, handleChange: handleTimeChange, handleBlur } = useStepField({
    stepId: "time",
    required: true,
    validations: [],
    defaultValue: {
      hour: "",
      minute: "",
      amPm: "",
    } as TimeData,
  });

  // Ensure we have a valid time object
  const time = useMemo(() => {
    return timeData || {
      hour: "",
      minute: "",
      amPm: "",
    };
  }, [timeData]);

  // Helper function to update a specific field in the time object
  const updateTimeField = useCallback((field: keyof TimeData, value: string) => {
    const updatedTime = {
      ...time,
      [field]: value,
    };
    handleTimeChange(updatedTime);
  }, [time, handleTimeChange]);

  const renderEmptyTime = useCallback((selected: string | string[]) => {
    if (typeof selected === "string") {
      // If no value is selected, show placeholder with grey color
      if (!selected) {
        return <span style={{ color: "#999999" }}>00</span>;
      }
      return selected;
    }
    return selected;
  }, []);

  const renderEmptyMinute = useCallback((selected: string | string[]) => {
    if (typeof selected === "string") {
      if (!selected) {
        return <span style={{ color: "#999999" }}>00</span>;
      }
      return selected;
    }
    return selected;
  }, []);

  const renderEmptyAmPm = useCallback((selected: string | string[]) => {
    if (typeof selected === "string") {
      if (!selected) {
        return <span style={{ color: "#999999" }}>AM</span>;
      }
      return selected;
    }
    return selected;
  }, []);

  // Event handlers for Select components
  const handleHourSelectChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const newValue = event.target.value as string;
      updateTimeField("hour", newValue);
    },
    [updateTimeField]
  );

  const handleMinuteSelectChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const newValue = event.target.value as string;
      updateTimeField("minute", newValue);
    },
    [updateTimeField]
  );

  const handleAmPmSelectChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const newValue = event.target.value as string;
      updateTimeField("amPm", newValue);
    },
    [updateTimeField]
  );


  return (
    <StepWrapper title="Time" error={error || undefined}>
      <FormControlAtom variant="outlined" fullWidth>
        <Stack direction="row" spacing={2}>
          <Select
            appearance="patientForm"
            size="medium"
            value={time.hour}
            onChange={handleHourSelectChange}
            onBlur={handleBlur}
            displayEmpty
            renderValue={renderEmptyTime}
            sx={{
              backgroundColor: "white",
            }}
          >
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
          <Select
            appearance="patientForm"
            size="medium"
            value={time.minute}
            onChange={handleMinuteSelectChange}
            renderValue={renderEmptyMinute}
            onBlur={handleBlur}
            displayEmpty
            sx={{
              backgroundColor: "white",
            }}
          >
            {minuteOptions.map((minute) => (
              <MenuItem key={minute} value={minute}>
                {minute}
              </MenuItem>
            ))}
          </Select>
          <Select
            appearance="patientForm"
            size="medium"
            value={time.amPm}
            onChange={handleAmPmSelectChange}
            onBlur={handleBlur}
            renderValue={renderEmptyAmPm}
            displayEmpty
            sx={{
              backgroundColor: "white",
            }}
          >
            {amPmOptions.map((amPm) => (
              <MenuItem key={amPm} value={amPm}>
                {amPm}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </FormControlAtom>
    </StepWrapper>
  );
};

// Add default export for lazy loading
export default { Time };
