import { Box, Typography } from "@mui/material";
import Slider from "../../../Atoms/Slider/Slider";
import { useFormContext } from "../FormContext";

export const Rating = () => {
  const { updateFormData, currentStep } = useFormContext();

  const handleChange = (event: Event, newValue: number | number[]) => {
    updateFormData(`${currentStep}`, newValue);
  };

  return (
    <Box>
      <Typography pt={"48px"} pb={"24px"} variant="h5">
        Rating question
      </Typography>
      <Slider 
        onChange={handleChange} 
        min={0} 
        max={12} 
        step={1} 
        shiftStep={1} 
        marks={true} 
        stepper={true} 
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          0
        </Typography>
        <Typography variant="body2" color="text.secondary">
          12
        </Typography>
      </Box>
    </Box>
  );
};
