import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import WifiIcon from "@mui/icons-material/Wifi";

function useClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const StatusBar: React.FC = () => {
  const time = useClock();
  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        zIndex: 10000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        px: 6,
        pb: 2,
        background:
          "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 70%, transparent 100%)",
        userSelect: "none",
      }}
    >
      {/* Left: Time */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "#e0e0e0",
          fontFamily: '"Google Sans Variable", "Google Sans", system-ui, sans-serif',
          letterSpacing: "0.5px",
        }}
      >
        {formatted}
      </Typography>

      {/* Dynamic Island (notch placeholder) */}
      <Box
        sx={{
          position: "absolute",
          top: 4,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 24,
          borderRadius: "20px",
          backgroundColor: "#000",
        }}
      />

      {/* Right: Icons */}
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        <WifiIcon sx={{ fontSize: 14, color: "#e0e0e0" }} />
        <SignalCellularAltIcon sx={{ fontSize: 14, color: "#e0e0e0" }} />
        <BatteryFullIcon sx={{ fontSize: 16, color: "#e0e0e0" }} />
      </Stack>
    </Box>
  );
};

export default StatusBar;
