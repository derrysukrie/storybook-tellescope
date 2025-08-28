import type {
    FormControlLabelProps as MuiFormControlLabelProps,
    SwitchProps as MuiSwitchProps,
} from '@mui/material'
import { FormControl, FormControlLabel, Switch as MuiSwitch } from '@mui/material'
import { type FC, type ReactNode, useState } from 'react'

interface SwitchToggleProps extends Omit<MuiSwitchProps, 'color'> {
    color?: 'default' | 'primary' | 'secondary' | 'info'
    label?: ReactNode
    value?: string
    checked?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
    name?: string
    formlabelProps?: Omit<MuiFormControlLabelProps, 'label' | 'control'>
}

const SwitchToggle: FC<SwitchToggleProps> = ({
    formlabelProps,
    label,
    value,
    checked: externalChecked,
    onChange,
    name,
    ...props
}) => {
    const { sx, ...rest } = formlabelProps || {}

    // Determine if this is a controlled component
    const isControlled = typeof externalChecked !== 'undefined'

    // Internal state for uncontrolled mode
    const [internalChecked, setInternalChecked] = useState(props.defaultChecked || false)

    // Use the appropriate checked value
    const checked = isControlled ? externalChecked : internalChecked

    // Handle change events
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // For uncontrolled mode, update internal state
        if (!isControlled) {
            setInternalChecked(e.target.checked)
        }

        // Call the external onChange handler if provided
        if (onChange) {
            onChange(e, e.target.checked)
        }
    }

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiSwitch
                        color={props.color || 'info'}
                        value={value}
                        name={name}
                        disableRipple
                        checked={checked}
                        onChange={handleChange}
                        {...props}
                        // Remove defaultChecked from props to avoid conflicts
                        defaultChecked={undefined}
                    />
                }
                label={label}
                labelPlacement="start"
                sx={{
                    m: 0,
                    borderRadius: '6px',
                    transition: 'background 0.3s ease-in-out',
                    ...sx,
                }}
                {...rest}
            />
        </FormControl>
    )
}

export default SwitchToggle
