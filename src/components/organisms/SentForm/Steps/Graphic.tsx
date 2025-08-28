import { Box, Typography } from '@mui/material'

interface GraphicProps {
    image: string
    description: string
}

export default function Graphic({ image, description }: GraphicProps) {
    return (
        <Box>
            <Box py="54px">
                {/* <img src="https://dummyimage.com/wuxga" alt="graphic" /> */}
                <Box width={'100%'} bgcolor={'gray'} height={640} borderRadius={'28px'}>
                    <img
                        src={image}
                        style={{ borderRadius: '28px', objectFit: 'cover' }}
                        width={'100%'}
                        height={'100%'}
                        alt="graphic"
                    />
                </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
                {description}
            </Typography>
        </Box>
    )
}
