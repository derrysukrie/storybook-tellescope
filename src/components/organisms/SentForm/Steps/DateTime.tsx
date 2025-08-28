import { Box, MenuItem, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import Select from '../../../atoms/select/select'
import DialogDatePicker from '../../../molecules/date-time-picker/dialog-date-picker/dialog-date-picker'
import DialogTimePicker from '../../../molecules/date-time-picker/dialog-time-picker/dialog-time-picker'
import { useFormContext } from '../FormContext'

interface DateTimeProps {
    title?: string
    placeholder?: string
    minDate?: Date
    maxDate?: Date
}

export const DateTime = ({
    title = 'Date and Time',
    placeholder = 'MM/DD/YYYY',
    minDate,
    maxDate,
}: DateTimeProps) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const { updateFormData, currentStep } = useFormContext()

    const handleDatePickerClose = () => {
        updateFormData(currentStep, selectedDate?.toISOString())
        setIsDatePickerOpen(false)
        setIsTimePickerOpen(true)
    }

    const handleDatePickerOpen = () => {
        setIsDatePickerOpen(true)
    }

    const handleTimePickerClose = () => {
        updateFormData(currentStep, `${selectedDate?.toISOString()} ${selectedTime}`)
        setIsTimePickerOpen(false)
    }

    const renderValue = useCallback(
        (selected: string | string[]) => {
            if (typeof selected === 'string') {
                // If no value is selected, show placeholder with grey color
                if (!selected) {
                    return <span style={{ color: '#999999' }}>{placeholder}</span>
                }
                return (
                    <span style={{ color: '#999999' }}>
                        {selected} at {selectedTime}
                    </span>
                )
            }
            return selected
        },
        [selectedTime]
    )

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
                onClick={handleDatePickerOpen}
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
                        onCancel={() => setIsDatePickerOpen(false)}
                        onNext={handleDatePickerClose}
                        minDate={minDate}
                        maxDate={maxDate}
                        onClear={() => {
                            setSelectedDate(null)
                            setIsDatePickerOpen(false)
                        }}
                    />
                </Box>
            )}
            {isTimePickerOpen && (
                <Box mt={1}>
                    <DialogTimePicker
                        onCancel={() => setIsTimePickerOpen(false)}
                        onOk={time => {
                            setSelectedTime(time)
                            handleTimePickerClose()
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}
