import { Slider as MuiSlider, type SliderProps } from "@mui/material";

export default function Slider({
  ...props
}: SliderProps & {
  stepper?: boolean;
}) {
  return (
    <MuiSlider
      {...props}
      {...(props.stepper && {
        ...props,
      })}
    />
  );
}
