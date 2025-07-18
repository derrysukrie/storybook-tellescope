import SvgIcon from "@mui/material/SvgIcon";

export default function Send() {
  return (
    <SvgIcon>
      {/* credit: cog icon from https://heroicons.com */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
}
