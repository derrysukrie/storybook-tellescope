import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";

export const QuestionsGroup = () => {
  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"48px"}>
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Typography variant="h5">Question group</Typography>
            <Typography variant="body2">A paragraph of question group details</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
            <Typography variant="h5">What would you like to be called?</Typography>
            <FormControlAtom variant="outlined" fullWidth>
              <Input
                appearance="distinct"
                size="medium"
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                }}
              />
            </FormControlAtom>
            <Typography color="text.secondary" variant="caption">
              The location is where you’re treatment supplies will be shipped, if prescibed
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
            <Typography variant="h5">What would you like to be called?</Typography>
            <FormControlAtom variant="outlined" fullWidth>
              <Input
                appearance="distinct"
                size="medium"
                hiddenLabel
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                }}
              />
            </FormControlAtom>
            <Typography color="text.secondary" variant="caption">
              The location is where you’re treatment supplies will be shipped, if prescibed
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
