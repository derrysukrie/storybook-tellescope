import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";

export const EmailField = () => {
  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">Enter your email</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              size="medium"
              type="email"
              placeholder="Your email"
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
        </Stack>
      </Box>
    </Box>
  );
};
