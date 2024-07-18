import { TextField, InputAdornment } from "@mui/material";
import AppDiv from "../atoms/AppDiv";
import { flexCol } from "./../../utils/styles/index";

const AppTextField = ({ label, placeholder, icon, value, onChange, ...rest }) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value); // Pass the new value to the parent component
    }
  };

  return (
    <AppDiv sx={{ ...flexCol, width: "100%", alignItems: "start" }}>
      <label style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }} htmlFor="text">
        {label}
      </label>
      <TextField
        sx={{
          backgroundColor: "#F6F8F9",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#F6F8F9",
            },
          },
          mt: 2,
          "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          borderRadius: 3,
          ...rest,
        }}
        inputProps={{ style: { fontSize: 12 } }}
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <img src={icon} alt="icon" style={{ width: 20 }} />
            </InputAdornment>
          ) : null,
        }}
        value={value} // Controlled input: value prop
        onChange={handleChange} // Controlled input: onChange prop
      />
    </AppDiv>
  );
};

export default AppTextField;
