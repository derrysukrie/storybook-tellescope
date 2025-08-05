import {
    FormControl,
    InputAdornment,
    TextField as MuiTextField,
} from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps, FormControlProps as MuiFormControlProps } from '@mui/material';
import { useState, type ChangeEvent, type ReactNode } from 'react';

type BaseProps = {
    size?: 'medium' | 'small';
    onClick?: () => void;
    disabled?: boolean;
    defaultValue?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    FormControlProps?: MuiFormControlProps
};


export type RegularTextFieldProps = BaseProps & {
    appearance?: 'filled' | 'outlined' | 'standard' | 'distinct';
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
} & Omit<MuiTextFieldProps, 'color' | "variant">;

export type InputProps = RegularTextFieldProps;

export const Input = (props: InputProps) => {
    const isControlled = props.value !== undefined && props.onChange !== undefined;
    const [internalValue, setInternalValue] = useState(props.defaultValue ?? '');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isControlled) {
            props.onChange?.(e);
        } else {
            setInternalValue(e.target.value);
        }
    };
    const currentValue = isControlled ? props.value! : internalValue;

    if (props.appearance === 'distinct') {
        const {
            label,
            size = 'medium',
            error,
            helperText,
            startIcon,
            endIcon,
            placeholder,
            sx,
            FormControlProps,
            ...rest
        } = props;

        const hasStartAdornment = !!startIcon;
        const pos = getPos("outlined");
        return (
            <FormControl variant={"outlined"} size={size} error={error} {...FormControlProps}>
                <MuiTextField
                    variant={"outlined"}
                    value={currentValue}
                    onChange={handleChange}
                    size={size}
                    placeholder={placeholder ? placeholder : typeof label === 'string' ? label : undefined}
                    helperText={helperText}
                    error={error}

                    hiddenLabel
                    InputProps={{
                        startAdornment: startIcon ? (
                            <InputAdornment position="start">
                                {startIcon}
                            </InputAdornment>
                        ) : null,
                        endAdornment: endIcon ? (
                            <InputAdornment position="end">
                                {endIcon}
                            </InputAdornment>
                        ) : null,
                    }}
                    sx={(theme) => {
                        const isSmall = size === 'small';
                        const isMedium = size === 'medium';
                        // console.log(isSmall, isMedium);

                        const baseSx = {
                            ...(hasStartAdornment && {
                                '& .MuiInputLabel-root[data-shrink="false"]': {
                                    transform: size === 'medium'
                                        ? `translate(${pos.medium.x}px, ${pos.medium.y}px) scale(1) !important`
                                        : `translate(${pos.small.x}px, ${pos.small.y}px) scale(1) !important`,  // adjusted for filled appearance when there is a start adornment
                                },
                            }),
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: isSmall ? 'rgba(28, 122, 224, 1) !important' : "",
                                borderWidth: isSmall ? '2px' : "1px !important",
                                backgroundColor: isSmall ? 'rgba(87, 73, 63, 0.04)' : '',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: isSmall ? 'rgba(28, 122, 224, 1)' : !currentValue ? 'rgba(121, 142, 208, 1) !important' : "rgba(121, 142, 208, 1) !important",
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: isSmall ? 'rgba(28, 122, 224, 1)' : '',
                                boxShadow: isMedium ? '0px 0px 0 4px rgb(238, 237, 244)' : '',
                            },
                            '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: `${theme.palette.error.main} !important`,
                                boxShadow: '0px 0px 0 4px rgba(255, 218, 214, 1)',
                                backgroundColor: isSmall ? 'transparent' : '',
                                borderWidth: "1px",
                            },
                            '& .MuiOutlinedInput-input::placeholder': {
                                color: isSmall ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.38)',
                            },
                            '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.23) !important',
                                boxShadow: 'none',
                                borderWidth: "1px", // reset border width for disabled state small
                                color: isSmall ? 'rgba(0, 0, 0, 0.38)' : '',
                                backgroundColor: isSmall ? 'transparent' : '',
                            },
                            '& .Mui-disabled .MuiInputBase-input': {
                                '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.6)',
                            },
                        };

                        // If sx is a function, call it with theme, otherwise just use it as an object
                        let mergedSx = baseSx;
                        if (typeof sx === 'function') {
                            mergedSx = { ...baseSx, ...sx(theme) };
                        } else if (typeof sx === 'object' && sx !== null) {
                            mergedSx = { ...baseSx, ...sx };
                        }
                        return mergedSx;
                    }}
                    {...rest}
                    type="text"
                />
            </FormControl>
        );
    }

    const {
        appearance = 'standard',
        size = "medium",
        error,
        helperText,
        startIcon,
        endIcon,
        label,
        placeholder,
        sx,
        InputLabelProps,
        InputProps,
        FormControlProps,
        ...rest
    } = props;
    const hasStartAdornment = !!startIcon;
    const pos = getPos(appearance);

    return (
        <FormControl variant={appearance} size={size} error={error}  {...FormControlProps}>
            <MuiTextField
                variant={appearance}
                value={currentValue}
                onChange={handleChange}
                // InputLabelProps={{ shrink: currentValue.length > 0 }}
                InputLabelProps={{ shrink: currentValue.length > 0 || !!placeholder, ...InputLabelProps }}
                size={size}
                label={label}
                helperText={helperText}
                error={error}
                placeholder={placeholder} // <-- Add this line
                InputProps={{
                    startAdornment: startIcon ? (
                        <InputAdornment position="start">
                            {startIcon}
                        </InputAdornment>
                    ) : null,
                    endAdornment: endIcon ? (
                        <InputAdornment position="end">
                            {endIcon}
                        </InputAdornment>
                    ) : null,
                    ...InputProps
                }}
                sx={{
                    ...(hasStartAdornment && {
                        '& .MuiInputLabel-root[data-shrink="false"]': {
                            transform: size === 'medium'
                                ? `translate(${pos.medium.x}px, ${pos.medium.y}px) scale(1) !important`
                                : `translate(${pos.small.x}px, ${pos.small.y}px) scale(1) !important`,  // adjusted for filled appearance when there is a start adornment
                        },
                    }),
                    '& .Mui-error.MuiInputLabel-root[data-shrink="false"]': {
                        color: currentValue.length > 0 ? undefined : 'rgba(0, 0, 0, 0.6) !important',
                    },
                    '& .Mui-focused.MuiInputLabel-outlined.MuiInputLabel-root[data-shrink="false"]': {
                        color: currentValue.length > 0 ? undefined : 'rgba(0, 0, 0, 0.87)',
                    },
                    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: appearance === 'outlined' ? 'rgba(0, 0, 0, 0.23) !important' : undefined,
                    },
                    '& .Mui-focused.MuiInputLabel-root.MuiInputLabel-filled[data-shrink="false"]': {
                        transform: `translate(12px, ${size === 'medium' ? "24px" : "20px"}) scale(1)`, // adjusted for filled appearance
                    },
                    ...sx
                }}
                {...rest}
                type="text"
            />
        </FormControl>
    );
};

const getPos = (appearance: 'filled' | 'outlined' | 'standard') => {
    const pos = {
        medium: {
            x: 0,
            y: 0,
        },
        small: {
            x: 0,
            y: 0,
        }
    }
    switch (appearance) {
        case 'standard':
            pos.medium.x = 32;
            pos.medium.y = 20;
            pos.small.x = 32;
            pos.small.y = 20;
            break;
        case 'filled':
            pos.medium.x = 45;
            pos.medium.y = 24;
            pos.small.x = 45;
            pos.small.y = 20;
            break;
        case 'outlined':
            pos.medium.x = 45;
            pos.medium.y = 16;
            pos.small.x = 45;
            pos.small.y = 9;
            break;
    }
    return pos;
};