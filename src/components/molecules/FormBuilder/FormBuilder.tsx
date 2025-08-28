import { MoreHoriz } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, IconButton, styled, Typography } from '@mui/material'

interface FormBuilderProps {
    /**
     * The type of form builder with different color schemes
     */
    onEdit: () => void
    type: 'tellescope-soft' | 'tellescope' | 'agua'
    /**
     * Whether the component is in selected state
     * @default false
     */
    selected?: boolean
}

// Color schemes for each type
const colorSchemes = {
    'tellescope-soft': {
        primary: '#798ED0',
        secondary: '#585E72',
        accent: '#DDE1F9',
        background: '#F4F3FA',
        title: 'Tellescope Soft',
    },
    tellescope: {
        primary: '#4A5C92',
        secondary: '#585E72',
        accent: '#0288D1',
        background: '#FFFFFF',
        title: 'Tellescope',
    },
    agua: {
        primary: '#ACE1D8',
        secondary: '#889390',
        accent: '#86929F',
        background: '#F4FBF8',
        title: 'Agua',
    },
}

const FormHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                padding: '22px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {children}
        </Box>
    )
}

const FormFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                padding: '15px 16px',
                borderTopWidth: 1,
                borderTopStyle: 'solid',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderTopColor: '#E0E0E0',
                borderBottomLeftRadius: 28,
                borderBottomRightRadius: 28,
            }}
        >
            {children}
        </Box>
    )
}

export const FormBuilder = ({ selected = false, type, onEdit }: FormBuilderProps) => {
    const colors = colorSchemes[type]

    return (
        <FormWrapper backgroundColor={colors.background}>
            <FormHeader>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color={colors.primary}>Primary</Typography>
                    <CheckCircleIcon
                        sx={{
                            color: selected ? '#4CAF50' : '#9E9E9E',
                        }}
                    />
                </Box>
                <Typography color={colors.secondary}>Secondary</Typography>
                <Typography color={colors.accent}>Accent</Typography>
            </FormHeader>
            <FormFooter>
                <Typography>{colors.title}</Typography>
                <IconButton onClick={onEdit}>
                    <MoreHoriz />
                </IconButton>
            </FormFooter>
        </FormWrapper>
    )
}

const FormWrapper = styled(Box)<{ backgroundColor: string }>(({ backgroundColor }) => ({
    border: '1px solid #E0E0E0',
    borderRadius: 28,
    width: 320,
    maxWidth: 320,
    margin: '0 auto',
    backgroundColor: backgroundColor,
    transition: 'border-color 0.2s ease',
    '&:hover': {
        borderColor: 'black',
        borderWidth: 1,
        cursor: 'pointer',
        borderStyle: 'solid',
    },
}))
