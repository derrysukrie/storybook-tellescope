import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import Typography from './typography'

const meta = {
    title: 'ATOMS/Typography',
    component: Typography,
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
    render: () => {
        const typographyVariants: ComponentProps<typeof Typography>['variant'][] = [
            'body1',
            'body2',
            'subtitle1',
            'subtitle2',
            'overline',
            'caption',
            'h6',
            'h5',
            'h4',
            'h3',
            'h2',
            'h1',
            'custom',
        ]

        return (
            <>
                {typographyVariants.map(variant => {
                    return (
                        <Stack
                            key={variant}
                            sx={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                '&:not(:last-child) .MuiTypography-root ': {
                                    borderBottom: 'none',
                                },
                                '&:last-child .MuiTypography-root ': {
                                    borderRadius: '0 0 8px 8px',
                                },
                                '&:first-child .MuiTypography-root ': {
                                    borderRadius: '8px 8px 0 0',
                                },
                            }}
                        >
                            <Typography
                                sx={{ width: '50px', textAlign: 'center', color: '#9747FF' }}
                                variant="body2"
                            >
                                {variant}
                            </Typography>
                            <Typography
                                variant={variant}
                                sx={{
                                    textAlign: 'center',
                                    width: '528px',
                                    border: '1px dashed  #9747FF',
                                    padding: '16px 16px',
                                }}
                            >
                                Typography
                            </Typography>
                        </Stack>
                    )
                })}
            </>
        )
    },
}
