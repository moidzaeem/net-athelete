import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const AppButton = styled(Button)(({ theme }) => ({
  fontFamily: "Poppins",
  fontSize: "12px",
  textTransform: "capitalize",
  boxShadow: "none",
  borderRadius: "8px",
  height: 40,
  // Define the hover state
  "&:hover": {
    color: "white", // Change text color to white on hover
  },
}));
