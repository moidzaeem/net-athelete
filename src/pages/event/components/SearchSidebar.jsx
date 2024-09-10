import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Select } from "@mui/material";
import AppDiv from "../../../components/atoms/AppDiv";
import { Appcaption, Appfont, Appheading } from "../../../utils/theme";
import AppSearchBar from "../../../components/molecules/AppSearchBar";
// import { AppButton } from "../../../components/atoms/AppButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import {
//   ArrowDownward,
//   ArrowDropDown,
//   ArrowDropDownSharp,
// } from "@mui/icons-material";
import React from "react";

const options = [
  {
    label: "1",
  },
  {
    label: "2",
  },
];

const SearchSidebar = () => {
  const [selectedLocationRange, setSelectedLocationRange] = React.useState("");

  const handleLocationRangeChange = (value) => {
    setSelectedLocationRange(value);
  };

  return (
    <div className="fixed mt-8">
      <AppDiv
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // mt: 3,
          // mt: 4,
        }}
      >
        <Appheading>Search Filter</Appheading>
        <KeyboardArrowLeftIcon color="primary" />
      </AppDiv>
      <AppDiv height={20} />
      <AppSearchBar />
      <AppDiv height={20} />
      <div className="mb-2 flex justify-between items-center">
        <p className="text-xs uppercase text-[#92929D] font-poppins font-medium">
          Categories
        </p>
        <KeyboardArrowDownIcon />
      </div>
      <FormControl variant="standard" fullWidth>
        <InputLabel>
          <Appcaption sx={{ fontSize: 15 }}>{"Pick from list"}</Appcaption>
        </InputLabel>
        <Select>
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.label}>
              <Appcaption sx={{ color: "black", textAlign: "left" }}>
                {option.label}
              </Appcaption>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="mt-7.5 mb-2 flex justify-between items-center">
        <p className="text-xs uppercase text-[#92929D] font-poppins font-medium">
          Company
        </p>
        <KeyboardArrowDownIcon />
      </div>
      <FormControl variant="standard" fullWidth>
        <InputLabel>
          <Appcaption sx={{ fontSize: 15 }}>Adding a company</Appcaption>
        </InputLabel>
        <Select>
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.label}>
              <Appcaption sx={{ color: "black", textAlign: "left" }}>
                {option.label}
              </Appcaption>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="mt-7.5 mb-2 flex justify-between items-center">
        <p className="text-xs uppercase text-[#92929D] font-poppins font-medium">
          Additional Requirements
        </p>
        <KeyboardArrowDownIcon />
      </div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox color="success" size="small" defaultChecked />}
          label="Fresh Graduate Allow"
        />
        <FormControlLabel
          required
          control={<Checkbox color="success" size="small" />}
          label="Student College"
        />
        <FormControlLabel
          required
          control={<Checkbox color="success" size="small" />}
          label="Marriage"
        />
      </FormGroup>

      <p className="mt-7.5 mb-2 text-xs uppercase text-[#92929D] font-poppins font-medium">
        Location Range
      </p>
      <ButtonGroup
        fullWidth
        variant="contained"
        className="!w-auto !rounded-lg !bg-[#F1F1F5] !shadow-none"
      >
        <div
          className={`py-1 px-3 rounded-lg ${
            selectedLocationRange === 5
              ? "bg-[#27CEF8] text-white"
              : "bg-transparent text-[#44444F]"
          }`}
          onClick={() => handleLocationRangeChange(5)}
        >
          0-5 KM
        </div>
        <button
          className={`py-1 px-3 rounded-lg ${
            selectedLocationRange === 20
              ? "bg-[#27CEF8] text-white"
              : "bg-transparent text-[#44444F]"
          }`}
          onClick={() => handleLocationRangeChange(20)}
        >
          6-20 KM
        </button>
        <div
          className={`py-1 px-3 rounded-lg ${
            selectedLocationRange === 50
              ? "bg-[#27CEF8] text-white"
              : "bg-transparent text-[#44444F]"
          }`}
          onClick={() => handleLocationRangeChange(50)}
        >
          20-50 KM
        </div>
      </ButtonGroup>
    </div>
  );
};

export default SearchSidebar;
