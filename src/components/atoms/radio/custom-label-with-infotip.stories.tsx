import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { FormControl, FormControlLabel, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './radio'

const meta = {
    title: 'ATOMS/FormInputs/Radio',
    component: Radio,
    parameters: {
        controls: {
            exclude: ['color', 'size'],
        },
    },
    argTypes: {
        color: { table: { disable: true } }, // This disables the control properly
        size: { table: { disable: true } },
    },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const CustomLabelWithInfotip: Story = {
    render: () => {
        return (
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Custom label with infotip
                </Typography>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <FormControl>
                        <FormControlLabel
                            value="End"
                            control={<Radio size="medium" />}
                            label="End"
                        />
                    </FormControl>
                    <InfoOutlinedIcon sx={{ width: 17 }} />
                </Stack>
            </Stack>
        )
    },
}
