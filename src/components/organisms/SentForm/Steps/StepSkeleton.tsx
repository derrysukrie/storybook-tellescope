import { Box, Skeleton } from "@mui/material";

export const StepSkeleton = () => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="40%" height={20} />
    </Box>
  );
};

export default StepSkeleton;
