import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 12,
          backgroundColor: "#F6F8F9",
          marginTop: "16px",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#F6F8F9",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #F83C4D75",
              borderRadius: "12px",
            },
          },
          "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #F83C4D75",
            borderRadius: "12px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: 12,
          backgroundColor: "#F6F8F9",
          marginTop: "16px",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#F6F8F9",
            },
            "&:hover": {
              borderColor: "#E34824",
              borderWidth: "thin",
            },
            "&.Mui-focused ": {
              borderColor: "#E34824",
              borderWidth: "thin",
            },
          },
          "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #E34824",
            borderRadius: "12px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
    },
  },
});

export default theme;
