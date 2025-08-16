import { Box, FormHelperText, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../atoms";
import { Input } from "../../../atoms/input/input";
import { useState, useCallback, useMemo } from "react";
import { useFormContext } from "../FormContext";

interface PhoneNumberProps {
  title?: string;
  helperText?: string;
}

export const PhoneNumber = ({ title, helperText }: PhoneNumberProps) => {
  const { updateFormData, currentStep } = useFormContext();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  // Format phone number as 123-456-7890
  const formatPhone = useMemo(() => {
    return (digits: string) => {
      // Remove non-digits and limit to 10 characters
      const cleaned = digits.replace(/\D/g, "").slice(0, 10);
      
      // Split into parts: area code, prefix, line number
      const areaCode = cleaned.slice(0, 3);
      const prefix = cleaned.slice(3, 6);
      const lineNumber = cleaned.slice(6, 10);
      
      // Build formatted string with dashes
      let formatted = areaCode;
      if (prefix) formatted += "-" + prefix;
      if (lineNumber) formatted += "-" + lineNumber;
      
      return formatted;
    };
  }, []);

  // Validate complete phone number format
  const validatePhone = useMemo(() => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return (formatted: string) => phoneRegex.test(formatted);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    
    // Extract only digits from user input
    const digitsOnly = userInput.replace(/\D/g, "");
    
    // Format the phone number with dashes
    const formattedNumber = formatPhone(digitsOnly);
    
    // Update the input value
    setValue(formattedNumber);
    
    // Update form data
    updateFormData(currentStep, formattedNumber);
    
    // Validate and show appropriate error states
    const digitCount = digitsOnly.length;
    
    if (digitCount === 0) {
      // Empty field - no error
      setError(false);
    } else if (digitCount < 10) {
      // Partial input - show error for incomplete number
      setError(true);
    } else if (digitCount === 10) {
      // Complete input - validate format
      const isValidFormat = validatePhone(formattedNumber);
      setError(!isValidFormat);
    }
  }, [formatPhone, validatePhone, updateFormData, currentStep]);

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">{title}</Typography>
          
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              size="medium"
              hiddenLabel
              sx={{
                backgroundColor: "white",
                width: "100%",
              }}
              value={value}
              onChange={handleChange}
              placeholder="123-456-7890"
              inputProps={{ maxLength: 12 }}
            />
          </FormControlAtom>
          
          <FormHelperText error={error}>
            Phone number must be at least 10 digits
          </FormHelperText>
        </Stack>
      </Box>
    </Box>
  );
};
