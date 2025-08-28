import {
    Chip,
    FormControl,
    type FormControlProps,
    FormHelperText,
    InputLabel,
    Select as MuiSelect,
    Stack,
    type Theme,
} from '@mui/material'
import type { SelectProps as MuiSelectProps, SelectChangeEvent } from '@mui/material/Select'
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'

type VariantType = 'standard' | 'filled' | 'outlined' | 'patientForm' | 'table'
type OptionStyle = 'default' | 'checkmark' | 'checkbox'

interface SelectProps
    extends Omit<MuiSelectProps<string | string[]>, 'onChange' | 'value' | 'variant'> {
    label?: string
    value: string | string[]
    onChange: (event: SelectChangeEvent<string | string[]>) => void
    // options: string[];
    multiple?: boolean
    appearance?: VariantType
    disabled?: boolean
    error?: boolean
    helperText?: string
    optionStyle?: OptionStyle
    size?: 'small' | 'medium'
    children: ReactNode
    hiddenLabel?: boolean
    FormControlProps?: FormControlProps
}

const Select: FC<SelectProps> = ({
    label,
    value,
    onChange,
    // options,
    children,
    multiple = false,
    appearance = 'standard',
    disabled = false,
    error = false,
    helperText,
    size,
    hiddenLabel = false,
    FormControlProps,
    ...rest
}) => {
    const isCustomVariant = appearance === 'patientForm' || appearance === 'table'

    const parentRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<string | number>('200')
    const [isResizing, setIsResizing] = useState<boolean | null>(null)
    // const { expanded } = useAppbarSidebarContext();
    // const previousExpanded = useRef(expanded);

    useEffect(() => {
        let resizeTimeout: ReturnType<typeof setTimeout>

        const handleResize = () => {
            setIsResizing(true)
            clearTimeout(resizeTimeout)

            resizeTimeout = setTimeout(() => {
                if (parentRef.current) {
                    const newWidth = parentRef.current.clientWidth

                    setWidth(newWidth)
                }
                setIsResizing(false)
            }, 300)
        }

        window.addEventListener('resize', handleResize)

        // Set initial width
        if (parentRef.current) {
            setWidth(parentRef.current.clientWidth)
        }

        return () => {
            clearTimeout(resizeTimeout)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const renderValue = (selected: string | string[]) => {
        if (multiple && Array.isArray(selected)) {
            return (
                !isResizing && (
                    <Stack
                        component="div"
                        ref={childRef}
                        sx={{
                            flexDirection: 'row',
                            gap: 1,
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            maxWidth: `${(width as number) - 40}px !important`,
                            paddingRight: appearance === 'table' ? '40px' : undefined,
                            // Hide scrollbar for all major browsers
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            '-ms-overflow-style': 'none', // IE and Edge
                            opacity: isResizing !== null ? 0 : 1,
                            animation:
                                isResizing !== null ? 'fadeInOpacity 0.3s forwards' : undefined,
                            '@keyframes fadeInOpacity': {
                                from: { opacity: 0 },
                                to: { opacity: 1 },
                            },
                            borderRadius: '4px',
                        }}
                    >
                        {selected.map((val: string) => (
                            <Chip
                                disabled={disabled}
                                key={val}
                                label={val}
                                size="small"
                                clickable
                                onMouseDown={e => e.stopPropagation()}
                                onDelete={e => {
                                    e.stopPropagation()
                                    const filtered = selected.filter(item => item !== val)
                                    onChange({
                                        target: {
                                            value: filtered,
                                            name: label,
                                        },
                                    } as SelectChangeEvent<string | string[]>)
                                }}
                                sx={{
                                    textTransform: 'capitalize',
                                    maxWidth: '100%',
                                }}
                            />
                        ))}
                    </Stack>
                )
            )
        }
        return selected
    }

    const getSx = (theme: Theme) => {
        if (appearance === 'standard') {
            return {
                '& .MuiInputLabel-root': {
                    color: '#b8b8b8',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#b8b8b8',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#b8b8b8',
                },
                // // '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                // //     borderBottomColor: '#EFF0F2',
                // // },
                '&:hover .MuiInputLabel-root': {
                    color: '#b8b8b8',
                },
            }
        }
        if (appearance === 'patientForm') {
            return {
                '& .MuiInputLabel-outlined, & .MuiOutlinedInput-notchedOutline > legend': {
                    display: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    top: 0,
                    // borderColor: '#0000003B',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#798ED0 !important',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '2px',
                    borderColor: '#798ED0 !important',
                    boxShadow: '0px 0px 0 4px rgb(238, 237, 244) !important',
                },
                // "&:focus .MuiOutlinedInput-notchedOutline": {
                //     borderColor: '#0000003B !important',
                // },
                '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0000003B !important',
                },
                '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${theme.palette.error.main} !important`,
                    boxShadow: '0px 0px 0 4px rgba(255, 218, 214, 1) !important',
                    borderWidth: '1px !important',
                },
            }
        }
        if (appearance === 'table') {
            return {
                minWidth: 220,
                maxWidth: '100%',
                '& .MuiInputBase-root.MuiInput-root': {
                    marginTop: '0px !important',
                },
                '.MuiOutlinedInput-root': {
                    height: 'auto',
                    padding: '24px',
                },
                '& .MuiInputLabel-root': {
                    display: 'none',
                },
                '& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconStandard': {
                    display: 'none',
                    backgroundColor: '#fff',
                    paddingRight: '8px',
                    paddingLeft: '8px',
                    // top: size === "medium" ? "4px" : "1px",
                    top: '4px',
                    width: 'auto',
                    zIndex: 999,
                },
                '&:hover': {
                    '& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconStandard': {
                        display: 'block',
                        paddingLeft: '8px',
                    },
                },
                '.MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input:focus': {
                    background: 'transparent !important',
                },
                '& .Mui-focused ': {
                    '& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconStandard': {
                        display: 'block',
                        paddingLeft: '8px',
                    },
                },
                '.MuiSelect-select.MuiSelect-standard.MuiSelect-multiple.MuiInputBase-input': {
                    paddingRight: '0',
                    paddingY: '4px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none',
                },
                '.MuiInputBase-root.MuiInput-root.MuiInput-underline::before, .MuiInputBase-root.MuiInput-root.MuiInput-underline::after':
                    {
                        borderColor: 'transparent',
                    },
                '.MuiInputBase-root.MuiInput-root.MuiInput-underline.Mui-error::before, .MuiInputBase-root.MuiInput-root.MuiInput-underline.Mui-error::after':
                    {
                        borderColor: `${theme.palette.error.main}`,
                        borderWidth: '2px !important',
                    },
                '& .MuiSelect-select.MuiSelect-standard.MuiSelect-multiple.Mui-error.MuiInputBase-input':
                    {
                        padding: '0 0 2px 0 !important',
                    },
            }
        }
    }

    return (
        <FormControl
            fullWidth
            variant={
                appearance === 'patientForm'
                    ? 'outlined'
                    : appearance === 'table'
                      ? 'standard'
                      : appearance
            }
            {...FormControlProps}
            sx={theme => ({ ...getSx(theme) })}
            error={error}
            disabled={disabled}
            size={size}
            hiddenLabel={hiddenLabel}
            ref={parentRef}
        >
            {!hiddenLabel ? (
                <InputLabel variant={isCustomVariant ? 'outlined' : appearance}>{label}</InputLabel>
            ) : null}

            <MuiSelect
                multiple={multiple}
                value={value}
                onChange={onChange}
                renderValue={renderValue}
                error={error}
                disabled={disabled}
                MenuProps={
                    isCustomVariant
                        ? {
                              PaperProps: {
                                  sx: {
                                      mt: 1,
                                      overflowY: 'auto',
                                  },
                              },
                          }
                        : undefined
                }
                {...rest}
            >
                {children}
            </MuiSelect>
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default Select
