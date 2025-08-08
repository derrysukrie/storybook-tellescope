import { Box, Fade, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: DescriptionProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box px="24px">
        <Fade in={show} timeout={2000}>
          <Typography variant="h3" color={"primary.light"} fontWeight={500}>
            {description}
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
};
