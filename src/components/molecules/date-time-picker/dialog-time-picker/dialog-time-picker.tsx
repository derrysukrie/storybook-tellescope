import { Stack, Typography } from "@mui/material"
import { useState, type ChangeEvent } from "react"
import TimeInput from "../../../atoms/date-time-elements/time-input"
import { VerticalAmPmToggle } from "../../../atoms/date-time-elements/vertical-am-pm-selector"
import { Button } from "../../../atoms/button/button"

export interface DialogTimePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  onAccept?: (date: Date) => void
  onCancel?: () => void
  ampm?: boolean
  timeStep?: 30
  minTime?: Date
  maxTime?: Date
}

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

const setHM = (base: Date, hours24: number, minutes: number) => {
  const d = new Date(base)
  d.setHours(hours24, minutes, 0, 0)
  return d
}

const DialogTimePicker = ({
  value,
  onChange,
  onAccept,
  onCancel,
  ampm = true,
  timeStep = 30,
  minTime,
  maxTime,
}: DialogTimePickerProps) => {
  const [internalValue, setInternalValue] = useState<Date>(value ?? new Date())
  const current = value ?? internalValue

  const commit = (next: Date) => {
    if (onChange) onChange(next)
    else setInternalValue(next)
  }

  // Derive display values
  const hours24 = current.getHours()
  const minutes = current.getMinutes()
  const period = ampm ? (hours24 >= 12 ? "PM" : "AM") : undefined
  const displayHour = ampm
    ? String((hours24 % 12) || 12).padStart(2, "0")
    : String(hours24).padStart(2, "0")
  const displayMinute = String(minutes).padStart(2, "0")

  // Handlers
  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (ampm) {
      const h12 = clamp(parseInt(raw || "0", 10) || 0, 1, 12)
      const h24 = period === "PM" ? (h12 % 12) + 12 : h12 % 12
      commit(setHM(current, h24, minutes))
    } else {
      const h = clamp(parseInt(raw || "0", 10) || 0, 0, 23)
      commit(setHM(current, h, minutes))
    }
  }

  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const m = clamp(parseInt(e.target.value || "0", 10) || 0, 0, 59)
    commit(setHM(current, hours24, m))
  }

  const handlePeriodChange = (p: "AM" | "PM") => {
    if (!ampm) return
    let h = hours24
    if (p === "AM" && h >= 12) h -= 12
    if (p === "PM" && h < 12) h += 12
    commit(setHM(current, h, minutes))
  }

  // Quick options
  const options: { key: number; date: Date; label: string }[] = []
  const base = new Date(current)
  let start = minTime ? new Date(minTime) : setHM(base, 13, 0)
  let end = maxTime ? new Date(maxTime) : setHM(base, 17, 30)
  if (start > end) [start, end] = [end, start]
  for (let t = new Date(start); t <= end; t = new Date(t.getTime() + timeStep * 60000)) {
    options.push({ key: t.getTime(), date: new Date(t), label: t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: ampm }) })
  }

  return (
    <Stack sx={{
      width: 328,
      border: "1px solid #0000001F",
      borderRadius: "16px",
      padding: 3,
      gap: "20px",
    }}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>Select Time</Typography>

      <Stack sx={{ gap: "36px" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "12px" }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "2px" }}>
            <TimeInput value={displayHour} onChange={handleHourChange} />
            <Typography sx={{ fontSize: "57px" }}>:</Typography>
            <TimeInput value={displayMinute} onChange={handleMinuteChange} />
          </Stack>
          {ampm && (
            <VerticalAmPmToggle value={period} onChange={handlePeriodChange} />
          )}
        </Stack>

        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: "10px" }}>
          {options.map((opt) => (
            <Button
              key={opt.key}
              appearance="outlined"
              sx={{
                padding: "4px 12px",
                borderRadius: "8px",
                border: "1px solid #4A5C9280",
                width: "calc(50% - 5px)",
                flexDirection: "row",
                justifyContent: "center",
                cursor: "pointer",
                color: "common.black",
                fontWeight: 500,
              }}
              onClick={() => commit(opt.date)}
            >
              {opt.label}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button appearance="text" onClick={() => onCancel?.()}>Cancel</Button>
        <Button appearance="text" onClick={() => onAccept?.(current)}>OK</Button>
      </Stack>
    </Stack>
  )
}

export default DialogTimePicker
