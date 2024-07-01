import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Select } from "@mui/material";
import AppDiv from "../../../components/atoms/AppDiv";
import { Appcaption, Appfont, Appheading } from "../../../utils/theme";
import AppSearchBar from "../../../components/molecules/AppSearchBar";
import { AppButton } from "../../../components/atoms/AppButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const options = [
  {
    label: "1",
  },
  {
    label: "2",
  },
];

const SearchSidebar = () => {
  return (
    <div>
      <AppDiv
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}
      >
        <Appheading>Search Filter</Appheading>
        <KeyboardArrowLeftIcon color="primary" />
      </AppDiv>
      <AppDiv height={20} />
      <AppSearchBar />
      <AppDiv height={20} />
      <FormControl variant="standard" fullWidth>
        <InputLabel>
          <Appcaption sx={{ fontSize: 15 }}>{"Pick from list"}</Appcaption>
        </InputLabel>
        <Select>
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.label}>
              <Appcaption sx={{ color: "black", textAlign: "left" }}>{option.label}</Appcaption>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AppDiv
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
          mb: 3,
        }}
      >
        <Appfont sx={{ color: "grey", fontSize: 14 }}>Additional Requirrements</Appfont>
        <KeyboardArrowDownIcon />
      </AppDiv>
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
      <ButtonGroup fullWidth variant="contained" aria-label="Basic button group" sx={{ mt: 4 }}>
        <AppButton>0-5 </AppButton>
        <AppButton>6-20 </AppButton>
        <AppButton>20-50 </AppButton>
      </ButtonGroup>
    </div>
  );
};

export default SearchSidebar;
