import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Select from '../select/select'
import { Radio } from './radio'

const meta = {
    title: 'ATOMS/FormInputs/Radio',
    component: Radio,
    parameters: {
        controls: {
            exclude: ['color'],
        },
    },
    argTypes: {
        color: { table: { disable: true } }, // This disables the control properly
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
    },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const FormGroupSecondaryInput: Story = {
    args: {
        size: 'medium',
    },
    render: args => {
        return (
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Form group
                </Typography>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <FormControl sx={{ width: 300 }}>
                        {/* biome-ignore lint/correctness/useUniqueElementIds: Storybook stories use static IDs */}
                        <FormLabel id="demo-controlled-radio-buttons-group">Label</FormLabel>
                        <FormControlLabel
                            value="End"
                            control={<Radio size={args.size} />}
                            label="Label"
                        />
                        <FormHelperText sx={{ ml: 0 }}>Helper Text</FormHelperText>
                    </FormControl>
                    <Select
                        label="Label"
                        appearance="standard"
                        multiple={false}
                        value={''}
                        onChange={() => {}}
                        size="medium"
                    >
                        <MenuItem value="1">Menu Item 1</MenuItem>
                        <MenuItem value="2">Menu Item 2</MenuItem>
                        <MenuItem value="3">Menu Item 3</MenuItem>
                    </Select>
                </Stack>
            </Stack>
        )
    },
}
