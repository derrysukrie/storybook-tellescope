import { Box, Stack, Typography } from '@mui/material'

export const DateSeparator = ({ date }: { date: Date }) => {
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 1 }}>
            <Box bgcolor="#EFF0F2" borderRadius={20} px={1.5} py={0.2}>
                <Typography variant="caption" color="black" fontWeight={600}>
                    {formattedDate}
                </Typography>
            </Box>
        </Stack>
    )
}
