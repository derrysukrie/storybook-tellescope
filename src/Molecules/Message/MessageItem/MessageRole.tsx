import { Box, Stack, Typography } from "@mui/material";

type RoleProps = {
  isTeamChatEnabled: boolean;
  role: string | undefined;
};

export const MessageRole = ({ isTeamChatEnabled, role }: RoleProps) => {
  if (!role || !isTeamChatEnabled) {
    return null;
  }
  return (
    <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
      <Typography variant="caption" color="#8B5CF2">
        {role}
      </Typography>
      {isTeamChatEnabled && (
        <Box display={"flex"} height={"28px"} px={"10px"} bgcolor="#F4F0FF" borderRadius={10} alignItems={"center"} justifyContent={"center"}>
          <Typography variant="caption" color="#8B5CF2">
            Team
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
