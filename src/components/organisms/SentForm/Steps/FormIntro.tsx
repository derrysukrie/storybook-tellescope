import { Box, Typography } from '@mui/material'

export const FormIntro = () => {
    return (
        <Box px="24px" pt="96px">
            <Typography variant="h3" color={'#798ED0'} fontWeight={500}>
                Explore treatment plans.
            </Typography>
            <Typography variant="h5" pt={'24px'} fontWeight={500}>
                Learn more about about the treatments we offer and find one that fits your needs.
            </Typography>
        </Box>
    )
}
