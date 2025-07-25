import { type FC } from 'react';
import {
    Autocomplete as MuiAutocomplete,
    Chip,
    FormControl,
    type Theme,
    Stack
} from '@mui/material';
import type {
    AutocompleteProps as MuiAutocompleteProps,
    AutocompleteRenderInputParams,
} from '@mui/material';
import { Input } from '../input/input';
import { useWheel } from '../../../custom';

type OptionType = string;

interface AutocompleteProps
    extends Omit<
        MuiAutocompleteProps<OptionType, boolean, boolean, boolean>,
        'renderInput' | 'options' | 'value' | 'onChange'
    > {
    label: string;
    options: OptionType[];
    value: OptionType | OptionType[] | null;
    onChange: (value: OptionType | OptionType[]) => void;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
    appearance?: 'standard' | 'filled' | 'outlined' | 'table';
    textFieldProps?: Omit<Partial<React.ComponentProps<typeof Input>>, "appearance">;
    multiple?: boolean;
}

export const Autocomplete: FC<AutocompleteProps> = ({
    label,
    options,
    value,
    onChange,
    multiple = false,
    disabled = false,
    error = false,
    helperText,
    disableCloseOnSelect,
    textFieldProps,
    appearance = "standard",
    size,
    sx,
    ...rest
}) => {

    const scrollElementRef = useWheel<HTMLDivElement>();

    const getSx = (theme: Theme) => {
        if (appearance === 'table') {
            return {
                minWidth: 220,
                '.MuiOutlinedInput-root': {
                    height: "auto",
                    padding: '0',
                },
                '& .MuiInputLabel-root': {
                    display: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none',
                },
                ".MuiInputBase-root.MuiInput-root.MuiInput-underline::before, .MuiInputBase-root.MuiInput-root.MuiInput-underline::after": {
                    borderColor: "transparent"
                },
                ".MuiInputBase-root.MuiInput-root.MuiInput-underline.Mui-error::before, .MuiInputBase-root.MuiInput-root.MuiInput-underline.Mui-error::after": {
                    borderColor: `${theme.palette.error.main}`,
                    borderWidth: "2px !important"
                },
                '& .MuiSelect-select.MuiSelect-standard.MuiSelect-multiple.Mui-error.MuiInputBase-input': {
                    padding: "0 0 2px 0 !important"
                },
            };
        }
    };

    return (
        <FormControl
            fullWidth
            variant={appearance === "table" ? "standard" : appearance}
            sx={(theme) => ({ m: 1, ...getSx(theme) })}
            error={error}
            disabled={disabled}
            size={size}
        >
            <MuiAutocomplete<OptionType, boolean, boolean, boolean>
                multiple={multiple}
                disableCloseOnSelect={disableCloseOnSelect ?? multiple}
                options={options}
                fullWidth
                value={value ?? (multiple ? [] : null)}
                onChange={(_, newValue) => {
                    // Handle null safely
                    if (newValue === null) {
                        onChange(multiple ? [] : '');
                    } else {
                        onChange(newValue as OptionType | OptionType[]);
                    }
                }}
                disabled={disabled}
                renderTags={(tagValue: OptionType[], getTagProps) => (
                    <Stack
                        ref={scrollElementRef}
                        component="div"
                        sx={{
                            flexDirection: "row",
                            // gap: 1,
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            maxWidth: '100%',
                            touchAction: 'pan-y',
                            "& > *": {
                                flexShrink: 0, // Prevent chips from shrinking and shifting
                            },
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}
                    >
                        {
                            tagValue.map((option, index) => (
                                <Chip size="small" clickable label={option} {...getTagProps({ index })} />
                            ))
                        }
                    </Stack>
                )}
                renderInput={(params: AutocompleteRenderInputParams) => {
                    return (
                        <Input
                            {...params}
                            label={label}
                            disabled={disabled}
                            error={error}
                            helperText={helperText}
                            {...textFieldProps}
                            appearance={appearance === "table" ? "distinct" : appearance}
                        />
                    )
                }}
                sx={{
                    "& > .MuiFormControl-root": {
                        width: "100%"
                    },
                    "& .MuiAutocomplete-inputRoot": {
                        flexDirection: "row",
                        gap: 1,
                        overflowX: "hidden",
                        maxWidth: "100%",
                        flexWrap: "nowrap"
                    },
                    ...sx
                }}
                {...rest}
            />
        </FormControl>
    );
};
