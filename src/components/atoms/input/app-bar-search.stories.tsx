import { Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppbarSearch as Comp } from './app-bar-search'

const meta = {
    title: 'ATOMS/FormInputs/Input',
    component: Comp,
} satisfies Meta<typeof Comp>

export default meta
type Story = StoryObj<typeof meta>

export const AppbarSearch: Story = {
    render: () => (
        <Stack
            sx={{
                backgroundColor: '#DEDEDE',
                p: 2,
                maxWidth: 300,
                gap: 1,
            }}
        >
            <Typography variant="body1">App bar Search</Typography>
            <Comp />
        </Stack>
    ),
}
