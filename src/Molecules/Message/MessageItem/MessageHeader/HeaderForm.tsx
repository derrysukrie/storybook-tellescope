import { Box, MenuItem, Stack } from "@mui/material";
import { FormControlAtom } from "../../../../Atoms";
import { Input } from "../../../../components/atoms/input/input";
import Select from "../../../../components/atoms/select/select";
import type { HeaderFormProps } from "./types";

export const HeaderForm = ({
  headerFormData,
  onHeaderFormChange,
  chatInterface,
  enableTeamChat,
}: HeaderFormProps) => {
  if (enableTeamChat) return null;

  const renderFormFields = () => {
    switch (chatInterface) {
      case "EMAIL":
        return (
          <Stack display="flex" flexDirection="column">
            <FormControlAtom variant="standard">
              <Select
                label="To"
                labelId="email-to-select-label"
                id="email-to-select"
                value={headerFormData.to || ""}
                onChange={(e) =>
                  onHeaderFormChange("to", e.target.value as string)
                }
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
            </FormControlAtom>
            <FormControlAtom variant="standard">
              <Select
                label="CC"
                labelId="email-cc-select-label"
                id="email-cc-select"
                value={headerFormData.cc || ""}
                onChange={(e) =>
                  onHeaderFormChange("cc", e.target.value as string)
                }
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
            </FormControlAtom>
            <FormControlAtom variant="standard">
              <Input
                sx={{ mt: 2 }}
                placeholder="Subject"
                value={headerFormData.subject}
                onChange={(e) =>
                  onHeaderFormChange("subject", e.target.value as string)
                }
              />
            </FormControlAtom>
          </Stack>
        );
      case "SMS":
        return (
          <Stack display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column">
              <Select
                value={headerFormData.from || ""}
                label="From"
                labelId="sms-from-select-label"
                id="sms-from-select"
                sx={{ margin: 0 }}
                onChange={(e) =>
                  onHeaderFormChange("from", e.target.value as string)
                }
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
              <Input
                sx={{ mt: 2 }}
                placeholder="To"
                value={headerFormData.to}
                onChange={(e) =>
                  onHeaderFormChange("to", e.target.value as string)
                }
              />
            </Box>
          </Stack>
        );
      case "MMS":
        return (
          <Stack display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column">
              <Select
                value={Array.isArray(headerFormData?.to) ? headerFormData.to : []}
                label="To"
                labelId="sms-from-select-label"
                id="sms-from-select"
                multiple
                sx={{ margin: 0 }}
                onChange={(e) =>
                  onHeaderFormChange("to", e.target.value as string[])
                }
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
              <Input
                sx={{ mt: 2 }}
                placeholder="Subject"
                value={headerFormData.subject}
                onChange={(e) =>
                  onHeaderFormChange("subject", e.target.value as string)
                }
              />
            </Box>
          </Stack>
        );
      case "CHAT":
        return (
          <Box>
            <Stack display={"flex"} flexDirection={"column"}>
              <FormControlAtom variant="standard">
                <Select
                  value={headerFormData.to || ""}
                  label="To"
                  labelId="chat-to-select-label"
                  id="chat-to-select"
                  onChange={(e) =>
                    onHeaderFormChange("to", e.target.value as string)
                  }
                >
                  <MenuItem value="James">James</MenuItem>
                  <MenuItem value="John">John</MenuItem>
                  <MenuItem value="Jane">Jane</MenuItem>
                </Select>
              </FormControlAtom>
              <FormControlAtom variant="standard">
                <Input
                  sx={{
                    mt: 2,
                  }}
                  placeholder="Subject"
                  value={headerFormData.subject}
                  onChange={(e) =>
                    onHeaderFormChange("subject", e.target.value as string)
                  }
                />
              </FormControlAtom>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  return <Box>{renderFormFields()}</Box>;
};
