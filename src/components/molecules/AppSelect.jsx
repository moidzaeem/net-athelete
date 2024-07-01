/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { Appcaption } from "../../utils/theme";

const AppSelect = ({ label, options, img, iconStyle }) => {
  const [selectedValue, setSelectedValue] = useState(options[0].label);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <label style={{ fontFamily: "Poppins", fontWeight: 500 }} htmlFor="text">
        {label}
      </label>{" "}
      <Select
        displayEmpty
        value={selectedValue}
        onChange={handleChange}
        renderValue={() => (
          <span>
            <img src={img} style={{ ...iconStyle, position: "relative", top: 8, marginRight: 2 }} />
            <span> {selectedValue}</span>
          </span>
        )}
        sx={{
          fontSize: 13,
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
          height: 53,
        }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.label}>
            <Appcaption sx={{ color: "black" }}>{option.label}</Appcaption>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
