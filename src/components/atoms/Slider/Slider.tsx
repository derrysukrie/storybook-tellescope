import { Slider as MuiSlider, type SliderProps } from '@mui/material'

export const Slider = ({
    ...props
}: SliderProps & {
    stepper?: boolean
}) => {
    return (
        <MuiSlider
            {...props}
            {...(props.stepper && {
                ...props,
            })}
        />
    )
}
