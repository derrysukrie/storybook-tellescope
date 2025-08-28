import { Box, MenuItem, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import Select from '../../../atoms/select/select'
import DialogDatePicker from '../../../molecules/date-time-picker/dialog-date-picker/dialog-date-picker'
import { useFormContext } from '../FormContext'

interface DateProps {
    title?: string
    placeholder?: string
    minDate?: Date
    maxDate?: Date
}

export const DateComponent = ({
    title = 'Date and Time',
    placeholder = 'MM/DD/YYYY',
    minDate,
    maxDate,
}: DateProps) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const { updateFormData, currentStep } = useFormContext()

    const handleDatePickerClose = () => {
        updateFormData(currentStep, selectedDate?.toISOString())
        setIsDatePickerOpen(prev => !prev)
    }

    const renderValue = useCallback((selected: string | string[]) => {
        if (typeof selected === 'string') {
            // If no value is selected, show placeholder with grey color
            if (!selected) {
                return <span style={{ color: '#999999' }}>{placeholder}</span>
            }
            return <span style={{ color: '#999999' }}>{selected}</span>
        }
        return selected
    }, [])

    return (
        <Box>
            <Box pt={'48px'} pb={'12px'}>
                <Typography variant="h5">{title}</Typography>
            </Box>
            <Select
                appearance="outlined"
                size="small"
                placeholder={placeholder}
                readOnly
                displayEmpty
                value={selectedDate?.toLocaleDateString() || ''}
                renderValue={renderValue}
                onChange={() => {}}
                onClick={handleDatePickerClose}
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiPaper-root': {
                        borderRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: 'none',
                    },
                }}
            >
                <MenuItem selected value="a">
                    {placeholder}
                </MenuItem>
            </Select>
            {isDatePickerOpen && (
                <Box mt={1}>
                    <DialogDatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        onCancel={handleDatePickerClose}
                        onNext={handleDatePickerClose}
                        onClear={() => {
                            setSelectedDate(null)
                            handleDatePickerClose()
                        }}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </Box>
            )}
        </Box>
    )
}
