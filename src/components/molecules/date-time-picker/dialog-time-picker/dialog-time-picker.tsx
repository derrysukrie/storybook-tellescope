import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Button } from '../../../atoms/button/button'
import TimeInput from '../../../atoms/date-time-elements/time-input'
import { VerticalAmPmToggle } from '../../../atoms/date-time-elements/vertical-am-pm-selector'

interface DialogTimePickerProps {
    onCancel?: () => void
    onOk?: (time: string) => void
}

const DialogTimePicker = ({ onCancel, onOk }: DialogTimePickerProps) => {
    const [hours, setHours] = useState<string>('02')
    const [minutes, setMinutes] = useState<string>('30')
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [internalAmPm, setInternalAmPm] = useState<'AM' | 'PM'>('PM')

    const scheduleTimes = [
        `1:00${internalAmPm}`,
        `1:30${internalAmPm}`,
        `2:00${internalAmPm}`,
        `2:30${internalAmPm}`,
        `3:00${internalAmPm}`,
        `3:30${internalAmPm}`,
        `4:00${internalAmPm}`,
        `4:30${internalAmPm}`,
        `5:00${internalAmPm}`,
        `5:30${internalAmPm}`,
    ]

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)

        // Parse the time string and update the inputs
        const timePart = time.slice(0, -2) // Remove last 2 characters (AM/PM)
        const period = time.slice(-2) // Get last 2 characters (AM/PM)
        const [hour, minute] = timePart.split(':')

        setHours(hour.padStart(2, '0'))
        setMinutes(minute.padStart(2, '0'))
        setInternalAmPm(period as 'AM' | 'PM')
    }

    const handleAmPmChange = (amPm: 'AM' | 'PM') => {
        setInternalAmPm(amPm)
        // Check if current time matches any schedule option
        const currentTime = `${hours}:${minutes}${amPm}`
        if (scheduleTimes.includes(currentTime)) {
            setSelectedTime(currentTime)
        } else {
            setSelectedTime(null)
        }
    }

    return (
        <Stack
            sx={{
                width: 328,
                border: '1px solid #0000001F',
                borderRadius: '16px',
                backgroundColor: 'common.white',
                padding: 3,
                gap: '20px',
            }}
        >
            {/* header */}
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Select Time
            </Typography>
            {/* Input Selection */}
            <Stack
                sx={{
                    gap: '36px',
                }}
            >
                {/* Input */}
                <Stack
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '2px',
                        }}
                    >
                        <TimeInput
                            value={hours}
                            onChange={e => {
                                const value = e.target.value
                                const numValue = Number(value)
                                if (numValue <= 5) {
                                    setHours(value)
                                    // Check if current time matches any schedule option
                                    const currentTime = `${value}:${minutes}${internalAmPm}`
                                    const oppositeTime = `${value}:${minutes}${internalAmPm === 'AM' ? 'PM' : 'AM'}`

                                    if (scheduleTimes.includes(currentTime)) {
                                        setSelectedTime(currentTime)
                                    } else if (scheduleTimes.includes(oppositeTime)) {
                                        setSelectedTime(oppositeTime)
                                        setInternalAmPm(internalAmPm === 'AM' ? 'PM' : 'AM')
                                    } else {
                                        setSelectedTime(null)
                                    }
                                }
                            }}
                        />
                        <Typography sx={{ fontSize: '57px' }}>:</Typography>
                        <TimeInput
                            value={minutes}
                            onChange={e => {
                                const value = e.target.value
                                const numValue = Number(value)
                                if (numValue <= 59) {
                                    setMinutes(value)
                                    // Check if current time matches any schedule option
                                    const currentTime = `${hours}:${value}${internalAmPm}`
                                    const oppositeTime = `${hours}:${value}${internalAmPm === 'AM' ? 'PM' : 'AM'}`

                                    if (scheduleTimes.includes(currentTime)) {
                                        setSelectedTime(currentTime)
                                    } else if (scheduleTimes.includes(oppositeTime)) {
                                        setSelectedTime(oppositeTime)
                                        setInternalAmPm(internalAmPm === 'AM' ? 'PM' : 'AM')
                                    } else {
                                        setSelectedTime(null)
                                    }
                                }
                            }}
                        />
                    </Stack>
                    <VerticalAmPmToggle value={internalAmPm} onChange={handleAmPmChange} />
                </Stack>
                {/* Schedule Selector */}
                <Stack
                    sx={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '10px',
                    }}
                >
                    {scheduleTimes.map((time, index) => (
                        <Button
                            appearance="outlined"
                            sx={{
                                padding: '4px 12px',
                                borderRadius: '8px',
                                border: '1px solid #4A5C9280',
                                width: 'calc(50% - 5px)',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'common.black',
                                fontWeight: 500,
                                backgroundColor: selectedTime === time ? '#DEEAF8' : 'transparent',
                            }}
                            key={index.toString()}
                            onClick={() => handleTimeSelect(time)}
                        >
                            {time}
                        </Button>
                    ))}
                </Stack>
            </Stack>
            {/* Footer */}
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
                <Button appearance="text" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    appearance="text"
                    onClick={() => onOk?.(selectedTime ?? `${hours}:${minutes}${internalAmPm}`)}
                >
                    OK
                </Button>
            </Stack>
        </Stack>
    )
}

export default DialogTimePicker
