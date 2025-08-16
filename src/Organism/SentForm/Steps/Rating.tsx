import { Box, Typography } from "@mui/material";

import { useFormContext } from "../FormContext";
import { Slider } from "../../../components/atoms";

interface RatingProps {
  min: number;
  max: number;
  step: number;
  shiftStep: number;
  marks: boolean;
}
export const Rating = (props: RatingProps) => {
  const { updateFormData, currentStep, getFormData } = useFormContext();

  const handleChange = (_: Event, newValue: number | number[]) => {
    updateFormData(`${currentStep}`, newValue);
  };

  // Get the current rating value for this step
  const currentRating = getFormData()[currentStep] || props.min;

  return (
    <Box>
      <Typography pt={"48px"} pb={"24px"} variant="h5">
        Rating question
      </Typography>
      <Slider
        onChange={handleChange}
        min={props.min}
        max={props.max}
        step={props.step}
        shiftStep={props.shiftStep}
        marks={true}
        stepper={true}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {currentRating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.max}
        </Typography>
      </Box>
    </Box>
  );
};
