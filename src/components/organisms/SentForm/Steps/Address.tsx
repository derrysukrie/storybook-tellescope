import { MenuItem, Stack } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { FormControlAtom, Select } from "../../../atoms";
import { Input } from "../../../atoms/input/input";
import { StepWrapper, useStepField } from "./shared";
import { useCallback, useMemo } from "react";

// Memoized styles
const inputStyles = {
  backgroundColor: "white",
  width: "100%",
} as const;

const selectStyles = {
  backgroundColor: "white",
  width: "100%",
  "& .MuiPaper-root": {
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "none",
  },
} as const;

// Address object interface
interface AddressData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}

export const Address = () => {
  // Single field hook that stores the entire address object
  const { value: addressData, error, handleChange: handleAddressChange, handleBlur } = useStepField({
    stepId: "address",
    required: true,
    validations: [],
    defaultValue: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    } as AddressData,
  });

  // Ensure we have a valid address object
  const address = useMemo(() => {
    return addressData || {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    };
  }, [addressData]);

  // Helper function to update a specific field in the address object
  const updateAddressField = useCallback((field: keyof AddressData, value: string) => {
    const updatedAddress = {
      ...address,
      [field]: value,
    };
    handleAddressChange(updatedAddress);
  }, [address, handleAddressChange]);

  // Event handlers for Input components
  const handleAddressLine1InputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateAddressField("addressLine1", event.target.value);
  }, [updateAddressField]);

  const handleAddressLine2InputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateAddressField("addressLine2", event.target.value);
  }, [updateAddressField]);

  const handleCityInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateAddressField("city", event.target.value);
  }, [updateAddressField]);

  const handleZipCodeInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateAddressField("zipCode", event.target.value);
  }, [updateAddressField]);

  // Event handler for Select component
  const handleStateSelectChange = useCallback((event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value as string;
    updateAddressField("state", value);
  }, [updateAddressField]);

  // Memoized form validation state
  const isFormValid = useMemo(() => {
    return !error && address.addressLine1 && address.city && address.state && address.zipCode;
  }, [error, address]);

  return (
    <StepWrapper title="Address" error={error || undefined}>
      <FormControlAtom variant="outlined" fullWidth>
        <Stack direction="column" spacing={2}>
          <Input
            size="medium"
            appearance="distinct"
            placeholder="Address Line 1"
            value={address.addressLine1}
            onChange={handleAddressLine1InputChange}
            onBlur={handleBlur}
            sx={inputStyles}
          />
          <Input
            size="medium"
            appearance="distinct"
            placeholder="Address Line 2"
            value={address.addressLine2}
            onChange={handleAddressLine2InputChange}
            onBlur={handleBlur}
            sx={inputStyles}
          />
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Input
              size="medium"
              appearance="distinct"
              placeholder="City"
              fullWidth
              value={address.city}
              onChange={handleCityInputChange}
              onBlur={handleBlur}
              sx={inputStyles}
            />

            <Select
              appearance="patientForm"
              size="medium"
              value={address.state}
              placeholder="State"
              onChange={handleStateSelectChange}
              onBlur={handleBlur}
              displayEmpty
              sx={selectStyles}
            >
              <MenuItem value="">Select State</MenuItem>
              <MenuItem value="CA">California</MenuItem>
              <MenuItem value="NY">New York</MenuItem>
              <MenuItem value="TX">Texas</MenuItem>
              <MenuItem value="FL">Florida</MenuItem>
            </Select>

            <Input
              size="medium"
              appearance="distinct"
              placeholder="Zip"
              fullWidth
              value={address.zipCode}
              onChange={handleZipCodeInputChange}
              onBlur={handleBlur}
              sx={inputStyles}
            />
          </Stack>
        </Stack>
      </FormControlAtom>
    </StepWrapper>
  );
};
