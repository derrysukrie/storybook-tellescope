import { MenuItem, Stack, TextField } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { FormControlAtom } from './FormControl'
import { FormGroupLabel } from './FormGroupLabel'
import { FormHelperText } from './FormHelperText'

const meta: Meta<typeof FormControlAtom> = {
    title: 'Atoms/Form',
    component: FormControlAtom,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A collection of form elements including FormGroup wrapper with FormGroupLabel and FormHelperText.',
            },
        },
    },
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof FormControlAtom>

export const Default: Story = {
    args: {
        // label: "Email Address",
        // labelSize: "default",
        // disabled: false,
        // type: "text",
    },
    render: args => (
        <FormControlAtom {...args}>
            <FormGroupLabel>Label</FormGroupLabel>
            <TextField hiddenLabel variant="filled" placeholder="Enter your email..." />
            <FormHelperText>We will never share your email with anyone.</FormHelperText>
        </FormControlAtom>
    ),
}

export const ErrorInput: Story = {
    args: {
        // label: "Email Address",
        // helperText: "We will never share your email with anyone.",
        // labelSize: "default",
    },
    render: args => (
        <FormControlAtom {...args}>
            <FormGroupLabel error>Label</FormGroupLabel>
            <TextField error hiddenLabel variant="filled" placeholder="Enter your email..." />
            <FormHelperText error>We will never share your email with anyone.</FormHelperText>
        </FormControlAtom>
    ),
}

export const TwoInputs: Story = {
    args: {
        // label: "Label",
        // helperText: "We will never share your email with anyone.",
        // labelSize: "default",
    },
    render: args => (
        <FormControlAtom {...args}>
            <FormGroupLabel>Label</FormGroupLabel>
            <Stack direction="row" spacing={2} sx={{ width: 'max-content' }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter your email..."
                    sx={{ width: 'max-content' }}
                />
                <TextField hiddenLabel select size="small" sx={{ width: 200 }} label="Label">
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                    <MenuItem value="3">Option 3</MenuItem>
                </TextField>
            </Stack>
            <FormHelperText>Helper Text</FormHelperText>
        </FormControlAtom>
    ),
}

export const ThreeInputs: Story = {
    args: {},
    render: args => (
        <FormControlAtom {...args}>
            <FormGroupLabel>Label</FormGroupLabel>
            <Stack direction="row" spacing={2} sx={{ width: 'max-content' }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter your email..."
                    sx={{ width: 'max-content' }}
                />

                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter your email..."
                    sx={{ width: 'max-content' }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter your email..."
                    sx={{ width: 'max-content' }}
                />
            </Stack>
            <FormHelperText>We will never share your email with anyone.</FormHelperText>
        </FormControlAtom>
    ),
}
