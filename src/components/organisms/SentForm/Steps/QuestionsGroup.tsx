import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../atoms";
import { Input } from "../../../atoms/input/input";
import { useFormContext } from "../FormContext";
import { useState } from "react";

interface QuestionField {
  label: string;
  hint: string;
  fieldKey: string;
  hiddenLabel?: boolean;
}

interface QuestionsGroupProps {
  title?: string;
  description?: string;
  questions: QuestionField[];
}

export const QuestionsGroup = ({ 
  title = "Question group", 
  description = "A paragraph of question group details",
  questions 
}: QuestionsGroupProps) => {
  const { updateFormData, currentStep } = useFormContext();
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (fieldKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValues(prev => ({ ...prev, [fieldKey]: newValue }));
    updateFormData(`${currentStep}_${fieldKey}`, newValue);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"48px"}>
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
          {questions.map((question, index) => (
            <Box key={index} display={"flex"} flexDirection={"column"} gap={"12px"}>
              <Typography variant="h5">{question.label}</Typography>
              <FormControlAtom variant="outlined" fullWidth>
                <Input
                  appearance="distinct"
                  size="medium"
                  hiddenLabel={question.hiddenLabel}
                  value={values[question.fieldKey] || ""}
                  onChange={handleChange(question.fieldKey)}
                  sx={{
                    backgroundColor: "white",
                    width: "100%",
                  }}
                />
              </FormControlAtom>
              <Typography color="text.secondary" variant="caption">
                {question.hint}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
