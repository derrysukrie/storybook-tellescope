import { Stack } from '@mui/material'

interface SingleSelectProps {
    value?: string
    selectedValue?: string
    appearance?: 'enabled' | 'hovered' | 'selected'
    disabled?: boolean
    onClick?: () => void
}

const SingleSelect = ({
    value,
    selectedValue,
    appearance = 'enabled',
    disabled = false,
    onClick,
}: SingleSelectProps) => {
    const isSelected = selectedValue === value

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick()
        }
    }

    return (
        <Stack
            sx={{
                border: '1px solid #4A5C9280',
                borderRadius: '4px',
                padding: '8px 24px',
                height: '80px',
                color: 'primary.main',
                alignItems: 'center',
                flexDirection: 'row',
                maxWidth: '456px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'all 0.2s ease-in-out',
                ...(appearance === 'enabled' && {
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: '#4A5C920A',
                        borderColor: 'primary.main',
                    },
                }),
                ...(appearance === 'hovered' && {
                    backgroundColor: '#4A5C920A',
                    borderColor: 'primary.main',
                }),
                ...(isSelected && {
                    backgroundColor: '#4A5C920A',
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                    boxShadow: '0 2px 4px rgba(74, 92, 146, 0.1)',
                }),
            }}
            onClick={handleClick}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isSelected}
            aria-disabled={disabled}
        >
            {value}
        </Stack>
    )
}

export default SingleSelect
