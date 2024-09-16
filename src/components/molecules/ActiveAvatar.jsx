import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Appcaption, Appfont } from "../../utils/theme";
import AppDiv from "../atoms/AppDiv";
import userPng from "../../assets/images/user.png"
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function ActiveAvatar() {
  return (
    <Stack direction="row">
      <AppDiv sx={{ display: "flex" }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={userPng} />
        </StyledBadge>
        <AppDiv sx={{ ml: 1, mt: 1 }}>
          <Appfont sx={{ textAlign: "left", lineHeight: 0.8 }}>Mbapee</Appfont>
          <Appcaption sx={{ color: "black", textAlign: "left" }}>Online</Appcaption>
        </AppDiv>
      </AppDiv>
    </Stack>
  );
}
