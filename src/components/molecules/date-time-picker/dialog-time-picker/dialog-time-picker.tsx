import { Stack, Typography } from "@mui/material"
import TimeInput from "../../../atoms/date-time-elements/time-input"
import { VerticalAmPmToggle } from "../../../atoms/date-time-elements/vertical-am-pm-selector"
import { Button } from "../../../atoms/button/button"

const DialogTimePicker = () => {
  return (
    <Stack sx={{
      width: 328,
      border: "1px solid #0000001F",
      borderRadius: "16px",
      padding: 3,
      gap: "20px"
    }}>
      {/* header */}
      <Typography variant="body1" sx={{ fontWeight: 600 }}>Select Time</Typography>
      {/* Input Selection */}
      <Stack
        sx={{
          gap: "36px"
        }}>
        {/* Input */}
        <Stack sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: "12px"
        }}>
          <Stack sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "2px"
          }}>
            <TimeInput />
            <Typography sx={{ fontSize: "57px" }}>:</Typography>
            <TimeInput />
          </Stack>
          <VerticalAmPmToggle />
        </Stack>
        {/* Schedule Selector */}
        <Stack sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}>
          {
            ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"].map((time, index) => (
              <Button appearance="outlined" sx={{
                padding: "4px 12px",
                borderRadius: "8px",
                border: "1px solid #4A5C9280",
                width: "calc(50% - 5px)",
                flexDirection: "row",
                justifyContent: "center",
                cursor: "pointer",
                color: "common.black",
                fontWeight: 500,
              }} key={index}
              >
                {time}
              </Button>
            ))}
        </Stack>
      </Stack>
      {/* Footer */}
      <Stack sx={{
        flexDirection: "row",
        justifyContent: "flex-end",
      }}>
        <Button appearance="text">Cancel</Button>
        <Button appearance="text">OK</Button>
      </Stack>
    </Stack>
  )
}

export default DialogTimePicker
