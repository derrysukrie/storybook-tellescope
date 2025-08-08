import { Box, FormControlLabel, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CheckBox from "../../components/atoms/checkbox/checkbox";
import { Button } from "../../components/atoms/button/button";
import { useState, useCallback } from "react";
import TellescopeLogo from "../../assets/tellescope-logo.svg";
import { sentFormStyles } from "./styles";
import { FormProvider } from "./FormContext";

export interface FormStep {
  content: React.ReactNode;
  onNext?: () => void;
  // Add step identifier for tracking values
  id?: string;
}

interface SentFormProps {
  steps: FormStep[];
  onComplete?: () => void;
  // Add callback to collect all form values
  onFormDataChange?: (formData: Record<string, any>) => void;
}

export const SentForm = ({ steps, onComplete, onFormDataChange }: SentFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [checked, setChecked] = useState(false);
  // Add centralized form state
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentStepData = steps[currentStep];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  // Function to update form data from any step
  const updateFormData = useCallback((stepId: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [stepId]: value };
      // Notify parent component of form data changes
      onFormDataChange?.(newData);
      return newData;
    });
  }, [onFormDataChange]);

  // Function to get current form data
  const getFormData = useCallback(() => {
    return formData;
  }, [formData]);

  // Function to get all step values
  const getAllStepValues = useCallback(() => {
    return formData;
  }, [formData]);

  const handleNext = () => {
    if (currentStepData.onNext) {
      currentStepData.onNext();
    }

    if (isLastStep) {
      // Log all collected form data when completing
      console.log("All form data:", getAllStepValues());
      onComplete?.();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // Create context value to pass to step components
  const formContext = {
    updateFormData,
    getFormData,
    getAllStepValues,
    currentStep: currentStepData.id || `step-${currentStep}`,
  };

  return (
    <Box sx={sentFormStyles.container}>
      <Box sx={sentFormStyles.contentWrapper}>
        <LinearProgress
          sx={sentFormStyles.progressBar}
          variant="determinate"
          value={progress}
        />
        {currentStep !== 0 && (
          <Box sx={sentFormStyles.logoContainer}>
            <img
              src={TellescopeLogo}
              alt="Tellescope Logo"
              style={sentFormStyles.logo}
            />
          </Box>
        )}
        <Box sx={sentFormStyles.contentContainer}>
          <Box sx={sentFormStyles.contentBox}>
            <FormProvider value={formContext}>
              {currentStepData.content}
            </FormProvider>
          </Box>
        </Box>
        <Box sx={sentFormStyles.bottomContainer}>
          <Box sx={sentFormStyles.checkboxContainer}>
            {currentStep === 0 && (
              <FormControlLabel
                sx={sentFormStyles.formControlLabel}
                control={
                  <CheckBox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    sx={sentFormStyles.checkbox}
                  />
                }
                label={
                  <Typography variant="caption" color="text.secondary">
                    a longer label and will displayed at a smaller size in order to conserve valuable space. This can be used to display some disclaimer about
                    terms or conditions that might be a bit too long for a normal label area
                  </Typography>
                }
              />
            )}
          </Box>
          <Box sx={sentFormStyles.buttonContainer}>
            <Button
              onClick={handleNext}
              sx={sentFormStyles.continueButton}
              fullWidth
            >
              CONTINUE
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
