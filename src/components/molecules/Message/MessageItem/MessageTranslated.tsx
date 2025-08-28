import TranslateIcon from '@mui/icons-material/Translate'
import { Box, Stack, Typography } from '@mui/material'

type TranslatedProps = {
    isTranslated: boolean
}
export const MessageTranslated = ({ isTranslated }: TranslatedProps) => {
    if (!isTranslated) {
        return null
    }
    return (
        <Box>
            <Stack
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={0.5}
                height={'28px'}
                px={1.4}
                borderRadius={10}
                bgcolor={'#EFF0F2'}
            >
                <TranslateIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">Translated from Spanish</Typography>
            </Stack>
        </Box>
    )
}
