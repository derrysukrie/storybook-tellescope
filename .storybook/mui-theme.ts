// theme.ts
import { alpha, createTheme } from '@mui/material/styles'

declare module '@mui/material/IconButton' {
    interface IconButtonPropsSizeOverrides {
        table: true
    }
}

declare module '@mui/material/Radio' {
    interface RadioPropsSizeOverrides {
        large: true
    }
}

declare module '@mui/material/Select' {
    interface SelectPropsVariantOverrides {
        table: true
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        custom: true
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(74, 92, 146, 1)',
        },
        secondary: {
            main: 'rgba(88, 94, 114, 1)',
        },
        info: {
            main: 'rgba(2, 136, 209, 1)',
        },
        error: {
            main: '#BA1A1A',
        },
        action: {
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    fontWeight: 600,
                },
                sizeLarge: {
                    padding: '8px 24px',
                },
                sizeMedium: {
                    padding: '8px 16px',
                },
                sizeSmall: {
                    padding: '4px 12px',
                },
            },
            variants: [
                /* Box Shadow */
                {
                    props: { variant: 'contained' },
                    style: {
                        boxShadow:
                            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),  0 1px 5px 0 rgba(0, 0, 0, 0.12)', // enabled
                        '&:hover': {
                            boxShadow:
                                '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14) ,  0 1px 10px 0 rgba(0, 0, 0, 0.12)', // hovered
                        },
                        '&.Mui-focusVisible': {
                            boxShadow:
                                '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14) ,  0 1px 18px 0 rgba(0, 0, 0, 0.12)', // focused
                        },
                        '&:active': {
                            boxShadow:
                                '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14) ,  0 1px 18px 0 rgba(0, 0, 0, 0.12)', // pressed
                        },
                    },
                },
                /* Primary Appearance */
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(19, 45, 104, 1)', // hovered color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(74, 92, 146, 1)', // pressed
                        },
                    },
                },
                {
                    props: { variant: 'outlined', color: 'primary' },
                    style: {
                        borderColor: 'rgba(74, 92, 146, 0.5)',
                    },
                },
                /* Secondary Appearance */
                {
                    props: { variant: 'contained', color: 'secondary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(44, 48, 62, 1)', // hovered color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(88, 94, 114, 1)', // pressed
                        },
                    },
                },
                {
                    props: { variant: 'outlined', color: 'secondary' },
                    style: {
                        borderColor: 'rgba(88, 94, 114, 0.5)',
                    },
                },
                /* Info Appearance */
                {
                    props: { variant: 'contained', color: 'info' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(1, 87, 155, 1)', // hovered color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(2, 136, 209, 1)', // pressed
                        },
                    },
                },
                {
                    props: { variant: 'outlined', color: 'info' },

                    style: {
                        borderColor: 'rgba(2, 136, 209, 0.5)',
                        '& .MuiTouchRipple-root': {
                            color: 'rgba(74, 92, 146, 0.3)',
                        },
                    },
                },
                {
                    props: { variant: 'text', color: 'info' },
                    style: {
                        '& .MuiTouchRipple-root': {
                            color: 'rgba(74, 92, 146, 0.3)',
                        },
                    },
                },
            ],
        },
        MuiIconButton: {
            variants: [
                /* Primary Appearance */
                {
                    props: { color: 'primary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(74, 92, 146, 0.04)', // focused color
                        },
                        '&:focus': {
                            backgroundColor: 'rgba(74, 92, 146, 0.3)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(74, 92, 146, 0.3)', // pressed
                        },
                    },
                },
                /* Secondary Appearance */
                {
                    props: { color: 'secondary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(88, 94, 114, 0.04)', // focused color
                        },
                        '&:focus': {
                            backgroundColor: 'rgba(88, 94, 114, 0.3)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(88, 94, 114, 0.3)', // pressed
                        },
                    },
                },
                /* Info Appearance */
                {
                    props: { color: 'info' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(2, 136, 209, 0.04)', // focused color
                        },
                        '&:focus': {
                            backgroundColor: 'rgba(2, 136, 209, 0.3)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(2, 136, 209, 0.3)', // pressed
                        },
                    },
                },
                /* Default Appearance */
                {
                    props: { color: 'default' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)', // focused color
                        },
                        '&:focus': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color
                        },

                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // pressed
                        },
                    },
                },
                /* Default Appearance & Size Table */
                {
                    props: { size: 'table' },
                    style: {
                        borderRadius: '4px !important',
                        width: '24px',
                        height: '24px',
                        '&>svg': {
                            width: '20px',
                            height: '19px',
                        },
                    },
                },
            ],
        },
        MuiCheckbox: {
            variants: [
                {
                    props: { color: 'primary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(74, 92, 146, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color when Checked : false
                        },
                        '&.MuiCheckbox-root.Mui-checked:active': {
                            backgroundColor: 'rgba(74, 92, 146, 0.3)', // focused color
                        },
                    },
                },
                {
                    props: { color: 'secondary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(88, 94, 114, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color when Checked : false
                        },
                        '&.MuiCheckbox-root.Mui-checked:active': {
                            backgroundColor: 'rgba(88, 94, 114, 0.3)', // focused color
                        },
                    },
                },
                {
                    props: { color: 'info' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(2, 136, 209, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color when Checked : false
                        },
                        '&.MuiCheckbox-root.Mui-checked:active': {
                            backgroundColor: 'rgba(2, 136, 209, 0.3)', // focused color
                        },
                    },
                },
            ],
        },
        MuiRadio: {
            variants: [
                {
                    props: { size: 'large' },
                    style: {
                        padding: '11.33px',
                        '& .MuiSvgIcon-root': {
                            width: '23.33px',
                            height: '23.33px',
                        },
                    },
                },
                {
                    props: { size: 'medium' },
                    style: {
                        padding: '11px',
                        '& .MuiSvgIcon-root': {
                            width: '20px',
                            height: '20px',
                        },
                    },
                },
                {
                    props: { size: 'small' },
                    style: {
                        padding: '10.67px',
                        '& .MuiSvgIcon-root': {
                            width: '16.67px',
                            height: '16.67px',
                        },
                    },
                },
                {
                    props: { color: 'default' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focus visible color
                        },
                    },
                },
                {
                    props: { color: 'primary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(74, 92, 146, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color when Checked : false
                        },
                        '&.MuiRadio-root.Mui-checked:active': {
                            backgroundColor: 'rgba(74, 92, 146, 0.3)', // focused color
                        },
                    },
                },
                {
                    props: { color: 'secondary' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(88, 94, 114, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color when Checked : false
                        },
                        '&.MuiRadio-root.Mui-checked:active': {
                            backgroundColor: 'rgba(88, 94, 114, 0.3)', // focused color
                        },
                    },
                },
                {
                    props: { color: 'info' },
                    style: {
                        '&:hover': {
                            backgroundColor: 'rgba(2, 136, 209, 0.04)', // focused color
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)', // focused color when Checked : false
                        },
                        '&.MuiRadio-root.Mui-checked:active': {
                            backgroundColor: 'rgba(2, 136, 209, 0.3)', // focused color
                        },
                    },
                },
            ],
        },
        MuiAutocomplete: {
            styleOverrides: {
                option: {
                    '&[aria-selected="true"], &[aria-selected="true"].Mui-focused': {
                        backgroundColor: '#DDE1F9 !important',
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: () => ({
                    padding: 0,
                    overflow: 'visible',
                    '& .PrivateSwitchBase-input': {
                        width: '100% !important',
                    },
                    '& .MuiSwitch-switchBase': {
                        margin: 0,
                        top: '50%',
                        transform: 'translate(0,-50%)',
                        transition: '300ms ease-in-out',
                        '&:active': {
                            background: alpha(theme.palette.common.white, 0.3),
                        },
                        '&.Mui-checked': {
                            color: '#fff',
                            '& .MuiSwitch-thumb': {
                                background: '#fff',
                            },
                            '& + .MuiSwitch-track': {
                                opacity: 1,
                                border: '2px solid transparent',
                            },
                        },
                        '&.Mui-disabled': {
                            '& .MuiSwitch-thumb': {
                                background: '#F5F5F5',
                            },
                            '&.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                border: '2px solid transparent',
                            },
                            '& + .MuiSwitch-track': {
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                border: '2px solid #F5F5F5',
                                opacity: 1,
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        background: '#79747E',
                        transition: '300ms ease-in-out',
                    },
                    '& .MuiSwitch-track': {
                        background: '#fff',
                        borderRadius: 32 / 2,
                        opacity: 1,
                        transition: '300ms ease-in-out',
                    },
                }),
                sizeMedium: {
                    width: 52,
                    height: 32,
                    '& .MuiSwitch-switchBase': {
                        padding: '11px',
                        left: '-4px',
                        '&.Mui-checked': {
                            transform: 'translate(21px,-50%)',
                            padding: '7px',
                            '& .MuiSwitch-thumb': {
                                width: 24,
                                height: 24,
                            },
                        },
                    },
                    '&:hover .MuiSwitch-track': {
                        borderColor: 'rgba(121, 116, 126, 0.38)',
                    },
                    '& .MuiSwitch-thumb': {
                        width: 16,
                        height: 16,
                    },
                    '& .MuiSwitch-track': {
                        border: '2px solid #79747E',
                    },
                },
                sizeSmall: {
                    width: 26,
                    height: 16,
                    '& .MuiSwitch-switchBase': {
                        left: '-2.5px',
                        padding: '6.5px !important',
                        transform: 'translate(0,-52%) !important',
                        '&.Mui-checked': {
                            transform: 'translate(8.5px,-52%) !important',
                            color: '#fff',
                            padding: '5.5px !important',
                            '& .MuiSwitch-thumb': {
                                width: '12px !important',
                                height: '12px !important',
                            },
                            '&.Mui-disabled': {
                                '& .MuiSwitch-thumb': {
                                    background: 'rgba(245, 245, 245, 1)',
                                },
                            },
                        },
                        '&.Mui-disabled': {
                            '& + .MuiSwitch-track': {
                                borderWidth: '1px',
                            },
                            '& .MuiSwitch-thumb': {
                                background: 'rgba(121, 116, 126, 1)',
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        width: '8px !important',
                        height: '8px !important',
                        transition: '300ms ease-in-out',
                    },
                    '& .MuiSwitch-track': {
                        border: '1px solid #79747E',
                    },
                },
            },
            variants: [
                /* Default Appearance */
                {
                    props: { color: 'default' },
                    style: ({ theme }) => ({
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    background: theme.palette.grey[500],
                                },
                            },
                        },
                    }),
                },
                /* Default Appearance & Small Size */
                {
                    props: { color: 'default', size: 'small' },
                    style: ({ theme }) => ({
                        '& .MuiSwitch-switchBase:hover': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    background: theme.palette.common.white,
                                    border: '1px solid rgba(121, 116, 126, 0.5)',
                                },
                            },
                        },
                        '& .MuiSwitch-switchBase:active': {
                            '&.Mui-checked': {
                                padding: '4.5px !important',
                                transform: 'translate(11.5px,-50%) !important',
                                '& + .MuiSwitch-track': {
                                    background: 'rgba(0, 0, 0, 0.5) ',
                                    border: '1px solid rgba(0, 0, 0, 0) ',
                                },
                                '& .MuiSwitch-thumb': {
                                    background: 'rgba(121, 116, 126, 1)',
                                    width: '8px !important',
                                    height: '8px !important',
                                },
                            },
                        },
                    }),
                },
                /* Primary Appearance */
                {
                    props: { color: 'primary' },
                    style: ({ theme }) => ({
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    background: alpha(theme.palette.primary.main, 0.5),
                                },
                                '&:hover': {
                                    background: `${alpha(theme.palette.secondary.main, 0.04)} !important`,
                                },
                                '&:active': {
                                    background: `${alpha(theme.palette.primary.main, 0.3)} !important`,
                                    '& .MuiSwitch-thumb': {
                                        background: 'rgba(121, 116, 126, 1) !important',
                                    },
                                },
                            },
                        },
                        '&:hover .MuiSwitch-track': {
                            borderColor: 'rgba(121, 116, 126, 1)',
                        },
                    }),
                },
                /* Primary Appearance & Small Size */
                {
                    props: { color: 'primary', size: 'small' },
                    style: {
                        '& .MuiSwitch-switchBase:hover': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    // borderColor: "rgba(121, 116, 126, 1)",
                                },
                            },
                        },
                        '& .MuiSwitch-switchBase:active': {
                            '&.Mui-checked': {
                                padding: '4.5px !important',
                                transform: 'translate(11.5px,-50%) !important',
                                '& .MuiSwitch-thumb': {
                                    background: 'rgba(121, 116, 126, 1)',
                                    width: '8px !important',
                                    height: '8px !important',
                                },
                            },
                        },
                    },
                    // style: ({
                    //     "&:hover .MuiSwitch-track" :{
                    //         borderColor: "rgba(121, 116, 126, 1)",
                    //     },
                    // }),
                },
                /* Secondary Appearance */
                {
                    props: { color: 'secondary' },
                    style: ({ theme }) => ({
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    background: alpha(theme.palette.secondary.main, 0.5),
                                },
                                '& .MuiSwitch-thumb': {
                                    background: theme.palette.secondary.main,
                                },
                                '&:hover': {
                                    background: `${alpha(theme.palette.secondary.main, 0.04)} !important`,
                                },
                                '&:active': {
                                    background: `${alpha(theme.palette.secondary.main, 0.3)} !important`,
                                },
                            },
                        },
                    }),
                },
                /* Info Appearance */
                {
                    props: { color: 'info' },
                    style: ({ theme }) => ({
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    background: theme.palette.info.main,
                                },
                                '&:hover': {
                                    background: `${alpha(theme.palette.info.main, 0.04)} !important`,
                                },
                                '&:active': {
                                    background: `${alpha(theme.palette.info.main, 0.3)} !important`,
                                },
                            },
                        },
                    }),
                },
            ],
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',
                    '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: '#DDE1F9',
                    },
                    '& > svg': {
                        width: '24px',
                        color: '#0000008F',
                    },
                },
            },
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    '&': {
                        padding: '6px 16px',
                    },
                },
            },
        },
    },
})
