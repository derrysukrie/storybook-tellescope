import { MenuItem, Stack } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { FormControlAtom, Input, Select } from "../../../atoms";
import { StepWrapper, useStepField } from "./shared";
import { useCallback, useMemo } from "react";

// Constants
const relationshipToPolicyOwnerOptions = [
  { value: "self", label: "Self" },
  { value: "spouse", label: "Spouse" },
  { value: "child", label: "Child" },
  { value: "parent", label: "Parent" },
  { value: "other", label: "Other" },
];

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

// Insurance data interface
interface InsuranceData {
  insurer: string;
  memberId: string;
  planName: string;
  planStartDate: string;
  relationshipToPolicyOwner: string;
}

export const Insurance = () => {
  // Single field hook that stores the entire insurance object
  const { value: insuranceData, error, handleChange: handleInsuranceChange, handleBlur } = useStepField({
    stepId: "insurance",
    required: true,
    validations: [],
    defaultValue: {
      insurer: "",
      memberId: "",
      planName: "",
      planStartDate: "",
      relationshipToPolicyOwner: "",
    } as InsuranceData,
  });

  // Ensure we have a valid insurance object
  const insurance = useMemo(() => {
    return insuranceData || {
      insurer: "",
      memberId: "",
      planName: "",
      planStartDate: "",
      relationshipToPolicyOwner: "",
    };
  }, [insuranceData]);

  // Helper function to update a specific field in the insurance object
  const updateInsuranceField = useCallback((field: keyof InsuranceData, value: string) => {
    const updatedInsurance = {
      ...insurance,
      [field]: value,
    };
    handleInsuranceChange(updatedInsurance);
  }, [insurance, handleInsuranceChange]);

  // Event handlers for Input components
  const handleInsurerChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateInsuranceField("insurer", event.target.value);
  }, [updateInsuranceField]);

  const handleMemberIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateInsuranceField("memberId", event.target.value);
  }, [updateInsuranceField]);

  const handlePlanNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateInsuranceField("planName", event.target.value);
  }, [updateInsuranceField]);

  const handlePlanStartDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateInsuranceField("planStartDate", event.target.value);
  }, [updateInsuranceField]);

  // Event handler for Select component
  const handleRelationshipChange = useCallback((event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value as string;
    updateInsuranceField("relationshipToPolicyOwner", value);
  }, [updateInsuranceField]);


  const renderEmptyRelationshipToPolicyOwner = useCallback((selected: string | string[]) => {
    if (typeof selected === "string") {
      if (!selected) {
        return <span style={{ color: "#999999" }}>Select relationship to policy owner</span>;
      }
      return selected;
    }
    return selected;
  }, []);

  return (
    <StepWrapper title="Insurance" error={error || undefined}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              label="Insurer"
              value={insurance.insurer}
              onChange={handleInsurerChange}
              sx={inputStyles}
            />
          </FormControlAtom>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              label="Member ID"
              value={insurance.memberId}
              onChange={handleMemberIdChange}
              onBlur={handleBlur}
              sx={inputStyles}
            />
          </FormControlAtom>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              label="Plan Name"
              value={insurance.planName}
              onChange={handlePlanNameChange}
              sx={inputStyles}
            />
          </FormControlAtom>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              label="Plan Start Date"
              value={insurance.planStartDate}
              onChange={handlePlanStartDateChange}
              sx={inputStyles}
            />
          </FormControlAtom>
        </Stack>
        <FormControlAtom variant="outlined" fullWidth>
          <Select
            appearance="patientForm"
            size="medium"
            value={insurance.relationshipToPolicyOwner}
            onChange={handleRelationshipChange}
            displayEmpty
            renderValue={renderEmptyRelationshipToPolicyOwner}
            sx={selectStyles}
          >
            <MenuItem value="" disabled>
              Select relationship to policy owner
            </MenuItem>
            {relationshipToPolicyOwnerOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControlAtom>
      </Stack>
    </StepWrapper>
  );
};
