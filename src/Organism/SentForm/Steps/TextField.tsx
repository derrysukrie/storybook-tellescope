import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";

export const TextField = () => {
  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">What would you like to be called?</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              size="medium"
              label="Okeanos Withburga"
              sx={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </FormControlAtom>
          <Typography color="text.secondary" variant="caption">
            The location is where you're treatment supplies will be shipped, if prescibed
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
